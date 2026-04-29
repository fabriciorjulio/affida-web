"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { Input, Select, FieldGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { products } from "@/lib/mock-data";
import { PORTES } from "@/lib/portes";
import { cnpjMask } from "@/lib/utils";
import { addLead } from "@/lib/lead-store";

/**
 * Cadastro manual de lead pelo CRM.
 *
 * Bug reportado pelo dono: "adicionar lead não estava seguindo até o final".
 * Causa: o submit anterior só disparava um toast e setDone(true), mas
 * NÃO persistia o lead no localStorage — então nunca aparecia em /crm/leads.
 * Os inputs também estavam uncontrolled (sem state), então mesmo que
 * a persistência existisse, os valores digitados eram perdidos.
 *
 * Fix: state controlado + addLead({ origin: "manual", ... }) no submit.
 * Quando o backend FastAPI estiver de pé, troca por POST /api/leads.
 */

type FormState = {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  porte: string;
  cnae: string;
  vidas: string;
  contatoNome: string;
  contatoCargo: string;
  contatoEmail: string;
  contatoTelefone: string;
  produto: string;
  origem: string;
  temperatura: string;
  receitaPotencial: string;
  observacao: string;
};

const INITIAL: FormState = {
  cnpj: "",
  razaoSocial: "",
  nomeFantasia: "",
  porte: "",
  cnae: "",
  vidas: "",
  contatoNome: "",
  contatoCargo: "",
  contatoEmail: "",
  contatoTelefone: "",
  produto: "",
  origem: "",
  temperatura: "Morno",
  receitaPotencial: "",
  observacao: "",
};

export default function NovoLeadPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<{ nome: string } | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const empresaNome =
        form.razaoSocial.trim() ||
        form.nomeFantasia.trim() ||
        form.contatoNome.trim() ||
        "Empresa sem nome";

      const observacaoPartes = [
        form.observacao.trim(),
        form.temperatura ? `Temperatura: ${form.temperatura}` : null,
        form.receitaPotencial
          ? `Receita potencial: R$ ${form.receitaPotencial}/mês`
          : null,
        form.origem ? `Origem: ${form.origem}` : null,
      ].filter(Boolean);

      addLead({
        origin: "manual",
        nome: empresaNome,
        cnpj: form.cnpj.trim() || undefined,
        cnae: form.cnae.trim() || undefined,
        vidas: form.vidas ? Number(form.vidas) : undefined,
        produto: form.produto || undefined,
        contact: {
          nome: form.contatoNome.trim(),
          email: form.contatoEmail.trim(),
          telefone: form.contatoTelefone.trim(),
          cargo: form.contatoCargo.trim() || undefined,
        },
        observacao: observacaoPartes.join(" · ") || undefined,
      });

      // Pequeno delay só pra dar feedback visual de "criando"
      await new Promise((r) => setTimeout(r, 300));
      toast(
        `Lead "${empresaNome}" criado e roteado para Lucas Azevedo (closer sênior).`,
        "success"
      );
      setDone({ nome: empresaNome });
    } catch (err) {
      toast("Erro ao salvar lead. Tente novamente.", "info");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-forest/30 bg-forest-50/40 p-8 text-center">
        <h2 className="font-display text-2xl font-light text-navy-900">
          Lead criado com sucesso
        </h2>
        <p className="mt-3 text-sm text-navy-700/80">
          <strong>{done.nome}</strong> entrou no estágio{" "}
          <strong>Qualificação</strong> e foi atribuído ao closer sênior. Você
          já pode ver na lista de leads e no pipeline.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/crm/leads" variant="primary" size="sm">
            Ver na lista <ArrowRight size={12} />
          </Button>
          <Button href="/crm/pipeline" variant="dark-outline" size="sm">
            Ver no pipeline
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setForm(INITIAL);
              setDone(null);
            }}
          >
            Cadastrar outro
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/crm/leads"
        className="inline-flex items-center gap-2 text-xs text-navy-700 hover:text-navy-900"
      >
        <ArrowLeft size={12} /> Voltar para leads
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-champagne-300">
          <UserPlus size={18} />
        </span>
        <div>
          <p className="eyebrow">Novo lead</p>
          <h1 className="heading-display text-display-md text-navy-900">
            Adicionar empresa
          </h1>
        </div>
      </div>

      <form
        onSubmit={submit}
        className="mt-8 space-y-6 rounded-3xl border border-champagne-200/60 bg-white p-6 sm:p-8"
      >
        <section>
          <p className="eyebrow">Empresa</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
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
                placeholder="Adiantajus Consultoria Ltda"
                required
              />
            </FieldGroup>
            <FieldGroup label="Nome fantasia">
              <Input
                value={form.nomeFantasia}
                onChange={(e) => set("nomeFantasia", e.target.value)}
                placeholder="Adiantajus"
              />
            </FieldGroup>
            <FieldGroup label="Tamanho (funcionários)">
              <Select
                value={form.porte}
                onChange={(e) => set("porte", e.target.value)}
              >
                <option value="">Selecione a faixa de funcionários</option>
                {PORTES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label} · {p.classe}
                  </option>
                ))}
              </Select>
            </FieldGroup>
            <FieldGroup label="CNAE">
              <Input
                value={form.cnae}
                onChange={(e) => set("cnae", e.target.value)}
                placeholder="6435-2"
              />
            </FieldGroup>
            <FieldGroup label="Vidas estimadas">
              <Input
                type="number"
                min={0}
                value={form.vidas}
                onChange={(e) => set("vidas", e.target.value)}
                placeholder="12"
              />
            </FieldGroup>
          </div>
        </section>

        <section>
          <p className="eyebrow">Contato</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <FieldGroup label="Nome">
              <Input
                value={form.contatoNome}
                onChange={(e) => set("contatoNome", e.target.value)}
                placeholder="Beatriz Gomes"
                required
              />
            </FieldGroup>
            <FieldGroup label="Cargo">
              <Input
                value={form.contatoCargo}
                onChange={(e) => set("contatoCargo", e.target.value)}
                placeholder="Controller"
              />
            </FieldGroup>
            <FieldGroup label="E-mail">
              <Input
                type="email"
                value={form.contatoEmail}
                onChange={(e) => set("contatoEmail", e.target.value)}
                placeholder="beatriz@empresa.com.br"
                required
              />
            </FieldGroup>
            <FieldGroup label="Telefone / WhatsApp">
              <Input
                value={form.contatoTelefone}
                onChange={(e) => set("contatoTelefone", e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </FieldGroup>
          </div>
        </section>

        <section>
          <p className="eyebrow">Oportunidade</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <FieldGroup label="Produto de interesse">
              <Select
                value={form.produto}
                onChange={(e) => set("produto", e.target.value)}
              >
                <option value="">Selecione</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </FieldGroup>
            <FieldGroup label="Origem">
              <Select
                value={form.origem}
                onChange={(e) => set("origem", e.target.value)}
              >
                <option value="">Selecione</option>
                <option>Indicação</option>
                <option>Google Ads</option>
                <option>LinkedIn</option>
                <option>Parceiro contador</option>
                <option>Site orgânico</option>
                <option>WhatsApp</option>
              </Select>
            </FieldGroup>
            <FieldGroup label="Temperatura">
              <Select
                value={form.temperatura}
                onChange={(e) => set("temperatura", e.target.value)}
              >
                <option>Morno</option>
                <option>Quente</option>
                <option>Frio</option>
              </Select>
            </FieldGroup>
            <FieldGroup label="Receita potencial (R$/mês)">
              <Input
                type="number"
                min={0}
                value={form.receitaPotencial}
                onChange={(e) => set("receitaPotencial", e.target.value)}
                placeholder="4800"
              />
            </FieldGroup>
          </div>
        </section>

        <section>
          <p className="eyebrow">Observação do closer</p>
          <textarea
            value={form.observacao}
            onChange={(e) => set("observacao", e.target.value)}
            className="mt-3 w-full rounded-2xl border border-champagne-200/70 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-900 focus:outline-none focus:ring-1 focus:ring-navy-900"
            rows={4}
            placeholder="Contexto da conversa inicial, urgência, operadoras preferidas..."
          />
        </section>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-champagne-200/60 pt-6">
          <Button href="/crm/leads" variant="dark-outline" size="sm">
            Cancelar
          </Button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-medium text-ivory transition-all hover:bg-navy-700 disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar lead"} <ArrowRight size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}
