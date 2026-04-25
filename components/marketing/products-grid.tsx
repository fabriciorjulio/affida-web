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
  ArrowUpRight,
} from "lucide-react";
import { products } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  Shield,
  Crown,
  HeartPulse,
  Smile,
  Scale,
  Car,
  Building2,
  PawPrint,
};

export function ProductsGrid() {
  return (
    <section className="bg-navy-900" id="produtos">
      <div className="container-wide py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow text-champagne-500">Portfólio Affida</p>
            <h2 className="heading-display mt-4 text-display-lg text-ivory">
              Proteções para cada momento{" "}
              <em className="italic text-champagne-300">do seu negócio.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ivory/70">
            Produtos simples: contratação 100% digital em minutos. Produtos complexos:
            consultoria dedicada com um closer Affida.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const Icon = iconMap[p.icon as keyof typeof iconMap] ?? Shield;
            return (
              <Link
                key={p.id}
                href={`/cotar/${p.id}`}
                className={`group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-7 backdrop-blur-sm transition-all hover:-translate-y-1 ${
                  p.featured
                    ? "border-champagne-400/40 bg-navy-800 text-ivory hover:border-champagne-300/60"
                    : "border-champagne-500/15 bg-navy-800/50 text-ivory hover:border-champagne-400/30 hover:bg-navy-800/70"
                }`}
              >
                {p.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-champagne-500/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-champagne-300">
                    Destaque
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-champagne-500/15 text-champagne-300">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-light text-ivory">{p.name}</h3>
                    <p className="mt-1.5 text-sm text-ivory/65">{p.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-champagne-500/15 pt-5 text-xs tracking-wide">
                  <span className="uppercase text-champagne-400/80">
                    {p.salesMode === "self_service" ? "Contratação digital" : "Consultoria dedicada"}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-champagne-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Badge tone="gold">Contratação digital</Badge>
          <Badge tone="navy">Consultoria dedicada</Badge>
          <span className="text-xs text-ivory/65">
            Todos os produtos passam pela análise consultiva tailormade Affida.
          </span>
        </div>
      </div>
    </section>
  );
}
