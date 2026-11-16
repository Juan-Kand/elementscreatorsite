type Product = { name: string; price: number; oldPrice?: number; rating: number; reviews: number; image: string; badge?: string };

export default function ProductCard({
  product = { name: "Casque sans fil Aura", price: 129, oldPrice: 159, rating: 4.6, reviews: 248, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", badge: "-19 %" },
  onAdd,
}: { product?: Product; onAdd?: () => void }) {
  const fmt = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
  return (
    <article className="group w-full max-w-xs overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        {product.badge && <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white">{product.badge}</span>}
        <button aria-label="Ajouter aux favoris" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow hover:text-red-600 dark:bg-neutral-900/90 dark:text-neutral-300">♡</button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 dark:text-white">{product.name}</h3>
        <p className="mt-1 text-sm text-amber-500" aria-label={`Note ${product.rating} sur 5`}>
          {"★".repeat(Math.round(product.rating))}<span className="text-neutral-300 dark:text-neutral-700">{"★".repeat(5 - Math.round(product.rating))}</span>
          <span className="ml-1 text-neutral-500">({product.reviews})</span>
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p>
            <span className="text-lg font-bold text-neutral-900 dark:text-white">{fmt(product.price)}</span>
            {product.oldPrice && <span className="ml-2 text-sm text-neutral-400 line-through">{fmt(product.oldPrice)}</span>}
          </p>
          <button onClick={onAdd} className="rounded-lg bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-white dark:text-neutral-900">Ajouter</button>
        </div>
      </div>
    </article>
  );
}
