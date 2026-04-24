import Link from "next/link";
import {
  TrendingUp,
  ArrowUpRight,
  Zap,
  Flame,
  Target,
  Calendar,
  Phone,
  MessageCircle,
  Activity as ActivityIcon,
  Sparkles,
} from "lucide-react";
import {
  kpis,
  leads,
  reofferTriggers,
  clients,
  campaigns,
  team,
  activities,
  pipelineStages,
  productById,
  operatorById,
  clientById,
} from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { KpiCard } from "@/components/crm/kpi-card";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl } from "@/lib/utils";

function stageCount(stageId: string) {
  return leads.filter((l) => l.stage === stageId).length;
}

function stageValue(stageId: string) {
  return leads.filter((l) => l.stage === stageId).reduce((acc, l) => acc + l.estimatedCommission, 0);
}

export default function CrmDashboardPage() {
  const openTriggers = reofferTriggers.filter((t) => t.status !== "convertido" && t.status !== "descartado");
  const hotLeads = [...leads]
    .filter((l) => !["fechado", "perdido"].includes(l.stage))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const paidCampaigns = campaigns.filter((c) => c.channel !== "email");

  return (
    <>
      <CrmHeader title="Bom dia, Bernardo" subtitle="Hoje · Quinta, 23 abril 2026" />

      <div className="flex-1 space-y-8 bg-sand/20 px-8 py-8">
        {/* KPIs */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="MRR carteira"
            value={brl(kpis.mrr)}
            delta="+8,2% MoM"
            hint={`${kpis.activeClients} clientes ativos`}
            accent="forest"
          />
          <KpiCard
            label="Funil em aberto"
            value={`${kpis.inPipeline}`}
            delta={brl(kpis.pipelineValue) + " comissão"}
            hint="sem/per contando"
            accent="gold"
          />
          <KpiCard
            label="Gatilhos re-oferta"
            value={`${openTriggers.length}`}
            delta={`${openTriggers.filter((t) => t.severity === "high").length} críticos`}
            hint="motor proprietário"
            accent="rose"
          />
          <KpiCard
            label="Vidas ativas"
            value={kpis.activeLives.toLocaleString("pt-BR")}
            delta="+18 MoM"
            hint="somatório carteira"
            accent="navy"
          />
        </section>

        {/* Pipeline snapshot + Re-oferta */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-champagne-200/60 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Pipeline · vendas</p>
                <h2 className="heading-display mt-1 text-2xl text-navy-900">Funil comercial</h2>
              </div>
              <Link
                href="/crm/pipeline"
                className="inline-flex items-center gap-1 text-xs font-medium text-navy-900 hover:opacity-80"
              >
                Ver pipeline <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-6">
              {pipelineStages.map((s) => {
                const count = stageCount(s.id);
                const value = stageValue(s.id);
                return (
                  <div
                    key={s.id}
                    className="rounded-xl border border-champagne-200/60 bg-sand/30 p-4"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">{s.label}</p>
                    <p className="mt-2 font-display text-2xl font-light text-navy-900">{count}</p>
                    <p className="mt-1 text-[11px] text-navy-700/60">{brl(value)}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-widest text-navy-700/60">
                Leads quentes · próximas ações
              </p>
              <div className="mt-3 divide-y divide-champagne-200/60">
                {hotLeads.map((lead) => {
                  const product = productById(lead.productOfInterest);
                  return (
                    <Link
                      key={lead.id}
                      href={`/crm/leads/${lead.id}`}
                      className="flex items-center gap-4 py-3 transition-colors hover:bg-sand/40"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 font-display text-xs text-champagne-300">
                        {lead.nomeFantasia.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-navy-900">
                          {lead.nomeFantasia}
                        </p>
                        <p className="truncate text-xs text-navy-700/70">
                          {product?.name} · {lead.vidas} vidas · {lead.uf}
                        </p>
                      </div>
                      <Badge tone={lead.score >= 85 ? "success" : lead.score >= 70 ? "gold" : "neutral"}>
                        Score {lead.score}
                      </Badge>
                      <span className="hidden text-xs text-navy-700/70 md:inline">
                        {brl(lead.estimatedCommission)}
                      </span>
                      <span className="hidden text-xs uppercase tracking-widest text-champagne-600 lg:inline">
                        {lead.stage}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-champagne-200/60 bg-navy-900 p-6 text-ivory">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow text-champagne-500">Motor de re-oferta</p>
                <h2 className="heading-display mt-1 text-xl text-ivory">Gatilhos abertos</h2>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne-500/15 text-champagne-300">
                <Zap size={16} />
              </span>
            </div>
            <ul className="mt-6 space-y-4">
              {openTriggers.slice(0, 4).map((t) => {
                const client = clientById(t.clientId);
                const tone =
                  t.severity === "high"
                    ? "bg-rose-500/15 text-rose-200"
                    : t.severity === "medium"
                      ? "bg-amber-400/15 text-amber-200"
                      : "bg-sky-400/15 text-sky-200";
                return (
                  <li key={t.id} className="rounded-xl border border-champagne-500/10 bg-navy-800/50 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest ${tone}`}
                      >
                        {t.severity === "high" ? "Crítico" : t.severity === "medium" ? "Médio" : "Info"}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-ivory/50">
                        {t.type.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-medium text-ivory">{t.title}</p>
                    <p className="mt-1 text-xs text-ivory/60 line-clamp-2">{t.rationale}</p>
                    <p className="mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-champagne-400">{client?.nomeFantasia}</span>
                      {t.potentialRevenue && (
                        <span className="text-ivory/80">+{brl(t.potentialRevenue)}/mês</span>
                      )}
                    </p>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/crm/reoferta"
              className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-champagne-300 hover:text-champagne-200"
            >
              Ver todos os gatilhos <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

        {/* Agenda + Atividade + Campanhas */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Agenda do dia */}
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-champagne-600" />
              <p className="eyebrow">Agenda do dia</p>
            </div>
            <h2 className="heading-display mt-2 text-xl text-navy-900">Próximas calls</h2>

            <ul className="mt-5 space-y-4">
              {leads
                .filter((l) => l.nextActionAt)
                .slice(0, 4)
                .map((l) => {
                  const when = new Date(l.nextActionAt!);
                  return (
                    <li key={l.id} className="flex items-center gap-4">
                      <div className="flex w-14 flex-col items-center rounded-xl border border-champagne-200/70 bg-sand/30 p-2 text-center">
                        <span className="text-[10px] uppercase tracking-widest text-champagne-600">
                          {when.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
                        </span>
                        <span className="font-display text-xl font-light text-navy-900">
                          {when.getDate()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-navy-900">{l.nextAction}</p>
                        <p className="text-xs text-navy-700/70">
                          {l.nomeFantasia} · {l.owner} ·{" "}
                          {when.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <ActionButton
                          action="demo"
                          message={`Ligando para ${l.nomeFantasia}...`}
                          aria-label="Ligar"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-100 text-navy-700 hover:bg-navy-50"
                        >
                          <Phone size={13} />
                        </ActionButton>
                        <ActionButton
                          action="whatsapp"
                          whatsappMessage={`Olá, falando da Affida sobre a próxima call com ${l.nomeFantasia}.`}
                          aria-label="WhatsApp"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-100 text-navy-700 hover:bg-navy-50"
                        >
                          <MessageCircle size={13} />
                        </ActionButton>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Atividades */}
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
            <div className="flex items-center gap-2">
              <ActivityIcon size={16} className="text-forest" />
              <p className="eyebrow">Atividade recente</p>
            </div>
            <h2 className="heading-display mt-2 text-xl text-navy-900">Timeline da operação</h2>
            <ul className="mt-5 space-y-4">
              {activities.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-forest" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-navy-900">{a.title}</p>
                    <p className="text-xs text-navy-700/60">
                      {a.by} ·{" "}
                      {new Date(a.at).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Campanhas */}
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-champagne-600" />
              <p className="eyebrow">Aquisição</p>
            </div>
            <h2 className="heading-display mt-2 text-xl text-navy-900">Campanhas ativas</h2>
            <ul className="mt-5 space-y-4">
              {paidCampaigns.slice(0, 4).map((c) => {
                const rate = c.leads > 0 ? (c.won / c.leads) * 100 : 0;
                return (
                  <li key={c.id}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-navy-900">{c.name}</span>
                      <span className="text-navy-700/60">CPL {brl(c.cpl)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy-50">
                      <div
                        className="h-full bg-gradient-gold"
                        style={{ width: `${Math.min(100, (c.spent / c.budget) * 100)}%` }}
                      />
                    </div>
                    <p className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-navy-700/60">
                      <span>
                        {c.channel} · {c.leads} leads · {c.won} won
                      </span>
                      <span className="text-forest">{rate.toFixed(1)}% conv.</span>
                    </p>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/crm/campanhas"
              className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-navy-900 hover:opacity-80"
            >
              Abrir painel de mídia <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

        {/* Time */}
        <section className="rounded-2xl border border-champagne-200/60 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Time comercial</p>
              <h2 className="heading-display mt-1 text-2xl text-navy-900">Desempenho por consultor</h2>
            </div>
            <Link
              href="/crm/leads"
              className="inline-flex items-center gap-1 text-xs font-medium text-navy-900 hover:opacity-80"
            >
              Distribuir leads <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {team.map((t) => {
              const ownLeads = leads.filter((l) => l.owner === t.name);
              const ownClients = clients.filter((c) => c.owner === t.name);
              const revenue = ownClients.reduce((acc, c) => acc + c.monthlyRevenue, 0);
              return (
                <div key={t.id} className="rounded-xl border border-champagne-200/60 bg-sand/20 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-display text-sm text-champagne-300">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-900">{t.name}</p>
                      <p className="text-[10px] uppercase tracking-widest text-champagne-600">{t.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="font-display text-xl font-light text-navy-900">{ownLeads.length}</p>
                      <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Leads</p>
                    </div>
                    <div>
                      <p className="font-display text-xl font-light text-navy-900">{ownClients.length}</p>
                      <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Clientes</p>
                    </div>
                    <div>
                      <p className="font-display text-xl font-light text-navy-900">
                        {brl(revenue).replace("R$", "")}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-navy-700/60">MRR</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Portfolio */}
        <section className="rounded-2xl border border-champagne-200/60 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow">Carteira viva</p>
              <h2 className="heading-display mt-1 text-2xl text-navy-900">Clientes em foco</h2>
            </div>
            <Link
              href="/crm/carteira"
              className="inline-flex items-center gap-1 text-xs font-medium text-navy-900 hover:opacity-80"
            >
              Ver carteira completa <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-champagne-200/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand/40 text-[10px] uppercase tracking-widest text-navy-700/60">
                <tr>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Porte</th>
                  <th className="px-4 py-3">Vidas</th>
                  <th className="px-4 py-3">MRR</th>
                  <th className="px-4 py-3">NPS</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Consultor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne-200/60">
                {clients.slice(0, 5).map((c) => (
                  <tr key={c.id} className="hover:bg-sand/30">
                    <td className="px-4 py-3">
                      <Link href={`/crm/carteira/${c.id}`} className="font-medium text-navy-900 hover:underline">
                        {c.nomeFantasia}
                      </Link>
                      <p className="text-[11px] text-navy-700/60">{c.ramoAtividade}</p>
                    </td>
                    <td className="px-4 py-3 text-navy-700">{c.porte}</td>
                    <td className="px-4 py-3 text-navy-700">{c.vidas}</td>
                    <td className="px-4 py-3 text-navy-900">{brl(c.monthlyRevenue)}</td>
                    <td className="px-4 py-3 text-navy-700">{c.nps ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge
                        tone={
                          c.status === "ativo"
                            ? "success"
                            : c.status === "em_renovacao"
                              ? "gold"
                              : c.status === "churn_risk"
                                ? "warning"
                                : "danger"
                        }
                      >
                        {c.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-navy-700">{c.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
