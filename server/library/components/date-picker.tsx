"use client";
import { useEffect, useMemo, useRef, useState } from "react";

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Sélecteur de date : champ + calendrier déroulant, dates passées désactivables. */
export default function DatePicker({
  label = "Date d'arrivée",
  value,
  onChange,
  disablePast = true,
}: { label?: string; value?: string; onChange?: (date: string) => void; disablePast?: boolean }) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<string | undefined>(value);
  const base = sel ? new Date(sel) : new Date();
  const [month, setMonth] = useState(new Date(base.getFullYear(), base.getMonth(), 1));
  const root = useRef<HTMLDivElement>(null);
  const todayIso = iso(new Date());

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, [open]);

  const cells = useMemo(() => {
    const offset = (month.getDay() + 6) % 7;
    const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(offset).fill(null), ...Array.from({ length: daysIn }, (_, k) => new Date(month.getFullYear(), month.getMonth(), k + 1))];
  }, [month]);

  const pick = (d: Date) => { const v = iso(d); setSel(v); onChange?.(v); setOpen(false); };
  const display = sel ? new Date(sel).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long", year: "numeric" }) : "Choisir une date";

  return (
    <div ref={root} className="relative w-72">
      <span className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)}
        className="mt-1 flex w-full items-center justify-between rounded-lg border border-neutral-300 bg-white px-3 py-2 text-left text-sm text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white">
        <span className={sel ? "" : "text-neutral-400"}>{display}</span>
        <span aria-hidden>📅</span>
      </button>
      {open && (
        <div role="dialog" aria-label="Choisir une date" className="absolute z-50 mt-2 w-full rounded-xl border border-neutral-200 bg-white p-3 shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
          <div className="mb-2 flex items-center justify-between">
            <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label="Mois précédent" className="rounded px-2 py-1 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900">‹</button>
            <span className="text-sm font-semibold capitalize text-neutral-900 dark:text-white">{month.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</span>
            <button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label="Mois suivant" className="rounded px-2 py-1 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900">›</button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs text-neutral-500">{DAYS.map((d, i) => <span key={i} className="py-1">{d}</span>)}</div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <span key={`x${i}`} />;
              const v = iso(d);
              const disabled = disablePast && v < todayIso;
              return (
                <button key={v} disabled={disabled} onClick={() => pick(d)} aria-pressed={v === sel}
                  className={`h-9 rounded-lg text-sm transition disabled:cursor-not-allowed disabled:text-neutral-300 dark:disabled:text-neutral-700 ${
                    v === sel ? "bg-violet-600 font-semibold text-white" : v === todayIso ? "font-semibold text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950" : "text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
                  }`}>
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
