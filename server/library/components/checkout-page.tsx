"use client";
import { useMemo, useState, type FormEvent } from "react";

/**
 * Page de paiement : coordonnées, livraison, moyen de paiement et récapitulatif.
 * ⚠️ Maquette d'interface : en production, ne traitez JAMAIS les numéros de carte vous-même.
 * Remplacez le bloc « Carte » par Stripe Elements / Payment Element (ou PayPal, Lyra…).
 */
type Item = { name: string; variant: string; price: number; qty: number; image: string };

const DEFAULT_ITEMS: Item[] = [
  { name: "Casque sans fil Aura", variant: "Noir mat", price: 129, qty: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
  { name: "Montre Linéa", variant: "Bracelet cuir", price: 89, qty: 2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
];
const SHIPPING = [
  { id: "standard", label: "Standard", detail: "3 à 5 jours ouvrés", price: 0 },
  { id: "express", label: "Express", detail: "Livré demain", price: 9.9 },
];
const eur = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const field = "mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white";
const lab = "text-sm font-medium text-neutral-700 dark:text-neutral-300";

export default function CheckoutPage({ items = DEFAULT_ITEMS, onPay }: { items?: Item[]; onPay?: (data: Record<string, unknown>) => void }) {
  const [shipping, setShipping] = useState("standard");
  const [method, setMethod] = useState<"card" | "paypal" | "applepay">("card");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paying, setPaying] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = SHIPPING.find((s) => s.id === shipping)!.price;
  const total = Math.max(0, subtotal - discount + ship);
  const vat = useMemo(() => total - total / 1.2, [total]);

  const fmtCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExp = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPaying(true);
    onPay?.({ ...Object.fromEntries(new FormData(e.currentTarget)), shipping, method, total });
    setTimeout(() => setPaying(false), 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Paiement</h1>

          <section aria-labelledby="co-contact" className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 id="co-contact" className="font-semibold text-neutral-900 dark:text-white">1. Coordonnées</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2"><label htmlFor="co-email" className={lab}>E-mail</label><input id="co-email" name="email" type="email" required autoComplete="email" className={field} /></div>
              <div><label htmlFor="co-first" className={lab}>Prénom</label><input id="co-first" name="firstName" required autoComplete="given-name" className={field} /></div>
              <div><label htmlFor="co-last" className={lab}>Nom</label><input id="co-last" name="lastName" required autoComplete="family-name" className={field} /></div>
              <div className="sm:col-span-2"><label htmlFor="co-addr" className={lab}>Adresse</label><input id="co-addr" name="address" required autoComplete="street-address" className={field} /></div>
              <div><label htmlFor="co-zip" className={lab}>Code postal</label><input id="co-zip" name="zip" required inputMode="numeric" autoComplete="postal-code" className={field} /></div>
              <div><label htmlFor="co-city" className={lab}>Ville</label><input id="co-city" name="city" required autoComplete="address-level2" className={field} /></div>
            </div>
          </section>

          <section aria-labelledby="co-ship" className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 id="co-ship" className="font-semibold text-neutral-900 dark:text-white">2. Livraison</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SHIPPING.map((s) => (
                <label key={s.id} className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${shipping === s.id ? "border-violet-600 ring-1 ring-violet-600" : "border-neutral-200 dark:border-neutral-800"}`}>
                  <span className="flex items-center gap-3">
                    <input type="radio" name="shippingMethod" value={s.id} checked={shipping === s.id} onChange={() => setShipping(s.id)} className="accent-violet-600" />
                    <span><span className="block text-sm font-medium text-neutral-900 dark:text-white">{s.label}</span><span className="block text-xs text-neutral-500">{s.detail}</span></span>
                  </span>
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">{s.price ? eur(s.price) : "Offerte"}</span>
                </label>
              ))}
            </div>
          </section>

          <section aria-labelledby="co-pay" className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
            <h2 id="co-pay" className="font-semibold text-neutral-900 dark:text-white">3. Paiement</h2>
            <div role="radiogroup" aria-label="Moyen de paiement" className="mt-4 grid grid-cols-3 gap-2">
              {([["card", "💳 Carte"], ["paypal", "PayPal"], ["applepay", " Pay"]] as const).map(([id, label]) => (
                <button type="button" key={id} role="radio" aria-checked={method === id} onClick={() => setMethod(id)}
                  className={`rounded-lg border py-2.5 text-sm font-medium transition ${method === id ? "border-violet-600 bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300" : "border-neutral-200 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"}`}>
                  {label}
                </button>
              ))}
            </div>
            {method === "card" ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2"><label htmlFor="co-card" className={lab}>Numéro de carte</label>
                  <input id="co-card" inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" value={card} onChange={(e) => setCard(fmtCard(e.target.value))} required className={`${field} font-mono tracking-wider`} /></div>
                <div><label htmlFor="co-exp" className={lab}>Expiration</label>
                  <input id="co-exp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" value={exp} onChange={(e) => setExp(fmtExp(e.target.value))} required className={field} /></div>
                <div><label htmlFor="co-cvc" className={lab}>CVC</label>
                  <input id="co-cvc" inputMode="numeric" autoComplete="cc-csc" maxLength={4} placeholder="123" required className={field} /></div>
                <p className="flex items-center gap-2 text-xs text-neutral-500 sm:col-span-2"><span aria-hidden>🔒</span> Paiement chiffré et sécurisé.</p>
              </div>
            ) : (
              <p className="mt-4 rounded-lg bg-neutral-50 p-4 text-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">Vous serez redirigé vers {method === "paypal" ? "PayPal" : "Apple Pay"} pour finaliser le paiement.</p>
            )}
          </section>
        </div>

        <aside aria-labelledby="co-sum" className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 lg:sticky lg:top-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h2 id="co-sum" className="font-semibold text-neutral-900 dark:text-white">Récapitulatif</h2>
          <ul className="mt-4 divide-y divide-neutral-100 dark:divide-neutral-900">
            {items.map((i) => (
              <li key={i.name} className="flex gap-4 py-3">
                <span className="relative">
                  <img src={i.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-700 text-[11px] font-semibold text-white">{i.qty}</span>
                </span>
                <span className="flex-1 text-sm"><span className="block font-medium text-neutral-900 dark:text-white">{i.name}</span><span className="text-neutral-500">{i.variant}</span></span>
                <span className="text-sm font-medium text-neutral-900 dark:text-white">{eur(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <label htmlFor="co-promo" className="sr-only">Code promo</label>
            <input id="co-promo" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Code promo" className={`${field} mt-0`} />
            <button type="button" onClick={() => setDiscount(promo.trim().toUpperCase() === "BIENVENUE" ? Math.round(subtotal * 0.1 * 100) / 100 : 0)} className="rounded-lg border border-neutral-300 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900">Appliquer</button>
          </div>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-600 dark:text-neutral-400"><dt>Sous-total</dt><dd>{eur(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><dt>Réduction</dt><dd>−{eur(discount)}</dd></div>}
            <div className="flex justify-between text-neutral-600 dark:text-neutral-400"><dt>Livraison</dt><dd>{ship ? eur(ship) : "Offerte"}</dd></div>
            <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-semibold text-neutral-900 dark:border-neutral-800 dark:text-white"><dt>Total</dt><dd>{eur(total)}</dd></div>
            <div className="flex justify-between text-xs text-neutral-500"><dt>dont TVA (20 %)</dt><dd>{eur(vat)}</dd></div>
          </dl>
          <button type="submit" disabled={paying} className="mt-6 w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-60">
            {paying ? "Paiement en cours…" : `Payer ${eur(total)}`}
          </button>
          <p className="mt-3 text-center text-xs text-neutral-500">Retours gratuits sous 30 jours.</p>
        </aside>
      </form>
    </div>
  );
}
