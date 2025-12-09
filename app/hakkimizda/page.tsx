import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hakkımızda | Vasıtan.com",
  description:
    "Vasıtan.com, sadece vasıta ilanlarına odaklanan modern pazar yeridir. Misyonumuz ve değerlerimizi keşfedin.",
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    url: absoluteUrl("/hakkimizda"),
    title: "Hakkımızda | Vasıtan.com",
    description:
      "Vasıtan.com, sadece vasıta ilanlarına odaklanan modern pazar yeridir. Misyonumuz ve değerlerimizi keşfedin.",
  },
};

const highlights = [
  {
    title: "Vizyonumuz",
    description:
      "Vasıta alım satımını güvenilir, şeffaf ve herkes için erişilebilir hale getirmek.",
  },
  {
    title: "Misyonumuz",
    description:
      "Marka ve modele göre zengin filtreler sunarak doğru aracı dakikalar içinde bulmanı sağlamak.",
  },
  {
    title: "Güven Yaklaşımımız",
    description:
      "İlan doğrulamaları, kullanıcı yorumları ve şeffaf iletişimle güvenli bir pazar yeri inşa ediyoruz.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Hakkımızda</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Sadece vasıta için tasarlandı</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Vasıtan.com, otomobil, SUV, motosiklet ve ticari araç ilanlarını tek çatı altında
          toplayan yeni nesil bir pazar yeridir. İlan verirken kullanılan formlarımız, kullanıcı
          panelimiz ve arama deneyimimiz tamamen vasıta dünyasının ihtiyaçlarına göre tasarlandı.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Ekibimiz</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Yazılım, ürün ve müşteri destek ekiplerimiz İstanbul ve Ankara ofislerinden çalışıyor.
          İlan doğrulama ve kullanıcı iletişimi için 7/24 destek sunuyoruz.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-slate-200 px-4 py-1 text-slate-600">Ürün & Tasarım</span>
          <span className="rounded-full border border-slate-200 px-4 py-1 text-slate-600">Teknoloji</span>
          <span className="rounded-full border border-slate-200 px-4 py-1 text-slate-600">Operasyon</span>
          <span className="rounded-full border border-slate-200 px-4 py-1 text-slate-600">Destek</span>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Bizimle iletişime geç</h2>
        <p className="mt-2 text-sm text-slate-600">
          Iş ortaklığı ve medya talepleri için{" "}
          <Link className="text-indigo-600 hover:underline" href="/iletisim">
            iletişim sayfamızı
          </Link>{" "}
          ziyaret edebilirsiniz.
        </p>
      </section>
    </div>
  );
}
