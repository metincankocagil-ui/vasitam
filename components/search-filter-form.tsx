"use client";

import { useEffect, useMemo, useState } from "react";
import SavedSearchForm from "./saved-search-form";

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

type Province = {
  name: string;
  districts: { name: string }[];
};

const VPIC_ENDPOINT = "https://vpic.nhtsa.dot.gov/api/vehicles";
const TURKEY_PROVINCES_ENDPOINT = "https://turkiyeapi.dev/api/v1/provinces";

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

export default function SearchFilterForm() {
  const [makes, setMakes] = useState<VpicMake[]>([]);
  const [models, setModels] = useState<VpicModel[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<{ name: string }[]>([]);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleTypeValue>("AUTOMOBILE");

  const [loadingMakes, setLoadingMakes] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);
  const [error, setError] = useState("");

  const manualBrand = !makes.length;
  const manualModel = !models.length;

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
          if (filtered.length > 0) {
            setBrand(filtered[0].Make_Name);
          }
        }
      } catch (err) {
        if (!ignore) {
          setError("Marka listesi yüklenemedi, elle giriş yapabilirsiniz.");
        }
      } finally {
        if (!ignore) {
          setLoadingMakes(false);
        }
      }
    }
    async function loadProvinces() {
      try {
        setLoadingCities(true);
        const response = await fetch(TURKEY_PROVINCES_ENDPOINT, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("province_request_failed");
        }
        const json = await response.json();
        const list: Province[] = json?.data ?? [];
        if (!Array.isArray(list)) {
          throw new Error("province_payload_invalid");
        }
        if (!ignore) {
          setProvinces(list);
          if (list.length > 0) {
            setCity(list[0].name);
            setDistricts(list[0].districts ?? []);
            setDistrict(list[0].districts?.[0]?.name ?? "");
          }
        }
      } catch (err) {
        if (!ignore) {
          setError((prev) =>
            prev
              ? prev + " | Şehir listesi yüklenemedi."
              : "Şehir listesi yüklenemedi, elle giriş yapabilirsiniz.",
          );
        }
      } finally {
        if (!ignore) {
          setLoadingCities(false);
        }
      }
    }
    loadMakes();
    loadProvinces();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!brand) {
      setModels([]);
      setModel("");
      return;
    }
    let ignore = false;
    async function loadModels() {
      try {
        setLoadingModels(true);
        const data = await fetchVpic<VpicModel>(
          `getmodelsformake/${encodeURIComponent(brand)}?format=json`,
        );
        if (!ignore) {
          const sorted = data
            .filter((item) => item.Make_Name.toLowerCase() === brand.toLowerCase())
            .sort((a, b) => a.Model_Name.localeCompare(b.Model_Name));
          setModels(sorted);
          setModel(sorted[0]?.Model_Name ?? "");
        }
      } catch (err) {
        if (!ignore) {
          setError((prev) =>
            prev ? prev + " | Model listesi yüklenemedi." : "Model listesi yüklenemedi.",
          );
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
  }, [brand]);

  useEffect(() => {
    if (!city || !provinces.length) {
      setDistricts([]);
      setDistrict("");
      return;
    }
    const match = provinces.find(
      (province) => province.name.toLowerCase() === city.toLowerCase(),
    );
    const avail = match?.districts ?? [];
    setDistricts(avail);
    setDistrict(avail[0]?.name ?? "");
  }, [city, provinces]);

  const provinceNames = useMemo(() => provinces.map((province) => province.name), [provinces]);

  return (
    <form
      action="/arama"
      method="GET"
      className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white/90 p-4 text-sm text-slate-700 shadow-sm dark-mode:border-slate-700 dark-mode:bg-slate-900/70 dark-mode:text-slate-100"
    >
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs uppercase tracking-wide text-slate-500 dark-mode:text-slate-300">
            Marka
          </label>
          {manualBrand ? (
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="Marka girin"
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100 dark-mode:placeholder:text-slate-400"
            />
          ) : (
            <select
              name="brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-400 focus:outline-none dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100"
            >
              {loadingMakes && <option>Markalar yükleniyor...</option>}
              {!loadingMakes &&
                makes.map((make) => (
                  <option key={make.Make_ID} value={make.Make_Name}>
                    {make.Make_Name}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs uppercase tracking-wide text-slate-500 dark-mode:text-slate-300">
            Model
          </label>
          {manualModel ? (
            <input
              type="text"
              name="model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder="Model girin"
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100 dark-mode:placeholder:text-slate-400"
            />
          ) : (
            <select
              name="model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              disabled={loadingModels || models.length === 0}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-400 focus:outline-none disabled:bg-slate-100 dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100 dark-mode:disabled:bg-slate-700"
            >
              {loadingModels && <option>Modeller yükleniyor...</option>}
              {!loadingModels && models.length === 0 && <option>Model bulunamadı</option>}
              {!loadingModels &&
                models.map((item) => (
                  <option key={item.Model_ID} value={item.Model_Name}>
                    {item.Model_Name}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs uppercase tracking-wide text-slate-500 dark-mode:text-slate-300">
            Şehir
          </label>
          {provinceNames.length === 0 ? (
            <input
              type="text"
              name="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Şehir girin"
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100 dark-mode:placeholder:text-slate-400"
            />
          ) : (
            <select
              name="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-400 focus:outline-none dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100"
            >
              {loadingCities && <option>Şehirler yükleniyor...</option>}
              {!loadingCities &&
                provinceNames.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs uppercase tracking-wide text-slate-500 dark-mode:text-slate-300">
            İlçe
          </label>
          {districts.length === 0 ? (
            <input
              type="text"
              name="district"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              placeholder="İlçe girin"
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100 dark-mode:placeholder:text-slate-400"
            />
          ) : (
            <select
              name="district"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-400 focus:outline-none dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100"
            >
              {districts.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs uppercase tracking-wide text-slate-500 dark-mode:text-slate-300">
            Vasıta tipi
          </label>
          <select
            name="vehicleType"
            value={vehicleType}
            onChange={(event) => setVehicleType(event.target.value as VehicleTypeValue)}
            className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-indigo-400 focus:outline-none dark-mode:border-slate-600 dark-mode:bg-slate-800/80 dark-mode:text-slate-100"
          >
            <option value="">Tümü</option>
            {vehicleTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex min-w-[140px] items-end">
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 dark-mode:shadow-indigo-900/50"
          >
            Ara
          </button>
        </div>
      </div>
      {error && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700 dark-mode:border-amber-400/70 dark-mode:bg-amber-500/10 dark-mode:text-amber-200">
          {error}
        </div>
      )}

    </form>
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
