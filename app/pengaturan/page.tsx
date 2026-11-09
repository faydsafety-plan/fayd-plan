"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Category, RecurringRule } from "@/lib/types";
import { hhmm } from "@/lib/date";
import BottomNav from "@/components/BottomNav";

const HARI_SINGKAT = ["", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function describe(r: RecurringRule): string {
  switch (r.freq) {
    case "daily":
      return "Setiap hari";
    case "weekdays":
      return "Senin–Jumat";
    case "weekly":
      return (r.days_of_week ?? []).map((d) => HARI_SINGKAT[d]).join(", ");
    case "monthly":
      return `Tiap tanggal ${r.day_of_month}`;
  }
}

export default function PengaturanPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [rules, setRules] = useState<RecurringRule[]>([]);
  const [newCat, setNewCat] = useState("");
  const [email, setEmail] = useState("");

  async function load() {
    const [{ data: cats }, { data: rs }, { data: u }] = await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("recurring_rules").select("*").order("start_time"),
      supabase.auth.getUser(),
    ]);
    setCategories((cats as Category[]) ?? []);
    setRules((rs as RecurringRule[]) ?? []);
    setEmail(u.user?.email ?? "");
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const catById = new Map(categories.map((c) => [c.id, c]));

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCat.trim()) return;
    await supabase.from("categories").insert({ name: newCat.trim(), sort_order: categories.length + 1 });
    setNewCat("");
    load();
  }

  async function toggleRule(r: RecurringRule) {
    await supabase.from("recurring_rules").update({ active: !r.active }).eq("id", r.id);
    load();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="space-y-6 px-4 pb-24 pt-6">
      <h1 className="text-xl font-bold">Pengaturan</h1>

      <section className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Kategori</h2>
        <ul className="mt-2 space-y-1">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center gap-2 text-sm">
              <span className="h-3 w-3 rounded-full" style={{ background: c.color }} />
              {c.name}
            </li>
          ))}
        </ul>
        <form onSubmit={addCategory} className="mt-3 flex gap-2">
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Kategori baru"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <button className="rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white">Tambah</button>
        </form>
      </section>

      <section className="rounded-xl bg-white p-4 shadow-sm">
        <h2 className="font-semibold">Kegiatan berulang</h2>
        <p className="text-xs text-slate-500">Matikan untuk berhenti membuat kegiatan ini otomatis.</p>
        <ul className="mt-3 space-y-2">
          {rules.map((r) => (
            <li key={r.id} className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className={`truncate text-sm font-medium ${r.active ? "" : "text-slate-400"}`}>{r.title}</div>
                <div className="text-xs text-slate-500">
                  {describe(r)} · {hhmm(r.start_time)}–{hhmm(r.end_time)}
                  {r.category_id && catById.get(r.category_id) ? ` · ${catById.get(r.category_id)!.name}` : ""}
                </div>
              </div>
              <button
                onClick={() => toggleRule(r)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${r.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
              >
                {r.active ? "Aktif" : "Mati"}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">Masuk sebagai {email}</p>
        <button onClick={logout} className="mt-2 rounded-lg border border-slate-300 px-4 py-2 text-sm">
          Keluar
        </button>
      </section>

      <BottomNav />
    </main>
  );
}
