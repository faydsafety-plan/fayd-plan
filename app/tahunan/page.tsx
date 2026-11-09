"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Holiday } from "@/lib/types";
import { BULAN, HARI, fromISODate } from "@/lib/date";
import BottomNav from "@/components/BottomNav";

export default function TahunanPage() {
  const supabase = useMemo(() => createClient(), []);
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    supabase
      .from("holidays")
      .select("*")
      .gte("date", `${year}-01-01`)
      .lte("date", `${year}-12-31`)
      .order("date")
      .then(({ data }) => setHolidays((data as Holiday[]) ?? []));
  }, [supabase, year]);

  const byMonth = BULAN.map((_, m) => holidays.filter((h) => fromISODate(h.date).getMonth() === m));
  const libur = holidays.filter((h) => h.kind === "libur_nasional").length;
  const cuti = holidays.length - libur;

  return (
    <main className="px-4 pb-24 pt-6">
      <header className="flex items-center justify-between">
        <button onClick={() => setYear(year - 1)} className="px-3 text-xl" aria-label="Tahun sebelumnya">‹</button>
        <h1 className="text-xl font-bold">Tahun {year}</h1>
        <button onClick={() => setYear(year + 1)} className="px-3 text-xl" aria-label="Tahun berikutnya">›</button>
      </header>

      <p className="mt-2 text-center text-sm text-slate-500">
        {libur} libur nasional · {cuti} cuti bersama
      </p>
      <div className="mt-2 flex justify-center gap-4 text-xs text-slate-500">
        <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-600" />Libur nasional</span>
        <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-orange-400" />Cuti bersama</span>
      </div>

      {holidays.length === 0 && (
        <p className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-500 shadow-sm">
          Data tanggal merah tahun ini belum diisi.
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {byMonth.map((list, m) =>
          list.length === 0 ? null : (
            <section key={m} className="rounded-xl bg-white p-3 shadow-sm">
              <h2 className="text-sm font-semibold">{BULAN[m]}</h2>
              <ul className="mt-2 space-y-1">
                {list.map((h) => {
                  const d = fromISODate(h.date);
                  return (
                    <li key={h.date}>
                      <Link href={`/harian?d=${h.date}`} className="flex gap-2 text-sm">
                        <span className={`w-14 shrink-0 font-semibold ${h.kind === "libur_nasional" ? "text-red-600" : "text-orange-500"}`}>
                          {d.getDate()} {HARI[d.getDay()].slice(0, 3)}
                        </span>
                        <span className="text-slate-700">{h.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )
        )}
      </div>

      <BottomNav />
    </main>
  );
}
