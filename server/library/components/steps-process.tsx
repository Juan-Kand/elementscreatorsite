type Step = { title: string; description: string };

const DEFAULT: Step[] = [
  { title: "Créez votre compte", description: "Inscription en 30 secondes, sans carte bancaire." },
  { title: "Choisissez vos composants", description: "Piochez dans la bibliothèque ou demandez à l'IA." },
  { title: "Publiez", description: "Exportez le code ou déployez en un clic." },
];

export default function StepsProcess({ title = "Comment ça marche", steps = DEFAULT }: { title?: string; steps?: Step[] }) {
  return (
    <section className="bg-neutral-50 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
        <ol className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute left-1/2 top-6 hidden h-px w-full bg-gradient-to-r from-violet-300 to-transparent md:block dark:from-violet-800" />
              )}
              <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-600/30">{i + 1}</span>
              <h3 className="mt-6 text-lg font-semibold text-neutral-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
