const RAW_SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.vasitan.com";
export const SITE_URL = RAW_SITE_URL.endsWith("/")
  ? RAW_SITE_URL.slice(0, -1)
  : RAW_SITE_URL;

export const DEFAULT_TITLE = "Vasıtan.com - Vasıta Alım Satım & Kiralama";
export const DEFAULT_DESCRIPTION =
  "Vasıtan.com'da otomobil, SUV, motosiklet ve ticari araç ilanlarını keşfedin, marka ve modele göre filtreleyin, güvenle alım satım yapın.";
export const DEFAULT_KEYWORDS = [
  "vasıta",
  "otomobil ilanları",
  "suv ilanları",
  "araç alım satım",
  "kiralık araç",
  "araba ilanı",
  "vasıta platformu",
];

export function absoluteUrl(path: string = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
