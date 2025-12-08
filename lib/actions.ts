"use server";

import { FuelType, ListingType, VehicleType, GearType } from "@prisma/client";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  hashPassword,
  requireUserId,
  verifyPassword,
} from "./auth";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getEnumValue<E extends Record<string, string>>(
  enumObj: E,
  rawValue: string,
): E[keyof E] | null {
  return (Object.values(enumObj) as string[]).includes(rawValue)
    ? (rawValue as E[keyof E])
    : null;
}

function extractUploadedImages(formData: FormData) {
  const entries = formData.getAll("uploadedImages");
  const coverImage = getString(formData, "coverImage");
  const normalized = entries
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean)
    .slice(0, 8);

  if (coverImage) {
    const coverIndex = normalized.findIndex((image) => image === coverImage);
    if (coverIndex > 0) {
      const [selected] = normalized.splice(coverIndex, 1);
      normalized.unshift(selected);
    } else if (coverIndex === -1 && normalized.length > 0) {
      normalized.unshift(coverImage);
    }
  }

  return normalized;
}

function redirectWithError(path: string, error: string): never {
  const url = new URL(path, process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost");
  url.searchParams.set("error", error);
  redirect(url.pathname + "?" + url.searchParams.toString());
}

export async function registerAction(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");
  const passwordConfirm = getString(formData, "passwordConfirm");
  const name = getString(formData, "name");
  const phone = getString(formData, "phone");

  if (!email || !password) {
    redirectWithError("/kayit", "missing");
  }

  if (password !== passwordConfirm) {
    redirectWithError("/kayit", "password");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    redirectWithError("/kayit", "exists");
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashPassword(password),
      name: name || null,
      phone: phone || null,
    },
  });

  await createSession(user.id);
  redirect("/panel/ilanlarim");
}

export async function loginAction(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!email || !password) {
    redirectWithError("/giris", "missing");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.password)) {
    redirectWithError("/giris", "invalid");
  }

  await createSession(user.id);
  redirect("/panel/ilanlarim");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function createListingAction(formData: FormData) {
  const ownerId = await requireUserId();

  const title = getString(formData, "title");
  const description = getString(formData, "description");
  const listingType =
    getEnumValue(ListingType, getString(formData, "listingType")) ?? ListingType.FOR_SALE;
  const price = Number(getString(formData, "price"));
  const vehicleType = getEnumValue(VehicleType, getString(formData, "vehicleType"));
  const brand = getString(formData, "brand");
  const model = getString(formData, "model");
  const year = Number(getString(formData, "year"));
  const fuelType = getEnumValue(FuelType, getString(formData, "fuelType"));
  const gearType = getEnumValue(GearType, getString(formData, "gearType"));
  const km = Number(getString(formData, "km"));
  const color = getString(formData, "color");
  const city = getString(formData, "city");
  const district = getString(formData, "district");
  const isDamaged = formData.get("isDamaged") === "on";
  const images = extractUploadedImages(formData);

  if (
    !title ||
    !description ||
    !vehicleType ||
    !brand ||
    !model ||
    Number.isNaN(price) ||
    Number.isNaN(year) ||
    Number.isNaN(km) ||
    !city ||
    !fuelType ||
    !gearType ||
    images.length === 0
  ) {
    redirectWithError("/ilan-ver", "missing");
  }

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price,
      vehicleType,
      brand,
      model,
      year,
      fuelType,
      gearType,
      km,
      color: color || null,
      city,
      district: district || null,
      listingType,
      ownerId,
      images,
      isDamaged,
    },
  });

  revalidatePath("/");
  revalidatePath("/panel/ilanlarim");
  redirect(`/ilan/${listing.id}`);
}
