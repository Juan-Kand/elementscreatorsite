/** Bloc « Nous trouver » : carte OpenStreetMap intégrée (sans clé API) + adresse et horaires. */
export default function LocationMap({
  name = "Atelier – Paris",
  address = "12 rue de la Paix, 75002 Paris",
  lat = 48.8691,
  lng = 2.3317,
  hours = [["Lun – Ven", "9h – 19h"], ["Samedi", "10h – 18h"], ["Dimanche", "Fermé"]],
  phone = "01 23 45 67 89",
}: { name?: string; address?: string; lat?: number; lng?: number; hours?: [string, string][]; phone?: string }) {
  const d = 0.006;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d / 2}%2C${lng + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lng}`;
  const directions = `https://www.openstreetmap.org/directions?to=${lat}%2C${lng}`;
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Nous trouver</h2>
          <address className="mt-6 not-italic text-neutral-700 dark:text-neutral-300">
            <p className="font-semibold text-neutral-900 dark:text-white">{name}</p>
            <p>{address}</p>
            <p className="mt-2"><a href={`tel:${phone.replace(/\s/g, "")}`} className="text-violet-600 hover:underline">{phone}</a></p>
          </address>
          <dl className="mt-6 space-y-1 text-sm">
            {hours.map(([day, h]) => (
              <div key={day} className="flex justify-between border-b border-neutral-100 py-1.5 dark:border-neutral-900"><dt className="text-neutral-500">{day}</dt><dd className="font-medium text-neutral-900 dark:text-white">{h}</dd></div>
            ))}
          </dl>
          <a href={directions} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500">Itinéraire →</a>
        </div>
        <iframe title={`Carte : ${name}`} src={src} loading="lazy" className="h-96 w-full rounded-2xl border border-neutral-200 lg:h-full dark:border-neutral-800" />
      </div>
    </section>
  );
}
