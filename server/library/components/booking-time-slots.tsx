"use client";
import { useMemo, useState } from "react";

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Prise de rendez-vous : choix du jour (7 prochains jours) puis d'un créneau horaire. */
export default function BookingTimeSlots({
  title = "Réserver un appel découverte (30 min)",
  slots = ["09:00", "09:30", "10:00", "11:00", "14:00", "14:30", "15:30", "16:00", "17:00"],
  unavailable = ["10:00", "15:30"],
  onConfirm,
}: { title?: string; slots?: string[]; unavailable?: string[]; onConfirm?: (r: { date: string; time: string }) => void }) {
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return d; }), []);
  const [day, setDay] = useState(iso(days[0]));
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (done && time) {
    return (
      <div role="status" className="mx-auto max-w-md rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950">
        <p className="text-3xl" aria-hidden>✓</p>
        <p className="mt-2 font-semibold text-green-900 dark:text-green-200">Rendez-vous confirmé</p>
        <p className="mt-1 text-sm text-green-800 dark:text-green-300">{new Date(day).toLocaleDateString("fr-FR", { dateStyle: "full" })} à {time}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h2>
      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Jour</legend>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {days.map((d) => {
            const v = iso(d);
            return (
              <button key={v} onClick={() => { setDay(v); setTime(null); }} aria-pressed={v === day}
                className={`flex w-16 shrink-0 flex-col items-center rounded-xl border py-2 text-sm transition ${v === day ? "border-violet-600 bg-violet-600 text-white" : "border-neutral-200 text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-300"}`}>
                <span className="text-xs capitalize opacity-80">{d.toLocaleDateString("fr-FR", { weekday: "short" })}</span>
                <span className="text-lg font-semibold">{d.getDate()}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Créneau</legend>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {slots.map((s) => {
            const off = unavailable.includes(s);
            return (
              <button key={s} disabled={off} onClick={() => setTime(s)} aria-pressed={s === time}
                className={`rounded-lg border py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:border-dashed disabled:text-neutral-300 dark:disabled:text-neutral-700 ${s === time ? "border-violet-600 bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300" : "border-neutral-200 text-neutral-700 hover:border-violet-400 dark:border-neutral-800 dark:text-neutral-300"}`}>
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>
      <button disabled={!time} onClick={() => { onConfirm?.({ date: day, time: time! }); setDone(true); }}
        className="mt-6 w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40">
        {time ? `Confirmer le ${new Date(day).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} à ${time}` : "Choisissez un créneau"}
      </button>
    </div>
  );
}
