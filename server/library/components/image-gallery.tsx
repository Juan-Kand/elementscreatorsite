"use client";
import { useEffect, useState } from "react";

const DEFAULT = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80",
];

/** Galerie en grille avec visionneuse plein écran (flèches clavier + Échap). */
export default function ImageGallery({ images = DEFAULT }: { images?: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i! + 1) % images.length);
      if (e.key === "ArrowLeft") setOpen((i) => (i! - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src, i) => (
          <button key={src} onClick={() => setOpen(i)} className="overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">
            <img src={src} alt={`Photo ${i + 1}`} className="aspect-square w-full object-cover transition duration-300 hover:scale-105" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label="Visionneuse" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(null)}>
          <img src={images[open]} alt={`Photo ${open + 1}`} className="max-h-[85vh] max-w-full rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button aria-label="Fermer" className="absolute right-4 top-4 text-3xl text-white/80 hover:text-white">×</button>
          <p className="absolute bottom-4 text-sm text-white/70">{open + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}
