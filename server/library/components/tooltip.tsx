import { useId, type ReactNode } from "react";

/** Info-bulle CSS pure, au survol et au focus clavier. */
export default function Tooltip({ text, children, side = "top" }: { text: string; children: ReactNode; side?: "top" | "bottom" }) {
  const id = useId();
  const pos = side === "top" ? "bottom-full mb-2" : "top-full mt-2";
  return (
    <span className="group relative inline-flex" aria-describedby={id}>
      {children}
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1 text-xs text-white opacity-0 shadow transition group-focus-within:opacity-100 group-hover:opacity-100 dark:bg-white dark:text-neutral-900 ${pos}`}
      >
        {text}
      </span>
    </span>
  );
}
