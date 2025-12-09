import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Vasıtan.com",
  description: "Vasıtan.com hizmetlerinden yararlanırken geçerli kullanım koşullarını inceleyin.",
  alternates: {
    canonical: "/hukuk/kullanim-kosullari",
  },
  openGraph: {
    url: absoluteUrl("/hukuk/kullanim-kosullari"),
    title: "Kullanım Koşulları | Vasıtan.com",
    description: "Vasıtan.com hizmetlerinden yararlanırken geçerli kullanım koşullarını inceleyin.",
  },
};

const sections = [
  {
    title: "Genel",
    body:
      "Vasıtan.com, kullanıcıların vasıta ilanlarını yayınlayabildiği ve diğer ilanları görüntüleyebildiği bir dijital pazaryeridir. Platformu kullanarak bu koşulları kabul etmiş olursunuz.",
  },
  {
    title: "Üyelik",
    body:
      "Üyelik oluştururken paylaştığınız bilgilerin doğru ve güncel olmasından sorumlusunuz. Hesap güvenliği için şifrenizi üçüncü kişilerle paylaşmayınız.",
  },
  {
    title: "İlan Yayınlama",
    body:
      "Yayınlanan ilanların tüm hukuki sorumluluğu ilanın sahibine aittir. Yanıltıcı bilgi veya görsel kullanımı tespit edildiğinde ilan kaldırılabilir.",
  },
  {
    title: "Sorumluluk Reddi",
    body:
      "Platform, kullanıcılar arasında doğabilecek anlaşmazlıklardan sorumlu değildir. Ancak topluluk kurallarının ihlali durumunda destek ekibi devreye girer.",
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Hukuk</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Kullanım Koşulları</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Vasıtan.com platformunu kullanırken uyulması gereken şartları bu sayfada bulabilirsiniz.
        </p>
      </section>

      <section className="space-y-4">
        {sections.map((section) => (
          <article key={section.title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{section.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
