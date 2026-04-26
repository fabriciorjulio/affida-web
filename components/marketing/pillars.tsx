import { Clock, Repeat2, BarChart3 } from "lucide-react";

/**
 * 3 atributos VERIFICÁVEIS COM SLA — D4.1 do PDF Conselho.
 *
 * Substitui a narrativa genérica "atendimento sofisticado / benchmark /
 * cuidado contínuo" por compromissos mensuráveis. A diferenciação real só
 * existe se for medida — então cada pilar agora carrega:
 *   - métrica explícita (number)
 *   - unidade clara (h, %, n)
 *   - prazo/ window (mensal, em D+90 etc)
 *
 * Quando o backend estiver de pé, esses 3 indicadores viram o "north star
 * dashboard" exposto também ao cliente final no portal — viram contrato
 * implícito de SLA.
 */
const pillars = [
  {
    icon: Clock,
    metric: "≤ 72h",
    title: "Lead → vigência",
    description:
      "Da cotação online até a vigência efetiva do plano em até 72 horas úteis — incluindo análise de risco da operadora, assinatura digital e carga inicial. Mediremos e publicaremos esse SLA mensalmente.",
    target: "Wave 2 · D+180 · meta: mediana < 72h",
  },
  {
    icon: Repeat2,
    metric: "100%",
    title: "Re-oferta proativa",
    description:
      "Cobertura de 100% da carteira ativa pelo motor de re-oferta: alerta automático em renovação 90/60/30 dias, reajuste anômalo da operadora, mudança de porte da empresa e janela de cross-sell elegível.",
    target: "Wave 2 · D+150 · trigger ativo em toda apólice",
  },
  {
    icon: BarChart3,
    metric: "≥ 50",
    title: "Benchmark CNAE+porte",
    description:
      "Comparativo setorial anônimo com cohort mínimo de 50 empresas do mesmo CNAE+faixa de funcionários. Cliente vê o que pares fazem em ticket, operadora dominante e reajuste real — ANS RN 412 + carteira própria.",
    target: "Wave 2 · D+180 · base ANS + carteira",
  },
];

export function Pillars() {
  return (
    <section className="bg-navy-900" id="consultoria">
      <div className="container-wide py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-champagne-500">3 SLAs que assumimos</p>
          <h2 className="heading-display mt-4 text-display-lg text-ivory">
            Diferenciação{" "}
            <em className="italic text-champagne-300">com número, prazo e prova.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ivory/75">
            Em vez de adjetivo (&ldquo;consultoria boutique&rdquo;), três compromissos mensuráveis
            que o cliente PME pode cobrar — e que serão publicados mensalmente quando
            atingirmos a Wave 2 (180 dias).
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group relative flex flex-col gap-5 rounded-2xl border border-champagne-500/15 bg-navy-800/60 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-champagne-400/30 hover:bg-navy-800/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-champagne-500/15 text-champagne-300 transition-colors group-hover:bg-champagne-500/25">
                <p.icon size={22} strokeWidth={1.5} />
              </div>
              <div className="h-px w-12 bg-champagne-500/40" />
              <p className="font-display text-4xl font-light text-champagne-300">
                {p.metric}
              </p>
              <h3 className="font-display text-2xl font-light text-ivory">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ivory/70">{p.description}</p>
              <p className="text-[10px] uppercase tracking-widest text-champagne-500/80">
                {p.target}
              </p>
              <span className="absolute right-6 top-6 font-display text-5xl font-light text-champagne-500/30">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
