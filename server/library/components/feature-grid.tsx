type Feature = { icon: string; title: string; description: string };

const DEFAULT_FEATURES: Feature[] = [
  { icon: "⚡", title: "Ultra rapide", description: "Des composants légers, sans dépendance superflue." },
  { icon: "🎨", title: "Personnalisable", description: "Tout passe par Tailwind : changez une classe, c'est fait." },
  { icon: "♿", title: "Accessible", description: "Navigation clavier, focus visible et ARIA inclus." },
  { icon: "🌙", title: "Mode sombre", description: "Chaque composant gère le thème sombre nativement." },
  { icon: "📱", title: "Responsive", description: "Pensé mobile d'abord, parfait sur grand écran." },
  { icon: "🧩", title: "Composable", description: "Assemblez les blocs comme des briques de Lego." },
];

export default function FeatureGrid({ title = "Tout ce qu'il vous faut", subtitle = "Des fondations solides pour aller vite.", features = DEFAULT_FEATURES }: { title?: string; subtitle?: string; features?: Feature[] }) {
  return (
    <section className="bg-neutral-50 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">{title}</h2>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">{subtitle}</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
              <div aria-hidden className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-xl dark:bg-violet-950">{f.icon}</div>
              <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
