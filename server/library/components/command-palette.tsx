"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Command = { label: string; group: string; shortcut?: string; action?: () => void };

const DEFAULT: Command[] = [
  { label: "Nouveau projet", group: "Actions", shortcut: "N" },
  { label: "Inviter un membre", group: "Actions" },
  { label: "Tableau de bord", group: "Navigation", shortcut: "G D" },
  { label: "Paramètres", group: "Navigation", shortcut: "G S" },
  { label: "Documentation", group: "Aide" },
];

/** Palette de commandes ouverte avec Ctrl/Cmd + K. */
export default function CommandPalette({ commands = DEFAULT }: { commands?: Command[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { if (open) { setQ(""); setIdx(0); setTimeout(() => input.current?.focus(), 0); } }, [open]);

  const results = useMemo(() => commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase())), [commands, q]);
  const run = (c?: Command) => { c?.action?.(); setOpen(false); };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[15vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div role="dialog" aria-label="Palette de commandes" onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
        <input
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setIdx(0); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
            if (e.key === "Enter") run(results[idx]);
          }}
          placeholder="Tapez une commande…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          className="w-full border-b border-neutral-200 bg-transparent px-5 py-4 text-neutral-900 outline-none placeholder:text-neutral-400 dark:border-neutral-800 dark:text-white"
        />
        <ul id="cmd-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-neutral-500">Aucun résultat</li>}
          {results.map((c, i) => (
            <li key={c.label} role="option" aria-selected={i === idx} onMouseEnter={() => setIdx(i)} onClick={() => run(c)}
              className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm ${i === idx ? "bg-violet-50 text-violet-900 dark:bg-violet-950 dark:text-violet-100" : "text-neutral-700 dark:text-neutral-300"}`}>
              <span>{c.label} <span className="ml-2 text-xs text-neutral-400">{c.group}</span></span>
              {c.shortcut && <kbd className="rounded border border-neutral-200 px-1.5 text-[10px] text-neutral-500 dark:border-neutral-700">{c.shortcut}</kbd>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
