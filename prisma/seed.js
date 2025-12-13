/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const demoListings = [
  {
    title: "2020 Tesla Model 3 Performance",
    description:
      "Full self-driving paketi, tek şarjla 480km menzil. Showroom kondisyonunda, kaporta boyasız. Kablosuz güncellemelere açık.",
    price: 1890000,
    vehicleType: "AUTOMOBILE",
    brand: "Tesla",
    model: "Model 3",
    year: 2020,
    fuelType: "ELECTRIC",
    gearType: "AUTOMATIC",
    km: 42000,
    color: "Beyaz",
    city: "İstanbul",
    district: "Maslak",
    listingType: "FOR_SALE",
    images: [
      "https://images.unsplash.com/photo-1511397744084-4e17e271cab2",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    ],
  },
  {
    title: "2022 BMW X5 M Sport Executive",
    description:
      "Adaptif cruise, lazer far, panoramik tavan ve Bowers & Wilkins ses sistemi. Tek kullanıcı, yetkili servis bakımlı.",
    price: 4250000,
    vehicleType: "SUV",
    brand: "BMW",
    model: "X5",
    year: 2022,
    fuelType: "DIESEL",
    gearType: "AUTOMATIC",
    km: 28000,
    color: "Karbon Siyah",
    city: "Ankara",
    district: "Çankaya",
    listingType: "FOR_SALE",
    images: [
      "https://images.unsplash.com/photo-1503736334960-4ebf2c2c6b4f",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    ],
  },
  {
    title: "2018 Mercedes-Benz G 350d Adventure",
    description:
      "G Professional donanım, su geçirmez paket, 20\" beadlock jant. İzmir merkezden teslim, takas değerlendirilebilir.",
    price: 3350000,
    vehicleType: "SUV",
    brand: "Mercedes-Benz",
    model: "G Serisi",
    year: 2018,
    fuelType: "DIESEL",
    gearType: "AUTOMATIC",
    km: 72000,
    color: "Mat Gri",
    city: "İzmir",
    district: "Alsancak",
    listingType: "FOR_SALE",
    images: [
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    ],
  },
  {
    title: "2021 Ducati Panigale V4 Track Edition",
    description:
      "Özel pist paketi, Öhlins süspansiyon, tam titanyum Akrapovic. Yetkili servis bakımlı, orijinal parçalar mevcut.",
    price: 980000,
    vehicleType: "MOTORCYCLE",
    brand: "Ducati",
    model: "Panigale V4",
    year: 2021,
    fuelType: "GASOLINE",
    gearType: "MANUAL",
    km: 9000,
    color: "Rosso",
    city: "İstanbul",
    district: "Ataşehir",
    listingType: "FOR_SALE",
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    ],
  },
  {
    title: "2017 Ford F-150 Raptor Baja Pack",
    description:
      "Fox süspansiyon, 35\" BFGoodrich lastikler, elektrikli vinç. Amerika girişli, TR kayıtlı. Off-road test sürüşüne açık.",
    price: 1825000,
    vehicleType: "SUV",
    brand: "Ford",
    model: "F-150 Raptor",
    year: 2017,
    fuelType: "GASOLINE",
    gearType: "AUTOMATIC",
    km: 115000,
    color: "Mavi",
    city: "Antalya",
    district: "Konyaaltı",
    listingType: "FOR_SALE",
    images: [
      "https://images.unsplash.com/photo-1502872364588-894d7d6ddfab",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
    ],
  },
  {
    title: "2023 Volkswagen ID.4 Pure City Edition",
    description:
      "150kW motor, 8 yıl batarya garantisi, 125kW hızlı şarj desteği. İç mekanda aktif kokpit aydınlatma.",
    price: 1650000,
    vehicleType: "AUTOMOBILE",
    brand: "Volkswagen",
    model: "ID.4",
    year: 2023,
    fuelType: "ELECTRIC",
    gearType: "AUTOMATIC",
    km: 8000,
    color: "Lapis Blue",
    city: "Bursa",
    district: "Nilüfer",
    listingType: "FOR_SALE",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    ],
  },
  {
    title: "2016 MAN TGX 18.500 XXL Long Haul",
    description:
      "Retarder, iki depo, webasto, kabin içi çift yatak. Fleet bakımlı, sıradaki projeden dolayı satılık.",
    price: 2950000,
    vehicleType: "TRUCK",
    brand: "MAN",
    model: "TGX",
    year: 2016,
    fuelType: "DIESEL",
    gearType: "AUTOMATIC",
    km: 480000,
    color: "Turuncu",
    city: "Mersin",
    district: "Tarsus",
    listingType: "FOR_SALE",
    images: [
      "https://images.unsplash.com/photo-1503736334960-4ebf2c2c6b4f",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    ],
  },
  {
    title: "2022 Peugeot e-Expert Premium Cargo",
    description:
      "Elektrikli ticari, 330 km menzil, 1 ton taşıma kapasitesi. %90 batarya sağlığı, filo garanti devam ediyor.",
    price: 1120000,
    vehicleType: "COMMERCIAL",
    brand: "Peugeot",
    model: "e-Expert",
    year: 2022,
    fuelType: "ELECTRIC",
    gearType: "AUTOMATIC",
    km: 36000,
    color: "Gümüş",
    city: "Kayseri",
    district: "Melikgazi",
    listingType: "FOR_SALE",
    images: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "https://images.unsplash.com/photo-1471478331149-c72f17e33c73",
    ],
  },
];

function normalizeImage(url) {
  if (!url) {
    return "";
  }
  return url.includes("?") ? url : `${url}?auto=format&fit=crop&w=800&q=80`;
}

function generateSeedCode(index) {
  const base = 2586351000;
  return String(base + index).padStart(10, "0");
}

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@vasitan.com" },
    update: {},
    create: {
      email: "demo@vasitan.com",
      password:
        "seedDemoSalt123:06bcf998e3edf1810e5dda0799730f1e174754d00b16c4b2359a3d5749de6cf4d90c6f0886bc24889e6085d1c1354f83615dd5e1f910a36351768fa355e607a8",
      name: "Demo Kullanıcı",
      phone: "+90 555 000 00 00",
    },
  });

  await prisma.listing.deleteMany({ where: { ownerId: user.id } });

  for (const [index, listing] of demoListings.entries()) {
    await prisma.listing.create({
      data: {
        ...listing,
        code: generateSeedCode(index),
        ownerId: user.id,
        images: listing.images.filter(Boolean).map(normalizeImage),
      },
    });
  }

  console.log(`Seed completed. Added ${demoListings.length} listings.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
