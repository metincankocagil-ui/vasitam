import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";
import { VEHICLE_CATEGORIES } from "@/lib/categories";

export default async function sitemap() {
  const staticRoutes = [
    "",
    "/ilan-ver",
    "/giris",
    "/kayit",
    "/panel/ilanlarim",
    "/kategoriler",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date().toISOString(),
  }));

  const categoryRoutes = Object.values(VEHICLE_CATEGORIES).map((category) => ({
    url: `${SITE_URL}/kategori/${category.slug}`,
    lastModified: new Date().toISOString(),
  }));

  const listings = await prisma.listing.findMany({
    select: { id: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
    take: 500,
  });

  const listingRoutes = listings.map((listing) => ({
    url: `${SITE_URL}/ilan/${listing.id}`,
    lastModified: listing.updatedAt.toISOString(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...listingRoutes];
}
