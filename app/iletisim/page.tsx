import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "İletişim | Vasıtan.com",
  description:
    "Vasıtan.com destek ekibiyle iletişime geçin. Destek, iş birliği ve basın talepleriniz için iletişim bilgileri.",
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    url: absoluteUrl("/iletisim"),
    title: "İletişim | Vasıtan.com",
    description:
      "Vasıtan.com destek ekibiyle iletişime geçin. Destek, iş birliği ve basın talepleriniz için iletişim bilgileri.",
  },
};

const contacts = [
  {
    label: "Destek",
    email: "destek@vasitan.com",
    description: "İlanlarınız ve üyelik işlemleriniz için bize yazın.",
  },
  {
    label: "İş Ortaklığı",
    email: "partner@vasitan.com",
    description: "Kurumsal iş birlikleri ve API entegrasyonları için iletişime geçin.",
  },
  {
    label: "Basın",
    email: "press@vasitan.com",
    description: "Medya kitleri ve röportaj talepleriniz için bize ulaşın.",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">İletişim</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">7/24 yanınızdayız</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Destek ekibimiz, ilan doğrulama ve kullanıcı deneyimi için haftanın her günü hizmetinizde.
          Size en uygun iletişim kanalını seçin.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {contacts.map((contact) => (
          <div key={contact.email} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-indigo-500">{contact.label}</p>
            <a href={`mailto:${contact.email}`} className="mt-3 block text-lg font-semibold text-slate-900 hover:text-indigo-600">
              {contact.email}
            </a>
            <p className="mt-2 text-sm text-slate-600">{contact.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Ofislerimiz</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">İstanbul</p>
            <p>Maslak Mah. Büyükdere Cad. No:12</p>
            <p>+90 212 000 00 00</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Ankara</p>
            <p>Gürsel Mah. Güçbirliği Sok. No:4</p>
            <p>+90 312 000 00 00</p>
          </div>
        </div>
      </section>
    </div>
  );
}
