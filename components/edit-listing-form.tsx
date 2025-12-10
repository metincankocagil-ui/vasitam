'use client';

import { useActionState } from "react";
import ListingImageUploader from "@/components/listing-image-uploader";
import CarQueryVehicleFields from "@/components/carquery-vehicle-fields";
import { updateListingAction } from "@/lib/actions";

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

type EditableListing = {
  id: number;
  title: string;
  description: string;
  listingType: "FOR_SALE" | "FOR_RENT" | "DAILY_RENT";
  price: number;
  vehicleType:
    | "AUTOMOBILE"
    | "MOTORCYCLE"
    | "SUV"
    | "COMMERCIAL"
    | "TRUCK"
    | "BUS"
    | "OTHER";
  brand: string;
  model: string;
  year: number;
  fuelType: "GASOLINE" | "DIESEL" | "LPG" | "HYBRID" | "ELECTRIC" | "OTHER";
  gearType: "MANUAL" | "AUTOMATIC" | "SEMI_AUTOMATIC";
  km: number;
  color: string | null;
  city: string;
  district: string | null;
  images: string[];
  isDamaged: boolean;
};

type EditListingFormProps = {
  listing: EditableListing;
};

export default function EditListingForm({ listing }: EditListingFormProps) {
  const [, formAction] = useActionState(async (_: null, formData: FormData) => {
    await updateListingAction(formData);
    return null;
  }, null);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="listingId" value={listing.id} />

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">İlan Bilgileri</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1 md:col-span-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Başlık
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={listing.title}
              className={fieldClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="listingType" className="text-sm font-medium text-gray-700">
              İlan Tipi
            </label>
            <select id="listingType" name="listingType" className={fieldClass} defaultValue={listing.listingType}>
              {listingTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="price" className="text-sm font-medium text-gray-700">
              Fiyat (TL)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              required
              defaultValue={listing.price}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Açıklama
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            defaultValue={listing.description}
            className={textareaClass}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Araç Detayları</h2>
        <CarQueryVehicleFields
          defaultBrand={listing.brand}
          defaultModel={listing.model}
          defaultVehicleType={listing.vehicleType}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="year" className="text-sm font-medium text-gray-700">
              Yıl
            </label>
            <input
              id="year"
              name="year"
              type="number"
              min={1980}
              max={new Date().getFullYear()}
              required
              defaultValue={listing.year}
              className={fieldClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="fuelType" className="text-sm font-medium text-gray-700">
              Yakıt
            </label>
            <select id="fuelType" name="fuelType" required className={fieldClass} defaultValue={listing.fuelType}>
              {fuelTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="gearType" className="text-sm font-medium text-gray-700">
              Vites
            </label>
            <select id="gearType" name="gearType" required className={fieldClass} defaultValue={listing.gearType}>
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
            <input id="km" name="km" type="number" min={0} required defaultValue={listing.km} className={fieldClass} />
          </div>

          <div className="space-y-1">
            <label htmlFor="color" className="text-sm font-medium text-gray-700">
              Renk
            </label>
            <input id="color" name="color" type="text" defaultValue={listing.color ?? ""} className={fieldClass} />
          </div>

          <label className="flex items-center gap-3 text-sm text-gray-700 md:col-span-2">
            <input
              type="checkbox"
              name="isDamaged"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              defaultChecked={listing.isDamaged}
            />
            Bilinen bir hasar kaydı var
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Konum</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">
              Şehir
            </label>
            <input id="city" name="city" type="text" required defaultValue={listing.city} className={fieldClass} />
          </div>
          <div className="space-y-1">
            <label htmlFor="district" className="text-sm font-medium text-gray-700">
              İlçe
            </label>
            <input id="district" name="district" type="text" defaultValue={listing.district ?? ""} className={fieldClass} />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Görseller</h2>
        <ListingImageUploader initialImages={listing.images} />
        <p className="text-xs text-slate-500">
          Görsel eklemezseniz mevcut görselleriniz korunur. Yenilerini ekleyerek sırayı değiştirebilirsiniz.
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          type="submit"
          className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Değişiklikleri Kaydet
        </button>
      </div>
    </form>
  );
}
