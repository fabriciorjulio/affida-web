/**
 * Parser robusto para upload em massa de beneficiários no wizard de saúde.
 *
 * Aceita CSV, TSV (paste direto do Excel) e TXT delimitado. Para empresas
 * maiores (50+ vidas) preencher 1-a-1 é inviável — esta camada permite
 * importar de uma planilha em segundos.
 *
 * Princípios:
 *   • Tolerante: aceita variações de header (Nome / NOME / nome completo),
 *     formatos de data brasileiros e ISO, sexo escrito por extenso ou letra,
 *     parentesco em PT/EN com pequenas variações.
 *   • Honesto: retorna por linha o que conseguiu parsear E os erros — quem
 *     decide importar ou pedir correção é o usuário.
 *   • Sem dependências externas: parser CSV nativo (vírgula/ponto-vírgula/tab),
 *     sem pacote `papaparse` ou `xlsx` no bundle. Para .xlsx puro, instruímos
 *     a usuária a exportar como CSV no Excel/Google Sheets.
 */

export type ImportParentesco = "titular" | "conjuge" | "filho" | "dependente";
export type ImportSexo = "F" | "M";

export type ImportedRow = {
  /** índice 1-based original na planilha (para exibir "linha 7 inválida") */
  rowIndex: number;
  /** linha bruta indexada por header detectado (debug/preview) */
  raw: Record<string, string>;
  /** campos normalizados — undefined quando inválido */
  nome?: string;
  dataNascimento?: string; // ISO YYYY-MM-DD
  sexo?: ImportSexo;
  parentesco?: ImportParentesco;
  /** erros de parse por campo */
  errors: string[];
};

export type ParseResult = {
  rows: ImportedRow[];
  /** linhas que estão prontas para importar (sem erros bloqueantes) */
  validRows: ImportedRow[];
  /** quantidade total de linhas detectadas (sem header) */
  totalRows: number;
  /** separador detectado: "," ";" ou "\t" */
  delimiter: "," | ";" | "\t";
  /** mapeamento header-original → campo canônico */
  headerMap: Record<string, "nome" | "dataNascimento" | "sexo" | "parentesco" | "ignorado">;
};

// ---------------------------------------------------------------------------
// Normalização de headers
// ---------------------------------------------------------------------------
function stripAccents(s: string): string {
  // Remove diacríticos (U+0300 a U+036F = bloco "Combining Diacritical Marks")
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}
function slug(s: string): string {
  return stripAccents(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

const HEADER_ALIASES: Record<string, "nome" | "dataNascimento" | "sexo" | "parentesco"> = {
  // nome
  nome: "nome",
  nome_completo: "nome",
  beneficiario: "nome",
  beneficiaria: "nome",
  vida: "nome",
  // data de nascimento
  data_nascimento: "dataNascimento",
  data_de_nascimento: "dataNascimento",
  nascimento: "dataNascimento",
  dt_nascimento: "dataNascimento",
  data_nasc: "dataNascimento",
  dob: "dataNascimento",
  birthdate: "dataNascimento",
  data: "dataNascimento",
  // sexo
  sexo: "sexo",
  genero: "sexo",
  gender: "sexo",
  sex: "sexo",
  // parentesco
  parentesco: "parentesco",
  tipo: "parentesco",
  relacao: "parentesco",
  vinculo: "parentesco",
  dependencia: "parentesco",
};

function classifyHeader(raw: string): "nome" | "dataNascimento" | "sexo" | "parentesco" | "ignorado" {
  const k = slug(raw);
  return HEADER_ALIASES[k] ?? "ignorado";
}

// ---------------------------------------------------------------------------
// Parser de campos
// ---------------------------------------------------------------------------

/** Aceita DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, DD/MM/YY (assume 19xx/20xx). */
export function parseBirthDate(input: string): string | null {
  const s = (input ?? "").trim();
  if (!s) return null;

  // ISO YYYY-MM-DD
  const iso = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    const [, y, m, d] = iso;
    return formatISO(+y, +m, +d);
  }

  // BR DD/MM/YYYY ou DD-MM-YYYY
  const br = s.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})$/);
  if (br) {
    let [, d, m, y] = br;
    let yi = +y;
    if (y.length === 2) {
      // 26 → 2026? 75 → 1975. Cutoff: 30
      yi = yi <= 30 ? 2000 + yi : 1900 + yi;
    }
    return formatISO(yi, +m, +d);
  }

  return null;
}

function formatISO(year: number, month: number, day: number): string | null {
  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    year < 1900 ||
    year > 2100 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }
  // sanity: data válida (não é 31/02)
  const dt = new Date(year, month - 1, day);
  if (
    dt.getFullYear() !== year ||
    dt.getMonth() !== month - 1 ||
    dt.getDate() !== day
  ) {
    return null;
  }
  // não pode ser futuro
  if (dt > new Date()) return null;
  return `${year.toString().padStart(4, "0")}-${month
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export function parseSexo(input: string): ImportSexo | null {
  const s = slug(input);
  if (!s) return null;
  if (["f", "fem", "feminino", "feminina", "female", "mulher"].includes(s)) return "F";
  if (["m", "masc", "masculino", "male", "homem"].includes(s)) return "M";
  return null;
}

export function parseParentesco(input: string): ImportParentesco | null {
  const s = slug(input);
  if (!s) return null;
  if (["titular", "responsavel", "holder", "principal"].includes(s)) return "titular";
  if (
    [
      "conjuge",
      "esposa",
      "esposo",
      "marido",
      "mulher",
      "companheiro",
      "companheira",
      "spouse",
      "parceiro",
      "parceira",
    ].includes(s)
  )
    return "conjuge";
  if (["filho", "filha", "child", "filhos", "filhas"].includes(s)) return "filho";
  if (
    [
      "dependente",
      "outro",
      "outros",
      "agregado",
      "neto",
      "neta",
      "pai",
      "mae",
      "irmao",
      "irma",
    ].includes(s)
  )
    return "dependente";
  return null;
}

// ---------------------------------------------------------------------------
// Detector de delimitador
// ---------------------------------------------------------------------------
function detectDelimiter(firstLine: string): "," | ";" | "\t" {
  const tab = (firstLine.match(/\t/g) ?? []).length;
  const semi = (firstLine.match(/;/g) ?? []).length;
  const comma = (firstLine.match(/,/g) ?? []).length;
  // Excel paste usa TAB, CSV BR usa ; (ponto-vírgula), CSV US usa ,
  if (tab >= semi && tab >= comma && tab > 0) return "\t";
  if (semi >= comma && semi > 0) return ";";
  return ",";
}

// ---------------------------------------------------------------------------
// Tokenizer respeitando aspas
// ---------------------------------------------------------------------------
function splitRow(line: string, delim: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          // escaped quote
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delim) {
        out.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
  }
  out.push(cur);
  return out.map((c) => c.trim());
}

// ---------------------------------------------------------------------------
// Parser principal
// ---------------------------------------------------------------------------
export function parseBeneficiarios(text: string): ParseResult {
  // CUIDADO: NÃO usar `.trim()` por linha — isso elimina TABs iniciais e quebra
  // o caso "primeira coluna vazia" comum em paste do Excel. Removemos apenas
  // o \r de cada linha (final de linha Windows) e filtramos linhas que são
  // de fato vazias após retirar SOMENTE espaços e tabs colaterais.
  const lines = text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .filter((l) => l.replace(/[\s\t]/g, "").length > 0);

  if (lines.length === 0) {
    return {
      rows: [],
      validRows: [],
      totalRows: 0,
      delimiter: ",",
      headerMap: {},
    };
  }

  const delimiter = detectDelimiter(lines[0]);
  const rawHeaders = splitRow(lines[0], delimiter);
  const headerMap: ParseResult["headerMap"] = {};
  rawHeaders.forEach((h) => {
    headerMap[h] = classifyHeader(h);
  });

  // Detecta se a primeira linha é header (tem ao menos um header reconhecido)
  // ou se já é dado (assume colunas posicionais: nome, data, sexo, parentesco).
  const hasHeader = Object.values(headerMap).some((v) => v !== "ignorado");
  const dataLines = hasHeader ? lines.slice(1) : lines;

  // Mapeia índice de coluna → campo canônico
  const colToField: Record<number, "nome" | "dataNascimento" | "sexo" | "parentesco"> = {};
  if (hasHeader) {
    rawHeaders.forEach((h, i) => {
      const f = classifyHeader(h);
      if (f !== "ignorado") colToField[i] = f;
    });
  } else {
    // Sem header: assume ordem nome, data, sexo, parentesco
    ["nome", "dataNascimento", "sexo", "parentesco"].forEach((f, i) => {
      colToField[i] = f as "nome" | "dataNascimento" | "sexo" | "parentesco";
    });
    headerMap["coluna_1"] = "nome";
    headerMap["coluna_2"] = "dataNascimento";
    headerMap["coluna_3"] = "sexo";
    headerMap["coluna_4"] = "parentesco";
  }

  const rows: ImportedRow[] = dataLines.map((line, idx) => {
    const cells = splitRow(line, delimiter);
    const raw: Record<string, string> = {};
    rawHeaders.forEach((h, i) => {
      raw[h || `col_${i + 1}`] = cells[i] ?? "";
    });

    const errors: string[] = [];
    let nome: string | undefined;
    let dataNascimento: string | undefined;
    let sexo: ImportSexo | undefined;
    let parentesco: ImportParentesco | undefined;

    for (const [colStr, field] of Object.entries(colToField)) {
      const col = +colStr;
      const v = (cells[col] ?? "").trim();
      if (!v && field !== "nome") continue;

      switch (field) {
        case "nome":
          if (v) nome = v;
          break;
        case "dataNascimento": {
          const d = parseBirthDate(v);
          if (d) {
            dataNascimento = d;
          } else {
            errors.push(`data inválida: "${v}"`);
          }
          break;
        }
        case "sexo": {
          const s = parseSexo(v);
          if (s) {
            sexo = s;
          } else {
            errors.push(`sexo inválido: "${v}"`);
          }
          break;
        }
        case "parentesco": {
          const p = parseParentesco(v);
          if (p) {
            parentesco = p;
          } else {
            errors.push(`parentesco inválido: "${v}"`);
          }
          break;
        }
      }
    }

    // Validações de campos obrigatórios:
    if (!dataNascimento) errors.push("data de nascimento ausente");
    if (!sexo) errors.push("sexo ausente");
    if (!parentesco) {
      // padrão: dependente (não bloqueante para titular ser declarado)
      parentesco = "dependente";
    }

    return {
      rowIndex: (hasHeader ? idx + 2 : idx + 1),
      raw,
      nome,
      dataNascimento,
      sexo,
      parentesco,
      errors,
    };
  });

  const validRows = rows.filter(
    (r) => r.errors.length === 0 && r.dataNascimento && r.sexo
  );

  return {
    rows,
    validRows,
    totalRows: rows.length,
    delimiter,
    headerMap,
  };
}

/**
 * Template CSV para download — exatamente os 4 campos com 3 exemplos
 * representativos (titular + cônjuge + filho), formatos brasileiros.
 */
export const CSV_TEMPLATE = [
  "nome,data_nascimento,sexo,parentesco",
  "Maria Silva,15/03/1985,F,titular",
  "João Silva,22/06/1987,M,conjuge",
  "Pedro Silva,10/01/2015,M,filho",
].join("\n");
