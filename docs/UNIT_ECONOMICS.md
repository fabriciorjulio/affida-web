# Unit Economics — Affida PME

> **Documento derivado** do PDF Conselho (D7) · 25-abr-2026
> **Cadência de revisão:** mensal nos 12 primeiros meses, depois trimestral

---

## 1. Modelo padrão (por contrato PME saúde, ano 1)

### Receita

| Componente | Cálculo | Notas |
|---|---|---|
| Prêmio mensal médio (P) | R$ X | Varia por porte; ex.: R$ 8.000 para 10-49 funcionários |
| Prêmio anual | 12 × P | |
| Comissão corretora (8-12%) | 12 × P × 0,08 a 0,12 | Tabela varia por operadora e volume; meta de 12% após volume D+180 |
| Tarifa parcelamento (financeira, 0,5-1,5%) | 12 × P × 0,005 a 0,015 | Apenas se cliente parcela em > 1× |
| Tarifa antecipação ao parceiro (spread 1-2%/mês) | depende do canal | Apenas se vier de parceiro com antecipação |
| **Receita total ano 1 (R₁)** | soma das linhas acima | |

### Custo (CAC blended)

| Componente | Cálculo | Notas |
|---|---|---|
| Mídia paga + SEO (A) | R$ A | Diluído pelo n° de contratos atribuídos |
| Comissão parceiro (B) | P × 12 × 30% (ano 1) | Modelo declinante (ver § 4) |
| Custo de operação por apólice (C) | inicial alto, cai com RPA | Wave 1: ~R$ 800/contrato; Wave 3: ~R$ 80 |

### Indicadores derivados

```
Margem de contribuição (MC) = R₁ − A − B − C
LTV   = MC × retenção média (anos) × (1 + cross-sell uplift)
Payback CAC = CAC / MC mensal
```

---

## 2. Cenários (preencher quando tiver dados reais)

### 2.1 Cenário CONSERVADOR

Pressupostos:
- Prêmio mensal médio: **R$ 6.000** (cliente médio com 8-10 vidas)
- Comissão Affida: **8%** (sem volume para negociar)
- Sem parcelamento via financeira
- CAC mídia: **R$ 4.500**
- Comissão parceiro: 30% ano 1
- Custo operação: **R$ 800/contrato/ano** (RPA ainda incipiente)
- Retenção: **2,5 anos** (acima da média do setor)
- Cross-sell uplift: 0% (só saúde)

```
R₁ = 12 × 6.000 × 0,08 = R$ 5.760
A  = R$ 4.500
B  = 12 × 6.000 × 0,30 = R$ 21.600 (apenas se canal parceiro)
C  = R$ 800

Se canal direto (sem B):
  MC = 5.760 − 4.500 − 800 = R$ 460/ano
  LTV = 460 × 2,5 = R$ 1.150
  LTV/CAC = 1.150 / 4.500 = 0,26  ❌ INSUSTENTÁVEL

Se canal parceiro (sem A):
  MC = 5.760 − 21.600 − 800 = NEGATIVO  ❌ INSUSTENTÁVEL
```

**Conclusão cenário conservador:** modelo NÃO fecha. Forçar redução de CAC mídia
ou aumentar comissão (volume) é pré-requisito.

### 2.2 Cenário BASE

Pressupostos:
- Prêmio mensal médio: **R$ 8.000**
- Comissão Affida: **10%**
- Parcelamento: **0,8%** sobre prêmio anual
- CAC mídia: **R$ 2.500** (mistura blend SEO + paid + parceiro)
- Comissão parceiro: 30% ano 1, 15% ano 2, 10% ano 3+
- Custo operação: **R$ 400/contrato/ano** (RPA-1 e RPA-2 operacionais)
- Retenção: **3 anos**
- Cross-sell uplift: **+20%** (odonto + vida em 25% da carteira)

```
R₁ = 12 × 8.000 × 0,10 + 12 × 8.000 × 0,008 = R$ 9.600 + R$ 768 = R$ 10.368
A  = R$ 2.500
B  = blended (50% direto + 50% parceiro): 0,50 × 12 × 8.000 × 0,30 = R$ 14.400 média parceiro
     ⇒ blended = 0,50 × 14.400 = R$ 7.200
C  = R$ 400

MC ano 1 = 10.368 − 2.500 − 7.200 − 400 = R$ 268
MC ano 2 = 10.368 (sem A, sem cac novo) − (15% × 96.000) − 400 = 10.368 − 14.400 − 400 = NEG
```

⚠️ **Bug detectado:** comissão parceiro flat 15-30% sobre prêmio destrói margem.
Reler PDF D7.1 — comissão é sobre **a comissão Affida**, não sobre prêmio bruto.
Recalcular:

```
Comissão parceiro = % sobre comissão Affida (não sobre prêmio)
Ano 1: 30% × 9.600 = R$ 2.880
Ano 2: 15% × 9.600 = R$ 1.440
Ano 3+: 10% × 9.600 = R$ 960

MC ano 1 (canal parceiro) = 10.368 − 2.500 − 2.880 − 400 = R$ 4.588
MC ano 2 = 10.368 − 1.440 − 400 = R$ 8.528
MC ano 3 = 10.368 − 960 − 400 = R$ 9.008
LTV (3 anos) = 4.588 + 8.528 + 9.008 = R$ 22.124
+ cross-sell 20%: LTV ≈ R$ 26.549

LTV/CAC = 26.549 / 2.500 = 10,6×   ✅
Payback = 2.500 / (4.588/12) = 6,5 meses   ✅
Margem MC sobre receita ano 1 = 4.588 / 10.368 = 44%   ✅
```

**ATENÇÃO:** confirmar com Conselho se a base de cálculo da comissão de
parceiro é prêmio bruto ou comissão Affida. Se for prêmio bruto, modelo
não fecha — necessário renegociar % ou criar cap.

### 2.3 Cenário OTIMISTA

- Prêmio R$ 12.000, comissão 12%, retenção 4 anos, cross-sell 35%, CAC R$ 1.800.

```
R₁ = 12 × 12.000 × 0,12 + 0,008 × 144.000 = R$ 17.280 + R$ 1.152 = R$ 18.432
B blended (canal parceiro) = 0,30 × 17.280 = R$ 5.184 (ano 1)
MC ano 1 = 18.432 − 1.800 − 5.184 − 300 = R$ 11.148
LTV (4 anos com declinante) ≈ R$ 65.000 + cross-sell 35% = R$ 87.750
LTV/CAC = 49×   ✅✅✅
Payback = 1.800 / (11.148/12) = 1,9 meses   ✅✅✅
```

---

## 3. Sensibilidade a 3 variáveis

| Variável | Cenário base | Choque −20% | Choque +20% | Δ MC ano 1 |
|---|---|---|---|---|
| CAC | R$ 2.500 | R$ 2.000 | R$ 3.000 | ±R$ 500 |
| Churn anual | 33% (3 anos) | 25% (4 anos) | 50% (2 anos) | LTV ±R$ 8.000 |
| Ticket médio | R$ 8.000 | R$ 6.400 | R$ 9.600 | MC ±R$ 1.000 |

**Variável mais sensível:** churn (LTV é multiplicador linear). Daí a importância
do **motor de re-oferta** (Wave 2) que ataca diretamente a renovação.

---

## 4. Programa de parceiros — comissão declinante

Substitui a curva flat 25% recorrente (anterior) por curva declinante:

| Período | % sobre comissão Affida | Cap por contrato/mês |
|---|---|---|
| Mês 1-12 | 30% | R$ 4.000 |
| Mês 13-24 | 15% | R$ 4.000 |
| Mês 25+ | 10% | R$ 4.000 |

Vantagens vs. flat 25%:
- Parceiro recebe **mais cedo** (pico no ano 1) → engaja na conversão.
- Affida **protege margem** no longo prazo (LTV cresce).
- **Cap** evita distorção em prêmios atípicos (>R$ 50k/mês).

---

## 5. Capital allocation por trimestre por pilar (template)

| Trimestre | Corretora | CRM | RPA | Financeira | Total |
|---|---|---|---|---|---|
| Q2/2026 | R$ A | R$ B | R$ C | R$ 0 | … |
| Q3/2026 | R$ A | R$ B | R$ C | R$ D | … |
| Q4/2026 | R$ A | R$ B | R$ C | R$ D | … |

Preencher após decisão do Conselho. Restrição: **financeira não recebe capital
antes da Wave 2 confirmada** (volume em carteira ≥ 30 contratos).

---

## 6. KPIs de sucesso

| KPI | Meta D+90 | Meta D+180 | Meta D+365 |
|---|---|---|---|
| Payback CAC | n/a | ≤ 18 meses | ≤ **12 meses** |
| LTV/CAC | n/a | ≥ **2,0** | ≥ **3,0** |
| MC por contrato (ano 1) | — | ≥ **25%** da receita | ≥ **35%** |
| Receita anual recorrente | R$ 96k | R$ 480k | R$ 1,9M |

---

## 7. Próxima revisão

- **Owner:** Head financeira / CFO
- **Cadência:** mensal nos primeiros 12 meses, trimestral depois
- **Input necessário:** primeiros 10 contratos fechados (Wave 1) com prêmio,
  comissão e CAC reais por canal (mídia paga / parceiro / direto).
- **Output:** atualizar tabela §2 com números reais; revisar % parceiro se
  base de cálculo (prêmio vs. comissão Affida) divergir do desenhado aqui.
