"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Activity, Category, Holiday, Status } from "@/lib/types";
import { addDays, formatLong, hhmm, toISODate } from "@/lib/date";
import { generateForDate } from "@/lib/recurring";
import { seedIfEmpty } from "@/lib/seed";
import ActivityForm, { type ActivityInput } from "@/components/ActivityForm";
import BottomNav from "@/components/BottomNav";

const NEXT_STATUS: Record<Status, Status> = {
  belum: "proses",
  proses: "selesai",
  selesai: "belum",
  batal: "belum",
};

const STATUS_STYLE: Record<Status, string> = {
  belum: "border-slate-300 bg-white",
  proses: "border-amber-400 bg-amber-100 text-amber-700",
  selesai: "border-green-500 bg-green-500 text-white",
  batal: "border-slate-300 bg-slate-200 text-slate-500",
};

const STATUS_ICON: Record<Status, string> = { belum: "", proses: "…", selesai: "✓", batal: "×" };

export default function HarianPage() {
  const supabase = useMemo(() => createClient(), []);
  const [date, setDate] = useState(() => toISODate(new Date()));
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Activity | null>(null);
  const [adding, setAdding] = useState(false);

  // Baca ?d=YYYY-MM-DD (dipakai nanti dari menu Bulanan/Tahunan)
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get("d");
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) setDate(d);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    await seedIfEmpty(supabase);

    const { data: h } = await supabase.from("holidays").select("*").eq("date", date).maybeSingle();
    setHoliday((h as Holiday) ?? null);

    await generateForDate(supabase, date, h?.kind === "libur_nasional");

    const [{ data: cats }, { data: acts }] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase
        .from("activities")
        .select("*")
        .eq("date", date)
        .order("start_time", { ascending: true, nullsFirst: false })
        .order("priority"),
    ]);
    setCategories((cats as Category[]) ?? []);
    setActivities((acts as Activity[]) ?? []);
    setLoading(false);
  }, [supabase, date]);

  useEffect(() => {
    load();
  }, [load]);

  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
  const active = activities.filter((a) => a.status !== "batal");
  const done = active.filter((a) => a.status === "selesai").length;
  const pct = active.length ? Math.round((done / active.length) * 100) : 0;

  async function cycleStatus(a: Activity) {
    const status = NEXT_STATUS[a.status];
    setActivities((list) => list.map((x) => (x.id === a.id ? { ...x, status } : x)));
    await supabase.from("activities").update({ status }).eq("id", a.id);
  }

  async function save(input: ActivityInput) {
    if (editing) {
      await supabase.from("activities").update(input).eq("id", editing.id);
    } else {
      await supabase.from("activities").insert({ ...input, date });
    }
    setEditing(null);
    setAdding(false);
    load();
  }

  async function remove() {
    if (!editing) return;
    await supabase.from("activities").delete().eq("id", editing.id);
    setEditing(null);
    load();
  }

  const today = toISODate(new Date());

  return (
    <main className="px-4 pb-28 pt-6">
      <header className="flex items-center justify-between">
        <button onClick={() => setDate(addDays(date, -1))} className="rounded-full px-3 py-1 text-xl" aria-label="Hari sebelumnya">‹</button>
        <div className="text-center">
          <h1 className="text-lg font-bold">{formatLong(date)}</h1>
          {date !== today && (
            <button onClick={() => setDate(today)} className="text-xs text-blue-600">Kembali ke hari ini</button>
          )}
        </div>
        <button onClick={() => setDate(addDays(date, 1))} className="rounded-full px-3 py-1 text-xl" aria-label="Hari berikutnya">›</button>
      </header>

      {holiday && (
        <p className={`mt-3 rounded-lg px-3 py-2 text-sm ${holiday.kind === "libur_nasional" ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"}`}>
          {holiday.kind === "libur_nasional" ? "Libur nasional" : "Cuti bersama"}: {holiday.name}
        </p>
      )}

      <section className="mt-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex justify-between text-sm">
          <span>Progres</span>
          <span className="font-semibold">{done}/{active.length} selesai</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-green-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <ul className="mt-4 space-y-2">
        {loading && <li className="text-sm text-slate-400">Memuat...</li>}
        {!loading && activities.length === 0 && (
          <li className="rounded-xl bg-white p-4 text-sm text-slate-500 shadow-sm">Belum ada kegiatan. Tekan + untuk menambah.</li>
        )}
        {activities.map((a) => {
          const cat = a.category_id ? catById.get(a.category_id) : undefined;
          return (
            <li key={a.id} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm" style={{ borderLeft: `4px solid ${cat?.color ?? "#cbd5e1"}` }}>
              <button onClick={() => setEditing(a)} className="min-w-0 flex-1 text-left">
                <div className="text-xs text-slate-500">
                  {hhmm(a.start_time)}{a.end_time ? `–${hhmm(a.end_time)}` : ""} {cat ? `· ${cat.name}` : ""}
                  {a.priority === 1 && <span className="ml-1 font-semibold text-red-600">· Penting</span>}
                </div>
                <div className={`truncate font-medium ${a.status === "selesai" || a.status === "batal" ? "text-slate-400 line-through" : ""}`}>{a.title}</div>
                {a.result_note && <div className="truncate text-xs text-slate-500">Hasil: {a.result_note}</div>}
              </button>
              <button
                onClick={() => cycleStatus(a)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${STATUS_STYLE[a.status]}`}
                aria-label={`Status: ${a.status}`}
              >
                {STATUS_ICON[a.status]}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => setAdding(true)}
        className="fixed bottom-20 right-5 z-10 h-14 w-14 rounded-full bg-slate-900 text-3xl text-white shadow-lg"
        aria-label="Tambah kegiatan"
      >
        +
      </button>

      {(adding || editing) && (
        <ActivityForm
          categories={categories}
          initial={editing}
          onSave={save}
          onDelete={editing ? remove : undefined}
          onClose={() => {
            setAdding(false);
            setEditing(null);
          }}
        />
      )}

      <BottomNav />
    </main>
  );
}
