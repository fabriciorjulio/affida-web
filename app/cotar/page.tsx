import Link from "next/link";
import {
  Shield,
  Crown,
  HeartPulse,
  Smile,
  Scale,
  Car,
  Building2,
  PawPrint,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { mvpProducts, consultiveProducts } from "@/lib/mock-data";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Badge } from "@/components/ui/badge";

const iconMap = { Shield, Crown, HeartPulse, Smile, Scale, Car, Building2, PawPrint };

export const metadata = {
  title: "Cotação PME · Affida Partners",
  description: "Compare em minutos as melhores condições de seguros para o seu negócio.",
};

export default function CotarIndexPage() {
  return (
    <main className="min-h-screen bg-ivory">
      {/* Navbar institucional padrão (Neutral Black + logo branco) — substituiu
          o header custom que estava em white/80 com logo dark, fora do padrão
          fechado. */}
      <Navbar tone="dark" />

      {/* Hero superior em bg-ink (Neutral Black) — fita contínua com o
          chrome do header. Padrão fechado: páginas internas com Navbar
          tone="dark" mantêm Neutral Black no hero topo, evitando o degrau
          Neutral Black → Dress Blues. */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.08]" />
        <div className="container-narrow relative z-10 py-16 sm:py-20">
          <p className="eyebrow text-champagne-500">Comece por onde faz sentido</p>
          <h1 className="heading-display mt-4 text-display-lg text-ivory text-balance">
            Qual seguro você quer{" "}
            <em className="italic text-champagne-300">cotar</em>?
          </h1>
          <p className="mt-5 max-w-2xl text-base text-ivory/75">
            Nossa plataforma compara em minutos as principais condições das operadoras líderes do
            mercado brasileiro. Saúde é o produto principal — Amil, Bradesco Saúde, SulAmérica,
            Porto Saúde, Unimed e Hapvida. Demais ramos viram cross-sell sobre a base de saúde.
          </p>
        </div>
      </section>

      <section className="container-narrow py-16">
        {/* Bloco MVP: 3 produtos com cotador online + closer ativo (PDF D4.2) */}
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex h-8 items-center rounded-full bg-forest-50 px-3 text-[10px] font-medium uppercase tracking-widest text-forest">
            Cotação online · MVP ativo
          </span>
          <p className="text-xs text-navy-700/70">
            3 produtos com comparativo digital em minutos
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mvpProducts.map((p) => {
            const Icon = iconMap[p.icon as keyof typeof iconMap] ?? Shield;
            return (
              <Link
                key={p.id}
                href={`/cotar/${p.id}`}
                className="group flex flex-col gap-4 rounded-2xl border border-champagne-200/70 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <Badge tone="gold">Cotar online</Badge>
                </div>
                <div>
                  <h3 className="font-display text-xl font-light text-navy-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-navy-700/80">{p.tagline}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-champagne-200/50 pt-4 text-xs text-navy-700/70">
                  <span>A partir de {p.minVidas} vida(s)</span>
                  <ArrowUpRight
                    size={16}
                    className="text-navy-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bloco "sob consulta": 5 ramos sem cotador no MVP, atendidos por
            consultor sênior. PDF D4.2 — diversificação fica para Wave 3. */}
        <div className="mt-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-8 items-center rounded-full bg-champagne-100 px-3 text-[10px] font-medium uppercase tracking-widest text-champagne-800">
              Sob consulta
            </span>
            <p className="text-xs text-navy-700/70">
              Demais ramos atendidos por consultor sênior · cotador online
              previsto na Wave 3
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {consultiveProducts.map((p) => {
              const Icon = iconMap[p.icon as keyof typeof iconMap] ?? Shield;
              return (
                <Link
                  key={p.id}
                  href={`https://wa.me/5511900000000?text=${encodeURIComponent(
                    `Olá Affida, gostaria de uma consultoria sobre ${p.name} para a minha empresa.`
                  )}`}
                  target="_blank"
                  className="group flex items-center gap-4 rounded-2xl border border-champagne-200/60 bg-white/60 p-5 transition-all hover:-translate-y-0.5 hover:border-champagne-300 hover:bg-white"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-champagne-50 text-champagne-700">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-sm font-light text-navy-900">
                      {p.name}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-navy-700/65">
                      {p.tagline}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-navy-700/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-navy-900 p-10 text-ivory">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow text-champagne-500">Não encontrou seu seguro?</p>
              <h3 className="heading-display mt-2 text-2xl text-ivory">
                Fale com um consultor <em className="italic text-champagne-300">Affida</em>.
              </h3>
              <p className="mt-2 text-sm text-ivory/70">
                Estruturamos apólices sob medida, inclusive para riscos específicos do seu setor.
              </p>
            </div>
            <Link
              href="https://wa.me/5511900000000"
              className="inline-flex items-center gap-2 rounded-full bg-champagne-500 px-6 py-3 text-sm font-medium text-navy-900 hover:shadow-gold"
            >
              Falar com consultor <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
