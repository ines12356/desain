import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import Benefits from "./components/Benefits";
import CartModal from "./components/CartModal";
import CustomerAdmin from "./components/CustomerAdmin";
import Chatbot from "./components/Chatbot";

import { MenuItem, Customer, Order, OrderItem } from "./types";
import { INITIAL_MENU, INITIAL_CUSTOMERS } from "./data";
import { 
  Instagram, Facebook, Phone, MapPin, ShieldCheck, Mail, Sparkles, Heart, ArrowUp 
} from "lucide-react";

const LOCAL_STORAGE_CUSTOMERS = "foodmarket_customers_db";
const LOCAL_STORAGE_ORDERS = "foodmarket_orders_db";

export default function App() {
  // Navigation & Page Selection state
  const [activeTab, setActiveTab] = useState<"home" | "menu" | "promo" | "tentang-kami" | "kontak" | "pelanggan">("home");
  
  // Storage State Arrays
  const [menuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Shopping Cart Quantity index (menuItemId -> quantity)
  const [cartItems, setCartItems] = useState<{ [id: string]: number }>({});
  
  // UI toggles
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Initialize DB data loads from localstorage
  useEffect(() => {
    const loadedCustomers = localStorage.getItem(LOCAL_STORAGE_CUSTOMERS);
    const loadedOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS);

    if (loadedCustomers) {
      setCustomers(JSON.parse(loadedCustomers));
    } else {
      setCustomers(INITIAL_CUSTOMERS);
      localStorage.setItem(LOCAL_STORAGE_CUSTOMERS, JSON.stringify(INITIAL_CUSTOMERS));
    }

    if (loadedOrders) {
      setOrders(JSON.parse(loadedOrders));
    } else {
      // Seed a couple of historical orders linked to our seed customers to populate dashboard beautifully
      const seedOrders: Order[] = [
        {
          id: "ORD-99882",
          customerId: "cust-1",
          customerName: "Inestrisan Harianja",
          items: [
            { menuItemId: "prod-1", name: "Nasi Goreng Special", qty: 2, price: 25000 },
            { menuItemId: "prod-3", name: "Es Teh Jumbo", qty: 2, price: 6000 }
          ],
          totalPrice: 43400, // (50000 + 12000 = 62000 - 30% discount = 43400)
          orderDate: "14 Mei 2026, 12:44",
          status: "Selesai",
          deliveryAddress: "Jl. Kuliner Raya No. 124, Jakarta Barat",
          phone: "0812-3456-7890"
        },
        {
          id: "ORD-11234",
          customerId: "cust-3",
          customerName: "Siti Rahma",
          items: [
            { menuItemId: "prod-4", name: "Cheeseburger", qty: 1, price: 18000 },
            { menuItemId: "prod-8", name: "Es Campur Segar", qty: 1, price: 12000 }
          ],
          totalPrice: 21000, // after 30% discount + shipping
          orderDate: "19 Mei 2026, 18:02",
          status: "Diproses",
          deliveryAddress: "Perumahan Indah Gg. Damai No. 8, Tangerang",
          phone: "0813-4455-6677"
        }
      ];
      setOrders(seedOrders);
      localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(seedOrders));
    }
  }, []);

  // Monitor Scroll Position for Arrow back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync state helpers to persistent Storage
  const saveCustomersToStorage = (updatedList: Customer[]) => {
    setCustomers(updatedList);
    localStorage.setItem(LOCAL_STORAGE_CUSTOMERS, JSON.stringify(updatedList));
  };

  const saveOrdersToStorage = (updatedList: Order[]) => {
    setOrders(updatedList);
    localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(updatedList));
  };

  // shopping cart state mutation handlers
  const handleAddToCart = (product: MenuItem) => {
    setCartItems((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1
    }));
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      const currentQty = prev[itemId] || 0;
      const targetQty = currentQty + delta;
      
      if (targetQty <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      
      return {
        ...prev,
        [itemId]: targetQty
      };
    });
  };

  const handleClearCart = () => {
    setCartItems({});
  };

  const totalCartCount = (Object.values(cartItems) as number[]).reduce((sum, qty) => sum + qty, 0);

  // checkout callback - links checkout items to persistent orders and updates customer summaries
  const handleAddOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: OrderItem[];
    totalPrice: number;
    deliveryAddress: string;
    phone: string;
  }) => {
    
    // 1. Resolve matching customer in database or register as a fresh face
    let targetCustomer = customers.find(
      (c) => c.email.toLowerCase() === orderData.customerEmail.toLowerCase()
    );

    let updatedCustomers = [...customers];
    let resolvedCustomerId = "";

    if (targetCustomer) {
      // Match found! Increment statistics
      updatedCustomers = customers.map((c) => {
        if (c.id === targetCustomer!.id) {
          resolvedCustomerId = c.id;
          return {
            ...c,
            totalOrders: c.totalOrders + 1,
            totalSpend: c.totalSpend + orderData.totalPrice,
            // update phone/address if newer
            phone: orderData.customerPhone,
            address: orderData.customerAddress
          };
        }
        return c;
      });
    } else {
      // No match! Register a new Customer
      const newId = `cust-${Date.now()}`;
      resolvedCustomerId = newId;

      const newCust: Customer = {
        id: newId,
        name: orderData.customerName,
        email: orderData.customerEmail,
        phone: orderData.customerPhone,
        address: orderData.customerAddress,
        joinedDate: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }),
        totalOrders: 1,
        totalSpend: orderData.totalPrice,
        notes: "Profil terdaftar otomatis via checkout keranjang."
      };
      
      updatedCustomers.push(newCust);
    }

    // Save Customers database updates
    saveCustomersToStorage(updatedCustomers);

    // 2. Generate new transactional order log
    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      customerId: resolvedCustomerId,
      customerName: orderData.customerName,
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      orderDate: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }) + `, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      status: "Diproses",
      deliveryAddress: orderData.deliveryAddress,
      phone: orderData.phone
    };

    saveOrdersToStorage([newOrder, ...orders]);
  };

  // Admin Panel: Add a customer manually
  const handleAddCustomerAdmin = (custData: Omit<Customer, "id" | "joinedDate" | "totalOrders" | "totalSpend">) => {
    const newCust: Customer = {
      ...custData,
      id: `cust-${Date.now()}`,
      joinedDate: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }),
      totalOrders: 0,
      totalSpend: 0
    };
    saveCustomersToStorage([...customers, newCust]);
  };

  // Admin Panel: Edit a customer manually
  const handleEditCustomerAdmin = (updatedCust: Customer) => {
    const updated = customers.map((c) => (c.id === updatedCust.id ? updatedCust : c));
    saveCustomersToStorage(updated);
  };

  // Admin Panel: Delete customer profile
  const handleDeleteCustomerAdmin = (customerId: string) => {
    const updated = customers.filter((c) => c.id !== customerId);
    saveCustomersToStorage(updated);
    
    // For transactional protection, keep order logs but detach customer link ID
    const detachedOrders = orders.map((o) => {
      if (o.customerId === customerId) {
        return { ...o, customerId: "guest" };
      }
      return o;
    });
    saveOrdersToStorage(detachedOrders);
  };

  // Admin Panel: Order lifecycle status state updates (Mark Selesai or Dibatalkan)
  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    // Recalculate customer metrics if canceling a previously processed transaction
    if (status === "Dibatalkan" && targetOrder.status !== "Dibatalkan") {
      const originalPrice = targetOrder.totalPrice;
      const associatedCustId = targetOrder.customerId;

      if (associatedCustId !== "guest") {
        const adjustedCustomers = customers.map((c) => {
          if (c.id === associatedCustId) {
            return {
              ...c,
              totalOrders: Math.max(0, c.totalOrders - 1),
              totalSpend: Math.max(0, c.totalSpend - originalPrice)
            };
          }
          return c;
        });
        saveCustomersToStorage(adjustedCustomers);
      }
    }

    // Recalculate back if moving back from Dibatalkan to something else
    if (targetOrder.status === "Dibatalkan" && status !== "Dibatalkan") {
      const associatedCustId = targetOrder.customerId;
      if (associatedCustId !== "guest") {
        const adjustedCustomers = customers.map((c) => {
          if (c.id === associatedCustId) {
            return {
              ...c,
              totalOrders: c.totalOrders + 1,
              totalSpend: c.totalSpend + targetOrder.totalPrice
            };
          }
          return c;
        });
        saveCustomersToStorage(adjustedCustomers);
      }
    }

    // Apply main order status transition
    const updatedOrdersList = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    saveOrdersToStorage(updatedOrdersList);
  };

  // catalog search filters
  const filteredCatalog = menuItems.filter((item) => {
    const matchCategory = selectedCategory === "Semua" ? true : item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleOrderNowScroll = () => {
    setActiveTab("menu");
    const element = document.getElementById("kategori");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white selection:bg-amber-100 selection:text-amber-800">
      
      {/* 1. Header component */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* 2. Main Site Switchboard */}
      <main className="flex-1">
        {activeTab === "pelanggan" ? (
          
          /* VIEW A: ELITE CRM CUSTOMER ADMIN PORTAL */
          <div className="animate-fade-in">
            <CustomerAdmin
              customers={customers}
              orders={orders}
              onAddCustomer={handleAddCustomerAdmin}
              onEditCustomer={handleEditCustomerAdmin}
              onDeleteCustomer={handleDeleteCustomerAdmin}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          </div>

        ) : (
          
          /* VIEW B: RESTAURANT ONLINE STOREFRONT */
          <div className="animate-fade-in divide-y divide-gray-100">
            
            {/* Carousel Banner Slider */}
            <div id="home">
              <Hero onOrderNow={handleOrderNowScroll} />
            </div>

            {/* Menu categories selections */}
            <div id="menu">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Food items inventory showcase grid */}
            <section className="py-12 bg-gray-50/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Search result header indicators */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-sans font-black tracking-widest text-slate-900 uppercase">
                      PRODUK UNGGULAN
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-0.5 uppercase">
                      {selectedCategory} • {filteredCatalog.length} Menu Tersedia
                    </p>
                  </div>
                  
                  {/* Category resets */}
                  {selectedCategory !== "Semua" && (
                    <button
                      onClick={() => setSelectedCategory("Semua")}
                      className="px-4 py-1.5 bg-slate-900 border border-slate-900 hover:bg-slate-800 transition-colors text-white font-sans font-bold text-xs rounded-lg uppercase cursor-pointer"
                    >
                      Reset Kategori ×
                    </button>
                  )}
                </div>

                {/* Catalog Card Grids */}
                {filteredCatalog.length === 0 ? (
                  <div className="py-20 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl bg-white">
                    <p className="font-sans font-bold text-base">Hidangan tidak ditemukan.</p>
                    <p className="text-xs mt-1">Coba gunakan kata kunci pencarian menu lainnya!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {filteredCatalog.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        cartQty={cartItems[product.id] || 0}
                      />
                    ))}
                  </div>
                )}

              </div>
            </section>

            {/* Support trust benefits block */}
            <Benefits />

            {/* ABOUT OUR TEAM "TENTANG KAMI" */}
            <section className="py-16 bg-white" id="tentang-kami">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Image Grid with sketch outline border */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative p-3 bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] rounded-2xl max-w-sm w-full font-mono text-center">
                      <img
                        src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80"
                        alt="Restoran Food Market"
                        referrerPolicy="no-referrer"
                        className="w-full h-80 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="p-3 bg-slate-950 text-white rounded-lg mt-3 text-xs tracking-wider font-extrabold uppercase">
                        CELEBRATING 20 YEARS OF TASTE
                      </div>
                    </div>
                  </div>

                  {/* Informational description Copy */}
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
                    <span className="text-xs font-mono font-bold text-amber-600 block bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-sm w-fit uppercase">
                      TENTANG KAMI
                    </span>
                    
                    <h3 className="text-2xl sm:text-3.5xl font-sans font-black tracking-tight leading-none text-slate-900 uppercase">
                      TEMPAT TERBAIK UNTUK MENIKMATI KULINER BERKELAS DAN HIGIENIS
                    </h3>

                    <p className="text-sm text-gray-600 font-sans leading-relaxed">
                      Didirikan sebagai bentuk dedikasi tinggi bagi para penggemar kuliner nusantara, <strong>Food Market</strong> menyajikan aneka olahan berkualitas mulai dari menu makanan berat menggoda selera, kudapan snack bersahabat, hingga dessert manis penyegar riang gembira.
                    </p>

                    <p className="text-sm text-gray-500 font-sans leading-relaxed">
                      Kami berkomitmen memprioritaskan rasa higienis pada setiap hidangan dapur terukur, mengirim secara kilat terproteksi segel aman (15-30 Menit), serta memelihara relasi andal pelanggan lewat modul integrasi database andalan ini.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-gray-200">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                        <span className="text-xs font-sans font-black text-slate-800">Bahan 100% Organik</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <span className="text-xs font-sans font-black text-slate-800">Dapur Chef Berbintang</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          </div>
        )}
      </main>

      {/* 3. Footer Section */}
      <footer className="bg-slate-950 text-gray-400 pt-16 pb-8 font-sans border-t-2 border-slate-900" id="kontak">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
            
            {/* Brand and Description Info */}
            <div className="lg:col-span-4 space-y-4">
              <div onClick={() => setActiveTab("home")} className="flex items-center gap-2 cursor-pointer select-none">
                <div className="w-10 h-10 border-2 border-amber-510 flex items-center justify-center bg-transparent relative rotate-45">
                  <span className="text-amber-400 font-bold m-0 font-mono text-sm uppercase -rotate-45">F</span>
                </div>
                <div>
                  <h3 className="text-lg font-sans font-extrabold tracking-widest text-white uppercase m-0 leading-tight">
                    FOOD MARKET
                  </h3>
                  <span className="text-[10px] font-mono text-amber-500 block uppercase tracking-widest leading-none mt-[-2px]">
                    E-Commerce Makanan
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-sans pt-1">
                Tempat terbaik untuk menemukan makanan lezat berkualitas tinggi dan terjamin diantar dengan selamat dan hangat. Pelayanan ramah, andal, dengan asisten digital sedia setia membantu 24 jam.
              </p>

              {/* Social Icons links */}
              <div className="flex items-center gap-3 pt-2">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-905 border border-gray-800 hover:border-amber-400 hover:text-white transition-all text-gray-400 rounded-full bg-slate-900">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-905 border border-gray-800 hover:border-amber-400 hover:text-white transition-all text-gray-400 rounded-full bg-slate-900">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="p-2 bg-gray-905 border border-gray-800 hover:border-amber-400 hover:text-white transition-all text-gray-400 rounded-full bg-slate-900">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick menu navigation */}
            <div className="lg:col-span-2 space-y-4">
              <h5 className="text-xs font-mono font-bold text-white tracking-widest uppercase mb-1">
                MENU UTAMA
              </h5>
              <ul className="space-y-2 text-xs font-sans">
                <li><button onClick={() => { setActiveTab("home"); window.scrollTo({top:0, behavior:"smooth"}); }} className="hover:text-amber-400 transition-colors uppercase">Home</button></li>
                <li><button onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("menu")?.scrollIntoView({behavior:"smooth"}), 150); }} className="hover:text-amber-400 transition-colors uppercase">Menu Makanan</button></li>
                <li><button onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("home")?.scrollIntoView({behavior:"smooth"}), 150); }} className="hover:text-amber-400 transition-colors uppercase">Promosi Aktif</button></li>
                <li><button onClick={() => { setActiveTab("home"); setTimeout(() => document.getElementById("tentang-kami")?.scrollIntoView({behavior:"smooth"}), 150); }} className="hover:text-amber-400 transition-colors uppercase">Tentang Kami</button></li>
                <li><button onClick={() => { setActiveTab("pelanggan"); window.scrollTo({top:0, behavior:"smooth"}); }} className="hover:text-amber-400 transition-colors uppercase">Admin Pelanggan</button></li>
              </ul>
            </div>

            {/* Helping support queries */}
            <div className="lg:col-span-3 space-y-4">
              <h5 className="text-xs font-mono font-bold text-white tracking-widest uppercase mb-1">
                BANTUAN & PANDUAN
              </h5>
              <ul className="space-y-2 text-xs font-sans">
                <li className="hover:text-amber-400 cursor-pointer uppercase">Cara Pemesanan</li>
                <li className="hover:text-amber-400 cursor-pointer uppercase">Metode Pembayaran Aman</li>
                <li className="hover:text-amber-400 cursor-pointer uppercase">Ketentuan Pengembalian</li>
                <li className="hover:text-amber-400 cursor-pointer uppercase">Kebijakan Privasi</li>
                <li className="hover:text-amber-400 cursor-pointer uppercase">FAQ & Bantuan Medis</li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="lg:col-span-3 space-y-4 text-xs font-sans leading-relaxed">
              <h5 className="text-xs font-mono font-bold text-white tracking-widest uppercase mb-1">
                KONTAK KAMI
              </h5>
              
              <div className="space-y-3 font-mono text-gray-400">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>0812-3456-7890</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Instagram className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>@Foodmarket.id</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-sans leading-tight">jl.kuliner no.124 jakarta barat</span>
                </div>
              </div>
            </div>

          </div>

          {/* Copy design and copyright claim elements */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
              © {new Date().getFullYear()} FOOD MARKET ALL RIGHTS RESERVED.
            </p>
            
            <p className="text-[10px] sm:text-xs text-gray-500 font-sans flex items-center justify-center gap-1 leading-none">
              Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> for Indonesian Food Lovers.
            </p>
          </div>

        </div>
      </footer>

      {/* 4. Chatbot Widget (Always floating bottom right corner) */}
      <Chatbot />

      {/* 5. CartModal Overlay */}
      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        cartItems={cartItems}
        menuItems={menuItems}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
        customers={customers}
        onAddOrder={handleAddOrder}
      />

      {/* 6. Arrow back to top button with simple float feedback */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-slate-900 border border-slate-700 hover:border-amber-400 p-3 rounded-xl hover:bg-slate-800 text-amber-300 shadow-md transition-all scale-100 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-4.5 h-4.5 stroke-[3px]" />
        </button>
      )}

    </div>
  );
}
