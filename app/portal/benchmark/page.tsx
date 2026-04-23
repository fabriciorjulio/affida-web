import { TrendingUp, BarChart3, Building2, Users, ArrowUpRight } from "lucide-react";
import { clients } from "@/lib/mock-data";
import { PortalShell } from "@/components/portal/portal-shell";
import { Badge } from "@/components/ui/badge";
import { brl } from "@/lib/utils";

const DEMO_CLIENT_ID = "cli-001";

const benchmarkCnae = {
  cnae: "6435-2 · Serviços de seguros, previdência",
  porte: "EPP · 10 a 49 funcionários",
  empresasAmostra: 312,
  ticketMedio: 487,
  sua: 542,
  saudeShare: 78,
  vidaShare: 41,
  odontoShare: 58,
  operadoras: [
    { nome: "Amil", share: 34 },
    { nome: "Bradesco Saúde", share: 22 },
    { nome: "SulAmérica", share: 18 },
    { nome: "Porto Saúde", share: 11 },
    { nome: "Outras", share: 15 },
  ],
};

export default function BenchmarkPage() {
  const client = clients.find((c) => c.id === DEMO_CLIENT_ID)!;

  return (
    <PortalShell clientName={client.nomeFantasia}>
      <section>
        <p className="eyebrow">Benchmark setorial · CNAE 6435-2</p>
        <h1 className="heading-display mt-2 text-display-md text-navy-900">
          Você vs o <em className="italic text-forest">seu setor</em>
        </h1>
        <p className="mt-3 text-sm text-navy-700/80">
          Comparativo anônimo com {benchmarkCnae.empresasAmostra} empresas do mesmo CNAE e porte
          ({benchmarkCnae.porte}). Atualizado trimestralmente pela Affida Intelligence.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-champagne-200/60 bg-white p-6">
          <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Ticket médio do setor</p>
          <p className="mt-3 font-display text-3xl font-light text-navy-900">
            {brl(benchmarkCnae.ticketMedio)}
          </p>
          <p className="mt-1 text-xs text-navy-700/60">por vida / mês · mediana</p>
        </div>
        <div className="rounded-3xl border border-forest/30 bg-forest-50/40 p-6">
          <p className="text-[10px] uppercase tracking-widest text-forest">Seu ticket médio</p>
          <p className="mt-3 font-display text-3xl font-light text-navy-900">{brl(benchmarkCnae.sua)}</p>
          <p className="mt-1 text-xs text-forest">
            11% acima da mediana · p75
          </p>
        </div>
        <div className="rounded-3xl border border-champagne-200/60 bg-gradient-gold p-6">
          <p className="text-[10px] uppercase tracking-widest text-navy-800/80">Oportunidade</p>
          <p className="mt-3 font-display text-2xl font-light text-navy-900">-R$ 55 / vida</p>
          <p className="mt-1 text-xs text-navy-800">
            Economia potencial migrando para perfil p50
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-champagne-200/60 bg-white p-6">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-champagne-600" />
            <p className="eyebrow">Cobertura típica do setor</p>
          </div>
          <h3 className="heading-display mt-3 text-xl text-navy-900">Quem contrata o quê</h3>
          <div className="mt-6 space-y-5">
            {[
              { label: "Saúde empresarial", pct: benchmarkCnae.saudeShare, voce: true },
              { label: "Odontológico", pct: benchmarkCnae.odontoShare, voce: true },
              { label: "Vida em grupo", pct: benchmarkCnae.vidaShare, voce: false },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-navy-700">{row.label}</span>
                  <span className="flex items-center gap-2 font-medium text-navy-900">
                    {row.pct}%
                    {row.voce ? (
                      <Badge tone="success">Você tem</Badge>
                    ) : (
                      <Badge tone="gold">Gap</Badge>
                    )}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-navy-50">
                  <div
                    className={`h-full ${row.voce ? "bg-forest" : "bg-gradient-gold"}`}
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-champagne-300/50 bg-champagne-50 p-4">
            <p className="text-xs text-navy-700/85">
              <strong className="text-navy-900">Insight Affida:</strong> 41% das empresas do seu
              setor contratam Vida em grupo, inclusive pela proteção dos sócios (PPE). Podemos
              adicionar uma apólice de Vida para 7 vidas a partir de R$ 38/vida.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-navy-900 bg-navy-900 p-6 text-ivory">
          <Building2 size={16} className="text-champagne-300" />
          <p className="eyebrow mt-3 text-champagne-500">Operadoras dominantes</p>
          <p className="mt-3 text-xs text-ivory/70">
            Share de mercado entre empresas {benchmarkCnae.porte.toLowerCase()}.
          </p>
          <div className="mt-5 space-y-4">
            {benchmarkCnae.operadoras.map((op) => (
              <div key={op.nome}>
                <div className="flex items-center justify-between text-xs text-ivory/85">
                  <span>{op.nome}</span>
                  <span className="font-medium text-champagne-300">{op.share}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ivory/10">
                  <div className="h-full bg-gradient-gold" style={{ width: `${op.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-champagne-200/60 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-champagne-600" />
              <p className="eyebrow">Reajustes médios</p>
            </div>
            <h3 className="heading-display mt-3 text-xl text-navy-900">
              Seu reajuste vs o mercado
            </h3>
          </div>
          <Badge tone="success">Abaixo do mercado</Badge>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-champagne-200/60 bg-sand/30 p-5">
            <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Setor · 2025</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">+17,4%</p>
            <p className="mt-1 text-xs text-navy-700/60">Mediana ponderada</p>
          </div>
          <div className="rounded-2xl border border-forest/30 bg-forest-50/40 p-5">
            <p className="text-[10px] uppercase tracking-widest text-forest">Sua carteira · 2025</p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">+12,8%</p>
            <p className="mt-1 text-xs text-forest">-4,6pp vs mercado</p>
          </div>
          <div className="rounded-2xl border border-champagne-300/50 bg-champagne-50 p-5">
            <p className="text-[10px] uppercase tracking-widest text-champagne-800">
              Projeção 2026
            </p>
            <p className="mt-2 font-display text-3xl font-light text-navy-900">+11,2%</p>
            <p className="mt-1 text-xs text-navy-700/70">
              Estimativa Affida c/ negociação
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-champagne-200/60 bg-gradient-to-br from-ivory to-sand/40 p-8">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-forest" />
              <p className="eyebrow">Onde o setor está olhando</p>
            </div>
            <h3 className="heading-display mt-3 text-2xl text-navy-900">
              Tendências 2026 para empresas do seu porte
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-navy-700/85">
              <li className="flex gap-3">
                <ArrowUpRight size={16} className="mt-0.5 text-forest" />
                <span>
                  <strong className="text-navy-900">+38%</strong> em contratação de Vida em grupo
                  para proteção de sócios.
                </span>
              </li>
              <li className="flex gap-3">
                <ArrowUpRight size={16} className="mt-0.5 text-forest" />
                <span>
                  <strong className="text-navy-900">D+E</strong> (Digital + Experiência) virou
                  critério de escolha: apps operadora com reembolso online pesam 62% na decisão.
                </span>
              </li>
              <li className="flex gap-3">
                <ArrowUpRight size={16} className="mt-0.5 text-forest" />
                <span>
                  <strong className="text-navy-900">Coparticipação</strong> com teto mensal reduz
                  reajuste médio em 3,2pp — recomendamos avaliar na próxima renovação.
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-navy-900 bg-navy-900 p-5 text-ivory">
            <p className="eyebrow text-champagne-500">Quer um diagnóstico completo?</p>
            <p className="mt-3 text-sm text-ivory/85">
              Nossa inteligência compara sua carteira com dezenas de variáveis. Peça ao Lucas um
              relatório consultivo.
            </p>
            <a
              href="https://wa.me/5511900000000"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium text-navy-900 hover:shadow-gold"
            >
              Solicitar relatório completo
            </a>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
