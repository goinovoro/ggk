import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Printer, Layers, Zap, ShieldCheck, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-gray text-neutral-dark selection:bg-primary/20">
      {/* Hero Section with Vibrant Background */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-52 overflow-hidden">
        {/* Soft Green Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-success-green/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/4 right-[5%] w-[1px] h-[300px] bg-gradient-to-b from-transparent via-primary/30 to-transparent opacity-30 rotate-45" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-widest uppercase mb-8 backdrop-blur-sm shadow-sm">
                <Sparkles size={14} /> Premium DTF Printing Solutions
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] text-neutral-dark">
                Vibrant Prints,<br />
                <span className="text-primary italic">Unmatched</span><br />
                Durability.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                GGK PRINTING menghadirkan teknologi transfer DTF terbaik dengan presisi warna luar biasa dan ketahanan cuci maksimal.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link href="/login">
                  <Button size="lg" className="h-14 px-10 text-lg font-black bg-primary text-white hover:bg-secondary transition-all shadow-lg shadow-primary/25 rounded-full hover:scale-[1.02] active:scale-[0.98]">
                    Mulai Pesanan <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 text-slate-600 font-black cursor-pointer hover:text-primary transition-colors group">
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center bg-white shadow-sm group-hover:border-primary/50 group-hover:shadow transition-all">
                    <ChevronRight size={20} className="text-slate-500 group-hover:text-primary transition-colors" />
                  </div>
                  Lihat Katalog
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md lg:max-w-none">
              {/* Print Configuration Card */}
              <Card className="bg-white border border-slate-200/60 shadow-2xl overflow-hidden rounded-3xl group relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
                <CardHeader className="pb-4 pt-10 px-8">
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/15 shadow-sm">
                        <Printer size={24} />
                     </div>
                     <div className="text-right">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-black block mb-1">Status Sistem</span>
                        <div className="flex items-center justify-end gap-2 bg-bg-tint/70 border border-primary/10 rounded-lg px-2 py-0.5 shadow-sm">
                           <span className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
                           <span className="text-[10px] font-black text-secondary">Ready to Print</span>
                        </div>
                     </div>
                  </div>
                  <CardTitle className="text-2xl font-black text-neutral-dark tracking-tight">Konfigurasi Cetak</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-10 space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-slate-500 font-black tracking-widest">Dimensi (cm)</label>
                      <div className="h-12 w-full bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 text-slate-700 font-mono text-sm font-bold group-hover:border-primary/20 transition-colors shadow-inner">
                        58 x 100
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase text-slate-500 font-black tracking-widest">Jumlah (Meter)</label>
                      <div className="h-12 w-full bg-slate-50 border border-slate-200 rounded-xl flex items-center px-4 text-slate-700 font-mono text-sm font-bold group-hover:border-primary/20 transition-colors shadow-inner">
                        50
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-bg-tint border border-primary/20 space-y-1 shadow-sm">
                    <div className="flex justify-between items-center text-slate-500 text-xs font-bold">
                      <span>Estimasi Harga</span>
                      <span className="text-primary text-[10px] bg-white border border-primary/20 px-2 py-0.5 rounded-full font-black">Diskon 5% Applied</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <span className="text-3xl font-black text-secondary leading-tight">0</span>
                    </div>
                  </div>

                  <Link href="/login" className="block">
                    <Button className="w-full h-14 bg-primary text-white hover:bg-secondary font-black rounded-xl text-lg uppercase tracking-tight shadow-lg shadow-primary/20 transition-all active:scale-[0.98] hover:scale-[1.01]">
                      Konfirmasi & Upload Desain
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Warna Akurat", val: "99.9%" },
            { label: "Wash Durability", val: "50X+" },
            { label: "Pesanan Harian", val: "500+" },
            { label: "Kepuasan", val: "100%" }
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-black text-secondary mb-1.5 leading-none">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative bg-surface-gray">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-neutral-dark mb-6 uppercase tracking-tight">Teknologi <span className="text-primary italic">GGK</span></h2>
            <p className="text-slate-600 text-lg font-medium">
              Kami menggabungkan perangkat keras MUTOH terkemuka dengan sistem manajemen logistik pintar untuk pengalaman pencetakan tanpa hambatan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Precision Mapping", icon: Layers, desc: "Algoritma pemetaan tinta ganda untuk mendapatkan detail terkecil." },
              { title: "Automated Workflow", icon: Zap, desc: "Sistem dispatcher yang otomatis mengatur antrian produksi Anda." },
              { title: "Eco-Friendly Inks", icon: ShieldCheck, desc: "Tinta bersertifikat Oeko-Tex yang aman untuk kulit dan lingkungan." }
            ].map((f) => (
              <Card key={f.title} className="bg-white border border-slate-200/80 hover:bg-bg-tint/40 hover:border-primary/20 transition-all duration-300 p-8 rounded-3xl group cursor-default shadow-md hover:shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-neutral-dark mb-4 italic tracking-tight">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
