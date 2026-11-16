type Event = { date: string; title: string; description: string };

const DEFAULT: Event[] = [
  { date: "2023", title: "Le début", description: "Deux amis, un garage et une idée : simplifier la création de sites." },
  { date: "2024", title: "Premiers clients", description: "100 entreprises nous font confiance en moins d'un an." },
  { date: "2025", title: "Levée de fonds", description: "3 M€ pour accélérer et agrandir l'équipe." },
  { date: "2026", title: "International", description: "Lancement en Espagne, en Allemagne et au Canada." },
];

export default function TimelineVertical({ title = "Notre histoire", events = DEFAULT }: { title?: string; events?: Event[] }) {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
        <ol className="relative mt-12 border-l border-neutral-200 dark:border-neutral-800">
          {events.map((e) => (
            <li key={e.title} className="mb-10 ml-6 last:mb-0">
              <span aria-hidden className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-violet-600 dark:border-neutral-950" />
              <time className="text-sm font-medium text-violet-600 dark:text-violet-400">{e.date}</time>
              <h3 className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">{e.title}</h3>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">{e.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
