import React from "react";
import { MenuItem } from "../types";
import { Star, Plus, Check } from "lucide-react";

interface ProductCardProps {
  key?: string | number;
  product: MenuItem;
  onAddToCart: (product: MenuItem) => void;
  cartQty: number;
}

export default function ProductCard({
  product,
  onAddToCart,
  cartQty,
}: ProductCardProps) {
  
  // Format price helper (Format to Indonesian Rupiah, e.g., Rp 25.000)
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value).replace("IDR", "Rp");
  };

  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all duration-300 flex flex-col group h-full">
      
      {/* Product Image Panel */}
      <div className="relative aspect-4/3 bg-gray-100 overflow-hidden border-b-2 border-slate-900">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Wireframe-like cross sketch guidelines overlay representing the original mockup crosses if hovered */}
        <div className="absolute inset-0 border border-slate-900/10 pointer-events-none"></div>

        {/* Rating chip */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-md border border-slate-900 text-[11px] font-sans font-bold flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span>{product.rating}</span>
        </div>

        {/* Category label wrapper */}
        <span className="absolute top-3 right-3 bg-slate-900 text-white text-[10px] font-mono tracking-widest px-2 py-1 rounded-sm uppercase">
          {product.category}
        </span>
      </div>

      {/* Product Card Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-base font-sans font-black tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors uppercase">
            {product.name}
          </h4>
          
          <p className="text-xs text-gray-500 font-sans mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Pesan button frame */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider leading-none">
              Harga Satuan
            </span>
            <span className="text-base font-sans font-black text-rose-600 tracking-tight block mt-0.5">
              {formatRupiah(product.price)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-5 py-2.5 rounded-lg font-sans font-bold text-xs tracking-wider border-2 transition-all duration-200 flex items-center gap-1.5 active:scale-95 cursor-pointer ${
              cartQty > 0
                ? "bg-amber-500 border-amber-500 text-white shadow-xs"
                : "bg-white border-slate-900 text-slate-900 hover:bg-slate-950 hover:text-white"
            }`}
          >
            {cartQty > 0 ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
                <span>PESAN ({cartQty})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3px]" />
                <span>PESANAN</span>
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}
