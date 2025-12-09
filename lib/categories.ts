export type VehicleCategoryKey =
  | "AUTOMOBILE"
  | "MOTORCYCLE"
  | "SUV"
  | "COMMERCIAL"
  | "TRUCK"
  | "BUS"
  | "OTHER";

export type VehicleCategoryMeta = {
  label: string;
  description: string;
  slug: string;
  gradient: string;
  icon: string;
};

export const VEHICLE_CATEGORIES: Record<VehicleCategoryKey, VehicleCategoryMeta> = {
  AUTOMOBILE: {
    label: "Otomobil",
    description: "Şehir içi ve uzun yol için sedan, hatchback ve coupe modeller.",
    slug: "otomobil",
    gradient: "from-indigo-500 via-sky-500 to-cyan-400",
    icon: "🚗",
  },
  SUV: {
    label: "SUV",
    description: "Yüksek sürüş konforu ve aile ihtiyaçlarına uygun SUV modelleri.",
    slug: "suv",
    gradient: "from-emerald-500 via-teal-400 to-lime-300",
    icon: "🚙",
  },
  MOTORCYCLE: {
    label: "Motosiklet",
    description: "Şehirde hız ve özgürlük sunan motosiklet seçenekleri.",
    slug: "motosiklet",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    icon: "🏍️",
  },
  COMMERCIAL: {
    label: "Ticari",
    description: "İşinizi büyütecek panelvan, minibüs ve ticari araçlar.",
    slug: "ticari",
    gradient: "from-amber-500 via-orange-500 to-rose-400",
    icon: "🚐",
  },
  TRUCK: {
    label: "Kamyon / Pickup",
    description: "Güçlü taşıma kapasitesi sunan pickup ve kamyon modelleri.",
    slug: "pickup-kamyon",
    gradient: "from-slate-600 via-slate-500 to-slate-400",
    icon: "🚚",
  },
  BUS: {
    label: "Otobüs",
    description: "Yolcu taşımacılığı için hazır minibüs ve otobüs seçenekleri.",
    slug: "otobus",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    icon: "🚌",
  },
  OTHER: {
    label: "Diğer",
    description: "Klasik, off-road veya özel amaçlı tüm diğer araçlar.",
    slug: "diger",
    gradient: "from-stone-400 via-stone-300 to-stone-200",
    icon: "⭐️",
  },
};

export function findCategoryBySlug(slug: string) {
  const entry = Object.entries(VEHICLE_CATEGORIES).find(
    ([, meta]) => meta.slug.toLowerCase() === slug.toLowerCase(),
  );
  if (!entry) {
    return null;
  }
  return { key: entry[0] as VehicleCategoryKey, meta: entry[1] };
}
