import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border border-navy-100 bg-white px-4 text-sm text-navy-900 placeholder:text-navy-400 transition-colors focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-900/5",
          className
        )}
        {...props}
      />
    );
  }
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full appearance-none rounded-xl border border-navy-100 bg-white px-4 pr-10 text-sm text-navy-900 transition-colors focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-900/5",
          "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22><path d=%22M3 5l3 3 3-3%22 stroke=%22%230A1E3F%22 stroke-width=%221.5%22 fill=%22none%22/></svg>')] bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-[11px] font-medium uppercase tracking-widest text-navy-700/80",
        className
      )}
      {...props}
    />
  );
}

export function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {hint && <p className="text-xs text-navy-700/60">{hint}</p>}
    </div>
  );
}
