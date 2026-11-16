type Column = { title: string; links: { label: string; href: string }[] };

const DEFAULT: Column[] = [
  { title: "Produit", links: [{ label: "Fonctionnalités", href: "#" }, { label: "Tarifs", href: "#" }, { label: "Changelog", href: "#" }] },
  { title: "Ressources", links: [{ label: "Documentation", href: "#" }, { label: "Blog", href: "#" }, { label: "Guides", href: "#" }] },
  { title: "Entreprise", links: [{ label: "À propos", href: "#" }, { label: "Contact", href: "#" }, { label: "Mentions légales", href: "#" }] },
];

export default function FooterColumns({ brand = "Atelier", columns = DEFAULT }: { brand?: string; columns?: Column[] }) {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-neutral-900 dark:text-white">{brand}</p>
          <p className="mt-2 text-sm text-neutral-500">Des composants pour créer plus vite.</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{c.title}</p>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">{l.label}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500 dark:border-neutral-800">© {new Date().getFullYear()} {brand}. Tous droits réservés.</p>
    </footer>
  );
}
