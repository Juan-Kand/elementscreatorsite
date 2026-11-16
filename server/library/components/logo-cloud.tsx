export default function LogoCloud({
  title = "Ils utilisent déjà notre outil",
  logos = ["Northwind", "Acmé", "Lumen", "Orbite", "Kiosk", "Vertex"],
}: { title?: string; logos?: string[] }) {
  return (
    <section className="bg-white py-16 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-medium text-neutral-500">{title}</p>
        <ul className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((name) => (
            <li key={name} className="text-center text-xl font-bold tracking-tight text-neutral-400 grayscale transition hover:text-neutral-900 dark:text-neutral-600 dark:hover:text-white">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
