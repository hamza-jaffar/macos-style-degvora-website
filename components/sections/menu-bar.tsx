"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const MenuBar = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Formats to look exactly like Apple's top bar: "Fri Jun 12  5:51 AM"
      const formatted = now.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      
      // Clean up consecutive spaces to closely match apple system tracking spacing
      setDateTime(formatted.replace(/,/g, ""));
    };

    // Run instantly on mount, then update every second for clock precision
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full h-7 fixed top-0 left-0 z-50 flex items-center justify-between px-4
                 bg-slate-950/35 backdrop-blur-md 
                 border-b border-white/[0.08] text-white/90 text-[13px] select-none font-sans"
    >
      {/* LEFT SIDE: Apple Logo + System Context Options */}
      <div className="flex items-center gap-4">
        <div className="flex items-center cursor-pointer transition-opacity hover:opacity-100 opacity-90">
          <Image 
            src="/icons/apple.png" 
            width={14} 
            height={14} 
            alt="Apple Logo" 
            className="invert-0 brightness-200" 
          />
        </div>
        
        {/* Core Menu Window Links */}
        <span className="font-semibold cursor-pointer tracking-wide text-white">Finder</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden sm:inline">File</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden sm:inline">Edit</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden md:inline">View</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden md:inline">Go</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden lg:inline">Window</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden lg:inline">Help</span>
      </div>

      {/* RIGHT SIDE: Control Center Utilities + Dynamic Live Time String */}
      <div className="flex items-center gap-4.5 font-normal tracking-wide">
        {/* Dynamic status icons tray */}
        <div className="flex items-center gap-2">
          {[1,2,3,4].map((iconName) => (
            <div key={iconName} className="cursor-pointer transition-opacity flex items-center">
              <Image
                src={`/icons/${iconName}-menu-item.png`}
                width={22}
                height={22}
                alt={`${iconName} Icon`}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Live System Time Render */}
        <div className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity pl-1 tabular-nums font-normal">
          {dateTime || "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;