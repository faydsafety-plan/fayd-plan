"use client";

import { useState } from "react";
import type { Activity, Category, Status } from "@/lib/types";

export type ActivityInput = {
  title: string;
  category_id: string | null;
  start_time: string | null;
  end_time: string | null;
  priority: number;
  status: Status;
  note: string | null;
  result_note: string | null;
};

type Props = {
  categories: Category[];
  initial?: Activity | null;
  onSave: (input: ActivityInput) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
};

const STATUS: { v: Status; label: string }[] = [
  { v: "belum", label: "Belum" },
  { v: "proses", label: "Proses" },
  { v: "selesai", label: "Selesai" },
  { v: "batal", label: "Batal" },
];

export default function ActivityForm({ categories, initial, onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [categoryId, setCategoryId] = useState(initial?.category_id ?? categories[0]?.id ?? "");
  const [start, setStart] = useState(initial?.start_time?.slice(0, 5) ?? "");
  const [end, setEnd] = useState(initial?.end_time?.slice(0, 5) ?? "");
  const [priority, setPriority] = useState(initial?.priority ?? 2);
  const [status, setStatus] = useState<Status>(initial?.status ?? "belum");
  const [note, setNote] = useState(initial?.note ?? "");
  const [result, setResult] = useState(initial?.result_note ?? "");
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onSave({
      title: title.trim(),
      category_id: categoryId || null,
      start_time: start || null,
      end_time: end || null,
      priority,
      status,
      note: note.trim() || null,
      result_note: result.trim() || null,
    });
    setSaving(false);
  }

  const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2";

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md space-y-3 overflow-y-auto rounded-t-2xl bg-white p-5"
      >
        <h2 className="text-lg font-bold">{initial ? "Ubah kegiatan" : "Kegiatan baru"}</h2>

        <input className={input} placeholder="Judul kegiatan" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />

        <select className={input} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <label className="flex-1 text-xs text-slate-500">
            Mulai
            <input type="time" className={input} value={start} onChange={(e) => setStart(e.target.value)} />
          </label>
          <label className="flex-1 text-xs text-slate-500">
            Selesai
            <input type="time" className={input} value={end} onChange={(e) => setEnd(e.target.value)} />
          </label>
        </div>

        <div className="flex gap-2">
          <label className="flex-1 text-xs text-slate-500">
            Prioritas
            <select className={input} value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
              <option value={1}>Tinggi</option>
              <option value={2}>Sedang</option>
              <option value={3}>Rendah</option>
            </select>
          </label>
          <label className="flex-1 text-xs text-slate-500">
            Status
            <select className={input} value={status} onChange={(e) => setStatus(e.target.value as Status)}>
              {STATUS.map((s) => (
                <option key={s.v} value={s.v}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        <textarea className={input} rows={2} placeholder="Catatan rencana (opsional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <textarea className={input} rows={2} placeholder="Hasil / yang sudah dikerjakan (opsional)" value={result} onChange={(e) => setResult(e.target.value)} />

        <div className="flex gap-2 pt-1">
          {onDelete && (
            <button
              type="button"
              onClick={async () => {
                if (!confirmDelete) return setConfirmDelete(true);
                await onDelete();
              }}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600"
            >
              {confirmDelete ? "Yakin hapus?" : "Hapus"}
            </button>
          )}
          <button type="button" onClick={onClose} className="ml-auto rounded-lg px-4 py-2 text-sm text-slate-500">
            Batal
          </button>
          <button type="submit" disabled={saving} className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
