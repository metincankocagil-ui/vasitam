// app/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const vehicleFilters = [
  {
    label: "Otomobil",
    value: "AUTOMOBILE",
    description: "Şehir içi ve uzun yol",
    emoji: "🚗",
    gradient: "from-rose-500/70 via-orange-400/70 to-amber-300/70",
  },
  {
    label: "SUV",
    value: "SUV",
    description: "Konfor & aile",
    emoji: "🚙",
    gradient: "from-emerald-500/70 via-teal-400/70 to-cyan-400/70",
  },
  {
    label: "Motosiklet",
    value: "MOTORCYCLE",
    description: "Şehir hızında",
    emoji: "🏍️",
    gradient: "from-purple-500/70 via-fuchsia-500/70 to-pink-500/70",
  },
  {
    label: "Ticari",
    value: "COMMERCIAL",
    description: "İşine güç kat",
    emoji: "🚐",
    gradient: "from-sky-500/70 via-blue-500/70 to-indigo-500/70",
  },
] as const;

const formatNumber = (value: number) => value.toLocaleString("tr-TR");

export default async function HomePage() {
  const [listings, totalListings] = await Promise.all([
    prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      take: 12,
      include: { owner: true },
    }),
    prisma.listing.count(),
  ]);

  const sellerCount = new Set(listings.map((listing) => listing.ownerId)).size;
  const stats = [
    { label: "Aktif ilan", value: formatNumber(totalListings) },
    { label: "Yeni eklenen", value: formatNumber(listings.length) },
    { label: "Güvenilir satıcı", value: formatNumber(Math.max(1, sellerCount)) },
  ];
  const heroSpotlight = listings.slice(0, 2);

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 px-8 py-12 text-slate-900 shadow-[0_35px_80px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute -left-10 top-0 h-64 w-64 rounded-full bg-indigo-100 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-sky-100 blur-3xl" />
        </div>
        <div className="relative z-10 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Türkiye&apos;nin vasıta merkezi
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Modern ve güvenli arayüzle aracını keşfet, kirala ya da sat.
            </h1>
            <p className="max-w-2xl text-base text-slate-600 md:text-lg">
              Tüm segmentlerde güncel ilanlar, canlı filtreleme ve doğrulanmış satıcı profilleri.
              Yeni nesil deneyimle dakikalar içinde aracını bul.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/ilan-ver"
                className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                İlan Oluştur
              </Link>
              <Link
                href="#listings"
                className="rounded-full border border-slate-200 px-6 py-3 text-slate-700 transition hover:bg-white"
              >
                Son İlanlar
              </Link>
            </div>
            <dl className="grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                  <dt className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
              Spotlight
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              En yeni vitrin ilanları
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Her gün güncellenen editör seçimleriyle ilham al.
            </p>
            <div className="mt-6 space-y-4">
              {heroSpotlight.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/ilan/${listing.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                    🚘
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{listing.title}</p>
                    <p className="text-xs text-slate-500">
                      {listing.city}
                      {listing.district ? `, ${listing.district}` : ""} • {listing.brand} {listing.model}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    {listing.price.toLocaleString("tr-TR")} TL
                  </span>
                </Link>
              ))}
              {heroSpotlight.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
                  Vitrinde gösterilecek ilan bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 grid gap-6 lg:grid-cols-[1.8fr,1fr]">
        <form
          action="/arama"
          method="GET"
          className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-xl"
        >
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-500">
              Anahtar kelime
            </label>
            <input
              type="text"
              name="q"
              placeholder="Marka, model veya özellik ara"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500">
                Vasıta tipi
              </label>
              <select
                name="vehicleType"
                className="mt-2 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-400 focus:outline-none"
              >
                <option value="">Tümü</option>
                <option value="AUTOMOBILE">Otomobil</option>
                <option value="MOTORCYCLE">Motosiklet</option>
                <option value="SUV">SUV</option>
                <option value="COMMERCIAL">Ticari</option>
                <option value="TRUCK">Kamyon</option>
                <option value="BUS">Otobüs</option>
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500">
                Şehir
              </label>
              <input
                type="text"
                name="city"
                placeholder="İstanbul, Ankara..."
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-500">
                Maksimum bütçe (TL)
              </label>
              <input
                type="number"
                name="maxPrice"
                placeholder="Örn. 1.200.000"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110"
          >
            Akıllı aramayla bul
          </button>
          <p className="text-xs text-slate-500">
            Aramalarını kaydedip yeni ilan bildirimleri alabilirsin.
          </p>
        </form>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700 shadow-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Günün modu</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">Hibrit & elektrikli trendi</h3>
          <p className="mt-2 text-sm text-slate-500">
            Düşük yakıt tüketimi ve sürdürülebilir sürüş için seçilmiş hibrit ve elektrikli modeller.
          </p>
          <ul className="mt-5 space-y-3">
            <li className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <span className="text-lg">⚡️</span>
              <div>
                <p className="text-sm font-semibold">Şehir içi %45 tasarruf</p>
                <p className="text-xs text-slate-500">Anlık karşılaştırma tabloları</p>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
              <span className="text-lg">🌱</span>
              <div>
                <p className="text-sm font-semibold">0 emisyon kampanyaları</p>
                <p className="text-xs text-slate-500">Yetkili satıcılardan özel teklifler</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Segment seç</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Popüler segmentler</h2>
          </div>
          <Link href="/arama" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
            Tüm kategoriler →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {vehicleFilters.map((filter) => (
            <Link
              key={filter.value}
              href={`/arama?vehicleType=${filter.value}`}
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
                  {coverImage ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${coverImage})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl text-slate-400">
                      🚘
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
