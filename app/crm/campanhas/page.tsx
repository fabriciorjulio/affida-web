import { Plus, Target, Pause, Play } from "lucide-react";
import { campaigns, productById } from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl } from "@/lib/utils";

const channelColor: Record<string, string> = {
  google: "bg-sky-50 text-sky-700",
  meta: "bg-navy-50 text-navy-700",
  linkedin: "bg-blue-50 text-blue-700",
  whatsapp: "bg-emerald-50 text-emerald-700",
  email: "bg-champagne-100 text-champagne-800",
  parceiros: "bg-rose-50 text-rose-700",
};

export default function CampanhasPage() {
  const totalBudget = campaigns.reduce((a, c) => a + c.budget, 0);
  const totalSpent = campaigns.reduce((a, c) => a + c.spent, 0);
  const totalLeads = campaigns.reduce((a, c) => a + c.leads, 0);
  const totalWon = campaigns.reduce((a, c) => a + c.won, 0);
  const avgCac = totalWon > 0 ? totalSpent / totalWon : 0;

  return (
    <>
      <CrmHeader title="Aquisição · Campanhas" subtitle="Marketing paid + orgânico" />

      <div className="flex-1 space-y-6 bg-sand/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Investido</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{brl(totalSpent)}</p>
            <p className="mt-1 text-xs text-navy-700/60">de {brl(totalBudget)}</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Leads gerados</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{totalLeads}</p>
            <p className="mt-1 text-xs text-navy-700/60">CPL médio {brl(totalSpent / Math.max(1, totalLeads))}</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Won</p>
            <p className="mt-2 font-display text-3xl font-light text-forest">{totalWon}</p>
            <p className="mt-1 text-xs text-navy-700/60">conv. {((totalWon / totalLeads) * 100).toFixed(1)}%</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">CAC médio</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{brl(avgCac)}</p>
            <p className="mt-1 text-xs text-navy-700/60">blended</p>
          </div>
        </section>

        <div className="flex justify-end">
          <ActionButton
            action="demo"
            message="Criador de campanha — integração com Google Ads, Meta e LinkedIn em breve."
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs text-ivory hover:bg-navy-700"
          >
            <Plus size={14} /> Nova campanha
          </ActionButton>
        </div>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => {
            const product = productById(c.product);
            const pctSpent = c.budget > 0 ? (c.spent / c.budget) * 100 : 100;
            const conv = c.leads > 0 ? (c.won / c.leads) * 100 : 0;
            return (
              <div
                key={c.id}
                className="flex flex-col gap-4 rounded-2xl border border-champagne-200/60 bg-white p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${channelColor[c.channel]}`}
                    >
                      {c.channel}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-light text-navy-900">{c.name}</h3>
                    <p className="mt-1 text-xs text-navy-700/70">
                      {product?.name ?? c.product} · Desde{" "}
                      {new Date(c.startedAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </p>
                  </div>
                  <Badge tone={c.status === "ativa" ? "success" : c.status === "pausada" ? "warning" : "neutral"}>
                    {c.status}
                  </Badge>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-navy-700/60">Budget consumido</span>
                    <span className="font-medium text-navy-900">
                      {brl(c.spent)} / {brl(c.budget)}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy-50">
                    <div
                      className="h-full bg-gradient-gold"
                      style={{ width: `${Math.min(100, pctSpent)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 border-t border-champagne-200/60 pt-4 text-center">
                  <div>
                    <p className="font-display text-lg text-navy-900">{c.leads}</p>
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Leads</p>
                  </div>
                  <div>
                    <p className="font-display text-lg text-navy-900">{c.mql}</p>
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">MQL</p>
                  </div>
                  <div>
                    <p className="font-display text-lg text-navy-900">{c.sql}</p>
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">SQL</p>
                  </div>
                  <div>
                    <p className="font-display text-lg text-forest">{c.won}</p>
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Won</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-champagne-200/60 pt-4 text-xs">
                  <div>
                    <p className="text-navy-700/60">CPL {brl(c.cpl)}</p>
                    <p className="text-navy-700/60">CAC {brl(c.cac)}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-forest-50 px-2 py-1 font-medium text-forest-700">
                      {conv.toFixed(1)}% conv.
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <ActionButton
                    action="toast"
                    message={
                      c.status === "ativa"
                        ? `Campanha "${c.name}" pausada.`
                        : `Campanha "${c.name}" reativada.`
                    }
                    className="flex flex-1 items-center justify-center gap-1 rounded-full border border-navy-100 py-2 text-xs text-navy-700 hover:bg-navy-50"
                  >
                    {c.status === "ativa" ? (
                      <>
                        <Pause size={12} /> Pausar
                      </>
                    ) : (
                      <>
                        <Play size={12} /> Ativar
                      </>
                    )}
                  </ActionButton>
                  <ActionButton
                    action="demo"
                    message={`Rodando otimização de lance em "${c.name}" — resultado em alguns minutos.`}
                    className="flex flex-1 items-center justify-center gap-1 rounded-full bg-navy-900 py-2 text-xs text-ivory hover:bg-navy-700"
                  >
                    <Target size={12} /> Otimizar
                  </ActionButton>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
