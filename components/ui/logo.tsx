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
// Aplicações do logo conforme Manual de Marca (dez/2025), p.13 + p.14.
//
// Sinalização p.13: o swatch DRESS BLUES (Pantone 19-4028 TCX, #0B1E33)
// é o maior da paleta (≈2× qualquer outro) e é o único sem CMYK/RGB/HEX
// impressos — a manual sinaliza Dress Blues como cor PRIMÁRIA, oferecendo
// máxima legibilidade tanto sobre fundos claros quanto como fundo de
// referência para tipografia/UP clara.
//
// p.14 (aplicações positivas) — pareamento canônico fundo→logo:
//   • Dress Blues bg     → mark/AFFIDA/PARTNERS em UP #E1D9C6 (col 2)
//   • Midnight Blue bg   → tudo em Greige #928475 — efeito champagne (col 1)
//   • Brown bg           → tudo em Greige #928475 (col 3)
//   • Greige bg          → tudo em Brown #423933 (col 4)
//   • UP / Comoyoko bg   → tudo em Dress Blues #0B1E33 (cols 5-6)
//   • Neutral Black bg   → tudo em white (versão negativa)
//
// Tones disponíveis:
//   • "gold"      → para Dress Blues bg = APLICAÇÃO PRIMÁRIA institucional
//                  (mockup website p.26, cartão p.28, social p.29).
//                  Tudo em UP cream — máxima legibilidade conforme p.14 col 2.
//   • "champagne" → para Midnight Blue ou Brown bg — Greige dourado.
//   • "dark"      → para fundos claros (UP/Comoyoko) — Dress Blues integral.
//   • "light"     → versão negativa em fundos pretos (Neutral Black).
const tones: Record<LogoTone, { mark: string; wordmark: string; tag: string }> = {
  // p.14 col 2 — Dress Blues bg: tudo em UP cream para máxima legibilidade
  gold: {
    mark: "#E1D9C6",     // UP (Pantone 2157)
    wordmark: "#E1D9C6", // UP — AFFIDA em creme integral (corrigido p/ manual)
    tag: "#E1D9C6",      // UP — PARTNERS
  },
  light: {
    mark: "#E1D9C6",     // UP — símbolo em fundo escuro
    wordmark: "#FFFFFF", // Comoyoko
    tag: "#C2BBA9",      // Greige claro
  },
  // p.14 cols 5-6 — UP/Comoyoko bg: tudo em Dress Blues (versão mais escura,
  // signalizada como primária na p.13).
  dark: {
    mark: "#0B1E33",     // Dress Blues — versão de máxima legibilidade
    wordmark: "#0B1E33", // Dress Blues — wordmark principal
    tag: "#0B1E33",      // Dress Blues — PARTNERS
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
