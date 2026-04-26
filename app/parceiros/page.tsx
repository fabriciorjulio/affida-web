import Link from "next/link";
import { Handshake, Coins, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { BrandSignature } from "@/components/marketing/brand-signature";
import { Footer } from "@/components/marketing/footer";

const beneficios = [
  {
    icon: Coins,
    // PDF Conselho D7.1: comissão flat 25% recorrente compromete margem.
    // Modelo declinante 30% (ano 1) → 15% (ano 2) → 10% (ano 3+) chega
    // mais cedo ao parceiro E protege unit economics no longo prazo.
    title: "30% no ano 1, declinante",
    description:
      "Comissão de 30% sobre o prêmio nos primeiros 12 meses, 15% no ano 2 e 10% a partir do ano 3 — enquanto a apólice estiver ativa. Modelo desenhado para te pagar mais cedo e ainda manter a relação saudável no longo prazo.",
  },
  {
    icon: TrendingUp,
    title: "Material de marketing pronto",
    description:
      "Landing pages, materiais de divulgação, cotações co-brandedas. Você só precisa apresentar.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & SUSEP",
    description:
      "Corretora autônoma SUSEP com código aberto nas principais operadoras. Operação 100% regulada — sem risco jurídico para sua marca.",
  },
  {
    icon: Handshake,
    title: "Consultor dedicado",
    description:
      "Seu cliente é atendido por um closer sênior Affida — com a mesma qualidade que você entrega.",
  },
];

// Curva declinante por perfil de parceiro — modelo PDF D7.1.
// Curva única: 30% ano 1 → 15% ano 2 → 10% ano 3+. Cap por contrato evita
// distorção em prêmios atípicos. % do ano 1 abaixo destaca o pico inicial.
const tiposParceiros = [
  { nome: "Contadores", share: "30% → 10%", descricao: "Escritórios contábeis com carteira PME" },
  { nome: "Associações e sindicatos", share: "30% → 10%", descricao: "Entidades de classe e setoriais" },
  { nome: "Influenciadores de negócios", share: "30% → 10%", descricao: "Criadores com audiência PME/RH" },
  { nome: "Afiliados digitais", share: "30% → 10%", descricao: "Sites, blogs, indicadores online" },
  { nome: "Consultores de RH", share: "30% → 10%", descricao: "Especialistas em benefícios" },
];

export default function ParceirosPublicPage() {
  return (
    <main className="bg-ivory">
      <Navbar tone="dark" />

      {/* Hero superior colado ao header — bg-ink (Neutral Black) cria
          continuidade com o chrome. BrandSignature logo abaixo entrega o
          respiro Dress Blues como bloco institucional autocontido. */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.08]" />
        <div className="container-wide relative z-10 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-champagne-500">Programa de parcerias Affida</p>
            <h1 className="heading-display mt-5 text-display-xl text-ivory text-balance">
              Transforme seu relacionamento em{" "}
              <em className="italic text-champagne-300">renda recorrente.</em>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ivory/75">
              Se você atende empresários — contadores, consultores, associações, influenciadores — o
              programa de parcerias Affida paga comissão recorrente por cada cliente indicado:
              30% no primeiro ano, declinando para 15% e 10% — modelo desenhado para acelerar o
              seu retorno e manter o pagamento por toda a vida da apólice.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href="https://wa.me/5511900000000?text=Ol%C3%A1+time+Affida%2C+quero+ser+parceiro+do+programa+Affida+Partners."
                variant="gold"
                size="lg"
                target="_blank"
              >
                Quero ser parceiro <ArrowRight size={14} />
              </Button>
              <Button href="#programa" variant="outline" size="lg">
                Como funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Assinatura institucional — versão positiva do logo, p.14 do manual */}
      <BrandSignature />

      <section className="bg-sand/50" id="programa">
        <div className="container-wide py-24">
          <p className="eyebrow">Programa Affida Partners</p>
          <h2 className="heading-display mt-4 text-display-lg text-navy-900">
            Quatro motivos pra{" "}
            <em className="italic text-forest">indicar Affida</em>.
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {beneficios.map((b) => (
              <div
                key={b.title}
                className="flex flex-col gap-4 rounded-2xl border border-champagne-200/70 bg-white p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-champagne-300">
                  <b.icon size={18} strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-xl font-light text-navy-900">{b.title}</h3>
                <p className="text-sm text-navy-700/80">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-wide py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Perfis que atendemos</p>
              <h2 className="heading-display mt-3 text-display-lg text-navy-900">
                Quem <em className="italic text-forest">pode</em> ser parceiro?
              </h2>
              <p className="mt-5 text-base text-navy-700/80">
                Todo profissional que se relaciona com empresários e pode se beneficiar de oferecer
                seguros empresariais como extensão natural do seu serviço.
              </p>
              <Button
                href="https://wa.me/5511900000000?text=Ol%C3%A1+time+Affida%2C+gostaria+de+solicitar+convite+para+o+programa+de+parcerias."
                variant="primary"
                size="lg"
                className="mt-8"
                target="_blank"
              >
                Solicitar convite <ArrowRight size={14} />
              </Button>
            </div>

            <div className="space-y-3">
              {tiposParceiros.map((t) => (
                <div
                  key={t.nome}
                  className="flex items-center justify-between rounded-2xl border border-champagne-200/70 bg-white p-5"
                >
                  <div>
                    <p className="font-display text-lg font-light text-navy-900">{t.nome}</p>
                    <p className="mt-1 text-xs text-navy-700/70">{t.descricao}</p>
                  </div>
                  <span className="font-display text-2xl font-light text-champagne-700">{t.share}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 text-ivory">
        <div className="container-wide py-24">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-champagne-500">Jornada do parceiro</p>
              <h2 className="heading-display mt-4 text-display-lg text-ivory">
                Do convite ao{" "}
                <em className="italic text-champagne-300">primeiro pagamento</em>.
              </h2>
              <p className="mt-6 text-base text-ivory/70">
                Tudo digital, sem contratos complicados. Transparência total sobre indicações,
                cotações e pagamentos em um painel exclusivo.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ol className="space-y-8 border-l border-champagne-500/20 pl-8">
                {[
                  "Cadastro online em 5 minutos + assinatura eletrônica do contrato",
                  "Acesso ao painel de parceiro com link de indicação e materiais co-branded",
                  "Indique empresas por WhatsApp, e-mail, ou envio direto da cotação online",
                  "Acompanhe status em tempo real: recebida, cotada, proposta, fechada",
                  "Comissão paga todo dia 15: 30% no ano 1, 15% no ano 2, 10% a partir do ano 3 — enquanto a apólice estiver ativa",
                ].map((step, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[2.55rem] flex h-6 w-6 items-center justify-center rounded-full bg-champagne-500/20 text-[10px] font-medium text-champagne-300">
                      {i + 1}
                    </span>
                    <p className="text-base text-ivory/90">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand/50">
        <div className="container-wide py-24 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow">Pronto para começar?</p>
            <h2 className="heading-display mt-4 text-display-lg text-navy-900">
              Vamos conversar sobre <em className="italic text-forest">sua carteira</em>.
            </h2>
            <p className="mt-5 text-base text-navy-700/80">
              Fale com o time de parcerias Affida em uma conversa de 20 minutos. Em 48h você recebe o
              convite para o programa.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href="https://wa.me/5511900000000?text=Ol%C3%A1+Affida%2C+gostaria+de+agendar+uma+conversa+de+20+minutos+sobre+o+programa+de+parcerias."
                variant="primary"
                size="lg"
                target="_blank"
              >
                Agendar conversa <ArrowRight size={14} />
              </Button>
              <Button
                href="https://wa.me/5511900000000?text=Ol%C3%A1+Affida%21+Quero+saber+mais+sobre+o+programa+de+parcerias."
                variant="dark-outline"
                size="lg"
                target="_blank"
              >
                WhatsApp parcerias
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
