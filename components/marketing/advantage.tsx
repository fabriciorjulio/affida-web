import { Activity, LineChart, FileCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Activity,
    title: "Motor de re-oferta",
    description:
      "Aniversário de apólice, reajuste anunciado, mudança de comissionamento, novo produto da operadora. Nosso motor detecta em tempo real e aciona seu consultor.",
    tag: "Inteligência proprietária",
  },
  {
    icon: LineChart,
    title: "Benchmark vivo por setor",
    description:
      "Veja como empresas do seu CNAE e porte estruturam benefícios, qual o ticket médio por vida e quais operadoras dominam o seu setor.",
    tag: "Dados de +2.000 PMEs",
  },
  {
    icon: FileCheck,
    title: "Conciliação de faturas",
    description:
      "Cruzamos a fatura da operadora com seu cadastro atual — inclusões, exclusões, dependentes, retroativos. Você deixa de pagar o que não deve.",
    tag: "Economia média de 4%",
  },
  {
    icon: Sparkles,
    title: "Proposta em 48h",
    description:
      "Da primeira conversa ao PDF na sua mão. Sem planilhas anexadas em e-mail — tudo em um painel online, navegável, comparativo.",
    tag: "SLA consultoria",
  },
];

export function Advantage() {
  return (
    <section className="bg-ivory" id="reoferta">
      <div className="container-wide py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Badge tone="gold">Diferencial Affida</Badge>
            <h2 className="heading-display mt-5 text-display-lg text-navy-900">
              O que fica <em className="italic text-forest">depois</em> da assinatura.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy-700/80">
              A maioria das corretoras vende e esquece. Aqui, o relacionamento começa quando a
              apólice entra em vigência. Nossa tecnologia proprietária mantém a sua carteira
              cuidada todos os dias do ano.
            </p>

            <div className="mt-10 rounded-2xl border border-champagne-200/70 bg-white p-6 shadow-[0_2px_20px_-8px_rgba(10,30,63,0.08)]">
              <p className="text-xs uppercase tracking-widest text-champagne-600">
                Dashboard de carteira
              </p>
              <p className="mt-3 font-display text-3xl font-light text-navy-900">
                11 gatilhos detectados <span className="text-champagne-600">este mês</span>
              </p>
              <p className="mt-2 text-sm text-navy-700/70">
                Entre reajustes anunciados, novos produtos e janelas de renovação.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="relative flex flex-col gap-4 rounded-2xl border border-champagne-200/70 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-100/60 text-forest-600">
                      <f.icon size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-champagne-600">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-light text-navy-900">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-700/80">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
