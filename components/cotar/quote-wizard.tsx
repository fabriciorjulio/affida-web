"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Download,
  Star,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { Input, Select, FieldGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { brl, cnpjMask } from "@/lib/utils";
import { operatorById } from "@/lib/mock-data";
import { QuoteShell } from "./quote-shell";

type FormState = {
  cnpj: string;
  razaoSocial: string;
  porte: string;
  cnae: string;
  vidas: number;
  capital: "6x" | "12x" | "24x" | "custom";
  extras: string[];
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
};

const coberturaOpcoes = [
  { id: "6x", label: "6× salário", hint: "Essencial", recommended: false },
  { id: "12x", label: "12× salário", hint: "Recomendado", recommended: true },
  { id: "24x", label: "24× salário", hint: "Premium", recommended: false },
  { id: "custom", label: "Capital fixo", hint: "Definir valor", recommended: false },
] as const;

const extrasDisponiveis = [
  { id: "ipa", label: "Invalidez Permanente (IPA)" },
  { id: "ipd", label: "Invalidez por doença" },
  { id: "dmh", label: "Diagnóstico de doenças graves" },
  { id: "af", label: "Assistência funeral familiar" },
  { id: "auxilio", label: "Auxílio-alimentação emergencial" },
];

function packageFor(vidas: number, multiplier: number) {
  return [
    {
      operatorId: "bradesco-vida",
      plano: "Bradesco Vida Grupo Digital",
      reajuste: "IPCA + 2,5%",
      capitalBase: 150000 * (multiplier / 12),
      taxa: 0.0022 * multiplier,
      badge: "Mais escolhido" as const,
      destaque: "Assistência funeral + sorteios mensais",
      comissao: 0.42,
      carencia: "60 dias",
    },
    {
      operatorId: "icatu",
      plano: "Icatu Empresa Plus",
      reajuste: "IPCA",
      capitalBase: 150000 * (multiplier / 12),
      taxa: 0.00205 * multiplier,
      badge: "Melhor preço" as const,
      destaque: "Cobertura global + telemedicina",
      comissao: 0.44,
      carencia: "30 dias",
    },
    {
      operatorId: "prudential",
      plano: "Prudential Key Person",
      reajuste: "IPCA + 1,8%",
      capitalBase: 150000 * (multiplier / 12),
      taxa: 0.00265 * multiplier,
      badge: "Premium" as const,
      destaque: "Capital elevado + consultoria patrimonial",
      comissao: 0.48,
      carencia: "sem carência",
    },
  ].map((p) => {
    const valorMensal = Math.round(p.capitalBase * vidas * p.taxa * 100) / 100;
    return { ...p, valorMensal, valorPorVida: Math.round((valorMensal / vidas) * 100) / 100 };
  });
}

export function QuoteWizard({ product }: { product: Product }) {
  const totalSteps = 4;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    cnpj: "",
    razaoSocial: "",
    porte: "",
    cnae: "",
    vidas: product.minVidas,
    capital: "12x",
    extras: ["ipa", "af"],
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
  });

  const multiplier = form.capital === "6x" ? 6 : form.capital === "24x" ? 24 : form.capital === "12x" ? 12 : 12;
  const packages = useMemo(() => packageFor(form.vidas, multiplier), [form.vidas, multiplier]);
  const cheapest = packages.reduce((a, b) => (a.valorMensal < b.valorMensal ? a : b));

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }
  function toggleExtra(id: string) {
    setForm((prev) => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter((e) => e !== id) : [...prev.extras, id],
    }));
  }

  const canAdvance =
    (step === 1 && form.cnpj.length >= 14 && form.razaoSocial.length > 2 && form.vidas >= product.minVidas) ||
    (step === 2 && !!form.capital) ||
    (step === 3 && form.nome && form.email && form.telefone) ||
    step === 4;

  return (
    <QuoteShell productName={product.name} currentStep={step} totalSteps={totalSteps}>
      {step === 1 && (
        <div className="animate-fade-up">
          <div className="max-w-2xl">
            <p className="eyebrow">Passo 1 · Sua empresa</p>
            <h1 className="heading-display mt-3 text-display-md text-navy-900">
              Comece pelo <em className="italic text-forest">CNPJ</em>.
            </h1>
            <p className="mt-4 text-base text-navy-700/80">
              Em 60 segundos montamos a melhor cotação do mercado para o seu perfil. Dados sigilosos, sem
              compromisso.
            </p>
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl border border-champagne-200/60 bg-white p-8 md:grid-cols-2">
            <FieldGroup label="CNPJ">
              <Input
                value={form.cnpj}
                onChange={(e) => set("cnpj", cnpjMask(e.target.value))}
                placeholder="00.000.000/0000-00"
                maxLength={18}
              />
            </FieldGroup>

            <FieldGroup label="Razão social">
              <Input
                value={form.razaoSocial}
                onChange={(e) => set("razaoSocial", e.target.value)}
                placeholder="Nome oficial da empresa"
              />
            </FieldGroup>

            <FieldGroup label="Porte">
              <Select value={form.porte} onChange={(e) => set("porte", e.target.value)}>
                <option value="">Selecione</option>
                <option value="MEI">MEI</option>
                <option value="ME">ME (até R$ 360 mil)</option>
                <option value="EPP">EPP (até R$ 4,8 mi)</option>
                <option value="Media">Média empresa</option>
              </Select>
            </FieldGroup>

            <FieldGroup label="CNAE principal">
              <Input
                value={form.cnae}
                onChange={(e) => set("cnae", e.target.value)}
                placeholder="Ex. 6202-3/00"
              />
            </FieldGroup>

            <FieldGroup label={`Número de vidas (mín. ${product.minVidas})`}>
              <Input
                type="number"
                min={product.minVidas}
                max={product.maxVidas ?? 999}
                value={form.vidas}
                onChange={(e) => set("vidas", Math.max(product.minVidas, Number(e.target.value) || 0))}
              />
            </FieldGroup>

            <div className="rounded-xl border border-champagne-200/70 bg-champagne-50/50 p-4 text-xs text-navy-700/80">
              <p className="font-medium text-navy-900">Benchmark setorial</p>
              <p className="mt-1">
                Empresas do seu porte contratam em média{" "}
                <strong className="text-navy-900">{form.vidas * 650} / mês</strong> em seguro de vida.
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-up">
          <div className="max-w-2xl">
            <p className="eyebrow">Passo 2 · Cobertura</p>
            <h1 className="heading-display mt-3 text-display-md text-navy-900">
              Quanto de <em className="italic text-forest">capital segurado</em>?
            </h1>
            <p className="mt-4 text-base text-navy-700/80">
              Capital segurado é o valor pago aos beneficiários em caso de sinistro. A escolha mais comum
              para PME é 12× o salário médio.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {coberturaOpcoes.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => set("capital", opt.id)}
                className={`relative rounded-2xl border p-6 text-left transition-all ${
                  form.capital === opt.id
                    ? "border-navy-900 bg-navy-900 text-ivory shadow-premium"
                    : "border-champagne-200/70 bg-white hover:-translate-y-0.5 hover:shadow-premium"
                }`}
              >
                {opt.recommended && (
                  <span className="absolute -top-2 right-4 rounded-full bg-gradient-gold px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-navy-900">
                    Recomendado
                  </span>
                )}
                <p className={`font-display text-3xl font-light ${form.capital === opt.id ? "text-ivory" : "text-navy-900"}`}>
                  {opt.label}
                </p>
                <p className={`mt-2 text-xs uppercase tracking-widest ${form.capital === opt.id ? "text-champagne-300" : "text-champagne-600"}`}>
                  {opt.hint}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-12">
            <p className="eyebrow">Coberturas adicionais</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {extrasDisponiveis.map((e) => {
                const active = form.extras.includes(e.id);
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => toggleExtra(e.id)}
                    className={`flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition-all ${
                      active
                        ? "border-forest/40 bg-forest-50/40"
                        : "border-champagne-200/70 bg-white hover:border-champagne-400/60"
                    }`}
                  >
                    <span className="text-sm font-medium text-navy-900">{e.label}</span>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        active ? "border-forest bg-forest text-ivory" : "border-navy-200 text-transparent"
                      }`}
                    >
                      <Check size={14} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-fade-up">
          <div className="max-w-2xl">
            <p className="eyebrow">Passo 3 · Contato</p>
            <h1 className="heading-display mt-3 text-display-md text-navy-900">
              Pra quem <em className="italic text-forest">entregamos</em> a proposta?
            </h1>
            <p className="mt-4 text-base text-navy-700/80">
              Seu consultor Affida dedicado vai apresentar as opções via WhatsApp ou e-mail em até
              30 minutos em horário comercial.
            </p>
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl border border-champagne-200/60 bg-white p-8 md:grid-cols-2">
            <FieldGroup label="Seu nome">
              <Input value={form.nome} onChange={(e) => set("nome", e.target.value)} placeholder="Nome completo" />
            </FieldGroup>
            <FieldGroup label="Cargo">
              <Input value={form.cargo} onChange={(e) => set("cargo", e.target.value)} placeholder="Ex. Head of People" />
            </FieldGroup>
            <FieldGroup label="E-mail corporativo">
              <Input value={form.email} type="email" onChange={(e) => set("email", e.target.value)} placeholder="voce@empresa.com.br" />
            </FieldGroup>
            <FieldGroup label="WhatsApp">
              <Input value={form.telefone} onChange={(e) => set("telefone", e.target.value)} placeholder="(11) 90000-0000" />
            </FieldGroup>
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-navy-50 p-5 text-sm text-navy-700/80">
            <ShieldCheck size={20} className="mt-0.5 text-forest" />
            <p>
              Seus dados ficam protegidos em servidores brasileiros. Não compartilhamos com seguradoras
              sem sua autorização. Em conformidade com a LGPD e com a governança do grupo MDS.
            </p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="eyebrow">Proposta Affida — válida por 10 dias</p>
              <h1 className="heading-display mt-3 text-display-md text-navy-900">
                Comparativo para <em className="italic text-forest">{form.razaoSocial || product.name}</em>
              </h1>
              <p className="mt-3 text-sm text-navy-700/80">
                {form.vidas} vidas · Capital {multiplier}× · {form.extras.length} coberturas extras
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="dark-outline" size="md">
                <Download size={14} /> Baixar PDF
              </Button>
              <Button variant="primary" size="md">
                <MessageCircle size={14} /> Falar com consultor
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <Badge tone="gold">Melhor custo: {operatorById(cheapest.operatorId)?.name}</Badge>
            <Badge tone="success">Economia potencial {brl(cheapest.valorMensal - packages[0].valorMensal * 0.94)}</Badge>
            <Badge tone="neutral">3 operadoras analisadas · 18 planos avaliados</Badge>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {packages.map((p) => {
              const op = operatorById(p.operatorId);
              const isCheapest = p.operatorId === cheapest.operatorId;
              return (
                <div
                  key={p.operatorId}
                  className={`relative flex flex-col gap-5 rounded-3xl border p-6 ${
                    isCheapest
                      ? "border-forest/40 bg-forest-50/40 shadow-premium"
                      : "border-champagne-200/70 bg-white"
                  }`}
                >
                  {isCheapest && (
                    <span className="absolute -top-2 left-6 inline-flex items-center gap-1 rounded-full bg-forest px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-ivory">
                      <Star size={10} /> Melhor custo
                    </span>
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-champagne-600">
                      {op?.name}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-light text-navy-900">{p.plano}</h3>
                    <p className="mt-1 text-xs text-navy-700/70">{p.destaque}</p>
                  </div>

                  <div className="border-y border-champagne-200/60 py-4">
                    <p className="text-xs uppercase tracking-widest text-navy-700/60">Mensal</p>
                    <p className="mt-1 font-display text-4xl font-light text-navy-900">
                      {brl(p.valorMensal)}
                    </p>
                    <p className="mt-1 text-xs text-navy-700/70">{brl(p.valorPorVida)} por vida</p>
                  </div>

                  <ul className="space-y-2 text-xs text-navy-700/80">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Capital {multiplier}× · {brl(p.capitalBase)} por vida
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Reajuste: {p.reajuste}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Início: {p.carencia}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Rating operadora: {op?.rating}/5
                    </li>
                  </ul>

                  <Button variant={isCheapest ? "primary" : "dark-outline"} size="md" className="mt-auto">
                    Contratar {op?.name.split(" ")[0]}
                    <ArrowRight size={14} />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-5 rounded-3xl border border-navy-900 bg-navy-900 p-8 text-ivory md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow text-champagne-500">Próximo passo</p>
              <h3 className="heading-display mt-3 text-2xl text-ivory">
                Agende uma <em className="italic text-champagne-300">análise consultiva</em> de 30 min.
              </h3>
              <p className="mt-3 text-sm text-ivory/75">
                Um consultor sênior Affida vai apresentar os planos com detalhes, rede referenciada,
                benchmark setorial e opções de estruturação tributária.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Button variant="gold" size="lg">
                <Sparkles size={14} />
                Agendar conversa consultiva
              </Button>
              <Button href={`https://wa.me/5511900000000?text=Cota%C3%A7%C3%A3o+${product.id}`} variant="outline" size="lg">
                <MessageCircle size={14} />
                WhatsApp consultivo
              </Button>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-champagne-200/60 bg-white p-6 text-xs text-navy-700/70">
            <p>
              Esta é uma cotação referencial baseada em tabelas vigentes das operadoras para perfis
              equivalentes. Valores finais podem variar conforme análise de risco, composição etária e
              documentação apresentada. Proposta vinculativa será emitida após subscrição da seguradora.
            </p>
          </div>
        </div>
      )}

      <div className="mt-12 flex items-center justify-between border-t border-champagne-200/60 pt-8">
        <button
          type="button"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="inline-flex items-center gap-2 text-sm text-navy-700/80 hover:text-navy-900 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={14} /> Voltar
        </button>
        {step < totalSteps ? (
          <Button
            variant="primary"
            size="lg"
            onClick={() => setStep(Math.min(totalSteps, step + 1))}
            {...(canAdvance ? {} : { disabled: true })}
          >
            {step === 3 ? "Gerar comparativo" : "Continuar"}
            <ArrowRight size={14} />
          </Button>
        ) : (
          <Link href="/portal" className="inline-flex items-center gap-2 text-sm font-medium text-navy-900 hover:opacity-80">
            Ver no meu portal <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </QuoteShell>
  );
}
