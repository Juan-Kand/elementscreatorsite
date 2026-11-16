export default function OrderConfirmation({
  orderNumber = "CMD-2026-48213",
  email = "vous@exemple.fr",
  items = [{ name: "Casque sans fil Aura", qty: 1, price: 129 }, { name: "Montre Linéa", qty: 2, price: 89 }],
  shipping = 0,
  deliveryEstimate = "entre le 19 et le 21 novembre",
}: { orderNumber?: string; email?: string; items?: { name: string; qty: number; price: number }[]; shipping?: number; deliveryEstimate?: string }) {
  const eur = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
  const total = items.reduce((s, i) => s + i.qty * i.price, 0) + shipping;
  const steps = ["Commande validée", "En préparation", "Expédiée", "Livrée"];
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="text-center">
        <div aria-hidden className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600 dark:bg-green-950">✓</div>
        <h1 className="mt-6 text-3xl font-bold text-neutral-900 dark:text-white">Merci pour votre commande !</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">Un e-mail de confirmation a été envoyé à <strong>{email}</strong>.</p>
        <p className="mt-1 text-sm text-neutral-500">N° de commande : <span className="font-mono font-medium text-neutral-900 dark:text-white">{orderNumber}</span></p>
      </div>
      <ol className="mt-10 grid grid-cols-4 gap-2 text-center text-xs">
        {steps.map((s, i) => (
          <li key={s}>
            <span className={`mx-auto block h-1.5 rounded-full ${i === 0 ? "bg-green-500" : "bg-neutral-200 dark:bg-neutral-800"}`} />
            <span className={`mt-2 block ${i === 0 ? "font-semibold text-green-700 dark:text-green-400" : "text-neutral-500"}`}>{s}</span>
          </li>
        ))}
      </ol>
      <section className="mt-10 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Détail</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {items.map((i) => (
            <li key={i.name} className="flex justify-between text-neutral-700 dark:text-neutral-300"><span>{i.qty} × {i.name}</span><span>{eur(i.qty * i.price)}</span></li>
          ))}
          <li className="flex justify-between text-neutral-500"><span>Livraison</span><span>{shipping ? eur(shipping) : "Offerte"}</span></li>
          <li className="flex justify-between border-t border-neutral-200 pt-3 font-semibold text-neutral-900 dark:border-neutral-800 dark:text-white"><span>Total payé</span><span>{eur(total)}</span></li>
        </ul>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">📦 Livraison estimée {deliveryEstimate}.</p>
      </section>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="/compte/commandes" className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">Suivre ma commande</a>
        <a href="/" className="rounded-lg px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900">Retour à la boutique</a>
      </div>
    </main>
  );
}
