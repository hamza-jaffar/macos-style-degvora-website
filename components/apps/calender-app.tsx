"use client";
import React, { useState } from "react";

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const CalendarApp = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );
  while (cells.length % 7 !== 0) cells.push(null);

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };
  const isToday = (d: number | null) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="w-full h-full flex flex-col bg-[#1c1c1e] text-white p-4 gap-3 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={prev} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer">‹</button>
        <div className="text-center">
          <p className="text-xl font-semibold tracking-tight">{months[month]}</p>
          <p className="text-sm text-white/50">{year}</p>
        </div>
        <button onClick={next} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer">›</button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center text-xs text-white/40 font-medium">
        {days.map(d => <div key={d}>{d}</div>)}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-y-1 flex-1">
        {cells.map((d, i) => (
          <div key={i} className="flex items-center justify-center">
            {d && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer transition-all
                ${isToday(d) ? "bg-red-500 text-white font-bold" : "text-white/80 hover:bg-white/10"}`}>
                {d}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Today indicator */}
      <div className="text-center text-xs text-white/40 border-t border-white/10 pt-2">
        Today is {days[today.getDay()]}, {months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
      </div>
    </div>
  );
};

export default CalendarApp;
