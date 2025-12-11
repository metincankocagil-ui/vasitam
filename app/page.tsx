// app/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SearchFilterForm from "@/components/search-filter-form";
import { absoluteUrl, DEFAULT_DESCRIPTION } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Vasıtan.com - Güncel vasıta ilanları",
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: absoluteUrl("/"),
    title: "Vasıtan.com - Güncel vasıta ilanları",
    description: DEFAULT_DESCRIPTION,
  },
};

const vehicleFilters = [
  {
    label: "Otomobil",
    value: "AUTOMOBILE",
    slug: "otomobil",
    description: "Şehir içi ve uzun yol",
    emoji: "🚗",
    gradient: "from-rose-500/70 via-orange-400/70 to-amber-300/70",
  },
  {
    label: "SUV",
    value: "SUV",
    slug: "suv",
    description: "Konfor & aile",
    emoji: "🚙",
    gradient: "from-emerald-500/70 via-teal-400/70 to-cyan-400/70",
  },
  {
    label: "Motosiklet",
    value: "MOTORCYCLE",
    slug: "motosiklet",
    description: "Şehir hızında",
    emoji: "🏍️",
    gradient: "from-purple-500/70 via-fuchsia-500/70 to-pink-500/70",
  },
  {
    label: "Ticari",
    value: "COMMERCIAL",
    slug: "ticari",
    description: "İşine güç kat",
    emoji: "🚐",
    gradient: "from-sky-500/70 via-blue-500/70 to-indigo-500/70",
  },
] as const;

const formatNumber = (value: number) => value.toLocaleString("tr-TR");

const showcaseCategoryGroups = [
  {
    label: "Vasıta",
    count: 799068,
    icon: "🚙",
    items: [
      { label: "Otomobil", count: 394118, href: "/kategori/otomobil" },
      { label: "Motosiklet", count: 56298, href: "/kategori/motosiklet" },
      { label: "SUV & Pickup", count: 104527, href: "/kategori/suv" },
      { label: "Elektrikli Araçlar", count: 8866, href: "/kategori/elektrikli-araclar" },
      { label: "Ağır Vasıta", count: 23217, href: "/kategori/agri-vasita" },
      { label: "Kiralık Araçlar", count: 11844, href: "/kategori/kiralik" },
    ],
  },
] as const;
const MAX_IMAGE_DATA_LENGTH = 800_000;

type HomePageProps = {
  searchParams: Promise<{ showcasePage?: string }>;
};

const SHOWCASE_PAGE_SIZE = 15;

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const [listings, totalListings] = await Promise.all([
    prisma.listing.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        vehicleType: true,
        listingType: true,
        city: true,
        district: true,
        brand: true,
        model: true,
        year: true,
        km: true,
        createdAt: true,
        ownerId: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
      take: 15,
    }),
    prisma.listing.count(),
  ]);

  const sellerCount = new Set(listings.map((listing) => listing.ownerId)).size;
  const stats = [
    { label: "Aktif ilan", value: formatNumber(totalListings) },
    { label: "Yeni eklenen", value: formatNumber(listings.length) },
    { label: "Güvenilir satıcı", value: formatNumber(Math.max(1, sellerCount)) },
  ];
  const totalShowcasePages = Math.max(1, Math.ceil(listings.length / SHOWCASE_PAGE_SIZE));
  const currentShowcasePage = Math.min(
    totalShowcasePages,
    Math.max(1, Number(resolvedSearchParams?.showcasePage) || 1),
  );
  const showcaseStartIndex = (currentShowcasePage - 1) * SHOWCASE_PAGE_SIZE;
  const showcaseListings = listings.slice(
    showcaseStartIndex,
    showcaseStartIndex + SHOWCASE_PAGE_SIZE,
  );
  const makeShowcaseHref = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(resolvedSearchParams ?? {}).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    params.set("showcasePage", String(page));
    const query = params.toString();
    return query ? `/?${query}` : "/";
  };

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-slate-200 bg-white/80 px-6 py-10 text-slate-900 shadow-sm">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-600">Türkiye&apos;nin vasıta merkezi</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Marka ve modele göre saniyeler içinde araç ara.
            </h1>
            <p className="text-sm text-slate-600 md:text-base">
              Tüm vasıta segmentlerinde güncel ilanlar, tek ekranda sade bir arama deneyimi.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/ilan-ver"
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                İlan oluştur
              </Link>
              <Link
                href="#listings"
                className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
              >
                Son ilanlar
              </Link>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                  <dt className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <SearchFilterForm />
        </div>
      </section>

      {showcaseListings.length > 0 && (
        <section className="space-y-5 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-4 rounded-3xl border border-slate-200 bg-slate-100/10 p-4 text-slate-800">
              {showcaseCategoryGroups.map((group) => (
                <div
                  key={group.label}
                  className="space-y-3 rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm shadow"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                    <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
                      <span>{group.icon}</span>
                      <span>{group.label}</span>
                    </div>
                    <span>{formatNumber(group.count)}</span>
                  </div>
                  <div className="grid gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        <span>{item.label}</span>
                        <span className="text-slate-500">{formatNumber(item.count)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </aside>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Ana sayfa vitrini</p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">Öne çıkan ilanlar</h2>
                </div>
                <Link
                  href="/kategoriler"
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Tüm vitrini gör →
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {showcaseListings.map((listing) => {
                  const coverImage = listing.images?.[0];
                  return (
                    <Link
                      key={listing.id}
                      href={`/ilan/${listing.id}`}
                      className="group space-y-2 rounded-2xl border border-slate-100 bg-white/90 p-3 text-xs text-slate-700 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                        {coverImage ? (
                          <div
                            className="h-full w-full bg-cover bg-center transition group-hover:scale-105"
                            style={{ backgroundImage: `url(${coverImage})` }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-2xl text-slate-400">
                            🚘
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="line-clamp-2 text-sm font-semibold text-slate-900">{listing.title}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {totalShowcasePages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-600">
                  <Link
                    href={
                      currentShowcasePage === 1
                        ? makeShowcaseHref(1)
                        : makeShowcaseHref(currentShowcasePage - 1)
                    }
                    className={`rounded-full border px-3 py-1 ${
                      currentShowcasePage === 1
                        ? "cursor-not-allowed border-slate-200 text-slate-300"
                        : "border-slate-300 hover:border-slate-400 hover:text-slate-900"
                    }`}
                    aria-disabled={currentShowcasePage === 1}
                  >
                    Önceki
                  </Link>
                  {Array.from({ length: totalShowcasePages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <Link
                        key={page}
                        href={makeShowcaseHref(page)}
                        className={`rounded-full px-3 py-1 ${
                          page === currentShowcasePage
                            ? "bg-slate-900 text-white"
                            : "border border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {page}
                      </Link>
                    );
                  })}
                  <Link
                    href={
                      currentShowcasePage === totalShowcasePages
                        ? makeShowcaseHref(totalShowcasePages)
                        : makeShowcaseHref(currentShowcasePage + 1)
                    }
                    className={`rounded-full border px-3 py-1 ${
                      currentShowcasePage === totalShowcasePages
                        ? "cursor-not-allowed border-slate-200 text-slate-300"
                        : "border-slate-300 hover:border-slate-400 hover:text-slate-900"
                    }`}
                    aria-disabled={currentShowcasePage === totalShowcasePages}
                  >
                    Sonraki
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Segment seç</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Popüler segmentler</h2>
          </div>
          <Link href="/kategoriler" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
            Tüm kategoriler →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {vehicleFilters.map((filter) => (
            <Link
              key={filter.value}
              href={`/kategori/${filter.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 text-slate-900 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${filter.gradient} opacity-30 transition group-hover:opacity-60`}
              />
              <div className="text-3xl">{filter.emoji}</div>
              <h3 className="mt-4 text-lg font-semibold">{filter.label}</h3>
              <p className="text-sm text-slate-600">{filter.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="listings" className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Gerçek zamanlı</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Son eklenen ilanlar</h2>
          </div>
          <Link
            href="/panel/ilanlarim"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
          >
            Panelime git
          </Link>
        </div>
        {listings.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
            Henüz ilan bulunmuyor. İlk ilanı sen ekle!
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => {
            const coverImage = listing.images?.[0];
            const isCoverImageTooLarge =
              typeof coverImage === "string" &&
              coverImage.startsWith("data:") &&
              coverImage.length > MAX_IMAGE_DATA_LENGTH;
            const listingBadge =
              listing.listingType === "FOR_RENT"
                ? "Kiralık"
                : listing.listingType === "DAILY_RENT"
                  ? "Günlük"
                  : "Satılık";
            return (
              <Link
                key={listing.id}
                href={`/ilan/${listing.id}`}
                className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-4 text-slate-900 shadow-[0_25px_60px_rgba(2,6,23,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(2,6,23,0.16)]"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
                  {coverImage && !isCoverImageTooLarge ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${coverImage})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl text-slate-400">
                      🚘
                    </div>
                  )}
                  {isCoverImageTooLarge && (
                    <div className="absolute inset-x-4 top-4 rounded-2xl border border-amber-200 bg-amber-50/90 px-3 py-2 text-xs font-semibold text-amber-700 shadow-sm">
                      Görsel boyutu çok büyük olduğu için gösterilemiyor.
                    </div>
                  )}
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                    <span>{listingBadge}</span>
                    <span>{listing.vehicleType ?? "Vasıta"}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 pt-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>
                      {listing.city}
                      {listing.district ? `, ${listing.district}` : ""}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{new Date(listing.createdAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 line-clamp-2">
                    {listing.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {listing.brand} {listing.model} • {listing.year} •{" "}
                    {listing.km.toLocaleString("tr-TR")} km
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-lg font-semibold text-slate-900">
                      {listing.price.toLocaleString("tr-TR")} TL
                    </div>
                    <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-600 transition group-hover:bg-slate-900/10">
                      İncele
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
