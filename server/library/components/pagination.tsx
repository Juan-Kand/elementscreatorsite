"use client";

function range(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export default function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (p: number) => void }) {
  const btn = "flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-40";
  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <button className={`${btn} text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900`} disabled={page <= 1} onClick={() => onChange(page - 1)}>
        ← Précédent
      </button>
      {range(page, total).map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-2 text-neutral-400">…</span>
        ) : (
          <button key={p} aria-current={p === page ? "page" : undefined} onClick={() => onChange(p)}
            className={`${btn} ${p === page ? "bg-violet-600 text-white" : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"}`}>
            {p}
          </button>
        )
      )}
      <button className={`${btn} text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900`} disabled={page >= total} onClick={() => onChange(page + 1)}>
        Suivant →
      </button>
    </nav>
  );
}
