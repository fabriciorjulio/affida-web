import { Settings as SettingsIcon, Users, Plug, Shield, Bell, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";

const groups = [
  {
    icon: Users,
    title: "Equipe & permissões",
    items: [
      { label: "Gestão de usuários", value: "4 ativos · 2 closers, 1 admin, 1 consultor" },
      { label: "Papéis e permissões", value: "3 perfis configurados" },
      { label: "SSO / Google Workspace", value: "Ativo" },
    ],
  },
  {
    icon: Plug,
    title: "Integrações",
    items: [
      { label: "WhatsApp Business API", value: "Conectado · +55 11 90000-0000" },
      { label: "Calendly", value: "Lucas Azevedo — agenda_lucas" },
      { label: "Omie / ContaAzul", value: "Em homologação" },
      { label: "Meta Ads", value: "Conectado · conta Affida Main" },
    ],
  },
  {
    icon: Bell,
    title: "Notificações",
    items: [
      { label: "Novos leads", value: "WhatsApp + e-mail imediato" },
      { label: "Gatilhos de reoferta", value: "Digest diário 9h" },
      { label: "Renovação < 30 dias", value: "Alerta para closer + cliente" },
    ],
  },
  {
    icon: Shield,
    title: "Compliance & LGPD",
    items: [
      { label: "DPO responsável", value: "jurídico@affida.com.br" },
      { label: "Retenção de dados", value: "5 anos após encerramento" },
      { label: "Base legal", value: "Execução de contrato + legítimo interesse" },
    ],
  },
  {
    icon: Palette,
    title: "Marca & proposta",
    items: [
      { label: "Identidade visual", value: "Affida Partners · v1.0" },
      { label: "Templates de proposta", value: "3 modelos ativos" },
      { label: "Rationale padrão", value: "4 rationales por perfil" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Configurações</p>
          <h1 className="heading-display mt-2 text-display-md text-navy-900">Settings</h1>
          <p className="mt-2 text-sm text-navy-700/70">
            Controle operacional da Affida — equipe, integrações, compliance e marca.
          </p>
        </div>
        <Badge tone="gold">Ambiente: produção</Badge>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {groups.map((g) => (
          <div
            key={g.title}
            className="rounded-3xl border border-champagne-200/60 bg-white p-6"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-champagne-300">
                <g.icon size={16} strokeWidth={1.5} />
              </span>
              <h2 className="font-display text-xl font-light text-navy-900">{g.title}</h2>
            </div>
            <ul className="mt-5 space-y-4">
              {g.items.map((it) => (
                <li
                  key={it.label}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-champagne-200/60 pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-navy-900">{it.label}</p>
                    <p className="mt-0.5 text-xs text-navy-700/70">{it.value}</p>
                  </div>
                  <ActionButton
                    action="demo"
                    message="Edição de settings será habilitada no próximo sprint."
                    className="rounded-full border border-navy-100 bg-white px-3 py-1 text-xs text-navy-700 hover:bg-navy-50"
                  >
                    Editar
                  </ActionButton>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
