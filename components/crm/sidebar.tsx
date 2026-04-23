"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";

const nav = [
  { label: "Dashboard", href: "/crm", icon: LayoutDashboard },
  { label: "Pipeline", href: "/crm/pipeline", icon: Briefcase },
  { label: "Leads", href: "/crm/leads", icon: Users },
  { label: "Carteira", href: "/crm/carteira", icon: FileText },
  { label: "Motor de re-oferta", href: "/crm/reoferta", icon: Zap },
  { label: "Campanhas", href: "/crm/campanhas", icon: Megaphone },
  { label: "Parceiros", href: "/crm/parceiros", icon: Handshake },
];

export function CrmSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-700/40 bg-navy-950 text-ivory lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-navy-700/40 px-6">
        <AffidaLogo variant="mark" tone="light" className="h-7 w-7" />
        <div>
          <p className="font-display text-sm font-light tracking-wide text-ivory">Affida Partners</p>
          <p className="text-[10px] uppercase tracking-widest text-champagne-400">CRM · Operação</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/crm" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
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
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ivory/60 hover:bg-navy-800/60 hover:text-ivory"
        >
          <Settings size={16} strokeWidth={1.5} />
          Configurações
        </Link>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-navy-800/60 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-champagne-500/20 font-display text-sm text-champagne-300">
            BV
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-xs font-medium text-ivory">Bernardo Villas</p>
            <p className="truncate text-[10px] text-ivory/60">Head of Sales · Affida</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function CrmHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-100 bg-white/80 px-8 py-5 backdrop-blur-sm">
      <div>
        <p className="text-xs uppercase tracking-widest text-champagne-600">{subtitle ?? "Painel operacional"}</p>
        <h1 className="heading-display text-2xl text-navy-900 lg:text-3xl">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-500" />
          <input
            type="search"
            placeholder="Buscar CNPJ, lead, apólice..."
            className="h-10 w-80 rounded-full border border-navy-100 bg-white pl-9 pr-4 text-sm placeholder:text-navy-400 focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-900/5"
          />
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-700 hover:bg-navy-50">
          <Bell size={16} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>
      </div>
    </header>
  );
}
