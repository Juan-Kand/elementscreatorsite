"use client";
import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return { j: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 };
}

export default function CountdownTimer({
  target = new Date(Date.now() + 3 * 864e5).toISOString(),
  title = "Lancement dans",
}: { target?: string; title?: string }) {
  const t = new Date(target).getTime();
  const [left, setLeft] = useState(() => diff(t));
  useEffect(() => {
    const id = setInterval(() => setLeft(diff(t)), 1000);
    return () => clearInterval(id);
  }, [t]);
  const units: [keyof typeof left, string][] = [["j", "Jours"], ["h", "Heures"], ["m", "Minutes"], ["s", "Secondes"]];
  return (
    <section className="py-16 text-center">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-violet-600">{title}</h2>
      <div className="mt-6 flex justify-center gap-3 sm:gap-6" aria-live="off">
        {units.map(([k, label]) => (
          <div key={k} className="w-20 rounded-2xl border border-neutral-200 bg-white py-4 shadow-sm sm:w-24 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="font-mono text-3xl font-bold tabular-nums text-neutral-900 sm:text-4xl dark:text-white">{String(left[k]).padStart(2, "0")}</div>
            <div className="mt-1 text-xs text-neutral-500">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
