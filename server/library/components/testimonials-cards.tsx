type Testimonial = { quote: string; name: string; role: string; initials: string };

const DEFAULT: Testimonial[] = [
  { quote: "On a lancé notre landing page en un après-midi. Bluffant.", name: "Camille Durand", role: "Fondatrice, Nova", initials: "CD" },
  { quote: "Le code est propre, accessible, et facile à adapter à notre charte.", name: "Thomas Leroy", role: "Lead dev, Pixelo", initials: "TL" },
  { quote: "Nos clients pensent qu'on a une équipe design à plein temps.", name: "Sarah Benali", role: "Freelance", initials: "SB" },
];

export default function TestimonialsCards({ title = "Ils nous font confiance", items = DEFAULT }: { title?: string; items?: Testimonial[] }) {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
              <blockquote className="flex-1 text-neutral-700 dark:text-neutral-300">« {t.quote} »</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-sm font-semibold text-white">{t.initials}</span>
                <span>
                  <span className="block text-sm font-semibold text-neutral-900 dark:text-white">{t.name}</span>
                  <span className="block text-xs text-neutral-500">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
