import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    redirect("/");
  }

  const numeric = query.replace(/\D/g, "");
  if (numeric.length === 10) {
    const listingByCode = await prisma.listing.findUnique({
      where: { code: numeric },
      select: { id: true },
    });
    if (listingByCode) {
      redirect(`/ilan/${listingByCode.id}`);
    }
  }

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
      code: true,
      listingType: true,
      createdAt: true,
    },
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { brand: { contains: query, mode: "insensitive" } },
        { model: { contains: query, mode: "insensitive" } },
        { city: { contains: query, mode: "insensitive" } },
        { code: { equals: numeric } },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Arama</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">&ldquo;{query}&rdquo; için sonuçlar</h1>
        <p className="mt-1 text-sm text-slate-500">
          {listings.length > 0
            ? `${listings.length} ilan bulundu.`
            : "Eşleşen ilan bulunamadı. Farklı bir kelime denemeyi deneyebilirsiniz."}
        </p>
      </header>

      {listings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-8 text-center text-sm text-slate-500">
          Aramanıza uygun ilan bulunamadı.
        </div>
      ) : (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/ilan/${listing.id}`}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-700 shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  {listing.city}
                  {listing.district ? `, ${listing.district}` : ""}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">
                  #{listing.code}
                </span>
              </div>
              <h2 className="mt-2 text-base font-semibold text-slate-900">{listing.title}</h2>
              <p className="text-xs text-slate-500">
                {listing.brand} {listing.model} • {listing.year} • {listing.km.toLocaleString("tr-TR")} km
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-semibold text-indigo-600">
                  {listing.price.toLocaleString("tr-TR")} TL
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {listing.listingType === "FOR_RENT"
                    ? "Kiralık"
                    : listing.listingType === "DAILY_RENT"
                      ? "Günlük"
                      : "Satılık"}
                </span>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
