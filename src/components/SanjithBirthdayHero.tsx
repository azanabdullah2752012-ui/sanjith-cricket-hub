import React from 'react';
import { Gift, Sparkles, ChevronRight, Trophy, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SanjithBirthdayHeroProps {
  onOpenTribute: () => void;
}

export const SanjithBirthdayHero: React.FC<SanjithBirthdayHeroProps> = ({ onOpenTribute }) => {
  const triggerCheer = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.35 },
      colors: ['#dc2626', '#b45309', '#1c1917', '#f5f2eb']
    });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1c1917] via-[#292524] to-[#1c1917] text-[#f5f2eb] p-6 md:p-8 border border-[#44403c] shadow-lg mb-8">
      {/* Background #10 */}
      <div className="absolute right-0 top-0 bottom-0 w-96 opacity-5 pointer-events-none flex items-center justify-center font-editorial font-bold text-[180px] select-none">
        10
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 text-[10px] font-bold tracking-wider flex items-center gap-1.5 uppercase">
              <Gift className="w-3 h-3 text-red-400" />
              CAPTAIN SANJITH • JERSEY #10 💥
            </span>
            <span className="text-xs text-[#a8a29e]">
              RCB FAN FOR LIFE
            </span>
          </div>

          <h2 className="font-editorial text-2xl md:text-4xl font-bold tracking-tight text-white">
            Happy Birthday, Skipper Sanjith!
          </h2>

          <p className="text-xs md:text-sm text-[#d6d3d1] leading-relaxed">
            Channeling Virat’s Melbourne 82* magic, Starc's toe-crushing yorkers, and your famous shoelace-tying boundary! Hope this year brings you tons of runs, match wins, and good times.
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs text-[#a8a29e]">
            <span className="flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              100* Not Out
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              Built for you by Azan
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <button
            onClick={triggerCheer}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Throw Confetti 🎉</span>
          </button>

          <button
            onClick={onOpenTribute}
            className="px-4 py-2.5 rounded-xl bg-[#ece7de] hover:bg-white text-[#1c1917] font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>See Birthday Card</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
