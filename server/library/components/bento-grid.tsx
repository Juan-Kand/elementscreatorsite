type BentoItem = { title: string; description: string; className?: string };

const DEFAULT_ITEMS: BentoItem[] = [
  { title: "Analyses en temps réel", description: "Suivez vos visiteurs à la seconde près.", className: "md:col-span-2 md:row-span-2" },
  { title: "Intégrations", description: "Plus de 50 outils connectés." },
  { title: "Sécurité", description: "Chiffrement de bout en bout." },
  { title: "API ouverte", description: "Automatisez tout.", className: "md:col-span-2" },
];

export default function BentoGrid({ items = DEFAULT_ITEMS }: { items?: BentoItem[] }) {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl auto-rows-[12rem] gap-4 px-6 md:grid-cols-4">
        {items.map((it) => (
          <article
            key={it.title}
            className={`group relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950 ${it.className ?? ""}`}
          >
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-400/20 blur-2xl transition group-hover:bg-violet-400/40" />
            <div className="relative flex h-full flex-col justify-end">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{it.title}</h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{it.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
