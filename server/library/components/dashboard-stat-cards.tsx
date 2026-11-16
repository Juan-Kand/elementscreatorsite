type Kpi = { label: string; value: string; change: number; spark: number[] };

const DEFAULT: Kpi[] = [
  { label: "Chiffre d'affaires", value: "48 250 €", change: 12.4, spark: [4, 6, 5, 8, 7, 9, 11] },
  { label: "Nouveaux clients", value: "312", change: 5.1, spark: [3, 4, 4, 5, 6, 5, 7] },
  { label: "Taux de conversion", value: "3,8 %", change: -0.6, spark: [6, 5, 6, 5, 4, 5, 4] },
  { label: "Panier moyen", value: "86 €", change: 2.3, spark: [5, 5, 6, 6, 7, 6, 7] },
];

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * 100},${30 - ((d - min) / (max - min || 1)) * 28 - 1}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden className="h-8 w-24">
      <polyline points={pts} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" className={up ? "stroke-green-500" : "stroke-red-500"} />
    </svg>
  );
}

export default function DashboardStatCards({ kpis = DEFAULT }: { kpis?: Kpi[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((k) => {
        const up = k.change >= 0;
        return (
          <div key={k.label} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950">
            <p className="text-sm text-neutral-500">{k.label}</p>
            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">{k.value}</p>
              <Sparkline data={k.spark} up={up} />
            </div>
            <p className={`mt-2 text-xs font-medium ${up ? "text-green-600" : "text-red-600"}`}>
              {up ? "▲" : "▼"} {Math.abs(k.change).toLocaleString("fr-FR")} % <span className="font-normal text-neutral-500">vs mois dernier</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
