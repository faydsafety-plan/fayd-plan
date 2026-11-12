# FAYD — Landing Page

Landing page untuk menjual aplikasi. Stack: Next.js (App Router) + Tailwind CSS 4, deploy ke Vercel.
Tidak butuh database atau environment variable.

## Mengubah isi
- `lib/site.ts` — nama toko, tagline, deskripsi, **nomor WhatsApp**, email
- `lib/products.ts` — daftar aplikasi, fitur, dan harga
- `app/page.tsx` — susunan halaman (hero, aplikasi, cara pesan, FAQ, ajakan)
- `app/globals.css` — warna (bagian `@theme`)

## Menjalankan di komputer
1. `npm install`
2. `npm run dev`, buka http://localhost:3000

## Deploy
Hubungkan repo ini ke Vercel lalu deploy. Setiap push ke `main` otomatis deploy ulang.

## Kode lama
Aplikasi FAYD PLAN v1 (Supabase) disimpan di branch `archive/fayd-plan-v1`.
