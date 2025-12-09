// app/ilan/[id]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 60;

const vehicleLabels: Record<string, string> = {
  AUTOMOBILE: "Otomobil",
  MOTORCYCLE: "Motosiklet",
  SUV: "SUV",
  COMMERCIAL: "Ticari",
  TRUCK: "Kamyon",
  BUS: "Otobüs",
  OTHER: "Diğer",
};
const fuelLabels: Record<string, string> = {
  GASOLINE: "Benzin",
  DIESEL: "Dizel",
  LPG: "LPG",
  HYBRID: "Hibrit",
  ELECTRIC: "Elektrik",
  OTHER: "Diğer",
};
const gearLabels: Record<string, string> = {
  MANUAL: "Manuel",
  AUTOMATIC: "Otomatik",
  SEMI_AUTOMATIC: "Yarı Otomatik",
};
const listingTypeLabels: Record<string, string> = {
  FOR_SALE: "Satılık",
  FOR_RENT: "Kiralık",
  DAILY_RENT: "Günlük Kiralık",
};

type ListingPageProps = { params: Promise<{ id: string }> };

async function getListing(params: Promise<{ id: string }>) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    notFound();
  }
  const listing = await prisma.listing.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      listingType: true,
      vehicleType: true,
      brand: true,
      model: true,
      year: true,
      fuelType: true,
      gearType: true,
      km: true,
      color: true,
      isDamaged: true,
      city: true,
      district: true,
      images: true,
      createdAt: true,
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  if (!listing) {
    notFound();
  }
  return listing;
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const listing = await getListing(params);
  const title = `${listing.brand} ${listing.model} ${listing.year} ilanı | Vasıtan.com`;
  const description = `${listing.title} - ${listing.city}${listing.district ? `, ${listing.district}` : ""}. ${listing.price.toLocaleString("tr-TR")} TL, ${listing.km.toLocaleString("tr-TR")} km, ${listing.fuelType} ${listing.gearType}.`;
  const url = absoluteUrl(`/ilan/${listing.id}`);
  const image = listing.images[0]?.startsWith("http")
    ? listing.images[0]
    : absoluteUrl("/og-image.jpg");
  return {
    title,
    description,
    alternates: {
      canonical: `/ilan/${listing.id}`,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const listing = await getListing(params);

  const createdAt = new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(listing.createdAt);
  const coverImage = listing.images[0] ?? "";
  const gallery = listing.images.slice(1, 4);

  const specs = [
    { label: "Vasıta Tipi", value: vehicleLabels[listing.vehicleType] ?? listing.vehicleType },
    { label: "Marka", value: listing.brand },
    { label: "Model", value: listing.model },
    { label: "Yıl", value: listing.year.toString() },
    { label: "Yakıt", value: fuelLabels[listing.fuelType] ?? listing.fuelType },
    { label: "Vites", value: gearLabels[listing.gearType] ?? listing.gearType },
    { label: "Km", value: listing.km.toLocaleString("tr-TR") },
    { label: "Renk", value: listing.color ?? "-" },
    { label: "Hasar Kaydı", value: listing.isDamaged ? "Var" : "Yok / Bilinmiyor" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
          ← İlanlara Dön
        </Link>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
          {listingTypeLabels[listing.listingType] ?? "İlan"}
        </span>
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 md:col-span-3">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={listing.title}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center text-5xl text-slate-400">
                  🚘
                </div>
              )}
              <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                Vitrin
              </div>
            </div>
            <div className="grid gap-4 md:col-span-2">
              {gallery.length === 0 && (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-400">
                  Ek görsel eklenmemiş
                </div>
              )}
              {gallery.map((image, index) => (
                <div key={image + index} className="overflow-hidden rounded-2xl bg-slate-100">
                  <img src={image} alt={`Galerideki görsel ${index + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-slate-900">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span>
                {listing.city}
                {listing.district ? `, ${listing.district}` : ""}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{createdAt} tarihinde eklendi</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Fiyat</p>
            <div className="text-4xl font-bold text-slate-900">
              {listing.price.toLocaleString("tr-TR")} TL
            </div>
            <p className="text-xs text-slate-500">
              {listing.listingType === "FOR_RENT"
                ? "Aylık ücret"
                : listing.listingType === "DAILY_RENT"
                  ? "Günlük ücret"
                  : "Satış fiyatı"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <h2 className="text-sm font-semibold text-slate-600">İlan Sahibi</h2>
            <p className="mt-2 text-base font-semibold text-slate-900">
              {listing.owner?.name ?? "İlan Sahibi"}
            </p>
            <p className="text-sm text-slate-500">{listing.owner?.email ?? "E-posta paylaşılmamış"}</p>
            <p className="mt-3 text-xs text-slate-400">
              Güvenli iletişim için platform üzerinden mesaj gönderin.
            </p>
          </div>
          <button
            type="button"
            className="w-full rounded-full bg-indigo-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-indigo-500"
          >
            Satıcıyla İletişime Geç
          </button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900">Teknik Özellikler</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm text-slate-600"
              >
                <dt className="text-xs uppercase tracking-wide text-slate-400">{spec.label}</dt>
                <dd className="text-base font-semibold text-slate-900">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900">Konum</h2>
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            {listing.city}
            {listing.district ? `, ${listing.district}` : ""} bölgesinde yer alıyor.
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Sürüşe hazır teslimat için satıcıyla iletişime geçin.
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg">
        <h2 className="text-xl font-semibold text-slate-900">Açıklama</h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {listing.description}
        </p>
      </section>
    </div>
  );
}
