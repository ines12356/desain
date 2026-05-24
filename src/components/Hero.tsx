import { ArrowRight, Sparkles, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

interface HeroProps {
  onOrderNow: () => void;
}

export default function Hero({ onOrderNow }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "PROMO SPESIAL HARI INI!",
      subtitle: "Diskon 30% Untuk Semua Paket Makanan",
      badge: "KULINER NUSANTARA & ASIA",
      description: "Nikmati santapan nikmat berkelas dunia langsung dari dapur chef terpercaya kami. Pengiriman kilat, jaminan hangat, dan dikemas dengan aman sampai di depan pintu Anda.",
      actionText: "PESAN SEKARANG",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
      bgColor: "bg-amber-50"
    },
    {
      title: "GRATIS ONGKIR SEJAGAT!",
      subtitle: "Min. Belanja Hanya Rp 50.000",
      badge: "PROMO ONGKOS KIRIM",
      description: "Jangan biarkan biaya pengiriman menghalangi keinginan lapar Anda. Pesan menu makanan berat, minuman dingin, cemilan snack, serta dessert manis favorit bebas ongkir!",
      actionText: "CEK MENU SEBELUM CO",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
      bgColor: "bg-emerald-50"
    },
    {
      title: "KEBAHAGIAAN DALAM SETIAP GIGITAN",
      subtitle: "Premium Cheeseburger & Es Teh Jumbo",
      badge: "PROMO DUET MAUT",
      description: "Lebih hemat 25% dengan memesan Combo Cheeseburger plus Es Teh porsi Jumbo pelepas dahaga hari ini. Sangat pas menemani jam istirahat atau nugas santai.",
      actionText: "PROMO COMBO",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      bgColor: "bg-rose-50"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner main frame */}
        <div className={`relative rounded-3xl overflow-hidden transition-all duration-700 p-8 sm:p-12 lg:p-16 ${slides[activeSlide].bgColor} border border-slate-900/10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[460px]`}>
          
          {/* Decorative background grid pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Slide Text Content */}
          <div className="relative z-10 lg:w-1/2 flex flex-col items-start space-y-5 animate-fade-in text-slate-900">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-amber-400 rounded-full text-xs font-mono font-bold tracking-widest uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              {slides[activeSlide].badge}
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tight leading-tight text-slate-900 italic uppercase">
              {slides[activeSlide].title}
            </h2>
            
            <p className="text-xl sm:text-2xl font-sans font-extrabold text-amber-600 block leading-tight mt-[-5px]">
              {slides[activeSlide].subtitle}
            </p>

            <p className="text-sm sm:text-base text-gray-600 font-sans max-w-lg leading-relaxed pt-1">
              {slides[activeSlide].description}
            </p>

            <div className="pt-4 w-full sm:w-auto">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-sans font-black tracking-widest text-sm rounded-xl border-2 border-slate-900 hover:border-amber-500 transition-all duration-200 active:scale-95 shadow-md flex items-center justify-center gap-3 group"
              >
                <span>{slides[activeSlide].actionText}</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Slide Image Mockup with sketch container resembling original wireframe style */}
          <div className="relative z-10 lg:w-5/12 w-full max-w-md lg:max-w-none flex justify-center">
            <div className="relative p-3 bg-white border-3 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-2xl w-full aspect-4/3 overflow-hidden group">
              <img
                src={slides[activeSlide].image}
                alt={slides[activeSlide].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Floating promotional ribbon */}
              <div className="absolute top-4 right-4 bg-amber-400 text-slate-900 font-mono font-extrabold text-xs px-3 py-1.5 rounded-md border-2 border-slate-900 shadow-sm flex items-center gap-1">
                <Tag className="w-3 h-3 fill-slate-900" />
                DISKON 30%
              </div>
            </div>
          </div>

        </div>

        {/* Carousel indicators & Arrow controls */}
        <div className="flex items-center justify-between mt-6 px-4">
          
          {/* Slide Selection Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`transition-all duration-300 rounded-full border border-slate-900 ${
                  activeSlide === index
                    ? "w-8 h-3 bg-slate-900"
                    : "w-3 h-3 bg-white hover:bg-gray-200"
                }`}
                title={`Buka slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow navigational controllers */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 border border-gray-300 hover:border-slate-900 hover:bg-slate-950 hover:text-white transition-all bg-white rounded-lg text-slate-800"
              title="Slide Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 border border-gray-300 hover:border-slate-900 hover:bg-slate-950 hover:text-white transition-all bg-white rounded-lg text-slate-800"
              title="Slide Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
