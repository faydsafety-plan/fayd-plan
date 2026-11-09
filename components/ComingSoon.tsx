import BottomNav from "./BottomNav";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <main className="px-4 pb-24 pt-6">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-500 shadow-sm">
        Menu ini dibuat di versi 2.
      </p>
      <BottomNav />
    </main>
  );
}
