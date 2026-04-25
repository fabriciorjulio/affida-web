import { notFound } from "next/navigation";
import { products, productById } from "@/lib/mock-data";
import { QuoteWizard } from "@/components/cotar/quote-wizard";
import { QuoteWizardSaude } from "@/components/cotar/quote-wizard-saude";

export function generateStaticParams() {
  return products.map((p) => ({ product: p.id }));
}

export function generateMetadata({ params }: { params: { product: string } }) {
  const p = productById(params.product);
  if (!p) return { title: "Cotação · Affida Partners" };
  return {
    title: `Cotar ${p.name} · Affida Partners`,
    description: p.description,
  };
}

export default function CotarPage({ params }: { params: { product: string } }) {
  const product = productById(params.product);
  if (!product) notFound();

  // Saúde tem fluxo próprio: precificação por faixa etária ANS (RN 63/RN 309),
  // o que exige coletar data de nascimento, sexo e parentesco de cada
  // beneficiário. Demais ramos (vida, odonto, frota, RC, patrimonial, pet)
  // seguem o wizard genérico (CNPJ + nº de vidas + cobertura agregada).
  if (product!.segment === "saude") {
    return <QuoteWizardSaude product={product!} />;
  }
  return <QuoteWizard product={product!} />;
}
