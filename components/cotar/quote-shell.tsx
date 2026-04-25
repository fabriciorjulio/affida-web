import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";

export function QuoteShell({
  productName,
  currentStep,
  totalSteps,
  children,
}: {
  productName: string;
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}) {
  const pct = Math.round((currentStep / totalSteps) * 100);
  return (
    <main className="min-h-screen bg-ivory">
      <header className="border-b border-champagne-200/60 bg-white/80 backdrop-blur-sm">
        <div className="container-narrow flex h-16 items-center justify-between">
          {/* Logo oficial Corbert via máscara PNG (p.6 do Manual) — DON'T #3 honrado:
              não substituímos a fonte AFFIDA + PARTNERS por Montserrat. */}
          <Link href="/" className="flex items-center" aria-label="Affida Partners — página inicial">
            <AffidaLogo variant="full" tone="dark" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-navy-700/80 hover:text-navy-900">
            <ArrowLeft size={14} /> Voltar
          </Link>
        </div>
      </header>

      <div className="container-narrow pt-10">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-navy-700/70">
          <span>
            Cotação <span className="text-navy-900">— {productName}</span>
          </span>
          <span>
            Etapa {currentStep} de {totalSteps}
          </span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-navy-50">
          <div
            className="h-full bg-champagne-500 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="container-narrow py-12 pb-24">{children}</div>
    </main>
  );
}
