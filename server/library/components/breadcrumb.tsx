type Crumb = { label: string; href?: string };

export default function Breadcrumb({
  items = [{ label: "Accueil", href: "/" }, { label: "Projets", href: "/projets" }, { label: "Site vitrine" }],
}: { items?: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex items-center gap-2">
              {last || !c.href ? (
                <span aria-current={last ? "page" : undefined} className="font-medium text-neutral-900 dark:text-white">{c.label}</span>
              ) : (
                <a href={c.href} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white">{c.label}</a>
              )}
              {!last && <span aria-hidden className="text-neutral-300 dark:text-neutral-700">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
