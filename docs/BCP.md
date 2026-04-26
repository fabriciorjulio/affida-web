# Business Continuity Plan (BCP) — Affida

> **Documento derivado** do PDF Conselho (D8.4) · 25-abr-2026
> **Cadência:** documentado e testado **1× por semestre**
> **Owner:** CEO + Tech lead

---

## 1. Princípios

1. **Bus factor mínimo: 2** para qualquer função crítica.
2. **Acesso a credenciais críticas: 3+ pessoas** sempre.
3. **Documentação em vez de tribal knowledge.**
4. **Drill 1× por semestre** — não confiar que está documentado, testar.

---

## 2. Vault de credenciais (a criar)

Centralizar em **Doppler** (ou 1Password Business) com 3+ membros com
acesso de admin de emergência.

### Acessos críticos

| Categoria | Item | Quem precisa | Severidade se perdido |
|---|---|---|---|
| **Código** | GitHub `affida-web` (admin) | CEO + Tech lead + 1 backup | 🔴 Alto |
| **Código** | GitHub `affida-api` (futuro) | Idem | 🔴 Alto |
| **Infra** | Railway (admin) | CEO + Tech lead | 🔴 Alto |
| **Infra** | Cloudflare DNS + R2 | CEO + Tech lead | 🔴 Alto |
| **Infra** | Doppler (próprio vault) | CEO + 2 backups | 🔴 Alto |
| **Auth** | Clerk admin | CEO + Tech lead | 🟠 Médio (refazer leva 1 dia) |
| **Regulatório** | SUSEP portal (corretora PJ) | Sócio + Resp. técnico | 🔴 Alto |
| **Regulatório** | ANS portal | DPO + 1 backup | 🟠 Médio |
| **Operadoras** | Bradesco corretor digital | Closer + RPA | 🟠 Médio |
| **Operadoras** | Amil corretor | Closer + RPA | 🟠 Médio |
| **Operadoras** | SulAmérica / Porto / Unimed | Idem | 🟠 Médio |
| **Financeiro** | Banco corporativo | Sócio + CFO/Controller | 🔴 Alto |
| **Financeiro** | Stripe (futuro) | CEO + CFO | 🟠 Médio |
| **Comunicação** | Workspace admin (e-mail) | CEO + 1 backup | 🔴 Alto |
| **Comunicação** | LinkedIn corporativo | CMO + 1 backup | 🟢 Baixo |
| **Comunicação** | Instagram / Twitter | CMO + 1 backup | 🟢 Baixo |

### Política de rotação
- **Senhas:** rotação a cada 6 meses ou em saída de pessoa com acesso.
- **Tokens API:** rotação a cada 90 dias.
- **Chaves SUSEP/ANS:** rotação obrigatória conforme regulação (anual).

---

## 3. Documentação técnica obrigatória

| Doc | Status | Localização |
|---|---|---|
| `STRATEGY.md` | ✅ Existe | `/web/STRATEGY.md` |
| `BRAND_COMPLIANCE.md` | ✅ Existe | `/web/BRAND_COMPLIANCE.md` |
| `docs/ARCHITECTURE.md` | ✅ Existe | `/web/docs/ARCHITECTURE.md` |
| `docs/COMPLIANCE.md` | ✅ Existe | `/web/docs/COMPLIANCE.md` |
| `docs/UNIT_ECONOMICS.md` | ✅ Existe | `/web/docs/UNIT_ECONOMICS.md` |
| `docs/ORG_CHART.md` | ✅ Existe | `/web/docs/ORG_CHART.md` |
| `docs/JTBD_TEMPLATE.md` | ✅ Existe | `/web/docs/JTBD_TEMPLATE.md` |
| `docs/MARKET.md` | ✅ Existe | `/web/docs/MARKET.md` |
| `docs/BCP.md` | ✅ Este doc | `/web/docs/BCP.md` |
| `docs/RUNBOOK.md` | ⏸ Pendente | Operação técnica |
| `docs/ONBOARDING_DEV.md` | ⏸ Pendente | Onboarding técnico |
| `docs/ONBOARDING_COMERCIAL.md` | ⏸ Pendente | Onboarding closer |
| `docs/INCIDENT_RESPONSE.md` | ⏸ Pendente | Plano de incidente regulatório |

---

## 4. Sucessão técnica

### Pair programming / shadowing obrigatório
- Primeiras **4 semanas** de qualquer hire técnica = pair programming
  com mentor designado.
- Primeira release independente apenas após shadowing completo.

### Cobertura de funções críticas
- **Tech lead:** sempre 2 pessoas com nível de seniority equivalente
  (ou 1 sênior + 1 pleno em fast-track).
- **Closer sênior:** sempre 2 pessoas (não dependência de uma única).
- **DPO:** 1 interno + 1 backup terceirizado.
- **Compliance:** 1 interno + escritório terceiro de retainer.

---

## 5. Plano de incidente regulatório

Acionado se: **notificação de ANS, SUSEP, ANPD ou Procon**.

### Passos obrigatórios (em ordem)

1. **Hora 0** · Acionamento via canal #incident-regulatorio (Slack).
2. **Hora 0-2** · Triage: severidade (alta/média/baixa) + escopo (qual
   pilar afetado).
3. **Hora 2-4** · Congelar operação afetada se severidade alta:
   - Pausar captação pública (banner no site).
   - Pausar emissão de novas apólices.
   - Manter operação existente conforme orientação jurídica.
4. **Hora 4-24** · Parecer jurídico independente (escritório de retainer).
5. **Dia 1-3** · Plano de remediação assinado por DPO + Jurídico.
6. **Dia 3-7** · Apresentação ao Conselho + decisão de retomada.
7. **Comunicação ao titular (LGPD):** em até 72h se houver vazamento de PII.

### Templates de comunicação
- `/templates/comunicado-anpd.md` (a criar)
- `/templates/comunicado-cliente-incidente.md` (a criar)
- `/templates/banner-pausa-operacao.md` (a criar)

---

## 6. Plano de saída de pessoa-chave

### Pessoa-chave nível 1 (CEO/Sócio)
- **Documentação:** poderes, contas bancárias, contratos críticos.
- **Procuração:** assinatura digital em 2º membro do Conselho.
- **Drill:** 1× por ano simular ausência por 14 dias.

### Pessoa-chave nível 2 (Tech lead, Closer sênior, DPO)
- **Onboarding doc:** cada um deixa documento atualizado mensalmente.
- **Substituto designado:** identificado em órgão de governança.
- **Notice period:** 60 dias para ramp-up do substituto.

---

## 7. Drills

| Drill | Cadência | O que testar |
|---|---|---|
| Incidente regulatório (ANS notifica) | 1× por semestre | Fluxo de remediação, comunicação |
| Saída de pessoa-chave | 1× por ano | Time executa runbook sem essa pessoa |
| Backup + restore de DB | 1× por trimestre | Tempo de restore < 1h |
| Rotação de credenciais SUSEP/ANS | 1× por ano | Não interrompe operação |

### Output de cada drill
- Relatório em `/docs/drills/YYYY-MM-DD-<titulo>.md`.
- Issues abertas para gaps encontrados.
- Apresentação resumida ao Conselho na reunião seguinte.

---

## 8. Próxima atualização

Trimestral. Próxima: **25-jul-2026**.

Itens a confirmar:
- Vault Doppler/1Password de fato configurado (hoje: TBD).
- Lista de pessoas com acesso emergencial (hoje: 1 — só o CEO).
- Drill de incidente realizado pelo menos 1× (hoje: 0).
