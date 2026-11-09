import type { SupabaseClient } from "@supabase/supabase-js";

// Data awal sesuai rancangan: kategori + rutinitas mingguan.
const CATEGORIES = [
  { name: "Kantor-HSE", color: "#dc2626", sort_order: 1 },
  { name: "Kantor-Coding", color: "#2563eb", sort_order: 2 },
  { name: "Rutin", color: "#64748b", sort_order: 3 },
  { name: "FAYD SAFETY", color: "#16a34a", sort_order: 4 },
  { name: "Pribadi", color: "#9333ea", sort_order: 5 },
];

type RuleSeed = {
  cat: string;
  title: string;
  start_time: string;
  end_time: string;
  freq: "weekdays" | "weekly";
  days_of_week?: number[];
};

const RULES: RuleSeed[] = [
  { cat: "Kantor-HSE", title: "Cek laporan HSE site", start_time: "08:00", end_time: "08:45", freq: "weekdays" },
  { cat: "Kantor-HSE", title: "Tugas HSE inti (CSMS, IM 707, dokumen)", start_time: "08:45", end_time: "12:00", freq: "weekdays" },
  { cat: "Kantor-Coding", title: "Coding aplikasi permintaan divisi", start_time: "13:00", end_time: "15:30", freq: "weekdays" },
  { cat: "Kantor-HSE", title: "Follow-up temuan site", start_time: "15:30", end_time: "16:30", freq: "weekdays" },
  { cat: "Rutin", title: "Rekap hari ini + 3 prioritas besok", start_time: "16:30", end_time: "17:00", freq: "weekdays" },
  { cat: "Kantor-HSE", title: "Rekap mingguan laporan HSE site", start_time: "08:00", end_time: "10:00", freq: "weekly", days_of_week: [6] },
  { cat: "Kantor-HSE", title: "Bereskan tugas tertunda", start_time: "10:00", end_time: "12:30", freq: "weekly", days_of_week: [6] },
  { cat: "Rutin", title: "Rencana minggu depan", start_time: "12:30", end_time: "14:00", freq: "weekly", days_of_week: [6] },
  { cat: "FAYD SAFETY", title: "Batch konten FAYD SAFETY", start_time: "15:00", end_time: "17:00", freq: "weekly", days_of_week: [6] },
  { cat: "FAYD SAFETY", title: "Posting + balas komentar", start_time: "19:30", end_time: "20:00", freq: "weekdays" },
];

/** Dijalankan sekali: hanya jika pengguna belum punya kategori. */
export async function seedIfEmpty(supabase: SupabaseClient) {
  const { count } = await supabase
    .from("categories")
    .select("id", { count: "exact", head: true });
  if (count && count > 0) return;

  const { data: cats, error } = await supabase
    .from("categories")
    .insert(CATEGORIES)
    .select("id, name");
  if (error || !cats) return;

  const idByName = new Map(cats.map((c) => [c.name as string, c.id as string]));
  await supabase.from("recurring_rules").insert(
    RULES.map((r) => ({
      category_id: idByName.get(r.cat) ?? null,
      title: r.title,
      start_time: r.start_time,
      end_time: r.end_time,
      freq: r.freq,
      days_of_week: r.days_of_week ?? null,
    }))
  );
}
