import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Search,
  ScanBarcode,
  History,
  AlertTriangle,
  ChevronRight,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Packer Center | GGK PRINTING",
  description: "Terminal Manajemen Pengepakan & Inventaris",
};

const PACKING_TASKS = [
  { id: "PK-1201", orderId: "ORD-001", items: ["Ayam Lengkuas x2", "Sambal x1"], status: "IN_PROGRESS", priority: "HIGH", customer: "Budi Santoso" },
  { id: "PK-1202", orderId: "ORD-004", items: ["Tepung Segitiga x4"], status: "PENDING", priority: "NORMAL", customer: "Mega Lestari" },
  { id: "PK-1198", orderId: "ORD-002", items: ["Gopay Pai x1"], status: "COMPLETED", priority: "LOW", customer: "Salsa Bila" },
];

export default function PackerDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-slate-950 min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">GGK <span className="text-primary italic">Packer</span> CENTER</h1>
          <p className="text-slate-400 text-sm mt-1">Terminal Manajemen Pengepakan & Inventaris</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">
               <History size={18} className="mr-2" /> Riwayat
            </Button>
            <Button className="font-black bg-primary hover:bg-secondary text-primary-foreground shadow-lg shadow-primary/20 rounded-xl px-6">
               <ScanBarcode size={18} className="mr-2" /> Pindai Barcode
            </Button>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {PACKING_TASKS.map((task) => (
          <Card key={task.id} className={`bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden rounded-3xl transition-all hover:border-primary/30 ${task.status === 'IN_PROGRESS' ? 'ring-2 ring-primary/20 bg-primary/[0.02]' : ''}`}>
             <div className="absolute top-0 right-0 p-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  task.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-500 border border-rose-500/20' : 'bg-slate-500/20 text-slate-400 border border-white/5'
                }`}>
                  {task.priority} Priority
                </span>
             </div>
             
             <CardHeader className="flex flex-row items-center gap-4 pb-4 pt-8 px-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${task.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-primary/20 text-primary'}`}>
                  <Package size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                     <CardTitle className="text-xl font-bold text-white">{task.id}</CardTitle>
                     <span className="text-slate-500 text-xs font-mono">{task.orderId}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">Customer: {task.customer}</p>
                </div>
             </CardHeader>
             
             <CardContent className="px-8 pb-8 pt-4">
                <div className="space-y-6">
                   <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <ChevronRight size={12} className="text-primary" /> Item Checklist
                     </p>
                     <ul className="space-y-3">
                       {task.items.map((item, idx) => (
                         <li key={idx} className="flex items-center gap-3 text-sm text-slate-300 font-medium">
                           <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center shrink-0">
                              {task.status === 'COMPLETED' && <CheckCircle2 size={10} className="text-emerald-500" />}
                           </div>
                           {item}
                         </li>
                       ))}
                     </ul>
                   </div>
                   
                   <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${task.status === 'COMPLETED' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse'}`} />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">{task.status.replace('_', ' ')}</span>
                     </div>
                     
                     {task.status !== 'COMPLETED' ? (
                        <Button className="bg-primary hover:bg-secondary text-primary-foreground font-black text-xs uppercase tracking-tight rounded-xl h-11 px-6 shadow-xl shadow-primary/10 transition-all active:scale-[0.98]">
                           Selesaikan Pesanan
                        </Button>
                     ) : (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest">
                           <CheckCircle2 size={16} /> Verified & Packed
                        </div>
                     )}
                   </div>
                </div>
             </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Alert Banner for Pending Tasks */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between group">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500">
               <AlertTriangle size={24} />
            </div>
            <div>
               <h4 className="font-bold text-white">Perhatian: Antrian Menumpuk</h4>
               <p className="text-sm text-slate-400">Terdapat 5 pesanan prioritas tinggi yang memerlukan tindakan segera.</p>
            </div>
         </div>
         <Button variant="ghost" className="text-amber-500 hover:bg-amber-500/10 font-bold">
            Lihat Semua <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
         </Button>
      </div>
    </div>
  );
}
