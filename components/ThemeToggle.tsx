"use client";

import { useEffect, useState } from "react";

type Tema = "malam" | "siang";

// Tombol ganti mode malam / siang. Pilihan disimpan di browser pengunjung.
export function ThemeToggle() {
  const [tema, setTema] = useState<Tema>("malam");

  useEffect(() => {
    setTema(document.documentElement.dataset.tema === "siang" ? "siang" : "malam");
  }, []);

  function ganti() {
    const baru: Tema = tema === "siang" ? "malam" : "siang";
    setTema(baru);
    if (baru === "siang") document.documentElement.dataset.tema = "siang";
    else delete document.documentElement.dataset.tema;
    try {
      localStorage.setItem("tema", baru);
    } catch {}
  }

  const siang = tema === "siang";
  return (
    <button
      type="button"
      onClick={ganti}
      aria-label={siang ? "Ganti ke mode malam" : "Ganti ke mode siang"}
      title={siang ? "Mode malam" : "Mode siang"}
      className="glass grid h-10 w-10 place-items-center rounded-xl text-fg hover:text-amber"
    >
      {siang ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a8.5 8.5 0 1 0 11.5 11.5z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
