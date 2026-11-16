"use client";
import { useState, type FormEvent } from "react";

export default function LoginForm({ onSubmit }: { onSubmit?: (data: { email: string; password: string }) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handle = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-neutral-50 px-6 dark:bg-neutral-900">
      <form onSubmit={handle} className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Connexion</h1>
        <p className="mt-1 text-sm text-neutral-500">Heureux de vous revoir.</p>
        <label htmlFor="email" className="mt-6 block text-sm font-medium text-neutral-700 dark:text-neutral-300">E-mail</label>
        <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:text-white" />
        <label htmlFor="password" className="mt-4 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Mot de passe</label>
        <input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:text-white" />
        <button type="submit" className="mt-6 w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
          Se connecter
        </button>
        <p className="mt-4 text-center text-sm text-neutral-500">Pas de compte ? <a href="#" className="font-medium text-violet-600 hover:underline">Créer un compte</a></p>
      </form>
    </div>
  );
}
