"use client";
import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, X, Menu, Inbox, ChevronRight } from "lucide-react";
import { MAIL_PRESETS } from "@/constant/mail-app-data";

export const MailApp = () => {
  // Form States
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  // Navigation & Control states
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Trigger compose window layout with selected template
  const handleSelectPreset = (preset: typeof MAIL_PRESETS[0]) => {
    setMailSubject(preset.subject);
    setMailBody(preset.body);
    // On small screens, close navigation drawer to reveal the form canvas immediately
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleSendMail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !senderName || !mailSubject || !mailBody) {
      setToast({ type: "error", message: "Please fill out all transmission fields." });
      return;
    }

    setIsSending(true);
    setToast(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "contact@degvora.com",
          name: senderName,
          email: senderEmail,
          subject: mailSubject,
          message: mailBody,
        }),
      });

      if (response.ok) {
        setToast({ type: "success", message: "Email safely routed to Degvora!" });
        setSenderName("");
        setSenderEmail("");
        setMailSubject("");
        setMailBody("");
      } else {
        throw new Error();
      }
    } catch (err) {
      setToast({ type: "error", message: "Delivery failed. Please try again." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e24] text-slate-200 overflow-hidden font-sans select-none">
      
      {/* TOP GMAIL-STYLE NAVBAR */}
      <div className="bg-[#2a2b36] border-b border-white/5 h-14 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 font-medium text-sm text-white">
            <Mail className="w-4 h-4 text-red-400" />
            <span>Degvora Mail</span>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-mono hidden sm:block bg-black/20 px-2 py-1 rounded">
          To: contact@degvora.com
        </div>
      </div>

      {/* CORE WORKSPACE AREA */}
      <div className="flex-1 w-full flex overflow-hidden relative">
        
        {/* SIDEBAR: INBOX CATEGORIES & PRESETS */}
        <div className={`
          absolute md:relative inset-y-0 left-0 z-40 
          w-64 bg-[#21222c] border-r border-white/5 transform transition-transform duration-200 ease-in-out shrink-0
          flex flex-col p-2
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:hidden"}
        `}>
          <div className="flex items-center gap-3 px-3 py-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
            <Inbox className="w-3.5 h-3.5" />
            <span>Contact Templates</span>
          </div>

          <div className="mt-2 space-y-0.5 flex-1 overflow-y-auto">
            {MAIL_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs text-slate-300 hover:bg-white/5 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span className="truncate">{preset.label}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>

        {/* BACKDROP SHADE FOR MOBILE SIDEBAR OPEN */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/40 z-30 md:hidden"
          />
        )}

        {/* COMPOSE VIEWPORT CONTAINER */}
        <div className="flex-1 bg-[#181920] overflow-y-auto flex flex-col p-4 sm:p-6">
          <form onSubmit={handleSendMail} className="bg-[#21222c] border border-white/5 rounded-xl shadow-xl flex flex-col max-w-3xl w-full mx-auto overflow-hidden my-auto">
            
            {/* New Message Header strip */}
            <div className="bg-[#2a2b36] px-4 py-2.5 flex items-center justify-between border-b border-white/5">
              <span className="text-xs font-semibold text-white">New Message</span>
              <span className="text-[11px] text-slate-500 font-mono sm:hidden">contact@degvora.com</span>
            </div>

            {/* Fields container */}
            <div className="divide-y divide-white/5 text-xs">
              
              {/* Name entry line */}
              <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2 gap-1 sm:gap-4">
                <span className="text-slate-500 w-16">Your Name:</span>
                <input 
                  type="text"
                  required
                  placeholder="John Doe"
                  value={senderName}
                  onChange={e => setSenderName(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 py-1"
                />
              </div>

              {/* Email entry line */}
              <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2 gap-1 sm:gap-4">
                <span className="text-slate-500 w-16">From:</span>
                <input 
                  type="email"
                  required
                  placeholder="your-email@domain.com"
                  value={senderEmail}
                  onChange={e => setSenderEmail(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 py-1"
                />
              </div>

              {/* Subject line */}
              <div className="flex flex-col sm:flex-row sm:items-center px-4 py-2 gap-1 sm:gap-4">
                <span className="text-slate-500 w-16">Subject:</span>
                <input 
                  type="text"
                  required
                  placeholder="Inquiry Topic"
                  value={mailSubject}
                  onChange={e => setMailSubject(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 py-1"
                />
              </div>

              {/* Text Area Content box */}
              <div className="p-4">
                <textarea 
                  required
                  rows={8}
                  placeholder="Say hello or detail your layout requirements here..."
                  value={mailBody}
                  onChange={e => setMailBody(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 resize-none leading-relaxed font-sans"
                />
              </div>
            </div>

            {/* Bottom Gmail Blue send action row */}
            <div className="bg-[#2a2b36]/40 px-4 py-3 border-t border-white/5 flex items-center justify-between">
              <button
                type="submit"
                disabled={isSending}
                className="bg-[#1a73e8] hover:bg-[#155cb4] text-white font-semibold text-xs px-5 py-2 rounded-md flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                {isSending ? "Sending..." : "Send"}
                <Send className="w-3 h-3" />
              </button>
              
              <span className="text-[10px] text-slate-500 italic hidden sm:inline">
                Secure link mapped to contact@degvora.com
              </span>
            </div>

          </form>
        </div>
      </div>

      {/* MINIMAL BROADCST TOAST HUD */}
      {toast && (
        <div className="absolute bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl bg-[#2a2b36] border-white/10 font-sans text-xs">
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span className="text-slate-200 font-medium">{toast.message}</span>
          <button 
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer pl-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};

export default MailApp;