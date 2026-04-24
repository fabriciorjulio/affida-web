import { Download, AlertCircle, CheckCircle2, Calendar } from "lucide-react";
import { clients } from "@/lib/mock-data";
import { PortalShell } from "@/components/portal/portal-shell";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl } from "@/lib/utils";

const DEMO_CLIENT_ID = "cli-001";

const faturas = [
  {
    id: "FAT-2026-04",
    competencia: "Abril/2026",
    vencimento: "2026-04-20",
    valor: 8640,
    divergencia: 1180,
    status: "em_analise",
    operadora: "Amil",
  },
  {
    id: "FAT-2026-03",
    competencia: "Março/2026",
    vencimento: "2026-03-20",
    valor: 7460,
    divergencia: 0,
    status: "pago",
    operadora: "Amil",
  },
  {
    id: "FAT-2026-02",
    competencia: "Fevereiro/2026",
    vencimento: "2026-02-20",
    valor: 7460,
    divergencia: 0,
    status: "pago",
    operadora: "Amil",
  },
  {
    id: "FAT-2026-01",
    competencia: "Janeiro/2026",
    vencimento: "2026-01-20",
    valor: 7140,
    divergencia: 0,
    status: "pago",
    operadora: "Amil",
  },
];

const statusMap = {
  em_analise: { label: "Em análise", tone: "gold" as const },
  pago: { label: "Pago", tone: "success" as const },
  atrasado: { label: "Atrasado", tone: "danger" as const },
  pendente: { label: "Pendente", tone: "info" as const },
};

export default function FaturasPage() {
  const client = clients.find((c) => c.id === DEMO_CLIENT_ID)!;

  return (
    <PortalShell clientName={client.nomeFantasia}>
      <section>
        <p className="eyebrow">Faturas & conciliação</p>
        <h1 className="heading-display mt-2 text-display-md text-navy-900">
          Sua <em className="italic text-forest">conta mensal auditada</em>
        </h1>
        <p className="mt-3 text-sm text-navy-700/80">
          Cada fatura da operadora passa por conciliação automática contra seu cadastro. Divergências
          são endereçadas antes do vencimento — sem cobrança indevida.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-champagne-300/50 bg-champagne-50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-champagne-700" />
              <p className="eyebrow text-champagne-800">Fatura de abril</p>
            </div>
            <h2 className="heading-display mt-3 text-2xl text-navy-900">
              Divergência de R$ 1.180 sendo analisada
            </h2>
            <p className="mt-3 text-sm text-navy-700/80">
              Identificamos 2 vidas cobradas que foram excluídas em março. A Amil será notificada.
              Enquanto isso, a fatura está em revisão — não precisa pagar até validação.
            </p>
          </div>
          <ActionButton
            action="demo"
            message="Detalhe da conciliação exibido — abra um ticket se quiser discutir."
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-medium text-ivory hover:bg-navy-700"
          >
            Ver detalhe da conciliação
          </ActionButton>
        </div>
      </section>

      <section className="mt-10 overflow-x-auto rounded-3xl border border-champagne-200/60 bg-white">
        <table className="min-w-full">
          <thead className="bg-sand/40 text-left">
            <tr>
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-navy-700/70">
                Competência
              </th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-navy-700/70">
                Operadora
              </th>
              <th className="px-5 py-3 text-[10px] uppercase tracking-widest text-navy-700/70">
                Vencimento
              </th>
              <th className="px-5 py-3 text-right text-[10px] uppercase tracking-widest text-navy-700/70">
                Valor
              </th>
              <th className="px-5 py-3 text-center text-[10px] uppercase tracking-widest text-navy-700/70">
                Status
              </th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {faturas.map((f) => {
              const st = statusMap[f.status as keyof typeof statusMap];
              return (
                <tr key={f.id} className="border-t border-champagne-200/60">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-navy-900">{f.competencia}</p>
                    <p className="text-xs text-navy-700/60">{f.id}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-navy-700">{f.operadora}</td>
                  <td className="px-5 py-4 text-sm text-navy-700">
                    {new Date(f.vencimento).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="font-display text-lg font-light text-navy-900">{brl(f.valor)}</p>
                    {f.divergencia > 0 && (
                      <p className="text-[10px] text-champagne-700">
                        divergência: {brl(f.divergencia)}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Badge tone={st.tone}>{st.label}</Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ActionButton
                      action="download"
                      message={`Fatura ${f.id} — download em instantes.`}
                      className="inline-flex items-center gap-1 rounded-full border border-navy-100 bg-white px-3 py-1.5 text-xs text-navy-700 hover:bg-navy-50"
                    >
                      <Download size={11} /> PDF
                    </ActionButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
          <CheckCircle2 size={16} className="text-forest" />
          <p className="mt-3 text-sm font-medium text-navy-900">Conciliação automática</p>
          <p className="mt-1 text-xs text-navy-700/70">
            Comparamos cada linha da fatura com nosso cadastro atualizado por você e pelo seu
            contador parceiro.
          </p>
        </div>
        <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
          <Calendar size={16} className="text-champagne-700" />
          <p className="mt-3 text-sm font-medium text-navy-900">Alertas de vencimento</p>
          <p className="mt-1 text-xs text-navy-700/70">
            Avisos 7 e 2 dias antes do vencimento por e-mail e WhatsApp para o financeiro.
          </p>
        </div>
        <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
          <AlertCircle size={16} className="text-champagne-700" />
          <p className="mt-3 text-sm font-medium text-navy-900">Divergência &gt; R$ 500</p>
          <p className="mt-1 text-xs text-navy-700/70">
            A Affida abre ticket direto na operadora — sem necessidade de ação do cliente.
          </p>
        </div>
      </section>
    </PortalShell>
  );
}
