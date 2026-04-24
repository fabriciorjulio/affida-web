import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { leads, productById, pipelineStages } from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { brl } from "@/lib/utils";

export default function LeadsPage() {
  return (
    <>
      <CrmHeader title="Leads" subtitle="Carteira de prospects" />

      <div className="flex-1 space-y-6 bg-sand/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-champagne-200/60 bg-white p-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-500" />
              <input
                type="search"
                placeholder="Buscar por CNPJ, contato, CNAE..."
                className="h-10 w-full rounded-full border border-navy-100 bg-white pl-9 pr-4 text-sm placeholder:text-navy-400 focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-900/5"
              />
            </div>
            <select className="h-10 rounded-full border border-navy-100 bg-white px-4 text-xs text-navy-700">
              <option>Todos os estágios</option>
              {pipelineStages.map((s) => (
                <option key={s.id}>{s.label}</option>
              ))}
            </select>
            <select className="h-10 rounded-full border border-navy-100 bg-white px-4 text-xs text-navy-700">
              <option>Todos os consultores</option>
              <option>Ana Ribeiro</option>
              <option>Lucas Azevedo</option>
              <option>Juliana Paes</option>
            </select>
          </div>
          <span className="text-xs text-navy-700/70">{leads.length} leads encontrados</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-champagne-200/60 bg-white"><div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/40 text-[10px] uppercase tracking-widest text-navy-700/60">
              <tr>
                <th className="px-5 py-3">Empresa</th>
                <th className="px-5 py-3">Porte</th>
                <th className="px-5 py-3">Produto</th>
                <th className="px-5 py-3">Vidas</th>
                <th className="px-5 py-3">Prêmio est.</th>
                <th className="px-5 py-3">Comissão</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Estágio</th>
                <th className="px-5 py-3">Consultor</th>
                <th className="px-5 py-3">Origem</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne-200/60">
              {leads.map((l) => {
                const product = productById(l.productOfInterest);
                const stage = pipelineStages.find((s) => s.id === l.stage)!;
                return (
                  <tr key={l.id} className="hover:bg-sand/30">
                    <td className="px-5 py-3">
                      <p className="font-medium text-navy-900">{l.nomeFantasia}</p>
                      <p className="text-[11px] text-navy-700/60">{l.cnpj}</p>
                    </td>
                    <td className="px-5 py-3 text-navy-700">{l.porte}</td>
                    <td className="px-5 py-3 text-navy-700">{product?.name}</td>
                    <td className="px-5 py-3 text-navy-700">{l.vidas}</td>
                    <td className="px-5 py-3 text-navy-900">{brl(l.estimatedPremium)}</td>
                    <td className="px-5 py-3 text-forest">{brl(l.estimatedCommission)}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex h-7 w-10 items-center justify-center rounded-full bg-champagne-100 text-xs font-semibold text-champagne-800">
                        {l.score}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge
                        tone={
                          l.stage === "fechado"
                            ? "success"
                            : l.stage === "perdido"
                              ? "danger"
                              : l.stage === "negociacao"
                                ? "warning"
                                : l.stage === "proposta"
                                  ? "gold"
                                  : l.stage === "qualificado"
                                    ? "info"
                                    : "neutral"
                        }
                      >
                        {stage.label}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-navy-700">{l.owner}</td>
                    <td className="px-5 py-3 text-[11px] text-navy-700/60">{l.source.replace("_", " ")}</td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/crm/leads/${l.id}`}
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
