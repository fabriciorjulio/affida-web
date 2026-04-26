import {
  Coins,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Users,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

/**
 * Programa de INDICAÇÃO Affida (não "parceria de venda").
 *
 * IMPORTANTE — orientação direta do dono:
 *   "Nada pode ser direcionado a ter um agente de venda. Quem vai vender
 *    sempre será nossa equipe própria. As parcerias são com as seguradoras
 *    e não com outros corretores."
 *
 * Implicações no copy:
 *   • Indicador NÃO é corretor, NÃO vende, NÃO atende cliente final.
 *   • Indicador apenas conecta: lead chega no CRM Affida, é roteado para
 *     o closer Affida que conduz toda a venda do início ao fim.
 *   • Comissão é por INDICAÇÃO bem-sucedida (não por venda — porque a
 *     venda é nossa). Modelo de afiliação, não de revenda.
 *   • "Parceria" só aparece quando se refere a OPERADORAS parceiras
 *     (parceria comercial real Affida ↔ seguradora).
 *
 * URL `/parceiros` mantida para não quebrar links externos compartilhados,
 * mas todo o conteúdo trata o programa como "Indicação".
 */

const beneficios = [
  {
    icon: Coins,
    // PDF Conselho D7.1: comissão flat 25% recorrente compromete margem.
    // Curva 30%→15%→10% chega mais cedo ao indicador E protege margem.
    title: "30% no ano 1, declinante",
    description:
      "Comissão de indicação de 30% no primeiro ano, 15% no ano 2 e 10% a partir do ano 3 — enquanto a apólice indicada estiver ativa. Pagamento mensal, transparente, com cap por contrato.",
  },
  {
    icon: TrendingUp,
    title: "Material co-branded pronto",
    description:
      "Landing pages, materiais de divulgação e link de indicação com seu código. Você só conecta — não precisa cotar nem atender o cliente final.",
  },
  {
    icon: Lock,
    title: "Você não atende o cliente",
    description:
      "Toda venda é conduzida pelo closer Affida (equipe interna SUSEP). Você indica, o time Affida cota, propõe e fecha. Sem responsabilidade jurídica nem operacional para você.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & SUSEP Affida",
    description:
      "Affida é corretora autônoma SUSEP com código aberto nas principais operadoras. Toda emissão de proposta sai sob registro Affida — sem risco regulatório para sua marca.",
  },
];

// Curva declinante por perfil de indicador. Quem está aqui CONECTA empresas
// à Affida — não atua como corretor. Por isso explicitamente NÃO incluímos
// "outros corretores de seguros" na lista — corretor não pode revender Affida,
// só usar nossa cotação para o próprio cliente (caso queira ser corretor
// preposto, é vínculo trabalhista, fora deste programa).
const tiposIndicadores = [
  {
    nome: "Contadores",
    share: "30% → 10%",
    descricao: "Escritórios contábeis com carteira PME. Indicação acontece naturalmente na conversa de folha.",
  },
  {
    nome: "Consultores de RH",
    share: "30% → 10%",
    descricao: "Especialistas em benefícios que recomendam Affida durante o desenho do pacote.",
  },
  {
    nome: "Associações e sindicatos",
    share: "30% → 10%",
    descricao: "Entidades de classe e sindicatos patronais que querem oferecer benefício associativo.",
  },
  {
    nome: "Influenciadores PME",
    share: "30% → 10%",
    descricao: "Criadores com audiência empresarial de RH/finanças que recomendam serviços.",
  },
  {
    nome: "Afiliados digitais",
    share: "30% → 10%",
    descricao: "Sites, blogs e indicadores online via link de indicação.",
  },
];

export default function IndicadoresPublicPage() {
  return (
    <main className="bg-ivory">
      <Navbar tone="dark" />

      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.08]" />
        <div className="container-wide relative z-10 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-champagne-500">Programa de Indicação Affida</p>
            <h1 className="heading-display mt-5 text-display-xl text-ivory text-balance">
              Indique empresas e ganhe{" "}
              <em className="italic text-champagne-300">comissão recorrente.</em>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ivory/75">
              Você atende empresários (contadores, RH, associações, criadores) e quer monetizar
              esse relacionamento sem virar corretor? <strong>Indique a Affida.</strong> A venda
              é toda nossa — você só conecta o lead. Comissão paga mensalmente enquanto a
              apólice estiver ativa: 30% no primeiro ano, 15% no ano 2, 10% no ano 3+.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {/* Jornada MGM real — leva ao formulário de cadastro próprio,
                  não mais para o WhatsApp. Indicador completa o cadastro
                  online e recebe seu link único de indicação na hora. */}
              <Button href="/parceiros/cadastro" variant="gold" size="lg">
                Quero indicar empresas <ArrowRight size={14} />
              </Button>
              <Button href="#programa" variant="outline" size="lg">
                Como funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BrandSignature (bloco institucional Dress Blues) removido daqui:
          criava transição Neutral Black (header+hero) → Dress Blues
          (BrandSignature) → bg-sand, e duas tonalidades escuras coladas
          fugiam do padrão fechado. Hero ink agora vai DIRETO para
          conteúdo claro, igual o resto do site. */}

      {/* Quem vende */}
      <section className="bg-sand/40">
        <div className="container-wide py-16">
          <div className="mx-auto flex max-w-4xl items-start gap-5 rounded-3xl border border-champagne-200/70 bg-white p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-champagne-300">
              <Users size={20} strokeWidth={1.5} />
            </span>
            <div>
              <p className="eyebrow text-champagne-700">Importante</p>
              <h3 className="mt-2 font-display text-xl font-light text-navy-900">
                Quem vende é sempre <em className="italic text-forest">a equipe Affida</em>.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-700/85">
                Indicador conecta — closer Affida vende. Você não cota, não emite proposta,
                não responde regulatoriamente pela apólice. Apenas envia o lead pelo seu link
                de indicação ou WhatsApp. Toda a operação comercial e regulatória corre sob
                CNPJ Affida com nossos closers seniores. <strong>Este não é um programa de
                revenda nem de corretagem white-label.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand/50" id="programa">
        <div className="container-wide py-24">
          <p className="eyebrow">Programa de Indicação Affida</p>
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
              <p className="eyebrow">Perfis aceitos</p>
              <h2 className="heading-display mt-3 text-display-lg text-navy-900">
                Quem pode <em className="italic text-forest">indicar</em>?
              </h2>
              <p className="mt-5 text-base text-navy-700/80">
                Profissionais que se relacionam com empresários PME e podem oferecer a
                indicação como extensão natural do próprio serviço.{" "}
                <strong>
                  Outros corretores de seguros NÃO são elegíveis — corretagem é exclusividade
                  da equipe Affida.
                </strong>
              </p>
              <Button
                href="/parceiros/cadastro"
                variant="primary"
                size="lg"
                className="mt-8"
              >
                Cadastrar agora <ArrowRight size={14} />
              </Button>
            </div>

            <div className="space-y-3">
              {tiposIndicadores.map((t) => (
                <div
                  key={t.nome}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-champagne-200/70 bg-white p-5"
                >
                  <div className="min-w-0">
                    <p className="font-display text-lg font-light text-navy-900">{t.nome}</p>
                    <p className="mt-1 text-xs text-navy-700/70">{t.descricao}</p>
                  </div>
                  <span className="shrink-0 font-display text-2xl font-light text-champagne-700">
                    {t.share}
                  </span>
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
              <p className="eyebrow text-champagne-500">Jornada do indicador</p>
              <h2 className="heading-display mt-4 text-display-lg text-ivory">
                Do convite ao{" "}
                <em className="italic text-champagne-300">primeiro pagamento</em>.
              </h2>
              <p className="mt-6 text-base text-ivory/70">
                Tudo digital, sem contratos complicados. Painel exclusivo para acompanhar
                indicações e pagamentos. Você indica — Affida vende e te paga.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ol className="space-y-8 border-l border-champagne-500/20 pl-8">
                {[
                  "Cadastro online em 5 minutos + assinatura eletrônica do termo de indicação",
                  "Acesso ao painel com seu link de indicação único e materiais co-branded",
                  "Indique empresas por WhatsApp, e-mail ou via link — closer Affida assume a partir daí",
                  "Acompanhe status em tempo real: indicação recebida → cotada → proposta → fechada",
                  "Comissão de indicação paga todo dia 15: 30% no ano 1, 15% no ano 2, 10% a partir do ano 3",
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
              Vamos conversar sobre <em className="italic text-forest">sua audiência</em>.
            </h2>
            <p className="mt-5 text-base text-navy-700/80">
              Conversa de 20 minutos com o time de indicação Affida. Em 48h você recebe o
              convite e o link único para começar a indicar.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {/* Caminho principal = cadastro online. WhatsApp fica como
                  fallback para quem prefere conversar antes (questões
                  específicas de modelo, contrato, etc.). */}
              <Button href="/parceiros/cadastro" variant="primary" size="lg">
                Cadastrar agora <ArrowRight size={14} />
              </Button>
              <Button
                href="https://wa.me/5511900000000?text=Ol%C3%A1+Affida%21+Tenho+d%C3%BAvidas+sobre+o+programa+de+indica%C3%A7%C3%A3o+antes+de+me+cadastrar."
                variant="dark-outline"
                size="lg"
                target="_blank"
              >
                Tirar dúvidas no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
