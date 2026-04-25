import { AffidaLogo } from "@/components/ui/logo";

/**
 * Assinatura institucional Affida Partners — replica a aplicação PRIMÁRIA
 * do logo definida no Manual de Marca (dez/2025):
 *
 *   • Sinalização p.13: Dress Blues #0B1E33 é o swatch dominante (≈2× o
 *     tamanho dos demais) e o único sem CMYK/RGB/HEX impressos — sinal de
 *     que é a cor PRIMÁRIA, oferecendo máxima legibilidade tanto sobre
 *     fundo claro quanto como fundo p/ tipografia clara.
 *   • Aplicação positiva p.14 col 2: fundo Dress Blues #0B1E33 +
 *     mark + AFFIDA + PARTNERS integralmente em UP #E1D9C6 (cream),
 *     garantindo o contraste de máxima legibilidade prescrito pelo manual.
 *   • Mockup website (p.26), business card (p.28), social media (p.29):
 *     replicam a mesma aplicação primária.
 */
export function BrandSignature() {
  return (
    <section
      className="relative overflow-hidden bg-navy-900"
      aria-label="Assinatura institucional Affida Partners"
      id="identidade"
    >
      {/* p.17.4 — "fundos lisos ou texturas discretas". Mantemos APENAS a
          textura oficial do pattern Affida em opacidade muito baixa; nenhum
          gradiente, glow ou efeito decorativo é aplicado ao redor do logo
          (p.18.8 — não aplicar gradientes/efeitos não oficiais). */}
      <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.06]" />

      <div className="container-wide relative z-10 flex flex-col items-center gap-10 py-20 text-center sm:py-28">
        <p className="eyebrow text-champagne-500">Identidade institucional</p>

        {/* Aplicação PRIMÁRIA do Manual p.6 + p.14 col 2: fundo Dress Blues + logo
            (mark + AFFIDA + PARTNERS) em UP cream. Renderizado a partir da máscara
            PNG oficial extraída do PDF — proporção e Corbert preservados conforme
            DO p.17.1 (proporção original) + DO p.17.6 (alinhamento equilibrado). */}
        <AffidaLogo
          variant="stacked"
          tone="gold"
          className="h-32 sm:h-40"
        />

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
