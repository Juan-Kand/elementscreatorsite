"use client";
import { useState, type ReactNode } from "react";

type Tone = "info" | "success" | "warning" | "error";
const styles: Record<Tone, { box: string; icon: string }> = {
  info: { box: "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200", icon: "ℹ" },
  success: { box: "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-200", icon: "✓" },
  warning: { box: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200", icon: "⚠" },
  error: { box: "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200", icon: "✕" },
};

export default function AlertBanner({
  tone = "info",
  title = "Mise à jour disponible",
  children = "Une nouvelle version est prête. Rechargez la page pour en profiter.",
  dismissible = true,
}: { tone?: Tone; title?: string; children?: ReactNode; dismissible?: boolean }) {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const s = styles[tone];
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`flex gap-3 rounded-xl border p-4 ${s.box}`}>
      <span aria-hidden className="font-bold">{s.icon}</span>
      <div className="flex-1 text-sm">
        <p className="font-semibold">{title}</p>
        <div className="mt-0.5 opacity-90">{children}</div>
      </div>
      {dismissible && <button onClick={() => setOpen(false)} aria-label="Fermer" className="self-start opacity-60 hover:opacity-100">×</button>}
    </div>
  );
}
