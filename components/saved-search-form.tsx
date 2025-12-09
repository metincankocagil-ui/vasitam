"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SavedSearch = {
  brand: string;
  model: string;
};

const STORAGE_KEY = "vasitam:saved-searches";

const brandModelMap: Record<string, string[]> = {
  "Audi": ["Q5", "Q7", "A3", "A4"],
  "BMW": ["X1", "X3", "3 Serisi", "5 Serisi"],
  "Dacia": ["Duster", "Sandero", "Jogger"],
  "Hyundai": ["Tucson", "Kona", "Bayon"],
  "Kia": ["Sportage", "Sorento", "Niro"],
  "Mercedes-Benz": ["GLC", "GLA", "E Serisi"],
  "Nissan": ["Qashqai", "X-Trail", "Juke"],
  "Toyota": ["Corolla", "RAV4", "C-HR"],
  "Volkswagen": ["Tiguan", "T-Cross", "Golf"],
};

export default function SavedSearchForm() {
  const brands = useMemo(() => Object.keys(brandModelMap), []);
  const [brand, setBrand] = useState(brands[0]);
  const [model, setModel] = useState(brandModelMap[brands[0]][0]);
  const [saved, setSaved] = useState<SavedSearch[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedSearch[];
        if (Array.isArray(parsed)) {
          setSaved(parsed.slice(0, 6));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setModel(brandModelMap[brand][0]);
  }, [brand]);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const payload: SavedSearch = { brand, model };
    setSaved((prev) => {
      const exists = prev.some(
        (item) => item.brand === payload.brand && item.model === payload.model,
      );
      if (exists) {
        return prev;
      }
      const next = [payload, ...prev].slice(0, 6);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-white/70 p-4 text-xs text-slate-600">
      <p className="text-sm text-slate-700">
        Belirlediğin marka ve model aramalarını kaydet, yeni ilan eklendiğinde hemen haberdar ol.
      </p>
      <form className="grid gap-3 md:grid-cols-[1fr,1fr,auto]" onSubmit={handleSave}>
        <select
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
        >
          {brands.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          value={model}
          onChange={(event) => setModel(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
        >
          {brandModelMap[brand].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Kaydet
        </button>
      </form>
      {saved.length > 0 && (
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Kayıtlı aramalar</p>
          <div className="flex flex-wrap gap-2">
            {saved.map((item) => (
              <Link
                key={`${item.brand}-${item.model}`}
                href={`/arama?brand=${encodeURIComponent(item.brand)}&model=${encodeURIComponent(item.model)}`}
                className="group flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600"
              >
                <span>{item.brand}</span>
                <span className="text-slate-400 group-hover:text-indigo-500">/</span>
                <span>{item.model}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
