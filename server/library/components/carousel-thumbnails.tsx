"use client";
import { useState } from "react";

const DEFAULT = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=80",
];

/** Visionneuse produit : grande image + vignettes cliquables (fiche produit, portfolio). */
export default function CarouselThumbnails({ images = DEFAULT, alt = "Photo du produit" }: { images?: string[]; alt?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
        {images.map((src, i) => (
          <img key={src} src={src} alt={`${alt} ${i + 1}`} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`} />
        ))}
      </div>
      <div role="tablist" aria-label="Choisir une photo" className="mt-4 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button key={src} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
            className={`overflow-hidden rounded-xl ring-2 transition focus-visible:outline-none ${i === active ? "ring-violet-600" : "ring-transparent opacity-70 hover:opacity-100"}`}>
            <img src={src} alt="" className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
