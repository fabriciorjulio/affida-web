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
import { products } from "@/lib/mock-data";
import { AffidaLogo } from "@/components/ui/logo";
import { Badge } from "@/components/ui/badge";

const iconMap = { Shield, Crown, HeartPulse, Smile, Scale, Car, Building2, PawPrint };

export const metadata = {
  title: "Cotação PME · Affida Partners",
  description: "Compare em minutos as melhores condições de seguros para o seu negócio.",
};

export default function CotarIndexPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <header className="border-b border-champagne-200/60 bg-white/80 backdrop-blur-sm">
        <div className="container-narrow flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-navy-900">
            <AffidaLogo variant="mark" tone="dark" className="h-7 w-7" />
            <span className="font-display text-lg font-light tracking-wide">Affida Partners</span>
          </Link>
          <Link href="/" className="text-xs text-navy-700/80 hover:text-navy-900">
            Voltar à home
          </Link>
        </div>
      </header>

      <section className="container-narrow py-16">
        <p className="eyebrow">Comece por onde faz sentido</p>
        <h1 className="heading-display mt-3 text-display-lg text-navy-900">
          Qual seguro você quer <em className="italic text-forest">cotar</em>?
        </h1>
        <p className="mt-4 max-w-2xl text-base text-navy-700/80">
          Nossa plataforma compara em minutos as principais condições das operadoras líderes do
          mercado brasileiro. Produtos simples têm contratação 100% digital — complexos recebem
          consultoria dedicada de um closer Affida.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
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
                  <Badge tone={p.salesMode === "self_service" ? "gold" : "neutral"}>
                    {p.salesMode === "self_service" ? "Digital" : "Consultoria"}
                  </Badge>
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
    </main>
  );
}
