import { Plus, Handshake, TrendingUp } from "lucide-react";
import { partners } from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { brl, percent } from "@/lib/utils";

const tipoLabel: Record<string, string> = {
  contador: "Contador",
  sindicato: "Sindicato",
  associacao: "Associação",
  afiliado: "Afiliado",
  influenciador: "Influenciador",
};

export default function CrmParceirosPage() {
  const totalIndications = partners.reduce((a, p) => a + p.indications, 0);
  const totalConverted = partners.reduce((a, p) => a + p.converted, 0);
  const totalEarned = partners.reduce((a, p) => a + p.earnedYtd, 0);
  const taxa = totalIndications > 0 ? (totalConverted / totalIndications) * 100 : 0;

  return (
    <>
      <CrmHeader title="Parceiros" subtitle="Canal de indicação" />

      <div className="flex-1 space-y-6 bg-sand/20 px-8 py-8">
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Parceiros ativos</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">
              {partners.filter((p) => p.status === "ativo").length}
            </p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Indicações 2026</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{totalIndications}</p>
            <p className="mt-1 text-xs text-navy-700/60">{totalConverted} convertidas</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Taxa conversão</p>
            <p className="mt-2 font-display text-3xl font-light text-forest">{taxa.toFixed(1)}%</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Comissões pagas YTD</p>
            <p className="mt-2 font-display text-3xl font-light text-champagne-700">{brl(totalEarned)}</p>
          </div>
        </section>

        <div className="flex justify-end">
          <button className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs text-ivory hover:bg-navy-700">
            <Plus size={14} /> Convidar parceiro
          </button>
        </div>

        <section className="overflow-hidden rounded-2xl border border-champagne-200/60 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/40 text-[10px] uppercase tracking-widest text-navy-700/60">
              <tr>
                <th className="px-5 py-3">Parceiro</th>
                <th className="px-5 py-3">Tipo</th>
                <th className="px-5 py-3">UF</th>
                <th className="px-5 py-3">Indicações</th>
                <th className="px-5 py-3">Convertidas</th>
                <th className="px-5 py-3">Share</th>
                <th className="px-5 py-3">YTD pago</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne-200/60">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-sand/30">
                  <td className="px-5 py-3">
                    <p className="flex items-center gap-2 font-medium text-navy-900">
                      <Handshake size={14} className="text-champagne-600" />
                      {p.name}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-navy-700">{tipoLabel[p.tipo] ?? p.tipo}</td>
                  <td className="px-5 py-3 text-navy-700">{p.uf}</td>
                  <td className="px-5 py-3 text-navy-700">{p.indications}</td>
                  <td className="px-5 py-3 text-forest">{p.converted}</td>
                  <td className="px-5 py-3 text-navy-700">{percent(p.commissionShare)}</td>
                  <td className="px-5 py-3 text-navy-900">{brl(p.earnedYtd)}</td>
                  <td className="px-5 py-3">
                    <Badge
                      tone={
                        p.status === "ativo"
                          ? "success"
                          : p.status === "onboarding"
                            ? "gold"
                            : "neutral"
                      }
                    >
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
