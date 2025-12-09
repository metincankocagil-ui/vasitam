// app/giris/page.tsx
import Link from "next/link";
import { loginAction } from "@/lib/actions";

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";

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
    <div className="space-y-6">
      <section className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Giriş</p>
        <h1 className="text-3xl font-semibold text-slate-900">Hesabınıza giriş yapın</h1>
        <p className="text-sm text-slate-600">
          Kayıtlı ilanlarınızı yönetin, yeni ilan yayınlayın ve favorilerinizi takip edin.
        </p>
      </section>

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form
        action={loginAction}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:max-w-xl md:mx-auto"
      >
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="ornek@vasitan.com"
            className={fieldClass}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className={fieldClass}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Beni hatırla
          </label>
          <Link className="text-indigo-600 hover:underline" href="/sifre-sifirla">
            Şifremi unuttum
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Giriş Yap
        </button>
      </form>

      <div className="text-center text-sm text-slate-600">
        Henüz hesabın yok mu?{" "}
        <Link className="font-semibold text-indigo-600 hover:text-indigo-700" href="/kayit">
          Kayıt ol
        </Link>
      </div>
    </div>
  );
}
