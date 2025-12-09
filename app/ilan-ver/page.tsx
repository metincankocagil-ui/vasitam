// app/ilan-ver/page.tsx
import Link from "next/link";
import ListingImageUploader from "@/components/listing-image-uploader";
import { createListingAction } from "@/lib/actions";
import { getCurrentUser } from "@/lib/auth";
import CarQueryVehicleFields from "@/components/carquery-vehicle-fields";

const fuelTypes = [
  { value: "GASOLINE", label: "Benzin" },
  { value: "DIESEL", label: "Dizel" },
  { value: "LPG", label: "LPG" },
  { value: "HYBRID", label: "Hibrit" },
  { value: "ELECTRIC", label: "Elektrik" },
  { value: "OTHER", label: "Diğer" },
];

const gearTypes = [
  { value: "MANUAL", label: "Manuel" },
  { value: "AUTOMATIC", label: "Otomatik" },
  { value: "SEMI_AUTOMATIC", label: "Yarı Otomatik" },
];

const listingTypes = [
  { value: "FOR_SALE", label: "Satılık" },
  { value: "FOR_RENT", label: "Kiralık" },
  { value: "DAILY_RENT", label: "Günlük Kiralık" },
];

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";
const textareaClass = `${fieldClass} min-h-[120px]`;

const errorMessages: Record<string, string> = {
  missing: "Lütfen tüm zorunlu alanları doldurun.",
};

interface CreateListingPageProps {
  searchParams?: { error?: string };
}

export default async function CreateListingPage({ searchParams }: CreateListingPageProps) {
  const user = await getCurrentUser();
  const errorKey = searchParams?.error ?? "";
  const errorMessage = errorKey ? errorMessages[errorKey] ?? "İlan kaydedilemedi." : "";

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 space-y-4 text-center">
        <h1 className="text-2xl font-bold">İlan oluşturmak için giriş yapın</h1>
        <p className="text-sm text-gray-600">
          İlan verirken bilgileri hesabınızla ilişkilendirmemiz gerekiyor. Lütfen devam
          etmeden önce giriş yapın veya yeni bir hesap oluşturun.
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <Link href="/giris" className="bg-blue-600 text-white px-4 py-2 rounded font-medium">
            Giriş Yap
          </Link>
          <Link href="/kayit" className="text-blue-600 font-medium hover:underline">
            Hesap Oluştur
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Yeni İlan Oluştur</h1>
        <p className="text-sm text-gray-600">
          Araç bilgilerinizi girerek ilanınızı birkaç dakika içinde yayına
          alabilirsiniz.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}

      <form action={createListingAction} className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">İlan Bilgileri</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1 md:col-span-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Başlık
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Örn. 2018 Model Dizel Otomatik SUV"
                className={fieldClass}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="listingType"
                className="text-sm font-medium text-gray-700"
              >
                İlan Tipi
              </label>
              <select
                id="listingType"
                name="listingType"
                className={fieldClass}
              >
                {listingTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Fiyat (TL)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min={0}
                required
                className={fieldClass}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Açıklama
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              placeholder="Araç hakkında detaylı bilgi paylaşın."
              className={textareaClass}
            />
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Araç Detayları</h2>
          <CarQueryVehicleFields />
          <div className="grid gap-4 md:grid-cols-2">

            <div className="space-y-1">
              <label
                htmlFor="year"
                className="text-sm font-medium text-gray-700"
              >
                Yıl
              </label>
              <input
                id="year"
                name="year"
                type="number"
                min={1980}
                max={new Date().getFullYear()}
                required
                className={fieldClass}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="fuelType"
                className="text-sm font-medium text-gray-700"
              >
                Yakıt
              </label>
              <select
                id="fuelType"
                name="fuelType"
                required
                className={fieldClass}
              >
                {fuelTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="gearType"
                className="text-sm font-medium text-gray-700"
              >
                Vites
              </label>
              <select
                id="gearType"
                name="gearType"
                required
                className={fieldClass}
              >
                {gearTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="km" className="text-sm font-medium text-gray-700">
                Kilometre
              </label>
              <input
                id="km"
                name="km"
                type="number"
                min={0}
                required
                className={fieldClass}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="color"
                className="text-sm font-medium text-gray-700"
              >
                Renk
              </label>
              <input
                id="color"
                name="color"
                type="text"
                className={fieldClass}
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-gray-700 md:col-span-2">
              <input
                type="checkbox"
                name="isDamaged"
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Bilinen bir hasar kaydı var
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Konum & Görseller</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                Şehir
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                className={fieldClass}
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="district"
                className="text-sm font-medium text-gray-700"
              >
                İlçe
              </label>
              <input
                id="district"
                name="district"
                type="text"
                className={fieldClass}
              />
            </div>
          </div>

          <ListingImageUploader />
        </section>

        <div className="flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <Link href="/panel/ilanlarim" className="text-sm text-gray-600 hover:text-gray-800">
            Vazgeç
          </Link>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-5 py-2 text-sm"
          >
            İlanı Yayınla
          </button>
        </div>
      </form>
    </div>
  );
}
