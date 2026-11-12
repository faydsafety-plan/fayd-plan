import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const title = `${site.product} | P2H unit di HP, mulai Rp49.000`;
const description =
  "Checklist P2H harian dari HP. Status unit LAYAK atau TIDAK LAYAK keluar otomatis, rekap pengawas siap cetak. Sekali bayar, data di akun Google Anda sendiri.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "id_ID", images: ["/p2h/v-hasil.png"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141414",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Pasang mode siang sebelum halaman tampil, supaya tidak berkedip */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("tema")==="siang")document.documentElement.dataset.tema="siang"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
