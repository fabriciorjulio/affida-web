import Link from "next/link";
import { ChevronRight, Download, Filter } from "lucide-react";
import { clients, policies, operatorById } from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl } from "@/lib/utils";
import {
  daysUntil,
  severityFor,
  nextRenewalDateForClient,
  formatRenewalDistance,
} from "@/lib/renovacao";
import { RenewalBadge } from "@/components/crm/renewal-alert";

function policiesForClient(clientId: string) {
  return policies.filter((p) => p.clientId === clientId);
}

/** Anota cada cliente com sua próxima renovação e severidade.
 *  Clientes sem apólice vão para o final (severityRank = 99). */
function withRenewalInfo() {
  return clients.map((c) => {
    const next = nextRenewalDateForClient(c.id);
    const daysLeft = next ? daysUntil(next) : null;
    const severity = daysLeft != null ? severityFor(daysLeft) : null;
    return { ...c, nextRenewalAt: next, daysLeft, severity };
  });
}

const severityRank: Record<string, number> = {
  vencido: 0,
  critico: 1,
  atencao: 2,
  lembrete: 3,
  tranquilo: 4,
};

export default function CarteiraPage() {
  const totalMrr = clients.reduce((acc, c) => acc + c.monthlyRevenue, 0);
  const totalVidas = clients.reduce((acc, c) => acc + c.vidas, 0);
  const renewals = clients.filter((c) => c.status === "em_renovacao").length;
  const churnRisk = clients.filter((c) => c.status === "churn_risk" || c.status === "inadimplente").length;

  // Lista ordenada por urgência de renovação — clientes com vigência
  // mais próxima (e severidade maior) aparecem PRIMEIRO. Foco do PDF
  // Conselho · re-oferta antes do concorrente.
  const annotated = withRenewalInfo().sort((a, b) => {
    const ra = a.severity ? severityRank[a.severity] : 99;
    const rb = b.severity ? severityRank[b.severity] : 99;
    if (ra !== rb) return ra - rb;
    return (a.daysLeft ?? 9999) - (b.daysLeft ?? 9999);
  });

  return (
    <>
      <CrmHeader title="Carteira de clientes" subtitle="Relacionamento pós-venda" />

      <div className="flex-1 space-y-6 bg-sand/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">MRR carteira</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{brl(totalMrr)}</p>
            <p className="mt-1 text-xs text-forest">+8,2% MoM</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Vidas ativas</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">
              {totalVidas.toLocaleString("pt-BR")}
            </p>
            <p className="mt-1 text-xs text-navy-700/70">{clients.length} clientes</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Renovações 90d</p>
            <p className="mt-2 font-display text-3xl font-light text-champagne-700">{renewals}</p>
            <p className="mt-1 text-xs text-navy-700/70">em janela consultiva</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Risco de churn</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{churnRisk}</p>
            <p className="mt-1 text-xs text-navy-700/70">requer atenção imediata</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-champagne-200/60 bg-white p-4">
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Buscar cliente..."
              className="h-10 w-64 rounded-full border border-navy-100 bg-white px-4 text-sm placeholder:text-navy-400 focus:border-navy-400 focus:outline-none"
            />
            <ActionButton
              action="demo"
              message="Filtros avançados por porte, operadora, NPS e status em breve."
              className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50"
            >
              <Filter size={14} /> Filtros
            </ActionButton>
          </div>
          <ActionButton
            action="download"
            message="Exportando carteira completa — CSV gerado em instantes."
            className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50"
          >
            <Download size={14} /> Exportar
          </ActionButton>
        </div>

        <div className="overflow-hidden rounded-2xl border border-champagne-200/60 bg-white"><div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/40 text-[10px] uppercase tracking-widest text-navy-700/60">
              <tr>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Renovação</th>
                <th className="px-5 py-3">Vidas</th>
                <th className="px-5 py-3">Apólices</th>
                <th className="px-5 py-3">Operadoras</th>
                <th className="px-5 py-3">MRR</th>
                <th className="px-5 py-3">NPS</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne-200/60">
              {annotated.map((c) => {
                const pols = policiesForClient(c.id);
                const ops = Array.from(new Set(pols.map((p) => operatorById(p.operatorId)?.name).filter(Boolean)));
                // Linha INTEIRA recebe um realce sutil quando a
                // renovação está em janela crítica (≤30d) ou atenção
                // (≤60d). Reforça visualmente onde o closer deve atuar
                // primeiro mesmo se ele não ler a coluna "Renovação".
                const rowAccent =
                  c.severity === "critico" || c.severity === "vencido"
                    ? "bg-champagne-50/40 hover:bg-champagne-50"
                    : c.severity === "atencao"
                      ? "bg-champagne-50/20 hover:bg-champagne-50/60"
                      : "hover:bg-sand/30";
                return (
                  <tr key={c.id} className={rowAccent}>
                    <td className="px-5 py-3">
                      <Link
                        href={`/crm/carteira/${c.id}`}
                        className="font-medium text-navy-900 hover:underline"
                      >
                        {c.nomeFantasia}
                      </Link>
                      <p className="text-[11px] text-navy-700/60">
                        {c.porte} · {c.ramoAtividade}
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      {c.daysLeft != null && c.severity ? (
                        <RenewalBadge daysLeft={c.daysLeft} severity={c.severity} />
                      ) : (
                        <span className="text-[11px] text-navy-700/40">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-navy-700">{c.vidas}</td>
                    <td className="px-5 py-3 text-navy-700">{pols.length}</td>
                    <td className="px-5 py-3 text-[11px] text-navy-700/80">
                      {ops.slice(0, 2).join(", ")}
                      {ops.length > 2 && <> +{ops.length - 2}</>}
                    </td>
                    <td className="px-5 py-3 text-navy-900">{brl(c.monthlyRevenue)}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex h-7 w-10 items-center justify-center rounded-full bg-forest-50 text-xs font-semibold text-forest-700">
                        {c.nps ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
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
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/crm/carteira/${c.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-navy-900 hover:opacity-80"
                      >
                        Abrir <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </>
  );
}
