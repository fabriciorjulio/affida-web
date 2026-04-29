/**
 * Extração de texto de fatura PDF do concorrente — wizard de cotação saúde.
 *
 * Pedido do dono: além de adicionar manualmente ou subir CSV, permitir
 * upload da fatura da operadora atual (PDF) e popular automaticamente
 * a lista de beneficiários.
 *
 * Estratégia client-side (static export, sem backend):
 *   1. pdfjs-dist via dynamic import — não infla o bundle main; só carrega
 *      quando o usuário clicar pra subir um PDF.
 *   2. Extrai texto bruto de todas as páginas, junta com tabulação por
 *      linha (a posição Y do item no PDF determina a linha lógica).
 *   3. Heurística pra normalizar pra um formato que o `parseBeneficiarios`
 *      existente entende (CSV/TSV) — assim reusamos toda a tolerância de
 *      formatos de data, sexo e parentesco que já está testada.
 *   4. Faturas escaneadas (PDFs sem texto extraível) caem no fallback
 *      explícito: avisa o usuário e abre o textarea pra colagem manual.
 *
 * NÃO faz OCR (Tesseract.js seria 3MB e impreciso) — a maioria das faturas
 * de operadora BR (Bradesco, Amil, SulAmérica, Unimed, Porto, Hapvida) são
 * PDFs gerados eletronicamente pelo portal, com texto extraível.
 */

export type FaturaExtractResult =
  | {
      ok: true;
      /** texto bruto concatenado de todas páginas, com \n separando linhas */
      rawText: string;
      /** texto pronto pra colar no parser CSV (com headers + 1 linha por beneficiário) */
      csvText: string;
      /** quantidade de linhas heuristicamente identificadas como beneficiário */
      detected: number;
      pageCount: number;
    }
  | {
      ok: false;
      reason:
        | "scanned"
        | "no_text"
        | "no_beneficiaries_detected"
        | "load_failed";
      /** texto extraído (se houver) — útil para o usuário copiar manualmente */
      rawText?: string;
      pageCount?: number;
    };

/**
 * Extrai e normaliza texto de uma fatura PDF.
 *
 * Estratégia:
 *   - Para cada página, agrupa items por Y (linha visual).
 *   - Junta items da mesma linha com TAB (assim o parser detecta TSV).
 *   - Filtra linhas que parecem beneficiário (têm data nascimento DD/MM/YYYY
 *     ou similar) e gera CSV pronto pra importar.
 */
export async function extractFromFaturaPdf(file: File): Promise<FaturaExtractResult> {
  // Dynamic import — só carrega o pdf.js quando precisar (evita inflar
  // o bundle main do Next.js).
  let pdfjs: typeof import("pdfjs-dist");
  try {
    pdfjs = await import("pdfjs-dist");
    // pdf.js exige um worker. Em static export o caminho não pode ser
    // resolvido pelo bundler — copiamos `pdf.worker.min.mjs` pra public/
    // e apontamos via NEXT_PUBLIC_BASE_PATH (vazio em dev, /affida-web em
    // produção GH Pages).
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    pdfjs.GlobalWorkerOptions.workerSrc = `${basePath}/pdfjs/pdf.worker.min.mjs`;
  } catch {
    return { ok: false, reason: "load_failed" };
  }

  let pdf: import("pdfjs-dist").PDFDocumentProxy;
  try {
    const buffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({
      data: new Uint8Array(buffer),
      isEvalSupported: false,
      disableFontFace: true,
    });
    pdf = await loadingTask.promise;
  } catch (err) {
    if (typeof console !== "undefined") {
      console.warn("[fatura-pdf] failed to load PDF:", err);
    }
    return { ok: false, reason: "load_failed" };
  }

  const pageCount = pdf.numPages;
  const allLines: string[] = [];

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    // Agrupa por linha (Y) — itens com Y próximo (±2px) estão na mesma linha visual.
    type Item = { str: string; x: number; y: number };
    const items: Item[] = (content.items as Array<{ str: string; transform: number[] }>)
      .filter((it) => typeof it.str === "string" && it.str.length > 0)
      .map((it) => ({
        str: it.str,
        x: it.transform[4],
        y: it.transform[5],
      }));

    items.sort((a, b) => b.y - a.y || a.x - b.x);

    // Quantiza Y em "linhas" (tolera ±2px de ruído entre items da mesma linha).
    const lines: Item[][] = [];
    for (const it of items) {
      const last = lines[lines.length - 1];
      if (last && Math.abs(last[0].y - it.y) < 2) {
        last.push(it);
      } else {
        lines.push([it]);
      }
    }
    // Re-ordena cada linha por X
    for (const line of lines) line.sort((a, b) => a.x - b.x);

    for (const line of lines) {
      // Junta items com TAB (parseBeneficiarios entende TSV)
      const text = line.map((it) => it.str.trim()).filter(Boolean).join("\t");
      if (text) allLines.push(text);
    }
    allLines.push(""); // separador de página
  }

  const rawText = allLines.join("\n");

  if (!rawText.trim()) {
    return {
      ok: false,
      reason: pageCount > 0 ? "scanned" : "no_text",
      pageCount,
    };
  }

  // Heurística: filtra linhas que têm uma data DD/MM/YYYY ou DD-MM-YYYY
  // (assinatura forte de "linha de beneficiário").
  const dateRegex = /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{2,4})\b/;
  const beneficiarioLines = allLines.filter((l) => dateRegex.test(l));

  if (beneficiarioLines.length === 0) {
    return {
      ok: false,
      reason: "no_beneficiaries_detected",
      rawText,
      pageCount,
    };
  }

  // Para cada linha de beneficiário detectada, extrai os 4 campos:
  // nome, data nascimento, sexo (M/F), parentesco — e produz CSV
  // canônico que o parseBeneficiarios consome direto.
  const csvLines = ["nome\tdata_nascimento\tsexo\tparentesco"];

  for (const line of beneficiarioLines) {
    const dataMatch = line.match(dateRegex);
    if (!dataMatch) continue;
    const dataStr = dataMatch[0];

    // Sexo: pega primeiro token "M" ou "F" isolado (boundary letter)
    const sexoMatch = line.match(/\b([MF])\b/);
    const sexo = sexoMatch ? sexoMatch[1] : "";

    // Parentesco: procura palavras comuns
    const parentescoRegex =
      /\b(titular|c[oô]njuge|esposa|esposo|companheir[oa]|filho|filha|dependente|agregado|pai|m[aã]e|irm[aã]o?)\b/i;
    const parentescoMatch = line.match(parentescoRegex);
    const parentesco = parentescoMatch ? parentescoMatch[1] : "";

    // Nome: maior pedaço de letras consecutivas (antes da data, idealmente)
    // — fallback: linha menos data/sexo/parentesco
    let nome = line
      .replace(dataRegexGlobal, "")
      .replace(/\b[MF]\b/g, "")
      .replace(parentescoRegex, "")
      .replace(/\bCPF\b[^\t]*/gi, "")
      .replace(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/g, "")
      .replace(/\t+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim();
    // Limita: usa só o trecho com letras (descarta números soltos)
    const nomeMatch = nome.match(/[A-Za-zÀ-ÿ' ]{4,}/);
    if (nomeMatch) nome = nomeMatch[0].trim();

    csvLines.push(`${nome}\t${dataStr}\t${sexo}\t${parentesco}`);
  }

  return {
    ok: true,
    rawText,
    csvText: csvLines.join("\n"),
    detected: beneficiarioLines.length,
    pageCount,
  };
}

const dataRegexGlobal = /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/g;
