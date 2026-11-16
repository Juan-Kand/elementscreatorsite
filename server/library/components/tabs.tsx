"use client";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = { label: string; content: ReactNode };

const DEFAULT: Tab[] = [
  { label: "Aperçu", content: <p>Vue d'ensemble de votre projet et des dernières activités.</p> },
  { label: "Fichiers", content: <p>Tous les documents partagés avec l'équipe.</p> },
  { label: "Réglages", content: <p>Nom du projet, membres et permissions.</p> },
];

export default function Tabs({ tabs = DEFAULT }: { tabs?: Tab[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (active + dir + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };
  return (
    <div>
      <div role="tablist" className="flex gap-1 border-b border-neutral-200 dark:border-neutral-800" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
              active === i ? "border-violet-600 text-violet-700 dark:text-violet-300" : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={active !== i}
          className="py-6 text-neutral-700 dark:text-neutral-300">
          {t.content}
        </div>
      ))}
    </div>
  );
}
