import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Hero institucional Affida Partners — replica o mockup do website oficial
 * (Manual de Marca dez/2025, p.26):
 *
 *   • Foto de fundo: pessoas em ambiente profissional, golden hour, tons
 *     sóbrios e neutros (p.20-21 do manual: "fotografia deve evocar conexão
 *     autêntica, confiança e estabilidade").
 *   • Card Dress Blues sobreposto à esquerda com logotipo grande em UP +
 *     tagline + CTA dourado.
 *   • Stats institucionais abaixo, dentro do mesmo block escuro.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Foto institucional — handshake business com luz natural quente */}
      <div className="absolute inset-0">
        <Image
          src={`${basePath}/photos/hero-handshake.jpg`}
          alt="Aperto de mão entre profissionais — Affida Partners"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay Dress Blues para contraste e ancoragem da identidade */}
        <div className="absolute inset-0 bg-navy-900/70" />
        {/* Vinheta lateral à esquerda para destacar o card */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-navy-900/85 via-navy-900/55 to-transparent" />
      </div>

      {/* Conteúdo: card Dress Blues à esquerda + stats */}
      <div className="container-wide relative z-10 grid gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <div className="lg:col-span-7 xl:col-span-6">
          <div className="animate-fade-up rounded-3xl border border-champagne-500/25 bg-navy-900/85 p-8 backdrop-blur-md sm:p-10 lg:p-12">
            <p className="eyebrow text-champagne-400">
              Plano de saúde empresarial · Corretora SUSEP
            </p>

            {/* Aplicação primária do logo (Manual p.14 col 2, p.26): fundo Dress Blues + AFFIDA gigante em UP cream para máxima legibilidade. Renderizado a partir da máscara oficial extraída do PDF p.6 — Corbert Demi Bold Extended preservado. */}
            <div className="mt-8 flex">
              <AffidaLogo
                variant="stacked"
                tone="gold"
                className="h-24 sm:h-32"
              />
            </div>

            <h1 className="mt-10 font-display text-3xl font-light leading-[1.1] tracking-tight text-ivory text-balance sm:text-4xl lg:text-5xl">
              Plano de saúde PME que{" "}
              <em className="italic font-light text-champagne-300">cuida de quem cuida</em>.
            </h1>

            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-ivory/75 sm:text-base">
              Cotação em minutos nas principais operadoras de saúde do Brasil — Amil, Bradesco
              Saúde, SulAmérica e Unimed — com código de corretagem direto.
              Consultoria boutique, comparativo transparente e benchmark setorial por CNAE.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <Button href="/cotar/saude-coletiva" variant="gold" size="lg">
                Cotar plano de saúde
                <ArrowRight size={16} />
              </Button>
              {/* Âncora relativa (sem barra inicial) — em produção com
                  basePath="/affida-web", `href="/#..."` mandaria para a
                  RAIZ do domínio (fora do site). Relativo funciona em
                  qualquer rota. Aponta para ProcessSteps (5 passos do
                  funil consultivo), que é o que o nome "Como funciona"
                  promete. */}
              <a
                href="#como-funciona"
                className="text-xs font-medium uppercase tracking-[0.22em] text-champagne-400 transition-colors hover:text-champagne-200"
              >
                Como funciona
              </a>
            </div>

            {/* Pilares discretos */}
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-champagne-500/15 pt-6 text-[10px] font-medium uppercase tracking-[0.28em] text-champagne-400/90">
              <span>Confiança</span>
              <span className="h-1 w-1 rounded-full bg-champagne-500/60" aria-hidden />
              <span>Parceria</span>
              <span className="h-1 w-1 rounded-full bg-champagne-500/60" aria-hidden />
              <span>Excelência</span>
              <span className="h-1 w-1 rounded-full bg-champagne-500/60" aria-hidden />
              <span>Inovação</span>
            </div>
          </div>
        </div>

        {/* Stats institucionais — coluna lateral compacta */}
        <aside className="animate-fade-up animate-delay-300 lg:col-span-5 lg:col-start-8 xl:col-span-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-32">
            {[
              // Argumentos verdadeiros de uma corretora autônoma boutique.
              // Atende PME, médias, grandes empresas e PF — não há
              // restrição de porte/forma. PME é o nosso foco principal
              // (volume), mas atendemos qualquer cliente que precisar.
              { value: "20+", label: "Operadoras acessíveis" },
              { value: "3 min", label: "Cotação online" },
              { value: "Sob medida", label: "Empresas e pessoa física" },
              { value: "SUSEP", label: "Corretora regulada" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-champagne-500/20 bg-navy-900/70 p-5 backdrop-blur-sm"
              >
                <p className="font-display text-2xl font-light text-ivory sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-champagne-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
