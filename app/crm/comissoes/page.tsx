"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calculator,
  Download,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  AlertTriangle,
  X,
} from "lucide-react";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { brl, percent, shortDate, cnpjMask } from "@/lib/utils";
import {
  addDeal,
  baseLabel,
  comissaoBrutaMensal,
  ensureMocksLoaded,
  exportCsv,
  getDeals,
  margemCorretora,
  papelDefaultPct,
  papelLabel,
  relatorioMensalPorPessoa,
  removeDeal,
  toggleConciliado,
  totalSplitPct,
  totalSplitValor,
  valorParticipante,
  type BaseCalculo,
  type CommissionDeal,
  type Papel,
  type ParticipanteSplit,
} from "@/lib/commission-store";

/**
 * Comissões — split por fechamento.
 *
 * Página operacional para o CEO/financeiro registrarem como cada fechamento
 * é dividido entre os participantes do processo comercial (corretor responsável,
 * indicador, gerente, diretor, backoffice). Gera relatório mensal consolidado
 * por pessoa e CSV pronto para conciliar com extrato de comissão da operadora.
 */

const PAPEIS: Papel[] = [
  "corretor_responsavel",
  "indicador",
  "gerente_comercial",
  "diretor",
  "backoffice",
];

const BASES: BaseCalculo[] = ["primeira_parcela", "cauda_recorrente", "ambas"];

function papelTone(p: Papel): "navy" | "gold" | "info" | "success" | "neutral" {
  switch (p) {
    case "corretor_responsavel":
      return "navy";
    case "indicador":
      return "gold";
    case "gerente_comercial":
      return "info";
    case "diretor":
      return "success";
    default:
      return "neutral";
  }
}

function currentYearMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

/** Formata "2026-04" → "Abril/26" */
function monthLabel(yyyymm: string): string {
  const [y, m] = yyyymm.split("-");
  const d = new Date(Number(y), Number(m) - 1, 1);
  return d
    .toLocaleDateString("pt-BR", { month: "long", year: "2-digit" })
    .replace(".", "")
    .replace(" de ", "/");
}

export default function ComissoesPage() {
  const [deals, setDeals] = useState<CommissionDeal[]>([]);
  const [filterMonth, setFilterMonth] = useState<string>(currentYearMonth());
  const [expanded, setExpanded] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    ensureMocksLoaded();
    setDeals(getDeals());
  }, []);

  function refresh() {
    setDeals(getDeals());
  }

  // ---------- Lista filtrada por mês ----------
  const monthDeals = useMemo(
    () => deals.filter((d) => d.fechamentoData.slice(0, 7) === filterMonth),
    [deals, filterMonth]
  );

  // Meses com fechamentos (pra dropdown). Mês atual sempre presente, mesmo
  // sem deals — assim o usuário pode cadastrar o primeiro fechamento do mês.
  const availableMonths = useMemo(() => {
    const set = new Set(deals.map((d) => d.fechamentoData.slice(0, 7)));
    set.add(currentYearMonth());
    return [...set].sort().reverse();
  }, [deals]);

  // ---------- KPIs ----------
  const kpis = useMemo(() => {
    const bruta = monthDeals.reduce((acc, d) => acc + comissaoBrutaMensal(d), 0);
    const split = monthDeals.reduce((acc, d) => acc + totalSplitValor(d), 0);
    const margem = bruta - split;
    const conciliados = monthDeals.filter((d) => d.conciliado).length;
    return {
      bruta,
      split,
      margem,
      fechamentos: monthDeals.length,
      conciliados,
      pendentes: monthDeals.length - conciliados,
    };
  }, [monthDeals]);

  // ---------- Relatório por pessoa ----------
  const porPessoa = useMemo(
    () => relatorioMensalPorPessoa(deals, filterMonth),
    [deals, filterMonth]
  );

  function handleExportCsv() {
    if (monthDeals.length === 0) {
      toast("Sem fechamentos no mês selecionado para exportar.", "info");
      return;
    }
    const csv = exportCsv(monthDeals);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comissoes-${filterMonth}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast(`CSV gerado: ${monthDeals.length} fechamento(s) · pronto pro financeiro.`, "success");
  }

  function handleDelete(id: string, cliente: string) {
    if (!confirm(`Remover o split de "${cliente}"? Essa ação não tem desfazer.`)) return;
    removeDeal(id);
    refresh();
    toast(`Split de ${cliente} removido.`, "info");
  }

  function handleToggleConciliado(id: string) {
    toggleConciliado(id);
    refresh();
  }

  function handleSubmit(deal: Omit<CommissionDeal, "id" | "createdAt">) {
    const total = deal.participantes.reduce((acc, p) => acc + p.pct, 0);
    if (total > 100) {
      toast(
        `Soma dos percentuais (${total.toFixed(1)}%) ultrapassa 100% — revise.`,
        "info"
      );
      return;
    }
    addDeal(deal);
    refresh();
    setFormOpen(false);
    toast(`Fechamento de ${deal.cliente} registrado.`, "success");
  }

  return (
    <>
      <CrmHeader
        title="Comissões"
        subtitle="Split por fechamento · conciliação financeiro"
      />

      <div className="flex-1 space-y-6 bg-sand/20 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* ---------- Toolbar: filtro mês + ações ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-champagne-200/60 bg-white p-4">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-navy-700/70">
              Mês de fechamento
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="h-10 rounded-full border border-navy-100 bg-white px-4 text-xs text-navy-700"
              >
                {availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {monthLabel(m)}
                  </option>
                ))}
              </select>
            </label>
            <span className="text-xs text-navy-700/70">
              {kpis.fechamentos} fechamento(s) ·{" "}
              <span className="text-forest">{kpis.conciliados} conciliado(s)</span> ·{" "}
              <span className="text-champagne-800">{kpis.pendentes} pendente(s)</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="dark-outline"
              size="sm"
              onClick={handleExportCsv}
            >
              <Download size={13} /> Exportar CSV
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setFormOpen((v) => !v)}
            >
              {formOpen ? <X size={13} /> : <Plus size={13} />}
              {formOpen ? "Cancelar" : "Novo fechamento"}
            </Button>
          </div>
        </div>

        {/* ---------- Form de novo split (inline) ---------- */}
        {formOpen && <DealForm onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />}

        {/* ---------- KPIs do mês ---------- */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Comissão bruta do mês"
            value={brl(kpis.bruta)}
            hint="recebido da operadora"
            tone="navy"
          />
          <KpiCard
            label="Total a pagar (split)"
            value={brl(kpis.split)}
            hint="saída pra participantes"
            tone="gold"
          />
          <KpiCard
            label="Margem da corretora"
            value={brl(kpis.margem)}
            hint={
              kpis.bruta > 0
                ? `${percent(kpis.margem / kpis.bruta)} sobre comissão`
                : "—"
            }
            tone="success"
          />
          <KpiCard
            label="Conciliação"
            value={`${kpis.conciliados}/${kpis.fechamentos}`}
            hint={
              kpis.pendentes > 0
                ? `${kpis.pendentes} aguardando extrato`
                : "tudo em dia"
            }
            tone={kpis.pendentes > 0 ? "warning" : "success"}
          />
        </div>

        {/* ---------- Lista de fechamentos do mês ---------- */}
        <div className="overflow-hidden rounded-2xl border border-champagne-200/60 bg-white">
          <div className="flex items-center justify-between border-b border-champagne-200/60 bg-sand/40 px-5 py-3">
            <p className="text-[11px] uppercase tracking-widest text-navy-700/60">
              Fechamentos · {monthLabel(filterMonth)}
            </p>
            <span className="text-[11px] text-navy-700/60">
              {kpis.fechamentos > 0
                ? `${kpis.fechamentos} fechamento(s)`
                : "sem fechamentos no mês"}
            </span>
          </div>

          {kpis.fechamentos === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <Calculator size={28} className="text-navy-300" />
              <p className="text-sm text-navy-700/70">
                Nenhum fechamento registrado em {monthLabel(filterMonth)}.
              </p>
              <Button variant="dark-outline" size="sm" onClick={() => setFormOpen(true)}>
                <Plus size={13} /> Registrar o primeiro
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-champagne-200/60">
              {monthDeals.map((d) => (
                <DealRow
                  key={d.id}
                  deal={d}
                  expanded={expanded === d.id}
                  onToggleExpand={() => setExpanded(expanded === d.id ? null : d.id)}
                  onToggleConciliado={() => handleToggleConciliado(d.id)}
                  onDelete={() => handleDelete(d.id, d.cliente)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* ---------- Relatório consolidado por pessoa ---------- */}
        <div className="overflow-hidden rounded-2xl border border-champagne-200/60 bg-white">
          <div className="flex items-center justify-between border-b border-champagne-200/60 bg-sand/40 px-5 py-3">
            <p className="text-[11px] uppercase tracking-widest text-navy-700/60">
              Por pessoa · {monthLabel(filterMonth)}
            </p>
            <span className="text-[11px] text-navy-700/60">
              {porPessoa.length} pessoa(s) com comissão a receber
            </span>
          </div>
          {porPessoa.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-navy-700/60">
              Quando houver fechamentos no mês, o consolidado por pessoa aparece aqui.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-sand/40 text-[10px] uppercase tracking-widest text-navy-700/60">
                  <tr>
                    <th className="px-5 py-3">Pessoa</th>
                    <th className="px-5 py-3">Papel</th>
                    <th className="px-5 py-3">Fechamentos</th>
                    <th className="px-5 py-3 text-right">A pagar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne-200/60">
                  {porPessoa.map((r) => (
                    <tr key={`${r.nome}-${r.papel}`} className="hover:bg-sand/20">
                      <td className="px-5 py-3 font-medium text-navy-900">{r.nome}</td>
                      <td className="px-5 py-3">
                        <Badge tone={papelTone(r.papel)}>{papelLabel[r.papel]}</Badge>
                      </td>
                      <td className="px-5 py-3 text-navy-700">{r.totalDeals}</td>
                      <td className="px-5 py-3 text-right font-medium text-forest">
                        {brl(r.totalValor)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-champagne-200/60 bg-sand/40 text-[11px] uppercase tracking-widest text-navy-700/70">
                    <td className="px-5 py-3" colSpan={3}>
                      Total a pagar no mês
                    </td>
                    <td className="px-5 py-3 text-right text-navy-900">
                      {brl(porPessoa.reduce((acc, r) => acc + r.totalValor, 0))}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* ---------- Rodapé explicativo ---------- */}
        <div className="rounded-2xl border border-champagne-200/60 bg-sand/30 p-5 text-xs text-navy-700/75">
          <p className="font-medium text-navy-900">
            Como funciona o split na Affida
          </p>
          <p className="mt-2 leading-relaxed">
            A operadora paga a comissão direta à corretora (15-25% do prêmio em saúde,
            conforme Resolução CNSP 382/2020). Internamente, esse valor é distribuído
            entre os participantes do processo comercial — corretor responsável, gerente,
            indicador (programa MGM), diretor e backoffice. Os percentuais sugeridos são
            referência — podem ser ajustados por fechamento. O CSV exportado é a base de
            conciliação que o financeiro cruza com o extrato mensal da operadora.
          </p>
        </div>
      </div>
    </>
  );
}

// ---------- KpiCard ----------

function KpiCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "navy" | "gold" | "success" | "warning";
}) {
  const tones: Record<typeof tone, { border: string; text: string }> = {
    navy: { border: "border-navy-900/15", text: "text-navy-900" },
    gold: { border: "border-champagne-300/60", text: "text-champagne-800" },
    success: { border: "border-forest/30", text: "text-forest-700" },
    warning: { border: "border-champagne-400/50", text: "text-champagne-800" },
  };
  return (
    <div className={`rounded-2xl border ${tones[tone].border} bg-white p-5`}>
      <p className="text-[10px] uppercase tracking-widest text-navy-700/60">{label}</p>
      <p className={`mt-2 font-display text-3xl font-light ${tones[tone].text}`}>
        {value}
      </p>
      <p className="mt-1 text-[11px] text-navy-700/60">{hint}</p>
    </div>
  );
}

// ---------- Linha de deal (com expand) ----------

function DealRow({
  deal,
  expanded,
  onToggleExpand,
  onToggleConciliado,
  onDelete,
}: {
  deal: CommissionDeal;
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleConciliado: () => void;
  onDelete: () => void;
}) {
  const bruta = comissaoBrutaMensal(deal);
  const split = totalSplitValor(deal);
  const margem = margemCorretora(deal);
  const totalPct = totalSplitPct(deal);
  const splitOver = totalPct > 100;

  return (
    <li className="bg-white">
      <div
        role="button"
        tabIndex={0}
        onClick={onToggleExpand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggleExpand();
          }
        }}
        className="grid w-full cursor-pointer grid-cols-1 items-center gap-3 px-5 py-4 text-left hover:bg-sand/30 focus:outline-none focus:ring-2 focus:ring-navy-900/20 sm:grid-cols-[2fr_1fr_1fr_1fr_auto]"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronDown size={14} className="shrink-0 text-navy-500" />
            ) : (
              <ChevronRight size={14} className="shrink-0 text-navy-500" />
            )}
            <p className="truncate font-medium text-navy-900">{deal.cliente}</p>
            {splitOver && (
              <span title="Soma dos percentuais ultrapassa 100%">
                <AlertTriangle size={13} className="shrink-0 text-champagne-700" />
              </span>
            )}
          </div>
          <p className="mt-0.5 pl-6 text-[11px] text-navy-700/60">
            {deal.cnpj && <span>{deal.cnpj} · </span>}
            {deal.produto} · {deal.vidas} vidas · fechado em {shortDate(deal.fechamentoData)}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-navy-700/55">
            Prêmio mensal
          </p>
          <p className="text-sm font-medium text-navy-900">{brl(deal.premioMensal)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-navy-700/55">
            Comissão bruta
          </p>
          <p className="text-sm font-medium text-navy-900">
            {brl(bruta)}{" "}
            <span className="text-[11px] text-navy-700/60">
              ({deal.comissaoOperadoraPct}%)
            </span>
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-navy-700/55">Split</p>
          <p className="text-sm font-medium text-forest">{brl(split)}</p>
          <p className="text-[10px] text-navy-700/55">{totalPct.toFixed(1)}% distribuído</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleConciliado();
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-champagne-200/70 bg-white px-3 py-1 text-[11px] font-medium text-navy-700 hover:bg-sand/40"
            aria-label={deal.conciliado ? "Marcar como pendente" : "Marcar como conciliado"}
          >
            {deal.conciliado ? (
              <CheckCircle2 size={12} className="text-forest" />
            ) : (
              <Circle size={12} className="text-champagne-700" />
            )}
            {deal.conciliado ? "Conciliado" : "Pendente"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-champagne-200/60 bg-sand/15 px-5 py-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <p className="text-[11px] text-navy-700/70">
              <strong className="text-navy-900">Comissão da operadora:</strong>{" "}
              {brl(bruta)} ({deal.comissaoOperadoraPct}% × {brl(deal.premioMensal)})
            </p>
            <p className="text-[11px] text-navy-700/70">
              <strong className="text-navy-900">Total split:</strong> {brl(split)} (
              {totalPct.toFixed(1)}%)
            </p>
            <p className="text-[11px] text-navy-700/70">
              <strong className="text-navy-900">Margem corretora:</strong>{" "}
              <span className={margem < 0 ? "text-navy-900" : "text-forest"}>
                {brl(margem)}
              </span>
            </p>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-champagne-200/60 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/40 text-[10px] uppercase tracking-widest text-navy-700/60">
                <tr>
                  <th className="px-4 py-2">Papel</th>
                  <th className="px-4 py-2">Pessoa</th>
                  <th className="px-4 py-2">Base</th>
                  <th className="px-4 py-2">%</th>
                  <th className="px-4 py-2 text-right">Valor mensal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne-200/60">
                {deal.participantes.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-2">
                      <Badge tone={papelTone(p.papel)}>{papelLabel[p.papel]}</Badge>
                    </td>
                    <td className="px-4 py-2 font-medium text-navy-900">{p.nome}</td>
                    <td className="px-4 py-2 text-navy-700">{baseLabel[p.base]}</td>
                    <td className="px-4 py-2 text-navy-900">{p.pct}%</td>
                    <td className="px-4 py-2 text-right font-medium text-forest">
                      {brl(valorParticipante(deal, p))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {deal.observacao && (
            <p className="mt-3 text-[11px] italic text-navy-700/65">
              Obs: {deal.observacao}
            </p>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 text-[11px] text-navy-700/60 hover:text-navy-900"
            >
              <Trash2 size={12} /> Remover fechamento
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

// ---------- Form de novo fechamento ----------

function makeBlankParticipante(papel: Papel = "corretor_responsavel"): ParticipanteSplit {
  return {
    id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    papel,
    nome: "",
    pct: papelDefaultPct[papel],
    base: "ambas",
  };
}

function DealForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (deal: Omit<CommissionDeal, "id" | "createdAt">) => void;
  onCancel: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [cliente, setCliente] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [produto, setProduto] = useState("Saúde Coletiva");
  const [vidas, setVidas] = useState<number>(1);
  const [premioMensal, setPremioMensal] = useState<number>(0);
  const [comissaoOperadoraPct, setComissaoOperadoraPct] = useState<number>(20);
  const [fechamentoData, setFechamentoData] = useState(today);
  const [observacao, setObservacao] = useState("");
  const [participantes, setParticipantes] = useState<ParticipanteSplit[]>([
    makeBlankParticipante("corretor_responsavel"),
  ]);

  const bruta = (premioMensal * comissaoOperadoraPct) / 100;
  const totalPct = participantes.reduce((acc, p) => acc + p.pct, 0);
  const totalValor = participantes.reduce(
    (acc, p) => acc + (bruta * p.pct) / 100,
    0
  );
  const margem = bruta - totalValor;

  function updateParticipante(id: string, patch: Partial<ParticipanteSplit>) {
    setParticipantes((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const next = { ...p, ...patch };
        // Se mudou o papel e o pct ainda era o default antigo, sincroniza
        // pra o novo default do papel — assim trocar de papel propõe um %
        // razoável sem forçar.
        if (patch.papel && patch.papel !== p.papel && p.pct === papelDefaultPct[p.papel]) {
          next.pct = papelDefaultPct[patch.papel];
        }
        return next;
      })
    );
  }

  function addParticipante() {
    // Sugere um papel ainda não usado, se possível.
    const used = new Set(participantes.map((p) => p.papel));
    const next = PAPEIS.find((p) => !used.has(p)) ?? "backoffice";
    setParticipantes((prev) => [...prev, makeBlankParticipante(next)]);
  }

  function removeParticipante(id: string) {
    setParticipantes((prev) =>
      prev.length === 1 ? prev : prev.filter((p) => p.id !== id)
    );
  }

  function handleSubmit() {
    if (!cliente.trim()) {
      toast("Informe o nome do cliente.", "info");
      return;
    }
    if (premioMensal <= 0) {
      toast("Prêmio mensal precisa ser maior que zero.", "info");
      return;
    }
    if (participantes.some((p) => !p.nome.trim())) {
      toast("Todos os participantes precisam de nome.", "info");
      return;
    }
    onSubmit({
      cliente: cliente.trim(),
      cnpj: cnpj.trim() || undefined,
      produto,
      vidas,
      premioMensal,
      comissaoOperadoraPct,
      fechamentoData,
      observacao: observacao.trim() || undefined,
      participantes,
      conciliado: false,
    });
  }

  return (
    <div className="rounded-2xl border border-navy-900/20 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow text-champagne-700">Novo fechamento</p>
          <h2 className="heading-display mt-1 text-2xl text-navy-900">
            Registrar split de comissão
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Fechar"
          className="flex h-8 w-8 items-center justify-center rounded-full text-navy-500 hover:bg-sand/40"
        >
          <X size={14} />
        </button>
      </div>

      {/* ---------- Bloco 1: dados do fechamento ---------- */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Field label="Cliente *">
          <input
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Nome ou razão social"
            className={inputCls}
          />
        </Field>
        <Field label="CNPJ">
          <input
            value={cnpj}
            onChange={(e) => setCnpj(cnpjMask(e.target.value))}
            placeholder="00.000.000/0000-00"
            maxLength={18}
            className={inputCls}
          />
        </Field>
        <Field label="Produto">
          <select
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            className={inputCls}
          >
            <option>Saúde Coletiva</option>
            <option>Saúde + Odonto</option>
            <option>Odonto</option>
            <option>Vida Empresarial</option>
            <option>Outros</option>
          </select>
        </Field>
        <Field label="Vidas">
          <input
            type="number"
            min={1}
            value={vidas}
            onChange={(e) => setVidas(Math.max(1, Number(e.target.value) || 0))}
            className={inputCls}
          />
        </Field>
        <Field label="Prêmio mensal (R$)">
          <input
            type="number"
            min={0}
            step={0.01}
            value={premioMensal || ""}
            onChange={(e) => setPremioMensal(Number(e.target.value) || 0)}
            placeholder="0,00"
            className={inputCls}
          />
        </Field>
        <Field label="% comissão operadora">
          <input
            type="number"
            min={0}
            max={100}
            step={0.5}
            value={comissaoOperadoraPct}
            onChange={(e) => setComissaoOperadoraPct(Number(e.target.value) || 0)}
            className={inputCls}
          />
        </Field>
        <Field label="Data do fechamento">
          <input
            type="date"
            value={fechamentoData}
            onChange={(e) => setFechamentoData(e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Comissão bruta calculada">
          <div className="flex h-10 items-center rounded-full border border-champagne-200/60 bg-sand/40 px-4 text-sm font-medium text-navy-900">
            {brl(bruta)}
          </div>
        </Field>
      </div>

      {/* ---------- Bloco 2: participantes ---------- */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="eyebrow text-champagne-700">Participantes do split</p>
          <Button variant="dark-outline" size="sm" onClick={addParticipante}>
            <Plus size={12} /> Adicionar participante
          </Button>
        </div>

        <div className="mt-4 space-y-3">
          {participantes.map((p) => (
            <div
              key={p.id}
              className="grid gap-3 rounded-xl border border-champagne-200/60 bg-sand/15 p-4 md:grid-cols-[1.4fr_2fr_1fr_0.8fr_1fr_auto]"
            >
              <Field label="Papel" inset>
                <select
                  value={p.papel}
                  onChange={(e) =>
                    updateParticipante(p.id, { papel: e.target.value as Papel })
                  }
                  className={inputCls}
                >
                  {PAPEIS.map((pp) => (
                    <option key={pp} value={pp}>
                      {papelLabel[pp]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Pessoa / time" inset>
                <input
                  value={p.nome}
                  onChange={(e) => updateParticipante(p.id, { nome: e.target.value })}
                  placeholder="Nome da pessoa ou time"
                  className={inputCls}
                />
              </Field>
              <Field label="Base de cálculo" inset>
                <select
                  value={p.base}
                  onChange={(e) =>
                    updateParticipante(p.id, { base: e.target.value as BaseCalculo })
                  }
                  className={inputCls}
                >
                  {BASES.map((b) => (
                    <option key={b} value={b}>
                      {baseLabel[b]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="%" inset>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={p.pct}
                  onChange={(e) =>
                    updateParticipante(p.id, { pct: Number(e.target.value) || 0 })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="Valor mensal" inset>
                <div className="flex h-10 items-center rounded-full border border-champagne-200/60 bg-white px-4 text-sm font-medium text-forest">
                  {brl((bruta * p.pct) / 100)}
                </div>
              </Field>
              <button
                type="button"
                onClick={() => removeParticipante(p.id)}
                disabled={participantes.length === 1}
                aria-label="Remover participante"
                className="flex h-10 w-10 items-center justify-center self-end rounded-full text-navy-500 hover:bg-white hover:text-navy-900 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Sumário do split + alertas */}
        <div className="mt-4 grid gap-3 rounded-xl border border-champagne-200/60 bg-sand/30 p-4 sm:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">
              Soma dos %
            </p>
            <p className={`mt-1 text-lg font-medium ${totalPct > 100 ? "text-navy-900" : "text-navy-900"}`}>
              {totalPct.toFixed(1)}%
            </p>
            {totalPct > 100 && (
              <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-champagne-800">
                <AlertTriangle size={11} /> Acima de 100%
              </p>
            )}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">
              Total a pagar mensal
            </p>
            <p className="mt-1 text-lg font-medium text-forest">{brl(totalValor)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">
              Margem corretora
            </p>
            <p className={`mt-1 text-lg font-medium ${margem < 0 ? "text-navy-900" : "text-navy-900"}`}>
              {brl(margem)}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Observação + ações ---------- */}
      <div className="mt-6">
        <Field label="Observação (opcional)">
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Ex: indicação de parceiro contábil, override por meta batida, etc."
            rows={2}
            className="w-full rounded-2xl border border-champagne-200/60 bg-white px-4 py-3 text-sm placeholder:text-navy-400 focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-900/5"
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        <Button variant="ghost" size="md" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" size="md" onClick={handleSubmit}>
          <Plus size={14} /> Registrar fechamento
        </Button>
      </div>
    </div>
  );
}

// ---------- Field helper (label + child) ----------

const inputCls =
  "h-10 w-full rounded-full border border-champagne-200/60 bg-white px-4 text-sm placeholder:text-navy-400 focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-900/5";

function Field({
  label,
  children,
  inset,
}: {
  label: string;
  children: React.ReactNode;
  inset?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        className={`text-[10px] uppercase tracking-widest ${
          inset ? "text-navy-700/55" : "text-navy-700/60"
        }`}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
