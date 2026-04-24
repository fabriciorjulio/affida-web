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
  title: "Affida Partners — Corretora boutique de seguros e benefícios",
  description:
    "Construindo o futuro, juntos. Corretora boutique premium de seguros e benefícios, em associação com MDS Group. Consultoria próxima, personalizada e de alto nível para empresas que valorizam relações de confiança.",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className="min-h-screen antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
