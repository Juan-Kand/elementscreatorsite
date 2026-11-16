type Row = { feature: string; values: (boolean | string)[] };

export default function ComparisonTable({
  plans = ["Gratuit", "Pro", "Équipe"],
  rows = [
    { feature: "Projets", values: ["1", "Illimités", "Illimités"] },
    { feature: "Composants premium", values: [false, true, true] },
    { feature: "Génération IA", values: [false, true, true] },
    { feature: "Bibliothèque partagée", values: [false, false, true] },
    { feature: "SSO", values: [false, false, true] },
  ],
}: { plans?: string[]; rows?: Row[] }) {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl overflow-x-auto px-6">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Comparatif des offres</caption>
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <th scope="col" className="py-4 font-medium text-neutral-500">Fonctionnalité</th>
              {plans.map((p) => (
                <th key={p} scope="col" className="py-4 text-center font-semibold text-neutral-900 dark:text-white">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature} className="border-b border-neutral-100 dark:border-neutral-900">
                <th scope="row" className="py-4 font-normal text-neutral-700 dark:text-neutral-300">{r.feature}</th>
                {r.values.map((v, i) => (
                  <td key={i} className="py-4 text-center text-neutral-900 dark:text-white">
                    {typeof v === "boolean" ? (
                      v ? <span className="text-violet-600" aria-label="Inclus">✓</span> : <span className="text-neutral-300 dark:text-neutral-700" aria-label="Non inclus">—</span>
                    ) : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
