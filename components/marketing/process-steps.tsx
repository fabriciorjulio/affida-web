import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Análise consultiva",
    description:
      "Entendemos sua empresa: CNPJ, CNAE, porte, composição de vidas, objetivos de atração e retenção de talentos.",
  },
  {
    n: "02",
    title: "Benchmark setorial",
    description:
      "Comparamos com empresas do seu ramo e porte. Você enxerga o que seus pares fazem antes de decidir.",
  },
  {
    n: "03",
    title: "Curadoria de condições",
    description:
      "Buscamos em múltiplas seguradoras as condições que fazem sentido para o seu perfil — sem preferência comercial.",
  },
  {
    n: "04",
    title: "Proposta tailormade",
    description:
      "Apresentamos 2+ opções com coberturas, rede, coparticipação e preço lado a lado. Você escolhe com clareza.",
  },
  {
    n: "05",
    title: "Acompanhamento contínuo",
    description:
      "Monitoramos mudanças no mercado, reajustes e reofertamos quando há oportunidade — antes de você precisar pedir.",
  },
];

export function ProcessSteps() {
  return (
    <section
      className="bg-navy-900 text-ivory"
      id="como-funciona"
      aria-label="Como funciona o processo Affida"
    >
      <div className="container-wide py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-champagne-500">Como trabalhamos</p>
            <h2 className="heading-display mt-4 text-display-lg text-ivory">
              Um processo consultivo,{" "}
              <em className="italic text-champagne-300">não transacional.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/70">
              Seguros e benefícios não são commodity. É decisão estratégica. Nosso processo
              traz clareza para quem toma essa decisão.
            </p>
            <div className="mt-8 hairline bg-champagne-500" />
          </div>

          <div className="lg:col-span-8">
            <ol className="relative space-y-10 border-l border-champagne-500/15 pl-10">
              {steps.map((step) => (
                <li key={step.n} className="relative">
                  <div className="absolute -left-[3.25rem] flex h-10 w-10 items-center justify-center rounded-full border border-champagne-400/30 bg-navy-800 font-display text-sm text-champagne-400">
                    {step.n}
                  </div>
                  <h3 className="font-display text-2xl font-light text-ivory">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ivory/65">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            {/* CTA de fechamento da seção — converte quem desce até o passo
                5 e ainda não viu CTA além dos do hero. */}
            <Link
              href="/cotar/saude-coletiva"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-champagne-500 px-6 py-3 text-sm font-medium text-navy-900 transition-all hover:shadow-gold"
            >
              Começar minha cotação <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
