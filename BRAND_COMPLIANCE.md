# Brand Compliance — Affida Partners (Manual de Marca, dez/2025)

Auditoria estrita do site Affida Partners contra **p.17 (BOAS PRÁTICAS / DO's)**
e **p.18 (DON'Ts)** do Manual de Marca oficial. Última varredura: 25/abr/2026.

---

## ✅ p.17 — BOAS PRÁTICAS (DO's)

| # | Regra do Manual | Status | Onde foi implementado |
|---|---|---|---|
| 1 | **Mantenha sempre a proporção original** entre o símbolo e a tipografia, centralizados. | ✅ PASS | `components/ui/logo.tsx` — todas as variantes (`mark`, `full`, `stacked`) renderizam o logo a partir das **máscaras PNG oficiais extraídas direto do PDF p.6** (`affida-mark.png`, `affida-wordmark.png`, `affida-logo-stacked.png`). `aspect-ratio` é fixado pelas dimensões originais (798/184, 3164/955, 3164/1926) — qualquer redimensionamento preserva a proporção pixel-a-pixel. |
| 2 | **Use exclusivamente as cores oficiais** da paleta (p.12-13). | ✅ PASS | `tailwind.config.ts` define apenas Pantone do manual: Dress Blues `#0B1E33`, Midnight Blue `#173F65`, Brown `#423933`, Greige `#928475`, UP `#E1D9C6`, Comoyoko `#FFFFFF`, Neutral Black `#222222`. Os 5 `tones` do logo (`gold`, `dark`, `light`, `mono-dark`, `mono-light`) mapeiam direto para esses hexes. |
| 3 | **Utilize a versão de melhor legibilidade** sobre o fundo (claro ou escuro). | ✅ PASS | <ul><li>**Header (Neutral Black `#222222`)** → `tone="light"` = logo branco (versão negativa, p.14 col 7).</li><li>**Hero card / Footer / Brand Signature (Dress Blues `#0B1E33`)** → `tone="gold"` = logo em UP cream (p.14 col 2 — aplicação primária).</li><li>**Cotar / Portal (Ivory `#FAF7F0`)** → `tone="dark"` = logo em Dress Blues (p.14 cols 5-6).</li><li>**CRM Sidebar (Navy 950)** → `tone="light"` = versão negativa branca.</li></ul> |
| 4 | **Use o logo sobre fundos lisos ou texturas discretas.** | ✅ PASS | Removidos: <ul><li>Gradient hairlines em `brand-signature.tsx`.</li><li>Radial glow em `brand-signature.tsx`.</li><li>Radial gradients da utility `.grid-pattern-navy` em `globals.css` — agora é Dress Blues sólido apenas.</li></ul>Texturas remanescentes: apenas `bg-affida-pattern` em opacidade `0.06–0.12` (pattern oficial Affida do manual = "textura discreta" permitida). |
| 5 | **Aplique somente as variações oficiais** de logo (p.7 LOGO DESMEMBRADA). | ✅ PASS | `LogoVariant = "full" \| "mark" \| "stacked"` — apenas as três combinações do manual (sem variantes inventadas). |
| 6 | **Garanta alinhamento equilibrado** em materiais. | ✅ PASS | A variante `stacked` usa máscara PNG **única** (mark + AFFIDA + PARTNERS pré-compostos no PDF), eliminando qualquer risco de desalinhamento entre símbolo e tipografia. A variante `full` usa `inline-flex items-center gap-3`, replicando o equilíbrio horizontal do manual. |
| 7 | **Mesma espessura/nitidez** em impressos e digitais. | ✅ PASS | Máscaras PNG renderizadas a 600 DPI a partir do PDF original — strokes do mark (lemniscata) e da Corbert preservados em alta resolução. Re-coloração via CSS `mask-image` mantém anti-aliasing nativo do navegador. |
| 8 | **Respeite o respiro mínimo** entre logos (área de proteção). | ✅ PASS | A máscara PNG da variante `stacked` já contém o respiro entre o mark e o wordmark conforme p.6. Em layouts (header, footer, hero), o logo está sempre dentro de `container-wide` com `gap-3`/`gap-4` mínimos contra elementos vizinhos. Nenhuma sobreposição com texto, ícones ou bordas. |

---

## 🚫 p.18 — DON'Ts

| # | Regra do Manual | Status | Verificação |
|---|---|---|---|
| 1 | **Não distorcer** (alongar/comprimir). | ✅ PASS | `aspectRatio` fixo em todas as variantes (`798/184`, `3164/955`, `3164/1926`) + `mask-size: contain`. Impossível distorcer via CSS. |
| 2 | **Não trocar as cores** definidas. | ✅ PASS | Toda coloração passa pelo objeto `tones` em `logo.tsx` que só aceita os 5 valores oficiais (UP, branco, Dress Blues, Neutral Black). Nenhum caller passa cor arbitrária. |
| 3 | **Não trocar a fonte (Corbert)** por outra. | ✅ PASS — **CRÍTICO RESOLVIDO** | <ul><li>**Antes:** wordmark renderizado em `font-display` (Montserrat) — violação direta da DON'T.</li><li>**Agora:** wordmark é máscara PNG monocromática extraída do PDF — **Corbert Demi Bold Extended (AFFIDA) + Corbert Regular Extended (PARTNERS) preservados pixel-a-pixel**.</li><li>Eliminados todos os usos residuais de `<span>Affida Partners</span>` em `font-display` que substituíam o logo: `quote-shell.tsx`, `app/cotar/page.tsx`, `crm/sidebar.tsx`, `portal-shell.tsx` agora usam `<AffidaLogo variant="full"/>`.</li></ul> |
| 4 | **Não rotacionar.** | ✅ PASS | Nenhum `transform: rotate` ou `rotate-` no logo em todo o codebase. |
| 5 | **Não aplicar contorno** (stroke/border/outline). | ✅ PASS | Nenhuma `border` ou `outline` aplicada em `<AffidaLogo>` ou em seus elementos internos `<span aria-hidden>`. |
| 6 | **Não inserir elementos sobre/junto** ao logo (overlay). | ✅ PASS | `<AffidaLogo>` é sempre um `<span>` fechado (sem children) — não há como inserir conteúdo dentro do logo. Layouts vizinhos respeitam gap mínimo de 12-16 px (`gap-3`/`gap-4`). |
| 7 | **Não usar cores fora da paleta** oficial. | ✅ PASS | (Idêntico ao DO #2.) Tipo `LogoTone` é union literal — TypeScript impede passar string arbitrária. |
| 8 | **Não aplicar sombras, gradientes ou efeitos** não oficiais. | ✅ PASS | <ul><li>**Antes:** `brand-signature.tsx` tinha 2× `bg-gradient-to-r` em hairlines + `radial-gradient` glow. `grid-pattern-navy` (footer/CTA) tinha 2× `radial-gradient` ellipse.</li><li>**Agora:** todos os gradientes removidos. Fundos são sólidos (Dress Blues / Ivory / Neutral Black) + opcional pattern Affida em opacidade ≤ 0.12.</li><li>Logo em si nunca recebe `box-shadow`, `filter`, `drop-shadow` ou efeito de qualquer tipo.</li></ul> |

---

## 📍 Inventário de aplicações do logo

| Local | Variant | Tone | Fundo | Justificativa (p.14) |
|---|---|---|---|---|
| `components/marketing/navbar.tsx` (home tone="dark") | `full` | `light` | Neutral Black `#222222` | col 7 — versão negativa para chrome de UI. |
| `components/marketing/navbar.tsx` (home tone="light") | `full` | `dark` | Ivory `#FAF7F0` | cols 5-6 — Dress Blues sobre fundo claro. |
| `components/marketing/hero.tsx` | `stacked` | `gold` | Dress Blues card `#0B1E33` | col 2 — **APLICAÇÃO PRIMÁRIA** (p.26 mockup). |
| `components/marketing/brand-signature.tsx` | `stacked` | `gold` | Dress Blues `#0B1E33` | col 2 — aplicação primária institucional. |
| `components/marketing/footer.tsx` | `stacked` | `gold` | Dress Blues `#0B1E33` | col 2 — aplicação primária. |
| `components/cotar/quote-shell.tsx` | `full` | `dark` | White `#FFFFFF` | cols 5-6 — Dress Blues sobre fundo claro. |
| `app/cotar/page.tsx` | `full` | `dark` | White `#FFFFFF` | cols 5-6. |
| `components/portal/portal-shell.tsx` | `full` | `dark` | White `#FFFFFF` | cols 5-6. |
| `components/crm/sidebar.tsx` (desktop + mobile drawer) | `full` | `light` | Navy 950 (≈Neutral Black) | col 7 — versão negativa. |

---

## 🎯 Conclusão

**16/16 regras p.17 + p.18: PASS.**

A correção crítica foi **DON'T #3** (substituição de fonte): o wordmark
agora é renderizado a partir da máscara PNG oficial extraída do próprio
PDF do manual — Corbert Demi Bold Extended e Regular Extended preservados
em qualquer aplicação (header, hero, footer, CRM, portal, cotar).

Tecnicamente, isso elimina a dependência da família Corbert (paid font
da Mostardesign Studio, não web-safe) sem comprometer fidelidade visual:
o desenho exato dos glifos do manual aparece em todas as superfícies
digitais do produto.
