import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  Plus,
  MapPin,
  Truck,
  UserPlus
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dispatcher Dashboard | GGK PRINTING",
  description: "Sistem Manajemen Pengiriman Terpadu",
};

const MOCK_ORDERS = [
  { id: "ORD-001", customer: "Budi Santoso", destination: "Jakarta Selatan", status: "PENDING", items: 3, weight: "1.5kg", date: "2024-03-30 10:20" },
  { id: "ORD-002", customer: "Salsa Bila", destination: "Bandung Kota", status: "PACKED", items: 1, weight: "0.5kg", date: "2024-03-30 11:05" },
  { id: "ORD-003", customer: "Anto Wijaya", destination: "Surabaya Timur", status: "DISPATCHED", items: 5, weight: "4.2kg", date: "2024-03-30 09:15" },
  { id: "ORD-004", customer: "Mega Lestari", destination: "Medan Baru", status: "PENDING", items: 2, weight: "2.1kg", date: "2024-03-30 12:30" },
];

export default function DispatcherDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-slate-950 min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">GGK <span className="text-primary italic">Digital</span> LOGISTICS MGMT</h1>
          <p className="text-slate-400 text-sm mt-1">Sistem Manajemen Pengiriman Terpadu Giat Gerak Kreasi</p>
        </div>
        <Button className="font-bold bg-primary hover:bg-secondary text-primary-foreground shadow-lg shadow-primary/20 rounded-full px-6">
          <Plus size={18} className="mr-2" /> Buat Pesanan Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Pesanan", value: "128", icon: <ClipboardList />, color: "bg-primary/20 text-primary border-primary/20" },
          { label: "Menunggu", value: "12", icon: <Clock />, color: "bg-amber-500/20 text-amber-500 border-amber-500/20" },
          { label: "Telah Dikirim", value: "85", icon: <CheckCircle2 />, color: "bg-emerald-500/20 text-emerald-500 border-emerald-500/20" },
          { label: "Masalah", value: "3", icon: <AlertCircle />, color: "bg-rose-500/20 text-rose-500 border-rose-500/20" },
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

      {/* Main Content Area */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl overflow-hidden rounded-3xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6 px-8 pt-8">
          <CardTitle className="text-xl font-bold flex items-center gap-3">
             <div className="w-2 h-6 bg-primary rounded-full" />
             Antrian Pengiriman Aktif
          </CardTitle>
          <div className="flex gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Cari Pesanan/Customer..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary/50 text-white w-64 transition-all" 
              />
            </div>
            <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl">
              <Filter size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-slate-500 uppercase tracking-widest bg-white/[0.02]">
                <tr>
                  <th className="px-8 py-5 font-bold">ID Pesanan</th>
                  <th className="px-6 py-5 font-bold">Pelanggan</th>
                  <th className="px-6 py-5 font-bold"><div className="flex items-center gap-2"><MapPin size={14} /> Destination</div></th>
                  <th className="px-6 py-5 font-bold text-center">Status</th>
                  <th className="px-6 py-5 font-bold text-center">Dispatch Setup</th>
                  <th className="px-8 py-5 font-bold text-right">Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-8 py-5 font-black text-white">{order.id}</td>
                    <td className="px-6 py-5">
                       <div className="font-semibold text-slate-200">{order.customer}</div>
                       <div className="text-[10px] text-slate-500">{order.date}</div>
                    </td>
                    <td className="px-6 py-5 text-slate-400 font-medium">
                       {order.destination}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        order.status === 'PACKED' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                        'bg-primary/10 text-primary border border-primary/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                       <Button size="sm" className="bg-primary hover:bg-secondary text-primary-foreground font-black text-[10px] uppercase tracking-wider rounded-lg h-8 px-4 shadow-lg shadow-primary/10 transition-all active:scale-95">
                          <UserPlus size={12} className="mr-2" /> Assign Driver
                       </Button>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white font-bold text-xs">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
             <p className="text-xs text-slate-500">Showing <span className="text-slate-300 font-bold">4</span> of <span className="text-slate-300 font-bold">128</span> active shipments</p>
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 border-white/10 bg-white/5 text-xs text-slate-400" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="h-8 border-white/10 bg-white/5 text-xs text-slate-300">Next Page</Button>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
