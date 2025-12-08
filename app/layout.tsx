// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Vasıtan.com - Vasıta Alım Satım & Kiralama",
  description: "Türkiye'nin sadece vasıta ilanları için hazırlanmış platformu.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const userLabel = user ? user.name ?? user.email : "";
  const userInitial = userLabel ? userLabel.charAt(0).toUpperCase() : "";

  return (
    <html lang="tr">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900 antialiased">
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(180,198,252,0.65),_rgba(255,255,255,0))]" />
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="text-2xl font-semibold tracking-tight text-slate-900">
              Vasıtan<span className="text-indigo-500">.com</span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              <Link href="/" className="transition hover:text-slate-900">
                Anasayfa
              </Link>
              <Link href="/ilan-ver" className="transition hover:text-slate-900">
                İlan Ver
              </Link>
            </nav>
            <div className="flex items-center gap-3 text-sm font-medium">
              <Link
                href="/ilan-ver"
                className="hidden rounded-full bg-indigo-500/90 px-4 py-2 font-semibold text-white transition hover:bg-indigo-400 sm:inline-flex"
              >
                İlan Ver
              </Link>
              {user ? (
                <>
                  <details className="group relative hidden text-xs sm:block">
                    <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-slate-600 transition hover:border-slate-300 hover:bg-white [&::-webkit-details-marker]:hidden">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                        {userInitial || "K"}
                      </span>
                      <div className="flex flex-col">
                        <span className="max-w-[150px] truncate text-sm font-semibold text-slate-900">
                          {userLabel}
                        </span>
                        <span className="text-[11px] text-slate-500">Hesabım</span>
                      </div>
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-4 w-4 text-slate-400 transition group-open:-rotate-180"
                      >
                        <path
                          d="M5.5 7.5 10 12l4.5-4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </summary>
                    <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-100 bg-white/95 p-3 text-sm shadow-xl backdrop-blur">
                      <Link
                        href="/panel/ilanlarim"
                        className="block rounded-lg px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Hesabım
                      </Link>
                      <form action={logoutAction}>
                        <button
                          type="submit"
                          className="mt-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-slate-600 transition hover:bg-slate-50"
                        >
                          Çıkış Yap
                          <span aria-hidden="true">↗</span>
                        </button>
                      </form>
                    </div>
                  </details>
                  <form action={logoutAction} className="sm:hidden">
                    <button
                      type="submit"
                      className="rounded-full border border-slate-200 px-4 py-2 text-slate-900 transition hover:border-slate-300 hover:bg-white"
                    >
                      Çıkış
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/giris"
                    className="rounded-full border border-slate-200 px-4 py-2 text-slate-900 transition hover:border-slate-300 hover:bg-white"
                  >
                    Giriş
                  </Link>
                  <Link
                    href="/kayit"
                    className="rounded-full bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
                  >
                    Üye Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
