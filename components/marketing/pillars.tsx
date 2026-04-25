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
    <section className="bg-navy-900" id="consultoria">
      <div className="container-wide py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-champagne-500">A forma Affida de cuidar</p>
          <h2 className="heading-display mt-4 text-display-lg text-ivory">
            Consultoria boutique.{" "}
            <em className="italic text-champagne-300">Acesso direto ao mercado.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ivory/75">
            Atendimento consultivo, onde cada cliente PME é cuidado com exclusividade, combinado a
            código de corretagem aberto nas principais operadoras de saúde, vida e ramos
            elementares — a Affida negocia direto, sem intermediários no caminho.
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
              <h3 className="font-display text-2xl font-light text-ivory">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ivory/70">{p.description}</p>
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
