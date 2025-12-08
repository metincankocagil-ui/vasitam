// app/giris/page.tsx
import Link from "next/link";
import { loginAction } from "@/lib/actions";

const errorMessages: Record<string, string> = {
  missing: "E-posta ve şifre zorunludur.",
  invalid: "E-posta veya şifre hatalı.",
};

interface LoginPageProps {
  searchParams?: { error?: string };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const errorKey = searchParams?.error ?? "";
  const errorMessage = errorKey ? errorMessages[errorKey] ?? "Giriş yapılamadı." : "";

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Giriş Yap</h1>
        <p className="text-sm text-gray-600">
          Hesabınıza giriş yaparak ilanlarınızı yönetin.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}

      <form action={loginAction} className="bg-white rounded-lg shadow p-6 space-y-4">
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              name="remember"
              className="w-4 h-4 rounded border-gray-300"
            />
            Beni hatırla
          </label>
          <Link className="text-blue-600 hover:underline" href="/sifre-sifirla">
            Şifremi Unuttum
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded py-2 text-sm"
        >
          Giriş Yap
        </button>
      </form>

      <div className="text-center text-sm text-gray-600">
        Henüz hesabın yok mu?{" "}
        <Link className="text-blue-600 font-medium hover:underline" href="/kayit">
          Kayıt ol
        </Link>
      </div>
    </div>
  );
}
