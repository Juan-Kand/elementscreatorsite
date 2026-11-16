/**
 * Bandeau défilant infini. Ajouter dans tailwind.config :
 * theme.extend.keyframes.marquee = { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } }
 * theme.extend.animation.marquee = "marquee 30s linear infinite"
 */
export default function LogoMarquee({
  items = ["Northwind", "Acmé", "Lumen", "Orbite", "Kiosk", "Vertex", "Polaris", "Atlas"],
}: { items?: string[] }) {
  const loop = [...items, ...items];
  return (
    <section aria-label="Nos partenaires" className="overflow-hidden bg-white py-12 dark:bg-neutral-950">
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <ul className="flex w-max animate-marquee gap-16 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((name, i) => (
            <li key={i} aria-hidden={i >= items.length} className="whitespace-nowrap text-2xl font-bold text-neutral-400 dark:text-neutral-600">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
