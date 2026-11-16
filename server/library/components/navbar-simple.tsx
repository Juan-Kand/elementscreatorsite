"use client";
import { useState } from "react";

type NavbarProps = {
  brand?: string;
  links?: { label: string; href: string }[];
  cta?: { label: string; href: string };
};

export default function NavbarSimple({
  brand = "Atelier",
  links = [
    { label: "Produit", href: "#" },
    { label: "Tarifs", href: "#" },
    { label: "Docs", href: "#" },
    { label: "Blog", href: "#" },
  ],
  cta = { label: "Se connecter", href: "#" },
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Navigation principale">
        <a href="/" className="text-lg font-bold text-neutral-900 dark:text-white">{brand}</a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">{l.label}</a>
            </li>
          ))}
        </ul>
        <a href={cta.href} className="hidden rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 md:inline-block dark:bg-white dark:text-neutral-900">{cta.label}</a>
        <button
          type="button"
          className="rounded-md p-2 text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 md:hidden dark:text-neutral-300"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-neutral-200 px-6 py-4 md:hidden dark:border-neutral-800">
          <ul className="space-y-3">
            {links.map((l) => (
              <li key={l.label}><a href={l.href} className="block text-neutral-700 dark:text-neutral-300">{l.label}</a></li>
            ))}
          </ul>
          <a href={cta.href} className="mt-4 block rounded-lg bg-neutral-900 px-4 py-2 text-center text-sm font-medium text-white dark:bg-white dark:text-neutral-900">{cta.label}</a>
        </div>
      )}
    </header>
  );
}
