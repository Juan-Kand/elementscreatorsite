"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string; caption?: string };

const DEFAULT: Slide[] = [
  { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80", alt: "Lac entre les montagnes", caption: "Lac de montagne au lever du jour" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80", alt: "Collines dans la brume", caption: "Collines dans la brume" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80", alt: "Lac turquoise et forêt", caption: "Lac turquoise" },
  { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1600&q=80", alt: "Prairie verte au soleil", caption: "Prairie au soleil" },
];

/** Carrousel photo : flèches, points, défilement auto (pause au survol), swipe tactile et flèches clavier. */
export default function CarouselPhoto({ slides = DEFAULT, interval = 5000, autoPlay = true }: { slides?: Slide[]; interval?: number; autoPlay?: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (!autoPlay || paused || n < 2) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, go, n]);

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Galerie photo"
      className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-neutral-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex transition-transform duration-500 ease-out motion-reduce:transition-none" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s, k) => (
          <figure key={s.src} role="group" aria-roledescription="diapositive" aria-label={`${k + 1} sur ${n}`} aria-hidden={k !== i} className="relative aspect-[16/9] w-full shrink-0">
            <img src={s.src} alt={s.alt} className="h-full w-full object-cover" loading={k === 0 ? "eager" : "lazy"} />
            {s.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16 text-lg font-medium text-white">{s.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
      {n > 1 && (
        <>
          <button onClick={() => go(-1)} aria-label="Photo précédente" className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow backdrop-blur hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">‹</button>
          <button onClick={() => go(1)} aria-label="Photo suivante" className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 shadow backdrop-blur hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500">›</button>
          <div className="absolute bottom-4 right-6 flex gap-2">
            {slides.map((_, k) => (
              <button key={k} onClick={() => setI(k)} aria-label={`Aller à la photo ${k + 1}`} aria-current={k === i}
                className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
