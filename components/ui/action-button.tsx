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
  disabled?: boolean;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function ActionButton({
  children,
  className,
  action,
  message,
  whatsappMessage,
  mailSubject,
  href,
  disabled,
  type = "button",
  ...rest
}: Props) {
  function handle(e: React.MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }
    switch (action) {
      case "whatsapp":
        e.preventDefault();
        openWhatsapp(whatsappMessage);
        return;
      case "email":
        e.preventDefault();
        openMail(mailSubject);
        return;
      case "schedule":
        e.preventDefault();
        openWhatsapp(
          whatsappMessage ?? "Gostaria de agendar uma conversa com o time Affida."
        );
        return;
      case "download":
        e.preventDefault();
        toast(message ?? "Gerando PDF... enviaremos em instantes.", "success");
        return;
      case "demo":
        e.preventDefault();
        toast(
          message ?? "MVP — ação simulada para demonstração.",
          "info"
        );
        return;
      case "toast":
      default:
        e.preventDefault();
        toast(message ?? "Ação registrada.", "success");
        return;
    }
  }

  if (href) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={handle}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
