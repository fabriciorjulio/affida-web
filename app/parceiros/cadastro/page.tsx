"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Copy,
  Coins,
  Lock,
  Share2,
  Mail,
  MessageCircle,
  Linkedin,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Input, Select, FieldGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toaster";
import { addLead } from "@/lib/lead-store";

/**
 * Jornada MGM (Member Get Member) — orientação direta do dono:
 *   "A página de quero indicar tem que ser de fato uma jornada de MGM e
 *    não ir para o whatsapp"
 *
 * Fluxo em 3 etapas no mesmo client component:
 *   1) Cadastro do indicador (perfil + dados)
 *   2) Confirmação + emissão de link único de indicação
 *   3) Compartilhamento do link via copiar/WhatsApp/Email/LinkedIn
 *      (canais opcionais — o link funciona sozinho)
 *
 * IMPORTANTE: indicador NÃO vende. Apenas conecta. Toda venda é da
 * equipe Affida (orientação anterior do dono já honrada na /parceiros).
 *
 * Static export: form é client-side puro. Quando o backend FastAPI
 * estiver de pé, basta plugar o submit em uma rota POST /api/indicadores
 * e gerar código real persistido.
 */

const PERFIS = [
  { value: "contador", label: "Contador / Escritório contábil" },
  { value: "consultor_rh", label: "Consultor de RH / Benefícios" },
  { value: "associacao", label: "Associação ou sindicato" },
  { value: "influenciador", label: "Influenciador / Criador B2B" },
  { value: "afiliado", label: "Afiliado digital" },
  { value: "outro", label: "Outro perfil empresarial" },
];

const FAIXAS_CONTATOS = [
  { value: "ate_50", label: "Até 50 empresas" },
  { value: "51_200", label: "51 a 200 empresas" },
  { value: "201_500", label: "201 a 500 empresas" },
  { value: "500_mais", label: "Mais de 500 empresas" },
];

type Step = 1 | 2 | 3;

type FormState = {
  nome: string;
  email: string;
  telefone: string;
  perfil: string;
  empresa: string;
  cnpj: string;
  faixaContatos: string;
  cidade: string;
  uf: string;
  aceiteTermos: boolean;
};

function generateCode(seed: string): string {
  // Geração local (sem backend): hash determinístico do email/timestamp.
  // Quando entrar o backend, o código real virá da API e este placeholder
  // é descartado.
  const base = `${seed}-${Date.now()}`;
  let h = 0;
  for (let i = 0; i < base.length; i++) {
    h = (h << 5) - h + base.charCodeAt(i);
    h |= 0;
  }
  const code = Math.abs(h).toString(36).toUpperCase().padStart(6, "X").slice(0, 6);
  return `IND-${code}`;
}

export default function CadastroIndicadorPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({
    nome: "",
    email: "",
    telefone: "",
    perfil: "",
    empresa: "",
    cnpj: "",
    faixaContatos: "",
    cidade: "",
    uf: "",
    aceiteTermos: false,
  });
  const [code, setCode] = useState<string>("");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  // Link de indicação usa QUERY PARAM (?ref=CODE) em vez de rota dinâmica
  // /i/[code] — porque static export do GitHub Pages exige generateStaticParams
  // pré-conhecidos, e os códigos são gerados dinamicamente no client.
  // Solução: link aponta direto para o wizard de saúde com o ref como query;
  // o wizard captura via useSearchParams e persiste em localStorage para
  // atribuir a indicação quando o backend estiver de pé.
  const linkIndicacao = useMemo(() => {
    if (!code) return "";
    const base =
      typeof window === "undefined"
        ? "https://fabriciorjulio.github.io/affida-web"
        : window.location.origin +
          (process.env.NEXT_PUBLIC_BASE_PATH ?? "");
    return `${base}/cotar/saude-coletiva?ref=${code}`;
  }, [code]);

  const canSubmit =
    form.nome.length > 2 &&
    form.email.includes("@") &&
    form.telefone.length >= 10 &&
    !!form.perfil &&
    form.aceiteTermos;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const c = generateCode(form.email);

    // Persiste o cadastro do indicador como LEAD interno do CRM
    // (origin="indicador"). Quando o backend FastAPI estiver de pé,
    // substituir por POST /api/leads. CRM lê de localStorage hoje.
    try {
      addLead({
        origin: "indicador",
        nome: form.empresa || form.nome,
        cnpj: form.cnpj || undefined,
        contact: {
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
        },
        observacao: `Indicador · ${form.perfil}${form.faixaContatos ? ` · ${form.faixaContatos}` : ""} · código ${c}${form.cidade ? ` · ${form.cidade}/${form.uf}` : ""}`,
      });
    } catch {
      /* placeholder; não bloqueia UX */
    }

    setCode(c);
    setStep(2);
  }

  function copyLink() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      toast("Não foi possível copiar — selecione o link manualmente.", "info");
      return;
    }
    navigator.clipboard.writeText(linkIndicacao);
    toast("Link copiado para a área de transferência.", "success");
  }

  return (
    <main className="bg-ivory">
      <Navbar tone="dark" />

      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.08]" />
        <div className="container-narrow relative z-10 py-16 sm:py-20">
          <Link
            href="/parceiros"
            className="inline-flex items-center gap-2 text-xs text-champagne-300 hover:text-champagne-200"
          >
            <ArrowLeft size={14} /> Voltar para o programa de indicação
          </Link>
          <p className="eyebrow mt-6 text-champagne-500">
            Affida Partners Network · Cadastro
          </p>
          <h1 className="heading-display mt-3 text-display-lg text-ivory text-balance">
            {step === 1 && (
              <>
                Cadastre-se e receba seu{" "}
                <em className="italic text-champagne-300">link único</em>.
              </>
            )}
            {step === 2 && (
              <>
                Tudo pronto, <em className="italic text-champagne-300">{form.nome.split(" ")[0]}</em>.
              </>
            )}
            {step === 3 && (
              <>
                Espalhe seu link e <em className="italic text-champagne-300">comece a indicar</em>.
              </>
            )}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-xs">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`flex h-7 items-center gap-2 rounded-full px-3 ${
                  step >= s
                    ? "bg-champagne-500 text-navy-900"
                    : "bg-navy-700/40 text-ivory/60"
                }`}
              >
                <span className="font-display text-xs">{s}</span>
                {s === 1 && "Cadastro"}
                {s === 2 && "Confirmação"}
                {s === 3 && "Compartilhar"}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container-narrow py-12 sm:py-16">
        {/* ───────────────────── ETAPA 1 — CADASTRO ───────────────────── */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="rounded-3xl border border-champagne-200/60 bg-white p-8">
              <p className="eyebrow">Sobre você</p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <FieldGroup label="Nome completo">
                  <Input
                    required
                    value={form.nome}
                    onChange={(e) => set("nome", e.target.value)}
                    placeholder="Seu nome"
                  />
                </FieldGroup>
                <FieldGroup label="E-mail">
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="voce@empresa.com.br"
                  />
                </FieldGroup>
                <FieldGroup label="WhatsApp">
                  <Input
                    required
                    value={form.telefone}
                    onChange={(e) => set("telefone", e.target.value)}
                    placeholder="(11) 90000-0000"
                  />
                </FieldGroup>
                <FieldGroup label="Perfil de indicador">
                  <Select
                    required
                    value={form.perfil}
                    onChange={(e) => set("perfil", e.target.value)}
                  >
                    <option value="">Selecione o perfil</option>
                    {PERFIS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </Select>
                </FieldGroup>
              </div>
            </div>

            <div className="rounded-3xl border border-champagne-200/60 bg-white p-8">
              <p className="eyebrow">Sua empresa (opcional)</p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <FieldGroup label="Nome da empresa / escritório">
                  <Input
                    value={form.empresa}
                    onChange={(e) => set("empresa", e.target.value)}
                    placeholder="Ex. Contábil ABC"
                  />
                </FieldGroup>
                <FieldGroup label="CNPJ">
                  <Input
                    value={form.cnpj}
                    onChange={(e) => set("cnpj", e.target.value)}
                    placeholder="00.000.000/0000-00"
                  />
                </FieldGroup>
                <FieldGroup label="Cidade">
                  <Input
                    value={form.cidade}
                    onChange={(e) => set("cidade", e.target.value)}
                    placeholder="São Paulo"
                  />
                </FieldGroup>
                <FieldGroup label="UF">
                  <Input
                    value={form.uf}
                    onChange={(e) => set("uf", e.target.value.toUpperCase().slice(0, 2))}
                    placeholder="SP"
                    maxLength={2}
                  />
                </FieldGroup>
                <FieldGroup label="Quantos clientes empresariais você atende?">
                  <Select
                    value={form.faixaContatos}
                    onChange={(e) => set("faixaContatos", e.target.value)}
                  >
                    <option value="">Estimativa</option>
                    {FAIXAS_CONTATOS.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </Select>
                </FieldGroup>
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-champagne-200/60 bg-champagne-50/40 p-5 text-sm text-navy-800">
              <input
                type="checkbox"
                checked={form.aceiteTermos}
                onChange={(e) => set("aceiteTermos", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-navy-900"
              />
              <span>
                Li e aceito o{" "}
                <Link href="/legal/termos" className="underline" target="_blank">
                  Termo de Indicação Affida
                </Link>
                . Entendo que <strong>indicador não vende</strong> — apenas conecta o
                lead, e a venda é conduzida pela equipe Affida. A comissão de
                indicação segue a curva 30% (ano 1) → 15% (ano 2) → 10% (ano 3+),
                paga mensalmente enquanto a apólice indicada estiver ativa.
              </span>
            </label>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-navy-700/60">
                Em até 24h úteis você recebe um e-mail de confirmação do time
                Affida. Mas seu link já funciona desde agora.
              </p>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                {...(canSubmit ? {} : { disabled: true })}
              >
                Gerar meu link de indicação <ArrowRight size={14} />
              </Button>
            </div>
          </form>
        )}

        {/* ──────────────── ETAPA 2 — CONFIRMAÇÃO ──────────────── */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="flex items-start gap-4 rounded-3xl border border-forest/30 bg-forest-50/40 p-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-ivory">
                <CheckCircle2 size={20} strokeWidth={1.6} />
              </span>
              <div>
                <p className="eyebrow text-forest">Cadastro concluído</p>
                <p className="mt-2 font-display text-2xl font-light text-navy-900">
                  Seu código de indicação:{" "}
                  <span className="font-medium text-forest">{code}</span>
                </p>
                <p className="mt-2 text-sm text-navy-700/80">
                  Toda empresa que entrar pelo seu link de indicação aparece no
                  seu painel. Quando vira apólice, sua comissão começa a contar
                  no próximo dia 15.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-champagne-200/60 bg-white p-8">
              <div className="flex items-center gap-2">
                <Coins size={16} className="text-champagne-700" />
                <p className="eyebrow text-champagne-700">Curva de comissão</p>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {[
                  { ano: "Ano 1", pct: "30%", note: "Pico inicial" },
                  { ano: "Ano 2", pct: "15%", note: "Continua mensal" },
                  { ano: "Ano 3+", pct: "10%", note: "Enquanto a apólice ativa" },
                ].map((c) => (
                  <div
                    key={c.ano}
                    className="rounded-2xl border border-champagne-200/60 bg-champagne-50/30 p-5"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-champagne-700">
                      {c.ano}
                    </p>
                    <p className="mt-2 font-display text-3xl font-light text-navy-900">
                      {c.pct}
                    </p>
                    <p className="mt-1 text-xs text-navy-700/65">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" size="md" onClick={() => setStep(1)}>
                <ArrowLeft size={14} /> Editar dados
              </Button>
              <Button variant="primary" size="lg" onClick={() => setStep(3)}>
                Compartilhar meu link <Share2 size={14} />
              </Button>
            </div>
          </div>
        )}

        {/* ──────────────── ETAPA 3 — COMPARTILHAR ──────────────── */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-navy-900 bg-navy-900 p-8 text-ivory">
              <p className="eyebrow text-champagne-500">Seu link de indicação</p>
              <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-champagne-500/20 bg-navy-800/60 p-4 sm:flex-row sm:items-center">
                <code className="flex-1 break-all font-mono text-sm text-ivory">
                  {linkIndicacao}
                </code>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne-500 px-4 py-2 text-xs font-medium text-navy-900 hover:shadow-gold"
                >
                  <Copy size={13} /> Copiar
                </button>
              </div>
              <p className="mt-3 text-xs text-ivory/60">
                Quem entrar por este link cota saúde com sua marca de
                indicação. Você não atende, não cota, não responde
                regulatoriamente — closer Affida assume.
              </p>
            </div>

            <div className="rounded-3xl border border-champagne-200/60 bg-white p-8">
              <p className="eyebrow">Compartilhar agora</p>
              <p className="mt-2 text-sm text-navy-700/75">
                Os botões abaixo abrem o aplicativo correspondente já com a
                mensagem padrão e seu link incorporado.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Indico a Affida pra cotar plano de saúde empresarial — corretora SUSEP, código aberto nas grandes operadoras. Cota online em 3 min: ${linkIndicacao}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-600 px-5 py-3 text-sm font-medium text-ivory hover:bg-forest-700"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    "Indicação Affida — plano de saúde empresarial"
                  )}&body=${encodeURIComponent(
                    `Estou indicando a Affida pra cotar plano de saúde da empresa.\n\nCorretora SUSEP autônoma, código aberto nas grandes operadoras (Amil, Bradesco Saúde, SulAmérica, Unimed).\n\nCota em 3 minutos pelo link: ${linkIndicacao}`
                  )}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-100 bg-white px-5 py-3 text-sm font-medium text-navy-900 hover:bg-navy-50"
                >
                  <Mail size={14} /> E-mail
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    linkIndicacao
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-5 py-3 text-sm font-medium text-ivory hover:opacity-90"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-champagne-200/60 bg-sand/30 p-8 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <Lock size={18} className="mt-0.5 shrink-0 text-navy-900" />
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    Você não atende o cliente
                  </p>
                  <p className="mt-1 text-xs text-navy-700/70">
                    Closer Affida conduz toda a venda.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles size={18} className="mt-0.5 shrink-0 text-navy-900" />
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    Acompanhe em tempo real
                  </p>
                  <p className="mt-1 text-xs text-navy-700/70">
                    Painel próprio em breve · enviado por e-mail.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Coins size={18} className="mt-0.5 shrink-0 text-navy-900" />
                <div>
                  <p className="text-sm font-medium text-navy-900">
                    Comissão mensal
                  </p>
                  <p className="mt-1 text-xs text-navy-700/70">
                    Pagamento dia 15, enquanto apólice ativa.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button variant="ghost" size="md" onClick={() => setStep(2)}>
                <ArrowLeft size={14} /> Voltar
              </Button>
              <Link
                href="/parceiros"
                className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 bg-transparent px-6 py-3 text-sm font-normal tracking-[0.08em] uppercase text-navy-900 transition-all hover:border-navy-900/35 hover:bg-navy-900/5"
              >
                Ver programa completo
              </Link>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
