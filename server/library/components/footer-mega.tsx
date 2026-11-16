"use client";

const COLUMNS = [
  { title: "Boutique", links: ["Nouveautés", "Meilleures ventes", "Femme", "Homme", "Accessoires", "Cartes cadeaux"] },
  { title: "Aide", links: ["Suivre ma commande", "Livraison", "Retours & remboursements", "Guide des tailles", "FAQ"] },
  { title: "À propos", links: ["Notre histoire", "Engagements", "Magasins", "Carrières", "Presse"] },
  { title: "Contact", links: ["01 23 45 67 89", "Lun–Sam, 9h–19h", "service@exemple.fr", "Chat en direct"] },
];
const PAY = ["Visa", "Mastercard", "CB", "PayPal", "Apple Pay"];

/** Grand bas de page e-commerce : réassurance, 4 colonnes, langue/devise, moyens de paiement. */
export default function FooterMega({ brand = "Maison Linéa" }: { brand?: string }) {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900">
      <ul className="mx-auto grid max-w-6xl gap-6 border-b border-neutral-200 px-6 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4 dark:border-neutral-800">
        {[["🚚", "Livraison offerte", "dès 60 € d'achat"], ["↩️", "Retours gratuits", "sous 30 jours"], ["🔒", "Paiement sécurisé", "CB, PayPal, Apple Pay"], ["💬", "Service client", "réponse en moins de 24 h"]].map(([i, t, d]) => (
          <li key={t} className="flex items-center gap-3">
            <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm dark:bg-neutral-950">{i}</span>
            <span><span className="block font-semibold text-neutral-900 dark:text-white">{t}</span><span className="text-neutral-500">{d}</span></span>
          </li>
        ))}
      </ul>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white">{brand}</p>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">Des objets durables, dessinés en France et fabriqués pour durer.</p>
          <div className="mt-6 flex gap-2">
            <label htmlFor="fm-lang" className="sr-only">Langue</label>
            <select id="fm-lang" className="rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"><option>Français</option><option>English</option><option>Español</option></select>
            <label htmlFor="fm-cur" className="sr-only">Devise</label>
            <select id="fm-cur" className="rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"><option>EUR €</option><option>CHF</option><option>CAD $</option></select>
          </div>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">{c.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-neutral-600 dark:text-neutral-400">
              {c.links.map((l) => <li key={l}><a href="#" className="hover:text-neutral-900 dark:hover:text-white">{l}</a></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-neutral-500 md:flex-row">
          <p>© {new Date().getFullYear()} {brand} · <a href="#" className="hover:underline">Mentions légales</a> · <a href="#" className="hover:underline">CGV</a> · <a href="#" className="hover:underline">Cookies</a></p>
          <ul aria-label="Moyens de paiement acceptés" className="flex flex-wrap gap-2">
            {PAY.map((p) => <li key={p} className="rounded border border-neutral-300 bg-white px-2 py-1 font-semibold text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-300">{p}</li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
