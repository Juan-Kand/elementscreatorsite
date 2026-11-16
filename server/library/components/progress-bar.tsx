export default function ProgressBar({
  value = 65,
  label = "Progression du projet",
  showValue = true,
}: { value?: number; label?: string; showValue?: boolean }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
        {showValue && <span className="text-neutral-500">{v} %</span>}
      </div>
      <div role="progressbar" aria-label={label} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}
        className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-sky-500 transition-[width] duration-500" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}
