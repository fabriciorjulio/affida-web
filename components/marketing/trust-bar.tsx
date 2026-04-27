/**
 * Trust bar — operadoras parceiras Affida.
 *
 * Lista revisada conforme orientação direta do dono:
 *   • Hapvida REMOVIDA da lista
 *   • Care Plus e Omint ADICIONADAS (planos premium do segmento alto)
 *   • Eyebrow alterada: "Código de corretagem aberto em" → "Principais
 *     operadoras parceiras Affida"
 *   • Copy direita atualizada para enfatizar inteligência consultiva na
 *     negociação (não "sem intermediários" que soa transacional)
 */
const operadoras = [
  "Amil",
  "Bradesco Saúde",
  "SulAmérica",
  "Porto Saúde",
  "Unimed",
  "Care Plus",
  "Omint",
];

export function TrustBar() {
  return (
    <section className="border-y border-champagne-500/10 bg-navy-900" id="operadoras">
      <div className="container-wide flex flex-col items-center justify-between gap-6 py-10 md:flex-row md:gap-8">
        <p className="eyebrow text-champagne-500 md:max-w-[14rem]">
          Principais operadoras parceiras Affida
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
          Com inteligência consultiva, negociamos com as operadoras as melhores
          condições para atender as necessidades de cada cliente.
        </p>
      </div>
    </section>
  );
}
