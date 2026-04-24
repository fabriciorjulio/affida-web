"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Home,
  FileText,
  Receipt,
  BarChart3,
  MessageCircle,
  LogOut,
  AlertCircle,
  Wallet,
} from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";
import { ActionButton } from "@/components/ui/action-button";

const nav = [
  { href: "/portal", label: "Visão geral", icon: Home },
  { href: "/portal/apolices", label: "Minhas apólices", icon: FileText },
  { href: "/portal/proposta", label: "Proposta 2026", icon: Receipt },
  { href: "/portal/sinistros", label: "Sinistros", icon: AlertCircle },
  { href: "/portal/faturas", label: "Faturas", icon: Wallet },
  { href: "/portal/benchmark", label: "Benchmark setorial", icon: BarChart3 },
];

export function PortalShell({
  children,
  clientName,
}: {
  children: React.ReactNode;
  clientName: string;
}) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-sand/30">
      <header className="sticky top-0 z-30 border-b border-champagne-200/60 bg-white/90 backdrop-blur-sm">
        <div className="container-wide flex h-16 items-center justify-between gap-3">
          <Link href="/portal" className="flex min-w-0 items-center gap-3 text-navy-900">
            <AffidaLogo variant="mark" tone="dark" className="h-7 w-7 shrink-0" />
            <span className="truncate font-display text-base font-light tracking-wide sm:text-lg">
              Affida Partners
            </span>
            <span className="hidden text-xs text-champagne-700 md:inline">Portal do cliente</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <ActionButton
              action="whatsapp"
              whatsappMessage="Olá Lucas, estou no portal Affida."
              aria-label="Falar com consultor"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-100 text-navy-700 hover:bg-navy-50"
            >
              <MessageCircle size={15} />
            </ActionButton>
            <ActionButton
              action="demo"
              message="Você tem 2 novas notificações: fatura de abril em análise e renovação em 7 dias."
              aria-label="Notificações"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-navy-100 text-navy-700 hover:bg-navy-50"
            >
              <Bell size={15} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-champagne-500" />
            </ActionButton>
            <div className="hidden items-center gap-3 border-l border-navy-100 pl-4 md:flex">
              <div className="text-right">
                <p className="text-xs font-medium text-navy-900">{clientName}</p>
                <p className="text-[10px] text-navy-700/60">Beatriz Gomes · Controller</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-display text-xs text-champagne-300">
                BG
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile portal nav */}
      <nav className="no-scrollbar flex gap-2 overflow-x-auto border-b border-champagne-200/50 bg-white/70 px-4 py-3 backdrop-blur-sm sm:px-6 lg:hidden">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                active
                  ? "bg-navy-900 text-ivory"
                  : "border border-navy-100 bg-white text-navy-700 hover:bg-sand/50"
              }`}
            >
              <Icon size={13} strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="container-wide grid gap-8 py-8 lg:grid-cols-[240px_1fr] lg:py-10">
        <aside className="hidden lg:block">
          <nav className="sticky top-6 space-y-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all ${
                    active
                      ? "bg-navy-900 text-ivory"
                      : "text-navy-700 hover:bg-white hover:text-navy-900"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.5} />
                  {item.label}
                </Link>
              );
            })}
            <div className="my-6 h-px bg-champagne-200/60" />
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-navy-700/70 hover:bg-white hover:text-navy-900"
            >
              <LogOut size={15} strokeWidth={1.5} />
              Sair do portal
            </Link>
            <div className="mt-6 rounded-2xl border border-champagne-200/60 bg-white p-5">
              <p className="text-[10px] uppercase tracking-widest text-champagne-600">
                Seu consultor
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-display text-sm text-champagne-300">
                  LA
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-900">Lucas Azevedo</p>
                  <p className="text-[10px] text-navy-700/60">Closer sênior Affida</p>
                </div>
              </div>
              <a
                href="https://wa.me/5511900000000"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 px-4 py-2 text-xs text-ivory hover:bg-forest-700"
              >
                <MessageCircle size={12} /> Falar no WhatsApp
              </a>
            </div>
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
