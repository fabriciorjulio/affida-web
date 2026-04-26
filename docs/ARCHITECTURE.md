# Arquitetura Técnica — Affida

> **Documento derivado** do PDF Conselho (D5) · 25-abr-2026
> **Cadência:** revisão trimestral conforme stack evolui
> **Owner:** Tech lead

---

## 1. Stack-alvo (multi-pilar)

```
┌──────────────────────────────────────────────────────────────────┐
│ Camada de UI                                                     │
├──────────────────────────────────────────────────────────────────┤
│ Site público / wizard cotação    → Next.js 14 (SSG) + edge cache │
│ Portal cliente PME               → Next.js (SSR auth)            │
│ CRM interno                      → Next.js (SSR auth + RBAC)     │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Camada de API                                                    │
├──────────────────────────────────────────────────────────────────┤
│ FastAPI (Python) + OpenAPI 3.1                                   │
│ ─ rate-limit (slowapi/redis)                                     │
│ ─ audit log (append-only)                                        │
│ ─ OAuth2 / OIDC (Auth0 ou Clerk)                                 │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Camada de dados                                                  │
├──────────────────────────────────────────────────────────────────┤
│ Postgres (transacional)          → RLS por tenant, encrypt rest  │
│ Object storage (S3/R2)           → docs, propostas, anexos LGPD  │
│ Data lake (S3 + Apache Iceberg)  → bronze/silver/gold benchmark  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Camada de RPA                                                    │
├──────────────────────────────────────────────────────────────────┤
│ Orquestrador                     → Temporal ou n8n self-hosted   │
│ Workers headless                 → Playwright em containers      │
│ Fila de jobs                     → Redis/RabbitMQ + retry idemp. │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Camada de IA                                                     │
├──────────────────────────────────────────────────────────────────┤
│ LLM gateway                      → Litellm/Portkey + guardrails  │
│ RAG sobre rede credenciada       → Postgres pgvector             │
│ Evals contínuos                  → Prompt regression suite       │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Camada financeira                                                │
├──────────────────────────────────────────────────────────────────┤
│ Ledger interno (double-entry)    → Postgres + view materializada │
│ Integração SCD/IP parceiro       → API REST + webhooks com HMAC  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ Observabilidade & segurança                                      │
├──────────────────────────────────────────────────────────────────┤
│ Logs                             → OpenTelemetry → Grafana Loki  │
│ Métricas                         → Prometheus                    │
│ Audit trail imutável             → Append-only table + hash chain│
│ Secrets                          → Doppler/Infisical (não env)   │
│ DLP                              → regex + classificador CPF/CNPJ│
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Padrões mandatórios

### 2.1 Contracts-first entre pilares
- **OpenAPI 3.1 por boundary** (corretora ↔ CRM ↔ financeira ↔ RPA).
- **Quebra de contrato = build red.** Schema dual em CI:
  - Contrato versionado em `/specs/<pilar>.openapi.yaml`.
  - PR que altera schema sem migração explícita falha.

### 2.2 Outbox pattern entre pilares
- **Sem distributed transaction.** Cada escrita externa (corretora → CRM,
  CRM → financeira) usa outbox table local + worker que publica eventos.
- Garante consistência eventual + permite replay em caso de falha.
- Implementação: tabela `events_outbox` por serviço + worker Celery/Temporal.

### 2.3 Idempotência em toda escrita externa
- **RPA é o pior caso:** triggers duplicados destroem operação
  (cadastrar 2× a mesma vida no portal da operadora).
- Toda chamada externa precisa de **idempotency-key** + dedup window.
- Padrão: `Idempotency-Key: <uuid>` no header, persistido em Redis 24h.

### 2.4 Tenant isolation
- **Single-tenant hoje, mas:** toda tabela tem `tenant_id` e RLS (Row
  Level Security) ativo no Postgres.
- **Por quê agora?** Barato implementar no schema inicial; caríssimo
  retrofitar quando crescermos para multi-corretora ou para vender o
  CRM como produto (Wave 4+).

```sql
-- Exemplo de RLS
CREATE POLICY tenant_isolation ON apolices
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
ALTER TABLE apolices ENABLE ROW LEVEL SECURITY;
```

### 2.5 PII tagging em schema
- **Column comments** marcam dados sensíveis (LGPD Art. 5).
- DLP no logger usa esses tags para mascarar em produção.

```sql
COMMENT ON COLUMN beneficiarios.cpf IS 'PII:CPF';
COMMENT ON COLUMN beneficiarios.data_nascimento IS 'PII:SENSITIVE_HEALTH';
```

---

## 3. Setup mínimo (Wave 1, D+60)

Para entrar em produção real com 10 contratos:

| Componente | Provedor sugerido | Custo estimado/mês |
|---|---|---|
| Hosting backend | Railway (Hobby) | $20-30 |
| Postgres managed | Railway Postgres ou Neon | $20 |
| Object storage | Cloudflare R2 | $5-10 |
| Redis (rate-limit + idempotency) | Upstash | $0-10 (free tier) |
| Auth | Clerk ou Auth0 free | $0 (até 10k users) |
| Secrets | Doppler free | $0 |
| Observabilidade básica | Railway logs + Sentry free | $0-26 |
| **Total Wave 1** | | **~$70-100/mês** |

### Setup Wave 2 (D+150, com financeira + RPA)
- Adicionar Temporal Cloud ou self-hosted: $0 (self) ou $200/mês
- Workers Playwright em container (Railway): $20-50/mês
- LLM gateway (LiteLLM self-hosted): $0 (infra) + custo por token
- **Total Wave 2:** ~$250-400/mês

---

## 4. Migração da arquitetura atual

### Hoje (commit atual)
- **Stack:** Next.js 14 static export → GitHub Pages
- **Backend:** ZERO (todos os dados são mock)
- **Auth:** ZERO (não há login real)
- **Compliance:** SUSEP-light (banner referencial), LGPD declaração

### Wave 1 alvo (D+60)
1. **Manter** o frontend Next.js como está (serve o site institucional + wizard).
2. **Adicionar** projeto FastAPI em paralelo: `~/Developer/affida/api/`.
3. **Conectar** wizard de cotação ao backend via `fetch()` + JSON.
4. **Persistir** leads e cotações em Postgres (substituir mock).
5. **Auth:** Clerk para portal cliente + CRM (Google + Apple + LinkedIn social
   sign-in cobre o pedido pendente do Conselho de "login social").

### Wave 2 alvo (D+150)
- Adicionar **Temporal** para orquestrar RPA.
- Workers **Playwright** em container fazendo cotação multi-operadora,
  inclusão/exclusão de vidas, conciliação.
- **LLM gateway** para extração de dados de PDFs de operadoras + chatbot
  do portal.
- **Ledger** double-entry para financeira white-label.

### Wave 3 alvo (D+365)
- 4 operadoras com API direta.
- RPA cobrindo 90% da operação.
- Open Insurance SPOC ativo.
- Embedded finance v0 com SCD parceiro.

---

## 5. KPIs de arquitetura

| KPI | Meta |
|---|---|
| Uptime mensal | ≥ 99,5% |
| p95 latência cotação | < 3s |
| Zero leak de PII em log (verificado por DLP) | 0 incidentes |
| Audit log completude | 100% das transações |
| Tempo de deploy (CI → produção) | < 10 min |
| MTTR (mean time to recovery) em incidente | < 1h |

---

## 6. Decisões de arquitetura ADR (a abrir)

Toda decisão arquitetural significativa (escolha de stack, padrão,
trade-off) vai num **ADR** versionado em `/docs/adr/<NNN>-titulo.md`:

- 001 · Por que FastAPI e não Node.js
- 002 · Por que Postgres e não Mongo
- 003 · Por que Temporal e não Celery puro
- 004 · Por que static export + backend separado vs. Next.js fullstack
- 005 · Por que Clerk e não OAuth manual
- 006 · Por que outbox pattern e não distributed transaction
- 007 · Por que RLS desde dia zero

---

## 7. Próximos passos imediatos (post-CNPJ)

1. **Provisionar** Railway + Postgres + Cloudflare R2.
2. **Criar** repo `affida-api` (FastAPI + alembic + pytest).
3. **Implementar** auth via Clerk + tabelas core (tenants, users,
   leads, cotacoes, apolices, beneficiarios, eventos_outbox).
4. **Migrar** wizard de cotação para usar API real.
5. **Persistir** o primeiro lead end-to-end.

**Bloqueador externo:** financiamento da infra (~$100/mês inicial) e
decisão sobre stack auth (Clerk vs. self-hosted Hanko/Supabase).
