"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/harian", label: "Harian" },
  { href: "/mingguan", label: "Mingguan" },
  { href: "/bulanan", label: "Bulanan" },
  { href: "/tahunan", label: "Tahunan" },
  { href: "/pengaturan", label: "Atur" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white">
      <ul className="mx-auto flex max-w-md">
        {ITEMS.map((it) => {
          const active = path.startsWith(it.href);
          return (
            <li key={it.href} className="flex-1">
              <Link
                href={it.href}
                className={`block py-3 text-center text-xs font-medium ${
                  active ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
