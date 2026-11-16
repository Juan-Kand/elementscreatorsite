type Stat = { value: string; label: string };

export default function StatsRow({
  stats = [
    { value: "10k+", label: "Utilisateurs actifs" },
    { value: "250", label: "Composants" },
    { value: "99,9 %", label: "Disponibilité" },
    { value: "4,9/5", label: "Note moyenne" },
  ],
}: { stats?: Stat[] }) {
  return (
    <section className="bg-white py-16 dark:bg-neutral-950">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <dt className="text-sm text-neutral-500">{s.label}</dt>
            <dd className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
