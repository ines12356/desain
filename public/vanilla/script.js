/* ==========================================================================
   Food Market - E-Commerce & CRM Vanilla Client Logic Script
   ========================================================================== */

// 1. ORIGINAL INVENTORY SEED DATABASE
const INITIAL_MENU = [
  {
    id: "prod-1",
    name: "Nasi Goreng Special",
    category: "Makanan Berat",
    price: 25000,
    description: "Nasi goreng harum kaya rempah khas Indonesia disajikan dengan telur setengah matang, sosis premium, bakso kenyal, acar segar, dan kerupuk renyah.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80",
    isPopular: true
  },
  {
    id: "prod-2",
    name: "Ayam Geprek",
    category: "Makanan Berat",
    price: 20000,
    description: "Ayam goreng tepung garing renyah dibalut dengan ulekan sambal bawang segar bercita rasa pedas mantap menyesuaikan selera, lengkap bersama nasi hangat.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80",
    isPopular: true
  },
  {
    id: "prod-3",
    name: "Es Teh Jumbo",
    category: "Minuman",
    price: 6000,
    description: "Segelas es teh manis segar dengan seduhan daun teh pilihan murni, disajikan dingin dalam porsi jumbo pelepas dahaga seketika.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&auto=format&fit=crop&q=80",
    isPopular: true
  },
  {
    id: "prod-4",
    name: "Cheeseburger",
    category: "Snack",
    price: 18000,
    description: "Roti brioche mentega lembut diisi dengan daging sapi murni juicy, potongan keju cheddar lumer, saus mustar gurih, tomat, dan acar mentimun segar.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    isPopular: true
  },
  {
    id: "prod-5",
    name: "Bakso Sapi Solo",
    category: "Makanan Berat",
    price: 15000,
    description: "Bakso daging sapi asli kenyal disiram dengan kuah kaldu rempah gurih khas Solo, mie kuning halus, soun, seledri, dan bawang goreng renyah.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-6",
    name: "Kentang Goreng",
    category: "Snack",
    price: 12000,
    description: "French fries garing berwarna keemasan ditaburi garam laut tipis, disajikan gurih hangat dengan saus sambal pedas manis khas.",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-7",
    name: "Pisang Coklat Keju",
    category: "Snack",
    price: 10000,
    description: "Pisang kepok manis digoreng dalam selimut kulit lumpia renyah bertabur limpahan cokelat mesis premium manis serta parutan keju gurih.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-8",
    name: "Es Campur Segar",
    category: "Dessert",
    price: 12000,
    description: "Campuran kelapa muda serut, alpukat mentega, jeli sirsak, kolang-kaling manis, sirup merah, susu kental manis, serta serutan es tumpuk sejuk.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "prod-9",
    name: "Chocolate Lava Cake",
    category: "Dessert",
    price: 16000,
    description: "Camilan pembuka manis kue cokelat panggang lembut bertekstur lava coklat dair lumer hangat di bagian dalam, disajikan dengan buah stroberi segar.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80"
  }
];

const INITIAL_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Inestrisan Harianja",
    email: "inestrisaniharianja1@gmail.com",
    phone: "0812-3456-7890",
    address: "Jl. Kuliner Raya No. 124, Jakarta Barat",
    joinedDate: "12 Mei 2026",
    totalOrders: 3,
    totalSpend: 112000,
    notes: "Pelanggan setia yang sangat suka dengan menu Nasi Goreng Special ekstra kerupuk."
  },
  {
    id: "cust-2",
    name: "Budi Santoso",
    email: "budi.santoso@email.com",
    phone: "0857-1122-3344",
    address: "Jl. Merdeka No. 45, Kebayoran Baru, Jakarta Selatan",
    joinedDate: "15 Mei 2026",
    totalOrders: 1,
    totalSpend: 20000,
    notes: "Suka mengorder Ayam Geprek level pedas sedang."
  },
  {
    id: "cust-3",
    name: "Siti Rahma",
    email: "siti.rahma@yahoo.com",
    phone: "0813-4455-6677",
    address: "Perumahan Indah Gg. Damai No. 8, Tangerang",
    joinedDate: "18 Mei 2026",
    totalOrders: 2,
    totalSpend: 46000,
    notes: "Selalu memesan Es Teh Jumbo bersama hidangan penutup manis Dessert."
  }
];

const INITIAL_ORDERS = [
  {
    id: "ORD-99882",
    customerId: "cust-1",
    customerName: "Inestrisan Harianja",
    items: [
      { menuItemId: "prod-1", name: "Nasi Goreng Special", qty: 2, price: 25000 },
      { menuItemId: "prod-3", name: "Es Teh Jumbo", qty: 2, price: 6000 }
    ],
    totalPrice: 43400, // 30% discount calculated
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
    totalPrice: 21000,
    orderDate: "19 Mei 2026, 18:02",
    status: "Diproses",
    deliveryAddress: "Perumahan Indah Gg. Damai No. 8, Tangerang",
    phone: "0813-4455-6677"
  }
];

// 2. STATE STORES
let customers = JSON.parse(localStorage.getItem("foodmarket_customers_db")) || [];
let orders = JSON.parse(localStorage.getItem("foodmarket_orders_db")) || [];
let cartItems = {}; // { itemId: qty }
let selectedCategory = "Semua";
let searchTerm = "";
let chatbotHistory = [];

// Initialize local databases with fallback defaults if null
if (customers.length === 0) {
  customers = [...INITIAL_CUSTOMERS];
  localStorage.setItem("foodmarket_customers_db", JSON.stringify(customers));
}
if (orders.length === 0) {
  orders = [...INITIAL_ORDERS];
  localStorage.setItem("foodmarket_orders_db", JSON.stringify(orders));
}

// 3. EVENT LISTENERS & ROUTING INTERACTION
document.addEventListener("DOMContentLoaded", () => {
  // Reinitialize Lucide Icon CDN
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Initial UI Draws
  renderCatalog();
  updateCartMetrics();
  initTabRouting();
  initCategoryFilters();
  initSearch();
  initCartModal();
  initAdminDashboard();
  initChatbot();

  // Scroll to Top float observer
  const scrollBtn = document.getElementById("scroll-top-btn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Tab router handling
function initTabRouting() {
  const tabStorefront = document.getElementById("tab-storefront");
  const tabAdmin = document.getElementById("tab-admin");
  const navLinks = document.querySelectorAll(".nav-link, .nav-link-foot");

  function switchTab(tabId) {
    if (tabId === "pelanggan") {
      tabStorefront.classList.add("hidden");
      tabAdmin.classList.remove("hidden");
      renderAdminDashboard();
    } else {
      tabStorefront.classList.remove("hidden");
      tabAdmin.classList.add("hidden");
      
      // Auto smooth scroll to designated block offsets
      if (tabId === "menu") {
        document.getElementById("filter-section")?.scrollIntoView({ behavior: "smooth" });
      } else if (tabId === "about") {
        document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
      } else if (tabId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    // Update nav border highlights state
    document.querySelectorAll(".nav-link").forEach(link => {
      const linkTab = link.getAttribute("data-tab");
      if (linkTab === tabId) {
        link.classList.add("text-amber-500", "active");
        link.classList.remove("text-slate-600");
      } else {
        link.classList.remove("text-amber-500", "active");
        link.classList.add("text-slate-600");
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = link.getAttribute("data-tab");
      switchTab(tab);
    });
  });

  document.getElementById("nav-logo").addEventListener("click", (e) => {
    e.preventDefault();
    switchTab("home");
  });

  document.getElementById("admin-btn").addEventListener("click", () => {
    switchTab("pelanggan");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("hero-order-btn").addEventListener("click", () => {
    switchTab("menu");
  });

  document.getElementById("hero-admin-btn").addEventListener("click", () => {
    switchTab("pelanggan");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// 4. MENU CATALOG RENDERER
function initCategoryFilters() {
  const pills = document.querySelectorAll(".cat-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      // Remove active amber-500 from other buttons
      pills.forEach(b => {
        b.classList.remove("bg-amber-500", "text-slate-900", "border-slate-900");
        b.classList.add("bg-slate-50", "text-slate-600", "border-transparent");
      });
      // Activate this button
      pill.classList.remove("bg-slate-50", "text-slate-600", "border-transparent");
      pill.classList.add("bg-amber-500", "text-slate-900", "border-slate-900");

      selectedCategory = pill.getAttribute("data-category");
      renderCatalog();
    });
  });
}

function initSearch() {
  const desktopIn = document.getElementById("search-input");
  const mobileIn = document.getElementById("search-input-mobile");

  function handleSyncInput(value) {
    searchTerm = value;
    desktopIn.value = value;
    mobileIn.value = value;
    renderCatalog();
  }

  desktopIn.addEventListener("input", (e) => handleSyncInput(e.target.value));
  mobileIn.addEventListener("input", (e) => handleSyncInput(e.target.value));
}

function renderCatalog() {
  const grid = document.getElementById("catalog-grid");
  grid.innerHTML = "";

  const filtered = INITIAL_MENU.filter(item => {
    const matchesCat = (selectedCategory === "Semua") || (item.category === selectedCategory);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  document.getElementById("catalog-count-label").innerText = `${selectedCategory.toUpperCase()} • ${filtered.length} Menu Tersedia`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-1 sm:col-span-2 lg:col-span-4 py-20 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl bg-white w-full">
        <p class="font-sans font-bold text-base">Hidangan tidak ditemukan.</p>
        <p class="text-xs mt-1">Coba gunakan kata kunci pencarian menu lainnya!</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const qty = cartItems[item.id] || 0;
    const isPopBadge = item.isPopular ? `
      <span class="absolute top-3 left-3 z-10 bg-amber-500 text-slate-950 font-mono text-[9px] font-black uppercase px-2 py-0.5 border border-slate-950 rounded shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center gap-1">
        🔥 POPULER
      </span>
    ` : '';

    const actionButtonArea = qty > 0 ? `
      <div class="flex items-center justify-between border-2 border-slate-900 bg-white p-1 rounded-xl w-full">
        <button onclick="changeQty('${item.id}', -1)" class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 font-black text-slate-800 rounded-lg text-sm cursor-pointer">-</button>
        <span class="font-mono font-bold text-xs text-slate-900">${qty}</span>
        <button onclick="changeQty('${item.id}', 1)" class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 font-black text-slate-800 rounded-lg text-sm cursor-pointer">+</button>
      </div>
    ` : `
      <button onclick="addToCart('${item.id}')" class="neobrutal-button w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-sans font-black text-[11px] uppercase tracking-wider border-2 border-slate-900 rounded-xl cursor-pointer flex items-center justify-center gap-1">
        <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i> Tambah Keranjang
      </button>
    `;

    const card = document.createElement("div");
    card.className = "relative flex flex-col bg-white border-2 border-slate-900 rounded-2xl p-4 neobrutal-shadow animate-fade-in";
    card.innerHTML = `
      ${isPopBadge}
      <!-- Image cover -->
      <div class="relative w-full h-44 overflow-hidden rounded-xl bg-gray-150 border border-gray-250 mb-3 block">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
      </div>

      <!-- Category Label and Star -->
      <div class="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
        <span class="text-amber-600 block bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">${item.category}</span>
        <span class="text-slate-800 flex items-center gap-0.5">⭐ ${item.rating.toFixed(1)}</span>
      </div>

      <!-- Title & description -->
      <h4 class="font-sans font-black text-sm text-slate-900 mb-1 leading-tight uppercase truncate">${item.name}</h4>
      <p class="text-[11px] text-gray-500 text-slate-500 font-sans line-clamp-2 h-8 leading-normal mb-3">${item.description}</p>

      <!-- Bottom actions rows -->
      <div class="mt-auto space-y-2.5">
        <div class="flex items-center justify-between border-t border-dashed border-gray-150 pt-2.5">
          <span class="text-[10px] text-gray-400 font-mono block uppercase">Harga satuan:</span>
          <span class="font-sans font-black text-sm text-slate-950 uppercase">Rp ${item.price.toLocaleString('id-ID')}</span>
        </div>
        ${actionButtonArea}
      </div>
    `;
    grid.appendChild(card);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// 5. SHOPPING CART CORE FUNCTIONS
window.addToCart = function(itemId) {
  cartItems[itemId] = 1;
  updateCartMetrics();
};

window.changeQty = function(itemId, delta) {
  const current = cartItems[itemId] || 0;
  const target = current + delta;
  if (target <= 0) {
    delete cartItems[itemId];
  } else {
    cartItems[itemId] = target;
  }
  updateCartMetrics();
};

function updateCartMetrics() {
  const totCount = Object.values(cartItems).reduce((sum, q) => sum + q, 0);
  document.getElementById("cart-count").innerText = totCount;
  renderCatalog(); // Redraw menu cards to sync counters
}

// 6. CART MODAL ENGINE
function initCartModal() {
  const modal = document.getElementById("cart-modal");
  const cartBtn = document.getElementById("cart-btn");
  const closeBtn = document.getElementById("close-cart-btn");
  const clearBtn = document.getElementById("cart-clear-btn");
  const form = document.getElementById("checkout-form");
  const submitBtn = document.getElementById("cart-submit-btn");

  cartBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    renderCartList();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  clearBtn.addEventListener("click", () => {
    cartItems = {};
    updateCartMetrics();
    renderCartList();
  });

  // Automatically submit and validate transaction form
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Check item lengths
    const itemsCount = Object.keys(cartItems).length;
    if (itemsCount === 0) {
      alert("Format error: Keranjang belanja Anda masih kosong!");
      return;
    }

    if (!form.reportValidity()) {
      return;
    }

    // Capture input info values
    const cName = document.getElementById("check-name").value;
    const cEmail = document.getElementById("check-email").value;
    const cPhone = document.getElementById("check-phone").value;
    const cAddress = document.getElementById("check-address").value;

    const discountRate = 0.70; // 30% cuts off
    let finalOrderItems = [];
    let grossTotal = 0;

    Object.entries(cartItems).forEach(([id, qty]) => {
      const prod = INITIAL_MENU.find(m => m.id === id);
      if (prod) {
        finalOrderItems.push({
          menuItemId: id,
          name: prod.name,
          qty: qty,
          price: prod.price
        });
        grossTotal += prod.price * qty;
      }
    });

    const netTotal = grossTotal * discountRate;

    // A. Check customer matching
    let targetCust = customers.find(c => c.email.toLowerCase() === cEmail.toLowerCase());
    
    if (targetCust) {
      // Incrememnt metrics
      targetCust.totalOrders += 1;
      targetCust.totalSpend += netTotal;
      targetCust.phone = cPhone;
      targetCust.address = cAddress;
    } else {
      // Register manually
      const newId = `cust-${Date.now()}`;
      customers.push({
        id: newId,
        name: cName,
        email: cEmail,
        phone: cPhone,
        address: cAddress,
        joinedDate: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        totalOrders: 1,
        totalSpend: netTotal,
        notes: "Profil terdaftar otomatis via checkout keranjang."
      });
    }

    localStorage.setItem("foodmarket_customers_db", JSON.stringify(customers));

    // B. Register order queues
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrderId,
      customerId: targetCust ? targetCust.id : `cust-${Date.now()}`,
      customerName: cName,
      items: finalOrderItems,
      totalPrice: netTotal,
      orderDate: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) + `, ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      status: "Diproses",
      deliveryAddress: cAddress,
      phone: cPhone
    };

    orders.unshift(newOrder);
    localStorage.setItem("foodmarket_orders_db", JSON.stringify(orders));

    // C. Reset system states
    cartItems = {};
    updateCartMetrics();
    form.reset();
    modal.classList.add("hidden");

    alert(`Pesanan Sukses Dibuat!\nKode Invoice Anda: ${newOrderId}\nStatus: Sedang Diproses (Antrean kurir dikonfirmasi). Terima kasih sudah berbelanja.`);
    renderAdminDashboard(); // Refresh reporting
  });
}

function renderCartList() {
  const container = document.getElementById("cart-items-list");
  container.innerHTML = "";

  const items = Object.entries(cartItems);
  if (items.length === 0) {
    container.innerHTML = `
      <div class="py-12 text-center text-gray-400">
        <i data-lucide="info" class="w-8 h-8 mx-auto text-gray-300 mb-2"></i>
        <p class="font-sans font-semibold text-xs uppercase">Keranjang Anda kosong!</p>
      </div>
    `;
    document.getElementById("cart-total-price").innerText = "Rp 0";
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  let totalGross = 0;

  items.forEach(([id, qty]) => {
    const prod = INITIAL_MENU.find(m => m.id === id);
    if (prod) {
      totalGross += prod.price * qty;
      const row = document.createElement("div");
      row.className = "flex items-center gap-3 p-3 bg-gray-50 border border-gray-200/60 rounded-xl relative";
      row.innerHTML = `
        <img src="${prod.image}" alt="${prod.name}" class="w-12 h-12 rounded-lg object-cover border border-gray-200">
        <div class="flex-1 min-w-0">
          <h5 class="font-sans font-bold text-xs text-slate-800 uppercase truncate">${prod.name}</h5>
          <span class="font-mono text-[10px] text-gray-400 uppercase">Rp ${prod.price.toLocaleString('id-ID')} / unit</span>
        </div>
        <div class="flex items-center gap-2 border border-slate-900 bg-white p-1 rounded-lg">
          <button onclick="changeQty('${id}', -1); renderCartList();" class="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-slate-50 rounded cursor-pointer">-</button>
          <span class="text-xs font-mono font-bold">${qty}</span>
          <button onclick="changeQty('${id}', 1); renderCartList();" class="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-slate-100 rounded cursor-pointer">+</button>
        </div>
        <div class="text-right min-w-[70px]">
          <span class="font-sans font-black text-xs text-slate-900">Rp ${(prod.price * qty).toLocaleString('id-ID')}</span>
        </div>
      `;
      container.appendChild(row);
    }
  });

  // Calculate discount 30 percent cuts
  const discTotal = totalGross * 0.70;
  document.getElementById("cart-total-price").innerText = `Rp ${discTotal.toLocaleString('id-ID')}`;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// 7. ELITE CRM DASHBOARD SYSTEMS
function initAdminDashboard() {
  const modal = document.getElementById("cust-modal");
  const addBtn = document.getElementById("admin-add-cust-btn");
  const closeBtn = document.getElementById("close-cust-btn");
  const cancelBtn = document.getElementById("cancel-cust-btn");
  const form = document.getElementById("cust-form");
  const searchInput = document.getElementById("admin-search-cust");

  addBtn.addEventListener("click", () => {
    document.getElementById("cust-modal-title").innerText = "Tambah Pelanggan Baru";
    form.reset();
    document.getElementById("cust-edit-id").value = "";
    modal.classList.remove("hidden");
  });

  const closeModal = () => modal.classList.add("hidden");
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const editId = document.getElementById("cust-edit-id").value;
    const cName = document.getElementById("cust-name").value;
    const cEmail = document.getElementById("cust-email").value;
    const cPhone = document.getElementById("cust-phone").value;
    const cAddress = document.getElementById("cust-address").value;
    const cNotes = document.getElementById("cust-notes").value;

    if (editId) {
      // Editing Mode
      customers = customers.map(c => {
        if (c.id === editId) {
          return { ...c, name: cName, email: cEmail, phone: cPhone, address: cAddress, notes: cNotes };
        }
        return c;
      });
    } else {
      // Appending Mode
      customers.push({
        id: `cust-${Date.now()}`,
        name: cName,
        email: cEmail,
        phone: cPhone,
        address: cAddress,
        joinedDate: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        totalOrders: 0,
        totalSpend: 0,
        notes: cNotes || "Akun dibuat via portal admin."
      });
    }

    localStorage.setItem("foodmarket_customers_db", JSON.stringify(customers));
    closeModal();
    renderAdminDashboard();
  });

  // Database search triggers
  searchInput.addEventListener("input", () => {
    renderAdminDashboard();
  });
}

function renderAdminDashboard() {
  // A. Calculations of metrics ribbons
  const totalSpendVal = orders
    .filter(o => o.status !== "Dibatalkan")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  document.getElementById("metric-total-cust").innerText = customers.length;
  document.getElementById("metric-total-orders").innerText = orders.length;
  document.getElementById("metric-total-income").innerText = `Rp ${totalSpendVal.toLocaleString('id-ID')}`;

  // Find high spend customer
  if (customers.length > 0) {
    const loyal = [...customers].sort((a,b) => b.totalSpend - a.totalSpend)[0];
    document.getElementById("metric-top-cust").innerText = loyal.name;
    document.getElementById("metric-top-cust").title = `${loyal.name} (Rp ${loyal.totalSpend.toLocaleString('id-ID')})`;
  } else {
    document.getElementById("metric-top-cust").innerText = "Belum Ada";
  }

  // B. Render customers databases
  const listContainer = document.getElementById("admin-customers-container");
  listContainer.innerHTML = "";

  const q = document.getElementById("admin-search-cust").value.toLowerCase();
  const filteredCust = customers.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));

  if (filteredCust.length === 0) {
    listContainer.innerHTML = `<p class="py-6 text-center text-xs text-gray-400">Database profil kosong.</p>`;
  } else {
    filteredCust.forEach(c => {
      const card = document.createElement("div");
      card.className = "pt-4 pb-4 first:pt-0 class-item-customer relative font-sans text-xs flex flex-col justify-between";
      card.innerHTML = `
        <div class="flex items-start justify-between gap-4">
          <div>
            <h5 class="font-black text-slate-900 text-[13px] uppercase">${c.name}</h5>
            <span class="text-[9px] font-mono text-amber-600 block bg-amber-50 border border-amber-200 px-1.5 py-0.5 mt-1 rounded w-fit">ID: ${c.id}</span>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button onclick="editCustomerAdmin('${c.id}')" class="px-2.5 py-1 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase rounded border border-gray-200 cursor-pointer">Edit</button>
            <button onclick="deleteCustomerAdmin('${c.id}')" class="px-2.5 py-1 text-[10px] bg-red-50 hover:bg-red-100 text-red-600 font-bold uppercase rounded border border-red-200 cursor-pointer">Hapus</button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 font-mono text-[10px] text-slate-500">
          <div>
            <span class="block text-gray-400 uppercase">Surel / Email:</span>
            <span class="block text-slate-700 truncate">${c.email}</span>
          </div>
          <div>
            <span class="block text-gray-400 uppercase">Telepon WA:</span>
            <span class="block text-slate-700">${c.phone}</span>
          </div>
          <div class="sm:col-span-2">
            <span class="block text-gray-400 uppercase">Domisili Pengantaran:</span>
            <span class="block text-slate-700 font-sans mt-0.5 leading-tight">${c.address}</span>
          </div>
          <div class="sm:col-span-2 bg-slate-50 border border-slate-150 p-2 rounded mt-1">
            <span class="block text-gray-400 uppercase text-[9px]">Catatan Admin:</span>
            <span class="block text-slate-600 font-sans leading-tight italic mt-0.5">"${c.notes || 'Belum ada catatan khusus.'}"</span>
          </div>
        </div>

        <div class="flex items-center justify-between border-t border-dashed border-gray-150 pt-2.5 mt-2.5 text-[10px]">
          <div>
            <span class="text-gray-400 font-sans block leading-none">Terdaftar Sejak:</span>
            <strong class="text-slate-800 font-mono inline-block mt-0.5">${c.joinedDate}</strong>
          </div>
          <div class="text-right">
            <span class="text-gray-400 font-sans block leading-none">Rasio Pembelian:</span>
            <span class="inline-block mt-0.5 font-mono"><strong>${c.totalOrders} Pesanan</strong> (<strong class="text-green-600">Rp ${c.totalSpend.toLocaleString('id-ID')}</strong>)</span>
          </div>
        </div>
      `;
      listContainer.appendChild(card);
    });
  }

  // C. Render order queue invoices
  renderOrdersQueue();
}

function renderOrdersQueue() {
  const container = document.getElementById("admin-orders-container");
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = `<p class="py-8 text-center text-xs text-gray-400">Belum ada transaksi di etalase ini.</p>`;
    return;
  }

  orders.forEach(o => {
    let statBg = "bg-amber-100 text-amber-800 border-amber-300";
    if (o.status === "Selesai") statBg = "bg-green-100 text-green-800 border-green-300";
    if (o.status === "Dibatalkan") statBg = "bg-red-100 text-red-800 border-red-300";

    const itemsContent = o.items.map(it => `
      <div class="flex justify-between items-center text-[10px] font-mono leading-relaxed pt-1 border-t border-gray-100 border-dashed first:border-0 first:pt-0">
        <span class="text-slate-600 truncate max-w-[160px]">${it.name} (x${it.qty})</span>
        <strong class="text-slate-800">Rp ${(it.price * it.qty).toLocaleString('id-ID')}</strong>
      </div>
    `).join('');

    const card = document.createElement("div");
    card.className = "bg-slate-50/50 border border-slate-200/80 p-4 rounded-xl relative font-sans text-xs space-y-3";
    card.innerHTML = `
      <div class="flex items-center justify-between gap-2 border-b border-gray-200/60 pb-2">
        <div>
          <strong class="text-slate-900 block font-bold text-[13px] font-mono uppercase">${o.id}</strong>
          <span class="text-[9px] font-mono text-slate-400 block mt-0.5 uppercase tracking-wider">${o.orderDate}</span>
        </div>
        
        <!-- Dropdown status controller -->
        <select onchange="updateOrderStatus('${o.id}', this.value)" class="p-1 text-[10px] font-bold uppercase tracking-wider border border-slate-900 rounded bg-white cursor-pointer">
          <option value="Diproses" ${o.status === "Diproses" ? "selected" : ""}>Diproses</option>
          <option value="Selesai" ${o.status === "Selesai" ? "selected" : ""}>Selesai</option>
          <option value="Dibatalkan" ${o.status === "Dibatalkan" ? "selected" : ""}>Dibatalkan</option>
        </select>
      </div>

      <!-- Customer Details link -->
      <div class="bg-white border border-gray-150 p-2.5 rounded-lg space-y-1 font-mono text-[10px]">
        <div>
          <span class="text-gray-400 block uppercase">Penerima logistik:</span>
          <strong class="text-slate-800 font-sans block text-xs uppercase">${o.customerName}</strong>
        </div>
        <div>
          <span class="text-gray-400 block uppercase">Telepon WA:</span>
          <span class="text-slate-700 block">${o.phone}</span>
        </div>
        <div>
          <span class="text-gray-400 block uppercase">Lokasi Drop Point:</span>
          <span class="text-slate-700 block font-sans">${o.deliveryAddress}</span>
        </div>
      </div>

      <!-- Items breakdown -->
      <div class="space-y-1 bg-white border border-gray-150 p-2.5 rounded-lg">
        <span class="text-gray-400 block font-mono text-[9px] uppercase mb-1">Daftar Belanjaan:</span>
        ${itemsContent}
      </div>

      <!-- Total summary rows -->
      <div class="flex items-center justify-between pt-2.5 border-t border-dashed border-gray-200">
        <div>
          <span class="text-[10px] text-gray-400 font-mono block uppercase leading-none">Jumlah Biaya:</span>
          <span class="inline-block px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded-lg border ${statBg} mt-1.5">${o.status}</span>
        </div>
        <div class="text-right">
          <strong class="text-slate-950 block font-black text-[15px]">Rp ${o.totalPrice.toLocaleString('id-ID')}</strong>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

window.deleteCustomerAdmin = function(id) {
  if (confirm("Metode proteksi: Apakah Anda yakin ingin menghapus profil pelanggan ini beserta rekam riwayatnya?")) {
    customers = customers.filter(c => c.id !== id);
    localStorage.setItem("foodmarket_customers_db", JSON.stringify(customers));
    
    // Detach customer ID from transactional orders but retain the history
    orders = orders.map(o => {
      if (o.customerId === id) o.customerId = "guest";
      return o;
    });
    localStorage.setItem("foodmarket_orders_db", JSON.stringify(orders));

    renderAdminDashboard();
  }
};

window.editCustomerAdmin = function(id) {
  const c = customers.find(item => item.id === id);
  if (!c) return;

  document.getElementById("cust-modal-title").innerText = "Edit Data Pelanggan";
  document.getElementById("cust-edit-id").value = c.id;
  document.getElementById("cust-name").value = c.name;
  document.getElementById("cust-email").value = c.email;
  document.getElementById("cust-phone").value = c.phone;
  document.getElementById("cust-address").value = c.address;
  document.getElementById("cust-notes").value = c.notes || "";

  document.getElementById("cust-modal").classList.remove("hidden");
};

window.updateOrderStatus = function(orderId, newStatus) {
  const o = orders.find(item => item.id === orderId);
  if (!o) return;

  // Track cancellation rollback calculations
  if (newStatus === "Dibatalkan" && o.status !== "Dibatalkan") {
    // Subtract total Spend from customer metrics
    const relatedCustId = o.customerId;
    if (relatedCustId !== "guest") {
      customers = customers.map(c => {
        if (c.id === relatedCustId) {
          c.totalOrders = Math.max(0, c.totalOrders - 1);
          c.totalSpend = Math.max(0, c.totalSpend - o.totalPrice);
        }
        return c;
      });
    }
  }

  // Restore calculation metrics if recovering from Dibatalkan back to valid queue
  if (o.status === "Dibatalkan" && newStatus !== "Dibatalkan") {
    const relatedCustId = o.customerId;
    if (relatedCustId !== "guest") {
      customers = customers.map(c => {
        if (c.id === relatedCustId) {
          c.totalOrders += 1;
          c.totalSpend += o.totalPrice;
        }
        return c;
      });
    }
  }

  o.status = newStatus;
  localStorage.setItem("foodmarket_orders_db", JSON.stringify(orders));
  localStorage.setItem("foodmarket_customers_db", JSON.stringify(customers));

  renderAdminDashboard();
};

// 8. ASISTEN DIGITAL / CHATBOT ENGINE
function initChatbot() {
  const trigger = document.getElementById("chatbot-trigger");
  const box = document.getElementById("chatbot-box");
  const closeCross = document.getElementById("chatbot-close-cross");
  const input = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send-btn");
  const messagesContainer = document.getElementById("chatbot-messages");

  // Open & Close
  trigger.addEventListener("click", () => {
    const isHidden = box.classList.contains("hidden");
    if (isHidden) {
      box.classList.remove("hidden");
      document.getElementById("chat-icon-normal").classList.add("hidden");
      document.getElementById("chat-icon-close").classList.remove("hidden");
      
      if (messagesContainer.children.length === 0) {
        appendBotMessage("Halo! Selamat datang di Food Market. Ada yang bisa kami bantu hari ini? Anda bisa menanyakan menu terlaris, promo aktif hari ini, atau cara mengelola database pelanggan kami!");
      }
    } else {
      closeWidget();
    }
  });

  closeCross.addEventListener("click", closeWidget);

  function closeWidget() {
    box.classList.add("hidden");
    document.getElementById("chat-icon-normal").classList.remove("hidden");
    document.getElementById("chat-icon-close").classList.add("hidden");
  }

  // Send action triggers
  sendBtn.addEventListener("click", handleSubmitQuery);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSubmitQuery();
  });

  async function handleSubmitQuery() {
    const text = input.value.trim();
    if (!text) return;

    // Flush User UI Bubble
    appendUserMessage(text);
    input.value = "";

    // Show typing anim placeholder
    const typingId = appendTypingIndicator();

    try {
      // POST Request mapping to our local express endpoint /api/chatbot
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: chatbotHistory
        })
      });

      // Clear typing anim bubble
      document.getElementById(typingId)?.remove();

      if (res.ok) {
        const data = await res.json();
        appendBotMessage(data.text);
        
        // Append history logs
        chatbotHistory.push({ role: "user", content: text });
        chatbotHistory.push({ role: "model", content: data.text });
      } else {
        throw new Error("HTTP error: " + res.status);
      }
    } catch (err) {
      console.warn("Express API unreachable, switching to local assistant logic:", err);
      // Fallback local rules engine response
      document.getElementById(typingId)?.remove();
      
      setTimeout(() => {
        const reply = localFallbackReply(text);
        appendBotMessage(reply);
        chatbotHistory.push({ role: "user", content: text });
        chatbotHistory.push({ role: "model", content: reply });
      }, 500);
    }
  }

  function appendUserMessage(content) {
    const msg = document.createElement("div");
    msg.className = "flex justify-end animate-fade-in";
    msg.innerHTML = `
      <div class="bg-amber-100 border border-amber-300 text-amber-950 p-2.5 rounded-xl max-w-[80%] font-medium">
        ${content}
      </div>
    `;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendBotMessage(content) {
    const msg = document.createElement("div");
    msg.className = "flex items-start gap-2.5 animate-fade-in";
    msg.innerHTML = `
      <div class="w-7 h-7 shrink-0 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs">
        🤖
      </div>
      <div class="bg-white border border-slate-200 text-slate-800 p-2.5 rounded-xl max-w-[80%] leading-relaxed font-sans shadow-sm">
        ${content.replace(/\n/g, '<br>')}
      </div>
    `;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendTypingIndicator() {
    const id = "typing-" + Date.now();
    const msg = document.createElement("div");
    msg.id = id;
    msg.className = "flex items-start gap-2.5 animate-fade-in";
    msg.innerHTML = `
      <div class="w-7 h-7 shrink-0 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs">
        🤖
      </div>
      <div class="bg-slate-100 text-gray-400 p-2.5 rounded-xl font-mono tracking-widest text-[9px] uppercase animate-pulse">
        Sedang mengetik...
      </div>
    `;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return id;
  }

  function localFallbackReply(query) {
    const text = query.toLowerCase();
    if (text.includes("halo") || text.includes("hi") || text.includes("hei") || text.includes("pagi") || text.includes("siang") || text.includes("sore") || text.includes("malam")) {
      return "Halo! Selamat datang di Food Market. Ada yang bisa kami bantu hari ini? Anda bisa menanyakan menu favorit, promo spesial hari ini, atau cara mengelola database pelanggan kami!";
    }
    if (text.includes("menu") || text.includes("makanan") || text.includes("minum") || text.includes("makan") || text.includes("list")) {
      return "Di Food Market terdapat menu unggulan lezat:\n1. *Nasi Goreng Special* - Rp 25.000\n2. *Ayam Geprek* - Rp 20.000\n3. *Es Teh Jumbo* - Rp 6.000\n4. *Cheeseburger* - Rp 18.000\n\nAnda bisa membelinya langsung dengan mengklik tombol 'KERANJANG' di bawah foto hidangan!";
    }
    if (text.includes("promo") || text.includes("diskon") || text.includes("potongan")) {
      return "Ada *PROMO SPESIAL HARI INI*! Diskon sebesar 30% untuk semua paket makanan. Serta *Gratis Ongkir* untuk belanja minimal Rp 50.000!";
    }
    if (text.includes("pelanggan") || text.includes("admin") || text.includes("data") || text.includes("kelola")) {
      return "Untuk mengelola data pelanggan, klik menu 'ADMIN/PELANGGAN' atau klik ikon Profil di pojok kanan atas layar! Di sana Anda bisa menambah, mengedit, mencari, menghapus data pelanggan, serta melihat riwayat pesanan mereka.";
    }
    if (text.includes("ongkir") || text.includes("kirim") || text.includes("alamat")) {
      return "Kami menawarkan pengiriman cepat super aman dalam 15-30 menit! Free ongkir jika belanjaan Anda bernilai Rp 50.000 atau ke atas.";
    }
    if (text.includes("bayar") || text.includes("harga") || text.includes("pembayaran")) {
      return "Kami mendukung transaksi aman 100%! Anda bisa membayar menggunakan e-money transfer, atau langsung secara tunai saat kurir COD sampai di rumah Anda.";
    }
    return "Terima kasih atas pesannya! Sebagai Asisten Pintar Food Market, saya merekomendasikan Nasi Goreng Special terlaris seharga Rp 25.000 dan melacak riwayat pemesanan pelanggan Anda di dashboard Admin!";
  }
}
