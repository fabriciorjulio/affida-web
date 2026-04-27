"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Building2,
  HeartPulse,
  LogIn,
  Briefcase,
  UserCircle2,
} from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Navbar institucional Affida.
 *
 * Estrutura (após orientação direta do dono):
 *   • Produtos          (âncora #produtos)
 *   • Empresas          (DROPDOWN) — substitui "Para empresas" e expõe
 *                       "Funcionalidades" em vez do antigo item de menu
 *                       "Consultoria" no top-level. Aba Consultoria fica
 *                       OCULTA do nav principal.
 *   • Indique e ganhe   (/parceiros)
 *
 *   Botão "Entrar"      (DROPDOWN) — substitui o par redundante
 *                       "Painel" (/crm) + "Área do cliente" (/portal).
 *                       Mostra duas opções claras dentro do mesmo CTA:
 *                         · Área corretora  → /crm
 *                         · Área cliente    → /portal
 *
 *   CTA gold "Cotar plano de saúde" → /cotar/saude-coletiva (mantido).
 */

// --- Itens do dropdown "Empresas" -----------------------------------------
const empresasItems: Array<{
  label: string;
  description: string;
  href: string;
  icon: typeof Sparkles;
}> = [
  {
    // Aba "Consultoria" do nav top-level fica oculta — exposta aqui dentro
    // do dropdown Empresas (orientação direta do dono).
    label: "Consultoria",
    description: "Como cuidamos da sua carteira depois da assinatura",
    href: "/#consultoria",
    icon: Sparkles,
  },
  {
    label: "Como funciona",
    description: "5 passos do funil consultivo Affida",
    href: "/#como-funciona",
    icon: HeartPulse,
  },
  {
    label: "Cotar plano de saúde",
    description: "Comparativo nas 6 principais operadoras em ~3 min",
    href: "/cotar/saude-coletiva",
    icon: Building2,
  },
];

// --- Itens do dropdown "Entrar" -------------------------------------------
const entrarItems: Array<{
  label: string;
  description: string;
  href: string;
  icon: typeof Briefcase;
}> = [
  {
    label: "Área corretora",
    description: "Painel interno · pipeline, carteira, motor de re-oferta",
    href: "/crm",
    icon: Briefcase,
  },
  {
    label: "Área cliente",
    description: "Apólices, propostas, sinistros, faturas e benchmark",
    href: "/portal",
    icon: UserCircle2,
  },
];

// --- Hook minimalista para fechar dropdown ao clicar fora -----------------
function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onOutside();
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onOutside();
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onOutside]);
  return ref;
}

// --- Dropdown desktop reutilizável ----------------------------------------
function NavDropdown({
  label,
  isDark,
  align = "left",
  items,
}: {
  label: string;
  isDark: boolean;
  align?: "left" | "right";
  items: Array<{
    label: string;
    description: string;
    href: string;
    icon: typeof Sparkles;
  }>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors",
          isDark ? "text-ivory/80 hover:text-ivory" : "text-navy-800 hover:text-navy-900"
        )}
      >
        {label}
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute top-[calc(100%+12px)] z-50 w-80 overflow-hidden rounded-2xl border border-champagne-200/60 bg-white shadow-premium",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <ul className="divide-y divide-champagne-200/40">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-champagne-50/60"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-champagne-300">
                      <Icon size={16} strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-navy-900">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-navy-700/70">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Navbar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const isDark = tone === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-md",
        isDark
          ? // Header em NEUTRAL BLACK #222222 — chrome padrão fechado.
            "border-white/10 bg-ink/95"
          : "border-navy-100 bg-ivory/90"
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Affida Partners — página inicial"
        >
          <AffidaLogo tone={isDark ? "light" : "dark"} className="h-auto" />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/#produtos"
            className={cn(
              "text-sm font-medium tracking-wide transition-colors",
              isDark ? "text-ivory/80 hover:text-ivory" : "text-navy-800 hover:text-navy-900"
            )}
          >
            Produtos
          </Link>

          {/* Dropdown "Empresas" — expõe Funcionalidades (Consultoria fica
              oculta do top-level) + Como funciona + Cotar saúde. */}
          <NavDropdown label="Empresas" isDark={isDark} items={empresasItems} />

          <Link
            href="/parceiros"
            className={cn(
              "text-sm font-medium tracking-wide transition-colors",
              isDark ? "text-ivory/80 hover:text-ivory" : "text-navy-800 hover:text-navy-900"
            )}
          >
            Indique e ganhe
          </Link>
        </nav>

        {/* CTAs desktop */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Botão "Entrar" — substitui o par redundante Painel + Área do
              cliente. Dropdown alinhado à direita. */}
          <NavDropdownButton label="Entrar" isDark={isDark} items={entrarItems} />

          <Button href="/cotar/saude-coletiva" variant="gold" size="sm">
            Cotar plano de saúde
          </Button>
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setOpen(!open)}
          className={cn("lg:hidden", isDark ? "text-ivory" : "text-navy-900")}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="border-t border-navy-100 bg-ivory px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              href="/#produtos"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy-900 hover:bg-sand/40"
            >
              Produtos
            </Link>

            <p className="mt-3 px-3 text-[10px] font-medium uppercase tracking-widest text-champagne-700">
              Empresas
            </p>
            {empresasItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-navy-800 hover:bg-sand/40"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/parceiros"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-lg px-3 py-2 text-sm font-medium text-navy-900 hover:bg-sand/40"
            >
              Indique e ganhe
            </Link>

            <p className="mt-3 px-3 text-[10px] font-medium uppercase tracking-widest text-champagne-700">
              Entrar
            </p>
            {entrarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-navy-800 hover:bg-sand/40"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-2">
              <Button href="/cotar/saude-coletiva" variant="gold" size="sm">
                Cotar plano de saúde
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// --- Variante do NavDropdown estilizada como BOTÃO (Entrar) ---------------
function NavDropdownButton({
  label,
  isDark,
  items,
}: {
  label: string;
  isDark: boolean;
  items: Array<{
    label: string;
    description: string;
    href: string;
    icon: typeof Briefcase;
  }>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] transition-all focus:outline-none focus:ring-2 focus:ring-champagne-400 focus:ring-offset-2",
          isDark
            ? "border-champagne-300/50 bg-transparent text-ivory hover:border-champagne-200 hover:bg-champagne-500/10 focus:ring-offset-navy-900"
            : "border-navy-900/15 bg-transparent text-navy-900 hover:border-navy-900/35 hover:bg-navy-900/5 focus:ring-offset-ivory"
        )}
      >
        <LogIn size={13} />
        {label}
        <ChevronDown
          size={13}
          className={cn("transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+12px)] z-50 w-80 overflow-hidden rounded-2xl border border-champagne-200/60 bg-white shadow-premium"
        >
          <ul className="divide-y divide-champagne-200/40">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-champagne-50/60"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-champagne-300">
                      <Icon size={16} strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-navy-900">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-navy-700/70">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
