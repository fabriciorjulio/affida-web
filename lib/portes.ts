/**
 * Faixas de tamanho de empresa orientadas por NÚMERO DE FUNCIONÁRIOS.
 *
 * Para uma corretora de seguros PME (especialmente saúde), o que importa
 * comercialmente é quantas vidas a empresa carrega — não o faturamento
 * declarado. A classificação legal SEBRAE/Receita (MEI/ME/EPP/Média) entra
 * como apoio ("classe"), não como driver de seleção.
 *
 * Limites por funcionários alinhados ao SEBRAE para empresas de comércio/
 * serviços (Lei Complementar 123/2006 + Resolução SEBRAE):
 *   • Microempresa (ME):       até 9 funcionários
 *   • Empresa de pequeno porte (EPP): 10 a 49
 *   • Média empresa:           50 a 99
 *   • Grande:                  100+
 *
 * Subdividimos as duas pontas para casar melhor com a realidade da
 * cotação de saúde (preço por vida varia bastante entre 2 e 49).
 */

export type PorteValue =
  | "1-2"
  | "3-9"
  | "10-49"
  | "50-99"
  | "100-249"
  | "250+";

export const PORTES: ReadonlyArray<{
  value: PorteValue;
  label: string;
  classe: string;
  hint: string;
}> = [
  {
    value: "1-2",
    label: "1 a 2 funcionários",
    classe: "MEI / autônomo",
    hint: "Plano ind/familiar ou contratação como PJ",
  },
  {
    value: "3-9",
    label: "3 a 9 funcionários",
    classe: "Microempresa (ME)",
    hint: "Adesão a partir de 2 vidas",
  },
  {
    value: "10-49",
    label: "10 a 49 funcionários",
    classe: "Pequena empresa (EPP)",
    hint: "Foco PME · todas operadoras",
  },
  {
    value: "50-99",
    label: "50 a 99 funcionários",
    classe: "Média empresa",
    hint: "Negociação de coparticipação e rede",
  },
  {
    value: "100-249",
    label: "100 a 249 funcionários",
    classe: "Médio porte",
    hint: "Tabela própria + rede customizada",
  },
  {
    value: "250+",
    label: "250 ou mais funcionários",
    classe: "Grande porte",
    hint: "Atendimento consultivo dedicado",
  },
] as const;

export function porteByValue(v: string) {
  return PORTES.find((p) => p.value === v);
}

/** Mapeia uma faixa para a classe legal SEBRAE (MEI/ME/EPP/Media/Grande) —
 *  útil para CRM/lead que ainda guarda o valor enxuto. */
export function porteToClasseLegal(
  v: PorteValue
): "MEI" | "ME" | "EPP" | "Media" | "Grande" {
  switch (v) {
    case "1-2":
      return "MEI";
    case "3-9":
      return "ME";
    case "10-49":
      return "EPP";
    case "50-99":
    case "100-249":
      return "Media";
    case "250+":
      return "Grande";
  }
}
