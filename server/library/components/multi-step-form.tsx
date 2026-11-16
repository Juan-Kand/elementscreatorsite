"use client";
import { useState, type FormEvent } from "react";

const STEPS = ["Votre projet", "Budget & délai", "Vos coordonnées"];
const field = "mt-1 w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm text-neutral-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:text-white";
const lab = "text-sm font-medium text-neutral-700 dark:text-neutral-300";

/** Formulaire en plusieurs étapes (demande de devis) avec barre de progression. */
export default function MultiStepForm({ onSubmit }: { onSubmit?: (data: Record<string, string>) => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({ type: "Site vitrine", budget: "2 000 – 5 000 €" });
  const [done, setDone] = useState(false);
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  const next = (e: FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) setStep(step + 1);
    else { onSubmit?.(data); setDone(true); }
  };
  if (done) return <p role="status" className="mx-auto max-w-lg rounded-2xl bg-green-50 p-8 text-center font-medium text-green-800 dark:bg-green-950 dark:text-green-300">Merci {data.name} ! Nous revenons vers vous sous 48 h.</p>;

  const Choice = ({ name, options }: { name: string; options: string[] }) => (
    <div className="mt-2 grid gap-2 sm:grid-cols-2">
      {options.map((o) => (
        <label key={o} className={`cursor-pointer rounded-xl border p-3 text-sm transition ${data[name] === o ? "border-violet-600 bg-violet-50 text-violet-800 dark:bg-violet-950 dark:text-violet-200" : "border-neutral-200 text-neutral-700 dark:border-neutral-800 dark:text-neutral-300"}`}>
          <input type="radio" name={name} value={o} checked={data[name] === o} onChange={() => set(name, o)} className="sr-only" />{o}
        </label>
      ))}
    </div>
  );

  return (
    <form onSubmit={next} className="mx-auto w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-950">
      <ol className="flex gap-2" aria-label="Étapes">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1" aria-current={i === step ? "step" : undefined}>
            <span className={`block h-1.5 rounded-full ${i <= step ? "bg-violet-600" : "bg-neutral-200 dark:bg-neutral-800"}`} />
            <span className={`mt-2 block text-xs ${i === step ? "font-semibold text-violet-700 dark:text-violet-300" : "text-neutral-500"}`}>{i + 1}. {s}</span>
          </li>
        ))}
      </ol>
      <h2 className="mt-8 text-xl font-semibold text-neutral-900 dark:text-white">{STEPS[step]}</h2>
      <div className="mt-4 space-y-4">
        {step === 0 && (<>
          <fieldset><legend className={lab}>Type de projet</legend><Choice name="type" options={["Site vitrine", "Boutique en ligne", "Application web", "Refonte"]} /></fieldset>
          <div><label htmlFor="ms-desc" className={lab}>Décrivez votre besoin</label><textarea id="ms-desc" rows={4} required value={data.desc ?? ""} onChange={(e) => set("desc", e.target.value)} className={field} /></div>
        </>)}
        {step === 1 && (<>
          <fieldset><legend className={lab}>Budget</legend><Choice name="budget" options={["< 2 000 €", "2 000 – 5 000 €", "5 000 – 15 000 €", "> 15 000 €"]} /></fieldset>
          <div><label htmlFor="ms-date" className={lab}>Mise en ligne souhaitée</label><input id="ms-date" type="month" required value={data.date ?? ""} onChange={(e) => set("date", e.target.value)} className={field} /></div>
        </>)}
        {step === 2 && (<>
          <div><label htmlFor="ms-name" className={lab}>Nom</label><input id="ms-name" required autoComplete="name" value={data.name ?? ""} onChange={(e) => set("name", e.target.value)} className={field} /></div>
          <div><label htmlFor="ms-email" className={lab}>E-mail</label><input id="ms-email" type="email" required autoComplete="email" value={data.email ?? ""} onChange={(e) => set("email", e.target.value)} className={field} /></div>
          <div><label htmlFor="ms-tel" className={lab}>Téléphone (facultatif)</label><input id="ms-tel" type="tel" autoComplete="tel" value={data.tel ?? ""} onChange={(e) => set("tel", e.target.value)} className={field} /></div>
        </>)}
      </div>
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 disabled:invisible dark:text-neutral-300 dark:hover:bg-neutral-900">← Retour</button>
        <button type="submit" className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-500">{step === STEPS.length - 1 ? "Envoyer la demande" : "Continuer →"}</button>
      </div>
    </form>
  );
}
