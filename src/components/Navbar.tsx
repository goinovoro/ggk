import { LayoutDashboard, Printer, Truck, Monitor, UserCircle, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { verifySession } from '@/lib/auth'
import { logout } from '@/actions/auth'

export default async function Navbar() {
  const session = await verifySession()

  return (
    <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <Printer className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-xl font-black text-neutral-dark tracking-tighter">
                GGK <span className="text-primary italic">PRINTING</span>
              </span>
            </Link>
            {session && (
              <div className="hidden md:flex gap-6 text-sm font-bold text-slate-600">
                {session.role !== 'CUSTOMER' ? (
                  <Link href="/dashboard/ops" className="hover:text-primary transition-colors flex items-center gap-2">
                    <LayoutDashboard size={16} /> Ops Center
                  </Link>
                ) : (
                  <Link href="/dashboard/customer" className="hover:text-primary transition-colors flex items-center gap-2">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm font-semibold text-slate-600 hidden sm:block">{session.name || session.email}</span>
                <form action={logout}>
                  <Button type="submit" size="sm" variant="ghost" className="text-slate-500 hover:text-primary hover:bg-slate-100 font-bold rounded-xl transition-all">
                    <LogOut className="mr-2 h-4 w-4" /> Keluar
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">
                  Masuk
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-primary text-white hover:bg-secondary font-black rounded-xl shadow-md shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <UserCircle className="mr-2 h-4 w-4" /> Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
