import { notFound } from "next/navigation";
import { products, productById } from "@/lib/mock-data";
import { QuoteWizard } from "@/components/cotar/quote-wizard";

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
  return <QuoteWizard product={product!} />;
}
