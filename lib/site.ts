// Pengaturan umum. Ubah nilai di sini, semua halaman ikut berubah.
export const site = {
  brand: "FAYD Safety",
  slogan: "Field Apps for Your Daily Safety",
  product: "FAYD P2H Digital",
  whatsapp: "628176719228", // format internasional, tanpa + dan spasi
  whatsappLabel: "0817-6719-228",
  email: "fayd.safety@gmail.com",
  instagram: "fayd.safety", // kosongkan kalau tidak ada
  tiktok: "fayd.safety",
};

// Link checkout Lynk. Tempel link produk Lynk Anda di sini.
// Selama masih kosong, tombol beli otomatis diarahkan ke WhatsApp.
export const lynk = {
  demo: "https://drive.google.com/file/d/1aVGFDMNeQTY7GcjEYxUThKs7-sB1RHUQ/view?usp=drive_link",
  basic: "https://lynk.id/faydsafety/8eq78960447p/checkout",
  pro: "https://lynk.id/faydsafety/vqky82n0vm4l/checkout",
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buyLink(plan: keyof typeof lynk, fallbackMessage: string) {
  return lynk[plan] || waLink(fallbackMessage);
}
