import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { VEHICLE_CATEGORIES } from "@/lib/categories";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Araç kategorileri | Vasıtan.com",
  description:
    "Otomobil, SUV, motosiklet ve ticari araç kategorilerinde yayınlanan ilanları keşfedin, segment bazlı filtrelerle kolayca aradığınızı bulun.",
  alternates: {
    canonical: "/kategoriler",
  },
  openGraph: {
    url: absoluteUrl("/kategoriler"),
    title: "Araç kategorileri | Vasıtan.com",
    description:
      "Otomobil, SUV, motosiklet ve ticari araç kategorilerinde yayınlanan ilanları keşfedin, segment bazlı filtrelerle kolayca aradığınızı bulun.",
  },
};

async function getCategoryData() {
  const countsPromise = prisma.listing.groupBy({
    by: ["vehicleType"],
    _count: { _all: true },
  });

  const listingsPromise = Promise.all(
    Object.entries(VEHICLE_CATEGORIES).map(async ([key, meta]) => {
      const listings = await prisma.listing.findMany({
        select: {
          id: true,
          title: true,
          price: true,
          city: true,
          district: true,
          createdAt: true,
        },
        where: { vehicleType: key as any },
        orderBy: { createdAt: "desc" },
        take: 3,
      });
      return { key, meta, listings };
    }),
  );

  const [counts, categories] = await Promise.all([countsPromise, listingsPromise]);
  const countMap = counts.reduce<Record<string, number>>((acc, item) => {
    acc[item.vehicleType] = item._count._all;
    return acc;
  }, {});

  return categories.map((category) => ({
    ...category,
    count: countMap[category.key] ?? 0,
  }));
}

export default async function CategoriesPage() {
  const categories = await getCategoryData();

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Kategoriler</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">İlanlar kategorilere ayrıldı</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Araç tipine göre düzenlenen sayfalarla markanıza uygun ilanlara tek tıkla ulaşın. Her kategori
          için öne çıkan ilanları ve toplam ilan sayısını görebilirsiniz.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {categories.map(({ key, meta, count, listings }) => (
          <div
            key={key}
            className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${meta.gradient} px-3 py-1 text-xs font-semibold text-white`}>
                  <span>{meta.icon}</span>
                  <span>{meta.label}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{meta.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">İlan</p>
                <p className="text-3xl font-semibold text-slate-900">{count}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {listings.length === 0 && (
                <div className="sm:col-span-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-500">
                  Bu kategoride henüz ilan yok.
                </div>
              )}
              {listings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/ilan/${listing.id}`}
                  className="flex flex-col rounded-2xl border border-slate-100 bg-white/80 p-3 text-sm text-slate-700 shadow hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-xs text-slate-500">
                    {listing.city}
                    {listing.district ? `, ${listing.district}` : ""}
                  </span>
                  <span className="mt-1 line-clamp-2 font-semibold text-slate-900">
                    {listing.title}
                  </span>
                  <span className="mt-auto text-base font-semibold text-indigo-600">
                    {listing.price.toLocaleString("tr-TR")} TL
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Son {listings.length} ilan görüntüleniyor.
              </p>
              <Link
                href={`/kategori/${meta.slug}`}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Kategorideki tüm ilanlar →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
