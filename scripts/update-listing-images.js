/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const fallbackImages = [
  { brand: "Volkswagen", url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d" },
  { brand: "Ford", url: "https://images.unsplash.com/photo-1502877338535-766e1452684a" },
  { brand: "Ferrari", url: "https://images.unsplash.com/photo-1503736334960-4ebf2c2c6b4f" },
  { brand: "Opel", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e" },
  { brand: "Nissan", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
  { brand: "Mercedes", url: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf" },
  { brand: "BMW", url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf" },
  { brand: "Audi", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70" },
];

function getImageSet(index) {
  const fallback = fallbackImages.filter((item) => Boolean(item?.url));
  const primary = fallback[index % fallback.length] ?? fallback[0];
  const secondary = fallback[(index + 3) % fallback.length] ?? fallback[0];
  const format = (url) => {
    if (!url || typeof url !== "string") {
      return fallback[0]?.url ?? "https://images.unsplash.com/photo-1503376780353-7e6692767b70";
    }
    return url.includes("?") ? url : `${url}?auto=format&fit=crop&w=800&q=80`;
  };
  return [format(primary?.url), format(secondary?.url)];
}

async function run() {
  const listings = await prisma.listing.findMany({
    select: { id: true },
    orderBy: { id: "asc" },
  });

  for (const [index, listing] of listings.entries()) {
    await prisma.listing.update({
      where: { id: listing.id },
      data: { images: getImageSet(index) },
    });
    console.log(`Updated listing ${listing.id}`);
  }
}

run()
  .catch((error) => {
    console.error("Failed to update listing images:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
