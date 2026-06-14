import Link from "next/link";

export default function HakkimizdaPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto w-full max-w-5xl px-6 py-12 md:py-24">
        <Link
          href="/"
          className="mb-14 inline-flex text-2xl font-semibold tracking-tight text-white"
        >
          Vasıtan
        </Link>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
          Hakkımızda
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Araç alım satımını veri, güven ve yalın deneyimle yeniden tasarlıyoruz.
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-400">
          Vasıtan, modern araç pazarında doğru kararı hızlandıran AI destekli
          bir mobilite platformudur. İlan, piyasa verisi, kronik sorun bilgisi
          ve kullanıcı deneyimini tek akıllı ekosistemde birleştirir.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            ["Veri Odaklı", "Piyasa sinyallerini sade ve anlaşılır sunar."],
            ["Güvenli", "Karar öncesi riskleri görünür hale getirir."],
            ["Premium", "Karmaşık süreçleri temiz bir arayüze indirger."],
          ].map(([title, text]) => (
            <div
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              key={title}
            >
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
