"use client";
import { useId, useState } from "react";

export default function ToggleSwitch({
  label = "Notifications par e-mail",
  description = "Recevez un résumé chaque semaine.",
  defaultChecked = false,
  onChange,
}: { label?: string; description?: string; defaultChecked?: boolean; onChange?: (v: boolean) => void }) {
  const [on, setOn] = useState(defaultChecked);
  const id = useId();
  const toggle = () => {
    setOn(!on);
    onChange?.(!on);
  };
  return (
    <div className="flex items-center justify-between gap-6">
      <div>
        <p id={`${id}-l`} className="text-sm font-medium text-neutral-900 dark:text-white">{label}</p>
        {description && <p id={`${id}-d`} className="text-sm text-neutral-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-labelledby={`${id}-l`}
        aria-describedby={description ? `${id}-d` : undefined}
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${on ? "bg-violet-600" : "bg-neutral-300 dark:bg-neutral-700"}`}
      >
        <span aria-hidden className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
