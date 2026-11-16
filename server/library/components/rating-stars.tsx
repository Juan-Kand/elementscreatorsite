"use client";
import { useState } from "react";

/** Notation par étoiles (saisie) — boutons radio accessibles, survol et clavier. */
export default function RatingStars({ label = "Votre note", defaultValue = 0, onChange }: { label?: string; defaultValue?: number; onChange?: (v: number) => void }) {
  const [value, setValue] = useState(defaultValue);
  const [hover, setHover] = useState(0);
  const words = ["", "Décevant", "Moyen", "Bien", "Très bien", "Excellent"];
  const shown = hover || value;
  return (
    <fieldset>
      <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{label}</legend>
      <div className="mt-1 flex items-center gap-3">
        <div className="flex" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer p-0.5" onMouseEnter={() => setHover(n)}>
              <input type="radio" name="rating" value={n} checked={value === n} onChange={() => { setValue(n); onChange?.(n); }} className="peer sr-only" />
              <span className="sr-only">{n} étoile{n > 1 ? "s" : ""}</span>
              <svg aria-hidden viewBox="0 0 24 24" className={`h-8 w-8 transition peer-focus-visible:rounded peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 ${n <= shown ? "fill-amber-400" : "fill-neutral-200 dark:fill-neutral-800"}`}>
                <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" />
              </svg>
            </label>
          ))}
        </div>
        <span className="text-sm text-neutral-500" aria-live="polite">{words[shown]}</span>
      </div>
    </fieldset>
  );
}
