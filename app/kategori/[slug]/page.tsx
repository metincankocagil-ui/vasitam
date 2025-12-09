import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo";
import { findCategoryBySlug, VEHICLE_CATEGORIES } from "@/lib/categories";

export const revalidate = 120;

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

async function getCategoryFromParams(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);
  if (!category) {
    notFound();
  }
  return category;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryFromParams(params);
  const { meta } = category;
  const title = `${meta.label} ilanları | Vasıtan.com`;
  const description = `${meta.label} kategorisindeki güncel ilanları inceleyin. ${meta.description}`;
  const url = absoluteUrl(`/kategori/${meta.slug}`);
  return {
    title,
    description,
    alternates: {
      canonical: `/kategori/${meta.slug}`,
    },
    openGraph: {
      url,
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryFromParams(params);
  const { key, meta } = category;
  const listings = await prisma.listing.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      city: true,
      district: true,
      brand: true,
      model: true,
      year: true,
      km: true,
      createdAt: true,
      listingType: true,
    },
    where: { vehicleType: key },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  const otherCategories = Object.values(VEHICLE_CATEGORIES).filter(
    (value) => value.slug !== meta.slug,
  );

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-1 text-sm font-semibold text-white">
          <span>{meta.icon}</span>
          <span>{meta.label}</span>
        </div>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">
          {meta.label} ilanları
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">{meta.description}</p>
        <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
          {otherCategories.map((item) => (
            <Link
              key={item.slug}
              href={`/kategori/${item.slug}`}
              className="rounded-full border border-slate-200 px-4 py-1 text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {listings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-8 text-center text-sm text-slate-500">
          Bu kategoride henüz ilan bulunamadı. İlk ilanı sen ekle!
        </div>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/ilan/${listing.id}`}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-4 text-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>
                  {listing.city}
                  {listing.district ? `, ${listing.district}` : ""}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{new Date(listing.createdAt).toLocaleDateString("tr-TR")}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{listing.title}</h2>
              <p className="text-sm text-slate-600">
                {listing.brand} {listing.model} • {listing.year} •{" "}
                {listing.km.toLocaleString("tr-TR")} km
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xl font-semibold text-indigo-600">
                  {listing.price.toLocaleString("tr-TR")} TL
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition group-hover:border-indigo-400 group-hover:text-indigo-600">
                  İlanı incele
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
