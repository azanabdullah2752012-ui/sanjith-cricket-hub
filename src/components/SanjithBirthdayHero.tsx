import React from 'react';
import { Gift, Sparkles, ChevronRight, Trophy, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pavilionAudio } from '../utils/audioEngine';

interface SanjithBirthdayHeroProps {
  onOpenTribute: () => void;
}

export const SanjithBirthdayHero: React.FC<SanjithBirthdayHeroProps> = ({ onOpenTribute }) => {
  const triggerCheer = (e: React.MouseEvent) => {
    e.stopPropagation();
    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.35 },
      colors: ['#1c1917', '#b45309', '#ece7de', '#ded7cb']
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1c1917] via-[#292524] to-[#1c1917] text-[#f5f2eb] p-6 md:p-8 border border-[#44403c] shadow-lg mb-8">
      {/* Subtle pitch watermark texture in background */}
      <div className="absolute right-0 top-0 bottom-0 w-96 opacity-5 pointer-events-none flex items-center justify-center font-editorial font-bold text-[180px] select-none">
        10
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 text-[10px] font-mono uppercase font-bold tracking-widest flex items-center gap-1.5">
              <Gift className="w-3 h-3 text-red-400" />
              RCB SQUAD SKIPPER • JERSEY #10 💥
            </span>
            <span className="text-xs text-[#a8a29e] font-mono">
              VIRAT & STARC DISCIPLE
            </span>
          </div>

          <h2 className="font-editorial text-2xl md:text-4xl font-bold tracking-tight text-white">
            Happy Birthday, Skipper Sanjith!
          </h2>

          <p className="text-xs md:text-sm text-[#d6d3d1] leading-relaxed">
            Welcome to your personal VIP Cricket Command Terminal. Channeling Virat's Melbourne 82* fire and Starc's laser-guided death yorkers—with zero dropped catches (unless tying shoelaces).
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs text-[#a8a29e]">
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Milestone Birthday
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              Built with brotherhood by Azan
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <button
            onClick={triggerCheer}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>FIRE CELEBRATION</span>
          </button>

          <button
            onClick={onOpenTribute}
            className="px-4 py-2.5 rounded-xl bg-[#ece7de] hover:bg-white text-[#1c1917] font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Birthday Pavilion</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
