// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/actions";
import { absoluteUrl, DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, DEFAULT_TITLE, SITE_URL } from "@/lib/seo";
import ThemeToggle from "@/components/theme-toggle";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Vasıtan.com",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "Vasıtan.com",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl("/og-image.jpg"),
        width: 1200,
        height: 630,
        alt: "Vasıtan.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl("/og-image.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
        <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_top,_rgba(180,198,252,0.65),_rgba(255,255,255,0))]" />
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4">
            <Link href="/" className="text-2xl font-semibold tracking-tight text-slate-900">
              Vasıtan<span className="text-indigo-500">.com</span>
            </Link>
            <div className="flex flex-1 justify-center px-4">
              <form action="/ara" className="relative w-full max-w-xl" method="GET">
                <label htmlFor="global-search" className="sr-only">
                  Ara
                </label>
                <input
                  id="global-search"
                  name="q"
                  type="search"
                  placeholder="Kelime, ilan no, mağaza adı ile ara"
                  className="w-full rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400/60 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                >
                  <path
                    d="M15.5 14h-.79l-.28-.27A6 6 0 1 0 14 15.5l.27.28v.79L20 21.5 21.5 20l-6-6zM10.5 15A4.5 4.5 0 1 1 15 10.5 4.5 4.5 0 0 1 10.5 15z"
                    fill="currentColor"
                  />
                </svg>
              </form>
            </div>
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
                  <ThemeToggle />
                </>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="mt-10 border-t border-slate-200 bg-white/70">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
            <div className="space-y-3">
              <Link href="/" className="text-2xl font-semibold text-slate-900">
                Vasıtan<span className="text-indigo-500">.com</span>
              </Link>
              <p className="text-sm text-slate-600">
                Modern vasıta pazar yeri. Marka ve modele göre filtreleme, güvenli ilan deneyimi.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Keşfet</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <Link className="transition hover:text-slate-900" href="/kategoriler">
                    Kategoriler
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-slate-900" href="/ilan-ver">
                    İlan Ver
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-slate-900" href="/hakkimizda">
                    Hakkımızda
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Destek</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <Link className="transition hover:text-slate-900" href="/iletisim">
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-slate-900" href="/hukuk/kullanim-kosullari">
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link className="transition hover:text-slate-900" href="/hukuk/gizlilik">
                    Gizlilik Politikası
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Bize ulaş</p>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>destek@vasitan.com</p>
                <p>+90 212 000 00 00</p>
                <div className="flex gap-3 pt-2 text-base text-slate-500">
                  <a className="hover:text-indigo-600" href="https://www.instagram.com" target="_blank">
                    IG
                  </a>
                  <a className="hover:text-indigo-600" href="https://www.twitter.com" target="_blank">
                    TW
                  </a>
                  <a className="hover:text-indigo-600" href="https://www.linkedin.com" target="_blank">
                    IN
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 bg-white/80">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500">
              <p>© {new Date().getFullYear()} Vasıtan.com</p>
              <p>Türkiye&apos;nin vasıta ilan platformu</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
