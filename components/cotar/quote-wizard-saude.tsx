"use client";

import { useMemo, useRef, useState } from "react";
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
  Plus,
  Trash2,
  HeartPulse,
  TrendingDown,
  Upload,
  FileSpreadsheet,
  AlertTriangle,
  X,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { Input, Select, FieldGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { openWhatsapp } from "@/components/ui/action-button";
import { toast } from "@/components/ui/toaster";
import { brl, cnpjMask } from "@/lib/utils";
import { PORTES } from "@/lib/portes";
import { QuoteShell } from "./quote-shell";
import {
  parseBeneficiarios,
  CSV_TEMPLATE,
  type ImportedRow,
} from "@/lib/beneficiario-import";

/**
 * Wizard de cotação de PLANO DE SAÚDE EMPRESARIAL.
 *
 * Diferente do wizard de vida (capital segurado, IPA/IPD), saúde tem como
 * variável de preço PRINCIPAL a faixa etária ANS de cada beneficiário.
 *
 * Fluxo (4 passos):
 *   1. Empresa + situação atual (operadora vigente, plano, mensalidade — usados
 *      para mostrar economia/migração).
 *   2. Beneficiários (titular + dependentes): data nascimento, sexo, parentesco.
 *      Cada beneficiário é mapeado para uma das 10 faixas etárias da ANS, que
 *      multiplica a mensalidade base do plano.
 *   3. Contato.
 *   4. Comparativo de operadoras + simulação de economia x plano atual.
 */

type Parentesco = "titular" | "conjuge" | "filho" | "dependente";
type Sexo = "F" | "M";

type Beneficiario = {
  id: string;
  nome: string;
  dataNascimento: string; // YYYY-MM-DD
  sexo: Sexo | "";
  parentesco: Parentesco;
};

type FormState = {
  // Empresa
  cnpj: string;
  razaoSocial: string;
  porte: string;
  cnae: string;
  // Situação atual (todos opcionais — pode estar comprando primeiro plano)
  operadoraAtual: string;
  planoAtual: string;
  valorAtual: string; // string para permitir digitação livre
  // Beneficiários
  beneficiarios: Beneficiario[];
  // Contato
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
};

// ----- ANS: 10 faixas etárias regulamentadas (RN 63 / RN 309 / Lei 9.656) -----
//
// Multiplicador médio observado em PME (taxa por faixa relativa à faixa 0-18).
// Tabela mock — não é tabela oficial de operadora, apenas referencial.
const FAIXAS_ANS = [
  { label: "0-18 anos", min: 0, max: 18, mult: 1.0 },
  { label: "19-23 anos", min: 19, max: 23, mult: 1.21 },
  { label: "24-28 anos", min: 24, max: 28, mult: 1.46 },
  { label: "29-33 anos", min: 29, max: 33, mult: 1.75 },
  { label: "34-38 anos", min: 34, max: 38, mult: 2.07 },
  { label: "39-43 anos", min: 39, max: 43, mult: 2.43 },
  { label: "44-48 anos", min: 44, max: 48, mult: 2.86 },
  { label: "49-53 anos", min: 49, max: 53, mult: 3.36 },
  { label: "54-58 anos", min: 54, max: 58, mult: 3.93 },
  { label: "59+ anos", min: 59, max: 200, mult: 4.62 },
] as const;

function calcAge(dob: string): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age -= 1;
  return age;
}

function faixaFor(age: number) {
  return FAIXAS_ANS.find((f) => age >= f.min && age <= f.max) ?? FAIXAS_ANS[0];
}

// ----- Operadoras-piloto + tabela base por modalidade --------------------------
//
// Cada plano tem uma "mensalidade base" para a faixa 0-18, e um perfil de rede
// (tipo de acomodação, coparticipação, abrangência). O preço final é
// `base * fator_faixa * (1 - desconto_porte) * (coparticipação ajusta)`.
type PlanoSaude = {
  operatorId: string;
  operatorNome: string;
  plano: string;
  acomodacao: "Enfermaria" | "Apartamento";
  abrangencia: "Estadual" | "Nacional";
  coparticipacao: "Sem copart." | "Copart. 30%";
  base: number; // R$/mês para faixa 0-18
  reajusteMedio: string;
  carencia: string;
  destaque: string;
  rating: number;
};

const PLANOS_SAUDE: PlanoSaude[] = [
  {
    operatorId: "bradesco-saude",
    operatorNome: "Bradesco Saúde",
    plano: "Top Nacional Flex Empresarial",
    acomodacao: "Apartamento",
    abrangencia: "Nacional",
    coparticipacao: "Copart. 30%",
    base: 285,
    reajusteMedio: "ANS + 8%",
    carencia: "30 dias para consulta · 180 dias para internação",
    destaque: "Rede premium nacional · Reembolso ambulatorial",
    rating: 4.7,
  },
  {
    operatorId: "amil",
    operatorNome: "Amil",
    plano: "Amil 400 PME Nacional",
    acomodacao: "Enfermaria",
    abrangencia: "Nacional",
    coparticipacao: "Sem copart.",
    base: 240,
    reajusteMedio: "ANS + 6%",
    carencia: "Consulta imediata · 180 dias para internação",
    destaque: "Rede ampla SP/RJ · Sem coparticipação",
    rating: 4.4,
  },
  {
    operatorId: "sulamerica",
    operatorNome: "SulAmérica",
    plano: "Prestige Empresarial",
    acomodacao: "Apartamento",
    abrangencia: "Nacional",
    coparticipacao: "Copart. 30%",
    base: 305,
    reajusteMedio: "ANS + 9%",
    carencia: "24h consulta · 180 dias internação",
    destaque: "Telemedicina ilimitada · Wellness inclusos",
    rating: 4.6,
  },
];

function calcMensalPlano(beneficiarios: Beneficiario[], plano: PlanoSaude): number {
  const total = beneficiarios.reduce((acc, b) => {
    const age = calcAge(b.dataNascimento);
    if (age == null) return acc;
    const f = faixaFor(age);
    return acc + plano.base * f.mult;
  }, 0);
  return Math.round(total * 100) / 100;
}

// -----------------------------------------------------------------------------
// Componente principal
// -----------------------------------------------------------------------------
export function QuoteWizardSaude({ product }: { product: Product }) {
  const totalSteps = 4;
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<FormState>({
    cnpj: "",
    razaoSocial: "",
    porte: "",
    cnae: "",
    operadoraAtual: "",
    planoAtual: "",
    valorAtual: "",
    beneficiarios: [
      {
        id: crypto.randomUUID(),
        nome: "",
        dataNascimento: "",
        sexo: "",
        parentesco: "titular",
      },
    ],
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
  });

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function updateBeneficiario(id: string, patch: Partial<Beneficiario>) {
    setForm((p) => ({
      ...p,
      beneficiarios: p.beneficiarios.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  }

  function addBeneficiario(parentesco: Parentesco = "dependente") {
    setForm((p) => ({
      ...p,
      beneficiarios: [
        ...p.beneficiarios,
        {
          id: crypto.randomUUID(),
          nome: "",
          dataNascimento: "",
          sexo: "",
          parentesco,
        },
      ],
    }));
  }

  function removeBeneficiario(id: string) {
    setForm((p) => ({
      ...p,
      beneficiarios:
        p.beneficiarios.length === 1
          ? p.beneficiarios
          : p.beneficiarios.filter((b) => b.id !== id),
    }));
  }

  // ---------- Upload em massa (Excel/CSV/TSV/TXT) ----------
  // Para empresas maiores (50+ vidas) preencher 1-a-1 é inviável. O painel de
  // import abaixo aceita CSV (vírgula ou ponto-vírgula), TSV (paste direto do
  // Excel via clipboard) e arquivo .csv/.txt. .xlsx puro: orientamos a usuária
  // a exportar como CSV ou simplesmente colar a seleção do Excel — o paste do
  // Excel já vem em TSV pronto, sem precisar de SheetJS no bundle.
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const importFileRef = useRef<HTMLInputElement>(null);

  const importPreview = useMemo(
    () => (importText.trim() ? parseBeneficiarios(importText) : null),
    [importText]
  );

  async function handleImportFile(file: File) {
    const text = await file.text();
    setImportText(text);
  }

  function applyImport(rows: ImportedRow[]) {
    if (!rows.length) return;
    setForm((p) => {
      // Substitui o titular vazio inicial se ele ainda não tem dados.
      const startsEmpty =
        p.beneficiarios.length === 1 &&
        !p.beneficiarios[0].dataNascimento &&
        !p.beneficiarios[0].sexo &&
        !p.beneficiarios[0].nome;

      const novos = rows.map((r) => ({
        id: crypto.randomUUID(),
        nome: r.nome ?? "",
        dataNascimento: r.dataNascimento!,
        sexo: r.sexo!,
        parentesco: r.parentesco!,
      }));

      // Se nenhum import veio com parentesco "titular", promove o primeiro.
      if (!novos.some((b) => b.parentesco === "titular") && novos[0]) {
        novos[0].parentesco = "titular";
      }

      return {
        ...p,
        beneficiarios: startsEmpty ? novos : [...p.beneficiarios, ...novos],
      };
    });
    setImportOpen(false);
    setImportText("");
    if (importFileRef.current) importFileRef.current.value = "";
    toast(`${rows.length} vida(s) importada(s) da planilha.`, "success");
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "affida-beneficiarios-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---------- Cálculos derivados ----------
  const beneficiariosValidos = form.beneficiarios.filter(
    (b) => b.dataNascimento && b.sexo && b.parentesco
  );
  const totalVidas = beneficiariosValidos.length;
  const idadeMedia = useMemo(() => {
    if (!beneficiariosValidos.length) return 0;
    const soma = beneficiariosValidos.reduce(
      (acc, b) => acc + (calcAge(b.dataNascimento) ?? 0),
      0
    );
    return Math.round(soma / beneficiariosValidos.length);
  }, [beneficiariosValidos]);

  const cotacoes = useMemo(
    () =>
      PLANOS_SAUDE.map((p) => ({
        plano: p,
        mensal: calcMensalPlano(beneficiariosValidos, p),
      })).sort((a, b) => a.mensal - b.mensal),
    [beneficiariosValidos]
  );
  const cheapest = cotacoes[0];

  const valorAtualNum = parseFloat(form.valorAtual.replace(/[^\d.,]/g, "").replace(",", "."));
  const economiaPotencial =
    !Number.isNaN(valorAtualNum) && valorAtualNum > 0 && cheapest
      ? Math.max(0, valorAtualNum - cheapest.mensal)
      : 0;

  // ---------- Validação por etapa ----------
  const canAdvance =
    (step === 1 && form.cnpj.length >= 14 && form.razaoSocial.length > 2) ||
    (step === 2 &&
      form.beneficiarios.length >= 1 &&
      form.beneficiarios.every((b) => b.dataNascimento && b.sexo && b.parentesco) &&
      form.beneficiarios.some((b) => b.parentesco === "titular")) ||
    (step === 3 && !!form.nome && !!form.email && !!form.telefone) ||
    step === 4;

  // ---------- Render ----------
  return (
    <QuoteShell productName={product.name} currentStep={step} totalSteps={totalSteps}>
      {step === 1 && (
        <div className="animate-fade-up">
          <div className="max-w-2xl">
            <p className="eyebrow">Passo 1 · Empresa & situação atual</p>
            <h1 className="heading-display mt-3 text-display-md text-navy-900">
              Comece pelo <em className="italic text-forest">CNPJ</em>.
            </h1>
            <p className="mt-4 text-base text-navy-700/80">
              Em 60 segundos montamos cotação nas principais operadoras. Se você já tem plano
              vigente, conta pra gente — comparamos e mostramos quanto pode economizar na
              migração.
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
            {/* Driver comercial = nº de funcionários (=vidas potenciais).
                Classe legal SEBRAE como apoio textual à direita. */}
            <FieldGroup label="Tamanho da empresa (funcionários)">
              <Select value={form.porte} onChange={(e) => set("porte", e.target.value)}>
                <option value="">Selecione a faixa de funcionários</option>
                {PORTES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label} · {p.classe}
                  </option>
                ))}
              </Select>
            </FieldGroup>
            <FieldGroup label="CNAE principal">
              <Input
                value={form.cnae}
                onChange={(e) => set("cnae", e.target.value)}
                placeholder="Ex. 6202-3/00"
              />
            </FieldGroup>
          </div>

          <div className="mt-8">
            <p className="eyebrow text-champagne-700">Situação atual (opcional)</p>
            <p className="mt-2 max-w-xl text-sm text-navy-700/70">
              Se você já tem plano de saúde, informe abaixo. Usamos para mostrar economia real
              na proposta — se não tem, pode pular este bloco.
            </p>
            <div className="mt-5 grid gap-6 rounded-3xl border border-champagne-200/60 bg-champagne-50/40 p-8 md:grid-cols-3">
              <FieldGroup label="Operadora atual">
                <Select
                  value={form.operadoraAtual}
                  onChange={(e) => set("operadoraAtual", e.target.value)}
                >
                  <option value="">Sem plano hoje</option>
                  <option>Amil</option>
                  <option>Bradesco Saúde</option>
                  <option>SulAmérica</option>
                  <option>Porto Saúde</option>
                  <option>Unimed</option>
                  <option>Hapvida / NotreDame</option>
                  <option>NotreDame Intermédica</option>
                  <option>Outra</option>
                </Select>
              </FieldGroup>
              <FieldGroup label="Plano atual">
                <Input
                  value={form.planoAtual}
                  onChange={(e) => set("planoAtual", e.target.value)}
                  placeholder="Ex. Amil 400 Nacional"
                />
              </FieldGroup>
              <FieldGroup label="Valor mensal atual (R$)">
                <Input
                  inputMode="decimal"
                  value={form.valorAtual}
                  onChange={(e) => set("valorAtual", e.target.value)}
                  placeholder="Ex. 8.450,00"
                />
              </FieldGroup>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-fade-up">
          <div className="max-w-2xl">
            <p className="eyebrow">Passo 2 · Beneficiários</p>
            <h1 className="heading-display mt-3 text-display-md text-navy-900">
              Quem entra no <em className="italic text-forest">plano</em>?
            </h1>
            <p className="mt-4 text-base text-navy-700/80">
              O preço de saúde é definido pelas <strong>10 faixas etárias da ANS</strong>. Por
              isso precisamos da data de nascimento de cada vida — titulares, cônjuges,
              filhos e demais dependentes elegíveis.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {form.beneficiarios.map((b, i) => {
              const age = calcAge(b.dataNascimento);
              const f = age != null ? faixaFor(age) : null;
              return (
                <div
                  key={b.id}
                  className="rounded-3xl border border-champagne-200/70 bg-white p-6"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory">
                        <HeartPulse size={15} strokeWidth={1.6} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-navy-900">
                          Vida {String(i + 1).padStart(2, "0")}
                          {b.parentesco === "titular" && (
                            <Badge tone="gold" className="ml-2">
                              Titular
                            </Badge>
                          )}
                        </p>
                        {f && (
                          <p className="mt-0.5 text-xs text-navy-700/60">
                            {age} anos · faixa ANS {f.label}
                          </p>
                        )}
                      </div>
                    </div>
                    {form.beneficiarios.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBeneficiario(b.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-navy-700/50 hover:bg-navy-50 hover:text-navy-900"
                        aria-label="Remover vida"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    <FieldGroup label="Nome (opcional)">
                      <Input
                        value={b.nome}
                        onChange={(e) => updateBeneficiario(b.id, { nome: e.target.value })}
                        placeholder="Nome completo"
                      />
                    </FieldGroup>
                    <FieldGroup label="Data de nascimento">
                      <Input
                        type="date"
                        value={b.dataNascimento}
                        onChange={(e) =>
                          updateBeneficiario(b.id, { dataNascimento: e.target.value })
                        }
                        max={new Date().toISOString().slice(0, 10)}
                      />
                    </FieldGroup>
                    <FieldGroup label="Sexo">
                      <Select
                        value={b.sexo}
                        onChange={(e) =>
                          updateBeneficiario(b.id, { sexo: e.target.value as Sexo | "" })
                        }
                      >
                        <option value="">Selecione</option>
                        <option value="F">Feminino</option>
                        <option value="M">Masculino</option>
                      </Select>
                    </FieldGroup>
                    <FieldGroup label="Parentesco">
                      <Select
                        value={b.parentesco}
                        onChange={(e) =>
                          updateBeneficiario(b.id, {
                            parentesco: e.target.value as Parentesco,
                          })
                        }
                      >
                        <option value="titular">Titular</option>
                        <option value="conjuge">Cônjuge / companheiro(a)</option>
                        <option value="filho">Filho(a)</option>
                        <option value="dependente">Outro dependente</option>
                      </Select>
                    </FieldGroup>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="dark-outline" size="md" onClick={() => addBeneficiario("dependente")}>
                <Plus size={14} /> Adicionar vida
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => setImportOpen((v) => !v)}
              >
                <FileSpreadsheet size={14} />
                {importOpen ? "Fechar importação" : "Importar planilha (CSV/Excel)"}
              </Button>
              <span className="text-xs text-navy-700/60">
                {totalVidas} vida(s) adicionada(s) · idade média {idadeMedia || "—"} anos
              </span>
            </div>

            {/* ----- Painel de upload em massa ----- */}
            {importOpen && (
              <div className="mt-6 rounded-3xl border border-navy-900/15 bg-navy-50/40 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-light text-navy-900">
                      Importar beneficiários em massa
                    </p>
                    <p className="mt-1 max-w-xl text-xs text-navy-700/70">
                      Para empresas com muitas vidas, importe direto da sua planilha em vez
                      de digitar uma por uma. Aceita CSV (vírgula ou ponto-e-vírgula), arquivo
                      de texto, ou paste direto do Excel/Google Sheets (basta selecionar as
                      células com Ctrl+C e colar abaixo).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setImportOpen(false)}
                    aria-label="Fechar"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-navy-700/50 hover:bg-white hover:text-navy-900"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
                  <input
                    ref={importFileRef}
                    type="file"
                    accept=".csv,.txt,.tsv,text/csv,text/plain,text/tab-separated-values"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImportFile(f);
                    }}
                    className="block w-full text-xs text-navy-700 file:mr-4 file:rounded-full file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-xs file:font-medium file:text-ivory hover:file:bg-navy-700"
                  />
                  <Button variant="ghost" size="sm" onClick={downloadTemplate}>
                    <Download size={13} /> Baixar template
                  </Button>
                  <span className="text-[10px] uppercase tracking-widest text-navy-700/50 self-center">
                    ou cole abaixo
                  </span>
                </div>

                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder={`Cole aqui o conteúdo da planilha (Ctrl+V do Excel funciona).\n\nExemplo:\nnome,data_nascimento,sexo,parentesco\nMaria Silva,15/03/1985,F,titular\nJoão Silva,22/06/1987,M,conjuge\nPedro Silva,10/01/2015,M,filho`}
                  className="mt-4 h-44 w-full rounded-2xl border border-navy-100 bg-white p-4 font-mono text-xs text-navy-900 placeholder:text-navy-400 focus:border-navy-400 focus:outline-none focus:ring-4 focus:ring-navy-900/5"
                />

                {/* ----- Preview do parse ----- */}
                {importPreview && importPreview.totalRows > 0 && (
                  <div className="mt-5 rounded-2xl border border-champagne-200/60 bg-white p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge tone="success">
                        {importPreview.validRows.length} válida(s)
                      </Badge>
                      {importPreview.totalRows -
                        importPreview.validRows.length >
                        0 && (
                        <Badge tone="warning">
                          {importPreview.totalRows -
                            importPreview.validRows.length}{" "}
                          com erro
                        </Badge>
                      )}
                      <Badge tone="neutral">
                        Separador detectado:{" "}
                        {importPreview.delimiter === "\t"
                          ? "TAB (Excel)"
                          : importPreview.delimiter === ";"
                          ? "; (CSV BR)"
                          : ", (CSV)"}
                      </Badge>
                    </div>

                    <div className="mt-4 max-h-64 overflow-auto rounded-xl border border-champagne-200/60">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-navy-50 text-[10px] uppercase tracking-widest text-navy-700/70">
                          <tr>
                            <th className="px-3 py-2">Linha</th>
                            <th className="px-3 py-2">Nome</th>
                            <th className="px-3 py-2">Nascimento</th>
                            <th className="px-3 py-2">Sexo</th>
                            <th className="px-3 py-2">Parentesco</th>
                            <th className="px-3 py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-champagne-200/40">
                          {importPreview.rows.slice(0, 50).map((r) => (
                            <tr
                              key={r.rowIndex}
                              className={
                                r.errors.length > 0
                                  ? "bg-champagne-50/40"
                                  : ""
                              }
                            >
                              <td className="px-3 py-2 font-mono text-[10px] text-navy-700/60">
                                {r.rowIndex}
                              </td>
                              <td className="px-3 py-2 text-navy-900">
                                {r.nome || "—"}
                              </td>
                              <td className="px-3 py-2 text-navy-900">
                                {r.dataNascimento || "—"}
                              </td>
                              <td className="px-3 py-2 text-navy-900">
                                {r.sexo || "—"}
                              </td>
                              <td className="px-3 py-2 text-navy-900">
                                {r.parentesco || "—"}
                              </td>
                              <td className="px-3 py-2">
                                {r.errors.length === 0 ? (
                                  <span className="inline-flex items-center gap-1 text-forest">
                                    <Check size={12} /> ok
                                  </span>
                                ) : (
                                  <span
                                    className="inline-flex items-center gap-1 text-champagne-800"
                                    title={r.errors.join(" · ")}
                                  >
                                    <AlertTriangle size={12} />{" "}
                                    {r.errors[0]}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {importPreview.rows.length > 50 && (
                        <p className="border-t border-champagne-200/40 px-3 py-2 text-[10px] text-navy-700/60">
                          Mostrando 50 de {importPreview.rows.length} linhas. Todas serão
                          importadas (apenas as válidas, sem erro).
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => applyImport(importPreview.validRows)}
                        {...(importPreview.validRows.length === 0
                          ? { disabled: true }
                          : {})}
                      >
                        <Upload size={14} /> Importar{" "}
                        {importPreview.validRows.length} vida(s)
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setImportText("");
                          if (importFileRef.current)
                            importFileRef.current.value = "";
                        }}
                      >
                        Limpar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-champagne-50/60 p-5 text-sm text-navy-700/80">
            <ShieldCheck size={20} className="mt-0.5 text-forest" />
            <p>
              A regulação ANS (RN 309/2012) define 10 faixas etárias para precificação. Cada
              faixa tem um multiplicador sobre a mensalidade base do plano. Exibimos a faixa
              correspondente assim que você informa a data de nascimento.
            </p>
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
              Seu consultor Affida dedicado vai apresentar as opções via WhatsApp ou e-mail em
              até 30 minutos em horário comercial.
            </p>
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl border border-champagne-200/60 bg-white p-8 md:grid-cols-2">
            <FieldGroup label="Seu nome">
              <Input
                value={form.nome}
                onChange={(e) => set("nome", e.target.value)}
                placeholder="Nome completo"
              />
            </FieldGroup>
            <FieldGroup label="Cargo">
              <Input
                value={form.cargo}
                onChange={(e) => set("cargo", e.target.value)}
                placeholder="Ex. Head of People"
              />
            </FieldGroup>
            <FieldGroup label="E-mail corporativo">
              <Input
                value={form.email}
                type="email"
                onChange={(e) => set("email", e.target.value)}
                placeholder="voce@empresa.com.br"
              />
            </FieldGroup>
            <FieldGroup label="WhatsApp">
              <Input
                value={form.telefone}
                onChange={(e) => set("telefone", e.target.value)}
                placeholder="(11) 90000-0000"
              />
            </FieldGroup>
          </div>

          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-navy-50 p-5 text-sm text-navy-700/80">
            <ShieldCheck size={20} className="mt-0.5 text-forest" />
            <p>
              Seus dados ficam protegidos em servidores brasileiros. Não compartilhamos com
              operadoras sem sua autorização. Em conformidade com a LGPD e com a regulação
              SUSEP/ANS.
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
                Comparativo para{" "}
                <em className="italic text-forest">{form.razaoSocial || product.name}</em>
              </h1>
              <p className="mt-3 text-sm text-navy-700/80">
                {totalVidas} vida(s) · idade média {idadeMedia} anos
                {form.operadoraAtual && (
                  <>
                    {" "}
                    · plano atual: {form.operadoraAtual}
                    {form.planoAtual ? ` ${form.planoAtual}` : ""}
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="dark-outline"
                size="md"
                onClick={() =>
                  toast(
                    `Proposta ${product.name} gerada em PDF — enviada ao seu e-mail e WhatsApp.`,
                    "success"
                  )
                }
              >
                <Download size={14} /> Baixar PDF
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() =>
                  openWhatsapp(
                    `Olá Affida, quero falar com um consultor sobre a cotação de ${product.name} para ${form.razaoSocial || "minha empresa"} (${totalVidas} vidas).`
                  )
                }
              >
                <MessageCircle size={14} /> Falar com consultor
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <Badge tone="gold">
              Melhor custo: {cheapest?.plano.operatorNome}
            </Badge>
            {economiaPotencial > 0 && (
              <Badge tone="success">
                Economia mensal vs. plano atual: {brl(economiaPotencial)}
              </Badge>
            )}
            <Badge tone="neutral">
              {PLANOS_SAUDE.length} operadoras analisadas · faixas ANS aplicadas
            </Badge>
          </div>

          {economiaPotencial > 0 && (
            <div className="mt-6 flex items-center gap-4 rounded-3xl border border-forest/30 bg-forest-50/50 p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-ivory">
                <TrendingDown size={20} strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-forest">
                  Economia potencial
                </p>
                <p className="mt-1 font-display text-2xl font-light text-navy-900">
                  Até {brl(economiaPotencial * 12)}/ano
                </p>
                <p className="mt-1 text-xs text-navy-700/70">
                  Comparado a {brl(valorAtualNum)}/mês na operadora atual
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {cotacoes.map((c) => {
              const isCheapest = c.plano.operatorId === cheapest?.plano.operatorId;
              return (
                <div
                  key={c.plano.operatorId}
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
                      {c.plano.operatorNome}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-light text-navy-900">
                      {c.plano.plano}
                    </h3>
                    <p className="mt-1 text-xs text-navy-700/70">{c.plano.destaque}</p>
                  </div>

                  <div className="border-y border-champagne-200/60 py-4">
                    <p className="text-xs uppercase tracking-widest text-navy-700/60">Mensal</p>
                    <p className="mt-1 font-display text-4xl font-light text-navy-900">
                      {brl(c.mensal)}
                    </p>
                    <p className="mt-1 text-xs text-navy-700/70">
                      {totalVidas > 0
                        ? `${brl(Math.round((c.mensal / totalVidas) * 100) / 100)} por vida (média)`
                        : "—"}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-navy-700/80">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Acomodação: {c.plano.acomodacao}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Abrangência {c.plano.abrangencia}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      {c.plano.coparticipacao}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Carência: {c.plano.carencia}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Reajuste: {c.plano.reajusteMedio}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-forest" />
                      Rating operadora: {c.plano.rating}/5
                    </li>
                  </ul>

                  <Button
                    variant={isCheapest ? "primary" : "dark-outline"}
                    size="md"
                    className="mt-auto"
                    onClick={() =>
                      openWhatsapp(
                        `Olá Affida, quero contratar o plano ${c.plano.plano} (${c.plano.operatorNome}) — ${brl(c.mensal)}/mês — para ${form.razaoSocial || "minha empresa"} (${totalVidas} vidas).`
                      )
                    }
                  >
                    Contratar {c.plano.operatorNome.split(" ")[0]}
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
                Agende uma <em className="italic text-champagne-300">análise consultiva</em> de
                30 min.
              </h3>
              <p className="mt-3 text-sm text-ivory/75">
                Um consultor sênior Affida apresenta os planos com detalhes de rede credenciada,
                regras de coparticipação, carência e estruturação fiscal — comparando direto com
                o seu plano atual.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <Button
                variant="gold"
                size="lg"
                onClick={() =>
                  openWhatsapp(
                    `Olá Affida, quero agendar uma análise consultiva de 30 min sobre a cotação de saúde (${totalVidas} vidas, ${form.razaoSocial || "minha empresa"}).`
                  )
                }
              >
                <Sparkles size={14} />
                Agendar conversa consultiva
              </Button>
              <Button
                href={`https://wa.me/5511900000000?text=${encodeURIComponent(
                  `Olá Affida, vim da cotação de saúde e quero falar no WhatsApp.`
                )}`}
                variant="outline"
                size="lg"
                target="_blank"
              >
                <MessageCircle size={14} />
                WhatsApp consultivo
              </Button>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-champagne-200/60 bg-white p-6 text-xs text-navy-700/70">
            <p>
              Cotação referencial baseada em tabelas vigentes das operadoras parceiras Affida e
              em multiplicadores de faixa etária ANS (RN 63/RN 309). Valores finais podem variar
              conforme análise de risco, declaração de saúde, composição etária real e
              documentação apresentada. Proposta vinculativa será emitida após subscrição da
              operadora.
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
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy-900 hover:opacity-80"
          >
            Ver no meu portal <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </QuoteShell>
  );
}
