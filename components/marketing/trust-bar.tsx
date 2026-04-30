/**
 * Trust bar — operadoras parceiras Affida.
 *
 * Atualização 2026-04-29 (PPTX do dono): adicionar **Care Plus** e **Omint**
 * à vitrine. Trust bar passa a exibir 6 operadoras-âncora ao invés de 4 —
 * Care Plus e Omint atendem nichos premium relevantes (executivos, alta
 * renda, mercado RJ/SP) e o discurso da marca se beneficia de mostrá-las.
 *
 *   • Eyebrow: "Principais operadoras parceiras Affida"
 *   • Copy direita: ênfase em inteligência consultiva na negociação
 */
const operadoras = ["Amil", "Bradesco Saúde", "Care Plus", "Omint", "SulAmérica", "Unimed"];

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
