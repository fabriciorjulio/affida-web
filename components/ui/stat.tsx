import { cn } from "@/lib/utils";

export function Stat({
  label,
  value,
  hint,
  tone = "light",
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "space-y-2 border-l-2 pl-4",
        isDark ? "border-champagne-500/40" : "border-champagne-400",
        className
      )}
    >
      <p
        className={cn(
          "font-display text-3xl font-light leading-none lg:text-4xl",
          isDark ? "text-champagne-200" : "text-navy-900"
        )}
      >
        {value}
      </p>
      <p
        className={cn(
          "text-xs font-medium uppercase tracking-widest",
          isDark ? "text-ivory/70" : "text-navy-700/70"
        )}
      >
        {label}
      </p>
      {hint && (
        <p className={cn("text-xs", isDark ? "text-ivory/50" : "text-navy-700/50")}>
          {hint}
        </p>
      )}
    </div>
  );
}
