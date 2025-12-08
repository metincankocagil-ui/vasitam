// app/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
    include: { owner: true },
  });

  return (
    <div className="space-y-6">
      {/* Hero / arama */}
      <section className="bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">
          Vasıtanızı bulun, alım satım & kiralama kolayca.
        </h1>
        <p className="text-sm text-gray-600">
          Otomobil, motosiklet, ticari araçlar ve daha fazlası.
        </p>

        <form
          action="/arama"
          method="GET"
          className="grid grid-cols-1 md:grid-cols-4 gap-3"
        >
          <input
            type="text"
            name="q"
            placeholder="Marka, model veya anahtar kelime"
            className="border rounded px-3 py-2 text-sm"
          />
          <select
            name="vehicleType"
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Tüm Vasıta Tipleri</option>
            <option value="AUTOMOBILE">Otomobil</option>
            <option value="MOTORCYCLE">Motosiklet</option>
            <option value="SUV">SUV</option>
            <option value="COMMERCIAL">Ticari</option>
            <option value="TRUCK">Kamyon</option>
            <option value="BUS">Otobüs</option>
          </select>
          <input
            type="text"
            name="city"
            placeholder="Şehir"
            className="border rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 text-sm font-medium"
          >
            Ara
          </button>
        </form>
      </section>

      {/* Son ilanlar */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Son İlanlar</h2>
        {listings.length === 0 && (
          <div className="text-sm text-gray-500">Henüz ilan bulunmuyor.</div>
        )}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/ilan/${listing.id}`}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-3 flex flex-col"
            >
              <div className="aspect-video bg-gray-200 rounded mb-3 overflow-hidden">
                {/* Şimdilik görsel yoksa boş gri */}
                {/* İleride gerçek resim koyacağız */}
              </div>
              <div className="flex-1 space-y-1">
                <div className="text-sm text-gray-500">
                  {listing.city}
                  {listing.district ? `, ${listing.district}` : ""}
                </div>
                <div className="font-semibold text-sm line-clamp-2">
                  {listing.title}
                </div>
                <div className="text-sm text-gray-600">
                  {listing.brand} {listing.model} • {listing.year} •{" "}
                  {listing.km.toLocaleString("tr-TR")} km
                </div>
                <div className="text-base font-bold text-blue-700">
                  {listing.price.toLocaleString("tr-TR")} TL
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
