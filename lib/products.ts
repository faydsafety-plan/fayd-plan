// Daftar aplikasi yang dijual. Tambah, hapus, atau ubah isi di sini.
// Harga ditulis apa adanya (teks), misalnya "Rp 2.500.000" atau "Hubungi kami".
export type Product = {
  slug: string;
  name: string;
  summary: string;
  features: string[];
  price: string;
  priceNote?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "e-hse",
    name: "E-HSE",
    summary: "Laporan HSE harian dan mingguan dari lapangan, langsung dari HP.",
    features: [
      "Form inspeksi dan laporan insiden",
      "Rekap mingguan otomatis",
      "Foto bukti tersimpan per laporan",
    ],
    price: "Hubungi kami",
    featured: true,
  },
  {
    slug: "e-payroll",
    name: "E-Payroll",
    summary: "Hitung gaji, lembur, dan potongan karyawan tanpa spreadsheet.",
    features: [
      "Data karyawan dan komponen gaji",
      "Slip gaji siap cetak",
      "Rekap per periode",
    ],
    price: "Hubungi kami",
  },
  {
    slug: "rab",
    name: "RAB App",
    summary: "Susun Rencana Anggaran Biaya proyek lebih cepat dan rapi.",
    features: [
      "Item pekerjaan dan harga satuan",
      "Total otomatis per bagian",
      "Ekspor untuk penawaran",
    ],
    price: "Hubungi kami",
  },
  {
    slug: "fayd-plan",
    name: "FAYD PLAN",
    summary: "Rencana kegiatan harian dengan rutinitas berulang dan kalender libur nasional.",
    features: [
      "Daftar kegiatan dengan status",
      "Rutinitas otomatis, lewati hari libur",
      "Nyaman dipakai di HP",
    ],
    price: "Hubungi kami",
  },
];
