import Link from "next/link";
import { Filter, Plus, Phone, MessageCircle, Mail } from "lucide-react";
import { leads, pipelineStages, productById } from "@/lib/mock-data";
import { brl } from "@/lib/utils";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";

const stageAccent: Record<string, string> = {
  novo: "border-t-navy-400",
  qualificado: "border-t-sky-500",
  proposta: "border-t-champagne-500",
  negociacao: "border-t-amber-500",
  fechado: "border-t-forest",
  perdido: "border-t-rose-400",
};

export default function PipelinePage() {
  const byStage = pipelineStages.map((stage) => ({
    ...stage,
    items: leads.filter((l) => l.stage === stage.id),
  }));
  const totalValue = leads
    .filter((l) => !["fechado", "perdido"].includes(l.stage))
    .reduce((acc, l) => acc + l.estimatedCommission, 0);

  return (
    <>
      <CrmHeader title="Pipeline comercial" subtitle="Funil de vendas Affida" />

      <div className="flex-1 space-y-6 bg-sand/20 px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-3">
            <Badge tone="neutral">Total em aberto: {brl(totalValue)}</Badge>
            <Badge tone="gold">{leads.filter((l) => !["fechado", "perdido"].includes(l.stage)).length} leads ativos</Badge>
          </div>
          <div className="flex gap-3">
            <ActionButton
              action="demo"
              message="Filtros avançados por estágio, score e consultor em breve."
              className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50"
            >
              <Filter size={14} /> Filtros
            </ActionButton>
            <ActionButton
              action="toast"
              href="/crm/leads/novo"
              className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs text-ivory hover:bg-navy-700"
            >
              <Plus size={14} /> Novo lead
            </ActionButton>
          </div>
        </div>

        <div className="grid gap-4 overflow-x-auto lg:grid-cols-6">
          {byStage.map((col) => (
            <div
              key={col.id}
              className={`min-w-[240px] rounded-2xl border border-champagne-200/60 bg-white/80 ${stageAccent[col.id]} border-t-2`}
            >
              <div className="flex items-center justify-between border-b border-champagne-200/60 px-4 py-3">
                <p className="text-[11px] font-medium uppercase tracking-widest text-navy-700/80">
                  {col.label}
                </p>
                <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[10px] font-medium text-navy-700">
                  {col.items.length}
                </span>
              </div>
              <div className="max-h-[70vh] space-y-3 overflow-y-auto p-3">
                {col.items.map((l) => {
                  const product = productById(l.productOfInterest);
                  return (
                    <Link
                      key={l.id}
                      href={`/crm/leads/${l.id}`}
                      className="block rounded-xl border border-champagne-200/50 bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-premium"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-navy-900">{l.nomeFantasia}</p>
                          <p className="text-[10px] uppercase tracking-widest text-champagne-600">
                            {product?.segment} · {l.vidas} vidas
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                            l.score >= 85
                              ? "bg-emerald-50 text-forest-700"
                              : l.score >= 70
                                ? "bg-champagne-100 text-champagne-800"
                                : "bg-navy-50 text-navy-700"
                          }`}
                        >
                          {l.score}
                        </span>
                      </div>
                      <p className="mt-2 truncate text-xs text-navy-700/70">{l.contact.nome}</p>
                      <p className="mt-2 font-display text-base font-light text-navy-900">
                        {brl(l.estimatedCommission)}
                      </p>
                      {l.nextAction && (
                        <p className="mt-2 text-[11px] text-champagne-700 line-clamp-2">
                          → {l.nextAction}
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-navy-700/60">{l.owner}</span>
                        <div className="flex gap-1">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                            <Phone size={10} />
                          </span>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                            <MessageCircle size={10} />
                          </span>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-50 text-navy-700">
                            <Mail size={10} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {col.items.length === 0 && (
                  <p className="rounded-lg border border-dashed border-champagne-200/80 p-4 text-center text-[11px] text-navy-700/50">
                    Nenhum lead nesta etapa
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
