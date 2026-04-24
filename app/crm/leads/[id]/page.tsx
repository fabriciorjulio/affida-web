import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  Building2,
  User,
  FileSignature,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { leads, productById, activities, pipelineStages } from "@/lib/mock-data";
import { CrmHeader } from "@/components/crm/sidebar";
import { Badge } from "@/components/ui/badge";
import { ActionButton } from "@/components/ui/action-button";
import { brl } from "@/lib/utils";

export function generateStaticParams() {
  return leads.map((l) => ({ id: l.id }));
}

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = leads.find((l) => l.id === params.id);
  if (!lead) notFound();
  const product = productById(lead!.productOfInterest);
  const leadActivities = activities.filter((a) => a.leadId === lead!.id);
  const stage = pipelineStages.find((s) => s.id === lead!.stage)!;

  return (
    <>
      <CrmHeader title={lead!.nomeFantasia} subtitle={`Lead · ${lead!.cnpj}`} />

      <div className="flex-1 space-y-6 bg-sand/20 px-8 py-8">
        <Link href="/crm/leads" className="inline-flex items-center gap-2 text-xs text-navy-700 hover:text-navy-900">
          <ArrowLeft size={14} /> Voltar para leads
        </Link>

        {/* Hero */}
        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-champagne-600">{product?.name}</p>
                <h2 className="heading-display mt-2 text-3xl text-navy-900">{lead!.razaoSocial}</h2>
                <p className="mt-2 text-sm text-navy-700/70">
                  {lead!.ramoAtividade} · CNAE {lead!.cnae} · {lead!.porte} · {lead!.vidas} vidas · {lead!.cidade}/
                  {lead!.uf}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge tone="gold">Score {lead!.score}</Badge>
                <Badge
                  tone={
                    lead!.stage === "fechado"
                      ? "success"
                      : lead!.stage === "perdido"
                        ? "danger"
                        : lead!.stage === "negociacao"
                          ? "warning"
                          : lead!.stage === "proposta"
                            ? "gold"
                            : lead!.stage === "qualificado"
                              ? "info"
                              : "neutral"
                  }
                >
                  {stage.label}
                </Badge>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Prêmio estimado</p>
                <p className="mt-1 font-display text-2xl font-light text-navy-900">
                  {brl(lead!.estimatedPremium)}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Comissão</p>
                <p className="mt-1 font-display text-2xl font-light text-forest">
                  {brl(lead!.estimatedCommission)}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Consultor</p>
                <p className="mt-1 text-sm font-medium text-navy-900">{lead!.owner}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Origem</p>
                <p className="mt-1 text-sm text-navy-700">
                  {lead!.source.replace("_", " ")}
                  {lead!.sourceDetail && <> · {lead!.sourceDetail}</>}
                </p>
              </div>
            </div>

            {lead!.nextActionAt && (
              <div className="mt-6 rounded-xl border border-champagne-200/70 bg-champagne-50/60 p-4">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-champagne-600" />
                  <p className="text-xs font-medium text-champagne-800 uppercase tracking-widest">
                    Próxima ação
                  </p>
                </div>
                <p className="mt-2 text-sm text-navy-900">{lead!.nextAction}</p>
                <p className="mt-1 text-xs text-navy-700/70">
                  {new Date(lead!.nextActionAt).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Contato */}
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
            <p className="eyebrow">Contato principal</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 font-display text-base text-champagne-300">
                {lead!.contact.nome
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="font-medium text-navy-900">{lead!.contact.nome}</p>
                <p className="text-xs text-navy-700/70">{lead!.contact.cargo}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href={`mailto:${lead!.contact.email}`}
                className="flex items-center gap-3 text-navy-700 hover:text-navy-900"
              >
                <Mail size={14} /> {lead!.contact.email}
              </a>
              <a
                href={`tel:${lead!.contact.telefone}`}
                className="flex items-center gap-3 text-navy-700 hover:text-navy-900"
              >
                <Phone size={14} /> {lead!.contact.telefone}
              </a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <ActionButton
                action="demo"
                message={`Discador abrindo ${lead!.contact.telefone}...`}
                className="inline-flex items-center justify-center gap-1 rounded-full bg-navy-900 py-2 text-xs text-ivory hover:bg-navy-700"
              >
                <Phone size={12} /> Call
              </ActionButton>
              <ActionButton
                action="whatsapp"
                whatsappMessage={`Olá ${lead!.contact.nome.split(" ")[0]}, falo da Affida — sobre o plano ${product?.name ?? ""}.`}
                className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-600 py-2 text-xs text-ivory hover:bg-emerald-700"
              >
                <MessageCircle size={12} /> WhatsApp
              </ActionButton>
              <a
                href={`mailto:${lead!.contact.email}?subject=${encodeURIComponent(`Affida · Proposta ${product?.name ?? ""}`)}`}
                className="inline-flex items-center justify-center gap-1 rounded-full border border-navy-100 bg-white py-2 text-xs text-navy-700 hover:bg-navy-50"
              >
                <Mail size={12} /> E-mail
              </a>
            </div>
          </div>
        </section>

        {/* Pipeline + Propostas + Atividades */}
        <section className="grid gap-6 lg:grid-cols-[1.2fr_2fr]">
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
            <p className="eyebrow">Estágio do funil</p>
            <ol className="mt-4 space-y-3">
              {pipelineStages.map((s) => {
                const idx = pipelineStages.findIndex((x) => x.id === lead!.stage);
                const thisIdx = pipelineStages.findIndex((x) => x.id === s.id);
                const reached = thisIdx <= idx && lead!.stage !== "perdido";
                const current = s.id === lead!.stage;
                return (
                  <li key={s.id} className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        current
                          ? "border-navy-900 bg-navy-900 text-ivory"
                          : reached
                            ? "border-forest bg-forest text-ivory"
                            : "border-navy-200 bg-white text-navy-400"
                      }`}
                    >
                      {reached ? <CheckCircle2 size={12} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                    </span>
                    <span
                      className={`text-sm ${
                        current ? "font-medium text-navy-900" : reached ? "text-navy-700" : "text-navy-700/50"
                      }`}
                    >
                      {s.label}
                    </span>
                    {current && <Badge tone="gold">Aqui agora</Badge>}
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 space-y-3">
              <ActionButton
                action="toast"
                href="/portal/proposta"
                message={`Proposta para ${lead!.nomeFantasia} preparada — abrindo preview.`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-4 py-2.5 text-xs font-medium text-navy-900"
              >
                <FileSignature size={14} /> Enviar proposta
              </ActionButton>
              <ActionButton
                action="schedule"
                message={`Convite de reunião com ${lead!.contact.nome} enviado.`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-navy-100 px-4 py-2.5 text-xs text-navy-700 hover:bg-navy-50"
              >
                <Calendar size={14} /> Agendar reunião
              </ActionButton>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-champagne-200/60 bg-white p-6">
            <p className="eyebrow">Timeline</p>
            <ul className="mt-4 space-y-5">
              <li className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-navy-400" />
                <div>
                  <p className="text-sm text-navy-900">Lead criado · {lead!.source.replace("_", " ")}</p>
                  <p className="text-xs text-navy-700/60">
                    {new Date(lead!.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>
              </li>
              {leadActivities.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-forest" />
                  <div>
                    <p className="text-sm text-navy-900">{a.title}</p>
                    {a.description && <p className="text-xs text-navy-700/70">{a.description}</p>}
                    <p className="text-xs text-navy-700/60">
                      {a.by} · {new Date(a.at).toLocaleString("pt-BR")}
                    </p>
                  </div>
                </li>
              ))}
              <li className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-champagne-500" />
                <div>
                  <p className="text-sm text-navy-900">Último contato</p>
                  <p className="text-xs text-navy-700/60">
                    {new Date(lead!.lastTouchAt).toLocaleString("pt-BR")}
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-navy-100 bg-sand/20 p-4">
              <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Adicionar nota</p>
              <textarea
                className="mt-2 w-full resize-none rounded-lg border border-navy-100 bg-white p-3 text-sm placeholder:text-navy-400 focus:border-navy-400 focus:outline-none"
                rows={2}
                placeholder="Anote o que foi combinado..."
              />
              <div className="mt-2 flex justify-end">
                <ActionButton
                  action="toast"
                  message="Nota registrada na timeline do lead."
                  className="rounded-full bg-navy-900 px-4 py-1.5 text-xs text-ivory hover:bg-navy-700"
                >
                  Registrar
                </ActionButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
