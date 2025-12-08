import "server-only";
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
  BinaryLike,
} from "node:crypto";

const SESSION_COOKIE = "vasitan_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 gün

type CookieStore = Awaited<ReturnType<typeof cookies>>;

async function getCookieStore(): Promise<CookieStore> {
  return cookies();
}

function deriveKey(password: BinaryLike, salt: string) {
  return scryptSync(password, salt, 64);
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = deriveKey(password, salt).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) {
    return false;
  }
  const incoming = deriveKey(password, salt);
  const storedKey = Buffer.from(hash, "hex");

  if (storedKey.length !== incoming.length) {
    return false;
  }

  return timingSafeEqual(storedKey, incoming);
}

export async function getSessionUserId() {
  const store = await getCookieStore();
  const session = store.get(SESSION_COOKIE)?.value;
  if (!session) {
    return null;
  }
  const userId = Number(session);
  if (!Number.isInteger(userId)) {
    return null;
  }
  return userId;
}

export async function getCurrentUser() {
  const userId = await getSessionUserId();
  if (!userId) {
    return null;
  }
  return prisma.user.findUnique({ where: { id: userId } });
}

export async function requireUserId() {
  const userId = await getSessionUserId();
  if (!userId) {
    redirect("/giris");
  }
  return userId;
}

export async function createSession(userId: number) {
  const store = await getCookieStore();
  store.set(SESSION_COOKIE, String(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function destroySession() {
  const store = await getCookieStore();
  store.delete(SESSION_COOKIE);
}
