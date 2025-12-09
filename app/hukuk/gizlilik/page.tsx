import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Vasıtan.com",
  description: "Vasıtan.com kullanıcı bilgilerinin nasıl korunduğunu ve işlendiğini öğrenin.",
  alternates: {
    canonical: "/hukuk/gizlilik",
  },
  openGraph: {
    url: absoluteUrl("/hukuk/gizlilik"),
    title: "Gizlilik Politikası | Vasıtan.com",
    description: "Vasıtan.com kullanıcı bilgilerinin nasıl korunduğunu ve işlendiğini öğrenin.",
  },
};

const policies = [
  {
    title: "Veri Toplama",
    body:
      "Kayıt, ilan yayınlama ve destek süreçlerinde paylaştığınız temel iletişim bilgilerini, güvenlik amacıyla IP adreslerini toplarız.",
  },
  {
    title: "Veri Kullanımı",
    body:
      "Toplanan veriler, ilan deneyimini iyileştirmek, sahteciliği önlemek ve kullanıcıya özel bildirimler göndermek için kullanılır.",
  },
  {
    title: "Veri Saklama",
    body:
      "Hesabınızı silme talebinde bulunduğunuzda verileriniz yasal zorunluluklar dışında sistemden kaldırılır. Yedekler belirli periyotlarda imha edilir.",
  },
  {
    title: "Çerezler",
    body:
      "Site performansını ölçmek ve kişiselleştirilmiş içerik sunmak için çerezler kullanılır. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Hukuk</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Gizlilik Politikası</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Kişisel verilerinizi nasıl topladığımız, sakladığımız ve koruduğumuz hakkında detaylı bilgi.
        </p>
      </section>

      <section className="space-y-4">
        {policies.map((policy) => (
          <article key={policy.title} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{policy.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{policy.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
