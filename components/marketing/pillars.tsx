import { Clock, ShieldCheck, Cpu } from "lucide-react";

/**
 * 3 compromissos que a Affida assume com cada cliente.
 *
 * Reescritos via PPTX 2026-04-29:
 *   1. Cotação rápida E apoio técnico (não só rapidez — também consultoria)
 *   2. Gestão de risco e previsibilidade de reajuste (acompanhamento de mercado)
 *   3. Tecnologia para gestão operacional das apólices (plataforma própria)
 *
 * Saíram: "carteira cuidada o ano inteiro" (virou parte do compromisso 2),
 * "comparativo com empresas como a sua" (já está no Affida Assessment).
 */
const pillars = [
  {
    icon: Clock,
    title: "Cotação rápida e apoio técnico",
    description:
      "Da primeira conversa, entendimento das necessidades até a implantação. Tudo de forma integrada, sem planilhas perdidas em e-mail nem ficar esperando retorno por semanas.",
    proof: "Da primeira conversa à implantação · sem planilhas perdidas",
  },
  {
    icon: ShieldCheck,
    title: "Gestão de risco e previsibilidade",
    description:
      "Acompanhamento das principais mudanças de mercado e maior previsibilidade no reajuste anual. Avisamos antes do concorrente quando algo muda no seu setor ou na sua operadora — com proposta pronta.",
    proof: "Acompanhamento contínuo do mercado · 100% da carteira",
  },
  {
    icon: Cpu,
    title: "Tecnologia para gestão das apólices",
    description:
      "Plataforma proprietária para gestão operacional e acompanhamento das apólices. Tudo o que você precisa sobre faturas, sinistros, renovações e benchmark setorial em um único portal.",
    proof: "Portal Affida · CRM + carteira monitorada",
  },
];

export function Pillars() {
  return (
    <section className="bg-navy-900" id="consultoria">
      <div className="container-wide py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-champagne-500">Como cuidamos do seu plano</p>
          <h2 className="heading-display mt-4 text-display-lg text-ivory">
            Três compromissos{" "}
            <em className="italic text-champagne-300">com você</em>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ivory/75">
            Em vez de promessas vagas (&ldquo;atendimento de excelência&rdquo;),
            três coisas concretas que você vai sentir desde o primeiro
            contato com a Affida.
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
              <h3 className="font-display text-2xl font-light text-ivory">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-ivory/70">
                {p.description}
              </p>
              <p className="mt-auto text-[10px] uppercase tracking-widest text-champagne-500/80">
                {p.proof}
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
