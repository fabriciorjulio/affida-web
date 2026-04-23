"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Produtos", href: "/#produtos" },
  { label: "Consultoria", href: "/#consultoria" },
  { label: "Parceiros", href: "/parceiros" },
  { label: "Para empresas", href: "/portal" },
  { label: "Painel", href: "/crm" },
];

export function Navbar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const isDark = tone === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md",
        isDark
          ? "border-champagne-500/10 bg-navy-900/70"
          : "border-navy-100 bg-ivory/80"
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <AffidaLogo tone={isDark ? "light" : "dark"} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                isDark ? "text-ivory/80 hover:text-ivory" : "text-navy-800 hover:text-navy-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href="/cotar"
            variant={isDark ? "outline" : "dark-outline"}
            size="sm"
          >
            Área do cliente
          </Button>
          <Button href="/cotar/vida-empresarial" variant="gold" size="sm">
            Solicitar proposta
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "lg:hidden",
            isDark ? "text-ivory" : "text-navy-900"
          )}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-ivory px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-navy-900"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button href="/cotar" variant="dark-outline" size="sm">
                Área do cliente
              </Button>
              <Button href="/cotar/vida-empresarial" variant="gold" size="sm">
                Solicitar proposta
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
