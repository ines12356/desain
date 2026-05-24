import React from "react";
import { Truck, ShieldCheck, Clock, Box } from "lucide-react";

export default function Benefits() {
  
  const advantages = [
    {
      icon: Truck,
      title: "GRATIS ONGKIR",
      desc1: "Min. belanja",
      desc2: "Rp 50.000",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: ShieldCheck,
      title: "PEMBAYARAN AMAN",
      desc1: "100% Transaksi",
      desc2: "terlindungi",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: Clock,
      title: "PENGIRIMAN CEPAT",
      desc1: "Sampai dalam",
      desc2: "15-30 Menit",
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      icon: Box,
      title: "PACKAGING AMAN",
      desc1: "Makanan dikemas",
      desc2: "dengan aman",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-8 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          
          {advantages.map((item, id) => {
            const Icon = item.icon;
            return (
              <div 
                key={id}
                className="p-5 flex items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-xs hover:border-slate-900 transition-colors duration-200"
              >
                {/* Icon Wrapper Circle */}
                <div className={`p-3 rounded-lg ${item.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                
                {/* Copy */}
                <div>
                  <h5 className="text-xs sm:text-sm font-sans font-black tracking-wider text-slate-800 uppercase leading-tight">
                    {item.title}
                  </h5>
                  <p className="text-xs text-gray-500 font-sans mt-0.5 leading-tight">
                    {item.desc1} <br/>
                    <span className="font-semibold text-slate-700">{item.desc2}</span>
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
