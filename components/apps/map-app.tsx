"use client";
import React, { useState, useEffect } from "react";

const workflowSteps = [
  {
    id: 1,
    title: "Discovery & Idea",
    phase: "PHASE 01",
    tagline: "The Spark 💡",
    metric: "100% Scope",
    color: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.25)",
    textColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    desc: "We analyze client requirements, map out comprehensive architectural logic, and lock down features at Degvora HQ to build a bulletproof roadmap.",
    details: ["Requirement gathering", "Technical scoping", "Risk assessment", "Milestone planning"]
  },
  {
    id: 2,
    title: "UI/UX Blueprinting",
    phase: "PHASE 02",
    tagline: "Architecture 🗺️",
    metric: "60fps Fidelity",
    color: "from-sky-500 to-blue-600",
    glow: "rgba(14,165,233,0.25)",
    textColor: "text-sky-400",
    borderColor: "border-sky-500/20",
    desc: "Crafting interactive layout blueprints, component wireframes, and production-ready dark-mode design systems that balance stunning visuals with pristine UX.",
    details: ["User flow mapping", "High-fidelity wireframes", "Design system design", "Interactive prototypes"]
  },
  {
    id: 3,
    title: "Full-Stack Dev",
    phase: "PHASE 03",
    tagline: "Engineering ⚡",
    metric: "Clean Code",
    color: "from-indigo-500 to-purple-500",
    glow: "rgba(99,102,241,0.25)",
    textColor: "text-indigo-400",
    borderColor: "border-indigo-500/20",
    desc: "Writing modular, scalable software architecture. Spinning up blazing fast frontend logic paired alongside robust, containerized backends.",
    details: ["API contract design", "Database schema build", "Frontend implementation", "State optimization"]
  },
  {
    id: 4,
    title: "Launch & Scale",
    phase: "PHASE 04",
    tagline: "Deployment 🚀",
    metric: "99.9% Uptime",
    color: "from-rose-500 to-pink-500",
    glow: "rgba(244,63,94,0.25)",
    textColor: "text-rose-400",
    borderColor: "border-rose-500/20",
    desc: "Rigorous stress testing, automated production builds, and pushing live to highly optimized edge servers with automated scaling infrastructure.",
    details: ["CI/CD pipeline setup", "Security penetration tests", "Edge caching config", "Analytics integration"]
  }
];

export const MapApp = () => {
  const [activeStep, setActiveStep] = useState(workflowSteps[1]);
  const [radarRotation, setRadarRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarRotation((prev) => (prev + 2) % 360);
    }, 16); // High performance ~60fps paint loop
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#060913] flex flex-col lg:flex-row font-sans text-slate-200 select-none overflow-hidden relative border border-white/5">
      
      {/* Dynamic Cyber Matrix Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #38bdf8 1px, transparent 1px),
            linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
          `, 
          backgroundSize: "40px 40px" 
        }} 
      />

      {/* LEFT PANEL: Responsive Navigation Hub */}
      <div className="w-full xl:w-[25%] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-[#090e1a]/95 backdrop-blur-xl z-10 shrink-0">
        
        {/* Header HUD Status Bar */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-extrabold">
              Pipeline Index / Operations
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow-[inset_0_1px_4px_rgba(16,185,129,0.1)]">
            SYS_ONLINE
          </span>
        </div>

        {/* Responsive List Container: Horizontal Scroll on Mobile, Vertical Stack on Desktop */}
        <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto p-3 lg:p-4 gap-2.5 lg:space-y-2.5 scrollbar-none lg:custom-scrollbar flex-1">
          {workflowSteps.map((step) => {
            const isSelected = activeStep.id === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step)}
                className={`relative p-3 lg:p-4 rounded-lg border transition-all duration-300 flex flex-col justify-between text-left shrink-0 w-48 sm:w-64 lg:w-full group focus:outline-none ${
                  isSelected 
                    ? "bg-slate-900/60 border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                    : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5"
                }`}
                style={{
                  boxShadow: isSelected ? `0 12px 40px -15px ${step.glow}` : undefined
                }}
              >
                {/* Active Indicator Ribbon (Left border on desktop, bottom border on mobile) */}
                <div className={`absolute left-0 lg:top-3 lg:bottom-3 bottom-0 lg:left-0 right-0 lg:right-auto h-0.5 lg:h-auto lg:w-[3px] rounded transition-all duration-300 ${
                  isSelected ? `bg-gradient-to-b ${step.color}` : "bg-transparent opacity-0"
                }`} />

                <div className="flex items-start justify-between w-full lg:pl-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 block">
                      {step.phase}
                    </span>
                    <h4 className={`text-xs sm:text-sm font-bold tracking-tight transition-colors duration-200 ${
                      isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    }`}>
                      {step.title}
                    </h4>
                  </div>

                  <span className={`text-[9px] font-mono font-medium px-1.5 py-0.5 rounded border transition-colors hidden sm:inline-block ${
                    isSelected 
                      ? "bg-white/5 border-white/10 text-slate-300" 
                      : "bg-transparent border-transparent text-slate-500 group-hover:text-slate-400"
                  }`}>
                    {step.metric}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL: Live Radar & Metrics Viewport */}
      <div className="flex-1 flex flex-col relative bg-[#04070e]">
        
        {/* Dynamic Telemetry Radar Viewport (Responsive Height scaling) */}
        <div className="h-[180px] sm:h-[220px] lg:h-[45%] border-b border-white/5 relative flex items-center justify-center p-6 bg-black/20 overflow-hidden shrink-0">
          
          {/* Radial Aura Glow Backdrop matching chosen step */}
          <div 
            className="absolute w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none transition-all duration-1000"
            style={{
              backgroundColor: activeStep.id === 1 ? '#10b981' : activeStep.id === 2 ? '#0ea5e9' : activeStep.id === 3 ? '#6366f1' : '#f43f5e'
            }}
          />

          {/* SVG Radar Vector Base */}
          <svg className="absolute w-56 h-56 opacity-40 text-slate-700 pointer-events-none" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="100" y1="5" x2="100" y2="195" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <line x1="5" y1="100" x2="195" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          </svg>

          {/* Sweep Signal Beam */}
          <div 
            className="absolute w-28 h-[2px] origin-left bg-gradient-to-r from-transparent via-sky-500/20 to-sky-400 pointer-events-none shadow-[0_0_8px_rgba(56,189,248,0.5)]"
            style={{ 
              transform: `rotate(${radarRotation}deg)`,
              left: '50%',
              top: '50%'
            }}
          />

          {/* Constellation Nodes Mapping */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className={`absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981] transition-all duration-1000 ease-out`}
              style={{ left: `${35 + (activeStep.id * 7)}%`, top: `${30 + (activeStep.id * 9)}%` }}
            />
            <div 
              className="absolute w-1.5 h-1.5 rounded-full bg-sky-400/50 shadow-[0_0_8px_rgba(56,189,248,0.4)] transition-all duration-700 delay-75"
              style={{ left: `${68 - (activeStep.id * 6)}%`, top: `${65 - (activeStep.id * 5)}%` }}
            />
            <div 
              className="absolute w-1 h-1 rounded-full bg-purple-500/30 transition-all duration-500"
              style={{ left: `${20 + (activeStep.id * 12)}%`, top: `${75 - (activeStep.id * 8)}%` }}
            />
          </div>

          {/* Coordinate Meta HUD Label */}
          <div className="absolute bottom-2.5 right-3 font-mono text-[9px] text-slate-500 tracking-wider flex items-center gap-1.5">
            <span>SYS_LOC // DEG_HQ</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Inspection Panel (Fills the remaining area cleanly) */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-transparent to-slate-950/50">
          
          {/* Main Context Block */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium tracking-wide uppercase bg-gradient-to-r text-slate-950 shadow-md ${activeStep.color}`}>
                {activeStep.tagline}
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                {activeStep.title} Directives
              </h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-normal max-w-2xl">
              {activeStep.desc}
            </p>
          </div>

          {/* Sub-process Grid Matrix */}
          <div className="mt-4 flex-1 flex flex-col justify-center">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2">
              Operational Sub-modules
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeStep.details.map((detail, idx) => (
                <div key={idx} className={`flex items-center gap-2.5 bg-white/[0.01] border ${activeStep.borderColor} rounded-xl p-2.5 transition-colors duration-300 hover:bg-white/[0.03]`}>
                  <span className={`text-xs font-mono font-semibold ${activeStep.textColor}`}>0{idx + 1}</span>
                  <span className="text-xs text-slate-300 font-medium truncate">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Footer Actions */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 shrink-0">
            <span>TELEMETRY_STATUS: NOMINAL</span>
            <span className="text-sky-400/80 hover:text-sky-300 cursor-pointer flex items-center gap-0.5 transition-colors font-bold">
              Execute Stack <span>→</span>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MapApp;