import React, { useState } from "react";
import { MenuItem, OrderItem, Customer } from "../types";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2, Ticket } from "lucide-react";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { [id: string]: number };
  menuItems: MenuItem[];
  onUpdateQty: (menuId: string, delta: number) => void;
  onClearCart: () => void;
  customers: Customer[];
  onAddOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: OrderItem[];
    totalPrice: number;
    deliveryAddress: string;
    phone: string;
  }) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  menuItems,
  onUpdateQty,
  onClearCart,
  customers,
  onAddOrder,
}: CartModalProps) {
  
  // Checkout form fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState("");

  const [usePromo, setUsePromo] = useState(true); // Default to True because mockup says "PROMO SPESIAL HARI INI DISKON 30%"

  if (!isOpen) return null;

  // Calculate items in cart
  const cartList: { product: MenuItem; qty: number }[] = [];
  let subtotal = 0;

  Object.entries(cartItems).forEach(([id, qty]) => {
    if (qty > 0) {
      const prod = menuItems.find((m) => m.id === id);
      if (prod) {
        cartList.push({ product: prod, qty });
        subtotal += prod.price * qty;
      }
    }
  });

  // 30% Promo Discount calculation
  const discountAmount = usePromo ? Math.round(subtotal * 0.3) : 0;
  
  // Free Shipping Calculation: min spend Rp 50.000 (applies to subtotal)
  const isFreeOngkir = subtotal >= 50000;
  const shippingFee = subtotal > 0 && !isFreeOngkir ? 12000 : 0;
  
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleSelectPreloadCustomer = (cust: Customer) => {
    setName(cust.name);
    setEmail(cust.email);
    setPhone(cust.phone);
    setAddress(cust.address);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartList.length === 0) return;

    if (!name || !email || !phone || !address) {
      alert("Mohon isi semua data pelanggan terlebih dahulu untuk memproses pesanan.");
      return;
    }

    // Prepare items list format for types
    const formattedItems: OrderItem[] = cartList.map((item) => ({
      menuItemId: item.product.id,
      name: item.product.name,
      qty: item.qty,
      price: item.product.price
    }));

    // Trigger parent Order generation and statistics updates
    onAddOrder({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerAddress: address,
      items: formattedItems,
      totalPrice: grandTotal,
      deliveryAddress: address,
      phone: phone
    });

    const temporaryOrderId = `ORD-${Date.now().toString().slice(-6)}`;
    setCreatedOrderId(temporaryOrderId);
    setIsDone(true);
    onClearCart();
  };

  const handleResetCheckout = () => {
    setIsDone(false);
    setCreatedOrderId("");
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    onClose();
  };

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value).replace("IDR", "Rp");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 flex items-center justify-center p-4 backdrop-blur-xs">
      
      <div className="bg-white border-3 border-slate-900 rounded-3xl w-full max-w-4xl shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] overflow-hidden my-8 animate-fade-in">
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b-2 border-slate-900">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-sans font-black tracking-widest text-white uppercase m-0">
              {isDone ? "PESANAN BERHASIL!" : "KERANJANG BELANJA & INTEGRASI PELANGGAN"}
            </h3>
          </div>
          <button 
            onClick={isDone ? handleResetCheckout : onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          /* Transaction Completed Screen */
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center">
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
            <h4 className="text-2xl font-sans font-black text-slate-900 uppercase tracking-tight">
              TERIMA KASIH, PESANAN DITERIMA!
            </h4>
            <p className="text-gray-500 font-mono text-sm uppercase mt-1">
              ID Kode: {createdOrderId}
            </p>
            
            <p className="text-slate-600 font-sans max-w-lg mt-4 leading-relaxed text-sm sm:text-base">
              Pesanan kuliner lezat Anda telah kami teruskan ke dapur pengolahan Food Market. 
              Estimasi kurir kilat tiba dalam waktu 15-30 menit dengan packaging aman tersegel! 
              Data pelanggan atas nama <strong className="text-slate-900 font-extrabold">{name}</strong> telah diperbarui di database Admin.
            </p>

            <div className="mt-8 p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl max-w-sm w-full divide-y divide-gray-200">
              <div className="py-2 flex justify-between font-mono text-xs text-gray-500">
                <span>Alamat Kirim:</span>
                <span className="font-semibold text-slate-800 text-right">{address}</span>
              </div>
              <div className="py-2 flex justify-between font-mono text-xs text-gray-500">
                <span>Metode Bayar:</span>
                <span className="font-semibold text-green-600">Secure COD (Sampai Bayar)</span>
              </div>
            </div>

            <button
              onClick={handleResetCheckout}
              className="mt-8 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-sans font-black tracking-widest text-xs border-2 border-slate-900 transition-all cursor-pointer"
            >
              KEMBALI BERBELANJA
            </button>
          </div>
        ) : (
          /* Two-Column Form and Items layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-900/10 max-h-[75vh] overflow-y-auto">
            
            {/* Left Column: Cart items review list */}
            <div className="lg:col-span-7 p-6 overflow-y-auto">
              <h4 className="text-xs font-mono font-black text-slate-500 uppercase tracking-widest mb-4">
                1. Tinjau Makanan Dibeli ({cartList.length} Item)
              </h4>

              {cartList.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-35" />
                  <p className="font-sans font-bold text-sm">Keranjang kosong.</p>
                  <p className="text-xs mt-1">Pilih menu maknyus di katalog halaman depan terlebih dahulu!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartList.map(({ product, qty }) => (
                    <div 
                      key={product.id}
                      className="p-3 border border-gray-200 rounded-xl flex items-center justify-between gap-3 hover:border-slate-800 transition-colors bg-white shadow-xs"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs sm:text-sm font-sans font-bold text-slate-800 truncate uppercase">
                          {product.name}
                        </h5>
                        <p className="text-[10px] sm:text-xs font-mono text-rose-500 font-bold mt-0.5">
                          {formatRupiah(product.price)}
                        </p>
                      </div>
                      
                      {/* Qty action adjusters */}
                      <div className="flex items-center gap-2 border border-slate-900 rounded-md p-1 bg-gray-50 scale-90 sm:scale-100">
                        <button
                          onClick={() => onUpdateQty(product.id, -1)}
                          className="p-1 hover:bg-gray-200 rounded text-slate-700"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono font-semibold text-xs text-slate-800 px-1">
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(product.id, 1)}
                          className="p-1 hover:bg-gray-200 rounded text-slate-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line total price */}
                      <div className="text-right min-w-16">
                        <span className="font-sans font-black text-xs text-slate-900 block">
                          {formatRupiah(product.price * qty)}
                        </span>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={onClearCart}
                    className="text-xs font-mono font-bold text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors mt-3"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    KOSONGKAN KERANJANG
                  </button>
                </div>
              )}

              {/* Promo and delivery indicators */}
              <div className="mt-8 bg-amber-50/70 border border-amber-300/60 rounded-2xl p-4">
                <div className="flex items-center gap-3 justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-amber-600 fill-amber-100" />
                    <span className="text-xs font-sans font-extrabold text-amber-900 tracking-wide">
                      PROMO AKTIF: DISKON 30% HARI INI
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={usePromo}
                    onChange={(e) => setUsePromo(e.target.checked)}
                    className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-400 rounded-xs cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed font-sans">
                  Kupon diskon 30% otomatis terpasang untuk merayakan peluncuran Food Market online! 
                  Silakan uncheck jika Anda ingin memesan dengan tarif normal.
                </p>
              </div>

              {/* Bill breakdown totals */}
              <div className="mt-6 pt-4 border-t-2 border-slate-900/10 font-mono text-xs sm:text-sm space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-semibold">{formatRupiah(subtotal)}</span>
                </div>
                
                {usePromo && (
                  <div className="flex justify-between text-green-600 font-semibold bg-green-50 p-1 rounded-sm">
                    <span>Diskon Spesial 30%:</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Ongkos Kirim:
                    {isFreeOngkir && (
                      <span className="text-[10px] bg-green-500 text-white font-sans px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider scale-90">
                        GRATIS
                      </span>
                    )}
                  </span>
                  <span className="text-slate-900 font-semibold">
                    {shippingFee === 0 ? "Rp 0" : formatRupiah(shippingFee)}
                  </span>
                </div>

                {!isFreeOngkir && subtotal > 0 && (
                  <p className="text-[10px] text-slate-500 bg-gray-50 p-2 border border-gray-200 rounded-sm leading-tight">
                    *Tip: Tambah belanjaan senilai <strong className="text-amber-600">{formatRupiah(50000 - subtotal)}</strong> lagi untuk klaim <strong>Gratis Ongkir</strong> seluruh Indonesia!
                  </p>
                )}

                <div className="flex justify-between text-base sm:text-lg font-sans font-black text-rose-600 pt-3 border-t border-dashed border-gray-200">
                  <span className="uppercase tracking-widest text-slate-900 text-xs sm:text-sm pt-0.5">Grand Total:</span>
                  <span>{formatRupiah(grandTotal)}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Checkout Client Data Form */}
            <div className="lg:col-span-5 p-6 bg-slate-50">
              <h4 className="text-xs font-mono font-black text-slate-500 uppercase tracking-widest mb-2">
                2. Data Pelanggan / Checkout
              </h4>
              <p className="text-[11px] text-gray-500 font-sans mb-4 leading-relaxed">
                Isi data diri untuk melengkapi pemesanan. Pesanan akan otomatis terekam dan menambah statistik pelanggan di database admin.
              </p>

              {/* Preload customer helper block */}
              {customers.length > 0 && (
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1.5 uppercase tracking-wider">
                    Pilih Dari Profil Terdaftar:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {customers.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleSelectPreloadCustomer(c)}
                        className="text-[10px] font-sans font-bold px-2 py-1 bg-white border border-gray-300 rounded-md hover:border-amber-500 hover:bg-amber-50 transition-all text-slate-700 truncate max-w-32 cursor-pointer"
                        title={c.name}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-2">
                
                <div>
                  <label className="text-[10.5px] font-mono font-bold text-slate-700 block uppercase mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Inestrisan Harianja"
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-mono font-bold text-slate-700 block uppercase mb-1">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-mono font-bold text-slate-700 block uppercase mb-1">
                    Nomor Telepon/HP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 0812345678"
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-mono font-bold text-slate-700 block uppercase mb-1">
                    Alamat Pengiriman *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Alamat lengkap tujuan kirim makanan..."
                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={cartList.length === 0}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-gray-300 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white border-2 border-slate-900 rounded-xl font-sans font-black tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <span>KONFIRMASI PESANAN</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </button>
                  <p className="text-[9.5px] text-gray-400 text-center font-sans mt-2">
                    Transaksi aman 100%! Pihak admin dapat memonitor pesanan Anda secara real-time di Admin Panel.
                  </p>
                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
