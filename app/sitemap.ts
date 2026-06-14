import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

const routes = [
  "",
  "/ara",
  "/ai-danisman",
  "/arac-wiki",
  "/garajim",
  "/kronik-sorunlar",
  "/topluluk",
  "/giris",
  "/kayit",
  "/ilan-ver",
  "/hakkimizda",
  "/iletisim",
  "/hukuk/gizlilik",
  "/hukuk/kullanim-kosullari",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
