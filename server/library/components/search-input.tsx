"use client";
import { useState } from "react";

export default function SearchInput({
  placeholder = "Rechercher…",
  shortcut = "Ctrl K",
  onSearch,
}: { placeholder?: string; shortcut?: string; onSearch?: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <form role="search" onSubmit={(e) => { e.preventDefault(); onSearch?.(q); }} className="relative w-full max-w-md">
      <label htmlFor="search" className="sr-only">Rechercher</label>
      <svg aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
      </svg>
      <input
        id="search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-16 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
      />
      {shortcut && (
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-sans text-[10px] font-medium text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900">
          {shortcut}
        </kbd>
      )}
    </form>
  );
}
