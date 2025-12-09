// app/kayit/page.tsx
import Link from "next/link";
import { registerAction } from "@/lib/actions";

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";

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
    <div className="space-y-6">
      <section className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Kayıt</p>
        <h1 className="text-3xl font-semibold text-slate-900">Vasıtan.com hesabı oluştur</h1>
        <p className="text-sm text-slate-600">
          İlan ver, favori araçlarını kaydet ve yeni ilan bildirimleri al.
        </p>
      </section>

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form
        action={registerAction}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm md:max-w-2xl md:mx-auto"
      >
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Ad Soyad
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Adınızı yazın"
            className={fieldClass}
          />
        </div>

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
          <label htmlFor="phone" className="text-sm font-medium text-slate-700">
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="5xx xxx xx xx"
            className={fieldClass}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
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

          <div className="space-y-1.5">
            <label htmlFor="passwordConfirm" className="text-sm font-medium text-slate-700">
              Şifre (tekrar)
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              placeholder="••••••••"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="text-xs text-slate-500 leading-relaxed">
          Kayıt olarak{" "}
          <a className="text-indigo-600 hover:underline" href="/hukuk/kullanim-kosullari">
            Kullanım Koşulları
          </a>{" "}
          ve{" "}
          <a className="text-indigo-600 hover:underline" href="/hukuk/gizlilik">
            Gizlilik Politikası
          </a>
          nı kabul etmiş olursunuz.
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Hesap Oluştur
        </button>
      </form>

      <div className="text-center text-sm text-slate-600">
        Zaten hesabın var mı?{" "}
        <Link className="font-semibold text-indigo-600 hover:text-indigo-700" href="/giris">
          Giriş yap
        </Link>
      </div>
    </div>
  );
}
