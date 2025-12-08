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

  return (
    <html lang="tr">
      <body className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-700">
              Vasıtan<span className="text-gray-800">.com</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Anasayfa
              </Link>
              <Link href="/ilan-ver" className="text-gray-700 hover:text-blue-600">
                İlan Ver
              </Link>
              {user ? (
                <>
                  <Link href="/panel/ilanlarim" className="text-gray-700 hover:text-blue-600">
                    Panelim
                  </Link>
                  <span className="text-gray-500 hidden sm:inline">
                    {user.name ?? user.email}
                  </span>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Çıkış
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/giris" className="text-gray-700 hover:text-blue-600">
                    Giriş Yap
                  </Link>
                  <Link href="/kayit" className="text-gray-700 hover:text-blue-600">
                    Üye Ol
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
