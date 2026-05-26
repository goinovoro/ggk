"use client"

import { useActionState } from "react"
import { register } from "@/actions/auth"
import { Printer, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, { error: "" })

  return (
    <div className="min-h-screen bg-surface-gray flex items-center justify-center px-4 relative overflow-hidden">
      {/* Soft Green Ambient Backdrops */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-success-green/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="relative z-10 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary mb-4 shadow-sm">
              <Printer size={32} />
            </div>
            <h1 className="text-2xl font-black text-neutral-dark tracking-tighter uppercase">
              GGK <span className="text-primary italic">PRINTING</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Buat akun baru</p>
          </div>

          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold shadow-sm">
                <AlertCircle size={18} className="shrink-0" />
                {state.error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Nama
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nama lengkap"
                className="w-full h-12 bg-slate-55 border border-slate-200 focus:bg-white focus:border-primary/50 text-neutral-dark rounded-xl px-4 text-sm placeholder:text-slate-400 focus:outline-none transition-all shadow-inner font-bold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nama@email.com"
                className="w-full h-12 bg-slate-55 border border-slate-200 focus:bg-white focus:border-primary/50 text-neutral-dark rounded-xl px-4 text-sm placeholder:text-slate-400 focus:outline-none transition-all shadow-inner font-bold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-black text-slate-500 uppercase tracking-widest">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Minimal 6 karakter"
                className="w-full h-12 bg-slate-55 border border-slate-200 focus:bg-white focus:border-primary/50 text-neutral-dark rounded-xl px-4 text-sm placeholder:text-slate-400 focus:outline-none transition-all shadow-inner font-bold"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full h-14 bg-primary hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-xl text-lg uppercase tracking-tight shadow-lg shadow-primary/20 transition-all active:scale-[0.98] cursor-pointer hover:scale-[1.01]"
            >
              {pending ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 font-medium">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary hover:text-secondary font-black transition-colors">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
