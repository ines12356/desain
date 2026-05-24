import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client if API key is provided
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini Client:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found, fallback chatbot assistant enabled.");
}

// Menu reference for chatbot context
const foodMarketContext = `
Nama Toko: FOOD MARKET (E-Commerce Makanan)
Slogan: Tempat terbaik untuk menemukan makanan lezat dan berkualitas.

Kategori Menu:
1. Makanan Berat (Heavy Meals)
2. Minuman (Drinks)
3. Snack
4. Dessert

Produk Unggulan:
- Nasi Goreng Special: Rp 25.000 (Nasi goreng harum, gurih dengan telur, sosis, bakso, kerupuk)
- Ayam Geprek: Rp 20.000 (Ayam garing crispy dilumuri sambal bawang membara + nasi panas)
- Es Teh Jumbo: Rp 6.000 (Teh manis segar porsi jumbo pelepas dahaga)
- Cheeseburger: Rp 18.000 (Roti brioche dengan patty daging sapi panggang juicy + keju lumer)

Promo Aktif:
- Promo Spesial Hari Ini! Diskon 30% untuk semua paket makanan. Hubungi tombol "Pesan Sekarang" atau cari menu favorit langsung di etalase!
- Gratis Ongkir untuk minimal pembelanjaan Rp 50.000.

Bantuan & FAQ:
- Cara Pemesanan: Pilih menu makanan, tambahkan ke keranjang belanja, klik ikon keranjang, isi data diri lengkap (Nama, Email, Telepon, Alamat), lalu konfirmasi pesanan.
- Metode Pembayaran: Mendukung Pembayaran Aman 100% (Transfer Bank, E-Wallet, atau COD).
- Waktu Pengiriman: Pengiriman cepat sampai dalam 15-30 menit saja!
- Kontak Kami: WhatsApp ke 0812-3456-7890 atau DM Instagram @Foodmarket.id, Alamat di jl.kuliner no.124 Jakarta Barat.

Fitur Manajemen Data Pelanggan:
- Aplikasi ini juga memiliki modul ADMIN & DAFTAR PELANGGAN yang sangat lengkap. Anda dapat beralih ke tab pelanggan dengan menekan tautan "ADMIN/PELANGGAN" di navigation bar atau mengeklik ikon Profil Pengguna di kanan atas.
- Admin dashboard memungkinkan Anda mengelola data pelanggan (Tambah pelanggan baru, Edit email/telepon/alamat, Delete data pelanggan, melacak total pesanan mereka, pengeluaran pembelanjaan, menulis catatan admin, serta melacak riwayat transaksi pesanan).
`;

// Chatbot endpoint
app.post("/api/chatbot", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  // Fallback triggers for local static answers when Gemini API is not loaded
  const fallbackResponse = (msg: string): string => {
    const text = msg.toLowerCase();
    if (text.includes("halo") || text.includes("hi") || text.includes("hei") || text.includes("pagi") || text.includes("siang") || text.includes("sore") || text.includes("malam")) {
      return "Halo! Selamat datang di Food Market. Ada yang bisa kami bantu hari ini? Anda bisa menanyakan menu favorit, promo spesial hari ini, atau cara mengelola database pelanggan kami!";
    }
    if (text.includes("menu") || text.includes("makanan") || text.includes("minum") || text.includes("makan") || text.includes("list")) {
      return "Di Food Market terdapat menu unggulan lezat:\n1. *Nasi Goreng Special* - Rp 25.000\n2. *Ayam Geprek* - Rp 20.000\n3. *Es Teh Jumbo* - Rp 6.000\n4. *Cheeseburger* - Rp 18.000\n\nAnda bisa membelinya langsung dengan mengklik tombol 'PESANAN' di bawah foto hidangan!";
    }
    if (text.includes("promo") || text.includes("diskon") || text.includes("potongan")) {
      return "Ada *PROMO SPESIAL HARI INI*! Diskon sebesar 30% untuk semua paket makanan. Serta *Gratis Ongkir* untuk belanja minimal Rp 50.000!";
    }
    if (text.includes("pelanggan") || text.includes("admin") || text.includes("data") || text.includes("kelola")) {
      return "Untuk mengelola data pelanggan, klik menu 'ADMIN/PELANGGAN' atau klik ikon Profil (gambar kepala orang) di pojok kanan atas layar! Di sana Anda bisa menambah, mengedit, mencari, menghapus data pelanggan, serta melihat riwayat pesanan mereka.";
    }
    if (text.includes("ongkir") || text.includes("kirim") || text.includes("alamat")) {
      return "Kami menawarkan pengiriman cepat super aman dalam 15-30 menit! Free ongkir jika belanjaan Anda bernilai Rp 50.000 atau ke atas.";
    }
    if (text.includes("bayar") || text.includes("harga") || text.includes("pembayaran")) {
      return "Kami mendukung transaksi aman 100%! Anda bisa membayar menggunakan e-money atau langsung saat kurir COD sampai di rumah Anda.";
    }
    return "Terima kasih atas pesannya! Sebagai Asisten Pintar Food Market, saya merekomendasikan Nasi Goreng Special terlaris seharga Rp 25.000 dan melacak riwayat pemesanan pelanggan Anda di dashboard Admin!";
  };

  if (!ai) {
    // Generate simulated reply
    const reply = fallbackResponse(message);
    // Keep it realistic with a tiny simulated delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return res.json({ text: reply });
  }

  try {
    // Compile history for context
    const chatHistory = history ? history.map((h: any) => ({
      role: h.role,
      parts: [{ text: h.content }]
    })) : [];

    // Add current query
    chatHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: `You are the friendly, professional virtual customer assistant of "Food Market". Answer user inquiries briefly and clearly in Indonesian. Keep replies structured and charming. Emphasize ordering food online and managing customer data on the interactive dashboard. Here is your knowledge store:\n${foodMarketContext}`
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini request failed:", error);
    const reply = fallbackResponse(message);
    return res.json({
      text: `${reply}\n\n*(Catatan Admin: Panggilan robot dialihkan ke asisten lokal karena kegagalan API: ${error.message || error})*`
    });
  }
});

// Setup Vite Dev server or Production file serving
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite server for development mode
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);
    console.log("Vite development server loaded.");
  } else {
    // Production serving static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static server configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Food Market app running on http://0.0.0.0:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
