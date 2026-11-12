import { products } from "@/lib/products";
import { site, waLink } from "@/lib/site";

const steps = [
  { title: "Konsultasi", body: "Ceritakan kebutuhan Anda lewat WhatsApp. Gratis." },
  { title: "Demo", body: "Kami tunjukkan aplikasinya dengan contoh data yang mirip pekerjaan Anda." },
  { title: "Pemasangan", body: "Aplikasi dipasang dengan nama dan data perusahaan Anda." },
  { title: "Pendampingan", body: "Tim Anda diajari memakai aplikasinya sampai lancar." },
];

const faqs = [
  {
    q: "Apakah perlu install di komputer?",
    a: "Tidak. Aplikasi berjalan di browser, bisa dibuka dari HP maupun laptop.",
  },
  {
    q: "Data kami disimpan di mana?",
    a: "Setiap pelanggan punya database sendiri. Data Anda tidak tercampur dengan pelanggan lain.",
  },
  {
    q: "Bisa minta fitur tambahan?",
    a: "Bisa. Sampaikan saat konsultasi, nanti kami hitung waktu dan biayanya.",
  },
  {
    q: "Bagaimana cara bayarnya?",
    a: "Detail pembayaran dikirim lewat WhatsApp setelah demo dan kesepakatan.",
  },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="text-lg font-bold tracking-tight">
            {site.name}
          </a>
          <nav className="hidden gap-6 text-sm text-muted sm:flex">
            <a href="#aplikasi" className="hover:text-ink">Aplikasi</a>
            <a href="#cara" className="hover:text-ink">Cara pesan</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
          </nav>
          <a
            href={waLink("Halo, saya ingin konsultasi aplikasi.")}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Hubungi
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-24">
          <p className="text-sm font-semibold text-brand">{site.tagline}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Berhenti mengurus laporan di spreadsheet dan grup chat.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{site.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={waLink("Halo, saya ingin minta demo aplikasi.")}
              className="rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
            >
              Minta demo gratis
            </a>
            <a
              href="#aplikasi"
              className="rounded-lg border border-line px-5 py-3 font-semibold hover:bg-soft"
            >
              Lihat aplikasi
            </a>
          </div>
        </section>

        <section id="aplikasi" className="border-t border-line bg-soft py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold tracking-tight">Aplikasi</h2>
            <p className="mt-2 text-muted">Pilih yang sesuai pekerjaan Anda. Bisa beli satu atau beberapa.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {products.map((p) => (
                <article
                  key={p.slug}
                  id={p.slug}
                  className={`flex flex-col rounded-2xl border bg-paper p-6 ${
                    p.featured ? "border-brand ring-1 ring-brand" : "border-line"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    {p.featured && (
                      <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                        Paling diminati
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-muted">{p.summary}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span aria-hidden className="text-brand">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <p className="text-lg font-bold">{p.price}</p>
                    {p.priceNote && <p className="text-xs text-muted">{p.priceNote}</p>}
                    <a
                      href={waLink(`Halo, saya tertarik dengan aplikasi ${p.name}.`)}
                      className="mt-4 inline-block w-full rounded-lg bg-ink px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-ink/85"
                    >
                      Tanya {p.name}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cara" className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold tracking-tight">Cara pesan</h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-line p-6">
                  <span className="text-sm font-semibold text-brand">Langkah {i + 1}</span>
                  <h3 className="mt-2 font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="border-t border-line bg-soft py-20">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-bold tracking-tight">Pertanyaan umum</h2>
            <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-paper">
              {faqs.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                    {f.q}
                    <span aria-hidden className="text-muted transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-3xl bg-brand px-6 py-12 text-center text-white sm:px-12">
              <h2 className="text-3xl font-bold tracking-tight">Siap mencoba?</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/85">
                Kirim pesan sekarang, kami jadwalkan demo sesuai waktu Anda.
              </p>
              <a
                href={waLink("Halo, saya ingin jadwalkan demo aplikasi.")}
                className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand hover:bg-white/90"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4">
          <span>© {new Date().getFullYear()} {site.name}. {site.city}.</span>
          {site.email && <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>}
        </div>
      </footer>
    </>
  );
}
