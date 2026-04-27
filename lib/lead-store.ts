/**
 * Persistência placeholder de leads vindos do site público para o CRM.
 *
 * Como o site é static export sem backend, leads gerados pelo wizard de
 * cotação ou pelo cadastro de indicador são salvos em localStorage
 * (key `affida_leads`) e LIDOS pelo CRM (/crm/leads e /crm/pipeline)
 * para aparecerem misturados aos leads mock.
 *
 * Quando o backend FastAPI estiver de pé, é só trocar `addLead` por um
 * POST /api/leads e `getLocalLeads` pelo fetch correspondente. A API
 * pública dos componentes consumidores não muda.
 */

const KEY = "affida_leads";

export type LocalLeadOrigin =
  | "cotacao_saude"
  | "cotacao_outros"
  | "indicador"
  | "manual";

export type LocalLead = {
  id: string;
  createdAt: string; // ISO
  origin: LocalLeadOrigin;
  /** Nome da empresa ou do indicador */
  nome: string;
  cnpj?: string;
  cnae?: string;
  setor?: string;
  vidas?: number;
  produto?: string; // ex: "Saúde Coletiva"
  contact: {
    nome: string;
    email: string;
    telefone: string;
    cargo?: string;
  };
  /** Código de indicação (?ref=IND-XXXX) se vier de um link de indicador */
  refCode?: string;
  /** Resumo curto pra exibir na lista do CRM */
  observacao?: string;
};

function readAll(): LocalLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(leads: LocalLead[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(leads));
  } catch {
    /* quota cheia / modo privado: sem ação */
  }
}

export function addLead(lead: Omit<LocalLead, "id" | "createdAt">): LocalLead {
  const full: LocalLead = {
    ...lead,
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
  };
  const all = readAll();
  all.unshift(full); // mais recente primeiro
  writeAll(all);
  return full;
}

export function getLocalLeads(): LocalLead[] {
  return readAll();
}

export function clearLocalLeads() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
