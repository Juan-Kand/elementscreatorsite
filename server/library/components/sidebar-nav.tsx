type NavItem = { label: string; href: string; icon: string; badge?: string };

const DEFAULT: NavItem[] = [
  { label: "Tableau de bord", href: "#", icon: "▦" },
  { label: "Projets", href: "#", icon: "◧", badge: "12" },
  { label: "Équipe", href: "#", icon: "◉" },
  { label: "Calendrier", href: "#", icon: "▤" },
  { label: "Rapports", href: "#", icon: "◔" },
  { label: "Paramètres", href: "#", icon: "⚙" },
];

export default function SidebarNav({ brand = "Atelier", items = DEFAULT, activeLabel = "Tableau de bord" }: { brand?: string; items?: NavItem[]; activeLabel?: string }) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex h-16 items-center px-6 text-lg font-bold text-neutral-900 dark:text-white">{brand}</div>
      <nav aria-label="Menu latéral" className="flex-1 px-3">
        <ul className="space-y-1">
          {items.map((it) => {
            const active = it.label === activeLabel;
            return (
              <li key={it.label}>
                <a href={it.href} aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300" : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                  }`}>
                  <span aria-hidden className="w-5 text-center">{it.icon}</span>
                  <span className="flex-1">{it.label}</span>
                  {it.badge && <span className="rounded-full bg-neutral-200 px-2 text-xs dark:bg-neutral-800">{it.badge}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center gap-3 border-t border-neutral-200 p-4 dark:border-neutral-800">
        <img src="https://i.pravatar.cc/80?img=47" alt="" className="h-9 w-9 rounded-full" />
        <div className="text-sm">
          <p className="font-medium text-neutral-900 dark:text-white">Léa Martin</p>
          <p className="text-neutral-500">lea@exemple.fr</p>
        </div>
      </div>
    </aside>
  );
}
