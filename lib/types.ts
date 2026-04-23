export type Operator = {
  id: string;
  name: string;
  segments: ("saude" | "vida" | "odonto" | "patrimonial" | "frota" | "rc" | "pet")[];
  commissionRange: [number, number];
  lives: number;
  rating: number;
  highlights: string[];
};

export type Product = {
  id: string;
  code: string;
  name: string;
  segment: "vida" | "saude" | "odonto" | "patrimonial" | "frota" | "rc" | "pet";
  tagline: string;
  description: string;
  salesMode: "self_service" | "assisted";
  minVidas: number;
  maxVidas?: number;
  avgTicket: number;
  featured?: boolean;
  icon: string;
};

export type PipelineStage =
  | "novo"
  | "qualificado"
  | "proposta"
  | "negociacao"
  | "fechado"
  | "perdido";

export type Lead = {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  porte: "MEI" | "ME" | "EPP" | "Media";
  vidas: number;
  cnae: string;
  ramoAtividade: string;
  uf: string;
  cidade: string;
  productOfInterest: string;
  stage: PipelineStage;
  owner: string;
  source: "site" | "whatsapp" | "meta_ads" | "google_ads" | "parceiro" | "indicacao" | "organico";
  sourceDetail?: string;
  score: number;
  estimatedPremium: number;
  estimatedCommission: number;
  createdAt: string;
  lastTouchAt: string;
  nextActionAt?: string;
  nextAction?: string;
  contact: {
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
  };
};

export type Client = {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  porte: "MEI" | "ME" | "EPP" | "Media";
  cnae: string;
  ramoAtividade: string;
  uf: string;
  cidade: string;
  vidas: number;
  sinceAt: string;
  owner: string;
  segments: string[];
  monthlyRevenue: number;
  status: "ativo" | "em_renovacao" | "churn_risk" | "inadimplente";
  nps?: number;
};

export type Policy = {
  id: string;
  clientId: string;
  product: string;
  operatorId: string;
  plano: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  premioMensal: number;
  comissaoPercent: number;
  vidas: number;
  status: "ativa" | "em_renovacao" | "cancelada" | "suspensa";
  coparticipacao: "sem" | "parcial" | "total";
  acomodacao?: "enfermaria" | "apartamento";
  abrangencia?: "local" | "regional" | "nacional";
};

export type ReofferTrigger = {
  id: string;
  policyId: string;
  clientId: string;
  type:
    | "aniversario_60d"
    | "aniversario_30d"
    | "reajuste_anunciado"
    | "mudanca_comissao"
    | "mudanca_porte"
    | "concorrente_mais_barato"
    | "sinistralidade_alta";
  severity: "info" | "medium" | "high";
  detectedAt: string;
  title: string;
  rationale: string;
  suggestedAction: string;
  potentialRevenue?: number;
  status: "aberto" | "em_atuacao" | "convertido" | "descartado";
  owner?: string;
};

export type Campaign = {
  id: string;
  name: string;
  channel: "meta" | "google" | "linkedin" | "whatsapp" | "email" | "parceiros";
  product: string;
  status: "ativa" | "pausada" | "encerrada";
  startedAt: string;
  budget: number;
  spent: number;
  leads: number;
  mql: number;
  sql: number;
  won: number;
  cac: number;
  cpl: number;
};

export type Partner = {
  id: string;
  name: string;
  tipo: "contador" | "associacao" | "afiliado" | "influenciador" | "sindicato";
  uf: string;
  indications: number;
  converted: number;
  commissionShare: number;
  earnedYtd: number;
  status: "ativo" | "onboarding" | "pausado";
};

export type Activity = {
  id: string;
  leadId?: string;
  clientId?: string;
  type: "call" | "whatsapp" | "email" | "meeting" | "note" | "quote_sent" | "proposal_viewed";
  title: string;
  description?: string;
  by: string;
  at: string;
};

export type QuotePackage = {
  id: string;
  operatorId: string;
  plano: string;
  acomodacao?: string;
  coparticipacao?: "sem" | "parcial" | "total";
  abrangencia?: string;
  reembolsoConsulta?: number;
  valorMensalPorVida: number;
  valorMensalTotal: number;
  carencia: Record<string, string>;
  redeDestaque?: string[];
  promocoes?: string[];
};

export type Quote = {
  id: string;
  leadId?: string;
  clientId?: string;
  product: string;
  createdAt: string;
  expiresAt: string;
  vidas: number;
  faixas: { label: string; count: number }[];
  packages: QuotePackage[];
  status: "rascunho" | "enviada" | "aceita" | "rejeitada" | "expirada";
};
