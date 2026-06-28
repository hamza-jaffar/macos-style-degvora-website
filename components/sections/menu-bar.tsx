"use client";

import { TaskBarData } from "@/constant/task-bar-data";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const MenuBar = ({ onAppClick }: { onAppClick?: (id: string) => void; }) => {
  const [dateTime, setDateTime] = useState("");
  const [mobileTime, setMobileTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Full desktop format: "Fri Jun 12 5:54 AM"
      const fullFormat = now.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Compact mobile format: "5:54 AM"
      const compactFormat = now.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      
      setDateTime(fullFormat.replace(/,/g, ""));
      setMobileTime(compactFormat);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full h-7 fixed top-0 left-0 z-1000 flex items-center justify-between px-3 md:px-4
                 bg-slate-950/35 backdrop-blur-md 
                 border-b border-white/8 text-white/90 text-[13px] select-none font-sans"
    >
      {/* LEFT SIDE: Apple Logo + System Context Options */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center cursor-pointer transition-opacity hover:opacity-100 opacity-90">
          <Image 
            src="/icons/apple.png" 
            width={14} 
            height={14} 
            alt="Apple Logo" 
            className="invert-0 brightness-200" 
          />
        </div>
        
        {/* Core Menu Window Links: "Finder" stays visible; sub-menus collapse progressively */}
        <span className="font-semibold cursor-pointer tracking-wide text-white">Finder</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden sm:inline" onClick={() => onAppClick?.("file-explorer")} >File</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden sm:inline">Edit</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden md:inline">View</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden md:inline">Go</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden lg:inline">Window</span>
        <span className="cursor-pointer opacity-85 hover:opacity-100 transition-opacity hidden lg:inline">Help</span>
      </div>

      {/* RIGHT SIDE: Control Center Utilities + Adaptive Live Time String */}
      <div className="flex items-center gap-2 md:gap-4.5 font-normal tracking-wide">
        
        {/* Status icons tray: Displays on tablets and monitors, hides completely on mobile screens */}
        <div className="hidden sm:flex items-center gap-2">
          {[1, 2, 3, 4].map((iconName) => (
            <div key={iconName} className="cursor-pointer transition-opacity flex items-center opacity-90 hover:opacity-100">
              <Image
                src={`/icons/${iconName}-menu-item.png`}
                width={18}
                height={18}
                alt={`Status Icon ${iconName}`}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Live System Time Render: Swaps between desktop string and compact mobile typography */}
        <div className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity pl-1 tabular-nums font-normal text-xs md:text-[13px]">
          {/* Mobile view text token */}
          <span className="inline sm:hidden">{mobileTime || "Loading..."}</span>
          {/* Desktop view text token */}
          <span className="hidden sm:inline">{dateTime || "Loading..."}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;