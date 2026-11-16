"use client";
import { useEffect, useState } from "react";

type T = { quote: string; name: string; role: string; avatar: string };
const DEFAULT: T[] = [
  { quote: "Le site a été livré en une semaine, et nos demandes de devis ont triplé.", name: "Marc Lefèvre", role: "Gérant, Atelier Bois", avatar: "https://i.pravatar.cc/120?img=11" },
  { quote: "Enfin des composants accessibles sans devoir tout réécrire.", name: "Chloé Garnier", role: "Développeuse front", avatar: "https://i.pravatar.cc/120?img=44" },
  { quote: "Nos clients nous complimentent sur le nouveau design chaque semaine.", name: "Yanis Roux", role: "Fondateur, Kiosk", avatar: "https://i.pravatar.cc/120?img=53" },
];

export default function TestimonialCarousel({ items = DEFAULT, interval = 6000 }: { items?: T[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);
  const t = items[i];
  return (
    <section className="bg-neutral-50 px-6 py-24 dark:bg-neutral-900">
      <div className="mx-auto max-w-3xl text-center">
        <figure key={i} className="animate-[fadeIn_.5s_ease] motion-reduce:animate-none">
          <p aria-hidden className="text-amber-500">★★★★★</p>
          <blockquote aria-live="polite" className="mt-4 text-2xl font-medium leading-relaxed text-neutral-900 dark:text-white">« {t.quote} »</blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3">
            <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
            <span className="text-left">
              <span className="block font-semibold text-neutral-900 dark:text-white">{t.name}</span>
              <span className="block text-sm text-neutral-500">{t.role}</span>
            </span>
          </figcaption>
        </figure>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Témoignage ${k + 1}`} aria-current={k === i}
              className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-violet-600" : "w-2 bg-neutral-300 dark:bg-neutral-700"}`} />
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
