import { cn } from "@/lib/utils";

type LogoVariant = "full" | "mark" | "stacked";
type LogoTone = "light" | "dark" | "mono-dark" | "mono-light";

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
// Versão dark = aplicação POSITIVA principal do logo (Manual p.14).
// Wordmark em Dress Blues #0B1E33 (primária institucional) e símbolo em
// Midnight Blue #173F65 (primária de acento). Essa é a identidade visual
// principal da marca — preferida em qualquer aplicação sobre fundo claro.
const tones: Record<LogoTone, { mark: string; wordmark: string; tag: string }> = {
  light: {
    mark: "#E1D9C6",    // UP (Pantone 2157) — símbolo em fundo escuro
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
    return (
      <svg
        viewBox="0 0 120 56"
        fill="none"
        className={cn("h-8 w-auto", className)}
        aria-label="Affida Partners — símbolo"
      >
        {/* Mão esquerda entrelaçando na direita (traço superior) */}
        <path
          d="M8 28 C 12 14, 34 12, 48 22 C 58 29, 68 29, 78 22 C 92 12, 108 14, 112 22"
          stroke={c.mark}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Mão direita entrelaçando na esquerda (traço inferior) */}
        <path
          d="M8 28 C 12 42, 28 44, 42 34 C 52 27, 62 27, 72 34 C 86 44, 108 42, 112 28"
          stroke={c.mark}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Fechamento sutil das pontas */}
        <path
          d="M112 22 C 114 24, 114 26, 112 28"
          stroke={c.mark}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 28 C 6 26, 6 24, 8 22"
          stroke={c.mark}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
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
