"use client";
import { useEffect, useState } from "react";

const KEY = "cookie-consent";

export default function CookieBanner({ policyHref = "/confidentialite" }: { policyHref?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { setVisible(!localStorage.getItem(KEY)); } catch { setVisible(true); }
  }, []);
  const choose = (value: "all" | "essential") => {
    try { localStorage.setItem(KEY, value); } catch {}
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div role="dialog" aria-label="Préférences de cookies" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl sm:flex sm:items-center sm:gap-6 dark:border-neutral-800 dark:bg-neutral-950">
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        Nous utilisons des cookies pour améliorer votre expérience et mesurer l'audience.{" "}
        <a href={policyHref} className="font-medium text-violet-600 underline-offset-2 hover:underline">En savoir plus</a>
      </p>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button onClick={() => choose("essential")} className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900">Refuser</button>
        <button onClick={() => choose("all")} className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500">Accepter</button>
      </div>
    </div>
  );
}
