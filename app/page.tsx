import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { TrustBar } from "@/components/marketing/trust-bar";
import { BrandSignature } from "@/components/marketing/brand-signature";
import { Pillars } from "@/components/marketing/pillars";
import { ProductsGrid } from "@/components/marketing/products-grid";
import { ProcessSteps } from "@/components/marketing/process-steps";
import { Advantage } from "@/components/marketing/advantage";
import { CtaFinal } from "@/components/marketing/cta-final";
import { Footer } from "@/components/marketing/footer";

export default function HomePage() {
  return (
    <main className="bg-ivory">
      <Navbar tone="dark" />
      <Hero />
      <TrustBar />
      {/* Assinatura institucional — logo em Dress Blues + Midnight Blue (identidade primária, p.14 do manual) */}
      <BrandSignature />
      <Pillars />
      <ProductsGrid />
      <ProcessSteps />
      <Advantage />
      <CtaFinal />
      <Footer />
    </main>
  );
}
