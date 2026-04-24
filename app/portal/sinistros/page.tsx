import { AlertCircle, Clock, CheckCircle2, FileText, MessageCircle } from "lucide-react";
import { clients } from "@/lib/mock-data";
import { PortalShell } from "@/components/portal/portal-shell";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl } from "@/lib/utils";

const DEMO_CLIENT_ID = "cli-001";

const sinistros = [
  {
    id: "SIN-2026-0412",
    tipo: "Consulta médica",
    beneficiario: "Bruno Alves",
    operadora: "Amil",
    data: "2026-04-12",
    valor: 380,
    status: "em_analise",
  },
  {
    id: "SIN-2026-0403",
    tipo: "Exame laboratorial",
    beneficiario: "Beatriz Gomes",
    operadora: "Amil",
    data: "2026-04-03",
    valor: 720,
    status: "aprovado",
  },
  {
    id: "SIN-2026-0325",
    tipo: "Fisioterapia (pacote)",
    beneficiario: "Camila Ribeiro",
    operadora: "Amil",
    data: "2026-03-25",
    valor: 1420,
    status: "aprovado",
  },
  {
    id: "SIN-2026-0318",
    tipo: "Consulta especialista",
    beneficiario: "Lucas Veloso",
    operadora: "Amil",
    data: "2026-03-18",
    valor: 495,
    status: "pago",
  },
  {
    id: "SIN-2026-0301",
    tipo: "Ressonância magnética",
    beneficiario: "Beatriz Gomes",
    operadora: "Amil",
    data: "2026-03-01",
    valor: 2150,
    status: "pago",
  },
];

const statusMap = {
  em_analise: { label: "Em análise", tone: "gold" as const, icon: Clock },
  aprovado: { label: "Aprovado", tone: "info" as const, icon: CheckCircle2 },
  pago: { label: "Pago", tone: "success" as const, icon: CheckCircle2 },
  negado: { label: "Negado", tone: "danger" as const, icon: AlertCircle },
};

export default function SinistrosPage() {
  const client = clients.find((c) => c.id === DEMO_CLIENT_ID)!;
  const total = sinistros.reduce((a, s) => a + s.valor, 0);

  return (
    <PortalShell clientName={client.nomeFantasia}>
      <section>
        <p className="eyebrow">Histórico de sinistros</p>
        <h1 className="heading-display mt-2 text-display-md text-navy-900">
          Seus <em className="italic text-forest">reembolsos e utilizações</em>
        </h1>
        <p className="mt-3 text-sm text-navy-700/80">
          Acompanhe todo uso da apólice em um só lugar. Nossa equipe medeia comunicação com a
          operadora quando necessário.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
          <p className="text-[10px] uppercase tracking-widest text-navy-700/60">
            Sinistros 12 meses
          </p>
          <p className="mt-2 font-display text-3xl font-light text-navy-900">{sinistros.length}</p>
        </div>
        <div className="rounded-2xl border border-champagne-200/60 bg-white p-5">
          <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Volume total</p>
          <p className="mt-2 font-display text-3xl font-light text-navy-900">{brl(total)}</p>
        </div>
        <div className="rounded-2xl border border-forest/30 bg-forest-50/40 p-5">
          <p className="text-[10px] uppercase tracking-widest text-forest">Sinistralidade</p>
          <p className="mt-2 font-display text-3xl font-light text-navy-900">48%</p>
          <p className="mt-1 text-xs text-forest">Abaixo do setor (52%)</p>
        </div>
      </section>

      <section className="mt-10 space-y-3">
        {sinistros.map((s) => {
          const st = statusMap[s.status as keyof typeof statusMap];
          const Icon = st.icon;
          return (
            <div
              key={s.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-champagne-200/60 bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-900">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-medium text-navy-900">{s.tipo}</p>
                  <p className="text-xs text-navy-700/60">
                    {s.id} · {new Date(s.data).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <div className="hidden text-xs text-navy-700/70 md:block">
                <p className="font-medium text-navy-900">{s.beneficiario}</p>
                <p className="text-navy-700/60">{s.operadora}</p>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <p className="font-display text-lg font-light text-navy-900">{brl(s.valor)}</p>
                <Badge tone={st.tone}>{st.label}</Badge>
                <ActionButton
                  action="download"
                  message={`Comprovante ${s.id} — preparando download.`}
                  className="rounded-full border border-navy-100 bg-white px-3 py-1.5 text-xs text-navy-700 hover:bg-navy-50"
                >
                  <FileText size={12} className="mr-1 inline" /> Comprovante
                </ActionButton>
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-10 rounded-3xl border border-navy-900 bg-navy-900 p-6 text-ivory">
        <p className="eyebrow text-champagne-500">Precisa de ajuda?</p>
        <p className="mt-3 text-sm text-ivory/85">
          Se a operadora demorar ou negar um sinistro, nossa equipe intervém diretamente. Fale com
          seu consultor a qualquer momento.
        </p>
        <ActionButton
          action="whatsapp"
          whatsappMessage="Olá Lucas, preciso de apoio com um sinistro da Affida."
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-medium text-navy-900 hover:shadow-gold"
        >
          <MessageCircle size={12} /> Falar com meu consultor
        </ActionButton>
      </section>
    </PortalShell>
  );
}
