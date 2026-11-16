export default function HeroMinimalDark({
  title = "Le code, sans le bruit.",
  subtitle = "Un éditeur pensé pour la concentration. Rapide, discret, extensible.",
  command = "npm create mon-app@latest",
}: { title?: string; subtitle?: string; command?: string }) {
  return (
    <section className="relative overflow-hidden bg-neutral-950 px-6 py-32 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.25),transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl">
        <h1 className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">{subtitle}</p>
        <div className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/80 px-5 py-3 font-mono text-sm text-neutral-300">
          <span aria-hidden className="text-violet-400">$</span>
          <code>{command}</code>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(command)}
            className="ml-2 rounded-md px-2 py-1 text-xs text-neutral-400 hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            Copier
          </button>
        </div>
      </div>
    </section>
  );
}
