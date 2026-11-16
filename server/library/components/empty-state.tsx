export default function EmptyState({
  title = "Aucun projet pour l'instant",
  description = "Créez votre premier projet pour commencer à assembler vos pages.",
  actionLabel = "Nouveau projet",
  onAction,
}: { title?: string; description?: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-neutral-700">
      <div aria-hidden className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl dark:bg-violet-950">📁</div>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-neutral-500">{description}</p>
      <button onClick={onAction} className="mt-6 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
        + {actionLabel}
      </button>
    </div>
  );
}
