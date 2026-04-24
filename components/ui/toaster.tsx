"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Info } from "lucide-react";

type Tone = "default" | "success" | "info";
type ToastItem = { id: number; message: string; tone: Tone };

const EVENT = "affida:toast";

export function toast(message: string, tone: Tone = "default") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { message, tone } }));
}

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail as { message: string; tone: Tone };
      const id = Date.now() + Math.random();
      setItems((s) => [...s, { id, message: d.message, tone: d.tone }]);
      setTimeout(() => {
        setItems((s) => s.filter((t) => t.id !== id));
      }, 3800);
    };
    window.addEventListener(EVENT, handler as EventListener);
    return () => window.removeEventListener(EVENT, handler as EventListener);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-2 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end">
      {items.map((t) => {
        const Icon = t.tone === "success" ? CheckCircle2 : Info;
        const accent =
          t.tone === "success"
            ? "text-emerald-300"
            : t.tone === "info"
            ? "text-sky-300"
            : "text-champagne-300";
        return (
          <div
            key={t.id}
            className="pointer-events-auto flex w-full items-start gap-3 rounded-2xl border border-champagne-500/30 bg-navy-900/95 px-4 py-3 text-sm text-ivory shadow-premium backdrop-blur animate-in slide-in-from-bottom-2 sm:w-auto sm:max-w-sm"
          >
            <Icon size={16} className={`mt-0.5 shrink-0 ${accent}`} />
            <span className="leading-snug">{t.message}</span>
          </div>
        );
      })}
    </div>
  );
}
