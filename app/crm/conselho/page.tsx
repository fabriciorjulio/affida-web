import {
  Target,
  CheckCircle2,
  AlertTriangle,
  Circle,
  Clock,
  TrendingUp,
  XCircle,
  Zap,
  ShieldCheck,
  FileText,
  Briefcase,
  HeartPulse,
  Cpu,
  Wallet,
  Layers,
} from "lucide-react";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Conselho · Affida CRM",
  description:
    "Dashboard executivo: KPIs mestre, kill criteria, status regulatório e dependências críticas",
};

// ============================================================================
// PDF Conselho · KPIs MESTRE — Wave 1 / Wave 2 / Wave 3
// ============================================================================
type WaveStatus = "no_target" | "below" | "on_track" | "exceeded";

const kpis: Array<{
  label: string;
  unit?: string;
  wave1: string;
  wave2: string;
  wave3: string;
  current: string;
  status: WaveStatus;
}> = [
  {
    label: "Carteira ativa (apólices saúde PME)",
    wave1: "10",
    wave2: "50",
    wave3: "200",
    current: "0",
    status: "below",
  },
  {
    label: "MRR de prêmio sob gestão",
    wave1: "R$ 80k",
    wave2: "R$ 400k",
    wave3: "R$ 1,6M",
    current: "R$ 0",
    status: "below",
  },
  {
    label: "Comissão recorrente mensal",
    wave1: "R$ 8k",
    wave2: "R$ 40k",
    wave3: "R$ 160k",
    current: "R$ 0",
    status: "below",
  },
  {
    label: "Operadoras com API direta",
    wave1: "2",
    wave2: "4",
    wave3: "6",
    current: "0",
    status: "below",
  },
  {
    label: "Tempo lead → vigência (mediana)",
    wave1: "< 7 dias",
    wave2: "< 72h",
    wave3: "< 24h",
    current: "—",
    status: "no_target",
  },
  {
    label: "Close-rate em lead qualificado",
    wave1: "3-5%",
    wave2: "5-8%",
    wave3: "8-12%",
    current: "—",
    status: "no_target",
  },
  {
    label: "Re-ofertas em renovação",
    wave1: "—",
    wave2: "≥ 80% da carteira",
    wave3: "100%",
    current: "—",
    status: "no_target",
  },
  {
    label: "LTV / CAC",
    wave1: "n/a",
    wave2: "≥ 2,0",
    wave3: "≥ 3,0",
    current: "n/a",
    status: "no_target",
  },
  {
    label: "Payback CAC",
    wave1: "n/a",
    wave2: "≤ 18m",
    wave3: "≤ 12m",
    current: "n/a",
    status: "no_target",
  },
  {
    label: "Apólices automatizadas via RPA (e2e)",
    wave1: "30%",
    wave2: "70%",
    wave3: "90%",
    current: "0%",
    status: "below",
  },
  {
    label: "Margem de contribuição por contrato",
    wave1: "—",
    wave2: "≥ 25%",
    wave3: "≥ 35%",
    current: "—",
    status: "no_target",
  },
  {
    label: "Não-conformidades regulatórias > 30d",
    wave1: "0",
    wave2: "0",
    wave3: "0",
    current: "0",
    status: "on_track",
  },
];

const statusStyle: Record<WaveStatus, { bg: string; text: string; label: string }> = {
  no_target: { bg: "bg-navy-100", text: "text-navy-600", label: "—" },
  below: { bg: "bg-champagne-100", text: "text-champagne-800", label: "abaixo da meta" },
  on_track: { bg: "bg-forest-50", text: "text-forest-700", label: "no caminho" },
  exceeded: { bg: "bg-forest-100", text: "text-forest-800", label: "superou" },
};

// ============================================================================
// PDF Conselho · STATUS REGULATÓRIO (Wave 0)
// ============================================================================
type RegStatus = "pendente" | "em_andamento" | "concluido" | "bloqueado";

const regulatorio: Array<{
  frente: string;
  norma: string;
  acao: string;
  prazo: string;
  status: RegStatus;
  owner: string;
}> = [
  {
    frente: "Corretagem",
    norma: "Lei 4.594/64 + CNSP 382/2020",
    acao: "CNPJ Affida + registro PJ + responsável técnico habilitado",
    prazo: "D+30",
    status: "pendente",
    owner: "Sócio + advogado SUSEP",
  },
  {
    frente: "Código operadora",
    norma: "Contrato comercial",
    acao: "Código aberto em ≥ 2 operadoras (Bradesco + Amil)",
    prazo: "D+30",
    status: "pendente",
    owner: "Diretor comercial",
  },
  {
    frente: "Saúde — planos coletivos",
    norma: "ANS RN 195/2009",
    acao: "Modelos contratuais aprovados, contrato-tipo registrado",
    prazo: "D+45",
    status: "pendente",
    owner: "Jurídico",
  },
  {
    frente: "Saúde — pool de risco",
    norma: "ANS RN 309/2012",
    acao: "Documento explicando regra ao cliente PME ≤ 29 vidas",
    prazo: "D+30",
    status: "pendente",
    owner: "Compliance",
  },
  {
    frente: "Saúde — faixas etárias",
    norma: "ANS RN 63/2003",
    acao: "Cálculo do wizard auditado (10 faixas, multiplicadores)",
    prazo: "D+15",
    status: "em_andamento",
    owner: "Tech + Compliance",
  },
  {
    frente: "Saúde — portabilidade",
    norma: "ANS RN 252/2011 + RN 438/2018",
    acao: "Fluxo de portabilidade no CRM e no portal",
    prazo: "D+90",
    status: "pendente",
    owner: "Tech + Compliance",
  },
  {
    frente: "Saúde — rede credenciada",
    norma: "ANS RN 432/2017",
    acao: "Disclaimer de rede; integração futura com base RN 432",
    prazo: "D+60",
    status: "pendente",
    owner: "Tech + Compliance",
  },
  {
    frente: "Saúde — dados",
    norma: "ANS RN 412/2016",
    acao: "Pipeline de consumo dos dados públicos para benchmark",
    prazo: "D+180",
    status: "pendente",
    owner: "Data eng",
  },
  {
    frente: "Dados pessoais (LGPD)",
    norma: "LGPD + ANPD Guias (saúde)",
    acao: "DPO designado, RIPD assinado, base legal por finalidade, retenção, plano de incidente",
    prazo: "D+30",
    status: "pendente",
    owner: "DPO + jurídico",
  },
  {
    frente: "Open Insurance",
    norma: "Resolução CNSP 415/2021 + manuais SPOC",
    acao: "Dossiê de credenciamento como SPOC",
    prazo: "D+180",
    status: "pendente",
    owner: "Compliance",
  },
  {
    frente: "Consumidor",
    norma: "CDC Art. 6º, 30, 31, 39",
    acao: "Auditoria de toda copy de marketing por advogado",
    prazo: "D+30",
    status: "pendente",
    owner: "Jurídico",
  },
  {
    frente: "Antifraude (financeira)",
    norma: "COAF + Lei 9.613/98",
    acao: "KYC + monitoramento transacional na financeira (Wave 2)",
    prazo: "D+150",
    status: "pendente",
    owner: "Financeira + Compliance",
  },
];

const regStatusStyle: Record<
  RegStatus,
  { icon: typeof CheckCircle2; bg: string; text: string; label: string }
> = {
  pendente: { icon: Circle, bg: "bg-navy-100", text: "text-navy-700", label: "Pendente" },
  em_andamento: { icon: Clock, bg: "bg-champagne-100", text: "text-champagne-800", label: "Em andamento" },
  concluido: { icon: CheckCircle2, bg: "bg-forest-100", text: "text-forest-800", label: "Concluído" },
  bloqueado: { icon: XCircle, bg: "bg-navy-100", text: "text-navy-900", label: "Bloqueado" },
};

// ============================================================================
// PDF Conselho · KILL CRITERIA
// ============================================================================
const killCriteria = [
  {
    when: "D+90",
    trigger: "Sem CNPJ ativo + 2 operadoras integradas",
    action: "Parar captação pública. Regularizar antes de retomar.",
  },
  {
    when: "D+180",
    trigger: "Carteira < 30 contratos OU LTV/CAC < 1,5",
    action: "Rever tese ou pivotar para canal exclusivo de parceiros (largar o digital direto).",
  },
  {
    when: "Qualquer momento",
    trigger: "Notificação de ANS, SUSEP, ANPD ou Procon",
    action:
      "Congelar operação afetada. Parecer jurídico independente. Plano de remediação aprovado pelo Conselho antes de retomar.",
  },
  {
    when: "D+365",
    trigger: "Margem de contribuição < 20% por contrato",
    action: "Fechar pilar Financeira ou renegociar contrato com SCD/IP — matemática não fecha.",
  },
  {
    when: "Sinal externo",
    trigger: "Bliss anuncia canal direto B2B em SP/RJ ou parceria exclusiva com Bradesco",
    action:
      "Reavaliar competitividade em 30 dias. Considerar tese embedded (Asaas/Omie) como alternativa.",
  },
];

// ============================================================================
// PDF Conselho · 4 PILARES
// ============================================================================
const pilares = [
  {
    icon: Briefcase,
    nome: "Corretora (SUSEP)",
    funcao: "Origem de carteira regulada de saúde/vida PME",
    receita: "Comissão de operadora (8-15% do prêmio)",
    fosso: "Direito de relacionamento + dado primário do beneficiário",
  },
  {
    icon: Layers,
    nome: "CRM proprietário",
    funcao: "Espinha dorsal de carteira, pipeline e renovação",
    receita: "Sem receita direta — habilita as outras",
    fosso: "Lock-in operacional + dado de comportamento",
  },
  {
    icon: Cpu,
    nome: "RPA",
    funcao: "Cotação, emissão, conciliação, glosa, inclusão/exclusão de vidas",
    receita: "Margem operacional + venda futura de capacidade",
    fosso: "Custo marginal de apólice próximo de zero",
  },
  {
    icon: Wallet,
    nome: "Financeira (SCD/IP)",
    funcao: "Antecipação de comissão a parceiros, parcelamento de prêmio, folha",
    receita: "Spread + tarifa",
    fosso: "Embedded finance no fluxo de saúde PME",
  },
];

// ============================================================================
// PDF Conselho · DEPENDÊNCIAS / SEQUENCIAMENTO
// ============================================================================
const dependencias = `
CNPJ + SUSEP ─┬─> Código operadora ─┬─> API real ─┬─> Cotação real
              │                     │             │
              └─> RIPD/DPO ─────────┴─> Backend ──┴─> RPA ──> Re-oferta
                                                           │
                                                           └─> Financeira (antecipação)
                                                                   │
                                                                   └─> SPOC Open Insurance
`.trim();

// ============================================================================
// PDF Conselho · RISCOS DE EXECUÇÃO
// ============================================================================
const riscos = [
  {
    titulo: "Capacidade do time",
    desc: "4 pilares em paralelo exigem 8-15 pessoas. Time < 5 pessoas → sequenciar (corretora → CRM → RPA → financeira), não paralelizar.",
  },
  {
    titulo: "Conflito Bradesco",
    desc: "Bradesco é investidor da Bliss e operadora-âncora da Affida. Avaliar se Bradesco é fornecedor estratégico ou canal perdido — pode justificar swap para Amil/Porto como âncora primária.",
  },
  {
    titulo: "Tempo regulatório",
    desc: "Registros SUSEP e ANS têm prazos pouco previsíveis. Plano assume 30 dias para CNPJ/SUSEP — se demorar 90, tudo desliza.",
  },
  {
    titulo: "Concentração em saúde",
    desc: "Se ANS muda regra de pool de risco ou portabilidade, o argumento de re-oferta muda. Diversificar para vida + odonto cedo é hedging.",
  },
];

export default function ConselhoPage() {
  const concluidos = regulatorio.filter((r) => r.status === "concluido").length;
  const emAndamento = regulatorio.filter((r) => r.status === "em_andamento").length;
  const pendentes = regulatorio.filter((r) => r.status === "pendente").length;

  return (
    <div className="flex flex-1 flex-col">
      <CrmHeader title="Painel do Conselho" subtitle="Plano de implementação · 25-abr-2026" />

      <div className="container-wide px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Re-enquadramento dos 4 pilares */}
        <section className="mb-12">
          <p className="eyebrow">0 · Re-enquadramento</p>
          <h2 className="heading-display mt-3 text-2xl text-navy-900 sm:text-3xl">
            Affida não é uma corretora —{" "}
            <em className="italic text-forest">é um stack vertical de 4 negócios</em>.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-navy-700/80">
            Tese revisada do Conselho: o jogo não é &ldquo;ser broker boutique digital&rdquo;,
            é ser o <strong>sistema operacional financeiro-regulatório do plano de saúde
            PME</strong>. Os 4 pilares se alimentam mutuamente sobre a mesma carteira.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pilares.map((p) => (
              <div
                key={p.nome}
                className="rounded-2xl border border-champagne-200/60 bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-champagne-300">
                  <p.icon size={18} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-display text-lg font-light text-navy-900">{p.nome}</h3>
                <p className="mt-2 text-xs text-navy-700/75">{p.funcao}</p>
                <div className="mt-3 border-t border-champagne-200/60 pt-3">
                  <p className="text-[10px] uppercase tracking-widest text-champagne-700">
                    Receita
                  </p>
                  <p className="mt-0.5 text-xs text-navy-800">{p.receita}</p>
                </div>
                <div className="mt-2">
                  <p className="text-[10px] uppercase tracking-widest text-forest">Fosso</p>
                  <p className="mt-0.5 text-xs text-navy-800">{p.fosso}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KPIs mestre */}
        <section className="mb-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">3 · KPIs mestre</p>
              <h2 className="heading-display mt-3 text-2xl text-navy-900 sm:text-3xl">
                Métricas-objetivo por <em className="italic text-forest">onda</em>.
              </h2>
            </div>
            <div className="flex gap-2 text-[10px]">
              <Badge tone="neutral">Wave 1 · D+90</Badge>
              <Badge tone="gold">Wave 2 · D+180</Badge>
              <Badge tone="success">Wave 3 · D+365</Badge>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-champagne-200/60 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50 text-[10px] uppercase tracking-widest text-navy-700/70">
                <tr>
                  <th className="px-4 py-3">Indicador</th>
                  <th className="px-4 py-3">Hoje</th>
                  <th className="px-4 py-3">Wave 1</th>
                  <th className="px-4 py-3">Wave 2</th>
                  <th className="px-4 py-3">Wave 3</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne-200/40">
                {kpis.map((k) => {
                  const s = statusStyle[k.status];
                  return (
                    <tr key={k.label}>
                      <td className="px-4 py-3 font-medium text-navy-900">{k.label}</td>
                      <td className="px-4 py-3 font-mono text-xs text-navy-700">{k.current}</td>
                      <td className="px-4 py-3 font-mono text-xs text-navy-700/70">{k.wave1}</td>
                      <td className="px-4 py-3 font-mono text-xs text-navy-700/70">{k.wave2}</td>
                      <td className="px-4 py-3 font-mono text-xs text-navy-700/70">{k.wave3}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${s.bg} ${s.text}`}
                        >
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Status Regulatório */}
        <section className="mb-12">
          <p className="eyebrow">Wave 0 · Compliance</p>
          <h2 className="heading-display mt-3 text-2xl text-navy-900 sm:text-3xl">
            Status <em className="italic text-forest">regulatório</em>.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-navy-700/80">
            12 frentes regulatórias mapeadas. <strong>{concluidos}</strong> concluídas ·{" "}
            <strong>{emAndamento}</strong> em andamento · <strong>{pendentes}</strong> pendentes.
          </p>

          <div className="mt-6 space-y-2">
            {regulatorio.map((r) => {
              const s = regStatusStyle[r.status];
              const Icon = s.icon;
              return (
                <div
                  key={r.frente + r.norma}
                  className="grid gap-3 rounded-xl border border-champagne-200/60 bg-white p-4 md:grid-cols-[auto_1fr_auto] md:items-center"
                >
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${s.bg} ${s.text}`}
                  >
                    <Icon size={14} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-light text-navy-900">
                      {r.frente}
                      <span className="ml-2 text-[10px] uppercase tracking-widest text-champagne-700">
                        {r.norma}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-navy-700/75">{r.acao}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-navy-700/50">
                      Owner: {r.owner} · Prazo: {r.prazo}
                    </p>
                  </div>
                  <span
                    className={`inline-flex h-7 items-center rounded-full px-3 text-[10px] font-medium uppercase tracking-widest ${s.bg} ${s.text}`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dependências */}
        <section className="mb-12">
          <p className="eyebrow">5 · Sequenciamento</p>
          <h2 className="heading-display mt-3 text-2xl text-navy-900 sm:text-3xl">
            Dependências <em className="italic text-forest">críticas</em>.
          </h2>
          <pre className="mt-6 overflow-x-auto rounded-2xl border border-navy-900 bg-navy-900 p-6 font-mono text-[11px] leading-relaxed text-champagne-200">
            {dependencias}
          </pre>
          <ul className="mt-4 space-y-2 text-xs text-navy-700/80">
            <li>
              <strong className="text-navy-900">CNPJ + SUSEP</strong> bloqueia tudo. Caminho
              crítico real, não tech.
            </li>
            <li>
              <strong className="text-navy-900">Backend real</strong> bloqueia RPA, CRM
              persistente e financeira.
            </li>
            <li>
              <strong className="text-navy-900">Carteira ≥ 50</strong> bloqueia benchmark
              setorial e re-oferta com sinal.
            </li>
            <li>
              <strong className="text-navy-900">Financeira</strong> só faz sentido com volume
              — não antes da Wave 2.
            </li>
          </ul>
        </section>

        {/* Kill criteria */}
        <section className="mb-12">
          <p className="eyebrow">4 · Kill criteria</p>
          <h2 className="heading-display mt-3 text-2xl text-navy-900 sm:text-3xl">
            Quando <em className="italic text-forest">parar</em>.
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {killCriteria.map((k) => (
              <div
                key={k.trigger}
                className="rounded-2xl border-l-4 border-l-navy-900 border border-champagne-200/60 bg-white p-5"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-navy-900" />
                  <span className="text-[10px] uppercase tracking-widest text-navy-900">
                    {k.when}
                  </span>
                </div>
                <p className="mt-2 font-display text-sm font-light text-navy-900">{k.trigger}</p>
                <p className="mt-2 text-xs text-navy-700/75">→ {k.action}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Riscos */}
        <section className="mb-12">
          <p className="eyebrow">6 · Riscos não eliminados</p>
          <h2 className="heading-display mt-3 text-2xl text-navy-900 sm:text-3xl">
            O que <em className="italic text-forest">este plano não resolve</em>.
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {riscos.map((r, i) => (
              <div
                key={r.titulo}
                className="rounded-2xl border border-champagne-200/60 bg-champagne-50/50 p-5"
              >
                <p className="font-display text-base font-light text-navy-900">
                  {String(i + 1).padStart(2, "0")} · {r.titulo}
                </p>
                <p className="mt-2 text-xs text-navy-700/80">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <section className="rounded-3xl border border-navy-900 bg-navy-900 p-8 text-ivory">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="eyebrow text-champagne-500">Documento canônico</p>
              <h3 className="heading-display mt-3 text-xl text-ivory">
                Plano completo em STRATEGY.md
              </h3>
              <p className="mt-2 max-w-xl text-sm text-ivory/75">
                Este painel sintetiza o PDF do Conselho de 25-abr-2026. O documento
                completo (16 seções + ondas + 8 dimensões + matriz regulatória) está
                em /STRATEGY.md e /STRATEGY.pdf.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/STRATEGY.md"
                className="inline-flex items-center gap-2 rounded-full border border-champagne-500/30 px-5 py-2.5 text-xs uppercase tracking-widest text-champagne-300 hover:bg-champagne-500/10"
              >
                <FileText size={13} /> Markdown
              </a>
              <a
                href="/STRATEGY.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-champagne-500 px-5 py-2.5 text-xs uppercase tracking-widest text-navy-900 hover:shadow-gold"
              >
                <FileText size={13} /> PDF
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
