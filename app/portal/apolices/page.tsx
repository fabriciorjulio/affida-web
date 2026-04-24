import { Download, ExternalLink } from "lucide-react";
import { clients, policies, productById, operatorById } from "@/lib/mock-data";
import { PortalShell } from "@/components/portal/portal-shell";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl } from "@/lib/utils";

const DEMO_CLIENT_ID = "cli-001";

export default function ApolicesPage() {
  const client = clients.find((c) => c.id === DEMO_CLIENT_ID)!;
  const clientPolicies = policies.filter((p) => p.clientId === DEMO_CLIENT_ID);

  return (
    <PortalShell clientName={client.nomeFantasia}>
      <section>
        <p className="eyebrow">Apólices vigentes</p>
        <h1 className="heading-display mt-2 text-display-md text-navy-900">
          Sua <em className="italic text-forest">cobertura completa</em>
        </h1>
        <p className="mt-3 text-sm text-navy-700/80">
          Todas as apólices que a Affida gerencia para você. Clique para acessar documentos, rede
          referenciada e histórico de sinistros.
        </p>
      </section>

      <section className="mt-10 space-y-6">
        {clientPolicies.map((p) => {
          const product = productById(p.product);
          const op = operatorById(p.operatorId);
          const diffDays = Math.ceil(
            (new Date(p.vigenciaFim).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          return (
            <div
              key={p.id}
              className="rounded-3xl border border-champagne-200/60 bg-white p-6 transition-all hover:shadow-premium"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-champagne-600">
                    {product?.name ?? p.product}
                  </p>
                  <h2 className="heading-display mt-2 text-2xl text-navy-900">{op?.name}</h2>
                  <p className="mt-1 text-sm text-navy-700/70">{p.plano}</p>
                </div>
                <div className="flex gap-2">
                  <Badge tone={p.status === "ativa" ? "success" : "gold"}>
                    {p.status.replace("_", " ")}
                  </Badge>
                  {diffDays > 0 && diffDays < 90 && <Badge tone="gold">{diffDays} dias p/ renovar</Badge>}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-y border-champagne-200/60 py-5 md:grid-cols-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Vidas</p>
                  <p className="mt-1 font-display text-2xl font-light text-navy-900">{p.vidas}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Mensal</p>
                  <p className="mt-1 font-display text-2xl font-light text-navy-900">
                    {brl(p.premioMensal)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Por vida</p>
                  <p className="mt-1 font-display text-2xl font-light text-navy-900">
                    {brl(p.premioMensal / p.vidas)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Vigência</p>
                  <p className="mt-1 text-sm text-navy-900">
                    {new Date(p.vigenciaInicio).toLocaleDateString("pt-BR")} →{" "}
                    {new Date(p.vigenciaFim).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-xs">
                {p.coparticipacao && (
                  <span className="rounded-full bg-navy-50 px-3 py-1 text-navy-700">
                    Coparticipação: {p.coparticipacao}
                  </span>
                )}
                {p.acomodacao && (
                  <span className="rounded-full bg-navy-50 px-3 py-1 text-navy-700">
                    Acomodação: {p.acomodacao}
                  </span>
                )}
                {p.abrangencia && (
                  <span className="rounded-full bg-navy-50 px-3 py-1 text-navy-700">
                    Abrangência: {p.abrangencia}
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-champagne-200/60 pt-5">
                <ActionButton
                  action="download"
                  message={`Apólice ${p.id} — gerando PDF.`}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs text-ivory hover:bg-navy-700"
                >
                  <Download size={13} /> Apólice PDF
                </ActionButton>
                <ActionButton
                  action="demo"
                  message={`Abrindo rede referenciada ${op?.name} — 3.200+ prestadores.`}
                  className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50"
                >
                  <ExternalLink size={13} /> Rede referenciada
                </ActionButton>
                <ActionButton
                  action="toast"
                  href="/portal/sinistros"
                  className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50"
                >
                  <ExternalLink size={13} /> Histórico de sinistros
                </ActionButton>
              </div>
            </div>
          );
        })}
      </section>
    </PortalShell>
  );
}
