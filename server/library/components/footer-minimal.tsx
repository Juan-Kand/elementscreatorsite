export default function FooterMinimal({
  brand = "Atelier",
  links = [{ label: "Mentions légales", href: "#" }, { label: "Confidentialité", href: "#" }, { label: "CGV", href: "#" }, { label: "Contact", href: "#" }],
}: { brand?: string; links?: { label: string; href: string }[] }) {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-neutral-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {brand}</p>
        <nav aria-label="Liens légaux">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((l) => <li key={l.label}><a href={l.href} className="hover:text-neutral-900 dark:hover:text-white">{l.label}</a></li>)}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
