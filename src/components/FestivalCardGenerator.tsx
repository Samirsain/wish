"use client";

import React, { useState } from "react";

const occasions = [
  {
    id: "birthday",
    label: "Birthday",
    icon: "🎂",
    gradient: "from-[#FFF5F0] to-[#F0FFF4]",
    textColor: "#E63946",
    wish: [
      { text: "Happy Birthday!", color: "#E63946" },
      { text: "May your day sparkle bright,", color: "#D1495B" },
      { text: "May joy fill every moment,", color: "#2A9D8F" },
      { text: "May laughter echo around you,", color: "#E9C46A" },
      { text: "May blessings find your way,", color: "#8ECAE6" },
      { text: "Have a wonderful celebration!", color: "#E63946" },
    ],
  },
  {
    id: "christmas",
    label: "Christmas",
    icon: "🎄",
    gradient: "from-[#F0FFF4] to-[#F0F8FF]",
    textColor: "#2A9D8F",
    wish: [
      { text: "Merry Christmas!", color: "#2A9D8F" },
      { text: "May the magic fill your home,", color: "#E63946" },
      { text: "May peace surround your heart,", color: "#F4A261" },
      { text: "May love wrap you warmly,", color: "#264653" },
      { text: "May the star guide you,", color: "#E9C46A" },
      { text: "Have a blessed holiday season!", color: "#2A9D8F" },
    ],
  },
  {
    id: "eid",
    label: "Eid",
    icon: "🌙",
    gradient: "from-[#F5F0FF] to-[#F0F8FF]",
    textColor: "#8A2BE2",
    wish: [
      { text: "Eid Mubarak!", color: "#8A2BE2" },
      { text: "May peace grace your home,", color: "#4169E1" },
      { text: "May joy fill your heart,", color: "#2A9D8F" },
      { text: "May prayers be answered,", color: "#D1495B" },
      { text: "May blessings multiply,", color: "#E9C46A" },
      { text: "Have a joyous celebration!", color: "#8A2BE2" },
    ],
  },
  {
    id: "newyear",
    label: "New Year",
    icon: "🎆",
    gradient: "from-[#FFFFF0] to-[#FFF0F5]",
    textColor: "#F4A261",
    wish: [
      { text: "Happy New Year!", color: "#F4A261" },
      { text: "May new dreams unfold,", color: "#E63946" },
      { text: "May opportunities arise,", color: "#2A9D8F" },
      { text: "May your spirit soar high,", color: "#8A2BE2" },
      { text: "May happiness be constant,", color: "#D1495B" },
      { text: "Welcome to a brilliant year!", color: "#F4A261" },
    ],
  },
  {
    id: "wedding",
    label: "Wedding",
    icon: "💍",
    gradient: "from-[#FFF0F5] to-[#F0F8FF]",
    textColor: "#D81159",
    wish: [
      { text: "Happy Wedding Day!", color: "#D81159" },
      { text: "May love bind you forever,", color: "#8A2BE2" },
      { text: "May joy be your shadow,", color: "#2A9D8F" },
      { text: "May patience guide you,", color: "#F4A261" },
      { text: "May laughter fill your home,", color: "#E9C46A" },
      { text: "Have a beautiful journey ahead!", color: "#D81159" },
    ],
  },
  {
    id: "diwali",
    label: "Diwali",
    icon: "🪔",
    gradient: "from-[#FFF5E6] to-[#FFF0F5]",
    textColor: "#E67E22",
    wish: [
      { text: "Happy Diwali!", color: "#E67E22" },
      { text: "May light conquer darkness,", color: "#E63946" },
      { text: "May prosperity enter your door,", color: "#2A9D8F" },
      { text: "May joy illuminate your path,", color: "#E9C46A" },
      { text: "May harmony surround you,", color: "#8A2BE2" },
      { text: "Have a sparkling festival!", color: "#E67E22" },
    ],
  },
];

export default function WishSparkCard() {
  const [activeOccasion, setActiveOccasion] = useState(occasions[0]);
  const [inputValue, setInputValue] = useState("");
  const [displayName, setDisplayName] = useState("Your Name");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCreateWish = () => {
    if (!inputValue.trim()) {
      alert("Please enter a name");
      return;
    }
    
    // Simulate AI Generation
    setIsGenerating(true);
    setTimeout(() => {
      setDisplayName(inputValue);
      setInputValue("");
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-[#333] font-sans pb-20">
      
      {/* ── HEADER NAVIGATION ── */}
      <header className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#EF4444] rounded-md flex items-center justify-center text-white font-bold text-sm">
            W
          </div>
          <h1 className="text-xl font-medium tracking-tight">WishSpark</h1>
        </div>
        <div className="text-sm text-gray-400">AI Wish Cards</div>
      </header>

      <main className="flex flex-col items-center px-4 max-w-2xl mx-auto w-full mt-6">
        
        {/* ── PILL BUTTONS ── */}
        <div className="flex flex-wrap gap-2 justify-start sm:justify-center w-full mb-8">
          {occasions.map((occ) => (
            <button
              key={occ.id}
              onClick={() => setActiveOccasion(occ)}
              className={`px-4 py-2 rounded-lg border text-sm transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)]
                ${
                  activeOccasion.id === occ.id
                    ? "border-gray-800 bg-gray-50 text-gray-900 font-medium"
                    : "border-gray-200 bg-white hover:bg-gray-50 text-gray-600"
                }
              `}
            >
              {occ.label}
            </button>
          ))}
        </div>

        {/* ── CARD COMPONENT ── */}
        <div className="w-full max-w-[420px] rounded-[16px] border border-gray-200 overflow-hidden shadow-sm bg-white flex flex-col">
          
          {/* Top Gradient Area */}
          <div className={`bg-gradient-to-br ${activeOccasion.gradient} h-[240px] flex flex-col items-center justify-center relative p-6 transition-all duration-500`}>
            
            <h2
              style={{ color: activeOccasion.textColor }}
              className="text-3xl font-serif mb-1 tracking-tight"
            >
              {displayName}
            </h2>
            
            <p className="text-[11px] font-bold tracking-widest text-[#888] uppercase mb-6">
              Wishing You
            </p>

            {/* Icon Box */}
            <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-[18px] flex items-center justify-center text-[50px] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-white/60 relative overflow-hidden transition-all duration-500">
              <span className="scale-110 relative z-10">{activeOccasion.icon}</span>
            </div>
            
          </div>

          {/* Bottom Content Area */}
          <div className="bg-white flex-1 p-6 text-center">
            
            {/* AI Generated Poem Block */}
            <div className={`flex flex-col items-center gap-1.5 mb-8 ${isGenerating ? 'opacity-50 animate-pulse' : 'opacity-100 transition-opacity'}`}>
              {activeOccasion.wish.map((line, i) => (
                <p
                  key={i}
                  style={{ color: line.color }}
                  className={`text-[15px] leading-[1.8] ${i === 0 ? "text-[16px] mb-1 font-medium" : ""}`}
                >
                  {line.text}
                </p>
              ))}
            </div>
          </div>

          {/* Interaction Bar */}
          <div className="bg-[#FAF9F6] border-t border-gray-200 p-4 sm:p-5 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your name here..."
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-[14px] outline-none hover:border-gray-400 focus:border-gray-500 transition-colors placeholder:text-gray-400"
              onKeyDown={(e) => e.key === "Enter" && handleCreateWish()}
              disabled={isGenerating}
            />
            <button
              onClick={handleCreateWish}
              disabled={isGenerating}
              className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 active:scale-95 transition-all w-fit shadow-[0_1px_2px_rgba(0,0,0,0.02)] whitespace-nowrap"
            >
              {isGenerating ? "Creating..." : "Create Wish"}
            </button>
          </div>
          
        </div>

        {/* Action Buttons (Copy / Share / Try Again) */}
        {displayName !== "Your Name" && (
          <div className="flex gap-3 justify-center w-full max-w-[420px] mt-4 opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
             <button className="flex-1 py-3 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 shadow-sm transition-all text-gray-700">
               Copy Wish
             </button>
             <button className="flex-1 py-3 px-4 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 shadow-sm transition-all text-gray-700">
               Share Card
             </button>
          </div>
        )}

      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
