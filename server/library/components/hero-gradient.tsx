type HeroGradientProps = {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export default function HeroGradient({
  badge = "Nouveau · v2.0 disponible",
  title = "Construisez des sites magnifiques en quelques minutes",
  subtitle = "Une bibliothèque de composants prêts à l'emploi, accessibles et responsive, pour lancer votre projet sans repartir de zéro.",
  primaryCta = { label: "Commencer gratuitement", href: "#" },
  secondaryCta = { label: "Voir la démo", href: "#" },
}: HeroGradientProps) {
  return (
    <section className="relative isolate overflow-hidden bg-white dark:bg-neutral-950">
      <div aria-hidden className="absolute inset-x-0 -top-40 -z-10 flex justify-center blur-3xl">
        <div className="aspect-[3/2] w-[60rem] bg-gradient-to-tr from-fuchsia-400 via-violet-500 to-sky-400 opacity-30 [clip-path:polygon(50%_0,100%_40%,80%_100%,20%_100%,0_40%)]" />
      </div>
      <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
        <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300">
          {badge}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl dark:text-white">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">{subtitle}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={primaryCta.href} className="rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
            {primaryCta.label}
          </a>
          <a href={secondaryCta.href} className="rounded-lg px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-white dark:hover:bg-neutral-900">
            {secondaryCta.label} →
          </a>
        </div>
      </div>
    </section>
  );
}
