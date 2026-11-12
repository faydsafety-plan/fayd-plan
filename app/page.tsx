import { Phone } from "@/components/Phone";
import { ThemeToggle } from "@/components/ThemeToggle";
import { plans } from "@/lib/pricing";
import { upcoming } from "@/lib/roadmap";
import { buyLink, site, waLink } from "@/lib/site";

const pains = [
  { t: "Kertas basah, sobek, hilang", d: "Lembar P2H di kabin kena hujan, oli, dan debu. Pas dicari, sudah tidak ada." },
  { t: "Dicentang asal di akhir shift", d: "Formalitas. Semua \"baik\", padahal tidak ada yang benar-benar dicek." },
  { t: "Unit rusak ketahuan belakangan", d: "Temuan kritis baru sampai ke pengawas setelah unit sudah jalan." },
  { t: "Rekap bulanan = ketik ulang", d: "Berjam-jam menyalin kertas ke Excel untuk laporan yang harusnya otomatis." },
];

const steps = [
  {
    img: "/p2h/v-ex.png",
    alt: "Form P2H: pilih operator, unit, shift, dengan peringatan unit tidak layak",
    t: "Operator pilih nama, unit, shift",
    d: "Kalau unit itu terakhir berstatus TIDAK LAYAK, peringatan langsung muncul sebelum diisi.",
  },
  {
    img: "/p2h/v-siap.png",
    alt: "Checklist item dengan tombol Baik dan Tidak baik",
    t: "Ketuk Baik atau Tidak baik",
    d: "Tombol besar, enak dipakai pakai sarung tangan. Temuan bisa diberi catatan dan foto.",
  },
  {
    img: "/p2h/v-hasil.png",
    alt: "Layar hasil TIDAK LAYAK berwarna merah",
    t: "Status keluar otomatis",
    d: "Item kritis bermasalah? Layar merah: JANGAN OPERASIKAN UNIT. Tidak ada yang bisa pura-pura tidak lihat.",
  },
  {
    img: "/p2h/t-rekap.png",
    alt: "Rekap pengawas: unit tidak layak dan P2H hari ini",
    t: "Pengawas pantau dari rekap",
    d: "Unit tidak layak, P2H yang belum diisi per shift, riwayat, unduh CSV, dan cetak. Dilindungi PIN.",
  },
];

const features = [
  ["Status otomatis 3 warna", "LAYAK, LAYAK DENGAN CATATAN, atau TIDAK LAYAK, dihitung dari item kritis."],
  ["Foto temuan", "Satu foto per item bermasalah, tersimpan rapi di Google Drive Anda."],
  ["Rekap dengan PIN", "Hanya pengawas yang bisa membuka rekap dan riwayat."],
  ["Unduh CSV & cetak", "Laporan siap dilampirkan atau diarsip, tanpa ketik ulang."],
  ["Checklist bisa diubah", "Tambah unit, item, atau jenis alat langsung di Google Sheets. Tanpa coding."],
  ["Mode terang", "Satu tombol untuk layar yang tetap terbaca di bawah terik matahari."],
  ["Cek 4 digit NIK", "Mencegah operator mengisi atas nama orang lain."],
  ["Shift & zona waktu", "Atur shift sendiri. WIB, WITA, atau WIT."],
];

const faqs = [
  {
    q: "Perlu server atau hosting berbayar?",
    a: "Tidak. Aplikasi berjalan di akun Google Anda sendiri (Google Sheets + Apps Script). Tidak ada biaya bulanan sama sekali.",
  },
  {
    q: "Data saya disimpan di mana? FAYD bisa lihat?",
    a: "Semua data ada di akun Google Anda. FAYD tidak bisa mengaksesnya. Kami juga tidak akan pernah meminta kata sandi akun Anda.",
  },
  {
    q: "Saya bukan orang IT. Bisa pasang sendiri?",
    a: "Bisa. Pemasangan sekitar 15 menit dengan panduan dan video langkah demi langkah. Kalau mau ditemani, ambil paket Pro.",
  },
  {
    q: "Operator perlu install aplikasi di HP?",
    a: "Tidak. Cukup buka link dari browser HP, lalu tambahkan ke layar utama supaya terasa seperti aplikasi biasa.",
  },
  {
    q: "Berapa unit dan operator yang bisa dimasukkan?",
    a: "Tidak dibatasi per unit atau per operator. Satu lisensi berlaku untuk satu perusahaan pembeli.",
  },
  {
    q: "Muncul tulisan \"Google belum memverifikasi aplikasi ini\". Aman?",
    a: "Normal untuk template yang berjalan di akun sendiri. Email developer yang tertulis adalah email Anda. Langkahnya dijelaskan di panduan.",
  },
  {
    q: "Kalau gagal dipasang bagaimana?",
    a: "Ada dukungan pemasangan lewat WhatsApp selama 14 hari. Di paket Pro, Anda dibimbing langsung sampai aplikasinya jalan.",
  },
  {
    q: "Apa beda Basic dan Pro?",
    a: "Aplikasinya sama. Pro menambah bimbingan instalasi, konsultasi penyesuaian, dan maksimal 2 request fitur.",
  },
];

const pro = plans.find((p) => p.id === "pro")!;
const basic = plans.find((p) => p.id === "basic")!;

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-5 w-5 flex-none text-amber">
      <path fill="currentColor" d="M8.2 13.6 4.6 10l-1.4 1.4 5 5 9-9-1.4-1.4z" />
    </svg>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold uppercase tracking-widest text-amber">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-muted">{sub}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-line bg-coal/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#" className="flex items-center gap-2" aria-label={site.brand}>
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber text-lg font-black text-ink">F</span>
            <span className="whitespace-nowrap text-base font-black tracking-tight sm:text-lg">
              FAYD <span className="text-amber">SAFETY</span>
            </span>
          </a>
          <nav className="hidden gap-7 text-sm font-semibold text-muted md:flex">
            <a href="#cara-kerja" className="hover:text-fg">Cara kerja</a>
            <a href="#fitur" className="hover:text-fg">Fitur</a>
            <a href="#harga" className="hover:text-fg">Harga</a>
            <a href="#konsultasi" className="hover:text-fg">Konsultasi</a>
            <a href="#faq" className="hover:text-fg">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#harga"
              className="whitespace-nowrap rounded-xl bg-amber px-3 py-2 text-sm font-black text-ink hover:bg-amber-dark sm:px-4"
            >
              Mulai Rp49rb
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="glow relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-20 md:grid-cols-[1.15fr_1fr] md:pt-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-xs font-bold text-muted">
                <span className="h-2 w-2 rounded-full bg-ok" /> {site.product} untuk tim HSE
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
                P2H kertas, <span className="text-amber">selesai.</span>
                <br />
                Pindah ke HP.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted">
                Operator isi checklist di HP. Status unit langsung keluar: <b className="text-fg">LAYAK</b> atau{" "}
                <b className="text-fg">TIDAK LAYAK</b>. Pengawas lihat rekap tanpa menunggu kertas dikumpulkan.
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-1">
                <span className="text-5xl font-black text-amber">{basic.price}</span>
                <span className="pb-1.5 text-lg text-dim line-through">{basic.oldPrice}</span>
                <span className="mb-2 rounded-md bg-ok/20 px-2 py-0.5 text-sm font-bold text-good">
                  {basic.badge}
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-muted">Sekali bayar. Tanpa langganan. Tanpa server.</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#harga"
                  className="rounded-2xl bg-amber px-7 py-4 text-center text-lg font-black text-ink shadow-lg shadow-amber/20 hover:bg-amber-dark"
                >
                  Ambil sekarang
                </a>
                <a
                  href="#demo"
                  className="rounded-2xl border-2 border-line-strong px-7 py-4 text-center text-lg font-bold hover:border-amber"
                >
                  ▶ Tonton demo 40 detik
                </a>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-sm justify-center md:max-w-none">
              <Phone
                src="/p2h/v-siap.png"
                alt="Form P2H di HP"
                className="w-[58%] -rotate-6 translate-x-6 translate-y-6 opacity-90"
              />
              <Phone
                src="/p2h/v-hasil.png"
                alt="Hasil P2H: TIDAK LAYAK"
                className="z-10 -ml-8 w-[60%] rotate-3"
                priority
              />
            </div>
          </div>
          <div className="stripes" />
        </section>

        {/* TRUST STRIP */}
        <section className="border-b border-line bg-panel/40 backdrop-blur-sm">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-4 px-4 py-6 text-sm font-semibold text-muted md:grid-cols-4">
            {[
              "Data di akun Google Anda",
              "Tanpa biaya bulanan",
              "Pasang ±15 menit",
              "Dukungan WhatsApp 14 hari",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Check /> {x}
              </li>
            ))}
          </ul>
        </section>

        {/* MASALAH */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle eyebrow="Kenal masalah ini?" title="P2H kertas itu ada, tapi tidak benar-benar menjaga." />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pains.map((p) => (
                <div key={p.t} className="glass rounded-2xl p-6">
                  <span className="text-2xl font-black text-bad" aria-hidden>✕</span>
                  <h3 className="mt-3 text-lg font-black">{p.t}</h3>
                  <p className="mt-2 text-muted">{p.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-xl font-bold">
              Satu unit dengan rem bermasalah yang lolos jalan bisa jauh lebih mahal dari aplikasi ini.{" "}
              <span className="text-amber">Jauh, jauh lebih mahal.</span>
            </p>
          </div>
        </section>

        {/* CARA KERJA */}
        <section id="cara-kerja" className="border-y border-line bg-panel/40 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle
              eyebrow="Cara kerja"
              title="Dari kabin ke meja pengawas, dalam hitungan detik."
              sub="Ini layar aplikasi aslinya, bukan gambar konsep."
            />
            <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.t}>
                  <Phone src={s.img} alt={s.alt} className="mx-auto w-full max-w-[230px]" />
                  <div className="mt-6 flex items-center gap-3">
                    <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-amber font-black text-ink">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-black leading-tight">{s.t}</h3>
                  </div>
                  <p className="mt-2 text-muted">{s.d}</p>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid gap-3 sm:grid-cols-3">
              {[
                ["bg-ok", "LAYAK", "Semua item baik"],
                ["bg-warn", "LAYAK DENGAN CATATAN", "Ada temuan di item tidak kritis"],
                ["bg-bad", "TIDAK LAYAK", "Ada temuan di item kritis"],
              ].map(([c, t, d]) => (
                <div key={t} className={`${c} rounded-2xl px-5 py-4 text-white`}>
                  <p className="font-black">{t}</p>
                  <p className="text-sm text-white/85">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FITUR */}
        <section id="fitur" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle eyebrow="Fitur" title="Dibuat oleh orang HSE, untuk kondisi lapangan." />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([t, d]) => (
                <div key={t} className="glass rounded-2xl p-5">
                  <h3 className="font-black text-amber">{t}</h3>
                  <p className="mt-2 text-sm text-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEMO VIDEO */}
        <section id="demo" className="border-y border-line bg-panel/40 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="Lihat langsung"
                title="40 detik. Dari isi P2H sampai rekap pengawas."
                sub="Operator menemukan rem bermasalah, aplikasi langsung menandai TIDAK LAYAK, lalu pengawas melihatnya di rekap."
              />
              <a
                href={buyLink("demo", plans[0].waMessage)}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-block rounded-2xl border-2 border-amber px-6 py-3 font-black text-amber hover:bg-amber hover:text-ink"
              >
                Coba demo gratis →
              </a>
            </div>
            <div className="mx-auto w-full max-w-[300px] rounded-[2.2rem] border border-line-strong bg-[#0b0b0b] p-2 shadow-2xl shadow-black/60">
              <video
                className="aspect-[9/16] w-full rounded-[1.7rem] bg-coal"
                src="/p2h/demo.mp4"
                poster="/p2h/v-hasil.png"
                controls
                playsInline
                preload="none"
              />
            </div>
          </div>
        </section>

        {/* HITUNG HARGA */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-amber">Hitung sendiri</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Rp49.000 itu sekali bayar. Bukan per bulan.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="glass rounded-2xl p-6">
                <p className="text-4xl font-black text-amber">±Rp134</p>
                <p className="mt-2 text-muted">per hari, kalau dipakai setahun saja</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-4xl font-black text-amber">Rp0</p>
                <p className="mt-2 text-muted">biaya server, hosting, dan langganan</p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-4xl font-black text-amber">∞</p>
                <p className="mt-2 text-muted">unit dan operator, untuk satu perusahaan</p>
              </div>
            </div>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-muted">
              Cukup pakai uang jajan. Tidak perlu ajukan anggaran, tidak perlu tunggu persetujuan.
            </p>
          </div>
        </section>

        {/* HARGA */}
        <section id="harga" className="glow border-y border-line bg-panel/40 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-amber">Harga</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Pilih paket, langsung pakai.</h2>
              <p className="mt-3 text-muted">Harga diskon perkenalan. Sekali bayar, berlaku seterusnya.</p>
            </div>

            <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
              {plans.map((p) => (
                <article
                  key={p.id}
                  className={`relative flex flex-col rounded-3xl p-7 ${
                    p.highlight
                      ? "glass !border-2 !border-amber shadow-2xl shadow-amber/10 lg:-mt-4 lg:pb-10"
                      : "glass"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute -top-3.5 left-7 rounded-full bg-amber px-3 py-1 text-xs font-black uppercase text-ink">
                      Paling direkomendasikan
                    </span>
                  )}
                  <span
                    className={`self-start rounded-md px-2 py-0.5 text-xs font-bold uppercase ${
                      p.id === "demo" ? "bg-panel-2 text-muted" : "bg-ok/20 text-good"
                    }`}
                  >
                    {p.badge}
                  </span>
                  <h3 className="mt-4 text-2xl font-black">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted">{p.tagline}</p>

                  <div className="mt-6 flex items-end gap-3">
                    <span className="text-4xl font-black text-amber">{p.price}</span>
                    {p.oldPrice && <span className="pb-1 text-dim line-through">{p.oldPrice}</span>}
                  </div>
                  {p.discount ? (
                    <p className="mt-1 text-sm font-semibold text-good">{p.discount} · sekali bayar</p>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-dim">Gratis</p>
                  )}

                  <ul className="mt-6 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm">
                        <Check /> <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={buyLink(p.id, p.waMessage)}
                    target="_blank"
                    rel="noopener"
                    className={`mt-8 block rounded-2xl px-5 py-4 text-center text-lg font-black ${
                      p.id === "demo"
                        ? "border-2 border-line-strong hover:border-amber"
                        : p.highlight
                          ? "bg-amber text-ink hover:bg-amber-dark"
                          : "bg-fg text-coal hover:bg-muted"
                    }`}
                  >
                    {p.cta}
                    {p.id !== "demo" && ` · ${p.price}`}
                  </a>
                </article>
              ))}
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-muted">
              Ragu pilih yang mana? Selisih Basic ke Pro cuma{" "}
              <b className="text-fg">Rp70.000</b>, dan Anda ditemani sampai aplikasinya jalan di lokasi.
            </p>
          </div>
        </section>

        {/* GARANSI */}
        <section className="py-16">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 md:grid-cols-3">
            {[
              ["Sekali bayar", "Tanpa langganan dan tanpa biaya bulanan. Bayar sekali, pakai seterusnya."],
              ["Dukungan 14 hari", `Bantuan pemasangan lewat WhatsApp ${site.whatsappLabel} selama 14 hari sejak pembelian.`],
              ["Data milik Anda", "Aplikasi berjalan di akun Google Anda. Kami tidak pernah meminta kata sandi."],
            ].map(([t, d]) => (
              <div key={t} className="glass rounded-2xl p-6">
                <p className="font-black">{t}</p>
                <p className="mt-2 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMING SOON */}
        <section className="border-y border-line bg-panel/40 py-20">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle
              eyebrow="Segera hadir"
              title="P2H baru permulaan."
              sub="FAYD sedang menyiapkan aplikasi lapangan lainnya dengan prinsip yang sama: murah, sekali bayar, data di akun Anda."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {upcoming.map((u) => (
                <div key={u.name} className="flex flex-col glass rounded-2xl !border-dashed p-6">
                  <span className="self-start rounded-md bg-panel-2 px-2 py-0.5 text-xs font-bold uppercase text-amber">
                    Coming soon
                  </span>
                  <h3 className="mt-4 text-lg font-black">{u.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{u.summary}</p>
                  <a
                    href={waLink(`Halo FAYD, kabari saya kalau ${u.name} sudah rilis.`)}
                    target="_blank"
                    rel="noopener"
                    className="mt-5 text-sm font-bold text-amber hover:underline"
                  >
                    Kabari saya saat rilis →
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-dim">
              Punya ide aplikasi untuk tim HSE Anda?{" "}
              <a
                href={waLink("Halo FAYD, saya punya usulan aplikasi: ")}
                target="_blank"
                rel="noopener"
                className="font-bold text-fg underline"
              >
                Usulkan lewat WhatsApp
              </a>
              .
            </p>
          </div>
        </section>

        {/* JASA KONSULTASI */}
        <section id="konsultasi" className="py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionTitle
                eyebrow="Jasa konsultasi"
                title="Butuh aplikasi HSE sesuai alur perusahaan Anda?"
                sub="Inspeksi, izin kerja, JSA, laporan insiden, atau form apa pun yang masih kertas. Kami bantu rancang dan buatkan aplikasinya."
              />
              <a
                href={waLink("Halo FAYD, saya mau konsultasi pembuatan aplikasi HSE untuk perusahaan saya.")}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-block rounded-2xl bg-amber px-7 py-4 text-lg font-black text-ink hover:bg-amber-dark"
              >
                Konsultasi via WhatsApp →
              </a>
            </div>
            <ol className="grid gap-4">
              {[
                ["Ceritakan kebutuhan", "Kirim form atau alur yang sekarang dipakai di lapangan."],
                ["Rancang bersama", "Kami susun alur aplikasi, item, dan laporan yang dibutuhkan pengawas."],
                ["Dibuat dan dipasang", "Aplikasi dibuat, dipasang di akun Anda, lalu tim Anda dipandu memakainya."],
              ].map(([t, d], i) => (
                <li key={t} className="glass flex gap-4 rounded-2xl p-5">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-amber font-black text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-black">{t}</h3>
                    <p className="mt-1 text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line py-20">
          <div className="mx-auto max-w-3xl px-4">
            <SectionTitle eyebrow="FAQ" title="Yang sering ditanyakan." />
            <div className="mt-10 glass divide-y divide-line rounded-2xl">
              {faqs.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                    {f.q}
                    <span aria-hidden className="text-2xl leading-none text-amber transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA AKHIR */}
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-amber text-ink">
            <div className="px-6 py-14 text-center sm:px-12">
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Besok pagi, P2H sudah di HP.</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg font-semibold text-ink/80">
                Pasang malam ini, sekitar 15 menit. Shift pagi operator langsung pakai.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={buyLink("pro", pro.waMessage)}
                  target="_blank"
                  rel="noopener"
                  className="rounded-2xl bg-ink px-7 py-4 text-lg font-black text-amber hover:bg-black"
                >
                  Beli Pro · {pro.price}
                </a>
                <a
                  href={buyLink("basic", basic.waMessage)}
                  target="_blank"
                  rel="noopener"
                  className="rounded-2xl border-2 border-ink px-7 py-4 text-lg font-black hover:bg-ink/10"
                >
                  Beli Basic · {basic.price}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line pb-28 pt-10 text-sm text-dim md:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 md:flex-row">
          <div>
            <p className="font-black text-fg">{site.brand}</p>
            <p>{site.slogan}</p>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <a href={waLink("Halo FAYD")} target="_blank" rel="noopener" className="hover:text-fg">
              WhatsApp {site.whatsappLabel}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-fg">{site.email}</a>
            {site.instagram && (
              <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener" className="hover:text-fg">
                Instagram @{site.instagram}
              </a>
            )}
            {site.tiktok && (
              <a href={`https://tiktok.com/@${site.tiktok}`} target="_blank" rel="noopener" className="hover:text-fg">
                TikTok @{site.tiktok}
              </a>
            )}
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-6xl px-4 text-xs">
          FAYD P2H Digital adalah alat bantu pencatatan dan tidak menggantikan pemeriksaan fisik, penilaian orang
          yang kompeten, atau prosedur keselamatan perusahaan.
        </p>
      </footer>

      {/* BAR BELI DI HP */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-coal/70 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1 leading-tight">
            <p className="text-xs text-dim">
              Mulai <span className="line-through">{basic.oldPrice}</span>
            </p>
            <p className="text-xl font-black text-amber">{basic.price}</p>
          </div>
          <a href="#harga" className="rounded-xl bg-amber px-5 py-3 font-black text-ink">
            Pilih paket
          </a>
        </div>
      </div>
    </>
  );
}
