import Link from "next/link";
import { Handshake, Coins, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { AffidaLogo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

const beneficios = [
  {
    icon: Coins,
    title: "Até 25% de comissão recorrente",
    description:
      "Receba comissão mensal enquanto a apólice indicada estiver ativa. Não é one-time — é renda recorrente.",
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
      "Operação 100% regulada, em associação ao grupo MDS. Sem risco jurídico para sua marca.",
  },
  {
    icon: Handshake,
    title: "Consultor dedicado",
    description:
      "Seu cliente é atendido por um closer sênior Affida — com a mesma qualidade que você entrega.",
  },
];

const tiposParceiros = [
  { nome: "Contadores", share: "20%", descricao: "Escritórios contábeis com carteira PME" },
  { nome: "Associações e sindicatos", share: "10-15%", descricao: "Entidades de classe e setoriais" },
  { nome: "Influenciadores de negócios", share: "25%", descricao: "Criadores com audiência PME/RH" },
  { nome: "Afiliados digitais", share: "10%", descricao: "Sites, blogs, indicadores online" },
  { nome: "Consultores de RH", share: "25%", descricao: "Especialistas em benefícios" },
];

export default function ParceirosPublicPage() {
  return (
    <main className="bg-ivory">
      <Navbar tone="dark" />

      <section className="grid-pattern-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-30" />
        <div className="container-wide relative z-10 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-champagne-500">Programa de parcerias Affida</p>
            <h1 className="heading-display mt-5 text-display-xl text-ivory text-balance">
              Transforme seu relacionamento em{" "}
              <em className="italic text-champagne-300">renda recorrente.</em>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ivory/75">
              Se você atende empresários — contadores, consultores, associações, influenciadores — o
              programa de parcerias Affida te paga comissão recorrente por cada cliente indicado.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="lg">
                Quero ser parceiro <ArrowRight size={14} />
              </Button>
              <Button href="#programa" variant="outline" size="lg">
                Como funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

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
              <Button variant="primary" size="lg" className="mt-8">
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
                  "Comissão paga todo dia 15, enquanto a apólice estiver ativa",
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
              <Button variant="primary" size="lg">
                Agendar conversa <ArrowRight size={14} />
              </Button>
              <Button href="https://wa.me/5511900000000" variant="dark-outline" size="lg">
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
