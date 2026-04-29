/**
 * Split de comissão por fechamento — gestão interna da corretora.
 *
 * Pedido do dono (Carlos Nardone): quando uma venda fecha, vários
 * participantes do processo comercial têm direito a um % da comissão
 * (corretor responsável, gerente, indicador, diretor, backoffice).
 * Hoje isso vive numa planilha solta — financeiro precisa de relatório
 * estruturado pra conciliar a comissão recebida da operadora vs. o que
 * é pago internamente.
 *
 * Boas práticas pesquisadas (mercado BR de saúde/seguros):
 *   • Comissão de saúde paga pela operadora: 15-25% do prêmio
 *     (Resolução CNSP 382/2020 — livre acordo; SUSEP não regula split interno)
 *   • Corretora pode dividir com preposto (Circ. SUSEP 127/2000)
 *   • Programa MGM Affida já tem curva 30%/15%/10% (mês 1/2/3+)
 *   • Padrão Setup Solutions / Segfy: cadastro de regras por usuário +
 *     extrato consolidado pra conciliação
 *
 * Persistência: localStorage (key `affida_commissions`) + mocks pré-carregados.
 * Quando o backend FastAPI estiver de pé: troca por POST /api/commissions.
 */

const KEY = "affida_commissions";

// Papéis canônicos do processo comercial Affida.
export type Papel =
  | "corretor_responsavel"
  | "indicador"
  | "gerente_comercial"
  | "diretor"
  | "backoffice";

export const papelLabel: Record<Papel, string> = {
  corretor_responsavel: "Corretor responsável",
  indicador: "Indicador (MGM)",
  gerente_comercial: "Gerente comercial",
  diretor: "Diretor / sócio",
  backoffice: "Backoffice / operações",
};

// % sugerido por papel — soma 93% (sobra 7% pra corretora cobrir custos).
// Override possível por fechamento; serve de baseline quando o usuário
// adiciona um participante.
export const papelDefaultPct: Record<Papel, number> = {
  corretor_responsavel: 45,
  indicador: 30, // curva MGM mês 1; usuário ajusta nos meses seguintes
  gerente_comercial: 8,
  diretor: 5,
  backoffice: 5,
};

export type BaseCalculo = "primeira_parcela" | "cauda_recorrente" | "ambas";

export const baseLabel: Record<BaseCalculo, string> = {
  primeira_parcela: "1ª parcela",
  cauda_recorrente: "Cauda mensal",
  ambas: "1ª + cauda",
};

export type ParticipanteSplit = {
  id: string;
  papel: Papel;
  nome: string;
  /** % sobre a comissão BRUTA mensal recebida da operadora */
  pct: number;
  base: BaseCalculo;
};

export type CommissionDeal = {
  id: string;
  /** Data do fechamento — YYYY-MM-DD */
  fechamentoData: string;
  cliente: string;
  cnpj?: string;
  /** Ex: "Saúde Coletiva", "Odonto", "Vida" */
  produto: string;
  vidas: number;
  /** R$ mensal contratado */
  premioMensal: number;
  /** % que a operadora paga (ex: 20 = 20% do prêmio) */
  comissaoOperadoraPct: number;
  participantes: ParticipanteSplit[];
  observacao?: string;
  createdAt: string;
  /** Marca quando o financeiro já fez a conciliação (manual no MVP) */
  conciliado?: boolean;
};

// ---------- Helpers de cálculo ----------

export function comissaoBrutaMensal(d: CommissionDeal): number {
  return Math.round(d.premioMensal * d.comissaoOperadoraPct) / 100;
}

export function valorParticipante(d: CommissionDeal, p: ParticipanteSplit): number {
  return Math.round(comissaoBrutaMensal(d) * p.pct) / 100;
}

export function totalSplitPct(d: CommissionDeal): number {
  return d.participantes.reduce((acc, p) => acc + p.pct, 0);
}

export function totalSplitValor(d: CommissionDeal): number {
  return d.participantes.reduce((acc, p) => acc + valorParticipante(d, p), 0);
}

export function margemCorretora(d: CommissionDeal): number {
  return comissaoBrutaMensal(d) - totalSplitValor(d);
}

// ---------- Persistência ----------

function readAll(): CommissionDeal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(deals: CommissionDeal[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(deals));
  } catch {
    /* quota cheia / modo privado */
  }
}

export function getDeals(): CommissionDeal[] {
  return readAll();
}

export function addDeal(deal: Omit<CommissionDeal, "id" | "createdAt">): CommissionDeal {
  const full: CommissionDeal = {
    ...deal,
    id: `deal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  const all = readAll();
  all.unshift(full);
  writeAll(all);
  return full;
}

export function updateDeal(id: string, patch: Partial<CommissionDeal>): CommissionDeal | null {
  const all = readAll();
  const idx = all.findIndex((d) => d.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], ...patch };
  writeAll(all);
  return all[idx];
}

export function removeDeal(id: string): boolean {
  const all = readAll();
  const next = all.filter((d) => d.id !== id);
  if (next.length === all.length) return false;
  writeAll(next);
  return true;
}

export function toggleConciliado(id: string): CommissionDeal | null {
  const all = readAll();
  const idx = all.findIndex((d) => d.id === id);
  if (idx < 0) return null;
  all[idx] = { ...all[idx], conciliado: !all[idx].conciliado };
  writeAll(all);
  return all[idx];
}

// ---------- Mocks pré-carregados ----------
//
// Carregados automaticamente pra que o CRM já tenha exemplos no MVP.
// Usuário pode limpar com `clearDeals()` (ainda não exposto).
const MOCK_DEALS: Omit<CommissionDeal, "createdAt">[] = [
  {
    id: "mock-deal-001",
    fechamentoData: "2026-04-12",
    cliente: "Adiantajus Serviços Financeiros",
    cnpj: "37.582.119/0001-44",
    produto: "Saúde Coletiva",
    vidas: 24,
    premioMensal: 18420,
    comissaoOperadoraPct: 22,
    conciliado: false,
    participantes: [
      { id: "p1", papel: "corretor_responsavel", nome: "Lucas Azevedo", pct: 45, base: "ambas" },
      { id: "p2", papel: "indicador", nome: "Roberto Camargo", pct: 30, base: "primeira_parcela" },
      { id: "p3", papel: "gerente_comercial", nome: "Ana Ribeiro", pct: 8, base: "ambas" },
      { id: "p4", papel: "diretor", nome: "Carlos Nardone", pct: 5, base: "ambas" },
      { id: "p5", papel: "backoffice", nome: "Time Operações", pct: 5, base: "ambas" },
    ],
    observacao: "Indicação de parceiro contábil. Ramp-up MGM no 1º mês.",
  },
  {
    id: "mock-deal-002",
    fechamentoData: "2026-04-08",
    cliente: "Martins Advocacia Empresarial",
    cnpj: "21.044.876/0001-30",
    produto: "Saúde Coletiva",
    vidas: 16,
    premioMensal: 12180,
    comissaoOperadoraPct: 20,
    conciliado: true,
    participantes: [
      { id: "p1", papel: "corretor_responsavel", nome: "Ana Ribeiro", pct: 50, base: "ambas" },
      { id: "p2", papel: "gerente_comercial", nome: "Lucas Azevedo", pct: 10, base: "ambas" },
      { id: "p3", papel: "diretor", nome: "Carlos Nardone", pct: 5, base: "ambas" },
      { id: "p4", papel: "backoffice", nome: "Time Operações", pct: 5, base: "ambas" },
    ],
    observacao: "Venda direta — sem indicador.",
  },
  {
    id: "mock-deal-003",
    fechamentoData: "2026-03-22",
    cliente: "Farma Saúde Distribuidora",
    cnpj: "08.117.330/0001-92",
    produto: "Saúde + Odonto",
    vidas: 54,
    premioMensal: 38900,
    comissaoOperadoraPct: 23,
    conciliado: true,
    participantes: [
      { id: "p1", papel: "corretor_responsavel", nome: "Lucas Azevedo", pct: 42, base: "ambas" },
      { id: "p2", papel: "indicador", nome: "Cliente Adiantajus (MGM)", pct: 15, base: "cauda_recorrente" },
      { id: "p3", papel: "gerente_comercial", nome: "Ana Ribeiro", pct: 8, base: "ambas" },
      { id: "p4", papel: "diretor", nome: "Carlos Nardone", pct: 5, base: "ambas" },
      { id: "p5", papel: "backoffice", nome: "Time Operações", pct: 5, base: "ambas" },
    ],
    observacao: "MGM em cauda — 2º mês de comissão (curva 15%).",
  },
  {
    id: "mock-deal-004",
    fechamentoData: "2026-04-19",
    cliente: "Construtora Vega",
    cnpj: "33.901.554/0001-08",
    produto: "Vida Empresarial",
    vidas: 78,
    premioMensal: 9460,
    comissaoOperadoraPct: 18,
    conciliado: false,
    participantes: [
      { id: "p1", papel: "corretor_responsavel", nome: "Juliana Paes", pct: 45, base: "ambas" },
      { id: "p2", papel: "gerente_comercial", nome: "Lucas Azevedo", pct: 8, base: "ambas" },
      { id: "p3", papel: "diretor", nome: "Carlos Nardone", pct: 5, base: "ambas" },
      { id: "p4", papel: "backoffice", nome: "Time Operações", pct: 5, base: "ambas" },
    ],
  },
];

/**
 * Idempotente: insere os mocks apenas uma vez por browser. Permite o
 * usuário deletar/editar livre, sem que recarreguem ao remontar a página.
 */
export function ensureMocksLoaded() {
  if (typeof window === "undefined") return;
  const flag = "affida_commissions_mocks_loaded";
  if (localStorage.getItem(flag) === "1") return;
  const existing = readAll();
  if (existing.length > 0) {
    localStorage.setItem(flag, "1");
    return;
  }
  const now = new Date().toISOString();
  writeAll(MOCK_DEALS.map((d) => ({ ...d, createdAt: now })));
  localStorage.setItem(flag, "1");
}

// ---------- Relatórios ----------

export type RelatorioPorPessoa = {
  nome: string;
  papel: Papel;
  totalDeals: number;
  totalValor: number;
};

/**
 * Agrega o split de todos os deals do mês informado (YYYY-MM) por pessoa.
 * Mesma pessoa em papéis distintos aparece em linhas separadas.
 */
export function relatorioMensalPorPessoa(
  deals: CommissionDeal[],
  yyyymm: string
): RelatorioPorPessoa[] {
  const filtered = deals.filter((d) => d.fechamentoData.slice(0, 7) === yyyymm);
  const map = new Map<string, RelatorioPorPessoa>();
  for (const d of filtered) {
    for (const p of d.participantes) {
      const key = `${p.nome}::${p.papel}`;
      const valor = valorParticipante(d, p);
      const cur = map.get(key);
      if (cur) {
        cur.totalDeals += 1;
        cur.totalValor += valor;
      } else {
        map.set(key, {
          nome: p.nome,
          papel: p.papel,
          totalDeals: 1,
          totalValor: valor,
        });
      }
    }
  }
  return [...map.values()].sort((a, b) => b.totalValor - a.totalValor);
}

// ---------- Export CSV (para financeiro fazer conciliação) ----------

/**
 * CSV de conciliação: 1 linha por participante × deal, com tudo que o
 * financeiro precisa pra cruzar com o extrato da operadora.
 *
 * Separador `;` (CSV brasileiro — Excel BR abre direto sem importar).
 */
export function exportCsv(deals: CommissionDeal[]): string {
  const header = [
    "data_fechamento",
    "cliente",
    "cnpj",
    "produto",
    "vidas",
    "premio_mensal",
    "comissao_operadora_pct",
    "comissao_bruta_mensal",
    "papel",
    "nome",
    "pct",
    "base_calculo",
    "valor_mensal",
    "conciliado",
  ].join(";");

  const lines: string[] = [header];
  for (const d of deals) {
    const bruta = comissaoBrutaMensal(d);
    for (const p of d.participantes) {
      const valor = valorParticipante(d, p);
      lines.push(
        [
          d.fechamentoData,
          quote(d.cliente),
          d.cnpj ?? "",
          quote(d.produto),
          d.vidas,
          formatNum(d.premioMensal),
          d.comissaoOperadoraPct,
          formatNum(bruta),
          papelLabel[p.papel],
          quote(p.nome),
          p.pct,
          baseLabel[p.base],
          formatNum(valor),
          d.conciliado ? "sim" : "não",
        ].join(";")
      );
    }
  }
  return lines.join("\n");
}

function formatNum(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

function quote(s: string): string {
  if (s.includes(";") || s.includes('"')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}
