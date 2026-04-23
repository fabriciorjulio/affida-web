import Link from "next/link";
import {
  FileText,
  TrendingUp,
  AlertCircle,
  Calendar,
  Download,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { clients, policies, reofferTriggers, productById, operatorById } from "@/lib/mock-data";
import { PortalShell } from "@/components/portal/portal-shell";
import { Badge } from "@/components/ui/badge";
import { brl } from "@/lib/utils";

const DEMO_CLIENT_ID = "cli-001";

export default function PortalHome() {
  const client = clients.find((c) => c.id === DEMO_CLIENT_ID)!;
  const clientPolicies = policies.filter((p) => p.clientId === DEMO_CLIENT_ID);
  const triggers = reofferTriggers.filter((t) => t.clientId === DEMO_CLIENT_ID);
  const totalVidas = client.vidas;
  const totalPremio = clientPolicies.reduce((a, p) => a + p.premioMensal, 0);

  return (
    <PortalShell clientName={client.nomeFantasia}>
      <section>
        <p className="eyebrow">Bem-vinda, Beatriz</p>
        <h1 className="heading-display mt-2 text-display-md text-navy-900">
          {client.nomeFantasia}, sua carteira em <em className="italic text-forest">uma visão</em>.
        </h1>
        <p className="mt-3 text-sm text-navy-700/80">
          Cliente Affida desde {new Date(client.sinceAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })} ·
          {" "}
          {totalVidas} vidas cuidadas · {clientPolicies.length} apólices ativas
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Prêmio mensal consolidado</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{brl(totalPremio)}</p>
            <p className="mt-1 text-xs text-navy-700/60">multi-produto: {client.segments.join(" · ")}</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Vidas ativas</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{totalVidas}</p>
            <p className="mt-1 text-xs text-navy-700/60">14 colaboradores + 4 dependentes</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-gradient-gold p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-800/80">Próximo marco</p>
            <p className="mt-2 font-display text-2xl font-light text-navy-900">Renovação</p>
            <p className="mt-1 text-xs text-navy-800">31/03/2026 · 7 dias</p>
          </div>
        </div>
      </section>

      {triggers.length > 0 && (
        <section className="mt-10">
          <div className="rounded-3xl border border-champagne-300/50 bg-champagne-50 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-champagne-700" />
                  <p className="eyebrow text-champagne-800">Janela consultiva</p>
                </div>
                <h2 className="heading-display mt-3 text-2xl text-navy-900">
                  {triggers[0].title}
                </h2>
                <p className="mt-3 text-sm text-navy-700/80">{triggers[0].rationale}</p>
              </div>
              <Link
                href="/portal/proposta"
                className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-medium text-ivory hover:bg-navy-700"
              >
                Ver proposta 2026 <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Apólices vigentes</p>
            <h2 className="heading-display mt-1 text-2xl text-navy-900">Sua cobertura hoje</h2>
          </div>
          <Link
            href="/portal/apolices"
            className="text-xs font-medium text-navy-900 hover:opacity-80"
          >
            Ver todas →
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {clientPolicies.map((p) => {
            const product = productById(p.product);
            const op = operatorById(p.operatorId);
            return (
              <div
                key={p.id}
                className="flex flex-col gap-4 rounded-2xl border border-champagne-200/60 bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-champagne-600">{op?.name}</p>
                    <h3 className="mt-2 font-display text-xl font-light text-navy-900">
                      {product?.name ?? p.product}
                    </h3>
                    <p className="mt-1 text-xs text-navy-700/70">{p.plano}</p>
                  </div>
                  <Badge tone={p.status === "ativa" ? "success" : p.status === "em_renovacao" ? "gold" : "warning"}>
                    {p.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 border-y border-champagne-200/60 py-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Vidas</p>
                    <p className="mt-1 font-display text-xl font-light text-navy-900">{p.vidas}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Mensal</p>
                    <p className="mt-1 font-display text-xl font-light text-navy-900">
                      {brl(p.premioMensal)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Vigência</p>
                    <p className="mt-1 text-xs text-navy-900">
                      {new Date(p.vigenciaFim).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-navy-900 hover:opacity-80">
                    <FileText size={13} /> Detalhes da rede
                  </button>
                  <button className="inline-flex items-center gap-1 text-xs text-navy-700 hover:text-navy-900">
                    <Download size={13} /> Apólice PDF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <Link
            href="/portal/proposta"
            className="flex flex-col justify-between gap-4 rounded-2xl border border-navy-900 bg-navy-900 p-6 text-ivory transition-all hover:-translate-y-0.5 hover:shadow-premium"
          >
            <div>
              <Sparkles size={18} className="text-champagne-300" />
              <h3 className="mt-4 font-display text-xl font-light text-ivory">Proposta 2026</h3>
              <p className="mt-2 text-xs text-ivory/75">
                Comparativo Amil vs Bradesco com 2 opções cada — personalizado para sua carteira.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-champagne-300">
              Abrir proposta <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            href="/portal/benchmark"
            className="flex flex-col justify-between gap-4 rounded-2xl border border-champagne-200/70 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-premium"
          >
            <div>
              <TrendingUp size={18} className="text-champagne-600" />
              <h3 className="mt-4 font-display text-xl font-light text-navy-900">Benchmark setorial</h3>
              <p className="mt-2 text-xs text-navy-700/70">
                Compare-se com empresas do CNAE 6435-2 e porte EPP. Veja ticket médio e operadoras
                dominantes.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs text-navy-900">
              Ver benchmark <ArrowRight size={14} />
            </span>
          </Link>

          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-champagne-200/70 bg-white p-6">
            <div>
              <Calendar size={18} className="text-forest" />
              <h3 className="mt-4 font-display text-xl font-light text-navy-900">Conciliação de fatura</h3>
              <p className="mt-2 text-xs text-navy-700/70">
                Fatura março: 4 inclusões, 2 exclusões. Divergência de R$ 1.180 em análise conforme
                cadastro.
              </p>
            </div>
            <Badge tone="gold">Em análise</Badge>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
