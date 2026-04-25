import { AffidaLogo } from "@/components/ui/logo";

/**
 * Assinatura institucional Affida Partners — replica a aplicação PRIMÁRIA
 * do logo definida no Manual de Marca (dez/2025):
 *
 *   • Mockup do website (p.26): fundo Dress Blues + logo dourado
 *   • Business card (p.28):     fundo Dress Blues + logo dourado
 *   • Social media (p.29):      fundo Dress Blues + logo dourado
 *   • Aplicação positiva 1ª col (p.14): Dress Blues + AFFIDA Greige
 *
 * Esta é a face primária da marca. Fundo Dress Blues #0B1E33,
 * AFFIDA em Greige #928475 (champagne dourado) + PARTNERS em UP.
 */
export function BrandSignature() {
  return (
    <section
      className="relative overflow-hidden bg-navy-900"
      aria-label="Assinatura institucional Affida Partners"
      id="identidade"
    >
      {/* Pattern oficial Affida — respeita a recomendação do manual de
          "fundos lisos ou texturas discretas" (p.17). */}
      <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.07]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-500/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne-500/40 to-transparent" />

      {/* Glow sutil para dar profundidade — mesmo gradient ellipse do .grid-pattern-navy */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,217,198,0.08),transparent_60%)]" />

      <div className="container-wide relative z-10 flex flex-col items-center gap-10 py-20 text-center sm:py-28">
        <p className="eyebrow text-champagne-500">Identidade institucional</p>

        {/* Aplicação PRIMÁRIA: Dress Blues + AFFIDA Greige + PARTNERS UP (p.14, p.26) */}
        <AffidaLogo variant="stacked" tone="gold" className="gap-5 [&_svg]:h-16 sm:[&_svg]:h-20" />

        <div className="hairline mx-auto bg-champagne-500/50" />

        <p className="max-w-2xl font-display text-2xl font-light leading-tight text-ivory text-balance sm:text-3xl">
          <em className="italic text-champagne-300">Construindo o futuro,</em> juntos.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-medium uppercase tracking-[0.28em] text-champagne-400/90">
          <span>Confiança</span>
          <span className="h-1 w-1 rounded-full bg-champagne-500/60" aria-hidden />
          <span>Parceria</span>
          <span className="h-1 w-1 rounded-full bg-champagne-500/60" aria-hidden />
          <span>Excelência</span>
          <span className="h-1 w-1 rounded-full bg-champagne-500/60" aria-hidden />
          <span>Inovação</span>
        </div>
      </div>
    </section>
  );
}
