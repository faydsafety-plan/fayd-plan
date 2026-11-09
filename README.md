# FAYD PLAN

Aplikasi web pribadi untuk merencanakan dan mencatat kegiatan kerja kantor dan sampingan.
Stack: Next.js (App Router) + Supabase (database + login) + Vercel.

## Fitur versi 1
- Login (hanya akun pemilik)
- Menu **Harian**: daftar kegiatan, tambah/ubah/hapus, ketuk bulatan untuk ganti status (Belum → Proses → Selesai)
- Kegiatan berulang otomatis (rutinitas kerja), dilewati di hari libur nasional
- Menu **Tahunan**: tanggal merah (libur nasional + cuti bersama)
- **Pengaturan**: kategori, aktif/matikan kegiatan berulang, keluar
- Mingguan & Bulanan: versi 2

## Menjalankan di komputer
1. `npm install`
2. Salin `.env.example` menjadi `.env.local`, isi URL dan anon key Supabase
3. `npm run dev`, buka http://localhost:3000

## Database
Jalankan berurutan di Supabase → SQL Editor:
1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_seed_holidays.sql`

Lalu buat akun di Supabase → Authentication → Users → Add user, dan matikan pendaftaran publik
(Authentication → Sign In / Providers → Allow new users to sign up: off).

Saat login pertama, aplikasi otomatis membuat kategori dan rutinitas awal.

## Deploy
Hubungkan repo ini ke Vercel, isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`
di Environment Variables, lalu deploy. Setiap push ke `main` otomatis deploy ulang.
