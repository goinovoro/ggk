import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Monitor,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Printer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Operator Terminal | GGK PRINTING",
  description: "Pemantauan Produksi & Antrian Cetak",
};

const PRINT_QUEUE = [
  { id: "JOB-001", orderId: "ORD-001", design: "Ayam Lengkuas V2", status: "PRINTING", progress: 68, sheets: "48/70" },
  { id: "JOB-002", orderId: "ORD-004", design: "Tepung Segitiga", status: "QUEUED", progress: 0, sheets: "0/40" },
  { id: "JOB-003", orderId: "ORD-002", design: "Gopay Pai X1", status: "QUEUED", progress: 0, sheets: "0/25" },
  { id: "JOB-004", orderId: "ORD-005", design: "Sambal Premium", status: "COMPLETED", progress: 100, sheets: "60/60" },
];

export default function OperatorDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-slate-950 min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">GGK <span className="text-primary italic">Operator</span> Terminal</h1>
          <p className="text-slate-400 text-sm mt-1">Pemantauan Produksi & Antrian Cetak</p>
        </div>
        <div className="flex gap-3">
          <Button className="font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 rounded-xl px-6">
            <Play size={18} className="mr-2" /> Mulai Produksi
          </Button>
          <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">
            <Pause size={18} className="mr-2" /> Jeda
          </Button>
        </div>
      </div>

      {/* Machine Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Status Mesin", value: "Operational", icon: <Monitor />, color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/20" },
          { label: "Cetak Hari Ini", value: "47", icon: <Printer />, color: "bg-primary/20 text-primary border-primary/20" },
          { label: "Antrian", value: "3", icon: <Clock />, color: "bg-amber-500/20 text-amber-500 border-amber-500/20" },
          { label: "Selesai", value: "128", icon: <CheckCircle2 />, color: "bg-blue-500/20 text-blue-500 border-blue-500/20" },
        ].map((stat, i) => (
          <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-2xl border ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <h2 className="text-3xl font-black text-white">{stat.value}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Print Queue */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden rounded-3xl">
        <CardHeader className="border-b border-white/5 pb-6 px-8 pt-8">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
            <div className="w-2 h-6 bg-primary rounded-full" />
            Antrian Cetak Aktif
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PRINT_QUEUE.map((job) => (
              <Card key={job.id} className={`bg-white/[0.02] border-white/10 overflow-hidden rounded-2xl ${job.status === 'PRINTING' ? 'ring-2 ring-primary/20' : ''}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{job.id}</span>
                        <span className="text-xs text-slate-500 font-mono">{job.orderId}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{job.design}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      job.status === 'PRINTING' ? 'bg-primary/20 text-primary border border-primary/20' :
                      job.status === 'QUEUED' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/20' :
                      'bg-emerald-500/20 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span>{job.sheets} lembar</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          job.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-primary'
                        }`}
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
                    {job.status === 'PRINTING' && (
                      <Button size="sm" className="bg-rose-500/20 text-rose-500 hover:bg-rose-500/30 border border-rose-500/20 font-black text-[10px] uppercase tracking-wider rounded-lg h-8 px-4">
                        <Pause size={12} className="mr-2" /> Hentikan
                      </Button>
                    )}
                    {job.status === 'QUEUED' && (
                      <Button size="sm" className="bg-primary hover:bg-secondary text-primary-foreground font-black text-[10px] uppercase tracking-wider rounded-lg h-8 px-4">
                        <Play size={12} className="mr-2" /> Mulai Cetak
                      </Button>
                    )}
                    {job.status === 'COMPLETED' && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold">
                        <CheckCircle2 size={14} /> Selesai
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h4 className="font-bold text-white">Tinta Yellow Hampir Habis</h4>
            <p className="text-sm text-slate-400">Sisa tinta yellow: 12%. Segera lakukan penggantian cartridge.</p>
          </div>
        </div>
        <Button variant="ghost" className="text-amber-500 hover:bg-amber-500/10 font-bold">
          Cek Stok Tinta
        </Button>
      </div>
    </div>
  );
}
