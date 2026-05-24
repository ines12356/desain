export interface MenuItem {
  id: string;
  name: string;
  category: 'Makanan Berat' | 'Minuman' | 'Snack' | 'Dessert';
  price: number;
  description: string;
  rating: number;
  image: string;
  isPopular?: boolean;
}

export interface Customer {
  id: string; // Dynamic uuid/timestamp ID
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: string; // ISO string or simple locale date
  totalOrders: number;
  totalSpend: number;
  notes?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string; // linked customer or 'guest'
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
  status: 'Diproses' | 'Selesai' | 'Dibatalkan';
  deliveryAddress: string;
  phone: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
