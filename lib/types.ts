export type Status = "belum" | "proses" | "selesai" | "batal";

export type Category = {
  id: string;
  name: string;
  color: string;
  sort_order: number;
};

export type Activity = {
  id: string;
  category_id: string | null;
  rule_id: string | null;
  title: string;
  date: string; // YYYY-MM-DD
  start_time: string | null; // HH:MM:SS
  end_time: string | null;
  priority: number; // 1 tinggi, 2 sedang, 3 rendah
  status: Status;
  note: string | null;
  result_note: string | null;
};

export type RecurringRule = {
  id: string;
  category_id: string | null;
  title: string;
  start_time: string | null;
  end_time: string | null;
  freq: "daily" | "weekdays" | "weekly" | "monthly";
  days_of_week: number[] | null;
  day_of_month: number | null;
  start_date: string;
  end_date: string | null;
  skip_holiday: boolean;
  active: boolean;
};

export type Holiday = {
  date: string;
  name: string;
  kind: "libur_nasional" | "cuti_bersama";
};
