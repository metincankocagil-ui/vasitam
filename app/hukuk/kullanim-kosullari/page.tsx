import Link from "next/link";

export default function KullanimKosullariPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <article className="mx-auto w-full max-w-4xl px-6 py-12 md:py-24">
        <Link
          href="/"
          className="mb-14 inline-flex text-2xl font-semibold tracking-tight text-white"
        >
          Vasıtan
        </Link>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
          Hukuk
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Kullanım Koşulları
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-400">
          Vasıtan platformunu kullanarak güvenli, doğru ve saygılı kullanıma
          ilişkin temel koşulları kabul etmiş olursun.
        </p>

        <div className="mt-10 space-y-5">
          {[
            [
              "Hizmet Kapsamı",
              "Platform araç keşfi, ilan görüntüleme ve karar destek deneyimi sunar.",
            ],
            [
              "Kullanıcı Sorumluluğu",
              "Paylaşılan bilgilerin doğru, güncel ve hukuka uygun olması kullanıcının sorumluluğundadır.",
            ],
            [
              "İçerik ve İlanlar",
              "Yanıltıcı, eksik veya üçüncü kişilerin haklarını ihlal eden içerikler yayınlanamaz.",
            ],
            [
              "Değişiklikler",
              "Koşullar, ürün ve yasal gerekliliklere göre güncellenebilir.",
            ],
          ].map(([title, text]) => (
            <section
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              key={title}
            >
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
