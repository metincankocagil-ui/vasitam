"use client";

import { useEffect, useState } from "react";

type VehicleTypeValue =
  | "AUTOMOBILE"
  | "MOTORCYCLE"
  | "SUV"
  | "COMMERCIAL"
  | "TRUCK"
  | "BUS"
  | "OTHER";

type VpicMake = {
  Make_ID: number;
  Make_Name: string;
};

type VpicModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

const VPIC_ENDPOINT = "https://vpic.nhtsa.dot.gov/api/vehicles";

const allowedMakeNames = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "BYD",
  "Cadillac",
  "Chery",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Cupra",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "DFM",
  "DFSK",
  "Dodge",
  "DS Automobiles",
  "Ferrari",
  "Fiat",
  "Ford",
  "Forthing",
  "Foton",
  "GMC",
  "Honda",
  "Hongqi",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaecoo",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lada",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Lynk & Co",
  "Mahindra",
  "Maserati",
  "Mazda",
  "Mercedes-Benz",
  "Mercury",
  "MG",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Opel",
  "Peugeot",
  "Porsche",
  "Poyraz",
  "Renault",
  "Rolls-Royce",
  "Seat",
  "Seres",
  "Skoda",
  "Skywell",
  "SsangYong",
  "Subaru",
  "Suzuki",
  "SWM",
  "Tata",
  "TOGG",
  "Toyota",
  "Volkswagen",
  "Volvo",
  "Voyah",
] as const;

const normalizedAllowed = new Map(
  allowedMakeNames.map((name, index) => [normalizeName(name), { index, display: name }]),
);

const vehicleTypeOptions = [
  { value: "AUTOMOBILE", label: "Otomobil" },
  { value: "SUV", label: "SUV" },
  { value: "MOTORCYCLE", label: "Motosiklet" },
  { value: "TRUCK", label: "Kamyon / Pickup" },
  { value: "COMMERCIAL", label: "Ticari" },
  { value: "BUS", label: "Otobüs" },
  { value: "OTHER", label: "Diğer" },
] as const;

type CarQueryVehicleFieldsProps = {
  defaultBrand?: string;
  defaultModel?: string;
  defaultVehicleType?: VehicleTypeValue;
  defaultCategory?: string;
};

export default function CarQueryVehicleFields({
  defaultBrand = "",
  defaultModel = "",
  defaultVehicleType = "AUTOMOBILE",
  defaultCategory = "",
}: CarQueryVehicleFieldsProps = {}) {
  const [makes, setMakes] = useState<VpicMake[]>([]);
  const [models, setModels] = useState<VpicModel[]>([]);
  const [brandValue, setBrandValue] = useState(defaultBrand);
  const [modelValue, setModelValue] = useState(defaultModel);
  const [vehicleTypeValue, setVehicleTypeValue] =
    useState<VehicleTypeValue>(defaultVehicleType);
  const [categoryValue, setCategoryValue] = useState(defaultCategory);

  const [selectedMakeId, setSelectedMakeId] = useState("");
  const [selectedMakeName, setSelectedMakeName] = useState("");
  const [useManualBrand, setUseManualBrand] = useState(Boolean(defaultBrand));
  const [useManualModel, setUseManualModel] = useState(Boolean(defaultModel));

  const [loadingMakes, setLoadingMakes] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function loadMakes() {
      try {
        setLoadingMakes(true);
        const data = await fetchVpic<VpicMake>("getallmakes?format=json");
        if (!ignore) {
          const filtered = data
            .reduce<{ make: VpicMake; order: number }[]>((acc, make) => {
              const normalized = normalizeName(make.Make_Name);
              const meta = normalizedAllowed.get(normalized);
              if (!meta) {
                return acc;
              }
              acc.push({
                make: { ...make, Make_Name: meta.display },
                order: meta.index,
              });
              return acc;
            }, [])
            .sort((a, b) => a.order - b.order)
            .map((item) => item.make);
          setMakes(filtered);
        }
      } catch (err) {
        if (!ignore) {
          setError("Marka listesi yüklenemedi. Elle giriş yapabilirsiniz.");
        }
      } finally {
        if (!ignore) {
          setLoadingMakes(false);
        }
      }
    }
    loadMakes();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedMakeName) {
      setModels([]);
      setLoadingModels(false);
      return;
    }
    let ignore = false;
    async function loadModels() {
      try {
        setLoadingModels(true);
        const path = `getmodelsformake/${encodeURIComponent(selectedMakeName)}?format=json`;
        const data = await fetchVpic<VpicModel>(path);
        if (!ignore) {
          setModels(data.sort((a, b) => a.Model_Name.localeCompare(b.Model_Name)));
        }
      } catch (err) {
        if (!ignore) {
          setError("Model listesi yüklenemedi. Elle giriş yapabilirsiniz.");
        }
      } finally {
        if (!ignore) {
          setLoadingModels(false);
        }
      }
    }
    loadModels();
    return () => {
      ignore = true;
    };
  }, [selectedMakeName]);

  const handleMakeSelect = (option: HTMLOptionElement | undefined) => {
    const id = option?.value ?? "";
    const name = option?.dataset.display ?? "";
    setSelectedMakeId(id);
    setSelectedMakeName(name);
    setBrandValue(name);
    setModelValue("");
    setUseManualBrand(false);
    setUseManualModel(false);
  };

  const handleModelSelect = (option: HTMLOptionElement | undefined) => {
    const name = option?.dataset.display ?? "";
    setModelValue(name);
    setUseManualModel(false);
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nhtsa-brand" className="text-sm font-semibold text-slate-700">
            Marka
          </label>
          {!useManualBrand ? (
            <button
              type="button"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              onClick={() => {
                setUseManualBrand(true);
                setSelectedMakeId("");
                setSelectedMakeName("");
                setModels([]);
                setBrandValue("");
              }}
            >
              Elle gir
            </button>
          ) : (
            <button
              type="button"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              onClick={() => {
                setUseManualBrand(false);
                setSelectedMakeId("");
                setSelectedMakeName("");
                setBrandValue("");
              }}
            >
              Listeyi kullan
            </button>
          )}
        </div>
        {useManualBrand ? (
          <input
            id="nhtsa-brand"
            type="text"
            value={brandValue}
            onChange={(event) => setBrandValue(event.target.value)}
            placeholder="Markayı elle girin"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
          />
        ) : (
          <select
            id="nhtsa-brand"
            value={selectedMakeId}
            onChange={(event) => handleMakeSelect(event.target.selectedOptions[0])}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
          >
            <option value="">{loadingMakes ? "Markalar yükleniyor..." : "Bir marka seçin"}</option>
            {makes.map((make) => (
              <option key={make.Make_ID} value={make.Make_ID} data-display={make.Make_Name}>
                {make.Make_Name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nhtsa-model" className="text-sm font-semibold text-slate-700">
            Model
          </label>
          {!useManualModel ? (
            <button
              type="button"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              onClick={() => {
                setUseManualModel(true);
                setModelValue("");
              }}
            >
              Elle gir
            </button>
          ) : (
            <button
              type="button"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              onClick={() => {
                setUseManualModel(false);
                setModelValue("");
              }}
            >
              Listeyi kullan
            </button>
          )}
        </div>
        {useManualModel ? (
          <input
            id="nhtsa-model"
            type="text"
            value={modelValue}
            onChange={(event) => setModelValue(event.target.value)}
            placeholder="Modeli elle girin"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
          />
        ) : (
          <select
            id="nhtsa-model"
            value={modelValue}
            disabled={!brandValue || loadingModels || models.length === 0}
            onChange={(event) => handleModelSelect(event.target.selectedOptions[0])}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">
              {!brandValue
                ? "Önce marka seçin"
                : loadingModels
                  ? "Modeller yükleniyor..."
                  : models.length === 0
                    ? "Bu marka için model bulunamadı"
                    : "Bir model seçin"}
            </option>
            {models.map((model) => (
              <option key={model.Model_ID} value={model.Model_Name} data-display={model.Model_Name}>
                {model.Model_Name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="nhtsa-vehicle-type" className="text-sm font-semibold text-slate-700">
          Vasıta Tipi
        </label>
        <select
          id="nhtsa-vehicle-type"
          name="vehicleType"
          value={vehicleTypeValue}
          onChange={(event) => setVehicleTypeValue(event.target.value as VehicleTypeValue)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
        >
          {vehicleTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="nhtsa-category" className="text-sm font-semibold text-slate-700">
          Kategori / Gövde Tipi
        </label>
        <input
          id="nhtsa-category"
          type="text"
          value={categoryValue}
          onChange={(event) => setCategoryValue(event.target.value)}
          placeholder="Örn. Sedan, Hatchback, Pick-up"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
        />
      </div>

      {error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          {error}
        </div>
      )}

      <input type="hidden" name="brand" value={brandValue} />
      <input type="hidden" name="model" value={modelValue} />
      <input type="hidden" name="vehicleCategory" value={categoryValue} />
    </div>
  );
}

async function fetchVpic<T>(path: string): Promise<T[]> {
  const url = path.startsWith("http") ? path : `${VPIC_ENDPOINT}/${path}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`VPIC request failed: ${response.status}`);
  }
  const data = await response.json();
  const results = data?.Results;
  if (!Array.isArray(results)) {
    return [];
  }
  return results as T[];
}

function normalizeName(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}
