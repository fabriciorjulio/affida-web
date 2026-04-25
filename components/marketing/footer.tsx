import Link from "next/link";
import { AffidaLogo } from "@/components/ui/logo";

const footerNav = [
  {
    title: "Seguros",
    items: [
      { label: "Vida Empresarial", href: "/cotar/vida-empresarial" },
      { label: "Vida para Sócios", href: "/cotar/vida-socios" },
      { label: "Saúde Coletiva", href: "/cotar/saude-coletiva" },
      { label: "Odontológico", href: "/cotar/odonto-col" },
      { label: "Responsabilidade Civil", href: "/cotar/rc-profissional" },
      { label: "Frota", href: "/cotar/frota-leve" },
    ],
  },
  {
    title: "Consultoria",
    items: [
      { label: "Processo Affida", href: "/#consultoria" },
      { label: "Benchmark setorial", href: "/#benchmark" },
      { label: "Motor de re-oferta", href: "/#reoferta" },
      { label: "Conciliação de faturas", href: "/#conciliacao" },
    ],
  },
  {
    title: "Institucional",
    items: [
      { label: "Sobre a Affida", href: "/#sobre" },
      { label: "Associação MDS", href: "/#mds" },
      { label: "Parceiros & Indicadores", href: "/parceiros" },
      { label: "Carreiras", href: "/#carreiras" },
      { label: "Imprensa", href: "/#imprensa" },
    ],
  },
  {
    title: "Atendimento",
    items: [
      { label: "Área do cliente", href: "/portal" },
      { label: "Falar com consultor", href: "/#contato" },
      { label: "WhatsApp", href: "https://wa.me/5511900000000" },
      { label: "contato@affida.partners", href: "mailto:contato@affida.partners" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="grid-pattern-navy relative overflow-hidden border-t border-champagne-500/10 bg-navy-900 text-ivory">
      {/* Pattern oficial Affida em opacidade reduzida — manual p.18 (DON'T):
          "Não utilizar a logo sobre imagens ou texturas que prejudiquem a leitura". */}
      <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-[0.12]" />
      <div className="container-wide relative z-10 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            {/* Aplicação primária do logo (Manual p.14, primeira coluna positiva): fundo Dress Blues + AFFIDA Greige */}
            <AffidaLogo tone="gold" variant="stacked" />
            <p className="font-light tracking-wider text-[13px] uppercase text-champagne-300/80">
              Construindo o futuro, juntos.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/70">
              Corretora boutique de seguros e benefícios, criada para oferecer serviço
              personalizado, próximo e de alto nível. Em associação com MDS Group, parte do
              Grupo Ardonagh.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-champagne-400/80">
              <span>MDS Group</span>
              <span className="h-1 w-1 rounded-full bg-champagne-500/40" />
              <span>Brokerslink</span>
              <span className="h-1 w-1 rounded-full bg-champagne-500/40" />
              <span>Ardonagh</span>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5 text-champagne-500">{col.title}</p>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-champagne-500/10 pt-8 text-xs text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Affida Partners — Consultoria de seguros e benefícios. Corretora registrada SUSEP.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacidade" className="hover:text-ivory">Privacidade (LGPD)</Link>
            <Link href="/legal/termos" className="hover:text-ivory">Termos</Link>
            <Link href="/legal/suitability" className="hover:text-ivory">Suitability</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
