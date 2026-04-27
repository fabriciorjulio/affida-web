import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

/**
 * Tipografia oficial Affida Partners — Manual de Marca, dez/2025.
 * Títulos em Montserrat Light/Regular, subtítulos em Ultra Light, corpo em Light.
 * Uma única família com múltiplos pesos cobre toda a hierarquia pedida pelo manual.
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Affida Partners — Plano de saúde empresarial",
  description:
    "Corretora autônoma SUSEP com código aberto nas principais operadoras (Amil, Bradesco Saúde, SulAmérica e Unimed). Cotação de plano de saúde empresarial em minutos, com consultoria boutique e benchmark setorial — para empresas que valorizam relações de confiança.",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` },
  // GitHub Pages serve HTML com cache padrão e o browser segura a versão
  // antiga até expirar. Estas meta tags forçam revalidação a cada visita
  // — assets em /_next/* já têm hash no nome, não há risco de quebrar.
  other: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        {/* Reforço explícito do cache-busting via meta http-equiv. O HTTP
            header equivalente seria preferível, mas GitHub Pages não
            permite headers customizados — meta http-equiv é a alternativa
            que funciona em todos os navegadores. */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
