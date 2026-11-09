import type { SupabaseClient } from "@supabase/supabase-js";
import type { RecurringRule } from "./types";
import { isoDayOfWeek, fromISODate } from "./date";

export function ruleMatches(rule: RecurringRule, date: string, isHoliday: boolean): boolean {
  if (!rule.active) return false;
  if (date < rule.start_date) return false;
  if (rule.end_date && date > rule.end_date) return false;
  if (isHoliday && rule.skip_holiday) return false;

  const dow = isoDayOfWeek(date);
  switch (rule.freq) {
    case "daily":
      return true;
    case "weekdays":
      return dow >= 1 && dow <= 5;
    case "weekly":
      return (rule.days_of_week ?? []).includes(dow);
    case "monthly":
      return rule.day_of_month === fromISODate(date).getDate();
    default:
      return false;
  }
}

/** Buat baris activities dari aturan berulang untuk satu tanggal (tidak dobel). */
export async function generateForDate(
  supabase: SupabaseClient,
  date: string,
  isHoliday: boolean
) {
  const { data: rules, error } = await supabase
    .from("recurring_rules")
    .select("*")
    .eq("active", true);
  if (error || !rules) return;

  const rows = (rules as RecurringRule[])
    .filter((r) => ruleMatches(r, date, isHoliday))
    .map((r) => ({
      rule_id: r.id,
      category_id: r.category_id,
      title: r.title,
      date,
      start_time: r.start_time,
      end_time: r.end_time,
    }));

  if (rows.length === 0) return;
  await supabase
    .from("activities")
    .upsert(rows, { onConflict: "rule_id,date", ignoreDuplicates: true });
}
