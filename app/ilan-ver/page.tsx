import Link from "next/link";

export default function IlanVerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-20">
        <Link
          href="/"
          className="mb-10 inline-flex text-2xl font-semibold tracking-tight text-white"
        >
          Vasıtan
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              İlan Ver
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Yakında gelişmiş ilan oluşturma sistemi aktif olacak.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Şimdilik temel bilgileri hazırlayabilirsin. Detaylı fotoğraf,
              ekspertiz ve AI fiyat analizi sonraki aşamada eklenecek.
            </p>
          </div>

          <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-slate-300">
                  İlan Başlığı
                </span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="Örn. Temiz aile SUV'u"
                  type="text"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Marka
                </span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="BMW"
                  type="text"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Model
                </span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="320i"
                  type="text"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">Yıl</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="2022"
                  type="number"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Fiyat
                </span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="₺"
                  type="text"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-medium text-slate-300">
                  Açıklama
                </span>
                <textarea
                  className="mt-2 min-h-32 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="Aracın öne çıkan özellikleri"
                />
              </label>
            </div>

            <button
              className="mt-6 w-full rounded-2xl bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-200"
              type="button"
            >
              Taslak Oluştur
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
