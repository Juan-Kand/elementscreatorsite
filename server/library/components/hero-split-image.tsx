type HeroSplitProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  cta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
};

export default function HeroSplitImage({
  eyebrow = "Plateforme tout-en-un",
  title = "Gérez vos projets sans perdre le fil",
  subtitle = "Tâches, documents et échanges réunis au même endroit. Votre équipe avance, vous gardez la vue d'ensemble.",
  cta = { label: "Essai gratuit 14 jours", href: "#" },
  imageSrc = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
  imageAlt = "Équipe travaillant ensemble sur des ordinateurs",
}: HeroSplitProps) {
  return (
    <section className="bg-white dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-400">{subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={cta.href} className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">{cta.label}</a>
            <span className="text-sm text-neutral-500">Sans carte bancaire</span>
          </div>
        </div>
        <div className="relative">
          <div aria-hidden className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-violet-200 to-sky-200 blur-2xl dark:from-violet-900/40 dark:to-sky-900/40" />
          <img src={imageSrc} alt={imageAlt} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
