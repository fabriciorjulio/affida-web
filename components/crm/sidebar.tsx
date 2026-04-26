"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Zap,
  Megaphone,
  Handshake,
  FileText,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  Target,
} from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";
import { toast } from "@/components/ui/toaster";

const nav = [
  { label: "Dashboard", href: "/crm", icon: LayoutDashboard },
  { label: "Conselho", href: "/crm/conselho", icon: Target },
  { label: "Pipeline", href: "/crm/pipeline", icon: Briefcase },
  { label: "Leads", href: "/crm/leads", icon: Users },
  { label: "Carteira", href: "/crm/carteira", icon: FileText },
  { label: "Motor de re-oferta", href: "/crm/reoferta", icon: Zap },
  { label: "Campanhas", href: "/crm/campanhas", icon: Megaphone },
  { label: "Indicadores", href: "/crm/parceiros", icon: Handshake },
];

function NavList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item) => {
          const active =
            pathname === item.href || (item.href !== "/crm" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-champagne-500/10 text-ivory"
                  : "text-ivory/60 hover:bg-navy-800/60 hover:text-ivory"
              }`}
            >
              <Icon size={16} strokeWidth={1.5} />
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-champagne-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-navy-700/40 p-4">
        <Link
          href="/crm/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ivory/60 hover:bg-navy-800/60 hover:text-ivory"
        >
          <Settings size={16} strokeWidth={1.5} />
          Configurações
        </Link>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-navy-800/60 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne-500/20 font-display text-sm text-champagne-300">
            CN
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-xs font-medium text-ivory">Carlos Nardone</p>
            <p className="truncate text-[10px] text-ivory/60">CEO · Affida</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function CrmSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-700/40 bg-navy-950 text-ivory lg:flex">
      {/* Logo oficial Corbert (p.6) — sem substituição de fonte por Montserrat (DON'T #3).
          Sidebar tem fundo navy-950 muito escuro → tone "light" (versão negativa branca). */}
      <div className="flex h-16 items-center gap-4 border-b border-navy-700/40 px-6">
        <AffidaLogo variant="full" tone="light" />
        <p className="text-[10px] uppercase tracking-widest text-champagne-400">CRM</p>
      </div>
      <NavList pathname={pathname} />
    </aside>
  );
}

export function CrmHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 bg-white/90 px-4 py-4 backdrop-blur-sm sm:px-6 md:gap-4 md:py-5 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-700 hover:bg-navy-50 lg:hidden"
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0">
            <p className="truncate text-[10px] uppercase tracking-widest text-champagne-600 sm:text-xs">
              {subtitle ?? "Painel operacional"}
            </p>
            <h1 className="heading-display truncate text-xl text-navy-900 sm:text-2xl lg:text-3xl">
              {title}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-500"
            />
            <input
              type="search"
              placeholder="Buscar CNPJ, lead, apólice..."
              className="h-10 w-64 rounded-full border border-navy-100 bg-white pl-9 pr-4 text-sm placeholder:text-navy-400 focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-900/5 lg:w-80"
            />
          </div>
          <button
            type="button"
            aria-label="Notificações"
            onClick={() =>
              toast(
                "3 novas notificações: 1 gatilho de re-oferta, 2 leads em SLA estourado.",
                "info"
              )
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-700 hover:bg-navy-50"
          >
            <Bell size={16} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-champagne-500 ring-2 ring-white" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
          />
          <aside className="relative flex h-full w-72 max-w-[85%] flex-col bg-navy-950 text-ivory shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-navy-700/40 px-6">
              {/* Drawer mobile — mesma versão negativa do sidebar (Corbert oficial). */}
              <div className="flex items-center gap-4">
                <AffidaLogo variant="full" tone="light" />
                <p className="text-[10px] uppercase tracking-widest text-champagne-400">
                  CRM
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ivory/70 hover:bg-navy-800/60 hover:text-ivory"
              >
                <X size={18} />
              </button>
            </div>
            <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
