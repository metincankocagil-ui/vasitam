import Link from "next/link";

export default function GirisPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid w-full min-w-0 gap-8 md:gap-10 lg:grid-cols-[1fr_440px] lg:items-center">
          <div>
            <Link
              href="/"
              className="mb-10 inline-flex text-2xl font-semibold tracking-tight text-white"
            >
              Vasıtan
            </Link>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Güvenli erişim
            </p>
            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-6xl">
              Garajına ve akıllı araç verilerine devam et.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400">
              Favori ilanlar, AI analizleri ve kayıtlı aramalar tek panelde.
            </p>
          </div>

          <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white">Giriş Yap</h2>
              <p className="mt-2 text-sm text-slate-400">
                E-posta ve şifrenle hesabına gir.
              </p>
            </div>

            <form className="space-y-5">
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
                  Şifre
                </span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-300"
                  placeholder="Şifren"
                  type="password"
                />
              </label>

              <button
                className="w-full rounded-2xl bg-sky-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-200"
                type="button"
              >
                Giriş Yap
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Hesabın yok mu?{" "}
              <Link className="font-semibold text-sky-300" href="/kayit">
                Kayıt Ol
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
