"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import AppLayout from "@/components/layout/AppLayout";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SESSION_ID = "main-session";

const QUICK_PROMPTS = [
  "Cara isi nama katakana?",
  "Apa itu SSW Tokutei Ginou?",
  "Tips wawancara kerja Jepang",
  "Contoh 自己PR yang bagus",
  "Berapa gaji SSW pertanian?",
  "Cara konversi tahun ke Reiwa",
  "Perbedaan Gijinkoku dan SSW",
  "Terjemahkan: Saya bekerja keras",
];

function SendIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>;
}
function ClearIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
}
function BotIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><line x1="12" y1="15" x2="12" y2="15" strokeWidth="3"/><line x1="8" y1="15" x2="8" y2="15" strokeWidth="3"/><line x1="16" y1="15" x2="16" y2="15" strokeWidth="3"/></svg>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function loadHistory() {
    const res = await fetch(`/api/chat?sessionId=${SESSION_ID}`);
    const data = await res.json();
    if (data.messages?.length > 0) {
      setMessages(data.messages.map((m: Message & { id: string }) => ({
        id: m.id || Math.random().toString(),
        role: m.role,
        content: m.content,
      })));
    }
  }

  async function sendMessage(text?: string) {
    const msg = text || input.trim();
    if (!msg || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: messages.slice(-10),
          sessionId: SESSION_ID,
        }),
      });
      const data = await res.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || "Maaf, terjadi kesalahan.",
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      toast.error("Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function clearChat() {
    setMessages([]);
    toast.success("Chat dibersihkan");
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] -mx-4 -mt-4">
        {/* Chat header */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
              <BotIcon />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Sensei AI · 先生AI</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[10px] text-emerald-400">Online · Siap membantu</p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={clearChat} className="flex items-center gap-1.5 text-xs text-surface-200/40 hover:text-red-400 transition-colors glass-light rounded-lg px-2.5 py-1.5">
              <ClearIcon /> Hapus
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600/30 to-purple-600/20 border border-primary-600/20 flex items-center justify-center mx-auto mb-4">
                <BotIcon />
              </div>
              <p className="text-sm font-semibold text-white mb-1">Sensei AI</p>
              <p className="text-xs text-surface-200/40 mb-6 max-w-xs mx-auto">
                Halo! Tanya saya seputar CV Jepang, SSW, wawancara, gaji, dan kehidupan di Jepang 😊
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {QUICK_PROMPTS.map((p) => (
                  <button key={p} onClick={() => sendMessage(p)}
                    className="text-xs glass-light border border-white/8 rounded-full px-3 py-1.5 text-surface-200/60 hover:text-primary-300 hover:border-primary-600/30 transition-all">
                    {p}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <BotIcon />
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user" ? "chat-user text-white" : "chat-ai text-surface-200/90"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <BotIcon />
              </div>
              <div className="chat-ai px-4 py-3 flex gap-1.5 items-center">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick prompts saat ada history */}
        {messages.length > 0 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.slice(0, 4).map((p) => (
              <button key={p} onClick={() => sendMessage(p)}
                className="text-xs glass-light border border-white/5 rounded-full px-3 py-1.5 text-surface-200/50 hover:text-primary-300 whitespace-nowrap transition-colors flex-shrink-0">
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-white/5">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pertanyaan Anda..."
              rows={1}
              className="input-dark flex-1 rounded-2xl px-4 py-3 text-sm resize-none max-h-32"
              style={{ minHeight: "44px" }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="btn-primary w-11 h-11 rounded-2xl flex items-center justify-center text-white disabled:opacity-40 flex-shrink-0"
            >
              <SendIcon />
            </motion.button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
