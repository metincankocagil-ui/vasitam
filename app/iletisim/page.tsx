import Link from "next/link";

export default function IletisimPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto w-full max-w-6xl px-6 py-12 md:py-20">
        <Link
          href="/"
          className="mb-10 inline-flex text-2xl font-semibold tracking-tight text-white"
        >
          Vasıtan
        </Link>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              İletişim
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Sana yardımcı olmak için buradayız.
            </h1>
            <p className="mt-6 text-base leading-7 text-slate-400">
              Platform, iş birliği veya ilan süreçleri için bize kısa bir mesaj
              bırak.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">E-posta</p>
                <p className="mt-1 font-semibold text-white">
                  destek@vasitan.com
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Merkez</p>
                <p className="mt-1 font-semibold text-white">İstanbul</p>
              </div>
            </div>
          </div>

          <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="grid gap-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Ad Soyad
                </span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="Adın Soyadın"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  E-posta
                </span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="ornek@vasitan.com"
                  type="email"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-300">
                  Mesaj
                </span>
                <textarea
                  className="mt-2 min-h-36 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="Mesajını yaz"
                />
              </label>
            </div>
            <button
              className="mt-6 w-full rounded-2xl bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-200"
              type="button"
            >
              Mesaj Gönder
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
