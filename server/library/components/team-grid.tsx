type Member = { name: string; role: string; image: string };

const DEFAULT: Member[] = [
  { name: "Léa Martin", role: "CEO & cofondatrice", image: "https://i.pravatar.cc/300?img=47" },
  { name: "Hugo Bernard", role: "CTO", image: "https://i.pravatar.cc/300?img=12" },
  { name: "Inès Petit", role: "Lead design", image: "https://i.pravatar.cc/300?img=32" },
  { name: "Karim Haddad", role: "Développeur", image: "https://i.pravatar.cc/300?img=15" },
];

export default function TeamGrid({ title = "Notre équipe", members = DEFAULT }: { title?: string; members?: Member[] }) {
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m) => (
            <li key={m.name}>
              <img src={m.image} alt={`Portrait de ${m.name}`} className="aspect-square w-full rounded-2xl object-cover" />
              <h3 className="mt-4 font-semibold text-neutral-900 dark:text-white">{m.name}</h3>
              <p className="text-sm text-neutral-500">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
