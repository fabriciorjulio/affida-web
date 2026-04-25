import { cn } from "@/lib/utils";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const markUrl = `${basePath}/affida-mark.png`;
const wordmarkUrl = `${basePath}/affida-wordmark.png`;
const stackedUrl = `${basePath}/affida-logo-stacked.png`;

type LogoVariant = "full" | "mark" | "stacked";
type LogoTone = "light" | "dark" | "gold" | "mono-dark" | "mono-light";

/**
 * Logo Affida Partners — conforme Manual de Marca (dez/2025).
 *
 * Tanto o símbolo (lemniscata aberta = duas mãos entrelaçadas) quanto a
 * tipografia AFFIDA + PARTNERS (Corbert Demi Bold Extended / Regular Extended)
 * são renderizados a partir das máscaras OFICIAIS extraídas diretamente do
 * PDF do Manual (p.6 LOGO PRINCIPAL) — preservando integralmente:
 *   • DO p.17.1: proporção original símbolo + tipografia
 *   • DON'T p.18.3: NÃO substituir a fonte por outra (não-Corbert)
 *
 * As três variantes definidas no manual (p.7 LOGO DESMEMBRADA) são respeitadas:
 *   • mark    → apenas símbolo
 *   • stacked → símbolo + AFFIDA/PARTNERS centralizados (aplicação principal p.6)
 *   • full    → símbolo + AFFIDA/PARTNERS lateral (versão horizontal compacta)
 *
 * A coloração é feita via CSS mask-image (background-color) — uma única cor
 * sólida por vez, sem gradientes, contornos ou efeitos (DON'T p.18.5 e p.18.8).
 */
// Aplicações do logo conforme Manual de Marca (dez/2025), p.13 + p.14.
//
// p.14 (aplicações positivas) — pareamento canônico fundo→logo:
//   • Dress Blues bg     → tudo em UP #E1D9C6 (col 2)  → tone "gold"
//   • UP / Comoyoko bg   → tudo em Dress Blues #0B1E33 → tone "dark"
//   • Neutral Black bg   → tudo em white (negativa col 7) → tone "light"
//
// Como o logo é uma máscara monocromática única (mark + wordmark renderizados
// pela mesma fonte oficial), basta uma única cor por aplicação — não há mais
// risco de wordmark divergir do símbolo.
const tones: Record<LogoTone, string> = {
  // p.14 col 2 — Dress Blues bg: UP cream
  gold: "#E1D9C6",
  // p.14 col 7 — Neutral Black bg: branco (versão negativa)
  light: "#FFFFFF",
  // p.14 cols 5-6 — UP / Comoyoko bg: Dress Blues
  dark: "#0B1E33",
  "mono-dark": "#222222",
  "mono-light": "#FFFFFF",
};

// Razões de aspecto extraídas dos PNGs oficiais (p.6 do Manual)
const ASPECT = {
  mark: "798 / 184",       // só símbolo (lemniscata aberta)
  wordmark: "3164 / 955",  // AFFIDA (Demi Bold Ext) + PARTNERS (Reg Ext)
  stacked: "3164 / 1926",  // composição completa do manual p.6
} as const;

function maskStyle(url: string, color: string) {
  return {
    backgroundColor: color,
    WebkitMaskImage: `url(${url})`,
    maskImage: `url(${url})`,
    WebkitMaskRepeat: "no-repeat" as const,
    maskRepeat: "no-repeat" as const,
    WebkitMaskSize: "contain" as const,
    maskSize: "contain" as const,
    WebkitMaskPosition: "center" as const,
    maskPosition: "center" as const,
  };
}

export function AffidaLogo({
  variant = "full",
  tone = "dark",
  className,
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
}) {
  const color = tones[tone];

  // Variante "mark": apenas o símbolo (lemniscata) — extraído do PDF p.6.
  if (variant === "mark") {
    return (
      <span
        role="img"
        aria-label="Affida Partners — símbolo"
        className={cn("inline-block h-8 w-auto shrink-0", className)}
        style={{ aspectRatio: ASPECT.mark, ...maskStyle(markUrl, color) }}
      />
    );
  }

  // Variante "stacked": composição completa idêntica ao Manual p.6 LOGO PRINCIPAL.
  // Renderizada como máscara única (mark + wordmark) para garantir proporção
  // e respiro originais — DO p.17.1 (proporção) + p.17.6 (alinhamento equilibrado).
  if (variant === "stacked") {
    return (
      <span
        role="img"
        aria-label="Affida Partners — logo institucional"
        className={cn("inline-block h-24 w-auto shrink-0", className)}
        style={{ aspectRatio: ASPECT.stacked, ...maskStyle(stackedUrl, color) }}
      />
    );
  }

  // Variante "full": símbolo à esquerda + wordmark (AFFIDA + PARTNERS) à direita.
  // Layout horizontal compacto para headers e itens de UI; ambos os elementos
  // são máscaras oficiais do PDF — Corbert Demi Bold Extended (AFFIDA) e
  // Corbert Regular Extended (PARTNERS) preservados pixel-a-pixel.
  return (
    <span
      role="img"
      aria-label="Affida Partners"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <span
        aria-hidden
        className="inline-block h-8 w-auto shrink-0"
        style={{ aspectRatio: ASPECT.mark, ...maskStyle(markUrl, color) }}
      />
      <span
        aria-hidden
        className="inline-block h-7 w-auto shrink-0"
        style={{ aspectRatio: ASPECT.wordmark, ...maskStyle(wordmarkUrl, color) }}
      />
    </span>
  );
}
