import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GGK PRINTING | Vibrant DTF Transfers",
  description: "High-quality DTF printing and logistics management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/5 py-12 bg-dark-footer text-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 tracking-tighter">GGK <span className="text-primary italic">PRINTING</span></h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto md:mx-0">Vibrant Prints, Unmatched Durability. Solusi pencetakan DTF profesional Anda.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-300">Layanan</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li className="hover:text-primary transition-colors cursor-pointer">DTF Transfers</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Apparel Printing</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Custom Design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-300">Kontak</h4>
              <p className="text-slate-400 text-sm">info@ggk-printing.co.id</p>
              <div className="mt-4 flex justify-center md:justify-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <div className="w-4 h-4 bg-primary rounded-sm" />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-slate-500">
            &copy; 2026 Giat Gerak Kreasi (GGK). Semua Hak Dilindungi.
          </div>
        </footer>
      </body>
    </html>
  );
}
