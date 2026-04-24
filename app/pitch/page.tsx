import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Wallet,
  Sparkles,
  BarChart3,
  Megaphone,
  Handshake,
  UserCircle2,
  FileText,
  Repeat2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Target,
  Zap,
  Lock,
  Rocket,
  TrendingUp,
  ShieldCheck,
  Globe,
  Clock,
  X,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const modulos = [
  {
    icon: Globe,
    area: "Aquisição",
    title: "Landing + Cotação digital",
    rotas: ["/", "/cotar", "/cotar/[produto]"],
    description:
      "Site institucional premium + cotador multi-produto em 4 passos. Cliente sai com 3 opções comparadas em 3 minutos.",
    status: "MVP pronto",
  },
  {
    icon: LayoutDashboard,
    area: "Operação",
    title: "CRM Affida (interno)",
    rotas: ["/crm", "/crm/pipeline", "/crm/leads"],
    description:
      "Dashboard com KPIs, pipeline kanban 6 estágios, leads 360, agenda do closer, performance do time e timeline de atividades.",
    status: "MVP pronto",
  },
  {
    icon: Wallet,
    area: "Operação",
    title: "Carteira de clientes",
    rotas: ["/crm/carteira", "/crm/carteira/[id]"],
    description:
      "Gestão da carteira com visão 360 por cliente: apólices, vigências, gatilhos de reoferta, conciliação de fatura e sugestões de upsell.",
    status: "MVP pronto",
  },
  {
    icon: Repeat2,
    area: "Receita",
    title: "Motor de Reoferta",
    rotas: ["/crm/reoferta"],
    description:
      "Fila priorizada de oportunidades com triggers (renovação próxima, reajuste alto, novo produto elegível, gap setorial). Receita potencial estimada por cliente.",
    status: "MVP pronto",
    highlight: true,
  },
  {
    icon: Megaphone,
    area: "Aquisição",
    title: "Campanhas & atribuição",
    rotas: ["/crm/campanhas"],
    description:
      "Painel de mídia paga com custo por lead, CAC, leads x fechamentos e ROI consolidado por canal.",
    status: "MVP pronto",
  },
  {
    icon: Handshake,
    area: "Aquisição",
    title: "Programa de parceiros",
    rotas: ["/parceiros", "/crm/parceiros"],
    description:
      "Landing pública para captação + painel admin para onboarding, pagamento de comissão e performance por parceiro.",
    status: "MVP pronto",
  },
  {
    icon: UserCircle2,
    area: "Retenção",
    title: "Portal do cliente PME",
    rotas: ["/portal", "/portal/apolices", "/portal/proposta"],
    description:
      "Experiência premium logada: visão consolidada de vidas e prêmio, apólices ativas, proposta 2026 interativa, WhatsApp direto com closer.",
    status: "MVP pronto",
    highlight: true,
  },
  {
    icon: BarChart3,
    area: "Retenção",
    title: "Benchmark setorial",
    rotas: ["/portal/benchmark"],
    description:
      "Inteligência competitiva anônima: ticket médio por CNAE, reajuste do setor, operadoras dominantes, tendências 2026.",
    status: "MVP pronto",
    highlight: true,
  },
];

const fluxos = [
  {
    icon: Target,
    step: "01",
    title: "Captação",
    desc: "Tráfego pago + SEO + parceiros + indicações → cotação online ou formulário curto.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Qualificação",
    desc: "Lead entra no CRM, é enriquecido (CNPJ, porte, CNAE) e roteado para closer sênior.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Consultoria",
    desc: "Closer prepara proposta consultiva 2-3 opções com rationale Affida, enviada como link premium.",
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "Fechamento",
    desc: "Assinatura digital + onboarding + cliente vira ativo no portal, com consultor dedicado.",
  },
  {
    icon: Repeat2,
    step: "05",
    title: "Expansão",
    desc: "Motor de reoferta dispara cross-sell (vida ao cliente saúde), antecipa renovação e defende carteira.",
  },
];

const diferenciais = [
  {
    icon: UserCircle2,
    title: "Portal do cliente é o ativo",
    desc: "Corretor PME tradicional entrega PDF no e-mail. Nós entregamos um portal logado, com benchmark setorial e proposta interativa. Vira razão pra não trocar de corretora.",
  },
  {
    icon: Repeat2,
    title: "Motor de reoferta proativo",
    desc: "Ninguém no segmento PME tem. A carteira fica monitorada 24/7 por 7 tipos de trigger. Closer acorda com a fila de oportunidades já pronta, com receita estimada.",
  },
  {
    icon: Sparkles,
    title: "Identidade de marca consultiva",
    desc: "Design premium (navy + champagne + forest, tipografia display) tira a Affida da categoria commodity. Para decisor C-level PME, isso muda a percepção de valor.",
  },
  {
    icon: BarChart3,
    title: "Inteligência setorial embutida",
    desc: "Comparativo por CNAE + porte + vidas. Cliente vê onde está vs. pares. Vira argumento pra upsell e defesa contra concorrente na renovação.",
  },
  {
    icon: ShieldCheck,
    title: "Backoffice MDS por trás",
    desc: "Associação ao grupo MDS dá SUSEP, tecnologia de backoffice e acesso a todas as operadoras relevantes do Brasil. Nasce com capacidade de empresa grande.",
  },
  {
    icon: Handshake,
    title: "Programa de parceiros pronto",
    desc: "Contadores, consultores de RH, influenciadores — todos com painel próprio e comissão recorrente. Multiplicador de aquisição de baixo custo.",
  },
];

const benchmark = [
  {
    recurso: "Cotação online multi-produto",
    affida: true,
    corretorTradicional: false,
    bidu: "parcial",
    minutoSeguros: "parcial",
    nota: "Foco PME, Vida + Saúde, com rationale consultivo",
  },
  {
    recurso: "Portal logado pro cliente",
    affida: true,
    corretorTradicional: false,
    bidu: false,
    minutoSeguros: false,
    nota: "Diferencial real no segmento PME",
  },
  {
    recurso: "Motor de reoferta com triggers",
    affida: true,
    corretorTradicional: false,
    bidu: false,
    minutoSeguros: false,
    nota: "Ninguém no mercado PME tem",
  },
  {
    recurso: "Benchmark setorial CNAE",
    affida: true,
    corretorTradicional: false,
    bidu: false,
    minutoSeguros: false,
    nota: "Inteligência competitiva proprietária",
  },
  {
    recurso: "Consultor humano dedicado",
    affida: true,
    corretorTradicional: true,
    bidu: false,
    minutoSeguros: false,
    nota: "Humano + digital, não 'ou um ou outro'",
  },
  {
    recurso: "Acesso a todas operadoras",
    affida: true,
    corretorTradicional: "parcial",
    bidu: true,
    minutoSeguros: true,
    nota: "Via MDS Group",
  },
  {
    recurso: "Programa de parceiros estruturado",
    affida: true,
    corretorTradicional: false,
    bidu: "parcial",
    minutoSeguros: false,
    nota: "Comissão recorrente + painel próprio",
  },
  {
    recurso: "Foco em PME (não B2C auto)",
    affida: true,
    corretorTradicional: true,
    bidu: false,
    minutoSeguros: false,
    nota: "Nosso playground, concorrência pequena",
  },
  {
    recurso: "Credibilidade SUSEP enterprise",
    affida: true,
    corretorTradicional: "parcial",
    bidu: true,
    minutoSeguros: true,
    nota: "Associação MDS resolve dia 1",
  },
];

const melhores = [
  {
    point: "Retenção por design",
    desc: "A combinação portal + benchmark + reoferta cria lock-in consultivo. Trocar de corretora vira perder acesso à inteligência.",
  },
  {
    point: "Margem de upsell superior",
    desc: "Motor de reoferta converte carteira existente em receita recorrente adicional. LTV cresce sem CAC adicional.",
  },
  {
    point: "Entrada premium no mercado PME",
    desc: "PME brasileira é mal atendida: ou corretor descolado, ou plataforma B2C mal adaptada. Affida preenche o vácuo.",
  },
  {
    point: "Stack tecnológico proprietário",
    desc: "CRM, motor, portal e parceiros são todos nossos — não é Pipedrive maquiado. Escala sem ficar refém de ferramenta.",
  },
  {
    point: "Chassi multi-produto",
    desc: "Vida hoje é a ponta, mas a arquitetura já contempla Saúde, Odonto, P&C, Garantia e Financeiros. Cross-sell é arquitetura, não gambiarra.",
  },
];

const gaps = [
  {
    severity: "alto",
    gap: "Cotação com preço oficial da operadora",
    desc: "Hoje o cliente recebe uma estimativa Affida. O próximo salto é preço oficial em tempo real — o que muda a conversa de 'estimativa' para 'proposta pronta pra assinar'.",
    mitigacao: "Pipe de cotação MDS em 2 operadoras (Bradesco + Amil) nos primeiros 90 dias. Rollout gradual por produto.",
  },
  {
    severity: "alto",
    gap: "Dependência estratégica do MDS",
    desc: "A associação ao MDS dá SUSEP, tecnologia de backoffice e acesso a operadoras. Em contrapartida, vira pilar do go-to-market — se a relação azedar ou MDS redirecionar foco, o produto perde oxigênio.",
    mitigacao: "Acordo de longo prazo com cláusulas de continuidade + SUSEP própria gradualmente em 24-36 meses.",
  },
  {
    severity: "medio",
    gap: "Custo de aquisição PME é estruturalmente alto",
    desc: "Vida empresarial tem ciclo 30-90 dias, decisor resistente e ticket médio moderado. Tráfego pago puro leva CAC a R$ 4-6k por cliente — o que comprime payback e limita escala agressiva.",
    mitigacao: "Peso alto em programa de parceiros (contadores = CAC baixíssimo), conteúdo de autoridade SEO e indicações clientes com incentivo recorrente.",
  },
  {
    severity: "medio",
    gap: "Motor de reoferta depende de sinal externo",
    desc: "O motor é o diferencial mais forte, mas sua inteligência depende de dados que ainda não entram sozinhos: sinistralidade, reajuste real da operadora, movimentação de folha do cliente.",
    mitigacao: "Integração Omie/ContaAzul para folha + contrato com provedor de sinistralidade + canal MDS para reajustes antecipados.",
  },
  {
    severity: "medio",
    gap: "Marca desconhecida num mercado relacional",
    desc: "PME compra seguro de quem conhece. Em cidade menor, o corretor do primo ganha da plataforma bonita. Barreira cultural, não só de branding — e se estende à defesa contra concorrência na renovação.",
    mitigacao: "Ancoragem em 'em associação ao MDS' nos primeiros 18 meses, case studies premium, relacionamento direto com associações setoriais e sindicatos patronais.",
  },
  {
    severity: "baixo",
    gap: "Benchmark setorial precisa de dados reais",
    desc: "Hoje os números do CNAE 6435-2 são inferidos. Pra virar o ativo proprietário que defende carteira na renovação, precisa base consolidada ANS + MDS anonimizada + bureau PME.",
    mitigacao: "Pipeline de dados nos primeiros 6 meses: ANS pública + base MDS anonimizada + enriquecimento Serasa PME + retroalimentação da própria carteira.",
  },
];

const roadmap = [
  {
    fase: "30 dias",
    color: "forest",
    items: [
      "Pipe de cotação MDS em 2 operadoras (Bradesco + Amil)",
      "Primeiros 3 parceiros contadores ativos + material comercial",
      "Playbook do closer + scripts consultivos por segmento",
      "Tracking completo (GA4 + Hotjar + atribuição CRM)",
    ],
  },
  {
    fase: "60-90 dias",
    color: "champagne",
    items: [
      "Integração Omie/ContaAzul (folha automática)",
      "Cotação Saúde empresarial",
      "Primeiras 10 apólices na carteira",
      "Campanha paga Google + LinkedIn",
    ],
  },
  {
    fase: "6 meses",
    color: "navy",
    items: [
      "Benchmark com dados reais (ANS + MDS)",
      "Motor de reoferta com sinal real de sinistralidade",
      "Odonto + Vida sócios como produtos ativos",
      "50+ clientes na carteira",
    ],
  },
];

function Check2({ val }: { val: boolean | "parcial" | string }) {
  if (val === true)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-forest text-ivory">
        <Check size={14} />
      </span>
    );
  if (val === "parcial")
    return (
      <span className="inline-flex h-6 items-center rounded-full bg-champagne-100 px-2 text-[10px] font-medium text-champagne-800">
        parcial
      </span>
    );
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-navy-50 text-navy-700/40">
      <X size={14} />
    </span>
  );
}

export default function PitchPage() {
  return (
    <main className="bg-ivory">
      <Navbar tone="dark" />

      <section className="grid-pattern-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-30" />
        <div className="container-wide relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="gold">Documento interno · Sócios</Badge>
              <Badge tone="neutral">v1.0 · abril 2026</Badge>
            </div>
            <p className="eyebrow mt-6 text-champagne-500">Affida Partners · Visão de produto</p>
            <h1 className="heading-display mt-5 text-display-md text-ivory text-balance sm:text-display-lg lg:text-display-xl">
              O que estamos construindo,{" "}
              <em className="italic text-champagne-300">por que vai funcionar</em> e onde ainda temos
              buracos.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ivory/75 sm:mt-6 sm:text-lg">
              Resumo executivo honesto da Affida Partners: o sistema que já está no ar, os
              diferenciais que justificam a aposta, onde somos mais fortes que o mercado e os
              gaps estratégicos que precisamos endereçar antes de escalar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:mt-10">
              <Button href="/crm" variant="gold" size="lg">
                Entrar no CRM <ArrowRight size={14} />
              </Button>
              <Button href="/portal" variant="outline" size="lg">
                Portal do cliente
              </Button>
              <Button href="/" variant="outline" size="lg">
                Landing pública
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-4">
              <div className="rounded-2xl border border-champagne-500/20 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-widest text-champagne-500">Módulos no ar</p>
                <p className="mt-2 font-display text-3xl font-light text-ivory">8</p>
                <p className="mt-1 text-xs text-ivory/60">entre marketing, CRM e portal</p>
              </div>
              <div className="rounded-2xl border border-champagne-500/20 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-widest text-champagne-500">Rotas públicas</p>
                <p className="mt-2 font-display text-3xl font-light text-ivory">45</p>
                <p className="mt-1 text-xs text-ivory/60">geradas estaticamente</p>
              </div>
              <div className="rounded-2xl border border-champagne-500/20 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-widest text-champagne-500">Personas cobertas</p>
                <p className="mt-2 font-display text-3xl font-light text-ivory">4</p>
                <p className="mt-1 text-xs text-ivory/60">visitante, closer, cliente, parceiro</p>
              </div>
              <div className="rounded-2xl border border-champagne-500/20 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-widest text-champagne-500">Stack</p>
                <p className="mt-2 font-display text-xl font-light text-ivory">Next 14 · TS · Tailwind</p>
                <p className="mt-1 text-xs text-ivory/60">static export + CI/CD GitHub</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand/40">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow">01 · O sistema</p>
              <h2 className="heading-display mt-4 text-display-lg text-navy-900">
                Oito módulos <em className="italic text-forest">conectados</em> num só produto.
              </h2>
              <p className="mt-5 text-base text-navy-700/80">
                Não é um site com CRM do lado. É um sistema único — mesmo banco, mesma identidade,
                mesmo fluxo. Aquisição, operação, receita e retenção em um só plano.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {modulos.map((m) => (
              <div
                key={m.title}
                className={`flex flex-col gap-4 rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-premium ${
                  m.highlight
                    ? "border-forest/30 bg-forest-50/40"
                    : "border-champagne-200/70 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-champagne-300">
                    <m.icon size={18} strokeWidth={1.5} />
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-champagne-600">
                    {m.area}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-light text-navy-900">{m.title}</h3>
                  <p className="mt-2 text-xs text-navy-700/75">{m.description}</p>
                </div>
                <div className="mt-auto space-y-2 border-t border-champagne-200/60 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {m.rotas.map((r) => (
                      <code
                        key={r}
                        className="rounded-md bg-navy-900/5 px-1.5 py-0.5 font-mono text-[10px] text-navy-700"
                      >
                        {r}
                      </code>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-forest">
                    <CheckCircle2 size={11} /> {m.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <p className="eyebrow">02 · Jornada ponta a ponta</p>
          <h2 className="heading-display mt-4 text-display-lg text-navy-900">
            Do primeiro clique até o{" "}
            <em className="italic text-forest">upsell da renovação</em>.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-navy-700/80">
            Cinco etapas com dono claro, métrica clara, sistema dedicado. Nada fica no Excel.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-5">
            {fluxos.map((f) => (
              <div
                key={f.step}
                className="relative rounded-2xl border border-champagne-200/70 bg-white p-5"
              >
                <span className="text-[10px] font-medium uppercase tracking-widest text-champagne-600">
                  {f.step}
                </span>
                <span className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-champagne-300">
                  <f.icon size={16} strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-display text-base font-light text-navy-900">{f.title}</h3>
                <p className="mt-2 text-xs text-navy-700/75">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 text-ivory">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <p className="eyebrow text-champagne-500">03 · Diferenciais vs mercado</p>
          <h2 className="heading-display mt-4 text-display-lg text-ivory">
            Seis coisas que{" "}
            <em className="italic text-champagne-300">ninguém no segmento PME entrega junto</em>.
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {diferenciais.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-champagne-500/20 bg-white/5 p-6 backdrop-blur-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-champagne-500/20 text-champagne-300">
                  <d.icon size={18} strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-display text-xl font-light text-ivory">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand/40">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <p className="eyebrow">04 · Comparativo direto</p>
          <h2 className="heading-display mt-4 text-display-lg text-navy-900">
            Affida vs{" "}
            <em className="italic text-forest">quem disputa o cliente</em>.
          </h2>
          <p className="mt-5 max-w-3xl text-base text-navy-700/80">
            Olhamos três arquétipos: corretor PME tradicional (nosso concorrente real em 80% dos
            casos), Bidu Corretora (plataforma digital PME/PF) e MinutoSeguros (plataforma digital
            B2C). Não incluímos MDS/AON/Marsh porque atacam enterprise.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { name: "Affida", full: 9, partial: 0, miss: 0, highlight: true },
              { name: "Corretor tradicional", full: 2, partial: 2, miss: 5 },
              { name: "Bidu Corretora", full: 3, partial: 2, miss: 4 },
              { name: "MinutoSeguros", full: 2, partial: 2, miss: 5 },
            ].map((s) => (
              <div
                key={s.name}
                className={`rounded-2xl border p-4 sm:p-5 ${
                  s.highlight
                    ? "border-forest/40 bg-forest text-ivory shadow-premium"
                    : "border-champagne-200/70 bg-white"
                }`}
              >
                <p
                  className={`text-[10px] uppercase tracking-widest ${
                    s.highlight ? "text-champagne-300" : "text-champagne-700"
                  }`}
                >
                  {s.name}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className={`font-display text-4xl font-light ${
                      s.highlight ? "text-ivory" : "text-navy-900"
                    }`}
                  >
                    {s.full}
                  </span>
                  <span
                    className={`text-sm ${
                      s.highlight ? "text-ivory/70" : "text-navy-700/60"
                    }`}
                  >
                    /9
                  </span>
                </div>
                <div
                  className={`mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] ${
                    s.highlight ? "text-ivory/80" : "text-navy-700/70"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        s.highlight ? "bg-champagne-300" : "bg-forest"
                      }`}
                    />
                    {s.full} tem
                  </span>
                  {s.partial > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-champagne-500" />
                      {s.partial} parcial
                    </span>
                  )}
                  {s.miss > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-navy-900" />
                      {s.miss} falta
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3 sm:space-y-4">
            {benchmark.map((row, i) => {
              const competidores = [
                { name: "Affida", val: row.affida, highlight: true },
                { name: "Corretor", val: row.corretorTradicional },
                { name: "Bidu", val: row.bidu },
                { name: "Minuto", val: row.minutoSeguros },
              ];
              return (
                <article
                  key={row.recurso}
                  className="rounded-2xl border border-champagne-200/70 bg-white p-5 sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-ivory sm:h-10 sm:w-10">
                      <Check size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-widest text-champagne-700">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 font-display text-base font-light text-navy-900 sm:text-lg">
                        {row.recurso}
                      </h3>
                      <p className="mt-1.5 text-xs text-navy-700/70 sm:text-[13px]">{row.nota}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2 border-t border-champagne-200/60 pt-4 sm:grid-cols-4">
                    {competidores.map((c) => {
                      const isWin = c.val === true;
                      const isPartial = c.val === "parcial";
                      return (
                        <div
                          key={c.name}
                          className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs sm:px-3 ${
                            c.highlight
                              ? "bg-forest-50/60 ring-1 ring-forest/30"
                              : "bg-sand/30"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                              isWin
                                ? "bg-forest text-ivory"
                                : isPartial
                                ? "bg-champagne-300 text-champagne-900"
                                : "bg-navy-100 text-navy-700/40"
                            }`}
                          >
                            {isWin ? (
                              <Check size={11} />
                            ) : isPartial ? (
                              "½"
                            ) : (
                              <X size={11} />
                            )}
                          </span>
                          <span
                            className={`truncate font-medium ${
                              c.highlight ? "text-forest" : "text-navy-800"
                            }`}
                          >
                            {c.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-champagne-200/70 bg-white/70 p-4 text-xs text-navy-700/70 sm:p-5">
            <strong className="text-navy-900">Fonte:</strong> análise pública dos sites em abril/2026.
            Bidu e MinutoSeguros são fortes em auto/residencial B2C; no PME vida/saúde, a experiência
            atual é limitada. &quot;Parcial&quot; indica presença tímida ou apenas para alguns produtos.
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <p className="eyebrow">05 · Onde somos melhores</p>
              <h2 className="heading-display mt-4 text-display-lg text-navy-900">
                Cinco pontos de <em className="italic text-forest">força estrutural</em>.
              </h2>
              <p className="mt-5 text-base text-navy-700/80">
                Não é só feature, é arquitetura. São decisões que um concorrente levaria 18 meses
                pra replicar — tempo suficiente pra consolidarmos carteira.
              </p>
              <div className="mt-8 rounded-2xl border border-forest/30 bg-forest-50/40 p-5">
                <div className="flex items-center gap-2 text-forest">
                  <Zap size={16} />
                  <p className="eyebrow">Vantagem composta</p>
                </div>
                <p className="mt-3 text-sm text-navy-700/85">
                  Cada cliente que entra alimenta benchmark, motor de reoferta e base de casos. O
                  produto fica mais forte com escala — característica de plataforma, não de
                  corretora.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {melhores.map((m, i) => (
                <div
                  key={m.point}
                  className="flex gap-5 rounded-2xl border border-champagne-200/70 bg-white p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm text-champagne-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-light text-navy-900">{m.point}</h3>
                    <p className="mt-2 text-sm text-navy-700/80">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-champagne-50/50">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-champagne-700" />
                <p className="eyebrow text-champagne-800">06 · Gaps estratégicos</p>
              </div>
              <h2 className="heading-display mt-4 text-display-lg text-navy-900">
                O que{" "}
                <em className="italic text-champagne-700">ainda não está resolvido</em>.
              </h2>
              <p className="mt-5 text-base text-navy-700/80">
                Só gaps de produto, posicionamento e go-to-market. Questões de engenharia
                interna (auth, infra, compliance técnico) ficam no nosso roadmap de dev e não
                entram no pitch — o que interessa aqui é onde o produto precisa evoluir e onde
                o mercado ainda pode resistir.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="warning">2 altos</Badge>
              <Badge tone="gold">3 médios</Badge>
              <Badge tone="neutral">1 baixo</Badge>
            </div>
          </div>

          <div className="mt-12 space-y-4">
            {gaps.map((g) => {
              const severityStyle =
                g.severity === "alto"
                  ? "border-l-navy-900 bg-white"
                  : g.severity === "medio"
                  ? "border-l-champagne-500 bg-white"
                  : "border-l-navy-300 bg-white";
              const badgeTone =
                g.severity === "alto"
                  ? "warning"
                  : g.severity === "medio"
                  ? "gold"
                  : "neutral";
              return (
                <div
                  key={g.gap}
                  className={`rounded-2xl border border-champagne-200/60 border-l-4 p-5 sm:p-6 ${severityStyle}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={badgeTone as "warning" | "gold" | "neutral"}>
                      {g.severity === "alto"
                        ? "risco alto"
                        : g.severity === "medio"
                        ? "risco médio"
                        : "risco baixo"}
                    </Badge>
                    <h3 className="font-display text-base font-light text-navy-900 sm:text-lg">
                      {g.gap}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-navy-700/80">{g.desc}</p>
                  <div className="mt-4 rounded-xl border border-forest/20 bg-forest-50/40 p-3 sm:p-4">
                    <p className="text-[10px] font-medium uppercase tracking-widest text-forest">
                      Mitigação
                    </p>
                    <p className="mt-1.5 text-xs text-navy-700/85 sm:text-[13px]">{g.mitigacao}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-wide py-16 sm:py-20 lg:py-24">
          <p className="eyebrow">07 · Roadmap</p>
          <h2 className="heading-display mt-4 text-display-lg text-navy-900">
            O que vem <em className="italic text-forest">nas próximas 3 janelas</em>.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-navy-700/80">
            Prazo realista, sem romance. Cada fase fecha um gap da seção anterior.
          </p>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {roadmap.map((r, i) => (
              <div
                key={r.fase}
                className={`rounded-3xl border p-7 ${
                  i === 0
                    ? "border-forest/40 bg-forest-50/40"
                    : i === 1
                    ? "border-champagne-300/60 bg-champagne-50"
                    : "border-navy-900 bg-navy-900 text-ivory"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock size={14} className={i === 2 ? "text-champagne-300" : "text-navy-700"} />
                  <p
                    className={`eyebrow ${
                      i === 2 ? "text-champagne-500" : "text-navy-800"
                    }`}
                  >
                    {r.fase}
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {r.items.map((it) => (
                    <li
                      key={it}
                      className={`flex gap-3 text-sm ${
                        i === 2 ? "text-ivory/85" : "text-navy-800"
                      }`}
                    >
                      <CheckCircle2
                        size={14}
                        className={`mt-0.5 shrink-0 ${
                          i === 0
                            ? "text-forest"
                            : i === 1
                            ? "text-champagne-700"
                            : "text-champagne-300"
                        }`}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-navy text-ivory">
        <div className="container-wide py-24 text-center">
          <Rocket size={28} className="mx-auto text-champagne-300" />
          <p className="eyebrow mt-4 text-champagne-500">Próximo passo</p>
          <h2 className="heading-display mt-4 text-display-lg text-ivory text-balance">
            O MVP está navegável,{" "}
            <em className="italic text-champagne-300">pronto pra validação com sócio e operador</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-ivory/75">
            O que precisamos agora: decisão sobre rota de integração com operadoras, validação do
            escopo com MDS, e três parceiros-piloto (1 contador, 1 RH, 1 influenciador PME) pra
            testar o funil ponta a ponta.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/" variant="gold" size="lg">
              Ver sistema funcionando <ArrowRight size={14} />
            </Button>
            <Button href="/crm" variant="outline" size="lg">
              Entrar no CRM
            </Button>
            <Button href="/portal" variant="outline" size="lg">
              Portal do cliente
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
