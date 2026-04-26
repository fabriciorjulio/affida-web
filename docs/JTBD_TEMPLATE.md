# JTBD — Plano de saúde PME (template de pesquisa primária)

> **Documento derivado** do PDF Conselho (D3) · 25-abr-2026
> **Meta:** 30 entrevistas estruturadas com gestores PME (RH/financeiro)
> **Output:** documento JTBD por porte e CNAE com pull/push/anxiety/habit

---

## 1. Quem entrevistar (n=30)

Recrutar em duas coortes balanceadas:

### Coorte A (n=15) — **trocaram de operadora** nos últimos 12 meses
Hipótese: a troca acontece por gatilho específico (reajuste alto, descontentamento
com rede, parceiro novo). Mapear o **trigger** e a **friction da troca**.

### Coorte B (n=15) — **NÃO trocaram** apesar de reajuste alto (≥ inflação médica setorial)
Hipótese: inércia, relacionamento com corretor antigo, medo de carência,
medo de descobrir algo pior. Mapear o **anchor** que prende.

### Filtros adicionais (mistura por cota)
- **Porte:** 5 entrevistas em cada faixa → 10-49, 50-99, 100-249 funcionários
- **CNAE:** mistura de tecnologia (62), serviços profissionais (69-74),
  comércio (47), indústria leve (10-32)
- **Cargo do decisor:** 50% RH (Head/Diretor de Pessoas), 50% financeiro
  (CFO/Controller/Sócio-administrador)

---

## 2. Roteiro estruturado (45-60 min por entrevista)

### Bloco 0 · Aquecimento (5 min)
- Apresentação Affida: corretora SUSEP autônoma, foco PME-saúde, código aberto
  nas 6 grandes operadoras.
- "Esta é uma conversa de pesquisa. Não vou te vender nada hoje."
- Pedir consentimento para gravação.

### Bloco 1 · Contexto da empresa (5 min)
- Quantos funcionários? Composição etária aproximada (jovens / 30+ / 50+)?
- Setor / CNAE / atividade principal?
- Quem decide sobre benefícios? Quem **paga** o cheque?
- Há quanto tempo a empresa oferece plano?

### Bloco 2 · Status quo (10 min)
- Operadora atual + nome do plano
- Mensalidade total / por vida (média)
- Como contratou (corretor, direto na operadora, headhunter)?
- Há quanto tempo nessa operadora?
- O que **funciona** hoje? (3 coisas)
- O que **incomoda** hoje? (3 coisas)

### Bloco 3 · Job to be Done — JTBD framework (20 min)

#### Pull (o que puxa para uma nova solução)
- "Quando você pensa em mudar/reavaliar o plano, o que te motiva?"
- "Existe um momento ou evento específico que dispara essa avaliação?
  (renovação, reajuste, aumento de quadro, sinistro caro, demanda do RH, etc.)"
- "Se um corretor te procurasse hoje, o que ele teria que mostrar para você
  abrir conversa?"

#### Push (o que empurra para fora do status quo)
- "Conta a última vez que você ficou frustrado com o plano atual."
- "O que faz você considerar trocar? Quanto de reajuste é 'demais'?"
- "Tem coisas da rede, do atendimento ao funcionário, da operação
  (faturas, reembolsos) que te tiram do sério?"

#### Anxiety (o que te trava de mudar)
- "Se você fosse trocar de operadora amanhã, o que te dá mais medo?"
- "Quais perguntas você precisaria responder antes de assinar com outra?"
- "Tem alguém na empresa que vai te questionar a decisão? Quem?"

#### Habit (o que te prende ao atual)
- "O que sua atual operadora faz bem que você não quer perder?"
- "Há quanto tempo está com o mesmo corretor / consultor?"
- "Se ele saísse de cena, você procuraria substituto pelo nome dele ou
  começaria do zero a comparar?"

### Bloco 4 · Disposição a pagar (WTP) e canal (10 min)
- "Se eu te entregasse uma cotação detalhada com 3 operadoras comparadas
  por faixa etária ANS em 24h, quanto vale isso para você?"
- "Você prefere falar com consultor por WhatsApp, e-mail, vídeo ou
  presencial? Em que momento da decisão?"
- "Se a comissão da corretora for transparente (sabe quanto eu ganho),
  isso muda a sua relação comigo? Para melhor, pior, indiferente?"

### Bloco 5 · Hipóteses Affida (10 min)
- Mostrar a tela do wizard `/cotar/saude-coletiva`. "Faz sentido para você?"
- Mostrar a tela do portal (mockup). "O que mudaria seu dia se você tivesse
  isso aqui logado, com benchmark do seu CNAE+porte?"
- "O que está faltando aqui que você precisa?"

---

## 3. Output esperado por porte e CNAE

### Documento JTBD por persona

```
Persona: RH de PME-tech (50-99 vidas, CNAE 62)
─────────────────────────────────────────────
PULL:
  • Reajuste anual > 18% dispara revisão (gatilho real do mercado tech 2025)
  • Demanda dos funcionários por telemedicina + saúde mental
  • Aumento de quadro (>20% em 12m) força renegociação automática

PUSH:
  • Demora no reembolso (>30 dias) gera escalada interna na empresa
  • Rede deficiente em SP zona sul / Faria Lima
  • Falta de relatório executivo trimestral (pago, sinistralidade, NPS)

ANXIETY:
  • Carência para procedimentos pré-existentes
  • Funcionários reclamando depois da troca
  • Mudança de coparticipação que pega o RH desprevenido

HABIT:
  • Rede credenciada conhecida pelos colaboradores
  • App da operadora que os funcionários já usam
  • Corretor que liga sempre antes da renovação

JOB:
"Quando o RH percebe que o plano atual está mais caro/pior, contratar uma
nova operadora SEM gerar atrito interno (funcionários reclamando) e SEM
expor a área de RH a um questionamento do CFO/sócio."
```

---

## 4. Métricas a capturar quantitativamente nas 30 entrevistas

| Métrica | Coleta | Uso |
|---|---|---|
| Mensalidade atual média (por vida) | direto | Benchmark setorial |
| Reajuste último ciclo | direto | Definir "reajuste alto" |
| Tempo médio com a operadora atual | direto | Inércia/lock-in |
| Há quanto tempo com mesmo corretor | direto | Habit |
| % decidem por preço vs. rede | escolha forçada | Posicionamento |
| Tempo aceitável de cotação (h) | direto | SLA do wizard |
| Quem precisa aprovar a troca? | open | Mapa de stakeholders |
| Já recebeu cotação online? Como foi? | open | Concorrência |

---

## 5. Cronograma sugerido

| Semana | Atividade |
|---|---|
| 1 | Recrutar via LinkedIn (RH/CFO PME) + parceiros contadores |
| 2 | 10 primeiras entrevistas (mistura coortes A e B) |
| 3 | 10 entrevistas (foco porte 50-99) |
| 4 | 10 entrevistas (foco porte 100-249) |
| 5 | Análise + síntese JTBD por persona |
| 6 | Apresentação ao Conselho + atualização do produto |

---

## 6. KPIs do programa de pesquisa

- **NPS** dos 10 primeiros clientes Affida (Wave 1) com cadência trimestral.
  Meta: ≥ **60** (zona "promotor" sólida).
- **Close-rate em lead qualificado** > 5% (Wave 1) → > 8% (Wave 2).
- **JTBD doc** atualizado a cada release de produto.
- **WTP test:** 3 cohorts com transparência diferente de comissão →
  medir close-rate.

---

## 7. Quem executa

- **Owner:** Head de produto + CMO
- **Apoio:** consultor de pesquisa qualitativa (terceirizar 1 mês ajuda)
- **Investimento:** ~R$ 20k em incentivos (R$ 600/entrevista) + tempo do time
- **Output canônico:** `/docs/JTBD_PERSONAS.md` (preenchido após coleta)
