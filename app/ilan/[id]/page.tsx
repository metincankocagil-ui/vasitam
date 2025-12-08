// app/ilan/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface ListingPageProps {
  params: { id: string };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    notFound();
  }

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { owner: true },
  });

  if (!listing) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      {/* Sol kısım: görseller + açıklama */}
      <section className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="aspect-video bg-gray-200 rounded mb-3" />
          <div className="space-y-1">
            <h1 className="text-xl font-bold">{listing.title}</h1>
            <div className="text-sm text-gray-500">
              {listing.city}
              {listing.district ? `, ${listing.district}` : ""} •{" "}
              {listing.createdAt.toLocaleDateString("tr-TR")}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 space-y-3">
          <h2 className="font-semibold text-lg">İlan Detayları</h2>
          <dl className="grid grid-cols-2 gap-2 text-sm">
            <dt className="text-gray-500">Marka</dt>
            <dd>{listing.brand}</dd>

            <dt className="text-gray-500">Model</dt>
            <dd>{listing.model}</dd>

            <dt className="text-gray-500">Yıl</dt>
            <dd>{listing.year}</dd>

            <dt className="text-gray-500">Yakıt</dt>
            <dd>{listing.fuelType}</dd>

            <dt className="text-gray-500">Vites</dt>
            <dd>{listing.gearType}</dd>

            <dt className="text-gray-500">Km</dt>
            <dd>{listing.km.toLocaleString("tr-TR")}</dd>

            <dt className="text-gray-500">Renk</dt>
            <dd>{listing.color ?? "-"}</dd>

            <dt className="text-gray-500">Hasar Kaydı</dt>
            <dd>{listing.isDamaged ? "Var" : "Yok / Bilinmiyor"}</dd>
          </dl>
        </div>

        <div className="bg-white rounded-lg shadow p-4 space-y-3">
          <h2 className="font-semibold text-lg">Açıklama</h2>
          <p className="text-sm text-gray-800 whitespace-pre-line">
            {listing.description}
          </p>
        </div>
      </section>

      {/* Sağ kısım: fiyat + ilan sahibi */}
      <aside className="space-y-4">
        <div className="bg-white rounded-lg shadow p-4 space-y-3">
          <div className="text-2xl font-bold text-blue-700">
            {listing.price.toLocaleString("tr-TR")} TL
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 space-y-3">
          <h2 className="font-semibold text-lg">İlan Sahibi</h2>
          <div className="text-sm font-medium">
            {listing.owner.name ?? "İlan Sahibi"}
          </div>
          <div className="text-xs text-gray-500">{listing.owner.email}</div>
          {/* İleride telefon vs. için ayrı alanlar ekleriz */}
        </div>
      </aside>
    </div>
  );
}
