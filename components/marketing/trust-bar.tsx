/**
 * Trust bar — substitui a antiga "Em associação com MDS / Ardonagh / Brokerslink"
 * (que vinculava a Affida a um chapéu institucional). A Affida é uma corretora
 * autônoma com SUSEP e código aberto nas principais operadoras — então o
 * argumento de credibilidade aqui são as PRÓPRIAS operadoras parceiras.
 */
const operadoras = [
  "Amil",
  "Bradesco Saúde",
  "SulAmérica",
  "Porto Saúde",
  "Unimed",
  "Hapvida",
];

export function TrustBar() {
  return (
    <section className="border-y border-champagne-500/10 bg-navy-900" id="operadoras">
      <div className="container-wide flex flex-col items-center justify-between gap-6 py-10 md:flex-row md:gap-8">
        <p className="eyebrow text-champagne-500 md:max-w-[14rem]">
          Código de corretagem aberto em
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10 md:gap-x-12">
          {operadoras.map((nome) => (
            <span
              key={nome}
              className="font-display text-base font-light tracking-[0.18em] text-ivory/85 sm:text-lg"
            >
              {nome}
            </span>
          ))}
        </div>
        <p className="max-w-xs text-center text-xs text-ivory/65 md:text-right">
          Sem intermediários. Negociamos direto com a operadora — comissão e condições
          transparentes para o cliente PME.
        </p>
      </div>
    </section>
  );
}
