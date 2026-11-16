/** Squelette de chargement pour une carte (image + texte). */
export default function SkeletonLoader({ count = 3 }: { count?: number }) {
  return (
    <div role="status" aria-label="Chargement" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-neutral-200 p-4 motion-reduce:animate-none dark:border-neutral-800">
          <div className="aspect-video rounded-xl bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-4 h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-2 h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-2 h-3 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="mt-6 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      ))}
      <span className="sr-only">Chargement en cours…</span>
    </div>
  );
}
