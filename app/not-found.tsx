import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">404</p>
        <h1 className="text-4xl font-semibold text-slate-900">Sayfa bulunamadı</h1>
        <p className="max-w-xl text-sm text-slate-600">
          Aradığınız sayfa artık yayında olmayabilir veya adres yanlış girilmiş olabilir. Markanıza ve modelinize uygun ilanları yeniden keşfedelim.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
        <Link
          href="/"
          className="rounded-full border border-slate-200 px-6 py-3 text-slate-700 transition hover:border-slate-300 hover:bg-white"
        >
          Anasayfa
        </Link>
        <Link
          href="/ilan-ver"
          className="rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
        >
          İlan Ver
        </Link>
      </div>
      <div className="grid gap-4 text-sm text-slate-500 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-indigo-500">Marka / model ara</p>
          <p className="mt-1 text-slate-700">Aradığın kriterleri baştan seçerek hızlıca ilan bul.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-indigo-500">Kaydedilen aramalar</p>
          <p className="mt-1 text-slate-700">Yeni ilan eklendiğinde bildirim almak için kaydet.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-indigo-500">Destek</p>
          <p className="mt-1 text-slate-700">
            Yardıma mı ihtiyacın var?{" "}
            <Link href="mailto:support@vasitan.com" className="text-indigo-600 underline">
              support@vasitan.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
