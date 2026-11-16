"use client";
import { useEffect, useState } from "react";

type Line = { id: string; name: string; price: number; qty: number; image: string };
const DEFAULT: Line[] = [
  { id: "1", name: "Casque sans fil Aura", price: 129, qty: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
  { id: "2", name: "Montre Linéa", price: 89, qty: 1, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
];
const eur = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

/** Panier latéral : quantités, suppression, barre « livraison offerte », bouton commander. */
export default function CartDrawer({
  open,
  onClose,
  initial = DEFAULT,
  freeShippingFrom = 250,
  checkoutHref = "/paiement",
}: { open: boolean; onClose: () => void; initial?: Line[]; freeShippingFrom?: number; checkoutHref?: string }) {
  const [lines, setLines] = useState(initial);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open, onClose]);
  const setQty = (id: string, q: number) => setLines((l) => l.flatMap((x) => (x.id !== id ? [x] : q <= 0 ? [] : [{ ...x, qty: q }])));
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const left = Math.max(0, freeShippingFrom - total);

  return (
    <div className={`fixed inset-0 z-[100] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-modal="true" aria-label="Panier"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-neutral-950 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Panier ({lines.reduce((s, l) => s + l.qty, 0)})</h2>
          <button onClick={onClose} aria-label="Fermer le panier" className="text-2xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white">×</button>
        </header>
        <div className="border-b border-neutral-200 px-6 py-3 dark:border-neutral-800">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">{left > 0 ? <>Plus que <strong>{eur(left)}</strong> pour la livraison offerte</> : "🎉 Livraison offerte !"}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800"><div className="h-full bg-green-500 transition-all" style={{ width: `${Math.min(100, (total / freeShippingFrom) * 100)}%` }} /></div>
        </div>
        <ul className="flex-1 divide-y divide-neutral-100 overflow-y-auto px-6 dark:divide-neutral-900">
          {lines.length === 0 && <li className="py-16 text-center text-neutral-500">Votre panier est vide.</li>}
          {lines.map((l) => (
            <li key={l.id} className="flex gap-4 py-4">
              <img src={l.image} alt="" className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between text-sm font-medium text-neutral-900 dark:text-white"><span>{l.name}</span><span>{eur(l.price * l.qty)}</span></div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-neutral-300 dark:border-neutral-700">
                    <button onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Retirer un ${l.name}`} className="px-3 py-1 text-neutral-600 dark:text-neutral-300">−</button>
                    <span aria-live="polite" className="w-6 text-center text-sm dark:text-white">{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Ajouter un ${l.name}`} className="px-3 py-1 text-neutral-600 dark:text-neutral-300">+</button>
                  </div>
                  <button onClick={() => setQty(l.id, 0)} className="text-xs text-neutral-500 underline-offset-2 hover:text-red-600 hover:underline">Supprimer</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <footer className="border-t border-neutral-200 p-6 dark:border-neutral-800">
          <div className="flex justify-between text-base font-semibold text-neutral-900 dark:text-white"><span>Total</span><span>{eur(total)}</span></div>
          <p className="mt-1 text-xs text-neutral-500">Taxes incluses. Livraison calculée à l'étape suivante.</p>
          <a href={checkoutHref} aria-disabled={lines.length === 0} className={`mt-4 block rounded-lg bg-violet-600 py-3 text-center text-sm font-semibold text-white hover:bg-violet-500 ${lines.length === 0 ? "pointer-events-none opacity-40" : ""}`}>Commander</a>
          <button onClick={onClose} className="mt-2 w-full py-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">Continuer mes achats</button>
        </footer>
      </aside>
    </div>
  );
}
