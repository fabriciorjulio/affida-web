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
    <section className="bg-sand/50" id="produtos">
      <div className="container-wide py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Portfólio Affida</p>
            <h2 className="heading-display mt-4 text-display-lg text-navy-900">
              Proteções para cada momento <em className="italic text-forest">do seu negócio.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-navy-700/80">
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
                className={`group relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-7 transition-all hover:-translate-y-1 hover:shadow-premium ${
                  p.featured
                    ? "border-navy-900 bg-navy-900 text-ivory"
                    : "border-champagne-200/70 bg-white text-navy-900"
                }`}
              >
                {p.featured && (
                  <div className="absolute right-5 top-5 rounded-full bg-champagne-400/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-champagne-300">
                    Destaque
                  </div>
                )}

                <div className="space-y-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      p.featured ? "bg-champagne-500/15 text-champagne-300" : "bg-navy-50 text-navy-800"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3
                      className={`font-display text-2xl font-light ${
                        p.featured ? "text-ivory" : "text-navy-900"
                      }`}
                    >
                      {p.name}
                    </h3>
                    <p
                      className={`mt-1.5 text-sm ${
                        p.featured ? "text-ivory/70" : "text-navy-700/80"
                      }`}
                    >
                      {p.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-5 text-xs tracking-wide">
                  <span
                    className={`border-t-0 uppercase ${
                      p.featured
                        ? "border-champagne-500/10 text-champagne-400/80"
                        : "border-champagne-200/60 text-navy-700/60"
                    }`}
                  >
                    {p.salesMode === "self_service" ? "Contratação digital" : "Consultoria dedicada"}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className={`transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      p.featured ? "text-champagne-300" : "text-navy-700"
                    }`}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Badge tone="gold">Contratação digital</Badge>
          <Badge tone="neutral">Consultoria dedicada</Badge>
          <span className="text-xs text-navy-700/70">
            Todos os produtos passam pela análise consultiva tailormade Affida.
          </span>
        </div>
      </div>
    </section>
  );
}
