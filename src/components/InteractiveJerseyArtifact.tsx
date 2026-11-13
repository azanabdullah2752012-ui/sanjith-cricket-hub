import React, { useState } from 'react';

export const InteractiveJerseyArtifact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'front' | 'back'>('back');
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Calculate subtle 3D tilt angles
    setRotate({
      x: -(y / (rect.height / 2)) * 14,
      y: (x / (rect.width / 2)) * 14
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Perspective Container */}
      <div
        className="relative w-72 sm:w-80 h-96 perspective-1000 cursor-grab active:cursor-grabbing select-none"
        onMouseMove={(e) => {
          setIsHovered(true);
          handleMouseMove(e);
        }}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#1c070a] via-[#120709] to-[#0a0507] border-2 border-red-500/40 p-6 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(220,38,38,0.25)] overflow-hidden"
        >
          {/* Subtle Fabric Weave Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#dc2626 1px, transparent 1px)`,
              backgroundSize: '8px 8px'
            }}
          />

          {/* Gold Trim Piping */}
          <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <div className="absolute -left-12 -top-12 w-32 h-32 rounded-full bg-red-600/20 blur-2xl pointer-events-none" />
          <div className="absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

          {/* Top Collar / Header */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-red-500/20">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase font-black tracking-widest text-red-400">
                RCB MATCHDAY KIT
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              OFFICIAL SQUAD
            </span>
          </div>

          {/* Jersey Main Body Content */}
          {activeTab === 'back' ? (
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
              {/* Golden Lion Crest Stamp */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-black text-xs shadow-md mb-2">
                🦁
              </div>

              {/* Player Name */}
              <div className="font-editorial text-3xl sm:text-4xl font-black text-white tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                SANJITH
              </div>

              {/* Giant Iconic #10 in Solid High-Contrast White */}
              <div className="font-editorial text-7xl sm:text-8xl font-black text-white tracking-tighter leading-none mt-1 drop-shadow-[0_10px_20px_rgba(220,38,38,0.4)]">
                10
              </div>

              {/* Sub-label */}
              <div className="mt-2 flex items-center gap-2">
                <span className="h-px w-6 bg-red-500/50" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-red-400 font-bold">
                  SKIPPER // ALL-ROUNDER
                </span>
                <span className="h-px w-6 bg-red-500/50" />
              </div>
            </div>
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center my-auto py-4 space-y-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-2xl shadow-inner">
                🏏
              </div>
              <div>
                <div className="font-editorial text-xl font-bold text-white tracking-tight">
                  RCB 12TH MAN SQUAD
                </div>
                <div className="text-xs text-[#94a3b8] mt-1">
                  Chinnaswamy Stadium • Stand D
                </div>
              </div>
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/20 text-[11px] text-[#cbd5e1] font-mono leading-relaxed">
                "Play Bold. Never back down from a run chase."
              </div>
            </div>
          )}

          {/* Bottom Hem Details */}
          <div className="relative z-10 pt-3 border-t border-red-500/20 flex items-center justify-between text-[10px] font-mono text-[#94a3b8]">
            <span>CHINNASWAMY ED.</span>
            <span className="text-amber-400 font-bold">100* N.O.</span>
          </div>
        </div>
      </div>

      {/* Front / Back Toggle Pill */}
      <div className="mt-4 flex items-center gap-1.5 p-1 rounded-full bg-[#161822] border border-white/[0.08] text-xs font-mono">
        <button
          onClick={() => setActiveTab('back')}
          className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
            activeTab === 'back'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Back #10
        </button>
        <button
          onClick={() => setActiveTab('front')}
          className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
            activeTab === 'front'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-[#94a3b8] hover:text-white'
          }`}
        >
          Front Crest
        </button>
      </div>
      <span className="text-[10px] text-[#64748b] font-mono mt-1.5">
        ✦ Hover & drag around for 3D tilt
      </span>
    </div>
  );
};
