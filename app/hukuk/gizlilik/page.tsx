import Link from "next/link";

export default function GizlilikPage() {
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
          Gizlilik Politikası
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-400">
          Vasıtan, kullanıcı verilerini güvenli ve şeffaf biçimde işlemeyi
          temel prensip kabul eder. Bu sayfa, platformdaki veri yaklaşımımızın
          kısa özetidir.
        </p>

        <div className="mt-10 space-y-5">
          {[
            [
              "Toplanan Bilgiler",
              "Hesap, iletişim ve araç tercihleri gibi hizmet için gerekli temel bilgiler işlenir.",
            ],
            [
              "Kullanım Amacı",
              "Veriler deneyimi kişiselleştirmek, ilan süreçlerini iyileştirmek ve güvenliği artırmak için kullanılır.",
            ],
            [
              "Güvenlik",
              "Yetkisiz erişimi önlemek için teknik ve idari koruma önlemleri uygulanır.",
            ],
            [
              "Haklarınız",
              "Verilerinizle ilgili erişim, düzeltme ve silme taleplerinizi bize iletebilirsiniz.",
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
