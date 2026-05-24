import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, HelpCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "Halo! Selamat datang di Food Market. 🍔🥤 Ada yang bisa saya bantu hari ini? Anda bisa menanyakan menu terpopuler, diskon spesial 30% hari ini, atau cara mengelola database pelanggan kami!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of message thread
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessageText = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    const userMsg: ChatMessage = {
      id: `m-u-${Date.now()}`,
      role: "user",
      content: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    // Append user query to thread list
    setMessages((prev) => [...prev, userMsg]);

    try {
      // Map ongoing messages simplified history to back-and-forth API structure
      const cleanedHistory = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessageText,
          history: cleanedHistory.slice(-10) // Only send the last few turns for context brevity
        })
      });

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: `m-b-${Date.now()}`,
        role: "model",
        content: data.text || "Mohon maaf, terjadi gangguan koneksi ke server Food Market. Silakan coba kembali sesaat lagi.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chatbot query failed:", err);
      const errMsg: ChatMessage = {
        id: `m-err-${Date.now()}`,
        role: "model",
        content: "Halo! Maaf ya, asisten virtual saya sedang sibuk. Namun dari asisten lokal kami: Nasi Goreng Special (Rp 25.000) dan Cheeseburger (Rp 18.000) adalah rekomendasi terlaris kami hari ini!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    // Focus or submit after micro-delay
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      form?.requestSubmit();
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* 1. CLOSED FLOATING TOGGLE BUBBLE */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-slate-900 hover:bg-slate-800 text-amber-300 p-4 rounded-full shadow-[6px_6px_0px_0px_rgba(245,158,11,1)] transition-all duration-300 border-2 border-slate-900 group flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 animate-bounce-slow"
          title="Tanya Asisten AI Food Market"
        >
          <MessageSquare className="w-6 h-6 stroke-[2.5px]" />
          
          {/* Badge indicator */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
          
          {/* Tooltip bubble hint */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-900 text-white text-[11px] py-1.5 px-3 rounded-lg whitespace-nowrap border border-slate-700 font-bold uppercase tracking-wider">
            Tanya Chatbot 💬
          </span>
        </button>
      )}

      {/* 2. OPENED CHAT DIALOG BOX PANEL */}
      {isOpen && (
        <div className="bg-white border-3 border-slate-900 rounded-2xl w-[340px] sm:w-[380px] h-[480px] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col animate-fade-in">
          
          {/* Chat Window Header */}
          <div className="bg-slate-900 p-4 border-b-2 border-slate-900 flex justify-between items-center text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 border border-slate-900 font-black animate-pulse">
                <Bot className="w-5.5 h-5.5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-sans font-black text-white m-0 tracking-widest uppercase">
                  CHATBOT FOOD MARKET
                </h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                  <span className="text-[9px] font-mono text-green-400 font-semibold tracking-wider uppercase">Online Asisten</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-800"
              title="Tutup Obrolan"
            >
              <X className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </div>

          {/* Quick suggestions rail */}
          <div className="px-3 py-2 bg-slate-50 border-b border-gray-100 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none text-[10px] font-medium text-slate-700">
            <button 
              onClick={() => handleQuickQuestion("Rekomendasi Menu Terlaris")} 
              className="px-2.5 py-1 bg-white border border-gray-200 rounded-full hover:border-amber-500 hover:bg-amber-50 cursor-pointer"
            >
              🔥 Terlaris?
            </button>
            <button 
              onClick={() => handleQuickQuestion("Promo aktif hari ini")} 
              className="px-2.5 py-1 bg-white border border-gray-200 rounded-full hover:border-amber-500 hover:bg-amber-50 cursor-pointer"
            >
              🏷️ Ada Promo?
            </button>
            <button 
              onClick={() => handleQuickQuestion("Cara bayar & kirim makanan")} 
              className="px-2.5 py-1 bg-white border border-gray-200 rounded-full hover:border-amber-500 hover:bg-amber-50 cursor-pointer"
            >
              🛵 Pengiriman?
            </button>
            <button 
              onClick={() => handleQuickQuestion("Cara mengelola data pelanggan")} 
              className="px-2.5 py-1 bg-white border border-gray-200 rounded-full hover:border-amber-500 hover:bg-amber-50 cursor-pointer"
            >
              🗄️ Kelola Profil?
            </button>
          </div>

          {/* Chat Threads Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
            {messages.map((m) => {
              const isModel = m.role === "model";
              return (
                <div 
                  key={m.id}
                  className={`flex ${isModel ? "justify-start" : "justify-end"} items-end gap-1.5 animate-fade-in`}
                >
                  {/* Speaker Icons if bot */}
                  {isModel && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-900 flex items-center justify-center text-slate-700 text-[10px] shrink-0 font-bold font-mono">
                      F
                    </div>
                  )}

                  {/* Bubble wrapper */}
                  <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs font-sans leading-relaxed shadow-xs ${
                    isModel
                      ? "bg-white text-slate-800 border border-gray-200 rounded-bl-none"
                      : "bg-slate-900 text-white border-2 border-slate-900 rounded-br-none"
                  }`}>
                    <p className="whitespace-pre-line m-0">{m.content}</p>
                    <span className={`block text-[8.5px] font-mono mt-1.5 text-right ${isModel ? "text-gray-400" : "text-amber-300"}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing activity loader indicator */}
            {isLoading && (
              <div className="flex justify-start items-center gap-2 animate-pulse">
                <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-900 flex items-center justify-center text-slate-700 text-[10px] shrink-0 font-sans font-bold">
                  F
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2.5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message form textfield */}
          <form 
            id="chat-form"
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              required
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-gray-50 focus:bg-white text-slate-800 leading-none h-9"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-slate-900 disabled:bg-gray-200 disabled:text-gray-400 hover:bg-slate-800 text-amber-300 rounded-xl transition-all cursor-pointer h-9 w-9 flex items-center justify-center shrink-0 border border-slate-900"
              title="Kirim pesan"
            >
              <Send className="w-4 h-4 stroke-[2.5px]" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
