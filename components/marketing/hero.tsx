import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stat } from "@/components/ui/stat";

export function Hero() {
  return (
    <section className="grid-pattern-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-500/30 to-transparent" />

      <div className="container-wide relative z-10 grid gap-16 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-7">
          <div className="animate-fade-up">
            <p className="eyebrow mb-6 text-champagne-500">
              Corretora boutique de seguros e benefícios
            </p>
            <h1 className="heading-display text-display-xl text-balance text-ivory">
              Construindo o futuro,{" "}
              <em className="italic text-champagne-300">juntos</em>.
            </h1>
            <p className="mt-6 max-w-xl text-sm font-light uppercase tracking-[0.28em] text-champagne-500/90">
              Confiança · Parceria · Excelência · Inovação
            </p>
          </div>

          <p className="animate-fade-up animate-delay-200 mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/80 sm:text-lg">
            Nascemos para resgatar a essência do relacionamento no mercado de seguros e
            benefícios. Serviço personalizado, próximo e de alto nível — unindo tecnologia e
            sensibilidade para entregar soluções sob medida para empresas que valorizam
            relações de confiança.
          </p>

          <div className="animate-fade-up animate-delay-300 mt-10 flex flex-wrap items-center gap-4">
            <Button href="/cotar/vida-empresarial" variant="gold" size="lg">
              Solicitar proposta
              <ArrowRight size={16} />
            </Button>
            <Button href="/#consultoria" variant="outline" size="lg">
              <PhoneCall size={14} />
              Falar com consultor
            </Button>
          </div>

          <div className="animate-fade-up animate-delay-400 mt-14 grid grid-cols-2 gap-8 border-t border-champagne-500/10 pt-10 md:grid-cols-4">
            <Stat value="R$11 bi" label="Prêmios administrados" tone="dark" />
            <Stat value="4 mi" label="Vidas cuidadas" tone="dark" />
            <Stat value="20 mil" label="Clientes corporativos" tone="dark" />
            <Stat value="130+" label="Países presença global" tone="dark" />
          </div>
        </div>

        <aside className="animate-fade-up animate-delay-500 lg:col-span-5 lg:pl-8">
          <div className="relative rounded-3xl border border-champagne-500/15 bg-navy-800/80 p-8 backdrop-blur-sm lg:p-10">
            <div className="absolute -top-3 left-8 inline-flex items-center gap-2 rounded-full border border-champagne-400/40 bg-navy-900 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-champagne-400">
              Nova proposta — Adiantajus Investimentos
            </div>

            <p className="eyebrow mb-1 text-champagne-500">Proposta 03/2026</p>
            <h3 className="font-display text-3xl font-light text-ivory">Saúde Coletiva — 7 vidas</h3>

            <div className="mt-8 grid gap-5">
              <div className="flex items-start justify-between border-b border-champagne-500/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-champagne-500/80">Amil</p>
                  <p className="mt-1 text-sm text-ivory/80">
                    S380 / S750 R1 / S2500 R1 — com coparticipação parcial
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-light text-ivory">R$ 7.586</p>
                  <p className="text-xs text-ivory/50">por mês</p>
                </div>
              </div>
              <div className="flex items-start justify-between border-b border-champagne-500/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-champagne-500/80">Bradesco</p>
                  <p className="mt-1 text-sm text-ivory/80">
                    Efetivo / Nacional III / Nacional Plus — sem coparticipação
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-light text-ivory">R$ 9.101</p>
                  <p className="text-xs text-ivory/50">por mês</p>
                </div>
              </div>

              <div className="rounded-2xl border border-champagne-400/20 bg-champagne-500/5 px-5 py-4 text-sm text-ivory/85">
                <p>
                  <strong className="text-champagne-300">Recomendação Affida:</strong>{" "}
                  Opção Bradesco — sem coparticipação, rede Albert Einstein via Nacional Plus para
                  diretores, previsibilidade de custo total.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
