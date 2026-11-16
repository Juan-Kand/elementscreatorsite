"use client";
import { useState } from "react";

type Plan = { name: string; monthly: number; yearly: number; features: string[]; highlighted?: boolean };

const DEFAULT: Plan[] = [
  { name: "Starter", monthly: 9, yearly: 90, features: ["3 projets", "Composants de base", "Support e-mail"] },
  { name: "Pro", monthly: 29, yearly: 290, features: ["Projets illimités", "Tous les composants", "Génération IA", "Support prioritaire"], highlighted: true },
  { name: "Business", monthly: 79, yearly: 790, features: ["Tout Pro", "10 membres", "SSO & audit", "Accompagnement dédié"] },
];

export default function PricingToggle({ plans = DEFAULT, currency = "€" }: { plans?: Plan[]; currency?: string }) {
  const [yearly, setYearly] = useState(false);
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">Choisissez votre formule</h2>
          <div role="radiogroup" aria-label="Période de facturation" className="mt-8 inline-flex rounded-full bg-neutral-100 p-1 dark:bg-neutral-900">
            {[false, true].map((y) => (
              <button
                key={String(y)}
                role="radio"
                aria-checked={yearly === y}
                onClick={() => setYearly(y)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  yearly === y ? "bg-white text-neutral-900 shadow dark:bg-neutral-800 dark:text-white" : "text-neutral-500"
                }`}
              >
                {y ? "Annuel (−2 mois)" : "Mensuel"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-2xl border p-8 ${p.highlighted ? "border-violet-500 ring-1 ring-violet-500" : "border-neutral-200 dark:border-neutral-800"}`}>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{p.name}</h3>
              <p className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">{yearly ? p.yearly : p.monthly} {currency}</span>
                <span className="text-sm text-neutral-500">/{yearly ? "an" : "mois"}</span>
              </p>
              <ul className="mt-6 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><span aria-hidden className="text-violet-500">✓</span>{f}</li>
                ))}
              </ul>
              <button className={`mt-8 w-full rounded-lg py-2.5 text-sm font-semibold ${p.highlighted ? "bg-violet-600 text-white hover:bg-violet-500" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white"}`}>
                Choisir {p.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
