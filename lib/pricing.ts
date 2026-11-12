// Paket harga FAYD P2H Digital. Angka ditulis apa adanya (teks).
export type Plan = {
  id: "demo" | "basic" | "pro";
  badge: string;
  name: string;
  tagline: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  features: string[];
  cta: string;
  waMessage: string;
  highlight?: boolean;
};

export const plans: Plan[] = [
  {
    id: "demo",
    badge: "Demo · Gratis",
    name: "Coba dulu",
    tagline: "Rasakan sendiri sebelum membeli.",
    price: "Rp0",
    features: ["Akses demo aplikasi", "Fitur dan data terbatas", "Lihat alur operator sampai rekap"],
    cta: "Coba demo gratis",
    waMessage: "Halo FAYD, saya mau coba demo P2H Digital.",
  },
  {
    id: "basic",
    badge: "Diskon 50%",
    name: "Basic",
    tagline: "Untuk yang biasa pasang sendiri.",
    price: "Rp49.000",
    oldPrice: "Rp99.000",
    discount: "Hemat Rp50.000",
    features: [
      "Aplikasi P2H Digital",
      "Video tutorial pemasangan",
      "Panduan penggunaan",
      "Instalasi mandiri",
    ],
    cta: "Beli Basic",
    waMessage: "Halo FAYD, saya mau beli P2H Digital paket Basic.",
  },
  {
    id: "pro",
    badge: "Best deal · Diskon 40%",
    name: "Pro",
    tagline: "Dibimbing sampai aplikasi jalan di lokasi Anda.",
    price: "Rp119.000",
    oldPrice: "Rp199.000",
    discount: "Hemat Rp80.000",
    features: [
      "Semua fasilitas Basic",
      "Bimbingan instalasi",
      "Free konsultasi penyesuaian aplikasi",
      "Konsultasi bagian dalam aplikasi",
      "Maksimal 2 kali request fitur",
    ],
    cta: "Beli Pro",
    waMessage: "Halo FAYD, saya mau beli P2H Digital paket Pro.",
    highlight: true,
  },
];
