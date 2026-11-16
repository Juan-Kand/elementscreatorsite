type Post = { title: string; excerpt: string; date: string; tag: string; image: string; href: string };

const DEFAULT: Post[] = [
  { title: "10 astuces pour une landing page qui convertit", excerpt: "Ce qui fait vraiment la différence entre une page vue et une page qui vend.", date: "12 nov. 2026", tag: "Marketing", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", href: "#" },
  { title: "Tailwind : organiser ses classes sans s'y perdre", excerpt: "Méthodes simples pour garder un code lisible sur un gros projet.", date: "5 nov. 2026", tag: "Dev", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", href: "#" },
  { title: "Accessibilité : les 5 erreurs les plus fréquentes", excerpt: "Contrastes, focus, labels… et comment les corriger en quelques minutes.", date: "28 oct. 2026", tag: "Design", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80", href: "#" },
];

export default function BlogCardGrid({ title = "Derniers articles", posts = DEFAULT }: { title?: string; posts?: Post[] }) {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <img src={p.image} alt="" className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-105" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-violet-100 px-2.5 py-0.5 font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">{p.tag}</span>
                  <time className="text-neutral-500">{p.date}</time>
                </div>
                <h3 className="mt-3 font-semibold text-neutral-900 dark:text-white">
                  <a href={p.href} className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:underline">{p.title}</a>
                </h3>
                <p className="mt-2 flex-1 text-sm text-neutral-600 dark:text-neutral-400">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
