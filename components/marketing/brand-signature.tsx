import { AffidaLogo } from "@/components/ui/logo";

/**
 * Assinatura institucional de marca — aplicação POSITIVA principal do logo,
 * conforme Manual de Marca Affida Partners (dez/2025), página 14.
 *
 * Fundo claro (UP #E1D9C6 / Comoyoko) + logo em Dress Blues #0B1E33 +
 * Midnight Blue #173F65 — essa é a primeira forma de identidade visual
 * da marca. Os 4 pilares (CONFIANÇA · PARCERIA · EXCELÊNCIA · INOVAÇÃO)
 * e a tagline "Construindo o futuro, juntos." reforçam o posicionamento.
 */
export function BrandSignature() {
  return (
    <section
      className="relative overflow-hidden bg-ivory"
      aria-label="Assinatura institucional Affida Partners"
      id="identidade"
    >
      {/* Camada de pattern sutil — respeita "fundos lisos ou texturas discretas" (p.17) */}
      <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.04]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne-300 to-transparent" />

      <div className="container-wide relative z-10 flex flex-col items-center gap-10 py-20 text-center sm:py-24">
        <p className="eyebrow text-champagne-700">Identidade Affida Partners</p>

        {/* Logo stacked em AZUL ESCURO — versão positiva principal do manual */}
        <AffidaLogo variant="stacked" tone="dark" className="gap-5 [&_svg]:h-14 sm:[&_svg]:h-16" />

        <div className="hairline" />

        <p className="max-w-2xl font-display text-2xl font-light leading-tight text-navy-900 text-balance sm:text-3xl">
          <em className="italic text-champagne-700">Construindo o futuro,</em> juntos.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] font-medium uppercase tracking-[0.28em] text-navy-700">
          <span>Confiança</span>
          <span className="h-1 w-1 rounded-full bg-champagne-500" aria-hidden />
          <span>Parceria</span>
          <span className="h-1 w-1 rounded-full bg-champagne-500" aria-hidden />
          <span>Excelência</span>
          <span className="h-1 w-1 rounded-full bg-champagne-500" aria-hidden />
          <span>Inovação</span>
        </div>
      </div>
    </section>
  );
}
