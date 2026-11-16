"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Item = { label: string; onSelect?: () => void; danger?: boolean };

export default function DropdownMenu({
  label = "Options",
  items = [{ label: "Modifier" }, { label: "Dupliquer" }, { label: "Archiver" }, { label: "Supprimer", danger: true }],
}: { label?: string; items?: Item[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    itemRefs.current[0]?.focus();
    const onDoc = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onKey = (e: KeyboardEvent) => {
    const list = itemRefs.current.filter(Boolean) as HTMLButtonElement[];
    const i = list.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") { e.preventDefault(); list[(i + 1) % list.length]?.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); list[(i - 1 + list.length) % list.length]?.focus(); }
  };

  return (
    <div ref={root} className="relative inline-block text-left" onKeyDown={onKey}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200"
      >
        {label}
        <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-neutral-200 bg-white p-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
          {items.map((it, i) => (
            <button
              key={it.label}
              ref={(el) => { itemRefs.current[i] = el; }}
              role="menuitem"
              onClick={() => { it.onSelect?.(); setOpen(false); }}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm focus:outline-none ${
                it.danger ? "text-red-600 hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-950 dark:focus:bg-red-950" : "text-neutral-700 hover:bg-neutral-100 focus:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
