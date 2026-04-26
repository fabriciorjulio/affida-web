/**
 * Helpers de renovação — destacam visualmente clientes com vigência
 * próxima do fim, para o closer agir com criticidade e celeridade.
 *
 * Por que é crítico:
 *   • Cliente PME que entra em renovação sem proposta consultiva pronta
 *     vira lead-pago do concorrente em 24h.
 *   • A janela de re-oferta saudável é 60-90 dias antes do fim de
 *     vigência (tempo para análise, comparação, decisão e migração).
 *   • Acima de 30 dias para vencer, ainda dá pra redesenhar; abaixo
 *     de 30 dias, é crise.
 *
 * Static export: a "data de hoje" fica congelada no build (executa no
 * server build, não no client). Para o MVP basta — quando o backend
 * existir, a API recalcula a cada request com Date() real.
 */

import { policies, clients } from "@/lib/mock-data";
import type { Client, Policy } from "@/lib/types";

/** Referência fixa para o build estático. Substituir por Date() quando
 *  os componentes virarem "use client" ou quando houver backend. */
export const TODAY = new Date("2026-04-26T00:00:00Z");

/** Dias entre TODAY e a data ISO informada. Negativo se já passou. */
export function daysUntil(isoDate: string): number {
  const target = new Date(isoDate);
  const ms = target.getTime() - TODAY.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

/** Severidade da janela de renovação. */
export type RenewalSeverity = "vencido" | "critico" | "atencao" | "lembrete" | "tranquilo";

/**
 * Classifica os dias restantes em buckets:
 *   • vencido  · já passou da data — operação em risco
 *   • critico  · ≤ 30 dias — requer ação imediata, não há mais tempo
 *                 para redesenhar a oferta sem atrito ao cliente
 *   • atencao  · 31-60 dias — janela ideal de re-oferta consultiva
 *   • lembrete · 61-90 dias — começar a preparar materiais
 *   • tranquilo · > 90 dias — apenas monitorar
 */
export function severityFor(daysLeft: number): RenewalSeverity {
  if (daysLeft < 0) return "vencido";
  if (daysLeft <= 30) return "critico";
  if (daysLeft <= 60) return "atencao";
  if (daysLeft <= 90) return "lembrete";
  return "tranquilo";
}

/** Configuração visual por severidade — paleta estrita do Manual.
 *  Usado pelo componente <RenewalAlert>. */
export const severityStyle: Record<
  RenewalSeverity,
  {
    label: string;
    badge: string;
    border: string;
    bg: string;
    text: string;
    pulse?: boolean;
  }
> = {
  vencido: {
    label: "Vencido",
    badge: "bg-navy-900 text-ivory",
    border: "border-navy-900",
    bg: "bg-navy-50",
    text: "text-navy-900",
    pulse: true,
  },
  critico: {
    label: "Crítico",
    badge: "bg-navy-900 text-champagne-300",
    border: "border-navy-900",
    bg: "bg-navy-50",
    text: "text-navy-900",
    pulse: true,
  },
  atencao: {
    label: "Atenção",
    badge: "bg-champagne-500 text-navy-900",
    border: "border-champagne-500",
    bg: "bg-champagne-50",
    text: "text-champagne-800",
  },
  lembrete: {
    label: "Lembrete",
    badge: "bg-champagne-100 text-champagne-800",
    border: "border-champagne-200",
    bg: "bg-champagne-50/40",
    text: "text-champagne-700",
  },
  tranquilo: {
    label: "OK",
    badge: "bg-forest-50 text-forest-700",
    border: "border-forest-100",
    bg: "bg-forest-50/40",
    text: "text-forest-700",
  },
};

// ---------------------------------------------------------------------------
// Agregadores cliente-nível
// ---------------------------------------------------------------------------

/** Próxima vigência fim entre todas as apólices ativas/em-renovação do
 *  cliente. Retorna null se não houver apólice elegível. */
export function nextRenewalDateForClient(clientId: string): string | null {
  const active = policies
    .filter(
      (p) =>
        p.clientId === clientId &&
        (p.status === "ativa" || p.status === "em_renovacao")
    )
    .map((p) => p.vigenciaFim)
    .sort();
  return active[0] ?? null;
}

/** Apólices do cliente com vencimento ≤ N dias (ordem ascendente). */
export function upcomingPoliciesForClient(
  clientId: string,
  withinDays = 60
): Array<Policy & { daysLeft: number; severity: RenewalSeverity }> {
  return policies
    .filter(
      (p) =>
        p.clientId === clientId &&
        (p.status === "ativa" || p.status === "em_renovacao")
    )
    .map((p) => {
      const daysLeft = daysUntil(p.vigenciaFim);
      return { ...p, daysLeft, severity: severityFor(daysLeft) };
    })
    .filter((p) => p.daysLeft <= withinDays)
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

export type ClientRenewalView = Client & {
  daysLeft: number;
  severity: RenewalSeverity;
  nextRenewalAt: string;
  /** soma do prêmio mensal das apólices que vencem na janela */
  premioEmRisco: number;
  /** soma da comissão mensal correspondente */
  comissaoEmRisco: number;
};

/**
 * Ranking de clientes destaque com renovação iminente. "Destaque" é
 * priorizado por:
 *   1. Severidade (crítico > atenção > lembrete)
 *   2. Comissão em risco (R$/mês — quanto maior, mais crítico)
 *
 * Retorna apenas clientes com pelo menos 1 apólice na janela `withinDays`.
 */
export function clientsByRenewalUrgency(withinDays = 60): ClientRenewalView[] {
  const out: ClientRenewalView[] = [];
  for (const client of clients) {
    const upcoming = upcomingPoliciesForClient(client.id, withinDays);
    if (upcoming.length === 0) continue;
    const next = upcoming[0]; // mais próximo
    const premioEmRisco = upcoming.reduce((s, p) => s + p.premioMensal, 0);
    const comissaoEmRisco = upcoming.reduce(
      (s, p) => s + p.premioMensal * p.comissaoPercent,
      0
    );
    out.push({
      ...client,
      daysLeft: next.daysLeft,
      severity: next.severity,
      nextRenewalAt: next.vigenciaFim,
      premioEmRisco,
      comissaoEmRisco,
    });
  }

  const severityRank: Record<RenewalSeverity, number> = {
    vencido: 0,
    critico: 1,
    atencao: 2,
    lembrete: 3,
    tranquilo: 4,
  };
  return out.sort((a, b) => {
    const s = severityRank[a.severity] - severityRank[b.severity];
    if (s !== 0) return s;
    return b.comissaoEmRisco - a.comissaoEmRisco;
  });
}

/** Formata "Vence em 23 dias" ou "Vencido há 5 dias". */
export function formatRenewalDistance(daysLeft: number): string {
  if (daysLeft < 0) return `Vencido há ${Math.abs(daysLeft)} dias`;
  if (daysLeft === 0) return "Vence hoje";
  if (daysLeft === 1) return "Vence amanhã";
  return `Vence em ${daysLeft} dias`;
}

/** Formata data ISO em "31/03/2026". */
export function formatBR(isoDate: string): string {
  const [y, m, d] = isoDate.split("T")[0].split("-");
  return `${d}/${m}/${y}`;
}
