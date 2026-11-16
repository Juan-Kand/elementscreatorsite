type Tier = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const DEFAULT_TIERS: Tier[] = [
  { name: "Gratuit", price: "0 €", period: "/mois", description: "Pour découvrir.", features: ["1 projet", "Composants de base", "Support communautaire"], cta: "Commencer" },
  { name: "Pro", price: "19 €", period: "/mois", description: "Pour les indépendants.", features: ["Projets illimités", "Tous les composants", "Export du code", "Support prioritaire"], cta: "Passer Pro", highlighted: true },
  { name: "Équipe", price: "49 €", period: "/mois", description: "Pour les équipes.", features: ["Tout Pro", "5 membres inclus", "Bibliothèque partagée", "SSO"], cta: "Contacter les ventes" },
];

export default function PricingThreeTiers({ tiers = DEFAULT_TIERS, title = "Des tarifs simples et transparents" }: { tiers?: Tier[]; title?: string }) {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">{title}</h2>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                t.highlighted
                  ? "border-violet-500 shadow-xl shadow-violet-500/10 ring-1 ring-violet-500"
                  : "border-neutral-200 dark:border-neutral-800"
              }`}
            >
              {t.highlighted && <span className="mb-4 w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300">Le plus populaire</span>}
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{t.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">{t.description}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">{t.price}</span>
                {t.period && <span className="text-sm text-neutral-500">{t.period}</span>}
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2"><span aria-hidden className="text-violet-500">✓</span>{f}</li>
                ))}
              </ul>
              <button
                className={`mt-8 rounded-lg px-4 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                  t.highlighted ? "bg-violet-600 text-white hover:bg-violet-500" : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
