"use client";
import { useState } from "react";

/** Section vidéo : vignette + bouton lecture, charge l'iframe YouTube (sans cookies) seulement au clic. */
export default function VideoSection({
  title = "Découvrez l'outil en 2 minutes",
  subtitle = "Une démo rapide pour voir comment créer une page complète.",
  youtubeId = "dQw4w9WgXcQ",
  poster = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
}: { title?: string; subtitle?: string; youtubeId?: string; poster?: string }) {
  const [play, setPlay] = useState(false);
  return (
    <section className="bg-white px-6 py-24 dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">{subtitle}</p>
        <div className="relative mt-10 aspect-video overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
          {play ? (
            <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`} title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ) : (
            <button onClick={() => setPlay(true)} className="group absolute inset-0 focus-visible:outline-none" aria-label={`Lire la vidéo : ${title}`}>
              <img src={poster} alt="" className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-xl transition group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-violet-500">
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-violet-600" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
