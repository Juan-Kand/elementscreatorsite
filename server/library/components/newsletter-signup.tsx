"use client";
import { useState, type FormEvent } from "react";

export default function NewsletterSignup({
  title = "Recevez nos nouveautés",
  subtitle = "Un e-mail par mois, pas de spam. Désinscription en un clic.",
  onSubscribe,
}: { title?: string; subtitle?: string; onSubscribe?: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubscribe?.(email);
    setDone(true);
  };
  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{subtitle}</p>
        {done ? (
          <p role="status" className="mt-6 font-medium text-green-600">Merci ! Vérifiez votre boîte mail.</p>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="nl-email" className="sr-only">Adresse e-mail</label>
            <input id="nl-email" type="email" required placeholder="vous@exemple.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white" />
            <button type="submit" className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500">S'inscrire</button>
          </form>
        )}
      </div>
    </section>
  );
}
