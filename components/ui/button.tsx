import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost" | "dark-outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-champagne-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-ivory hover:bg-navy-700 hover:shadow-premium focus:ring-offset-ivory",
  gold:
    "bg-gradient-gold text-navy-900 hover:shadow-gold focus:ring-offset-navy",
  outline:
    "border border-champagne-400/40 bg-transparent text-ivory hover:border-champagne-300 hover:bg-champagne-500/10 focus:ring-offset-navy",
  "dark-outline":
    "border border-navy-900/15 bg-transparent text-navy-900 hover:border-navy-900/35 hover:bg-navy-900/5 focus:ring-offset-ivory",
  ghost:
    "text-navy-800 hover:text-navy-900 hover:bg-navy-900/5 focus:ring-offset-ivory",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-sm",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsButton = Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = Common & { href: string; target?: string };

export function Button(props: AsButton | AsLink) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const classes = cn(base, variants[variant], sizes[size], props.className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} target={props.target}>
        {props.children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children, ...rest } = props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
