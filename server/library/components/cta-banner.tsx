export default function CtaBanner({
  title = "Prêt à créer votre prochain site ?",
  subtitle = "Rejoignez plus de 10 000 créateurs qui gagnent du temps chaque jour.",
  cta = { label: "Démarrer maintenant", href: "#" },
}: { title?: string; subtitle?: string; cta?: { label: string; href: string } }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl bg-gradient-to-r from-violet-600 to-sky-500 px-8 py-14 text-center text-white md:flex-row md:text-left">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-white/80">{subtitle}</p>
        </div>
        <a href={cta.href} className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
          {cta.label}
        </a>
      </div>
    </section>
  );
}
