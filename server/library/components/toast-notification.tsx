"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type Toast = { id: number; title: string; description?: string; tone?: "success" | "error" | "info" };
const Ctx = createContext<(t: Omit<Toast, "id">) => void>(() => {});

/** Envelopper l'app dans <ToastProvider>, puis : const toast = useToast(); toast({ title: "Enregistré" }) */
export function useToast() {
  return useContext(Ctx);
}

const icons = { success: "✓", error: "!", info: "i" };
const colors = { success: "bg-green-600", error: "bg-red-600", info: "bg-violet-600" };

export default function ToastProvider({ children, duration = 4000 }: { children: ReactNode; duration?: number }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const remove = (id: number) => setToasts((l) => l.filter((t) => t.id !== id));
  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((l) => [...l, { ...t, id }]);
    setTimeout(() => remove(id), duration);
  }, [duration]);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-80 flex-col gap-3">
        {toasts.map((t) => (
          <div key={t.id} role="status" className="pointer-events-auto flex gap-3 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
            <span aria-hidden className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${colors[t.tone ?? "info"]}`}>{icons[t.tone ?? "info"]}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">{t.title}</p>
              {t.description && <p className="mt-0.5 text-sm text-neutral-500">{t.description}</p>}
            </div>
            <button onClick={() => remove(t.id)} aria-label="Fermer" className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200">×</button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
