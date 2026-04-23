import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  delta,
  hint,
  accent = "gold",
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  accent?: "gold" | "forest" | "navy" | "rose";
  className?: string;
}) {
  const accents = {
    gold: "text-champagne-600",
    forest: "text-forest",
    navy: "text-navy-700",
    rose: "text-rose-600",
  };
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-champagne-200/60 bg-white p-6 transition-all hover:shadow-premium",
        className
      )}
    >
      <p className="text-xs uppercase tracking-widest text-navy-700/60">{label}</p>
      <p className="mt-3 font-display text-4xl font-light text-navy-900">{value}</p>
      <div className="mt-3 flex items-center gap-3 text-xs">
        {delta && <span className={cn("font-medium", accents[accent])}>{delta}</span>}
        {hint && <span className="text-navy-700/60">{hint}</span>}
      </div>
    </div>
  );
}
