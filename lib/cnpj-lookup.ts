/**
 * Lookup automático de CNPJ via BrasilAPI (gateway oficial dos dados públicos
 * da Receita Federal).
 *
 * Por que BrasilAPI:
 *   • Open source, mantido pela comunidade BR.
 *   • Sem autenticação, sem rate limit declarado para uso razoável.
 *   • CORS aberto — funciona client-side puro (essencial: site é static
 *     export sem backend para proxy).
 *   • Dados oficiais sincronizados com a base CNPJ da Receita.
 *
 * Endpoint: https://brasilapi.com.br/api/cnpj/v1/{cnpj_apenas_digitos}
 *
 * Retorno normalizado para os campos que importam ao funil PME:
 *   - razão social (preenche o form)
 *   - nome fantasia
 *   - CNAE principal (código + descrição) — DRIVER do mapeamento setorial
 *   - município + UF (futuro: rede credenciada por região)
 *   - porte declarado na Receita (apenas referência; nosso porte é por
 *     funcionários via lib/portes.ts)
 *   - data de início (idade da empresa, sinal de risco para subscrição)
 *   - capital social (sinal de porte real)
 *   - situação cadastral (filtro de risco — só ATIVA cota)
 *
 * Mapeamento setorial: o CNAE retornado é o gancho para o benchmark
 * setorial (PDF Conselho D2 + D4) — comparativo CNAE+porte com cohort
 * ≥ 50 empresas. O dado fica no state do wizard pronto para ser enviado
 * à API de benchmark assim que o backend estiver de pé.
 */

const BRASIL_API = "https://brasilapi.com.br/api/cnpj/v1";

export type CnpjData = {
  cnpj: string; // 14 dígitos sem máscara
  razaoSocial: string;
  nomeFantasia: string | null;
  cnaeFiscal: number;
  cnaeFiscalDescricao: string;
  /** CNAEs secundários — útil para mapear múltiplas atividades */
  cnaesSecundarios: Array<{ codigo: number; descricao: string }>;
  porteReceita: string; // ex: "DEMAIS", "ME", "EPP", "MICRO EMPRESA"
  naturezaJuridica: string;
  dataInicioAtividade: string; // YYYY-MM-DD
  /** ATIVA / SUSPENSA / INAPTA / BAIXADA / NULA — só ATIVA é cotável */
  situacao: string;
  uf: string;
  municipio: string;
  bairro: string;
  cep: string;
  logradouro: string;
  numero: string;
  ddd: string | null;
  telefone: string | null;
  email: string | null;
  capitalSocial: number;
};

export type LookupResult =
  | { ok: true; data: CnpjData }
  | { ok: false; error: LookupError };

export type LookupError =
  | "invalid_cnpj"
  | "not_found"
  | "network"
  | "rate_limit"
  | "server"
  | "unknown";

/** Remove máscara e valida que tem 14 dígitos. NÃO valida o dígito
 *  verificador — esse trabalho fica no servidor da Receita. */
function sanitize(cnpj: string): string | null {
  const digits = cnpj.replace(/\D/g, "");
  return digits.length === 14 ? digits : null;
}

export async function lookupCnpj(
  cnpjRaw: string,
  signal?: AbortSignal
): Promise<LookupResult> {
  const cnpj = sanitize(cnpjRaw);
  if (!cnpj) return { ok: false, error: "invalid_cnpj" };

  let resp: Response;
  try {
    resp = await fetch(`${BRASIL_API}/${cnpj}`, {
      signal,
      headers: { Accept: "application/json" },
    });
  } catch {
    return { ok: false, error: "network" };
  }

  if (resp.status === 404) return { ok: false, error: "not_found" };
  if (resp.status === 429) return { ok: false, error: "rate_limit" };
  if (resp.status >= 500) return { ok: false, error: "server" };
  if (!resp.ok) return { ok: false, error: "unknown" };

  let raw: Record<string, unknown>;
  try {
    raw = await resp.json();
  } catch {
    return { ok: false, error: "unknown" };
  }

  // Normalização defensiva: a BrasilAPI evolui o schema; só assumimos os
  // campos documentados e tratamos ausência como null/string vazia.
  const get = (k: string) => (raw[k] as string | number | null | undefined) ?? null;
  const getStr = (k: string) => String(get(k) ?? "").trim();
  const getNum = (k: string) => Number(get(k) ?? 0);

  const data: CnpjData = {
    cnpj,
    razaoSocial: getStr("razao_social"),
    nomeFantasia: getStr("nome_fantasia") || null,
    cnaeFiscal: getNum("cnae_fiscal"),
    cnaeFiscalDescricao: getStr("cnae_fiscal_descricao"),
    cnaesSecundarios: Array.isArray(raw["cnaes_secundarios"])
      ? (raw["cnaes_secundarios"] as Array<Record<string, unknown>>).map(
          (c) => ({
            codigo: Number(c.codigo ?? 0),
            descricao: String(c.descricao ?? ""),
          })
        )
      : [],
    porteReceita: getStr("porte"),
    naturezaJuridica: getStr("natureza_juridica"),
    dataInicioAtividade: getStr("data_inicio_atividade"),
    situacao: getStr("descricao_situacao_cadastral") || getStr("situacao_cadastral"),
    uf: getStr("uf"),
    municipio: getStr("municipio"),
    bairro: getStr("bairro"),
    cep: getStr("cep"),
    logradouro: getStr("logradouro"),
    numero: getStr("numero"),
    ddd: getStr("ddd_telefone_1").slice(0, 2) || null,
    telefone: getStr("ddd_telefone_1").slice(2) || null,
    email: getStr("email") || null,
    capitalSocial: getNum("capital_social"),
  };

  return { ok: true, data };
}

/** Formata CNAE fiscal (ex.: 6202300 → "6202-3/00") padrão IBGE. */
export function formatCnae(cnae: number): string {
  const s = cnae.toString().padStart(7, "0");
  return `${s.slice(0, 4)}-${s.slice(4, 5)}/${s.slice(5, 7)}`;
}

/**
 * Mapa de CNAE → grupo setorial macro, usado para roteamento de:
 *   • Benchmark (cohort suficiente exige agrupar por grupo, não por CNAE).
 *   • Material de venda vertical (script/case por setor).
 *   • Sinal de risco de subscrição (saúde tem aceitação diferente por setor).
 *
 * Cobertura inicial dos grupos onde a Affida tem foco PME. Casos não
 * mapeados retornam "outros" — o lead segue, mas sem benchmark vertical.
 */
export type GrupoSetorial =
  | "tecnologia"
  | "servicos_profissionais"
  | "comercio"
  | "industria"
  | "construcao"
  | "saude_educacao"
  | "transporte_logistica"
  | "alimentacao"
  | "agro"
  | "financeiro"
  | "outros";

export function mapCnaeToGrupo(cnae: number): GrupoSetorial {
  // CNAE seção (1-2 primeiros dígitos)
  const secao = Math.floor(cnae / 100000); // 7 dígitos → 2 primeiros
  if (secao === 62 || secao === 63) return "tecnologia";
  if (secao >= 69 && secao <= 75) return "servicos_profissionais";
  if (secao >= 45 && secao <= 47) return "comercio";
  if (secao >= 10 && secao <= 33) return "industria";
  if (secao >= 41 && secao <= 43) return "construcao";
  if (secao >= 85 && secao <= 88) return "saude_educacao";
  if (secao >= 49 && secao <= 53) return "transporte_logistica";
  if (secao === 56) return "alimentacao";
  if (secao >= 1 && secao <= 9) return "agro";
  if (secao >= 64 && secao <= 66) return "financeiro";
  return "outros";
}

export const grupoLabel: Record<GrupoSetorial, string> = {
  tecnologia: "Tecnologia da Informação",
  servicos_profissionais: "Serviços Profissionais",
  comercio: "Comércio",
  industria: "Indústria",
  construcao: "Construção",
  saude_educacao: "Saúde & Educação",
  transporte_logistica: "Transporte & Logística",
  alimentacao: "Alimentação",
  agro: "Agronegócio",
  financeiro: "Serviços Financeiros",
  outros: "Outros setores",
};
