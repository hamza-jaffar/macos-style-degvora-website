"use client";
import React, { useState, useMemo } from "react";
import { Columns, Eye, Code, Layers, FileCode, CheckCircle } from "lucide-react";
import { initialFiles, MarkdownFile } from "@/constant/doc-app-data";

export const DocApp = () => {
  const [files, setFiles] = useState<MarkdownFile[]>(initialFiles);
  // Setting the default startup file focus to our new diagnostics status tracker:
  const [activeFileId, setActiveFileId] = useState<string>("system-status");
  const [viewMode, setViewMode] = useState<"split" | "edit" | "preview">("split");

  // Fetch data context for current active document link
  const currentFile = useMemo(() => {
    return files.find(f => f.id === activeFileId) || files[0];
  }, [files, activeFileId]);

  // Document metrics tracking calculations
  const metrics = useMemo(() => {
    const text = currentFile.rawText || "";
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return {
      chars: text.length,
      words: words,
      lines: text.split("\n").length
    };
  }, [currentFile]);

  // Document string text modification state handler
  const handleTextChange = (newVal: string) => {
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, rawText: newVal } : f));
  };

  // Basic lightweight custom Markdown syntax parser compiler line worker
  const renderMarkdown = (mdText: string) => {
    return mdText.split("\n").map((line, idx) => {
      const cleanLine = line.trim();

      if (cleanLine.startsWith("# ")) {
        return <h1 key={idx} className="text-xl sm:text-2xl font-black text-white tracking-tight border-b border-white/5 pb-2 mt-4 mb-3 first:mt-0 font-sans">{cleanLine.replace("# ", "")}</h1>;
      }
      if (cleanLine.startsWith("## ")) {
        return <h2 key={idx} className="text-sm sm:text-base font-bold text-sky-400 tracking-tight mt-5 mb-2 font-sans">{cleanLine.replace("## ", "")}</h2>;
      }
      if (cleanLine.startsWith("### ")) {
        return <h3 key={idx} className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wide mt-4 mb-2 font-sans">{cleanLine.replace("### ", "")}</h3>;
      }
      if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
        const itemText = cleanLine.replace(/^[*-\s]+/, "");
        return (
          <ul key={idx} className="list-none pl-1 my-1 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-sky-500 select-none mt-1 text-[10px]">■</span>
              <span>{itemText}</span>
            </li>
          </ul>
        );
      }
      if (cleanLine === "---") {
        return <hr key={idx} className="border-white/10 my-4" />;
      }
      if (!cleanLine) {
        return <div key={idx} className="h-2" />;
      }

      return <p key={idx} className="text-xs sm:text-sm text-slate-400 leading-relaxed my-1 font-sans">{line}</p>;
    });
  };

  return (
    <div className="w-full h-full bg-[#141722] text-slate-200 flex flex-col overflow-hidden border border-white/5 font-sans select-none">

      {/* MACOS APPLICATION TOOLBAR ACTION HEADER */}
      <div className="bg-[#1c1f2e] border-b border-black/40 px-3 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <span className="text-[11px] font-mono tracking-wider text-slate-500 font-bold uppercase hidden sm:inline">
          Notes Engine v1.0
        </span>

        {/* Dynamic View Mode Split Controller Segment Toggle Switch */}
        <div className="bg-black/40 border border-white/5 rounded-lg p-0.5 flex items-center gap-0.5">
          <button
            onClick={() => setViewMode("edit")}
            className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${viewMode === "edit" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Code className="w-3 h-3" />
            <span className="hidden sm:inline">Editor</span>
          </button>
          <button
            onClick={() => setViewMode("split")}
            className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${viewMode === "split" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Columns className="w-3 h-3" />
            <span className="hidden sm:inline">Split Screen</span>
          </button>
          <button
            onClick={() => setViewMode("preview")}
            className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all ${viewMode === "preview" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </div>

      {/* LOWER PRIMARY WORKSPACE BOX WRAPPER */}
      <div className="flex-1 w-full flex overflow-hidden relative">

        {/* SIDEBAR FILE NAVIGATOR SYSTEM PANEL PANEL */}
        <div className="w-44 sm:w-52 border-r border-black/30 bg-[#161a29]/95 shrink-0 hidden md:flex flex-col justify-between p-3">
          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-mono font-black text-slate-500 tracking-widest uppercase block px-2 mb-1.5">
                Workspace Logs
              </span>
              <div className="space-y-0.5">
                {files.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFileId(f.id)}
                    className={`w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-left text-xs transition-all ${activeFileId === f.id ? "bg-sky-500/10 text-sky-400 font-bold border border-sky-500/10" : "text-slate-400 hover:bg-white/[0.02]"}`}
                  >
                    <span>{f.icon}</span>
                    <span className="truncate">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Diagnostics Meta Cluster HUD */}
          <div className="bg-black/20 rounded-xl p-2.5 border border-white/5 space-y-1 font-mono text-[9px] text-slate-500">
            <div className="flex items-center justify-between">
              <span>Lines:</span>
              <span className="text-slate-400 font-bold">{metrics.lines}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Words:</span>
              <span className="text-slate-400 font-bold">{metrics.words}</span>
            </div>
          </div>
        </div>

        {/* EDITOR INTERFACE AND CANVAS ENGINE AREA PANELS */}
        <div className="flex-1 flex overflow-hidden bg-[#0d0f17]">

          {/* THE SOURCE CODE RAW EDITOR BOX TEXTAREA LAYOUT PANE */}
          {(viewMode === "edit" || viewMode === "split") && (
            <div className="flex-1 h-full flex flex-col relative border-r border-black/40">
              <div className="bg-[#121522] px-4 py-1.5 border-b border-white/5 flex items-center justify-between font-mono text-[10px] text-slate-500 shrink-0">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3 h-3 text-sky-400" /> SOURCE_MATRIX
                </span>
                <span className="text-emerald-400/80 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">Writable</span>
              </div>
              <textarea
                value={currentFile.rawText}
                onChange={e => handleTextChange(e.target.value)}
                className="w-full flex-1 p-4 bg-transparent text-slate-300 font-mono text-xs sm:text-sm leading-6 outline-none resize-none selection:bg-sky-500/20 scrollbar-none caret-white"
                spellCheck={false}
                placeholder="# Start coding markdown strings..."
              />
            </div>
          )}

          {/* THE INTERACTIVE DISPLAY PREVIEW MANIFEST RENDERING CANVAS */}
          {(viewMode === "preview" || viewMode === "split") && (
            <div className="flex-1 h-full flex flex-col bg-[#0f111a]">
              <div className="bg-[#121522] px-4 py-1.5 border-b border-white/5 flex items-center justify-between font-mono text-[10px] text-slate-500 shrink-0">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-purple-400" /> PARSED_TYPOGRAPHY
                </span>
                <span className="flex items-center gap-1 text-slate-400 font-semibold">
                  <CheckCircle className="w-3 h-3 text-emerald-400" /> Real-time
                </span>
              </div>
              <div className="w-full flex-1 p-5 sm:p-7 overflow-y-auto custom-scrollbar selection:bg-sky-500/20 max-w-2xl mx-auto space-y-1">
                {renderMarkdown(currentFile.rawText)}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DocApp;