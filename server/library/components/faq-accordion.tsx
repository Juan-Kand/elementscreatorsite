type QA = { question: string; answer: string };

const DEFAULT: QA[] = [
  { question: "Puis-je utiliser les composants dans un projet commercial ?", answer: "Oui, sans restriction." },
  { question: "Quels frameworks sont compatibles ?", answer: "Tout projet React avec Tailwind CSS : Next.js, Vite, Remix, Astro…" },
  { question: "Le mode sombre est-il inclus ?", answer: "Oui, via les classes dark: de Tailwind." },
];

export default function FaqAccordion({ title = "Questions fréquentes", items = DEFAULT }: { title?: string; items?: QA[] }) {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
        <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {items.map((qa) => (
            <details key={qa.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-white">
                {qa.question}
                <span aria-hidden className="ml-4 text-xl text-neutral-400 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-neutral-600 dark:text-neutral-400">{qa.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
