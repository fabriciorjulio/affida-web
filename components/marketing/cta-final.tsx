import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaFinal() {
  return (
    <section className="grid-pattern-navy relative overflow-hidden" id="contato">
      <div className="absolute inset-0 bg-affida-pattern bg-repeat opacity-30" />
      <div className="container-wide relative z-10 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-champagne-500">Parcerias verdadeiras</p>
          <h2 className="heading-display mt-5 text-display-xl text-ivory text-balance">
            Para construir o futuro,{" "}
            <em className="font-display font-normal italic text-champagne-300">juntos.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ivory/75">
            Vamos conversar sobre a sua empresa. Em 30 minutos, apresentamos um benchmark setorial
            e mostramos o que podemos fazer — sem compromisso de contratação.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/cotar/vida-empresarial" variant="gold" size="lg">
              Solicitar análise consultiva
              <ArrowRight size={16} />
            </Button>
            <Button href="https://wa.me/5511900000000" variant="outline" size="lg">
              <MessageCircle size={14} />
              WhatsApp consultivo
            </Button>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 border-t border-champagne-500/10 pt-8 text-sm text-ivory/60">
            <a href="mailto:contato@affida.partners" className="inline-flex items-center gap-2 hover:text-ivory">
              <Mail size={14} />
              contato@affida.partners
            </a>
            <span className="h-1 w-1 rounded-full bg-champagne-500/40" />
            <span>+55 11 3000-0000</span>
            <span className="h-1 w-1 rounded-full bg-champagne-500/40" />
            <span>Av. Brigadeiro Faria Lima, São Paulo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
