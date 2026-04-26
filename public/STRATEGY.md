# Affida Partners — Estratégia & Arquitetura

> **Documento canônico.** Consolida posicionamento, modelo de negócio,
> identidade visual, stack técnica, padrões de UI, fluxos de produto e
> roadmap. Fonte de verdade para qualquer pessoa (humano ou agente)
> que entrar no projeto.
>
> **Última atualização:** 25 de abril de 2026 · commit `9e15a2c`
> **Manual de Marca:** dez/2025 (`202512_AFFIDA_PARTNERS_MANUAL DE MARCA.pdf`)

---

## Sumário

1. [Posicionamento & visão](#1-posicionamento--visão)
2. [Modelo de negócio](#2-modelo-de-negócio)
3. [Produto principal: Saúde PME](#3-produto-principal-saúde-pme)
4. [Identidade visual (Manual de Marca dez/2025)](#4-identidade-visual-manual-de-marca-dez2025)
5. [Padrão de UI fechado](#5-padrão-de-ui-fechado)
6. [Stack técnica & infraestrutura](#6-stack-técnica--infraestrutura)
7. [Mapa de rotas](#7-mapa-de-rotas)
8. [Componentes-chave](#8-componentes-chave)
9. [Wizards de cotação](#9-wizards-de-cotação)
10. [Estratégia de conteúdo da landing](#10-estratégia-de-conteúdo-da-landing)
11. [CRM, Portal e fluxos internos](#11-crm-portal-e-fluxos-internos)
12. [Operadoras parceiras](#12-operadoras-parceiras)
13. [Convenções de código](#13-convenções-de-código)
14. [Roadmap & gaps estratégicos](#14-roadmap--gaps-estratégicos)
15. [Histórico de decisões da sessão atual](#15-histórico-de-decisões-da-sessão-atual)
16. [Pendências pausadas (a pedido do dono)](#16-pendências-pausadas-a-pedido-do-dono)

---

## 1. Posicionamento & visão

**Affida Partners — Consultoria de seguros e benefícios.**

Corretora boutique digital focada em PME, com tese central:

> O mercado PME investe pesado em **venda nova** e perde o cliente
> (que volta como lead pago meses depois). Condições mudam rápido entre
> seguradoras. **Quem monitora a própria carteira reoferta antes do
> concorrente** — esse é o nosso fosso.

**Três decisões estruturais que moldam tudo:**

| # | Decisão | Implicação |
|---|---|---|
| 1 | **Independente da MDS** | A Affida tem SUSEP própria + código de corretagem aberto nas top operadoras. NÃO usa MDS/Brokerslink/Ardonagh para o vertical PME. Toda a credibilidade ancora em "corretora autônoma SUSEP + sem intermediários". |
| 2 | **Saúde é o produto âncora** | Plano de saúde empresarial é o ponto de entrada de praticamente todo cliente PME. Vida, odonto, RC, frota e demais ramos são cross-sell SOBRE a base de saúde — nunca produto principal. |
| 3 | **Tech proprietária como fosso** | CRM, motor de re-oferta, portal do cliente e parceiros são todos código nosso (não Pipedrive maquiado). A combinação portal + benchmark + reoferta cria lock-in consultivo difícil de copiar. |

---

## 2. Modelo de negócio

- **Tipo:** corretora digital própria (NÃO é SaaS para corretoras).
- **Receita:** comissão de corretagem direta da operadora.
- **Nicho:** PME, foco 2-249 funcionários (esmagadoramente 10-99).
- **Regulação:** SUSEP (corretora) + ANS (saúde) + LGPD (dados).
- **CNPJ:** Affida Partners Corretora de Seguros Ltda. (em processo).
- **Distribuição:** site próprio + parceiros (contadores, consultores RH,
  influenciadores PME, afiliados digitais).

### Funil consultivo

```
1. Captação      → Tráfego pago + SEO + parceiros + indicações
2. Qualificação  → Lead entra no CRM, enriquecido por CNPJ/CNAE/porte
3. Consultoria   → Closer prepara 2-3 opções com rationale Affida
4. Fechamento    → Assinatura digital + onboarding + portal do cliente
5. Expansão      → Motor de reoferta dispara cross-sell e renovação
```

### Posicionamento de marca

> "Construindo o futuro, juntos." (assinatura institucional)

- Sofisticado, consultivo, "cada cliente cuidado com exclusividade".
- Boutique digital com tech própria — NÃO commodity.
- "Parcerias verdadeiras para construir o futuro" (slide de fechamento).

---

## 3. Produto principal: Saúde PME

### Por que saúde é o âncora

- É o benefício mais demandado por PME (95%+ das empresas com 10+
  funcionários ofertam).
- Tem maior ticket médio recorrente entre os ramos PME.
- Cria habit de relacionamento mensal com o cliente (faturas, sinistros,
  inclusões/exclusões), o que abre janela de cross-sell.
- A complexidade da precificação por **faixa etária ANS** justifica
  consultoria — diferencia da experiência de "preço único" de
  plataformas B2C (Bidu, MinutoSeguros).

### Driver comercial = funcionários, NÃO faturamento

O select "Tamanho da empresa" no formulário usa **faixa de funcionários**
(via `lib/portes.ts`), com a classe legal SEBRAE como apoio textual:

| Faixa | Classe SEBRAE | Notas operacionais |
|---|---|---|
| 1 a 2 funcionários | MEI / autônomo | Plano ind/familiar ou contratação como PJ |
| 3 a 9 funcionários | Microempresa (ME) | Adesão a partir de 2 vidas |
| 10 a 49 funcionários | Pequena empresa (EPP) | **Foco PME · todas operadoras** |
| 50 a 99 funcionários | Média empresa | Negociação de coparticipação e rede |
| 100 a 249 funcionários | Médio porte | Tabela própria + rede customizada |
| 250 ou mais funcionários | Grande porte | Atendimento consultivo dedicado |

Helper `porteToClasseLegal(v)` mapeia faixa → classe enxuta para CRM.

### Dados críticos por beneficiário (regulação ANS RN 309/2012)

Para cotar saúde de verdade, precisamos por **vida**:

1. **Data de nascimento** — mapeia para 1 das 10 faixas etárias ANS.
2. **Sexo** — F ou M.
3. **Parentesco** — titular, cônjuge, filho ou outro dependente.
4. **(Opcional)** Plano atual + valor mensal atual — para mostrar
   economia real na proposta de migração.

### 10 faixas etárias ANS (RN 63 / RN 309)

```
0-18 anos  · multiplicador 1.00× (base)
19-23 anos · 1.21×
24-28 anos · 1.46×
29-33 anos · 1.75×
34-38 anos · 2.07×
39-43 anos · 2.43×
44-48 anos · 2.86×
49-53 anos · 3.36×
54-58 anos · 3.93×
59+ anos   · 4.62×
```

A cotação calcula `mensal_total = Σ (base_plano × multiplicador_faixa_vida)`.

### Operadoras-piloto da cotação online

Atualmente 3 operadoras com tabela base mock (até integração API):

| Operadora | Plano exemplo | Acomodação | Coparticipação | Base 0-18 |
|---|---|---|---|---|
| Bradesco Saúde | Top Nacional Flex Empresarial | Apartamento | 30% | R$ 285 |
| Amil | Amil 400 PME Nacional | Enfermaria | Sem | R$ 240 |
| SulAmérica | Prestige Empresarial | Apartamento | 30% | R$ 305 |

---

## 4. Identidade visual (Manual de Marca dez/2025)

### Paleta estrita (única fonte: `tailwind.config.ts`)

| Cor | HEX | Uso canônico |
|---|---|---|
| Dress Blues | `#0B1E33` | Aplicação primária do logo (p.14 col 2). Blocos institucionais autocontidos. Footer. Card hero da home. BrandSignature. CTA final. |
| Midnight Blue | `#173F65` | `navy.DEFAULT`. Variações navy-50 a navy-900. |
| Brown | `#423933` | `forest.DEFAULT`. Acento/itálicos sobre fundo claro. |
| Greige | `#928475` | `champagne-700`. |
| UP cream | `#E1D9C6` | `champagne-300/400`. Logo dourado (`tone="gold"`) sobre Dress Blues. |
| Comoyoko | `#FFFFFF` | Logo `tone="light"` (versão negativa) sobre Neutral Black. |
| Neutral Black | `#222222` | `bg-ink`. **Chrome de UI**: header, hero topo das páginas internas. |
| Sand | `#F5F1E8` | Fundo creme institucional intermediário. |
| Ivory | (`#FAF7F0` aprox) | Fundo padrão do `<body>` e `<main>`. |

### Tipografia

- **Sistema:** Montserrat (Google Fonts), pesos 200-700.
- **Títulos:** `heading-display` (`font-display font-extralight tracking-tight text-balance`).
- **Itálicos editoriais:** em fundo claro `text-forest`, em fundo escuro `text-champagne-300`.
- **Logo Corbert** (Demi Bold Extended para AFFIDA, Regular Extended para
  PARTNERS): NUNCA renderizado como texto. Sempre via mask-image PNG
  extraído do PDF p.6 (`/public/affida-{mark,wordmark,logo-stacked}.png`),
  com 60px de respiro transparente em todos os lados.

### Compliance p.17 + p.18 do Manual

**16/16 regras pass.** Detalhes em `BRAND_COMPLIANCE.md` na raiz do `/web`.
Pontos críticos:

- **DON'T #3** (não trocar a fonte por outra): wordmark e stacked
  renderizados a partir de máscara PNG oficial — Corbert preservado
  pixel-a-pixel.
- **DON'T #8** (sem gradientes/efeitos): removidos hairlines com
  `bg-gradient-to-r`, radial-glow e `radial-gradient` em `.grid-pattern-navy`.
- **DO #4** (fundos lisos ou texturas discretas): `bg-affida-pattern` em
  opacidade ≤ 0.12 é a única textura permitida.

### Componente `<AffidaLogo>` (`components/ui/logo.tsx`)

```ts
type LogoVariant = "full" | "mark" | "stacked";
type LogoTone    = "light" | "dark" | "gold" | "mono-dark" | "mono-light";

// Pareamento canônico fundo→tom (p.14):
//   Dress Blues bg     → tone="gold"  (UP cream)
//   Neutral Black bg   → tone="light" (branco, versão negativa)
//   Ivory/Comoyoko bg  → tone="dark"  (Dress Blues)
```

ASPECT ratios fixados por dimensões originais dos PNGs (com pad de 60px):
`mark 1717/490 · wordmark 3536/1075 · stacked 3536/2046`.

---

## 5. Padrão de UI fechado

### Header / Navbar

`<Navbar tone="dark" />` é o **padrão único** para todas as páginas
públicas (home, pitch, parceiros, legais, /cotar):

- Fundo `bg-ink/95` (Neutral Black `#222222`) — Manual p.13 (cor de apoio
  para chrome de UI) + p.14 col 7 (versão negativa do logo).
- Logo `tone="light"` (versão negativa branca).
- Border-bottom `border-white/10`.

### Hero topo de página interna

**Regra:** páginas internas com `<Navbar tone="dark">` devem usar
**`bg-ink`** (mesma cor do header) no hero topo, criando uma fita
superior contínua. NÃO usar `bg-navy-900` ou `grid-pattern-navy` colado
ao header — isso cria um "degrau" entre Neutral Black `#222222` e
Dress Blues `#0B1E33` (duas cores escuras próximas mas distintas).

```tsx
<Navbar tone="dark" />
<section className="relative overflow-hidden bg-ink">
  <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.08]" />
  ...
</section>
```

### Quando usar Dress Blues (`bg-navy-900` / `grid-pattern-navy`)

- **Footer** institucional.
- **BrandSignature** (assinatura institucional logo após o hero).
- **CtaFinal** no fim de cada landing.
- **Blocos institucionais autocontidos** entre seções claras (ex: bloco
  "Diferenciais vs mercado" na pitch, "Jornada do parceiro" na
  parceiros). Esses funcionam como aplicação primária do logo
  (Manual p.14 col 2).
- **Card do hero da home** (foto + overlay Dress Blues 70% + card
  Dress Blues 85%).

### Estados hover / animação

- Cards: `hover:-translate-y-1 hover:shadow-premium`.
- Botões: `transition-all`, `hover:shadow-gold` no gold, etc.
- Sem animações decorativas pesadas (Manual p.18 #8 — sem efeitos não
  oficiais).

### Componentes UI base (`components/ui/`)

| Componente | Propósito |
|---|---|
| `Button` | Variants: `primary`, `gold`, `outline`, `dark-outline`, `ghost`. Sizes: `sm`, `md`, `lg`. |
| `Input`, `Select`, `FieldGroup`, `Label` | Forms padronizados com border navy + focus ring. |
| `Badge` | Tones alinhados ao Manual: neutral, gold, navy, success, warning, danger, info. |
| `AffidaLogo` | Logo via mask-image PNG (ver §4). |
| `Toaster` + `toast()` | Notificações flutuantes Dress Blues. |
| `ActionButton` + `openWhatsapp()` | Wrapper para CTAs WhatsApp pré-preenchidos. |

---

## 6. Stack técnica & infraestrutura

### Stack frontend

- **Framework:** Next.js 14.2.15 (App Router).
- **Linguagem:** TypeScript estrito.
- **Estilo:** Tailwind CSS com paleta extendida (Manual de Marca).
- **Fonte:** Montserrat via `next/font/google`.
- **Ícones:** lucide-react.
- **Estado:** React useState/useMemo (sem Redux/Zustand — formulários
  locais bastam para o MVP).

### Build & deploy

- **`next export`** estático (`output: "export"` em `next.config.js`).
- **Hospedagem:** GitHub Pages (`fabriciorjulio/affida-web`).
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`).
- **basePath:** `process.env.NEXT_PUBLIC_BASE_PATH ?? ""` em todos os
  assets (`/photos/...`, `/affida-mark.png`, etc).
- **Branch de produção:** `main`. Push automático dispara deploy.

### Backend (futuro, ainda não implementado)

- **Pretendido:** FastAPI + Postgres no Railway (mesma stack do
  VIP Industrial e btc-bot do dono).
- **Localização planejada:** `~/Developer/affida/api/` (paralelo ao
  `~/Developer/affida/web/`).
- **Quando entrar:** OAuth (Google/Apple/LinkedIn), preço oficial das
  operadoras (API Bradesco Saúde + Amil), CRM com persistência real,
  motor de re-oferta com triggers, autenticação do portal do cliente.

### Integrações futuras (roadmap)

- **30 dias:** GA4 + Hotjar + atribuição CRM.
- **60-90 dias:** API direta Bradesco Saúde + Amil (preço oficial).
- **6 meses:** Omie / ContaAzul (folha automática), API SulAmérica +
  Porto Saúde + Unimed.

---

## 7. Mapa de rotas

```
/                               Landing pública (home)
/cotar                          Prateleira institucional de produtos (8)
/cotar/[product]                Wizard de cotação
  ├── /cotar/saude-coletiva     → QuoteWizardSaude (faixa ANS, beneficiários)
  ├── /cotar/odonto-col         → QuoteWizard genérico
  ├── /cotar/vida-empresarial   → QuoteWizard genérico
  ├── /cotar/vida-socios        → QuoteWizard genérico
  ├── /cotar/rc-profissional    → QuoteWizard genérico
  ├── /cotar/frota-leve         → QuoteWizard genérico
  ├── /cotar/patrimonial        → QuoteWizard genérico
  └── /cotar/pet-corporate      → QuoteWizard genérico

/parceiros                      Programa de parcerias B2B (público)
/pitch                          Documento interno para sócios

/legal/privacidade              Política de privacidade (LGPD)
/legal/termos                   Termos de uso

/portal                         Portal do cliente PME (visão geral)
  ├── /portal/apolices          Minhas apólices
  ├── /portal/proposta          Proposta 2026 interativa
  ├── /portal/sinistros         Sinistros
  ├── /portal/faturas           Faturas
  └── /portal/benchmark         Benchmark setorial por CNAE

/crm                            CRM interno (dashboard)
  ├── /crm/pipeline             Pipeline kanban 6 estágios
  ├── /crm/leads                Lista de leads
  ├── /crm/leads/[id]           Lead 360
  ├── /crm/leads/novo           Cadastro manual de lead
  ├── /crm/carteira             Carteira de clientes
  ├── /crm/carteira/[id]        Cliente 360
  ├── /crm/reoferta             Motor de re-oferta (fila priorizada)
  ├── /crm/campanhas            Campanhas e atribuição
  ├── /crm/parceiros            Painel admin de parceiros
  └── /crm/settings             Configurações
```

**Total:** 45 rotas estáticas geradas no build.

### Geração de params estáticos

Rotas dinâmicas usam `generateStaticParams()` para pré-render:
- `/cotar/[product]` → todos os IDs de `products[]` em `lib/mock-data.ts`.
- `/crm/leads/[id]` → IDs do mock `leads[]`.
- `/crm/carteira/[id]` → IDs do mock `clients[]`.

---

## 8. Componentes-chave

### Marketing (`components/marketing/`)

| Componente | O que faz |
|---|---|
| `Navbar` | Header global. Tones: light (ivory) e dark (Neutral Black). |
| `Hero` | Hero da home: foto + overlay Dress Blues + card grande com logo stacked. |
| `Pillars` | 3 pilares "atendimento sofisticado / benchmark / cuidado contínuo". |
| `ProductsGrid` | 3 grupos consultivos: Saúde+Odonto / Pessoas / Empresa. |
| `ProcessSteps` | 5 passos do funil consultivo. |
| `Advantage` | Bloco do motor de re-oferta. |
| `TrustBar` | "Código de corretagem aberto em" 6 operadoras. |
| `BrandSignature` | Assinatura institucional Dress Blues (logo stacked + tagline). |
| `CtaFinal` | CTA final "Cotar plano de saúde PME". |
| `Footer` | Footer com nav, faixa institucional (SUSEP/ANS/LGPD/Cód. próprio). |

### Cotação (`components/cotar/`)

| Componente | O que faz |
|---|---|
| `QuoteShell` | Shell minimalista do wizard: header com logo + progress bar. |
| `QuoteWizard` | Wizard genérico (vida, RC, frota, etc): CNPJ → cobertura → contato → comparativo. |
| `QuoteWizardSaude` | Wizard de saúde: empresa+atual → beneficiários (DOB/sexo/parentesco) → contato → comparativo Bradesco/Amil/SulAmérica com economia vs plano atual. Inclui upload em massa CSV/TSV/TXT. |

### CRM (`components/crm/`)

| Componente | O que faz |
|---|---|
| `CrmSidebar` | Sidebar Navy 950 com nav lateral + Settings + perfil do user. |
| `CrmHeader` | Header sticky de cada página CRM com search + notificações. |

### Portal (`components/portal/`)

| Componente | O que faz |
|---|---|
| `PortalShell` | Shell completo do portal: header (logo + perfil), nav lateral, conteúdo. |

### UI base (`components/ui/`)

Já listados em §5.

---

## 9. Wizards de cotação

### Roteamento

`app/cotar/[product]/page.tsx` despacha:
- `product.segment === "saude"` → `<QuoteWizardSaude>`
- demais → `<QuoteWizard>` genérico

### `QuoteWizard` (genérico — vida, odonto, RC, frota, patrimonial, pet)

4 passos:

1. **Empresa**: CNPJ, razão social, **tamanho (faixa de funcionários)**,
   CNAE, número de vidas.
2. **Cobertura**: capital segurado (6×, 12×, 24×, custom) + coberturas
   extras (IPA, IPD, DMH, AF, auxílio).
3. **Contato**: nome, cargo, email, WhatsApp.
4. **Comparativo**: 3 cards de operadoras com mensalidade calculada
   (Bradesco Vida + Icatu + Prudential), badge "Melhor custo", CTA
   "Contratar" / "Falar com consultor".

### `QuoteWizardSaude` (produto principal)

4 passos:

1. **Empresa & situação atual**:
   - CNPJ, razão social, **tamanho (faixa de funcionários)**, CNAE.
   - **Bloco opcional** "Situação atual": operadora atual, plano atual,
     valor mensal atual. Se preenchido, exibe economia real na proposta.

2. **Beneficiários** (faixa etária ANS):
   - Lista dinâmica: titular obrigatório + N dependentes.
   - Por vida: nome (opcional), **data de nascimento**, **sexo**,
     **parentesco** (titular/cônjuge/filho/dependente).
   - Faixa ANS exibida em tempo real ao informar a DOB.
   - **Botão "Importar planilha (CSV/Excel)"** — abre painel de upload
     em massa (ver subseção abaixo).

3. **Contato**: idem genérico.

4. **Comparativo**:
   - 3 cards: Bradesco Saúde / Amil / SulAmérica.
   - Mensalidade calculada por `Σ base_plano × multiplicador_faixa_vida`.
   - Se `valorAtual` foi informado, exibe **destaque visual de economia
     mensal e anual**.
   - Detalhes por plano: acomodação, abrangência, coparticipação,
     carência, reajuste médio, rating.

### Upload em massa de beneficiários

Módulo: `lib/beneficiario-import.ts`.

**Formatos aceitos:**
- CSV (vírgula ou ponto-e-vírgula).
- TSV (paste direto do Excel via Ctrl+C → Ctrl+V).
- Arquivo `.csv`, `.txt`, `.tsv`.

**Funcionalidades:**
- Auto-detecção de delimitador (comma, semicolon, tab).
- Auto-detecção de header (vs. dados posicionais).
- **Normalização fuzzy:**
  - Headers: "Nome Completo"/"Nome"/"Beneficiário",
    "Data de Nascimento"/"DOB"/"Nasc",
    "Sexo"/"Gênero"/"Gender", "Parentesco"/"Tipo"/"Vínculo".
  - Datas: DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, DD/MM/YY (cutoff: 30).
  - Sexo: F/M, Feminino/Masculino, Mulher/Homem.
  - Parentesco: titular/responsável, cônjuge/esposa/companheiro,
    filho/filha, agregado/dependente/pai/mãe/irmão.
- Preview tabular (até 50 linhas) com status ok/erro por linha.
- Botão "Baixar template" gera CSV exemplo.
- Importa apenas linhas válidas; promove primeiro importado a "titular"
  se nenhum vier marcado.
- Sem dependências externas (papaparse/xlsx fora do bundle). Para .xlsx
  puro, orientamos exportar como CSV ou usar paste do Excel.

---

## 10. Estratégia de conteúdo da landing

### Filosofia (orientação direta do dono)

> "A landing pública NÃO é prateleira de produtos. O objetivo é levar
> para CONSULTORIA + COTAÇÃO. Prateleira completa fica em /cotar
> (institucional)."

### Estrutura da home (`app/page.tsx`)

1. **Navbar** (Neutral Black, logo branco)
2. **Hero**: foto + overlay + card Dress Blues com logo stacked + h1
   "Plano de saúde PME que cuida de quem cuida" + CTA gold "Cotar plano
   de saúde" + 4 stats (20+ operadoras / 3 min / 100% PME / SUSEP).
3. **TrustBar**: "Código de corretagem aberto em" Amil, Bradesco Saúde,
   SulAmérica, Porto Saúde, Unimed, Hapvida.
4. **Pillars**: 3 pilares com h2 "Consultoria boutique. Acesso direto
   ao mercado."
5. **ProductsGrid**: 3 grupos (Saúde+Odonto âncora · Pessoas · Empresa)
   + link discreto para /cotar.
6. **ProcessSteps**: 5 passos do funil consultivo.
7. **Advantage**: motor de re-oferta.
8. **BrandSignature**: assinatura institucional Dress Blues.
9. **CtaFinal**: "Para construir o futuro, juntos." → WhatsApp + cotar
   saúde PME.
10. **Footer**.

### Hierarquia de CTA (todos apontam para vendas)

| CTA | Destino | Onde aparece |
|---|---|---|
| **"Cotar saúde PME"** (gold) | `/cotar/saude-coletiva` | Hero, navbar, products-grid bloco 1, cta-final |
| **"Cotar agora"** (gold) | `/cotar/saude-coletiva` | Bloco 1 do products-grid |
| **"Falar com consultor"** (outline) | `wa.me/...` com mensagem pré-preenchida | Pessoas / Empresa / cta-final |
| **"Ver todos os produtos →"** (link discreto) | `/cotar` | Final do products-grid |

**Decisão:** nenhum CTA da home leva direto para uma página de produto
individual (ex: `/cotar/vida-empresarial`). Quem quer ver a prateleira
completa precisa clicar em "Ver todos" → vai para a página
institucional `/cotar` (que renderiza os 8 cards padrão).

---

## 11. CRM, Portal e fluxos internos

### CRM interno (`/crm`)

**8 módulos navegáveis:**
1. Dashboard (KPIs do dia + agenda + atividades).
2. Pipeline kanban 6 estágios (novo → qualificado → proposta →
   negociação → fechado/perdido).
3. Leads (lista filtrada + cadastro manual).
4. Lead 360 (timeline, contatos, próximas ações).
5. Carteira (clientes ativos, NPS, status de cobertura).
6. Cliente 360 (apólices, gatilhos de reoferta, faturas).
7. Motor de re-oferta (fila priorizada com triggers).
8. Campanhas e atribuição (CAC por canal, ROI).
9. Parceiros (admin do programa).
10. Settings.

**Identidade visual:** Sidebar Navy 950 com logo `tone="light"` (versão
negativa). Header sticky branco com search + notificações.

### Portal do cliente (`/portal`)

**6 áreas para o cliente PME:**
1. Visão geral (apólices ativas, ticket mensal, próxima renovação).
2. Minhas apólices (detalhamento por produto).
3. Proposta 2026 (proposta interativa de upgrade/upsell).
4. Sinistros (aberturas + status).
5. Faturas (histórico + download).
6. Benchmark setorial (comparativo CNAE+porte com pares anônimos).

**Identidade visual:** Header branco com logo `tone="dark"`, sidebar
clara, cards `card-premium`. Conversas com closer via botão WhatsApp
sempre visível.

### Programa de parceiros (`/parceiros`)

Página pública para captar contadores, consultores RH, influenciadores
PME e afiliados digitais. Comissão recorrente até 25% enquanto a
apólice estiver ativa. Painel admin separado em `/crm/parceiros`.

---

## 12. Operadoras parceiras

### Saúde (foco principal)

- **Amil** (rating 4.4, rede ampla SP/RJ)
- **Bradesco Saúde** (rating 4.7, rede premium nacional)
- **SulAmérica** (rating 4.6, telemedicina ilimitada)
- **Porto Saúde**
- **Unimed**
- **Hapvida / NotreDame Intermédica**

### Vida (cross-sell)

- Bradesco Vida, Icatu, Prudential, MetLife, MAG, Porto Vida.

### Patrimonial / frota

- Porto, Allianz, Tokio Marine, Mapfre.

**Ordem de integração API priorizada (roadmap):**
1. Bradesco Saúde (90 dias)
2. Amil (90 dias)
3. SulAmérica (6 meses)
4. Porto Saúde (6 meses)
5. Unimed (6 meses)

---

## 13. Convenções de código

### Estrutura de pastas

```
web/
├── app/                    # Next.js App Router (rotas)
│   ├── cotar/              # Cotação (lista + wizards)
│   ├── crm/                # CRM interno
│   ├── portal/             # Portal do cliente
│   ├── legal/              # Privacidade + Termos
│   ├── parceiros/          # Programa de parcerias
│   ├── pitch/              # Documento interno para sócios
│   ├── layout.tsx          # Root layout (Montserrat + meta)
│   ├── page.tsx            # Home
│   └── globals.css         # Tailwind + utilities customizadas
├── components/
│   ├── marketing/          # Hero, Navbar, Pillars, etc
│   ├── cotar/              # Wizards de cotação
│   ├── crm/                # Sidebar/Header do CRM
│   ├── portal/             # Shell do portal
│   └── ui/                 # Button, Input, Badge, Logo, Toaster
├── lib/
│   ├── types.ts            # Types globais (Operator, Product, Lead, Client)
│   ├── mock-data.ts        # Mock de operadoras, produtos, leads, etc
│   ├── portes.ts           # Tabela de faixa de funcionários
│   ├── beneficiario-import.ts  # Parser CSV/TSV de beneficiários
│   └── utils.ts            # cn(), brl(), cnpjMask()
├── public/
│   ├── affida-mark.png        # Logo só símbolo (lemniscata)
│   ├── affida-wordmark.png    # AFFIDA + PARTNERS
│   ├── affida-logo-stacked.png # Composição completa p.6
│   ├── affida-pattern.png     # Pattern oficial
│   ├── photos/                # Foto institucional do hero
│   └── favicon.svg
├── tailwind.config.ts      # Paleta estrita do Manual
├── next.config.js          # output: 'export', basePath, etc
├── BRAND_COMPLIANCE.md     # Checklist 16/16 p.17 + p.18
└── STRATEGY.md             # ESTE arquivo
```

### Princípios de código

- **Static export friendly:** zero código que precise de Node.js
  runtime. Tudo client-side ou SSG.
- **Sem refactor preventivo** (instrução explícita do dono): fixes
  cirúrgicos, não corrigir "bugs" de agents sem verificar o caminho de
  execução. Está documentado em `~/.claude/...memory/feedback_no_refactor.md`.
- **Single source of truth:**
  - Cores → `tailwind.config.ts`.
  - Faixas de porte → `lib/portes.ts`.
  - Operadoras / produtos / mock → `lib/mock-data.ts`.
  - Tipos → `lib/types.ts`.
- **Comentários em PT-BR** explicando decisão de UX/marca, não o óbvio
  do código.
- **basePath em todos os assets:** sempre
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/asset.png`.
- **Microcopy direto:** "Cotar saúde PME" > "Solicite agora sua
  proposta personalizada".

### Convenção de commits

Seguir Conventional Commits:
- `feat(escopo):` — feature nova.
- `fix(escopo):` — correção.
- `chore:` — manutenção/build.
- Footer fixo: `Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>`
  quando o agente Claude fizer o commit.

---

## 14. Roadmap & gaps estratégicos

### Roadmap (do `/pitch`, atualizado pós-descobrimento de independência)

**30 dias:**
- Cotação online de saúde com preço de referência (Bradesco Saúde + Amil)
- Primeiros 3 parceiros contadores ativos + material comercial
- Playbook do closer + scripts consultivos por porte/CNAE
- Tracking completo (GA4 + Hotjar + atribuição CRM)

**60-90 dias:**
- Integração API Bradesco Saúde + Amil (preço oficial em tempo real)
- Onboarding SulAmérica + Porto Saúde
- Primeiras 10 apólices de saúde na carteira
- Campanha paga Google + LinkedIn

**6 meses:**
- Benchmark com dados reais (ANS RN 412 + carteira própria)
- Motor de re-oferta com sinal real de sinistralidade
- Vida + odonto como cross-sell automático sobre base de saúde
- 50+ clientes na carteira

### Gaps estratégicos honestos (auto-avaliação)

| Severidade | Gap | Mitigação |
|---|---|---|
| **Alto** | Cotação com preço oficial da operadora | Integração API Bradesco Saúde + Amil em 90 dias; SulAmérica + Porto + Unimed em 6 meses |
| **Alto** | Volume inicial baixo limita poder de negociação | Foco vertical em saúde nos primeiros 12 meses para concentrar volume em 3 operadoras-chave; renegociação contratual a partir de R$ 500k/mês de prêmio por operadora |
| **Médio** | Custo de aquisição PME é estruturalmente alto | Peso alto em programa de parceiros (contadores = CAC baixíssimo), conteúdo SEO de autoridade, indicações com incentivo recorrente |
| **Médio** | Motor de re-oferta depende de sinal externo | Integração Omie/ContaAzul para folha + provedor de sinistralidade + parceria FENASEG/ANS |
| **Médio** | Marca desconhecida em mercado relacional | Ancoragem em SUSEP + código aberto, case studies premium, relacionamento com sindicatos patronais e contadores |
| **Baixo** | Benchmark setorial precisa dados reais | Pipeline de dados nos primeiros 6 meses: ANS RN 412 + dados públicos SUSEP + Serasa PME + retroalimentação carteira |

---

## 15. Histórico de decisões da sessão atual

### Decisões institucionais (mudaram o produto inteiro)

1. **Affida PME é independente da MDS** (descoberto na sessão atual).
   Removido em 12 arquivos. Substituído por "corretora autônoma SUSEP +
   código de corretagem aberto". Trust-bar trocou logos institucionais
   (MDS/Brokerslink/Ardonagh) por operadoras (Amil/Bradesco/SulAmérica/
   Porto/Unimed/Hapvida).

2. **Saúde é o produto principal** (era vida antes da sessão).
   Reordenado `products[]`, todos os CTAs principais agora apontam para
   `/cotar/saude-coletiva`, hero copy reescrito, wizard dedicado criado.

3. **Cotação de saúde precisa de dados por beneficiário** (faixa ANS):
   data nascimento, sexo, parentesco, plano atual, valor atual.
   Implementado `QuoteWizardSaude` com lista dinâmica de beneficiários +
   cálculo por faixa etária.

### Decisões de UX

4. **Driver comercial = nº de funcionários, não faturamento.**
   Tabela `lib/portes.ts` com 6 faixas (1-2, 3-9, 10-49, 50-99,
   100-249, 250+). Classe legal SEBRAE como apoio textual.

5. **Upload em massa de beneficiários.**
   Para empresas grandes, preencher 1-a-1 era inviável. Implementado
   parser próprio (CSV/TSV/TXT, sem dependências externas) com auto-
   detecção de separador, header, datas BR/ISO, sexo e parentesco
   fuzzy. Preview tabular com validação por linha.

6. **Padronização de header/hero** (fita superior contínua).
   Páginas internas com `Navbar tone="dark"` agora usam `bg-ink` no
   hero topo (mesma cor do header), eliminando o degrau Neutral Black
   → Dress Blues. Aplicado em pitch, parceiros, /cotar.

7. **Landing pública = consultiva, não prateleira.**
   `ProductsGrid` reescrito em 3 grupos consultivos (Saúde+Odonto
   âncora · Pessoas · Empresa), com ícones agrupados em cluster e CTAs
   focados em vendas. Prateleira de 8 produtos fica em `/cotar`
   (institucional), acessível por link discreto "Ver todos os
   produtos →".

### Decisões técnicas / Manual de Marca

8. **Logo Corbert via mask-image PNG** (DON'T #3 honrado).
   Wordmark e stacked extraídos do PDF p.6 com 60px de respiro
   transparente, evitando A's cortados em qualquer contexto.

9. **Compliance 16/16 p.17 + p.18** documentado em
   `BRAND_COMPLIANCE.md`. Removidos gradients, glows e radial-gradients
   que violavam DON'T #8.

---

## 16. Pendências pausadas (a pedido do dono)

Features mencionadas mas explicitamente pausadas — implementar quando o
dono pedir:

### Login social

- Botões: Google · Apple · LinkedIn · e-mail/senha.
- Página dedicada `/entrar`.
- **Bloqueio atual:** site é static export sem backend. OAuth real
  precisa do FastAPI no Railway. UI pode ser feita agora; integração
  fica para fase backend.

### Compartilhamento via lista telefônica do celular / WhatsApp

- **Web Share API** (`navigator.share()`) — em mobile abre o share
  sheet nativo (acessa contatos do WhatsApp/SMS/AirDrop).
- Fallback desktop: botões WhatsApp Web / Email / Copiar link.
- Implementação 100% client-side (não precisa de backend).

### Compartilhamento via LinkedIn

- Share intent: `linkedin.com/sharing/share-offsite/?url=...` (post no
  feed) e `linkedin.com/messaging/compose/?body=...` (DM).
- Acesso a contatos do LinkedIn precisaria de OAuth + permissões
  enterprise — fora de escopo.

### Compartilhamento empresa→empresa

- "Indicar empresa parceira": mini-form (CNPJ + e-mail/whats) que
  envia convite via WhatsApp pré-preenchido + e-mail; gera código de
  indicação único na URL para tracking.
- "Encaminhar para a equipe" (RH → Financeiro → Sócio): botão dedicado
  no portal e no fim do wizard.

---

## Apêndice A — Comandos rápidos

```bash
# Desenvolvimento local
cd ~/Developer/affida/web
npm run dev                       # http://localhost:3000

# Build estático
npm run build                     # gera /out

# Deploy
git push origin main              # GitHub Actions faz o resto

# Verificar deploy
gh run list --limit 1
gh run watch <id> --exit-status

# Re-extrair logos do PDF do Manual (caso precise mexer)
python3 /tmp/extract_logo.py      # script já documentado no commit 642d0c5
```

## Apêndice B — Onde procurar quando…

| Quero mudar | Vou em |
|---|---|
| Cor da paleta | `tailwind.config.ts` |
| Texto institucional do footer | `components/marketing/footer.tsx` |
| Lista de operadoras na trust-bar | `components/marketing/trust-bar.tsx` |
| Ordem dos produtos | `lib/mock-data.ts` (array `products[]`) |
| Faixas de funcionários | `lib/portes.ts` |
| Faixas etárias ANS / preço base de plano | `components/cotar/quote-wizard-saude.tsx` (consts `FAIXAS_ANS` e `PLANOS_SAUDE`) |
| Parser de upload em massa | `lib/beneficiario-import.ts` |
| Hero da home | `components/marketing/hero.tsx` |
| Pitch / argumentos para sócios | `app/pitch/page.tsx` |
| Compliance do Manual de Marca | `BRAND_COMPLIANCE.md` |

---

*Documento mantido manualmente. Sempre que uma decisão estrutural for
tomada, atualizar a seção §15 com data + commit hash.*
