import { MenuItem, Customer } from "./types";

export const INITIAL_MENU: MenuItem[] = [
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
    description: "Camilan pembuka manis kue cokelat panggang lembut bertekstur lava coklat cair lumer hangat di bagian dalam, disajikan dengan buah stroberi segar.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
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
