"use client";
import React, { useState } from "react";

const conversations = [
  { id: 1, name: "Degvora Studio", avatar: "D", color: "bg-purple-600", lastMsg: "The new build looks amazing 🚀", time: "9:41 AM", unread: 2 },
  { id: 2, name: "Hamza Jaffar", avatar: "H", color: "bg-blue-600", lastMsg: "Working on the macOS UI rn", time: "8:20 AM", unread: 0 },
  { id: 3, name: "Design Team", avatar: "✦", color: "bg-pink-600", lastMsg: "Glassmorphism looks perfect", time: "Yesterday", unread: 5 },
  { id: 4, name: "GitHub Actions", avatar: "G", color: "bg-slate-600", lastMsg: "Build succeeded ✅", time: "Yesterday", unread: 0 },
];

const MessageApp = () => {
  const [active, setActive] = useState(conversations[0]);
  const [messages, setMessages] = useState<{ text: string; me: boolean }[]>([
    { text: "Hey! The new portfolio OS concept is looking incredible.", me: false },
    { text: "Thanks! Been working really hard on the macOS-style interactions.", me: true },
    { text: "The glassmorphism effects are top notch 🔥", me: false },
    { text: "Can't wait to show the full demo!", me: true },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input.trim(), me: true }]);
    setInput("");
  };

  return (
    <div className="w-full h-full flex bg-[#1c1c1e] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-60 border-r border-white/10 flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-white/10">
          <input placeholder="Search" className="w-full bg-white/10 rounded-lg px-3 py-1.5 text-sm outline-none placeholder-white/30 text-white" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(c => (
            <button key={c.id} onClick={() => setActive(c)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/5 transition-all text-left cursor-pointer ${active.id === c.id ? "bg-white/10" : ""}`}>
              <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>{c.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium truncate">{c.name}</span>
                  <span className="text-[10px] text-white/40 ml-1 flex-shrink-0">{c.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/50 truncate">{c.lastMsg}</p>
                  {c.unread > 0 && <span className="w-4 h-4 rounded-full bg-blue-500 text-[10px] flex items-center justify-center ml-1 flex-shrink-0">{c.unread}</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        <div className="h-10 border-b border-white/10 flex items-center px-4">
          <span className="font-medium text-sm">{active.name}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${m.me ? "bg-blue-500 text-white rounded-br-sm" : "bg-white/10 text-white/90 rounded-bl-sm"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 p-3 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="iMessage" className="flex-1 bg-white/10 rounded-full px-4 py-1.5 text-sm outline-none placeholder-white/30 text-white" />
          <button onClick={send} className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 flex items-center justify-center transition-all cursor-pointer">
            <svg className="w-4 h-4 text-white rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageApp;
