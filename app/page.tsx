import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { TrustBar } from "@/components/marketing/trust-bar";
import { Pillars } from "@/components/marketing/pillars";
import { ProductsGrid } from "@/components/marketing/products-grid";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { Advantage } from "@/components/marketing/advantage";
import { CtaFinal } from "@/components/marketing/cta-final";
import { Footer } from "@/components/marketing/footer";

/**
 * Home institucional Affida.
 *
 * Sequência de seções pensada para CONVERTER (não para narrar):
 *   Hero          → CTA primário "Cotar plano de saúde"
 *   TrustBar      → 6 operadoras (prova de acesso real)
 *   Pillars       → 3 SLAs verificáveis (≤72h, 100%, ≥50)
 *   ProductsGrid  → 3 grupos consultivos com CTA por grupo
 *   ProcessSteps  → como acontece a venda
 *   Advantage     → motor de re-oferta como diferencial
 *   CtaFinal      → CTA secundário (pra quem rolou até o fim)
 *   Footer        → nav + legal
 *
 * Removido: <BrandSignature /> entre TrustBar e Pillars. O logo gigante
 * Dress Blues no meio da página criava um bloco vazio entre conteúdos
 * já em fundo escuro — visualmente parecia "buraco" sem agregar valor
 * de venda. A identidade institucional já está reforçada no card do
 * hero (logo stacked tone="gold") e no footer.
 */
export default function HomePage() {
  return (
    <main className="bg-navy-900">
      <Navbar tone="dark" />
      <Hero />
      <TrustBar />
      <Pillars />
      <ProductsGrid />
      <ProcessSteps />
      <Advantage />
      <CtaFinal />
      <Footer />
    </main>
  );
}
