import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import {
  formatRenewalDistance,
  formatBR,
  severityStyle,
  type RenewalSeverity,
} from "@/lib/renovacao";

/**
 * Alerta visual de proximidade de renovação.
 *
 * Variantes:
 *   • "badge"  · pílula compacta para tabela ("23 dias · Crítico")
 *   • "banner" · faixa larga para topo da ficha do cliente
 *   • "card"   · cartão de listagem para o dashboard
 *
 * Cores derivam de `severityStyle` em lib/renovacao.ts — paleta estrita
 * Manual de Marca (sem vermelho/verde fora da paleta).
 */

type CommonProps = {
  daysLeft: number;
  severity: RenewalSeverity;
  vigenciaFim: string;
};

export function RenewalBadge({ daysLeft, severity }: Omit<CommonProps, "vigenciaFim">) {
  const s = severityStyle[severity];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest ${s.badge} ${
        s.pulse ? "animate-pulse" : ""
      }`}
      aria-label={`Renovação ${s.label.toLowerCase()}: ${formatRenewalDistance(daysLeft)}`}
    >
      <Clock size={10} strokeWidth={2.2} />
      {formatRenewalDistance(daysLeft)}
    </span>
  );
}

export function RenewalBanner({
  daysLeft,
  severity,
  vigenciaFim,
  premioEmRisco,
  comissaoEmRisco,
  apolicesCount,
}: CommonProps & {
  premioEmRisco: number;
  comissaoEmRisco: number;
  apolicesCount: number;
}) {
  if (severity === "tranquilo" || severity === "lembrete") return null;
  const s = severityStyle[severity];
  const Icon = severity === "vencido" || severity === "critico"
    ? AlertTriangle
    : severity === "atencao"
      ? Clock
      : CheckCircle2;

  const fmt = (n: number) =>
    n.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border-l-4 ${s.border} ${s.bg} p-5 sm:flex-row sm:items-center sm:gap-5`}
      role="alert"
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.badge} ${
          s.pulse ? "animate-pulse" : ""
        }`}
      >
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className={`font-display text-xl font-light ${s.text}`}>
            {formatRenewalDistance(daysLeft)}
          </p>
          <span className="text-[10px] uppercase tracking-widest text-navy-700/60">
            vigência até {formatBR(vigenciaFim)}
          </span>
        </div>
        <p className="mt-1 text-sm text-navy-800">
          {apolicesCount === 1
            ? "1 apólice em risco · "
            : `${apolicesCount} apólices em risco · `}
          prêmio <strong>{fmt(premioEmRisco)}/mês</strong> · comissão{" "}
          <strong>{fmt(comissaoEmRisco)}/mês</strong>
        </p>
        <p className="mt-1 text-xs text-navy-700/70">
          {severity === "critico"
            ? "Janela curta — preparar contraproposta e cronograma de migração HOJE."
            : severity === "atencao"
              ? "Janela ideal de re-oferta consultiva. Agendar conversa com cliente em até 7 dias."
              : "Apólice fora da vigência — ação imediata para regularização."}
        </p>
      </div>
    </div>
  );
}
