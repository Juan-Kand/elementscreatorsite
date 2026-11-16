"use client";
import { useState, type FormEvent } from "react";

function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const labels = ["Trop faible", "Faible", "Moyen", "Bon", "Excellent"];
const bars = ["bg-red-500", "bg-red-500", "bg-amber-500", "bg-green-500", "bg-green-600"];

export default function SignupForm({ onSubmit }: { onSubmit?: (d: { name: string; email: string; password: string }) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const s = strength(pw);
  const field = "mt-1 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:text-white";
  const submit = (e: FormEvent) => { e.preventDefault(); onSubmit?.({ name, email, password: pw }); };
  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Créer un compte</h1>
      <p className="mt-1 text-sm text-neutral-500">Gratuit, sans engagement.</p>
      <label htmlFor="su-name" className="mt-6 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Nom complet</label>
      <input id="su-name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
      <label htmlFor="su-email" className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">E-mail</label>
      <input id="su-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
      <label htmlFor="su-pw" className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Mot de passe</label>
      <div className="relative">
        <input id="su-pw" type={show ? "text" : "password"} required minLength={8} autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} aria-describedby="su-pw-help" className={`${field} pr-20`} />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white">{show ? "Masquer" : "Afficher"}</button>
      </div>
      {pw && (
        <div id="su-pw-help" className="mt-2">
          <div className="flex gap-1">{[0, 1, 2, 3].map((i) => <span key={i} className={`h-1 flex-1 rounded ${i < s ? bars[s] : "bg-neutral-200 dark:bg-neutral-800"}`} />)}</div>
          <p className="mt-1 text-xs text-neutral-500">{labels[s]}</p>
        </div>
      )}
      <button type="submit" className="mt-6 w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">Créer mon compte</button>
      <p className="mt-4 text-center text-xs text-neutral-500">En continuant, vous acceptez les <a href="#" className="underline">conditions d'utilisation</a>.</p>
    </form>
  );
}
