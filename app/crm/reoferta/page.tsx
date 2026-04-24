import Link from "next/link";
import { Zap, TrendingUp, Filter, ChevronRight } from "lucide-react";
import { reofferTriggers, clientById, policies, operatorById } from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  aniversario_60d: "Renovação 60d",
  aniversario_30d: "Renovação 30d",
  reajuste_anunciado: "Reajuste anunciado",
  mudanca_comissao: "Mudança de comissão",
  mudanca_porte: "Mudança de porte",
  concorrente_mais_barato: "Concorrente mais barato",
  sinistralidade_alta: "Sinistralidade alta",
};

export default function ReofertaPage() {
  const open = reofferTriggers.filter((t) => t.status === "aberto");
  const emAtuacao = reofferTriggers.filter((t) => t.status === "em_atuacao");
  const totalPot = reofferTriggers.reduce((acc, t) => acc + (t.potentialRevenue ?? 0), 0);

  return (
    <>
      <CrmHeader title="Motor de re-oferta" subtitle="Coração da tese Affida" />

      <div className="flex-1 space-y-6 bg-sand/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Total detectado</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">{reofferTriggers.length}</p>
            <p className="mt-1 text-xs text-navy-700/60">este mês</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Abertos</p>
            <p className="mt-2 font-display text-3xl font-light text-rose-600">{open.length}</p>
            <p className="mt-1 text-xs text-navy-700/60">a priorizar</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Em atuação</p>
            <p className="mt-2 font-display text-3xl font-light text-champagne-700">{emAtuacao.length}</p>
            <p className="mt-1 text-xs text-navy-700/60">com consultor</p>
          </div>
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Receita potencial</p>
            <p className="mt-2 font-display text-3xl font-light text-forest">{brl(totalPot)}</p>
            <p className="mt-1 text-xs text-navy-700/60">em comissão/mês</p>
          </div>
        </section>

        <section className="rounded-2xl border border-champagne-200/60 bg-white">
          <div className="flex items-center justify-between border-b border-champagne-200/60 px-6 py-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-champagne-600" />
              <p className="eyebrow">Fila de gatilhos</p>
            </div>
            <ActionButton
              action="demo"
              message="Filtros por tipo de gatilho, severidade e consultor em breve."
              className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50"
            >
              <Filter size={14} /> Filtrar
            </ActionButton>
          </div>

          <div className="divide-y divide-champagne-200/60">
            {reofferTriggers.map((t) => {
              const client = clientById(t.clientId);
              const policy = policies.find((p) => p.id === t.policyId);
              const op = policy ? operatorById(policy.operatorId) : undefined;
              return (
                <div key={t.id} className="grid gap-4 p-6 md:grid-cols-[2.5fr_1fr_1fr_120px]">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge tone={t.severity === "high" ? "danger" : t.severity === "medium" ? "warning" : "info"}>
                        {typeLabels[t.type] ?? t.type}
                      </Badge>
                      <Badge tone="neutral">{t.status.replace("_", " ")}</Badge>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-light text-navy-900">{t.title}</h3>
                    <p className="mt-2 text-sm text-navy-700/70">{t.rationale}</p>
                    <p className="mt-3 rounded-lg bg-sand/30 p-3 text-xs text-navy-700">
                      <strong className="text-navy-900">Ação sugerida: </strong>
                      {t.suggestedAction}
                    </p>
                  </div>

                  <div className="text-xs text-navy-700/80">
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Cliente</p>
                    <Link
                      href={`/crm/carteira/${client?.id}`}
                      className="mt-1 block font-medium text-navy-900 hover:underline"
                    >
                      {client?.nomeFantasia}
                    </Link>
                    <p className="mt-2 text-[10px] uppercase tracking-widest text-navy-700/60">Apólice</p>
                    <p className="mt-1">{op?.name} · {policy?.plano}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-widest text-navy-700/60">Consultor</p>
                    <p className="mt-1">{t.owner ?? "—"}</p>
                  </div>

                  <div className="text-xs text-navy-700/80">
                    <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Potencial</p>
                    <p className="mt-1 font-display text-2xl font-light text-forest">
                      {t.potentialRevenue ? brl(t.potentialRevenue) : "—"}
                    </p>
                    <p className="mt-1 text-[10px] text-navy-700/60">comissão/mês</p>
                    <p className="mt-3 text-[10px] text-navy-700/60">
                      detectado {new Date(t.detectedAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <ActionButton
                      action="toast"
                      href={`/crm/carteira/${client?.id ?? ""}`}
                      message={`Gatilho atribuído a ${t.owner ?? "consultor"} — abrindo ficha de ${client?.nomeFantasia}.`}
                      className="inline-flex w-full items-center justify-center gap-1 rounded-full bg-navy-900 py-2 text-xs text-ivory hover:bg-navy-700"
                    >
                      Atuar <ChevronRight size={12} />
                    </ActionButton>
                    <ActionButton
                      action="toast"
                      message={`Gatilho adiado por 7 dias — reaparece dia ${new Date(Date.now() + 7 * 864e5).toLocaleDateString("pt-BR")}.`}
                      className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-navy-100 py-2 text-xs text-navy-700 hover:bg-navy-50"
                    >
                      Adiar 7d
                    </ActionButton>
                    <ActionButton
                      action="toast"
                      message="Gatilho descartado. Motor continuará monitorando a conta."
                      className="inline-flex w-full items-center justify-center gap-1 text-[11px] text-navy-700/60 hover:text-navy-900"
                    >
                      Descartar
                    </ActionButton>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-navy-900 bg-navy-900 p-8 text-ivory">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-champagne-400" />
                <p className="eyebrow text-champagne-500">Inteligência proprietária</p>
              </div>
              <h3 className="heading-display mt-3 text-2xl text-ivory">
                Como funciona o <em className="italic text-champagne-300">motor</em>
              </h3>
              <p className="mt-3 text-sm text-ivory/75">
                Cruzamos janelas de renovação, tabelas de comissão divulgadas pelas operadoras,
                reajustes anunciados, sinistralidade acumulada e lançamentos de produto em tempo
                real. Cada sinal vira um gatilho acionável para o consultor responsável pela conta.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 text-xs">
              {[
                ["Renovação 60d", "aniversario_60d"],
                ["Renovação 30d", "aniversario_30d"],
                ["Reajuste anunciado", "reajuste_anunciado"],
                ["Mudança de comissão", "mudanca_comissao"],
                ["Mudança de porte", "mudanca_porte"],
                ["Novo concorrente", "concorrente_mais_barato"],
                ["Sinistralidade", "sinistralidade_alta"],
              ].map(([label, key]) => (
                <li
                  key={key}
                  className="rounded-lg border border-champagne-500/15 bg-navy-800/60 px-3 py-2 text-ivory/75"
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
