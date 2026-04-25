import { cn } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const markUrl = `${basePath}/affida-mark.png`;

type LogoVariant = "full" | "mark" | "stacked";
type LogoTone = "light" | "dark" | "gold" | "mono-dark" | "mono-light";

/**
 * Logo Affida Partners — conforme Manual de Marca (dez/2025).
 *
 * O símbolo representa duas mãos entrelaçadas formando um elo horizontal
 * (lemniscata aberta), simbolizando confiança e parceria. A tipografia é
 * baseada na família Corbert (Demi Bold Extended para AFFIDA, Regular Extended
 * para PARTNERS) — como esta família não é web-safe, usamos Montserrat 500
 * com tracking ampliado como substituição que preserva a leitura geométrica
 * "extended sans" do manual.
 */
// Aplicações do logo conforme Manual de Marca (dez/2025), p.14:
//   • "gold"  → primeira coluna positiva, fundo Dress Blues + AFFIDA em
//              champagne dourado (Greige) + PARTNERS em UP. É a aplicação
//              PRIMÁRIA institucional — é a versão usada no mockup do
//              website (p.26), business card (p.28) e social media (p.29).
//   • "dark"  → segunda coluna positiva, fundo claro + logo Dress Blues
//              (versão sóbria sobre creme/UP).
//   • "light" → versão negativa para fundos muito escuros (Neutral Black).
const tones: Record<LogoTone, { mark: string; wordmark: string; tag: string }> = {
  gold: {
    mark: "#E1D9C6",     // UP (Pantone 2157) — símbolo em UP claro
    wordmark: "#928475", // Greige (Pantone 16-1109 TCX) — AFFIDA em dourado/champagne
    tag: "#E1D9C6",      // UP — assinatura PARTNERS em creme claro
  },
  light: {
    mark: "#E1D9C6",     // UP — símbolo em fundo escuro
    wordmark: "#FFFFFF", // Comoyoko
    tag: "#C2BBA9",      // Greige claro
  },
  dark: {
    mark: "#173F65",     // Midnight Blue (Pantone 18-4005 TCX) — símbolo
    wordmark: "#0B1E33", // Dress Blues (Pantone 19-4028 TCX) — wordmark principal
    tag: "#173F65",      // Midnight Blue — assinatura PARTNERS
  },
  "mono-dark": {
    mark: "#222222",
    wordmark: "#222222",
    tag: "#222222",
  },
  "mono-light": {
    mark: "#FFFFFF",
    wordmark: "#FFFFFF",
    tag: "#FFFFFF",
  },
};

export function AffidaLogo({
  variant = "full",
  tone = "dark",
  className,
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
}) {
  const c = tones[tone];

  if (variant === "mark") {
    // Símbolo oficial Affida (Manual p.6) — duas mãos entrelaçadas
    // formando lemniscata aberta com brush stroke. Imagem extraída
    // do próprio Manual de Marca; colorizada via CSS mask-image
    // para preservar a forma exata em qualquer paleta.
    return (
      <span
        role="img"
        aria-label="Affida Partners — símbolo"
        className={cn("inline-block aspect-[798/184] h-8 w-auto shrink-0", className)}
        style={{
          backgroundColor: c.mark,
          WebkitMaskImage: `url(${markUrl})`,
          maskImage: `url(${markUrl})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    );
  }

  if (variant === "stacked") {
    return (
      <div className={cn("inline-flex flex-col items-center gap-4", className)}>
        <AffidaLogo variant="mark" tone={tone} className="h-10" />
        <div className="flex flex-col items-center leading-none">
          <span
            // Corbert Demi Bold Extended → Montserrat medium com tracking-brand-tight
            className="font-display text-[30px] font-medium tracking-brand-tight uppercase"
            style={{ color: c.wordmark }}
          >
            Affida
          </span>
          <span
            // Corbert Regular Extended → Montserrat light com tracking-brand ampliado
            className="mt-2 text-[11px] font-light tracking-brand uppercase"
            style={{ color: c.tag }}
          >
            Partners
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <AffidaLogo variant="mark" tone={tone} className="h-8" />
      <div className="flex flex-col leading-none">
        <span
          className="font-display text-[19px] font-medium tracking-brand-tight uppercase"
          style={{ color: c.wordmark }}
        >
          Affida
        </span>
        <span
          className="mt-1 text-[9px] font-light tracking-brand uppercase"
          style={{ color: c.tag }}
        >
          Partners
        </span>
      </div>
    </div>
  );
}
