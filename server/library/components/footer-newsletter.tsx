"use client";
import { useState } from "react";

const SOCIAL = [
  { label: "Instagram", href: "#", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" },
  { label: "LinkedIn", href: "#", path: "M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-2 6h4v12H2V9Zm7 0h4v1.7c.6-1 1.9-2 3.9-2C21 8.7 22 11 22 14.3V21h-4v-6c0-1.6-.3-3-2-3s-2.2 1.2-2.2 3V21H9V9Z" },
  { label: "YouTube", href: "#", path: "M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12a31 31 0 0 0 .4 4.5 3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.5 31 31 0 0 0-.4-4.5ZM9.8 15.5v-7L16 12l-6.2 3.5Z" },
];

/** Bas de page avec inscription newsletter, colonnes de liens et réseaux sociaux. */
export default function FooterNewsletter({ brand = "Atelier", onSubscribe }: { brand?: string; onSubscribe?: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const cols = [
    { title: "Produit", links: ["Fonctionnalités", "Tarifs", "Nouveautés", "Feuille de route"] },
    { title: "Ressources", links: ["Documentation", "Tutoriels", "Blog", "Communauté"] },
    { title: "Société", links: ["À propos", "Carrières", "Presse", "Contact"] },
  ];
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <p className="text-xl font-bold text-white">{brand}</p>
            <p className="mt-3 max-w-sm text-sm">Les meilleurs conseils pour créer des sites qui convertissent, une fois par mois.</p>
            {ok ? (
              <p role="status" className="mt-6 text-sm font-medium text-green-400">Merci ! Vous êtes inscrit.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); onSubscribe?.(email); setOk(true); }} className="mt-6 flex max-w-sm gap-2">
                <label htmlFor="fn-email" className="sr-only">Adresse e-mail</label>
                <input id="fn-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.fr"
                  className="flex-1 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-violet-500" />
                <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500">S'inscrire</button>
              </form>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="text-sm font-semibold text-white">{c.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">{c.links.map((l) => <li key={l}><a href="#" className="hover:text-white">{l}</a></li>)}</ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-neutral-800 pt-8 sm:flex-row">
          <p className="text-xs">© {new Date().getFullYear()} {brand}. Tous droits réservés. · <a href="#" className="hover:text-white">Mentions légales</a> · <a href="#" className="hover:text-white">Confidentialité</a></p>
          <ul className="flex gap-4">
            {SOCIAL.map((s) => (
              <li key={s.label}><a href={s.href} aria-label={s.label} className="block hover:text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={s.path} /></svg></a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
