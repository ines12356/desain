import React from "react";
import { Utensils, CupSoda, Cookie, IceCream } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  
  const categories = [
    {
      id: "Semua",
      label: "LIHAT SEMUA",
      icon: Utensils,
      color: "border-slate-800 text-slate-950",
      activeBg: "bg-slate-100",
      count: "9 Menu"
    },
    {
      id: "Makanan Berat",
      label: "MAKANAN BERAT",
      icon: Utensils,
      color: "border-amber-800 text-amber-950",
      activeBg: "bg-amber-100",
      count: "3 Menu"
    },
    {
      id: "Minuman",
      label: "MINUMAN",
      icon: CupSoda,
      color: "border-blue-800 text-blue-950",
      activeBg: "bg-blue-100",
      count: "1 Menu"
    },
    {
      id: "Snack",
      label: "SNACK",
      icon: Cookie,
      color: "border-orange-850 text-orange-950",
      activeBg: "bg-orange-100",
      count: "3 Menu"
    },
    {
      id: "Dessert",
      label: "DESSERT",
      icon: IceCream,
      color: "border-pink-800 text-pink-950",
      activeBg: "bg-pink-100",
      count: "2 Menu"
    }
  ];

  return (
    <section className="py-8 bg-white" id="kategori">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-sans font-black tracking-widest text-slate-900 border-l-4 border-amber-500 pl-3 uppercase">
            KATEGORI MENU
          </h3>
          <button 
            onClick={() => onSelectCategory("Semua")}
            className="text-xs font-mono font-bold text-gray-500 hover:text-amber-600 transition-colors flex items-center gap-1 group"
          >
            Lihat Semua <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>

        {/* Categories Grid - mimics the sketch representation of the mockup */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`relative p-5 flex flex-col items-center justify-center border-2 rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isSelected
                    ? `${cat.activeBg} border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]`
                    : "border-gray-200 hover:border-slate-900 bg-white hover:shadow-md"
                }`}
              >
                {/* Mimic wireframe simple outlines */}
                <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center mb-3 bg-gray-50/50 relative">
                  <Icon className={`w-6 h-6 ${isSelected ? "text-slate-900 scale-110" : "text-gray-500"} transition-all duration-200`} />
                  {isSelected && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-amber-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                <span className="text-xs sm:text-sm font-sans font-extrabold tracking-wider text-slate-800 text-center uppercase">
                  {cat.label}
                </span>
                
                <span className="text-[10px] font-mono text-gray-400 mt-1 uppercase">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
