import { cn } from "@/lib/utils";

type BadgeTone =
  | "neutral"
  | "gold"
  | "navy"
  | "success"
  | "warning"
  | "danger"
  | "info";

// Tons alinhados ao Manual de Marca Affida (dez/2025) — paleta estrita:
// Navy (Dress Blues + Midnight) · Champagne (UP + Greige) · Forest (Brown) · Ivory + Ink.
// Status diferenciam-se por intensidade dentro da paleta, não por cores externas.
const tones: Record<BadgeTone, string> = {
  neutral: "bg-navy-50 text-navy-800 border-navy-100",
  gold: "bg-champagne-100 text-champagne-800 border-champagne-300",
  navy: "bg-navy-900 text-champagne-200 border-navy-700",
  success: "bg-forest-50 text-forest-700 border-forest-200",
  warning: "bg-champagne-100 text-champagne-800 border-champagne-300",
  danger: "bg-navy-100 text-navy-900 border-navy-300",
  info: "bg-champagne-50 text-navy-700 border-champagne-200",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ tone = "neutral" }: { tone?: "neutral" | "success" | "warning" | "danger" | "info" }) {
  const colors = {
    neutral: "bg-navy-400",
    success: "bg-forest-600",
    warning: "bg-champagne-600",
    danger: "bg-navy-900",
    info: "bg-navy-500",
  };
  return <span className={cn("inline-block h-1.5 w-1.5 rounded-full", colors[tone])} />;
}
