import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";

/**
 * Shell do wizard de cotação (`/cotar/[product]`).
 *
 * Padrão de UI fechado: header em Neutral Black `bg-ink/95` com logo
 * `tone="light"` (versão negativa branca), igual ao Navbar global das
 * páginas institucionais. A barra de progresso da cotação fica numa
 * faixa inferior contínua em `bg-ink` para preservar a fita superior
 * Neutral Black até o conteúdo claro começar.
 */
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
      {/* Header Neutral Black (`bg-ink/95`) — igual ao Navbar global,
          padrão fechado: chrome de UI sempre Neutral Black, logo tone="light". */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-ink/95 backdrop-blur-md">
        <div className="container-narrow flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Affida Partners — página inicial"
          >
            <AffidaLogo variant="full" tone="light" />
          </Link>
          <Link
            href="/cotar"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-champagne-300 hover:text-champagne-200"
          >
            <ArrowLeft size={14} /> Voltar para cotações
          </Link>
        </div>
      </header>

      {/* Faixa de progresso ainda em Neutral Black para continuar a fita
          superior — só depois entra o conteúdo claro. */}
      <section className="border-b border-white/5 bg-ink">
        <div className="container-narrow py-6">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-champagne-400">
            <span>
              Cotação{" "}
              <span className="text-ivory">— {productName}</span>
            </span>
            <span>
              Etapa {currentStep} de {totalSteps}
            </span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-champagne-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </section>

      <div className="container-narrow py-12 pb-24">{children}</div>
    </main>
  );
}
