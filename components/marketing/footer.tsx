import Link from "next/link";
import { AffidaLogo } from "@/components/ui/logo";

const footerNav = [
  {
    title: "Cotar online",
    items: [
      // Os 3 produtos do MVP (PDF Conselho D4.2). Demais ramos vão em
      // "Sob consulta" abaixo, sem cotador no MVP.
      { label: "Saúde Coletiva", href: "/cotar/saude-coletiva" },
      { label: "Odontológico", href: "/cotar/odonto-col" },
      { label: "Vida Empresarial", href: "/cotar/vida-empresarial" },
      { label: "Ver tudo em /cotar", href: "/cotar" },
    ],
  },
  {
    title: "Sob consulta",
    items: [
      { label: "Vida para Sócios", href: "/cotar/vida-socios" },
      { label: "Responsabilidade Civil", href: "/cotar/rc-profissional" },
      { label: "Frota", href: "/cotar/frota-leve" },
      { label: "Patrimonial", href: "/cotar/patrimonial" },
      { label: "Pet corporativo", href: "/cotar/pet-corporate" },
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
      { label: "Operadoras parceiras", href: "/#operadoras" },
      { label: "Programa de indicação", href: "/parceiros" },
      { label: "Cadastrar como indicador", href: "/parceiros/cadastro" },
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
        <div className="grid gap-12 lg:grid-cols-7">
          <div className="space-y-6 lg:col-span-2">
            {/* Aplicação primária do logo (Manual p.14 col 2): fundo Dress Blues + logo integral em UP cream */}
            <AffidaLogo tone="gold" variant="stacked" />
            <p className="font-light tracking-wider text-[13px] uppercase text-champagne-300/80">
              Construindo o futuro, juntos.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/70">
              Corretora autônoma de seguros e benefícios, registrada SUSEP, com código de
              corretagem aberto nas principais operadoras do Brasil. Foco PME e plano de saúde
              empresarial — serviço personalizado, próximo e de alto nível.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.22em] text-champagne-400/80">
              <span>SUSEP</span>
              <span className="h-1 w-1 rounded-full bg-champagne-500/40" />
              <span>ANS</span>
              <span className="h-1 w-1 rounded-full bg-champagne-500/40" />
              <span>LGPD</span>
              <span className="h-1 w-1 rounded-full bg-champagne-500/40" />
              <span>Cód. próprio</span>
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
