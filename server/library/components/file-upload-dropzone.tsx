"use client";
import { useRef, useState, type DragEvent } from "react";

export default function FileUploadDropzone({
  accept = "image/*,.pdf",
  maxSizeMb = 10,
  onFiles,
}: { accept?: string; maxSizeMb?: number; onFiles?: (files: File[]) => void }) {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const add = (list: FileList | null) => {
    if (!list) return;
    const ok = Array.from(list).filter((f) => f.size <= maxSizeMb * 1024 * 1024);
    setFiles((prev) => [...prev, ...ok]);
    onFiles?.(ok);
  };
  const onDrop = (e: DragEvent) => { e.preventDefault(); setDrag(false); add(e.dataTransfer.files); };
  return (
    <div className="w-full max-w-lg">
      <div
        role="button"
        tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && input.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
          drag ? "border-violet-500 bg-violet-50 dark:bg-violet-950/40" : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-700"
        }`}
      >
        <svg aria-hidden className="h-10 w-10 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
        <p className="mt-4 text-sm font-medium text-neutral-900 dark:text-white">Glissez vos fichiers ici ou <span className="text-violet-600">parcourez</span></p>
        <p className="mt-1 text-xs text-neutral-500">Images ou PDF, {maxSizeMb} Mo max.</p>
        <input ref={input} type="file" multiple accept={accept} className="sr-only" onChange={(e) => add(e.target.files)} />
      </div>
      {files.length > 0 && (
        <ul className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 text-sm dark:divide-neutral-800 dark:border-neutral-800">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-2.5">
              <span className="truncate text-neutral-800 dark:text-neutral-200">{f.name}</span>
              <span className="ml-4 shrink-0 text-neutral-500">{(f.size / 1024).toFixed(0)} Ko</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
