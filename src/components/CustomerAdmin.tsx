import React, { useState } from "react";
import { Customer, Order, OrderItem } from "../types";
import { 
  Users, ShoppingBag, DollarSign, Plus, Search, Edit2, Trash2, 
  Calendar, Phone, Mail, MapPin, Notebook, ArrowUpDown, TrendingUp, Check, X, Filter
} from "lucide-react";

interface CustomerAdminProps {
  customers: Customer[];
  orders: Order[];
  onAddCustomer: (customer: Omit<Customer, "id" | "joinedDate" | "totalOrders" | "totalSpend">) => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (customerId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

export default function CustomerAdmin({
  customers,
  orders,
  onAddCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onUpdateOrderStatus,
}: CustomerAdminProps) {
  
  // Dashboard Tabs
  const [adminTab, setAdminTab] = useState<"database" | "orders">("database");

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Semua");
  const [selectedCustomerIdFilter, setSelectedCustomerIdFilter] = useState<string>("");

  // Customer Form Modals states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form Field states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formNotes, setFormNotes] = useState("");

  // Sort preferences
  const [sortField, setSortField] = useState<keyof Customer>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Format Helper
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value).replace("IDR", "Rp");
  };

  // KPI Calculations
  const totalCustomers = customers.length;
  const totalSpendRevenue = customers.reduce((sum, c) => sum + c.totalSpend, 0);
  const totalOrdersCount = orders.length;
  const averageSpend = totalCustomers > 0 ? Math.round(totalSpendRevenue / totalCustomers) : 0;

  // Form action handlers
  const openAddModal = () => {
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormAddress("");
    setFormNotes("");
    setShowAddModal(true);
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    onAddCustomer({
      name: formName,
      email: formEmail,
      phone: formPhone || "-",
      address: formAddress || "-",
      notes: formNotes || ""
    });
    setShowAddModal(false);
  };

  const openEditModal = (cust: Customer) => {
    setEditingCustomer(cust);
    setFormName(cust.name);
    setFormEmail(cust.email);
    setFormPhone(cust.phone);
    setFormAddress(cust.address);
    setFormNotes(cust.notes || "");
    setShowEditModal(true);
  };

  const handleUpdateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer || !formName || !formEmail) return;
    onEditCustomer({
      ...editingCustomer,
      name: formName,
      email: formEmail,
      phone: formPhone,
      address: formAddress,
      notes: formNotes
    });
    setShowEditModal(false);
    setEditingCustomer(null);
  };

  // Sort customer handler
  const requestSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and Sort Customer Array
  const filteredCustomers = customers
    .filter((c) => {
      const matchSearch = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    })
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return sortDirection === "asc" ? -1 : 1;
      if (aStr > bStr) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  // Filter Orders Array
  const filteredOrders = orders.filter((o) => {
    const matchesCustomer = selectedCustomerIdFilter ? o.customerId === selectedCustomerIdFilter : true;
    const matchesStatus = filterStatus === "Semua" ? true : o.status === filterStatus;
    return matchesCustomer && matchesStatus;
  });

  return (
    <div className="py-8 bg-white" id="pelanggan-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-widest block bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-200 w-fit">
              ADMIN CONTROL PANEL
            </span>
            <h2 className="text-3xl font-sans font-black tracking-tight text-slate-900 mt-2 uppercase">
              MANAJEMEN DATABASE PELANGGAN
            </h2>
            <p className="text-sm text-gray-500 font-sans mt-1">
              Pantau arus pesanan e-commerce, kembangkan statistik loyalitas, serta sunting data profil pelanggan secara terpusat.
            </p>
          </div>

          {/* Add customer shortcut */}
          <button
            onClick={openAddModal}
            className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-sans font-black tracking-widest text-xs rounded-xl border-2 border-slate-900 transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform" />
            <span>TAMBAH PELANGGAN</span>
          </button>
        </div>

        {/* SUMMARY KPI CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          
          <div className="bg-slate-50 border border-slate-900/10 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100/70 border border-blue-200 rounded-lg text-blue-600">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                Database Pelanggan
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-sans font-black text-slate-900 leading-none">
              {totalCustomers}
            </p>
            <span className="text-[10px] text-gray-400 block font-sans mt-1">
              Profil unik terdaftar
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-900/10 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100/70 border border-emerald-200 rounded-lg text-emerald-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                Total Pesanan Masuk
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-sans font-black text-slate-900 leading-none">
              {totalOrdersCount}
            </p>
            <span className="text-[10px] text-gray-400 block font-sans mt-1">
              Transaksi tercatat di kasir
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-900/10 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-rose-100/70 border border-rose-200 rounded-lg text-rose-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                Total Pembelanjaan
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-sans font-black text-rose-600 leading-none">
              {formatRupiah(totalSpendRevenue)}
            </p>
            <span className="text-[10px] text-gray-400 block font-sans mt-1">
              Omzet bruto penjualan
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-900/10 p-5 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100/70 border border-amber-200 rounded-lg text-amber-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                Rata-Rata Spending
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-sans font-black text-slate-900 leading-none">
              {formatRupiah(averageSpend)}
            </p>
            <span className="text-[10px] text-gray-400 block font-sans mt-1">
              Nilai per kepala pelanggan
            </span>
          </div>

        </div>

        {/* TAB NAVIGATION CHANGER */}
        <div className="flex border-b border-gray-200 mb-6 gap-2">
          <button
            onClick={() => {
              setAdminTab("database");
              setSelectedCustomerIdFilter("");
            }}
            className={`pb-3 text-sm font-sans font-black tracking-widest uppercase transition-all relative px-3 cursor-pointer ${
              adminTab === "database"
                ? "text-slate-900 font-black border-b-3 border-amber-500"
                : "text-gray-400 hover:text-slate-700"
            }`}
          >
            Pelanggan Terdaftar ({filteredCustomers.length})
          </button>
          <button
            onClick={() => setAdminTab("orders")}
            className={`pb-3 text-sm font-sans font-black tracking-widest uppercase transition-all relative px-3 cursor-pointer ${
              adminTab === "orders"
                ? "text-slate-900 font-black border-b-3 border-amber-500"
                : "text-gray-400 hover:text-slate-700"
            }`}
          >
            Riwayat Pesanan Online ({filteredOrders.length})
          </button>
        </div>

        {/* INTERACTIVE COMPONENT TAB VIEWPORTS */}
        {adminTab === "database" ? (
          
          /* VIEW PORT A: CUSTOMER TABLE DATABASE */
          <div className="bg-white border-2 border-slate-900 rounded-2xl overflow-hidden shadow-sm">
            
            {/* Filter controls header */}
            <div className="p-5 bg-gray-50 border-b border-slate-900/10 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Cari nama, email, telepon..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2 text-xs font-semibold text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="text-xs text-slate-500 font-mono">
                Menampilkan <strong>{filteredCustomers.length}</strong> dari <strong>{customers.length}</strong> profil pelanggan
              </div>

            </div>

            {/* Table Frame wrapping */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                
                <thead>
                  <tr className="bg-slate-900 text-white uppercase text-[10px] font-mono tracking-wider border-b border-slate-900">
                    <th className="p-4 cursor-pointer hover:bg-slate-800" onClick={() => requestSort("name")}>
                      <div className="flex items-center gap-1">
                        <span>Nama Pelanggan</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="p-4">Kontak Info</th>
                    <th className="p-4">Alamat Domisili</th>
                    <th className="p-4 text-center cursor-pointer hover:bg-slate-800" onClick={() => requestSort("totalOrders")}>
                      <div className="flex items-center justify-center gap-1">
                        <span>Laporan Order</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="p-4 text-right cursor-pointer hover:bg-slate-800" onClick={() => requestSort("totalSpend")}>
                      <div className="flex items-center justify-end gap-1">
                        <span>Total Belanja</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="p-4 text-center">Aksi / Kontrol</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 font-sans">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-gray-400">
                        <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="font-bold">Tidak ada data pelanggan cocok.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((c) => (
                      <tr key={c.id} className="hover:bg-amber-50/20 transition-colors">
                        
                        {/* Name Block */}
                        <td className="p-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 bg-slate-100 rounded-full border border-slate-900 flex items-center justify-center font-bold text-slate-800 font-mono uppercase">
                              {c.name.slice(0, 2)}
                            </div>
                            <div>
                              <span className="font-bold text-slate-800 uppercase block">{c.name}</span>
                              <span className="text-[10px] text-gray-400 font-mono mt-0.5 flex items-center gap-1 uppercase">
                                <Calendar className="w-3 h-3" />
                                {c.joinedDate || "Mei 2026"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Contact details */}
                        <td className="p-4 font-mono text-[11px] space-y-1">
                          <span className="flex items-center gap-1.5 text-gray-700">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            {c.email}
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-700">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {c.phone}
                          </span>
                        </td>

                        {/* Address */}
                        <td className="p-4 max-w-xs">
                          <span className="flex items-start gap-1.5 text-gray-600 leading-tight">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                            <span className="line-clamp-2">{c.address}</span>
                          </span>
                        </td>

                        {/* Orders count */}
                        <td className="p-4 text-center font-mono font-bold text-slate-900">
                          <span className="bg-slate-100 px-2.5 py-1 rounded-sm border border-gray-200">
                            {c.totalOrders}x Order
                          </span>
                        </td>

                        {/* Spendings value */}
                        <td className="p-4 text-right font-mono font-black text-rose-600">
                          {formatRupiah(c.totalSpend)}
                        </td>

                        {/* Actions controls buttons */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Filter orders by this customer only */}
                            <button
                              onClick={() => {
                                setSelectedCustomerIdFilter(c.id);
                                setAdminTab("orders");
                              }}
                              className="px-2 py-1 bg-slate-900 text-white rounded text-[10px] font-sans font-bold hover:bg-slate-800"
                              title="Lihat riwayat pesanan"
                            >
                              ORDERS
                            </button>
                            <button
                              onClick={() => openEditModal(c)}
                              className="p-1.5 border border-gray-300 text-slate-700 hover:border-amber-500 hover:text-amber-500 hover:bg-amber-50 rounded"
                              title="Sunting profil"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Apakah Anda yakin ingin menghapus data pelanggan ${c.name}?`)) {
                                  onDeleteCustomer(c.id);
                                }
                              }}
                              className="p-1.5 border border-gray-300 text-red-500 hover:border-red-500 hover:bg-red-50 rounded"
                              title="Hapus data"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>

          </div>
        ) : (
          
          /* VIEW PORT B: TRANSACTIONAL ORDERS DB LOGS */
          <div className="space-y-4">
            
            {/* Filter controls heading */}
            <div className="p-4 bg-slate-100 border border-slate-900/10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <span className="font-sans font-bold uppercase tracking-wider text-slate-700">Filter Status:</span>
                <div className="flex items-center gap-1">
                  {["Semua", "Diproses", "Selesai", "Dibatalkan"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-md font-sans font-bold tracking-wider ${
                        filterStatus === st
                          ? "bg-slate-900 text-white"
                          : "bg-white border border-gray-300 text-slate-755 hover:bg-gray-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {selectedCustomerIdFilter && (
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold font-sans">
                    Memfilter khusus riwayat satu pelanggan
                  </span>
                  <button
                    onClick={() => setSelectedCustomerIdFilter("")}
                    className="text-[10px] font-mono bg-amber-500 text-white px-2 py-1 rounded"
                  >
                    Hapus Filter
                  </button>
                </div>
              )}

              <div className="text-slate-500 font-mono">
                Ditemukan <strong>{filteredOrders.length}</strong> tiket transaksi
              </div>

            </div>

            {/* Orders list container */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 border-2 border-dashed border-gray-300 rounded-2xl text-center text-gray-400 bg-white">
                <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30 animate-pulse" />
                <p className="font-sans font-bold">Tidak ada riwayat transaksi ditemukan.</p>
                <p className="text-xs mt-1">Lakukan order makanan dari keranjang terlebih dahulu!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOrders.map((o) => (
                  <div 
                    key={o.id}
                    className="p-5 bg-white border-2 border-slate-900 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-all"
                  >
                    
                    {/* Unique Order tag & status */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                      <div>
                        <span className="text-xs font-mono font-black text-rose-500">
                          {o.id}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 block mt-0.5">
                          {o.orderDate}
                        </span>
                      </div>
                      
                      {/* State wrapper pill color */}
                      <span className={`px-2.5 py-1 text-[10px] font-sans font-black tracking-widest rounded-md uppercase border ${
                        o.status === "Selesai"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : o.status === "Dibatalkan"
                          ? "bg-red-100 text-red-800 border-red-300"
                          : "bg-blue-100 text-blue-800 border-blue-300"
                      }`}>
                        {o.status}
                      </span>
                    </div>

                    {/* Customer info */}
                    <div className="py-3 text-xs leading-relaxed font-sans">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Kasir/Pelanggan:</span>
                        <strong className="text-slate-800 uppercase">{o.customerName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Telepon:</span>
                        <span className="font-mono text-slate-600">{o.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Kirim Ke:</span>
                        <span className="text-slate-600 max-w-48 text-right truncate">{o.deliveryAddress}</span>
                      </div>
                    </div>

                    {/* Bought list breakdown */}
                    <div className="bg-gray-50 rounded-lg p-3 divide-y divide-gray-200">
                      {o.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs py-1.5 font-sans">
                          <span className="text-slate-700 capitalize">
                            {item.name} <strong className="text-slate-900">x{item.qty}</strong>
                          </span>
                          <span className="font-mono text-slate-600 text-[11px]">
                            {formatRupiah(item.price * item.qty)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm uppercase pt-2 font-black text-slate-900 font-sans">
                        <span>Total Invoice:</span>
                        <span>{formatRupiah(o.totalPrice)}</span>
                      </div>
                    </div>

                    {/* Status updater controllers */}
                    {o.status === "Diproses" && (
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => onUpdateOrderStatus(o.id, "Selesai")}
                          className="px-3 py-2 bg-green-550 border border-green-500 hover:bg-green-600 text-white rounded-lg text-[10px] font-sans font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3 h-3 stroke-[3px]" />
                          SELESAI
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(o.id, "Dibatalkan")}
                          className="px-3 py-2 bg-red-450 border border-red-500 hover:bg-red-500 text-white rounded-lg text-[10px] font-sans font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[3px]" />
                          BATALKAN
                        </button>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ======================================= */}
        {/* MODAL WINDOWS FOR DATABASE MANIPULATIONS */}
        {/* ======================================= */}

        {/* MODAL 1: ADD NEW CUSTOMER RECORD */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white border-2 border-slate-900 rounded-3xl w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden animate-fade-in">
              
              <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-900 text-white flex justify-between items-center">
                <h3 className="text-base font-sans font-black tracking-widest uppercase m-0 text-amber-300">
                  Tambah Profil Pelanggan
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCustomer} className="p-6 space-y-4">
                
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Nama Lengkap *</label>
                  <input
                    type="text" required value={formName} onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Inestrisan Harianja"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Email Aktif *</label>
                  <input
                    type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Nomor Telepon/HP</label>
                  <input
                    type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="0812XXXXXXXX"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Alamat Domisili</label>
                  <textarea
                    rows={2} value={formAddress} onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="Alamat lengkap rumah atau kantor..."
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Catatan Admin</label>
                  <textarea
                    rows={2} value={formNotes} onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="Catatan tambahan (misal: Suka pedas, orderan jam kantor)"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button" onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-sans font-bold hover:bg-gray-100"
                  >
                    BATAL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 border border-slate-900 text-white rounded-lg text-xs font-sans font-bold hover:bg-slate-800"
                  >
                    DAFTARKAN PROFIL
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* MODAL 2: EDIT EXISTING CUSTOMER PROFILE */}
        {showEditModal && editingCustomer && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white border-2 border-slate-900 rounded-3xl w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden animate-fade-in">
              
              <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-900 text-white flex justify-between items-center">
                <h3 className="text-base font-sans font-black tracking-widest uppercase m-0 text-amber-300">
                  Sunting Profil Pelanggan
                </h3>
                <button onClick={() => { setShowEditModal(false); setEditingCustomer(null); }} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateCustomer} className="p-6 space-y-4">
                
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Nama Lengkap *</label>
                  <input
                    type="text" required value={formName} onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Email Aktif *</label>
                  <input
                    type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Nomor Telepon/HP</label>
                  <input
                    type="tel" value={formPhone} onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Alamat Domisili</label>
                  <textarea
                    rows={2} value={formAddress} onChange={(e) => setFormAddress(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-700 block uppercase mb-1">Catatan Admin</label>
                  <textarea
                    rows={2} value={formNotes} onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button" onClick={() => { setShowEditModal(false); setEditingCustomer(null); }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-sans font-bold hover:bg-gray-100"
                  >
                    BATAL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-slate-900 border border-slate-900 text-white rounded-lg text-xs font-sans font-bold hover:bg-slate-800"
                  >
                    SIMPAN PERUBAHAN
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
