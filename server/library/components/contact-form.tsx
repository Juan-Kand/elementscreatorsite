"use client";
import { useState, type FormEvent } from "react";

export default function ContactForm({ onSubmit }: { onSubmit?: (data: Record<string, string>) => void }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    onSubmit?.(data);
    setSent(true);
  };
  const field = "mt-1 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:text-white";
  return (
    <section className="bg-white py-24 dark:bg-neutral-950">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Parlons de votre projet</h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Réponse sous 24 h ouvrées.</p>
          <dl className="mt-8 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            <div><dt className="font-semibold">E-mail</dt><dd>contact@exemple.fr</dd></div>
            <div><dt className="font-semibold">Téléphone</dt><dd>01 23 45 67 89</dd></div>
            <div><dt className="font-semibold">Adresse</dt><dd>12 rue de la Paix, 75002 Paris</dd></div>
          </dl>
        </div>
        {sent ? (
          <p role="status" className="self-center rounded-xl bg-green-50 p-6 text-green-800 dark:bg-green-950 dark:text-green-300">Merci, votre message est bien parti !</p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="cf-name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Nom</label><input id="cf-name" name="name" required className={field} /></div>
              <div><label htmlFor="cf-email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">E-mail</label><input id="cf-email" name="email" type="email" required className={field} /></div>
            </div>
            <div><label htmlFor="cf-subject" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Sujet</label>
              <select id="cf-subject" name="subject" className={field}><option>Devis</option><option>Partenariat</option><option>Support</option><option>Autre</option></select>
            </div>
            <div><label htmlFor="cf-msg" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Message</label><textarea id="cf-msg" name="message" rows={5} required className={field} /></div>
            <button type="submit" className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">Envoyer</button>
          </form>
        )}
      </div>
    </section>
  );
}
