import React from 'react';
import { ModernBattingGame } from '../components/ModernBattingGame';
import { Target, Trophy, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pavilionAudio } from '../utils/audioEngine';

export const BattingChallengePage: React.FC = () => {
  const triggerCheer = () => {
    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#1c1917', '#78716c', '#ece7de']
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-bold flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#1c1917]" />
              INTERACTIVE MATCH SIMULATOR • PLAY AS SANJITH
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
            The Skipper's Batting Arena
          </h1>
          <p className="text-sm text-[#78716c] mt-1 max-w-2xl">
            Step into the crease as Captain Sanjith. Face express 150 km/h yorkers, searing bouncers, and dipping cutters. Time your shots, execute the trademark cover drive, and chase down the birthday target!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ece7de] border border-[#ded7cb] text-xs font-semibold text-[#1c1917]">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Target: 100* Runs</span>
          </div>
          <button
            onClick={triggerCheer}
            className="px-4 py-2 rounded-xl bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Crowd Roar</span>
          </button>
        </div>
      </div>

      {/* Batting Game Engine */}
      <ModernBattingGame />

      {/* Pro Tips & Sanjith Shot Playbook */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="ald-card p-5 rounded-2xl border border-[#ded7cb]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1c1917] uppercase mb-1">
            <Flame className="w-4 h-4 text-amber-600" />
            The Signature Cover Drive
          </div>
          <p className="text-xs text-[#78716c] leading-relaxed">
            Lean forward with a high elbow when facing full-length balls outside off-stump. Pure placement between extra cover and mid-off guarantees 4 runs.
          </p>
        </div>

        <div className="ald-card p-5 rounded-2xl border border-[#ded7cb]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1c1917] uppercase mb-1">
            <Target className="w-4 h-4 text-emerald-600" />
            The Helicopter Dig
          </div>
          <p className="text-xs text-[#78716c] leading-relaxed">
            Against express toe-crushing yorkers at 148 km/h, snap your wrists with lightning speed to elevate the ball over deep mid-wicket for a 98-meter maximum.
          </p>
        </div>

        <div className="ald-card p-5 rounded-2xl border border-[#ded7cb]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1c1917] uppercase mb-1">
            <Trophy className="w-4 h-4 text-blue-600" />
            The Rolling Hook
          </div>
          <p className="text-xs text-[#78716c] leading-relaxed">
            Roll the top wrist downward on chin-high bouncers. Keeps the ball soaring flat and straight over square leg, safe from deep boundary riders.
          </p>
        </div>
      </div>
    </div>
  );
};
