import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function TermosPage() {
  return (
    <main className="bg-ivory">
      <Navbar tone="dark" />
      <section className="container-wide max-w-3xl py-16 sm:py-24">
        <p className="eyebrow">Documento legal</p>
        <h1 className="heading-display mt-4 text-display-lg text-navy-900">Termos de uso</h1>
        <p className="mt-3 text-sm text-navy-700/70">Última atualização: 23 de abril de 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-navy-700/85">
          <section>
            <h2 className="font-display text-xl text-navy-900">1. Sobre a Affida</h2>
            <p className="mt-2">
              Affida Partners Corretora de Seguros Ltda. (CNPJ em processo), em associação com MDS
              Brasil Corretora e Administradora de Seguros Ltda. (CNPJ 01.233.200/0001-35), opera
              sob registro SUSEP do grupo MDS. Cotações, propostas e apólices intermediadas pelo
              site/portal seguem a regulamentação da SUSEP e das operadoras parceiras.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">2. Natureza da cotação</h2>
            <p className="mt-2">
              Os valores mostrados no cotador online são estimativas baseadas em parâmetros
              declarados pelo solicitante. Preços finais dependem de análise de risco da operadora,
              validação de dados e emissão oficial de proposta. Estimativas expiram em 7 dias.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">3. Uso do portal</h2>
            <p className="mt-2">
              O portal autenticado é restrito ao cliente contratante e representantes autorizados.
              Qualquer uso compartilhado ou acesso não autorizado deve ser comunicado imediatamente
              a <a href="mailto:suporte@affida.com.br" className="underline">suporte@affida.com.br</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">4. Responsabilidade</h2>
            <p className="mt-2">
              A Affida atua como intermediária. Responsabilidades por cobertura, sinistros e
              reembolsos seguem contrato da operadora. A Affida oferece suporte consultivo e
              defesa do cliente nas interações com a operadora.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">5. Programa de parceiros</h2>
            <p className="mt-2">
              O programa de parceiros é regido por contrato específico assinado digitalmente.
              Comissões são pagas todo dia 15 do mês subsequente à efetivação, enquanto a apólice
              indicada estiver ativa. Cancelamento da apólice cessa o pagamento no mês seguinte.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">6. Alterações</h2>
            <p className="mt-2">
              Estes termos podem ser atualizados. Alterações materiais serão comunicadas com 30
              dias de antecedência por e-mail e via portal.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
