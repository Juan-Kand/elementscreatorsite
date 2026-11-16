import type { ReactNode } from "react";

type Tone = "neutral" | "violet" | "green" | "amber" | "red" | "blue";

const tones: Record<Tone, string> = {
  neutral: "bg-neutral-100 text-neutral-700 ring-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-700",
  violet: "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:ring-violet-900",
  green: "bg-green-50 text-green-700 ring-green-200 dark:bg-green-950 dark:text-green-300 dark:ring-green-900",
  amber: "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:ring-amber-900",
  red: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-300 dark:ring-red-900",
  blue: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:ring-sky-900",
};

export default function Badge({ tone = "neutral", dot = false, children }: { tone?: Tone; dot?: boolean; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}>
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
