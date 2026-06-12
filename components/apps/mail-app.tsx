"use client";
import React, { useState } from "react";

const mails = [
  { id: 1, from: "GitHub", subject: "Your PR was merged 🎉", preview: "Pull request #42 'feat: macOS window system' has been merged into main.", time: "9:41 AM", read: false, tag: "primary" },
  { id: 2, from: "Vercel", subject: "Deployment Successful", preview: "degvora-website deployed to production. Visit your deployment at degvora.vercel.app", time: "8:30 AM", read: false, tag: "primary" },
  { id: 3, from: "Figma", subject: "Hamza shared a file with you", preview: "Portfolio OS v3 — Click to open in Figma and start collaborating.", time: "Yesterday", read: true, tag: "updates" },
  { id: 4, from: "Linear", subject: "[Degvora] Task assigned to you", preview: "Build interactive macOS dock — Priority: High. Due Jun 15.", time: "Yesterday", read: true, tag: "updates" },
  { id: 5, from: "Notion", subject: "Weekly digest", preview: "Here's what's been happening in your workspace this week.", time: "Jun 10", read: true, tag: "promotions" },
];

const MailApp = () => {
  const [selected, setSelected] = useState(mails[0]);

  return (
    <div className="w-full h-full flex bg-[#1c1c1e] text-white overflow-hidden">
      {/* Mail list */}
      <div className="w-72 border-r border-white/10 flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-white/10">
          <input placeholder="Search Mail" className="w-full bg-white/10 rounded-lg px-3 py-1.5 text-sm outline-none placeholder-white/30 text-white" />
        </div>
        <div className="flex-1 overflow-y-auto">
          {mails.map(m => (
            <button key={m.id} onClick={() => setSelected(m)}
              className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer ${selected.id === m.id ? "bg-white/10" : ""}`}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-1.5">
                  {!m.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />}
                  <span className={`text-sm ${!m.read ? "font-semibold text-white" : "text-white/60"}`}>{m.from}</span>
                </div>
                <span className="text-[10px] text-white/40 ml-2 flex-shrink-0">{m.time}</span>
              </div>
              <p className={`text-xs mb-0.5 ${!m.read ? "font-medium text-white/90" : "text-white/60"}`}>{m.subject}</p>
              <p className="text-[11px] text-white/40 truncate">{m.preview}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Mail content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold mb-1">{selected.subject}</h2>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <span className="font-medium text-white/80">{selected.from}</span>
            <span>•</span>
            <span>{selected.time}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-white/80 leading-relaxed text-sm">{selected.preview}</p>
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-white/40">
            <p>This email is for informational purposes only.</p>
          </div>
        </div>
        <div className="border-t border-white/10 p-3 flex gap-2">
          <button className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-medium transition-all cursor-pointer">Reply</button>
          <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition-all cursor-pointer">Forward</button>
        </div>
      </div>
    </div>
  );
};

export default MailApp;
