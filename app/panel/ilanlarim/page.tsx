// app/panel/ilanlarim/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { requireUserId } from "@/lib/auth";

const statusLabels: Record<string, string> = {
  ACTIVE: "Yayında",
  PASSIVE: "Pasif",
  SOLD: "Satıldı",
};

export default async function MyListingsPage() {
  const userId = await requireUserId();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      listings: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    redirect("/kayit");
  }

  const listings = user.listings;
  const activeCount = listings.filter((listing) => listing.status === "ACTIVE")
    .length;
  const soldCount = listings.filter((listing) => listing.status === "SOLD")
    .length;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">İlanlarım</h1>
        <p className="text-sm text-gray-600">
          {user.name ?? user.email} hesabına ait{" "}
          <span className="font-semibold">{listings.length}</span> ilan.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Toplam İlan</div>
          <div className="text-2xl font-semibold">{listings.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Yayında</div>
          <div className="text-2xl font-semibold text-green-600">
            {activeCount}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-500">Satıldı</div>
          <div className="text-2xl font-semibold text-blue-600">
            {soldCount}
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Son İlanlar</h2>
            <p className="text-sm text-gray-600">
              İlanlarınızı buradan düzenleyebilir veya yayından kaldırabilirsiniz.
            </p>
          </div>
          <Link
            href="/ilan-ver"
            className="inline-flex justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Yeni İlan Ver
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="p-6 text-sm text-gray-600 border-t">
            Henüz ilanınız yok. İlk ilanınızı şimdi oluşturun.
          </div>
        ) : (
          <div className="overflow-x-auto border-t">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Başlık</th>
                  <th className="px-4 py-3">Araç</th>
                  <th className="px-4 py-3">Fiyat</th>
                  <th className="px-4 py-3">Durum</th>
                  <th className="px-4 py-3">Oluşturulma</th>
                  <th className="px-4 py-3 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {listing.title}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {listing.brand} {listing.model} • {listing.year}
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-700">
                      {listing.price.toLocaleString("tr-TR")} TL
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium">
                        {statusLabels[listing.status] ?? listing.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {listing.createdAt.toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-2 text-xs font-medium">
                        <Link
                          href={`/ilan/${listing.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Görüntüle
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link
                          href={`/panel/ilanlarim/${listing.id}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Düzenle
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
