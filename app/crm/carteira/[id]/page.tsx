import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Zap,
  TrendingUp,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import {
  clients,
  policies,
  reofferTriggers,
  activities,
  productById,
  operatorById,
} from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl, percent } from "@/lib/utils";

export function generateStaticParams() {
  return clients.map((c) => ({ id: c.id }));
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);
  if (!client) notFound();
  const clientPolicies = policies.filter((p) => p.clientId === params.id);
  const triggers = reofferTriggers.filter((t) => t.clientId === params.id);
  const clientActivities = activities.filter((a) => a.clientId === params.id);

  const totalMrr = clientPolicies.reduce((acc, p) => acc + p.premioMensal * p.comissaoPercent, 0);
  const totalPremio = clientPolicies.reduce((acc, p) => acc + p.premioMensal, 0);

  return (
    <>
      <CrmHeader title={client!.nomeFantasia} subtitle={`Cliente desde ${new Date(client!.sinceAt).getFullYear()}`} />

      <div className="flex-1 space-y-6 bg-sand/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Link href="/crm/carteira" className="inline-flex items-center gap-2 text-xs text-navy-700 hover:text-navy-900">
          <ArrowLeft size={14} /> Voltar
        </Link>

        {/* Cabeçalho do cliente */}
        <section className="rounded-2xl border border-champagne-200/60 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-champagne-600">
                {client!.porte} · {client!.ramoAtividade} · CNAE {client!.cnae}
              </p>
              <h2 className="heading-display mt-2 text-3xl text-navy-900">{client!.razaoSocial}</h2>
              <p className="mt-1 text-sm text-navy-700/70">
                CNPJ {client!.cnpj} · {client!.cidade}/{client!.uf} · {client!.vidas} vidas · {client!.owner}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge
                tone={
                  client!.status === "ativo"
                    ? "success"
                    : client!.status === "em_renovacao"
                      ? "gold"
                      : client!.status === "churn_risk"
                        ? "warning"
                        : "danger"
                }
              >
                {client!.status.replace("_", " ")}
              </Badge>
              {client!.nps !== undefined && <Badge tone="success">NPS {client!.nps}</Badge>}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-champagne-200/60 bg-sand/20 p-4">
              <p className="text-[10px] uppercase tracking-widest text-navy-700/60">MRR comissão</p>
              <p className="mt-1 font-display text-2xl font-light text-forest">{brl(totalMrr)}</p>
            </div>
            <div className="rounded-xl border border-champagne-200/60 bg-sand/20 p-4">
              <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Prêmio total</p>
              <p className="mt-1 font-display text-2xl font-light text-navy-900">{brl(totalPremio)}</p>
            </div>
            <div className="rounded-xl border border-champagne-200/60 bg-sand/20 p-4">
              <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Apólices</p>
              <p className="mt-1 font-display text-2xl font-light text-navy-900">{clientPolicies.length}</p>
            </div>
            <div className="rounded-xl border border-champagne-200/60 bg-sand/20 p-4">
              <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Gatilhos abertos</p>
              <p className="mt-1 font-display text-2xl font-light text-navy-900">{triggers.length}</p>
            </div>
          </div>
        </section>

        {/* Apólices */}
        <section className="rounded-2xl border border-champagne-200/60 bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-champagne-600" />
              <p className="eyebrow">Apólices vigentes</p>
            </div>
            <ActionButton
              action="demo"
              message={`Nova apólice para ${client!.nomeFantasia} — abrindo fluxo de emissão.`}
              className="text-xs font-medium text-navy-900 hover:opacity-80"
            >
              + nova apólice
            </ActionButton>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-champagne-200/60">
            <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand/30 text-[10px] uppercase tracking-widest text-navy-700/60">
                <tr>
                  <th className="px-4 py-3">Produto</th>
                  <th className="px-4 py-3">Operadora</th>
                  <th className="px-4 py-3">Plano</th>
                  <th className="px-4 py-3">Vigência</th>
                  <th className="px-4 py-3">Vidas</th>
                  <th className="px-4 py-3">Prêmio</th>
                  <th className="px-4 py-3">Comissão</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne-200/60">
                {clientPolicies.map((p) => {
                  const product = productById(p.product);
                  const operator = operatorById(p.operatorId);
                  return (
                    <tr key={p.id}>
                      <td className="px-4 py-3 font-medium text-navy-900">{product?.name ?? p.product}</td>
                      <td className="px-4 py-3 text-navy-700">{operator?.name ?? p.operatorId}</td>
                      <td className="px-4 py-3 text-[11px] text-navy-700/80">{p.plano}</td>
                      <td className="px-4 py-3 text-[11px] text-navy-700/80">
                        {new Date(p.vigenciaInicio).toLocaleDateString("pt-BR")} →{" "}
                        {new Date(p.vigenciaFim).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-3 text-navy-700">{p.vidas}</td>
                      <td className="px-4 py-3 text-navy-900">{brl(p.premioMensal)}</td>
                      <td className="px-4 py-3 text-forest">
                        {brl(p.premioMensal * p.comissaoPercent)} ({percent(p.comissaoPercent)})
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          tone={
                            p.status === "ativa"
                              ? "success"
                              : p.status === "em_renovacao"
                                ? "gold"
                                : p.status === "cancelada"
                                  ? "danger"
                                  : "warning"
                          }
                        >
                          {p.status.replace("_", " ")}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        </section>

        {/* Gatilhos re-oferta */}
        {triggers.length > 0 && (
          <section className="rounded-2xl border border-champagne-300/60 bg-champagne-50/40 p-6">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-champagne-700" />
              <p className="eyebrow text-champagne-700">Motor de re-oferta</p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {triggers.map((t) => (
                <div key={t.id} className="rounded-xl border border-champagne-300/60 bg-white p-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone={t.severity === "high" ? "danger" : t.severity === "medium" ? "warning" : "info"}>
                      {t.type.replace(/_/g, " ")}
                    </Badge>
                    {t.potentialRevenue && (
                      <span className="text-xs font-medium text-forest">+{brl(t.potentialRevenue)}/mês</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm font-medium text-navy-900">{t.title}</p>
                  <p className="mt-2 text-xs text-navy-700/70">{t.rationale}</p>
                  <p className="mt-3 rounded-lg bg-sand/40 p-3 text-[11px] text-navy-700">
                    <strong className="text-navy-900">Ação sugerida: </strong>
                    {t.suggestedAction}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-navy-700/60">
                    <span>Detectado {new Date(t.detectedAt).toLocaleDateString("pt-BR")}</span>
                    <Link href="/crm/reoferta" className="text-navy-900 hover:underline">
                      atuar →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Histórico + Ações */}
        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
            <p className="eyebrow">Timeline de relacionamento</p>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-champagne-500" />
                <div>
                  <p className="text-sm text-navy-900">
                    Cliente adquirido · início em {new Date(client!.sinceAt).toLocaleDateString("pt-BR")}
                  </p>
                  <p className="text-xs text-navy-700/60">Affida Partners</p>
                </div>
              </li>
              {clientActivities.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-forest" />
                  <div>
                    <p className="text-sm text-navy-900">{a.title}</p>
                    {a.description && <p className="text-xs text-navy-700/70">{a.description}</p>}
                    <p className="text-xs text-navy-700/60">
                      {a.by} · {new Date(a.at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
              <p className="eyebrow">Acesso do cliente</p>
              <p className="mt-2 text-sm text-navy-700/80">
                Abra o portal na visão do cliente para acompanhar apólices, faturas e propostas.
              </p>
              {/* Abrir em nova aba — closer espia o portal sem perder
                  contexto do CRM. PortalShell não tem link de volta para
                  o CRM (correto: portal é do cliente final). */}
              <a
                href="/portal"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs text-ivory hover:bg-navy-700"
              >
                Abrir portal do cliente <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-forest" />
                <p className="eyebrow">Conciliação 30d</p>
              </div>
              <p className="mt-3 text-sm text-navy-700/80">
                4 inclusões, 2 exclusões, 1 retroativo. Divergência de R$ 1.180 em análise.
              </p>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-sand/30 p-3 text-xs">
                <span className="text-navy-700/80">Status</span>
                <Badge tone="gold">Aberto</Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-champagne-600" />
                <p className="eyebrow">Upsell sugerido</p>
              </div>
              <p className="mt-3 text-sm font-medium text-navy-900">
                RC Profissional + D&O executivo
              </p>
              <p className="mt-1 text-xs text-navy-700/70">
                Com crescimento de faturamento e novos sócios em 2026, o cliente entra em faixa de risco
                que exige RC ampliado.
              </p>
              <p className="mt-3 text-xs text-forest">Potencial +{brl(1120)}/mês comissão</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
