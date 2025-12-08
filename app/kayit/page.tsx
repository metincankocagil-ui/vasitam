// app/kayit/page.tsx
import Link from "next/link";
import { registerAction } from "@/lib/actions";

const errorMessages: Record<string, string> = {
  missing: "Lütfen gerekli alanları doldurun.",
  password: "Şifreler eşleşmiyor.",
  exists: "Bu e-posta ile zaten bir hesap var.",
};

interface RegisterPageProps {
  searchParams?: { error?: string };
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const errorKey = searchParams?.error ?? "";
  const errorMessage = errorKey ? errorMessages[errorKey] ?? "İşlem gerçekleştirilemedi." : "";

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Hesap Oluştur</h1>
        <p className="text-sm text-gray-600">
          İlan vermek veya favori araçları takip etmek için ücretsiz hesap
          oluşturun.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}

      <form action={registerAction} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Ad Soyad
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Adınızı yazın"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="ornek@vasitan.com"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="5xx xxx xx xx"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-gray-700"
            >
              Şifre (tekrar)
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="text-xs text-gray-500 leading-relaxed">
          Kayıt olarak{" "}
          <a
            className="text-blue-600 hover:underline"
            href="/hukuk/kullanim-kosullari"
          >
            Kullanım Koşulları
          </a>{" "}
          ve{" "}
          <a
            className="text-blue-600 hover:underline"
            href="/hukuk/gizlilik"
          >
            Gizlilik Politikası
          </a>
          nı kabul etmiş olursunuz.
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded py-2 text-sm"
        >
          Hesap Oluştur
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Zaten hesabın var mı?{" "}
        <Link className="text-blue-600 font-medium hover:underline" href="/giris">
          Giriş yap
        </Link>
      </div>
    </div>
  );
}
