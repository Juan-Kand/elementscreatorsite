"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Fenêtre modale basée sur <dialog> natif : focus piégé, Échap pour fermer. */
export default function ModalDialog({
  open,
  onClose,
  title = "Confirmer la suppression",
  children = <p>Cette action est définitive. Le projet et tous ses fichiers seront supprimés.</p>,
  confirmLabel = "Supprimer",
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="modal-title"
      className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="p-6">
        <h2 id="modal-title" className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h2>
        <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{children}</div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-neutral-300 dark:hover:bg-neutral-900">Annuler</button>
          <button onClick={() => { onConfirm?.(); onClose(); }} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">{confirmLabel}</button>
        </div>
      </div>
    </dialog>
  );
}
