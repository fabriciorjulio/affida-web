import { cn } from "@/lib/utils";

type LogoVariant = "full" | "mark" | "stacked";
type LogoTone = "light" | "dark";

const tones: Record<LogoTone, { mark: string; wordmark: string; tag: string }> = {
  light: {
    mark: "#D4C29A",
    wordmark: "#FAF7F0",
    tag: "rgba(232, 223, 200, 0.75)",
  },
  dark: {
    mark: "#0A1E3F",
    wordmark: "#0A1E3F",
    tag: "#2F568F",
  },
};

export function AffidaLogo({
  variant = "full",
  tone = "light",
  className,
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
}) {
  const c = tones[tone];

  if (variant === "mark") {
    return (
      <svg viewBox="0 0 80 40" fill="none" className={cn("h-10 w-auto", className)}>
        <path
          d="M10 20 C 10 12, 24 8, 32 14 C 40 20, 48 20, 56 14 C 64 8, 76 12, 76 20 C 76 28, 64 32, 56 26 C 48 20, 40 20, 32 26 C 24 32, 10 28, 10 20 Z"
          stroke={c.mark}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={cn("inline-flex flex-col items-center gap-3", className)}>
        <AffidaLogo variant="mark" tone={tone} className="h-12" />
        <div className="flex flex-col items-center leading-none">
          <span
            className="font-display text-2xl font-light tracking-wider"
            style={{ color: c.wordmark }}
          >
            AFFIDA
          </span>
          <span
            className="mt-1 text-[9px] font-medium uppercase tracking-[0.5em]"
            style={{ color: c.tag }}
          >
            P A R T N E R S
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <AffidaLogo variant="mark" tone={tone} className="h-9" />
      <div className="flex flex-col leading-none">
        <span
          className="font-display text-xl font-light tracking-wider"
          style={{ color: c.wordmark }}
        >
          AFFIDA
        </span>
        <span
          className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.4em]"
          style={{ color: c.tag }}
        >
          PARTNERS
        </span>
      </div>
    </div>
  );
}
