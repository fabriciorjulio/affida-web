import Link from "next/link";
import { ChevronRight, Download, Filter } from "lucide-react";
import { clients, policies, productById, operatorById } from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { brl } from "@/lib/utils";

function policiesForClient(clientId: string) {
  return policies.filter((p) => p.clientId === clientId);
}

export default function CarteiraPage() {
  const totalMrr = clients.reduce((acc, c) => acc + c.monthlyRevenue, 0);
  const totalVidas = clients.reduce((acc, c) => acc + c.vidas, 0);
  const renewals = clients.filter((c) => c.status === "em_renovacao").length;
  const churnRisk = clients.filter((c) => c.status === "churn_risk" || c.status === "inadimplente").length;

  return (
    <>
      <CrmHeader title="Carteira de clientes" subtitle="Relacionamento pós-venda" />

      <div className="flex-1 space-y-6 bg-sand/20 px-8 py-8">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
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
            <p className="mt-2 font-display text-3xl font-light text-rose-600">{churnRisk}</p>
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
            <button className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50">
              <Filter size={14} /> Filtros
            </button>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50">
            <Download size={14} /> Exportar
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-champagne-200/60 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/40 text-[10px] uppercase tracking-widest text-navy-700/60">
              <tr>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Porte</th>
                <th className="px-5 py-3">Vidas</th>
                <th className="px-5 py-3">Apólices</th>
                <th className="px-5 py-3">Operadoras</th>
                <th className="px-5 py-3">MRR</th>
                <th className="px-5 py-3">Desde</th>
                <th className="px-5 py-3">NPS</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne-200/60">
              {clients.map((c) => {
                const pols = policiesForClient(c.id);
                const ops = Array.from(new Set(pols.map((p) => operatorById(p.operatorId)?.name).filter(Boolean)));
                const since = new Date(c.sinceAt).getFullYear();
                return (
                  <tr key={c.id} className="hover:bg-sand/30">
                    <td className="px-5 py-3">
                      <Link
                        href={`/crm/carteira/${c.id}`}
                        className="font-medium text-navy-900 hover:underline"
                      >
                        {c.nomeFantasia}
                      </Link>
                      <p className="text-[11px] text-navy-700/60">{c.ramoAtividade}</p>
                    </td>
                    <td className="px-5 py-3 text-navy-700">{c.porte}</td>
                    <td className="px-5 py-3 text-navy-700">{c.vidas}</td>
                    <td className="px-5 py-3 text-navy-700">{pols.length}</td>
                    <td className="px-5 py-3 text-[11px] text-navy-700/80">
                      {ops.slice(0, 2).join(", ")}
                      {ops.length > 2 && <> +{ops.length - 2}</>}
                    </td>
                    <td className="px-5 py-3 text-navy-900">{brl(c.monthlyRevenue)}</td>
                    <td className="px-5 py-3 text-navy-700">{since}</td>
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
    </>
  );
}
