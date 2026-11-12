# FAYD Safety — Landing Page P2H Digital

Landing page untuk menjual FAYD P2H Digital. Stack: Next.js (App Router) + Tailwind CSS 4, deploy ke Vercel.
Tidak butuh database atau environment variable.

## Mengubah isi
- `lib/site.ts` — WhatsApp, email, sosial media, dan **link checkout Lynk** (`lynk.demo`, `lynk.basic`, `lynk.pro`).
  Selama link Lynk kosong, tombol beli diarahkan ke WhatsApp.
- `lib/pricing.ts` — paket Demo, Basic, Pro: harga, harga coret, dan fasilitas
- `lib/roadmap.ts` — aplikasi "Segera hadir"
- `app/page.tsx` — teks dan urutan bagian halaman
- `app/globals.css` — warna (bagian `@theme`, mengikuti aplikasi P2H)
- `public/p2h/` — screenshot aplikasi dan video demo

## Menjalankan di komputer
1. `npm install`
2. `npm run dev`, buka http://localhost:3000

## Deploy
Hubungkan repo ini ke Vercel lalu deploy. Setiap push ke `main` otomatis deploy ulang.

## Kode lama
Aplikasi FAYD PLAN v1 (Supabase) disimpan di branch `archive/fayd-plan-v1`.
