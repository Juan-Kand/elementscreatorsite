"use client";
import { useMemo, useState } from "react";

type CalEvent = { date: string; title: string; color?: "violet" | "green" | "amber" | "sky" };

const colors = {
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  green: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200",
  amber: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  sky: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
};
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function demoEvents(): CalEvent[] {
  const t = new Date();
  const d = (n: number) => iso(new Date(t.getFullYear(), t.getMonth(), n));
  return [
    { date: d(3), title: "Réunion équipe", color: "violet" },
    { date: d(8), title: "Lancement site", color: "green" },
    { date: d(8), title: "Apéro", color: "amber" },
    { date: d(15), title: "Rdv client", color: "sky" },
    { date: d(22), title: "Formation", color: "violet" },
  ];
}

/** Calendrier mensuel avec événements, navigation mois par mois et sélection d'un jour. */
export default function CalendarMonth({ events = demoEvents(), onSelectDay }: { events?: CalEvent[]; onSelectDay?: (date: string) => void }) {
  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(iso(today));

  const cells = useMemo(() => {
    const first = new Date(month);
    const offset = (first.getDay() + 6) % 7; // lundi = 0
    const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
    return Array.from({ length: 42 }, (_, k) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + k));
  }, [month]);

  const byDay = useMemo(() => {
    const m: Record<string, CalEvent[]> = {};
    for (const e of events) (m[e.date] ||= []).push(e);
    return m;
  }, [events]);

  const title = month.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  const shift = (d: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + d, 1));

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
        <h2 className="text-lg font-semibold capitalize text-neutral-900 dark:text-white">{title}</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => shift(-1)} aria-label="Mois précédent" className="rounded-lg px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900">‹</button>
          <button onClick={() => { setMonth(new Date(today.getFullYear(), today.getMonth(), 1)); setSelected(iso(today)); }} className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900">Aujourd'hui</button>
          <button onClick={() => shift(1)} aria-label="Mois suivant" className="rounded-lg px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900">›</button>
        </div>
      </div>
      <div role="grid" aria-label={title}>
        <div role="row" className="grid grid-cols-7 border-b border-neutral-200 text-center text-xs font-medium text-neutral-500 dark:border-neutral-800">
          {DAYS.map((d) => <div key={d} role="columnheader" className="py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d) => {
            const key = iso(d);
            const inMonth = d.getMonth() === month.getMonth();
            const isToday = key === iso(today);
            const isSel = key === selected;
            const evs = byDay[key] || [];
            return (
              <button
                key={key}
                role="gridcell"
                aria-selected={isSel}
                aria-label={`${d.toLocaleDateString("fr-FR", { dateStyle: "full" })}${evs.length ? `, ${evs.length} événement(s)` : ""}`}
                onClick={() => { setSelected(key); onSelectDay?.(key); }}
                className={`min-h-24 border-b border-r border-neutral-100 p-1.5 text-left align-top transition hover:bg-neutral-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-900 dark:hover:bg-neutral-900 ${isSel ? "bg-violet-50/60 dark:bg-violet-950/30" : ""}`}
              >
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${isToday ? "bg-violet-600 font-semibold text-white" : inMonth ? "text-neutral-900 dark:text-white" : "text-neutral-300 dark:text-neutral-700"}`}>
                  {d.getDate()}
                </span>
                <span className="mt-1 block space-y-1">
                  {evs.slice(0, 2).map((e, k) => (
                    <span key={k} className={`block truncate rounded px-1.5 py-0.5 text-[11px] font-medium ${colors[e.color ?? "violet"]}`}>{e.title}</span>
                  ))}
                  {evs.length > 2 && <span className="block px-1.5 text-[11px] text-neutral-500">+{evs.length - 2} autres</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
