import Link from "next/link";
import {
  HeartPulse,
  Smile,
  Shield,
  Crown,
  Scale,
  Car,
  Building2,
  PawPrint,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

/**
 * Grupos consultivos da landing pública.
 *
 * Filosofia (orientação do dono): a landing NÃO é prateleira de produtos.
 * O objetivo é levar para CONSULTORIA + COTAÇÃO de Saúde (produto principal).
 * Por isso esta seção exibe 3 BLOCOS DE INTENÇÃO, com ícones agrupados em
 * cluster, não 8 cards separados:
 *
 *   1. SAÚDE & ODONTO  → CTA forte de cotação direta (nosso produto âncora)
 *   2. PESSOAS         → Vida Empresarial + Vida Sócios → consultoria
 *   3. EMPRESA         → RC, Frota, Patrimonial, Pet     → consultoria
 *
 * A prateleira completa de 8 produtos fica em /cotar (página institucional).
 * Aqui na landing só listamos os clusters + um link discreto "Ver todos".
 */
export function ProductsGrid() {
  return (
    <section className="bg-navy-900" id="produtos">
      <div className="container-wide py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow text-champagne-500">Como começamos</p>
            <h2 className="heading-display mt-4 text-display-lg text-ivory">
              Por onde sua empresa quer{" "}
              <em className="italic text-champagne-300">começar</em>?
            </h2>
          </div>
        </div>

        {/* ═════════ Bloco ZERO — AFFIDA ASSESSMENT (entrada consultiva) ═════════
            Antes de cotar, oferecemos um diagnóstico gratuito da política
            atual de benefícios do cliente — entender posicionamento e gaps
            é o melhor caminho para uma cotação que faça sentido.
            (Pedido direto do dono: sugestão "Affida Assessment" como primeiro
            card, com CTA "Serviço sem custo".) */}
        <div className="mt-12">
          <Link
            href={`https://wa.me/5511900000000?text=${encodeURIComponent(
              "Olá Affida, gostaria de fazer o Affida Assessment — diagnóstico gratuito da minha política de benefícios."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-8 overflow-hidden rounded-3xl border border-forest/40 bg-gradient-to-br from-navy-800 via-navy-900 to-forest-900/20 p-8 transition-all hover:-translate-y-0.5 hover:border-forest/60 sm:p-10 lg:flex-row lg:items-center lg:gap-14"
          >
            <div className="flex shrink-0 items-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-forest/20 text-forest-200">
                <Sparkles size={32} strokeWidth={1.4} />
              </span>
            </div>

            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-forest/30 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-forest-200">
                Comece por aqui
              </span>
              <h3 className="mt-4 font-display text-3xl font-light text-ivory sm:text-4xl">
                Affida Assessment
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory/75 sm:text-base">
                Entender seus atuais benefícios e como você está posicionado
                é o melhor caminho. Avaliamos com você:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-ivory/80">
                <li>• Há espaço para redução de custo e melhora de coberturas?</li>
                <li>• Estou atendendo a convenção coletiva?</li>
                <li>• Como desenhar uma política que aumente a percepção dos funcionários sem elevar custo?</li>
                <li>• Estou competitivo frente aos meus concorrentes?</li>
              </ul>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-forest-200/40 bg-forest/30 px-6 py-3 text-sm font-medium text-forest-100 transition-all group-hover:bg-forest/50">
              Serviço sem custo <ArrowRight size={14} />
            </div>
          </Link>
        </div>

        {/* ═════════ Bloco 1 — SAÚDE & ODONTO (produto principal) ═════════ */}
        <div className="mt-6">
          <Link
            href="/cotar/saude-coletiva"
            className="group relative flex flex-col gap-8 overflow-hidden rounded-3xl border border-champagne-400/40 bg-gradient-to-br from-navy-800 to-navy-900 p-8 transition-all hover:-translate-y-0.5 hover:border-champagne-300/60 sm:p-10 lg:flex-row lg:items-center lg:gap-14"
          >
            {/* Cluster de ícones — saúde principal + odonto cross-sell */}
            <div className="flex shrink-0 items-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-champagne-500/15 text-champagne-300">
                <HeartPulse size={32} strokeWidth={1.4} />
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-champagne-500/10 text-champagne-300/80">
                <Smile size={22} strokeWidth={1.4} />
              </span>
            </div>

            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-champagne-500/20 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-champagne-300">
                Produto principal
              </span>
              <h3 className="mt-4 font-display text-3xl font-light text-ivory sm:text-4xl">
                Plano de saúde + odonto PME
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ivory/75 sm:text-base">
                Cotação online em minutos nas principais operadoras do Brasil —
                Amil, Bradesco Saúde, SulAmérica e Unimed.
                Comparativo por faixa etária ANS, com migração analisada vs. seu
                plano atual. Odonto entra junto com mensalidade reduzida.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ivory/65">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-champagne-400" />
                  4 operadoras-âncora
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-champagne-400" />
                  A partir de 2 vidas
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-champagne-400" />
                  Cotação em ~3 min
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full bg-champagne-500 px-6 py-3 text-sm font-medium text-navy-900 transition-all group-hover:shadow-gold">
              Cotar agora <ArrowRight size={14} />
            </div>
          </Link>
        </div>

        {/* ═════════ Blocos 2 e 3 — clusters de cross-sell ═════════ */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* VIDA EMPRESARIAL — produto MVP, cotador online direto */}
          <Link
            href="/cotar/vida-empresarial"
            className="group flex flex-col gap-6 rounded-3xl border border-champagne-500/15 bg-navy-800/50 p-8 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-champagne-400/30 hover:bg-navy-800/70"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-champagne-500/15 text-champagne-300">
                <Shield size={22} strokeWidth={1.4} />
              </span>
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-champagne-500">
                Cross-sell sobre saúde
              </p>
              <h3 className="mt-2 font-display text-2xl font-light text-ivory">
                Vida em grupo
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/65">
                Proteção do time com capital segurado a partir de 12× salário,
                assistência funeral e coberturas extras. Cross-sell natural
                sobre a carteira de saúde, com cotação online.
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-champagne-500/15 pt-5 text-xs">
              <span className="uppercase tracking-wide text-champagne-400/80">
                Cotar online
              </span>
              <ArrowUpRight
                size={18}
                className="text-champagne-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </Link>

          {/* SOB CONSULTA — Vida Sócios + RC + Frota + Patrimonial + Pet
              PDF Conselho D4.2: foco do MVP em saúde+odonto+vida coletivo;
              demais ramos atendidos por consultor sênior, sem cotador online
              até a Wave 3. Mantemos a completude da carteira visível mas
              sem competir com o foco comercial. */}
          <Link
            href="https://wa.me/5511900000000?text=Ol%C3%A1+Affida%2C+quero+consultoria+sobre+outros+ramos+%28vida+s%C3%B3cios%2C+RC%2C+frota%2C+patrim%C3%B4nio%29."
            target="_blank"
            className="group flex flex-col gap-6 rounded-3xl border border-champagne-500/15 bg-navy-800/50 p-8 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-champagne-400/30 hover:bg-navy-800/70"
          >
            <div className="flex items-center gap-3">
              {[Crown, Scale, Car, Building2, PawPrint].map((Icon, i) => (
                <span
                  key={i}
                  className={`flex items-center justify-center rounded-xl ${
                    i === 0
                      ? "h-14 w-14 bg-champagne-500/15 text-champagne-300"
                      : "h-12 w-12 bg-champagne-500/10 text-champagne-300/80"
                  }`}
                >
                  <Icon size={i === 0 ? 22 : 18} strokeWidth={1.4} />
                </span>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-champagne-500">
                Sob consulta
              </p>
              <h3 className="mt-2 font-display text-2xl font-light text-ivory">
                Vida sócios + ramos elementares
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/65">
                Vida para sócios-chave, RC profissional, frota, patrimonial
                e pet corporativo — atendidos direto por consultor sênior
                Affida. Cotador online previsto para a próxima fase.
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-champagne-500/15 pt-5 text-xs">
              <span className="uppercase tracking-wide text-champagne-400/80">
                Consultoria via WhatsApp
              </span>
              <ArrowUpRight
                size={18}
                className="text-champagne-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </Link>
        </div>

        {/* Link discreto para a prateleira institucional completa */}
        <div className="mt-10 flex flex-col items-start gap-2 border-t border-champagne-500/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-sm text-ivory/65">
            Quer ver a lista completa dos ramos que operamos?
          </p>
          <Link
            href="/cotar"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-champagne-400 transition-colors hover:text-champagne-200"
          >
            Ver todos os produtos <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
