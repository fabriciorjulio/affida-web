# Org Chart & RACI — Affida

> **Documento derivado** do PDF Conselho (D8) · 25-abr-2026
> **KPI:** ≥ 4 áreas com responsável distinto · reuniões de KPI semanais ·
> BCP testado 1× por semestre

---

## 1. Estrutura organizacional formal (alvo)

```
                          CONSELHO
                              │
                            CEO/Sócio
                              │
        ┌──────────┬──────────┼──────────┬──────────┐
        │          │          │          │          │
   Corretora     CRM        RPA      Financeira  Jurídico
   (Comercial)  (Tech)     (Tech)    (Head Fin.) (DPO+Compliance)
        │          │          │          │
   Closer       Eng. de    Eng. RPA   Op. crédito
   Senior       backend    Playwright  (futuro)
   Closer       Eng. de
   Pleno        frontend       │
        │          │          │
   Head de       Data eng (transversal)
   parcerias        │
        │       Analytics
   Acct          BI
   Manager
   parceiros
```

### 4 pilares + 2 áreas-suporte

| Área | Função | Tamanho mínimo MVP | Tamanho Wave 3 |
|---|---|---|---|
| **Corretora** | Origem de carteira regulada | 1 closer + 1 head parcerias | +2 closers + 1 acct manager |
| **CRM (Tech)** | Espinha dorsal de dados/relacionamento | 1 fullstack | +1 frontend, +1 fullstack |
| **RPA (Tech)** | Automação cotação/emissão/conciliação | 1 RPA dev | +1 RPA dev |
| **Financeira** | Antecipação + parcelamento (Wave 2) | 0 (parceiro white-label) | +1 head financeira |
| **Jurídico/Compliance** | DPO + matriz regulatória | DPO terceirizado | +1 advogado interno |
| **Dados (transversal)** | Pipeline ANS + benchmark + observabilidade | 0 (eng backend faz) | +1 data engineer |

**Total:** 5 pessoas no MVP (Wave 1) → ~12 pessoas em Wave 3.

> ⚠️ **Risco do PDF (§6.1):** "4 pilares em paralelo exigem time de 8-15
> pessoas no mínimo. Se time real < 5 pessoas → sequenciar (corretora →
> CRM → RPA → financeira), NÃO paralelizar."

---

## 2. Separação obrigatória CEO ≠ Responsável Técnico SUSEP

**PDF D8 ação 2:** "Habilitar responsável técnico SUSEP **distinto do CEO** —
separação obrigatória para escala."

- CEO/Sócio: visão estratégica, captação, conselho.
- Responsável técnico SUSEP: habilitado pela ENS, vinculado ao registro
  da PJ. Pessoa diferente.

Sugestão: contratar consultor SUSEP sênior com habilitação para ocupar
a função enquanto não há corpo técnico interno (custo: R$ 5-10k/mês).

---

## 3. KPIs em pirâmide (north star → leading → lagging) por pilar

### Corretora

| Tipo | KPI | Meta D+90 | Meta D+180 | Meta D+365 |
|---|---|---|---|---|
| **North star** | Carteira ativa (apólices saúde PME) | 10 | 50 | 200 |
| **Leading** | Leads qualificados/mês | 80 | 200 | 500 |
| **Leading** | Cotações geradas/mês | 40 | 100 | 250 |
| **Lagging** | Close-rate em lead qualificado | 3-5% | 5-8% | 8-12% |
| **Lagging** | MRR de prêmio sob gestão | R$ 80k | R$ 400k | R$ 1,6M |

### CRM (Tech)

| Tipo | KPI | Meta |
|---|---|---|
| **North star** | 100% dos leads em DB persistente | D+60 |
| **Leading** | Uptime do CRM | ≥ 99,5% mensal |
| **Lagging** | p95 latência de cotação | < 3s |

### RPA

| Tipo | KPI | Meta D+90 | Meta D+180 | Meta D+365 |
|---|---|---|---|---|
| **North star** | Apólices automatizadas e2e via RPA | 30% | 70% | 90% |
| **Leading** | Tempo médio inclusão/exclusão de vidas | < 3 min | < 2 min | < 60s |
| **Lagging** | Comissão não-conciliada | n/a | < 1% | < 0,5% |

### Financeira (Wave 2+)

| Tipo | KPI | Meta D+150 | Meta D+365 |
|---|---|---|---|
| **North star** | Antecipação operada | 1ª antecipação | 30% dos parceiros usam |
| **Leading** | Volume de prêmio antecipado | — | R$ 200k/mês |
| **Lagging** | Spread médio | — | ≥ 1,2%/mês |

### Jurídico/Compliance

| Tipo | KPI | Meta |
|---|---|---|
| **North star** | Não-conformidades > 30 dias abertas | 0 |
| **Leading** | Frentes regulatórias em dia (12) | 12/12 |
| **Lagging** | Auditoria interna semestral concluída | 1× por semestre |

**Cadência de revisão:** semanal por pilar; mensal consolidada para o Conselho.

---

## 4. RACI por release

Template para preencher em cada release de produto (sprint quinzenal):

| Tarefa | R (Responsible) | A (Accountable) | C (Consulted) | I (Informed) |
|---|---|---|---|---|
| Spec de produto | PM | CEO | Eng leads, Jurídico | Conselho |
| Implementação | Eng | Tech lead | PM | QA |
| QA | QA | Tech lead | Eng, PM | — |
| Deploy | Eng/DevOps | Tech lead | Eng | PM, Conselho |
| Comunicação ao mercado | CMO | CEO | Comercial, Jurídico | Time inteiro |
| Auditoria de copy | Jurídico | CMO | — | PM |

### Exemplo: release "Wizard de saúde com upload em massa" (já feito)

| Tarefa | R | A | C | I |
|---|---|---|---|---|
| Spec | (dono do projeto) | (dono) | — | — |
| Frontend wizard | Claude (agente) | (dono) | — | — |
| Parser CSV/TSV | Claude | (dono) | — | — |
| Disclaimer ANS | Claude | (dono) | Compliance (D+30) | — |
| Deploy | Claude (auto via push) | (dono) | — | (notif. GitHub Actions) |

---

## 5. Plano de Continuidade de Operação (BCP)

### 5.1 Chave de acesso (vault)

Lista canônica de TODOS os acessos críticos, em **vault** compartilhado
(Doppler/1Password) com 3+ pessoas com acesso de emergência:

- Repositório GitHub (admin)
- Conta Vercel/Railway (admin)
- DNS / domínio
- Conta SUSEP / portal corretor
- Códigos de corretagem (Bradesco, Amil, etc.)
- Acesso a portais das operadoras (RPA)
- Doppler/Infisical (secrets)
- Stripe / banco corporativo
- Redes sociais corporativas
- E-mail corporativo (Workspace admin)

### 5.2 Documentação técnica

- `STRATEGY.md` (canônico)
- `BRAND_COMPLIANCE.md` (Manual de Marca)
- `docs/UNIT_ECONOMICS.md`
- `docs/COMPLIANCE.md`
- `docs/ARCHITECTURE.md`
- `docs/RUNBOOK.md` (a criar) — passos de troubleshooting comum

### 5.3 Sucessão técnica

- **Bus factor mínimo: 2** para qualquer função crítica (não dependência
  de uma pessoa única).
- **Onboarding doc** por pilar (a criar):
  - `docs/ONBOARDING_DEV.md`
  - `docs/ONBOARDING_COMERCIAL.md`
- **Pair programming/shadowing** obrigatório nas primeiras 4 semanas
  de qualquer hire.

### 5.4 Drills

- **1× por semestre:** simulação de incidente regulatório (ANS/SUSEP/ANPD).
  Time treina o fluxo de remediação de ponta a ponta.
- **1× por ano:** simulação de saída de pessoa-chave (CEO ou tech lead).
  Time executa runbook sem essa pessoa.

---

## 6. Reuniões fixas

| Reunião | Cadência | Participantes | Output |
|---|---|---|---|
| Standup time | Diário, 15 min | Todo o time | Bloqueios |
| Revisão de KPIs por pilar | Semanal, 30 min | Líder do pilar + CEO | Status leading + lagging |
| Conselho | Mensal, 2h | CEO + Conselho | Avanço de waves + kill criteria |
| Retrospectiva geral | Quinzenal, 1h | Time inteiro | Ajuste de processo |
| Revisão de matriz regulatória | Trimestral | DPO + Jurídico + CEO | Atualização de COMPLIANCE.md |
| Drill de incidente | Semestral | Time inteiro | Relatório de drill |

---

## 7. KPIs do D8 (organizacional)

- ✅ ≥ 4 áreas com responsável distinto
- ✅ Reuniões de KPI **semanais**
- ✅ BCP documentado e testado **1× por semestre**
