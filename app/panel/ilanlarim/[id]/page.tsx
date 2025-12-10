import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/auth";
import EditListingForm from "@/components/edit-listing-form";

const errorMessages: Record<string, string> = {
  missing: "Lütfen zorunlu alanları kontrol edip tekrar deneyin.",
  unauthorized: "Bu ilan üzerinde değişiklik yapma yetkiniz yok.",
};

type EditListingPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

async function getListing(params: Promise<{ id: string }>, ownerId: number) {
  const { id: rawId } = await params;
  const id = Number(rawId);
  if (!Number.isInteger(id)) {
    notFound();
  }

  const listing = await prisma.listing.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      listingType: true,
      price: true,
      vehicleType: true,
      brand: true,
      model: true,
      year: true,
      fuelType: true,
      gearType: true,
      km: true,
      color: true,
      city: true,
      district: true,
      images: true,
      isDamaged: true,
      ownerId: true,
    },
  });

  if (!listing || listing.ownerId !== ownerId) {
    notFound();
  }

  return listing;
}

export default async function EditListingPage({ params, searchParams }: EditListingPageProps) {
  const ownerId = await requireUserId();
  const listing = await getListing(params, ownerId);
  const resolvedSearchParams = await searchParams;
  const errorKey = resolvedSearchParams?.error ?? "";
  const errorMessage = errorKey
    ? errorMessages[errorKey] ?? "İlan güncellenirken bir hata oluştu."
    : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">İlanı Düzenle</h1>
          <p className="text-sm text-gray-600">
            {listing.title} başlıklı ilanı güncelleyebilir, değişiklikleri kaydedebilirsiniz.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm font-semibold">
          <Link
            href={`/ilan/${listing.id}`}
            className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 hover:border-slate-300"
          >
            İlanı gör
          </Link>
          <Link
            href="/panel/ilanlarim"
            className="rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Listeye dön
          </Link>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <EditListingForm listing={listing} />
    </div>
  );
}
