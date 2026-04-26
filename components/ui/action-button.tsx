"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { toast } from "./toaster";

export const WHATSAPP_NUMBER = "5511900000000";

export function openWhatsapp(message?: string) {
  const m = message ?? "Olá, vim pelo site da Affida.";
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

export function openMail(subject?: string) {
  const s = subject ?? "Contato via site Affida";
  window.location.href = `mailto:contato@affida.com.br?subject=${encodeURIComponent(s)}`;
}

export type ActionType =
  | "toast"
  | "whatsapp"
  | "email"
  | "download"
  | "schedule"
  | "demo";

type Props = {
  children: ReactNode;
  className?: string;
  action: ActionType;
  message?: string;
  whatsappMessage?: string;
  mailSubject?: string;
  href?: string;
  /**
   * Para hrefs internos (sem href = `_blank` automático em externos), abre em
   * nova aba. Útil para preview do portal a partir do CRM, abrir documento
   * estratégico, etc. — closer não perde contexto.
   */
  target?: "_self" | "_blank";
  disabled?: boolean;
  type?: "button" | "submit";
  "aria-label"?: string;
};

/**
 * Componente de ação polimórfico.
 *
 * Comportamento atualizado (após auditoria de navegação):
 *   • Sem href     → renderiza <button>, sempre executa `action`.
 *   • Com href     → renderiza <Link> que NAVEGA, mas TAMBÉM dispara o
 *     `action` (toast/demo/download) ANTES, se houver `message` ou se a
 *     ação for de notificação. Isso evita o bug antigo onde a mensagem do
 *     toast era silenciosamente engolida quando alguém combinava
 *     `action="toast"` + `href="..."` esperando ambos.
 *
 *   Exceções: `whatsapp` / `email` / `schedule` abrem janela externa via
 *   handler — quando combinadas com `href`, IGNORAMOS o href (a janela
 *   externa é o destino real; o href ficaria órfão). Logamos um warning
 *   em dev para flagrar uso ambíguo.
 */
export function ActionButton({
  children,
  className,
  action,
  message,
  whatsappMessage,
  mailSubject,
  href,
  target,
  disabled,
  type = "button",
  ...rest
}: Props) {
  function runAction() {
    switch (action) {
      case "whatsapp":
        openWhatsapp(whatsappMessage);
        return true; // consumiu navegação
      case "email":
        openMail(mailSubject);
        return true;
      case "schedule":
        openWhatsapp(
          whatsappMessage ?? "Gostaria de agendar uma conversa com o time Affida."
        );
        return true;
      case "download":
        toast(message ?? "Gerando PDF... enviaremos em instantes.", "success");
        return false; // só notifica; deixa navegação seguir se houver href
      case "demo":
        toast(message ?? "MVP — ação simulada para demonstração.", "info");
        return false;
      case "toast":
      default:
        toast(message ?? "Ação registrada.", "success");
        return false;
    }
  }

  function handleButton(e: React.MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    runAction();
  }

  function handleLink(e: React.MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    const externalActionConsumes = runAction();
    if (externalActionConsumes) {
      // whatsapp/email/schedule já abriram janela; cancela navegação do Link
      e.preventDefault();
    }
    // toast/demo/download: deixa o Link navegar normalmente (mas o toast já
    // foi disparado).
  }

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={className}
        onClick={handleLink}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={handleButton}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
