import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-300">
          404
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Sayfa bulunamadı
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
          Aradığın sayfa taşınmış veya artık yayında olmayabilir. Ana sayfadan
          devam edebilir ya da araç aramasına dönebilirsin.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            className="rounded-full bg-sky-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-200"
            href="/"
          >
            Ana Sayfa
          </Link>
          <Link
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            href="/ara"
          >
            İlanları Gör
          </Link>
        </div>
      </section>
    </main>
  );
}
