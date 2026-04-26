# Matriz Regulatória — Affida PME

> **Documento derivado** do PDF Conselho (D6) · 25-abr-2026
> **Cadência:** revisão trimestral · **Owner:** DPO + Compliance + Jurídico
> **KPI:** zero não-conformidade aberta por > 30 dias · auditoria interna semestral

---

## 1. Matriz consolidada

| # | Frente | Norma de referência | Ação concreta | Prazo (D+) | Owner | Status |
|---|---|---|---|---|---|---|
| 1 | **Corretagem** | Lei 4.594/64 + CNSP 382/2020 + Circular SUSEP 657/2022 | CNPJ Affida + registro PJ corretora + responsável técnico habilitado | D+30 | Sócio + advogado SUSEP | ⏸ Pendente |
| 2 | **Código operadora** | Contrato comercial (Bradesco + Amil) | Código de corretagem aberto em ≥ 2 operadoras prioritárias | D+30 | Diretor comercial | ⏸ Pendente |
| 3 | **Saúde — planos coletivos** | ANS RN 195/2009 | Modelos contratuais aprovados + contrato-tipo registrado | D+45 | Jurídico | ⏸ Pendente |
| 4 | **Saúde — pool de risco** | ANS RN 309/2012 | Documento explicando regra ao cliente PME ≤ 29 vidas (impacto da composição etária) | D+30 | Compliance | ⏸ Pendente |
| 5 | **Saúde — faixas etárias** | ANS RN 63/2003 | Cálculo do wizard auditado (10 faixas + multiplicadores conforme tabela ANS) | D+15 | Tech + Compliance | 🔄 Em andamento |
| 6 | **Saúde — portabilidade** | ANS RN 252/2011 + RN 438/2018 | Fluxo de portabilidade no CRM e no portal do cliente | D+90 | Tech + Compliance | ⏸ Pendente |
| 7 | **Saúde — rede credenciada** | ANS RN 432/2017 | Disclaimer de rede + integração futura com base RN 432 | D+60 | Tech + Compliance | ⏸ Pendente |
| 8 | **Saúde — dados públicos** | ANS RN 412/2016 | Pipeline de consumo dos dados públicos para benchmark setorial | D+180 | Data eng | ⏸ Pendente |
| 9 | **Dados pessoais (LGPD)** | LGPD + ANPD Guias (saúde) | DPO designado + RIPD assinado + base legal por finalidade + retention policy + plano de incidente | D+30 | DPO + jurídico | ⏸ Pendente |
| 10 | **Open Insurance** | Resolução CNSP 415/2021 + manuais SPOC | Dossiê de credenciamento como SPOC (fase prática 2026) | D+180 | Compliance | ⏸ Pendente |
| 11 | **Consumidor** | CDC Art. 6º, 30, 31, 39 | Auditoria de toda copy de marketing por advogado | D+30 | Jurídico | ⏸ Pendente |
| 12 | **Antifraude** (financeira) | COAF + Lei 9.613/98 | KYC + monitoramento transacional na financeira (Wave 2) | D+150 | Financeira + Compliance | ⏸ Pendente |

---

## 2. Detalhamento por frente

### Frente 1 · Corretagem (SUSEP)

**Marco regulatório:** Lei 4.594/1964 (regulação de corretores) +
CNSP 382/2020 (registro de PJ) + Circular SUSEP 657/2022 (cadastro digital).

**Requisitos:**
- CNPJ ativo da PJ corretora.
- Registro na SUSEP como PJ corretora.
- Responsável técnico habilitado pela ENS (Escola Nacional de Seguros)
  vinculado ao CNPJ.
- Caução / patrimônio mínimo conforme tabela SUSEP.

**Bloqueador real:** prazo de análise SUSEP. Em geral 30-60 dias após
documentação completa, mas pode estender para 90.

**Ações:**
1. Contratar advogado SUSEP especialista (3 nomes: ver §6).
2. Submeter dossiê de PJ + responsável técnico.
3. Acompanhar via Diário Oficial.

### Frente 5 · ANS RN 63/2003 — faixas etárias

**Já implementado parcialmente:** o wizard de saúde (`QuoteWizardSaude`)
calcula mensalidade por 10 faixas etárias com multiplicadores. Falta:
- **Auditoria oficial** dos multiplicadores contra a tabela ANS de cada
  operadora (multiplicadores variam dentro de uma banda regulada).
- **Registro de auditoria** (timestamp, advogado responsável).

### Frente 9 · LGPD

**RIPD-modelo** (Relatório de Impacto à Proteção de Dados Pessoais)
pendente para o wizard de saúde — coleta data de nascimento, sexo,
parentesco e plano atual, todos dados sensíveis (Art. 5º II + 11 LGPD).

**Componentes mínimos do RIPD-saúde:**
1. **Identificação do controlador:** Affida Partners Corretora
2. **DPO:** nome + e-mail + telefone
3. **Finalidades específicas:**
   - Cotação de plano de saúde empresarial
   - Contato consultivo
   - Geração de proposta vinculativa pela operadora
4. **Bases legais (Art. 7 LGPD):**
   - Execução de contrato e diligências pré-contratuais (Art. 7 V)
   - Cumprimento de obrigação legal/regulatória — SUSEP/ANS (Art. 7 II)
   - Legítimo interesse para benchmark anonimizado (Art. 7 IX) — com
     opt-out claro
5. **Dados sensíveis:** data de nascimento, sexo, parentesco, plano
   atual. Anonimização para benchmark.
6. **Retenção:** apólices ativas → enquanto durar o contrato. Após
   encerramento → 5 anos (prazos SUSEP/fiscais), depois eliminação.
7. **Compartilhamento:** apenas operadoras parceiras para efetivação
   de cotação. Não venda de dados.
8. **Direitos do titular:** acesso, correção, anonimização, exclusão,
   portabilidade. Resposta em até 15 dias via dpo@affida.com.br.
9. **Plano de incidente:** notificação à ANPD em 72h + comunicação ao
   titular conforme severidade.
10. **Tecnologia:** TLS 1.3 em trânsito + encryption at rest + audit log
    imutável + DLP no logger.

### Frente 11 · CDC

**O que precisa ser auditado:**
- Toda copy de oferta da home (`hero.tsx`, `pillars.tsx`, `products-grid.tsx`).
- Microcopy do wizard (`quote-wizard.tsx`, `quote-wizard-saude.tsx`).
- Promessas de SLA (lead→vigência ≤ 72h) — só publicar após Wave 2
  com dados próprios.
- Política de privacidade (`/legal/privacidade`) e Termos (`/legal/termos`).

**Ações imediatas (já feitas):**
- ✅ Banner "Estimativa referencial" em todos os comparativos do wizard.
- ✅ Prefixo "≈" nos preços.
- ✅ CTA "Falar com consultor" em vez de "Contratar".
- ✅ Disclaimer "isto não constitui proposta SUSEP até emissão formal
  pela operadora".

**Pendente:** auditoria formal por advogado consumerista (D+30).

---

## 3. Não-conformidades em monitoramento

Hoje (D-zero, 25-abr-2026): **n/a** — operação ainda não em produção real.

A partir do CNPJ ativo, abrir tracker de não-conformidades em
`/docs/COMPLIANCE_LOG.md` com: data abertura, frente, severidade,
plano de remediação, prazo, status.

---

## 4. KPIs

- ✅ Matriz regulatória revisada **trimestralmente**.
- ✅ Zero não-conformidade aberta por **> 30 dias**.
- ✅ Auditoria interna **semestral**.
- ✅ Plano de incidente testado **1× por ano** (drill).

---

## 5. Kill criterion conectado

> **A qualquer momento, notificação de ANS, SUSEP, ANPD ou Procon:**
> - Congelar operação afetada
> - Parecer jurídico independente
> - Plano de remediação aprovado pelo Conselho antes de retomar

(PDF Conselho · seção 4 · Kill criteria revistos)

---

## 6. Vendors / parceiros sugeridos

### Advogado SUSEP
- (a definir) — buscar 3 escritórios especialistas em corretora

### DPO terceirizado
- (a definir) — caso opte por DPO externo nos primeiros 12 meses

### Auditoria CDC / consumerista
- (a definir) — escritório com prática em fintech / insurtech

### Compliance ANS
- (a definir) — consultoria especialista em planos coletivos

---

## 7. Próxima atualização

Trimestral. Próxima: **25-jul-2026** com:
- Status de cada frente atualizado
- Não-conformidades abertas/fechadas
- Mudanças regulatórias detectadas pelo signal-detection (`MARKET.md`)
