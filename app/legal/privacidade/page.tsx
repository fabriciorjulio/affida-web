import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function PrivacidadePage() {
  return (
    <main className="bg-ivory">
      <Navbar tone="dark" />
      <section className="container-wide max-w-3xl py-16 sm:py-24">
        <p className="eyebrow">Documento legal</p>
        <h1 className="heading-display mt-4 text-display-lg text-navy-900">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-sm text-navy-700/70">
          Última atualização: 23 de abril de 2026
        </p>

        <div className="prose-affida mt-10 space-y-6 text-sm leading-relaxed text-navy-700/85">
          <section>
            <h2 className="font-display text-xl text-navy-900">1. Controlador de dados</h2>
            <p className="mt-2">
              Affida Partners Corretora de Seguros Ltda. — corretora autônoma registrada SUSEP — é a
              controladora dos dados pessoais tratados neste site e nos portais autenticados. DPO:{" "}
              <a href="mailto:dpo@affida.com.br" className="underline">
                dpo@affida.com.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">2. Dados que coletamos</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Dados cadastrais de empresa (CNPJ, razão social, porte, CNAE).</li>
              <li>Contatos de responsáveis (nome, cargo, e-mail, telefone).</li>
              <li>Dados das vidas beneficiárias necessários para contratação de apólice.</li>
              <li>Dados de navegação (cookies, IP, páginas visitadas) para analytics agregado.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">3. Bases legais (LGPD Art. 7)</h2>
            <p className="mt-2">
              Tratamos dados com base em: (i) execução de contrato e diligências pré-contratuais,
              (ii) cumprimento de obrigação legal/regulatória (SUSEP, ANS, CVM), e (iii) legítimo
              interesse para benchmark setorial anonimizado e melhoria contínua do serviço.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">4. Compartilhamento</h2>
            <p className="mt-2">
              Compartilhamos estritamente o necessário com operadoras parceiras (Amil, Bradesco
              Saúde, SulAmérica, Porto Saúde, Unimed, Care Plus, Omint, Icatu, Prudential, MetLife e outras)
              para efetivação de cotação e apólice. Operamos sob código de corretagem próprio —
              não há intermediários adicionais entre Affida e operadora. Não vendemos dados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">5. Retenção</h2>
            <p className="mt-2">
              Dados de apólices ativas são mantidos enquanto durar a relação contratual. Após o
              encerramento, retemos por 5 anos para cumprir prazos de SUSEP e fiscais, depois
              eliminamos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">6. Seus direitos</h2>
            <p className="mt-2">
              Você pode solicitar acesso, correção, anonimização ou exclusão de dados, portabilidade
              e revogação de consentimento escrevendo para{" "}
              <a href="mailto:dpo@affida.com.br" className="underline">
                dpo@affida.com.br
              </a>
              . Respondemos em até 15 dias.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-navy-900">7. Segurança</h2>
            <p className="mt-2">
              Criptografia em trânsito (TLS 1.3) e em repouso, controle de acesso por papel,
              auditoria de acessos sensíveis e revisão periódica de segurança da informação por
              equipe interna dedicada.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
