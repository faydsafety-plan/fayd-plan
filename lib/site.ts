// Pengaturan umum toko. Ubah nilai di sini, semua halaman ikut berubah.
export const site = {
  name: "FAYD",
  tagline: "Aplikasi siap pakai untuk kerja lapangan dan kantor",
  description:
    "Aplikasi web untuk HSE, payroll, RAB, dan perencanaan kerja. Dipasang untuk perusahaan Anda, dengan data Anda sendiri.",
  // Nomor WhatsApp format internasional tanpa + atau spasi, contoh: 6281234567890
  whatsapp: "62XXXXXXXXXXX",
  email: "",
  city: "Indonesia",
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
