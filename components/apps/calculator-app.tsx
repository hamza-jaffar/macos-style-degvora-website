"use client";
import React, { useState } from "react";

const buttons = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

const CalculatorApp = () => {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(false);

  const press = (key: string) => {
    if (key === "AC") { setDisplay("0"); setPrev(null); setOp(null); setFresh(false); return; }
    if (key === "+/-") { setDisplay(d => String(-parseFloat(d))); return; }
    if (key === "%") { setDisplay(d => String(parseFloat(d) / 100)); return; }
    if (["÷", "×", "−", "+"].includes(key)) {
      setPrev(parseFloat(display)); setOp(key); setFresh(true); return;
    }
    if (key === "=") {
      if (prev === null || !op) return;
      const cur = parseFloat(display);
      let res = 0;
      if (op === "÷") res = prev / cur;
      if (op === "×") res = prev * cur;
      if (op === "−") res = prev - cur;
      if (op === "+") res = prev + cur;
      setDisplay(String(parseFloat(res.toFixed(10))));
      setPrev(null); setOp(null); setFresh(false);
      return;
    }
    if (key === "." && display.includes(".") && !fresh) return;
    setDisplay(d => {
      if (fresh) { setFresh(false); return key === "." ? "0." : key; }
      if (d === "0" && key !== ".") return key;
      return d + key;
    });
  };

  const isOp = (k: string) => ["÷", "×", "−", "+"].includes(k);
  const isEq = (k: string) => k === "=";
  const isFn = (k: string) => ["AC", "+/-", "%"].includes(k);

  return (
    <div className="w-full h-full bg-black flex flex-col select-none">
      {/* Display */}
      <div className="flex-1 flex items-end justify-end px-6 pb-2 overflow-hidden">
        <span className={`text-white font-light transition-all ${display.length > 9 ? "text-3xl" : display.length > 6 ? "text-5xl" : "text-7xl"}`}>
          {display}
        </span>
      </div>

      {/* Buttons */}
      <div className="grid grid-rows-5 gap-px bg-black pb-2 px-2">
        {buttons.map((row, ri) => (
          <div key={ri} className={`grid gap-px ${ri === 4 ? "grid-cols-[2fr_1fr_1fr]" : "grid-cols-4"}`}>
            {row.map(k => (
              <button key={k} onClick={() => press(k)}
                className={`h-16 rounded-full text-xl font-medium transition-all active:brightness-75 cursor-pointer
                  ${isEq(k) || (isOp(k) && op === k && fresh) ? "bg-orange-400 text-white hover:bg-orange-300"
                    : isOp(k) ? "bg-orange-500 text-white hover:bg-orange-400"
                    : isFn(k) ? "bg-[#a5a5a5] text-black hover:bg-[#c0c0c0]"
                    : "bg-[#333333] text-white hover:bg-[#4a4a4a]"
                  } ${k === "0" ? "col-span-1 pl-7 text-left" : ""}`}>
                {k}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculatorApp;
