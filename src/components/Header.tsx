import { ShoppingCart, Search, User, Menu, X, Landmark } from "lucide-react";
import React, { useState } from "react";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  activeTab: "home" | "menu" | "promo" | "tentang-kami" | "kontak" | "pelanggan";
  setActiveTab: (tab: "home" | "menu" | "promo" | "tentang-kami" | "kontak" | "pelanggan") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks: { id: typeof activeTab; label: string }[] = [
    { id: "home", label: "HOME" },
    { id: "menu", label: "MENU" },
    { id: "promo", label: "PROMO" },
    { id: "tentang-kami", label: "TENTANG KAMI" },
    { id: "kontak", label: "KONTAK" },
    { id: "pelanggan", label: "ADMIN/PELANGGAN" },
  ];

  const handleLinkClick = (id: typeof activeTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    // Smooth scroll to target sections if on the main page
    if (id !== "pelanggan") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleLinkClick("home")}
            className="flex items-center gap-3 cursor-pointer mr-2 select-none"
          >
            <div className="relative w-12 h-12 border-2 border-slate-900 flex items-center justify-center bg-white overflow-hidden group">
              <div className="absolute inset-0 bg-amber-500 origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              {/* Wireframe-like diagonal divider representation plus elegant font */}
              <div className="absolute w-20 h-[2px] bg-slate-900 rotate-45 transform"></div>
              <Landmark className="relative z-10 w-6 h-6 text-slate-900 group-hover:text-white transition-colors duration-200" />
            </div>
            <div>
              <h1 className="text-xl font-sans font-extrabold tracking-wider text-slate-900 m-0 leading-tight">
                FOOD MARKET
              </h1>
              <span className="text-xs font-mono text-gray-500 block uppercase tracking-widest mt-[-2px]">
                E-Commerce Makanan
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-sans font-medium transition-all duration-200 py-2 px-1 relative ${
                  activeTab === link.id
                    ? "text-amber-600 font-bold"
                    : "text-slate-700 hover:text-amber-500"
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-amber-500 rounded-full animate-fade-in"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Right utility buttons: Search, Profile/Admin, Cart */}
          <div className="flex items-center space-x-3">
            {/* Search inputs */}
            <div className={`relative hidden md:flex items-center transition-all duration-300 ${searchFocused ? "w-64" : "w-48"}`}>
              <input
                type="text"
                placeholder="Cari makanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => {
                  setSearchFocused(true);
                  // switch to menu or home to see the results
                  if (activeTab === "pelanggan" || activeTab === "tentang-kami") {
                    setActiveTab("menu");
                  }
                }}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm font-sans focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-200 bg-gray-50"
              />
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 text-xs font-sans font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Mobile search toggle */}
            <button 
              onClick={() => {
                setActiveTab("menu");
                setTimeout(() => {
                  const el = document.getElementById("search-input-mobile");
                  el?.focus();
                }, 100);
              }}
              className="md:hidden p-2 text-slate-700 hover:text-amber-500 hover:bg-gray-100 rounded-full transition-colors"
              title="Cari makanan"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile/Admin Switch button */}
            <button
              onClick={() => handleLinkClick("pelanggan")}
              className={`p-2.5 rounded-full border transition-all duration-300 relative group flex items-center justify-center ${
                activeTab === "pelanggan"
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "bg-white border-gray-300 text-slate-700 hover:border-amber-400 hover:text-amber-500"
              }`}
              title="Admin & Database Pelanggan"
            >
              <User className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              {/* Notification Badge indicating active status */}
              <span className="absolute top-[-2px] right-[-2.5px] w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
            </button>

            {/* Shopping Cart Pill */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md group"
              title="Buka Keranjang"
            >
              <div className="relative">
                <ShoppingCart className="w-4.5 h-4.5 text-amber-400 group-hover:translate-x-[-2px] transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-[11px] font-mono leading-none flex items-center justify-center p-1 font-bold min-w-4.5 h-4.5 rounded-full border border-slate-900 animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-amber-300">
                ({cartCount})
              </span>
            </button>

            {/* Hamburguer Menu (Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-amber-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-fade-in shadow-inner">
          {/* Mobile search box */}
          <div className="relative mb-4 mt-2">
            <input
              id="search-input-mobile"
              type="text"
              placeholder="Cari menu makanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            <Search className="absolute left-3 top-3 w-4.5 h-4.5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`py-3 px-4 rounded-lg text-sm font-sans font-medium text-left transition-colors ${
                  activeTab === link.id
                    ? "bg-amber-100 text-amber-800 font-bold border-l-4 border-amber-500"
                    : "bg-gray-50 hover:bg-amber-50 text-slate-700 hover:text-amber-600"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
