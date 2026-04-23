import { CheckCircle2, Shield, Users, Sparkles, ArrowRight, Download, Star } from "lucide-react";
import { sampleQuote, operatorById, clients } from "@/lib/mock-data";
import { PortalShell } from "@/components/portal/portal-shell";
import { Badge } from "@/components/ui/badge";
import { brl } from "@/lib/utils";

const DEMO_CLIENT_ID = "cli-001";

export default function ProposalPage() {
  const client = clients.find((c) => c.id === DEMO_CLIENT_ID)!;
  const recommendedPkg = sampleQuote.packages[0];

  return (
    <PortalShell clientName={client.nomeFantasia}>
      <section>
        <p className="eyebrow">Proposta consultiva · Renovação 2026</p>
        <h1 className="heading-display mt-3 text-display-md text-navy-900">
          Para <em className="italic text-forest">{client.razaoSocial}</em>
        </h1>
        <p className="mt-3 text-sm text-navy-700/80">
          {sampleQuote.vidas} vidas ·{" "}
          {sampleQuote.faixas.map((f) => `${f.count} ${f.label}`).join(" + ")} · Válida até{" "}
          {new Date(sampleQuote.expiresAt).toLocaleDateString("pt-BR")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Badge tone="gold">Opção 1 destacada</Badge>
          <Badge tone="neutral">Preparada por Lucas Azevedo · Closer Affida</Badge>
          <button className="ml-auto inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-xs text-navy-700 hover:bg-navy-50">
            <Download size={13} /> Baixar PDF
          </button>
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        {sampleQuote.packages.map((pkg, i) => {
          const op = operatorById(pkg.operatorId);
          const isCheapest = pkg === recommendedPkg;
          return (
            <div
              key={pkg.id}
              className={`relative flex flex-col gap-6 rounded-3xl border p-7 ${
                isCheapest ? "border-forest/40 bg-forest-50/40 shadow-premium" : "border-champagne-200/70 bg-white"
              }`}
            >
              {isCheapest && (
                <span className="absolute -top-2 left-7 inline-flex items-center gap-1 rounded-full bg-forest px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-ivory">
                  <Star size={10} /> Opção recomendada
                </span>
              )}

              <div>
                <p className="text-xs uppercase tracking-widest text-champagne-600">Opção 0{i + 1} · {op?.name}</p>
                <h2 className="mt-3 font-display text-2xl font-light text-navy-900">{pkg.plano}</h2>
                <p className="mt-2 text-xs text-navy-700/70">
                  {pkg.acomodacao} · Coparticipação {pkg.coparticipacao} · Abrangência {pkg.abrangencia}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-champagne-200/60 bg-white p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Por vida</p>
                  <p className="mt-1 font-display text-xl font-light text-navy-900">
                    {brl(pkg.valorMensalPorVida)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Total mensal</p>
                  <p className="mt-1 font-display text-xl font-light text-navy-900">
                    {brl(pkg.valorMensalTotal)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-navy-700/60">Reembolso</p>
                  <p className="mt-1 font-display text-xl font-light text-navy-900">
                    {brl(pkg.reembolsoConsulta ?? 0)}
                  </p>
                </div>
              </div>

              <div>
                <p className="eyebrow">Carências</p>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(pkg.carencia).map(([k, v]) => (
                    <li key={k} className="flex items-center gap-2 text-navy-700/80">
                      <CheckCircle2 size={13} className="text-forest" />
                      <span className="font-medium text-navy-900">{k}</span>: {v}
                    </li>
                  ))}
                </ul>
              </div>

              {pkg.redeDestaque && (
                <div>
                  <p className="eyebrow">Rede de destaque</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    {pkg.redeDestaque.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-champagne-200/60 bg-white px-3 py-1 text-navy-700"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {pkg.promocoes && pkg.promocoes.length > 0 && (
                <div className="rounded-xl border border-champagne-300/50 bg-champagne-50 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-champagne-700" />
                    <p className="text-xs font-medium uppercase tracking-widest text-champagne-800">
                      Bônus Affida
                    </p>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-navy-700/80">
                    {pkg.promocoes.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                  isCheapest
                    ? "bg-navy-900 text-ivory hover:bg-navy-700"
                    : "border border-navy-200 bg-white text-navy-900 hover:border-navy-400"
                }`}
              >
                Escolher esta opção <ArrowRight size={14} />
              </button>
            </div>
          );
        })}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-champagne-200/60 bg-white p-6">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-champagne-600" />
            <p className="eyebrow">Perfil da carteira</p>
          </div>
          <h3 className="heading-display mt-3 text-xl text-navy-900">Composição das vidas</h3>
          <div className="mt-5 space-y-3">
            {sampleQuote.faixas.map((f) => (
              <div key={f.label}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-navy-700">{f.label}</span>
                  <span className="font-medium text-navy-900">{f.count} vidas</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-navy-50">
                  <div
                    className="h-full bg-gradient-gold"
                    style={{ width: `${(f.count / sampleQuote.vidas) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-navy-900 bg-navy-900 p-6 text-ivory">
          <Users size={16} className="text-champagne-300" />
          <p className="eyebrow mt-3 text-champagne-500">Recomendação Affida</p>
          <p className="mt-3 text-sm text-ivory/85">
            Pelo perfil da carteira Adiantajus — 7 vidas concentradas entre 29–33 anos, com alta
            densidade de procedimentos ambulatoriais — recomendamos a{" "}
            <strong className="text-ivory">Opção 1 (Amil S380/S750/S2500)</strong>. Preço competitivo,
            rede Samaritano + Oswaldo Cruz + Einstein em upgrade, com carências zeradas em
            consultas, exames e internações.
          </p>
          <a
            href="https://wa.me/5511900000000"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-medium text-navy-900 hover:shadow-gold"
          >
            Falar com Lucas <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </PortalShell>
  );
}
