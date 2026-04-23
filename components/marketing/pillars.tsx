import { Gem, Brain, ShieldCheck } from "lucide-react";

const pillars = [
  {
    icon: Gem,
    title: "Atendimento sofisticado",
    description:
      "Cada cliente é único. Não oferecemos pacotes prontos — desenhamos proteções tailormade com base no seu setor, porte e ciclo de vida.",
  },
  {
    icon: Brain,
    title: "Benchmark setorial",
    description:
      "Comparamos sua empresa com outras do mesmo CNAE e porte. Você entende o que seus pares fazem antes de decidir — com transparência total.",
  },
  {
    icon: ShieldCheck,
    title: "Cuidado contínuo",
    description:
      "Sua apólice não é fechada e esquecida. Monitoramos mudanças de condições, reajustes e novas janelas para reofertar quando faz sentido para você.",
  },
];

export function Pillars() {
  return (
    <section className="bg-ivory" id="consultoria">
      <div className="container-wide py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">A forma Affida de cuidar</p>
          <h2 className="heading-display mt-4 text-display-lg text-navy-900">
            Consultoria boutique. <em className="italic text-forest">Com robustez global.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-navy-700/80">
            Unimos o melhor dos dois mundos: atendimento consultivo Affida, onde cada cliente é
            cuidado com exclusividade, e a robustez técnica e mercadológica da MDS Group em todas
            as linhas de seguros e benefícios.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group relative flex flex-col gap-5 rounded-2xl border border-champagne-200/70 bg-white p-8 transition-all hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-champagne-100 text-forest-600 transition-colors group-hover:bg-champagne-200">
                <p.icon size={22} strokeWidth={1.5} />
              </div>
              <div className="hairline" />
              <h3 className="font-display text-2xl font-light text-navy-900">{p.title}</h3>
              <p className="text-sm leading-relaxed text-navy-700/80">{p.description}</p>
              <span className="absolute right-6 top-6 font-display text-5xl font-light text-champagne-300/60">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
