"use client";
import { useMemo, useState } from "react";

type Row = { name: string; email: string; role: string; status: "Actif" | "Invité" | "Suspendu"; joined: string };

const DEFAULT: Row[] = [
  { name: "Léa Martin", email: "lea@exemple.fr", role: "Admin", status: "Actif", joined: "2025-03-12" },
  { name: "Hugo Bernard", email: "hugo@exemple.fr", role: "Éditeur", status: "Actif", joined: "2025-06-01" },
  { name: "Inès Petit", email: "ines@exemple.fr", role: "Lecteur", status: "Invité", joined: "2026-01-20" },
  { name: "Karim Haddad", email: "karim@exemple.fr", role: "Éditeur", status: "Suspendu", joined: "2024-11-08" },
];

const statusStyle = {
  Actif: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  Invité: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Suspendu: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const COLS: { key: keyof Row; label: string }[] = [
  { key: "name", label: "Nom" }, { key: "role", label: "Rôle" }, { key: "status", label: "Statut" }, { key: "joined", label: "Arrivée" },
];

export default function DataTable({ rows = DEFAULT }: { rows?: Row[] }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: keyof Row; asc: boolean }>({ key: "name", asc: true });
  const data = useMemo(() => {
    const f = rows.filter((r) => `${r.name} ${r.email} ${r.role}`.toLowerCase().includes(q.toLowerCase()));
    return f.sort((a, b) => (a[sort.key] < b[sort.key] ? -1 : 1) * (sort.asc ? 1 : -1));
  }, [rows, q, sort]);

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between gap-4 border-b border-neutral-200 p-4 dark:border-neutral-800">
        <h2 className="font-semibold text-neutral-900 dark:text-white">Membres ({data.length})</h2>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filtrer…" aria-label="Filtrer les membres"
          className="w-48 rounded-lg border border-neutral-300 bg-transparent px-3 py-1.5 text-sm outline-none focus:border-violet-500 dark:border-neutral-700 dark:text-white" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-500 dark:bg-neutral-900">
            <tr>
              {COLS.map((c) => (
                <th key={c.key} scope="col" aria-sort={sort.key === c.key ? (sort.asc ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium">
                  <button onClick={() => setSort((s) => ({ key: c.key, asc: s.key === c.key ? !s.asc : true }))} className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white">
                    {c.label}{sort.key === c.key && <span aria-hidden>{sort.asc ? "↑" : "↓"}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
            {data.map((r) => (
              <tr key={r.email} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                <td className="px-4 py-3"><div className="font-medium text-neutral-900 dark:text-white">{r.name}</div><div className="text-neutral-500">{r.email}</div></td>
                <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300">{r.role}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[r.status]}`}>{r.status}</span></td>
                <td className="px-4 py-3 text-neutral-500">{new Date(r.joined).toLocaleDateString("fr-FR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
