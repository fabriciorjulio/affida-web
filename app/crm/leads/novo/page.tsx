"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { Input, Select, FieldGroup } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { products } from "@/lib/mock-data";
import { PORTES } from "@/lib/portes";

export default function NovoLeadPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast("Lead criado! Roteado para Lucas Azevedo (closer sênior).", "success");
    }, 700);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-forest/30 bg-forest-50/40 p-8 text-center">
        <h2 className="font-display text-2xl font-light text-navy-900">Lead criado com sucesso</h2>
        <p className="mt-3 text-sm text-navy-700/80">
          O novo lead entrou no estágio <strong>Qualificação</strong> e foi atribuído ao closer
          sênior. Você já pode acompanhar no pipeline.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/crm/pipeline" variant="primary" size="sm">
            Ver pipeline <ArrowRight size={12} />
          </Button>
          <Button href="/crm/leads" variant="dark-outline" size="sm">
            Lista de leads
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
          <h1 className="heading-display text-display-md text-navy-900">Adicionar empresa</h1>
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
              <Input placeholder="00.000.000/0000-00" required />
            </FieldGroup>
            <FieldGroup label="Razão social">
              <Input placeholder="Adiantajus Consultoria Ltda" required />
            </FieldGroup>
            <FieldGroup label="Nome fantasia">
              <Input placeholder="Adiantajus" />
            </FieldGroup>
            {/* Driver comercial = funcionários (vidas potenciais), não
                faturamento. Classe legal SEBRAE aparece como apoio. */}
            <FieldGroup label="Tamanho (funcionários)">
              <Select>
                <option value="">Selecione a faixa de funcionários</option>
                {PORTES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label} · {p.classe}
                  </option>
                ))}
              </Select>
            </FieldGroup>
            <FieldGroup label="CNAE">
              <Input placeholder="6435-2" />
            </FieldGroup>
            <FieldGroup label="Vidas estimadas">
              <Input type="number" placeholder="12" />
            </FieldGroup>
          </div>
        </section>

        <section>
          <p className="eyebrow">Contato</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <FieldGroup label="Nome">
              <Input placeholder="Beatriz Gomes" required />
            </FieldGroup>
            <FieldGroup label="Cargo">
              <Input placeholder="Controller" />
            </FieldGroup>
            <FieldGroup label="E-mail">
              <Input type="email" placeholder="beatriz@empresa.com.br" required />
            </FieldGroup>
            <FieldGroup label="Telefone / WhatsApp">
              <Input placeholder="(11) 99999-9999" required />
            </FieldGroup>
          </div>
        </section>

        <section>
          <p className="eyebrow">Oportunidade</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <FieldGroup label="Produto de interesse">
              <Select>
                <option value="">Selecione</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </FieldGroup>
            <FieldGroup label="Origem">
              <Select>
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
              <Select>
                <option>Morno</option>
                <option>Quente</option>
                <option>Frio</option>
              </Select>
            </FieldGroup>
            <FieldGroup label="Receita potencial (R$/mês)">
              <Input type="number" placeholder="4800" />
            </FieldGroup>
          </div>
        </section>

        <section>
          <p className="eyebrow">Observação do closer</p>
          <textarea
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
