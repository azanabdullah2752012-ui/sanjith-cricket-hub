import React from 'react';
import { ModernBattingGame } from '../components/ModernBattingGame';
import { Target, Trophy, Flame, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BattingChallengePage: React.FC = () => {
  const triggerCheer = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#dc2626', '#b45309', '#1c1917', '#f5f2eb']
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Simple Header Banner */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-800 font-bold flex items-center gap-1.5">
              <Target className="w-4 h-4 text-red-600" />
              PLAY AS SANJITH • BATTING MINI-GAME 💥
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
            Can You Score a Century?
          </h1>
          <p className="text-sm text-[#78716c] mt-1 max-w-2xl">
            You are batting as Captain Sanjith (#10). Pick the right shot for each ball, smash sixes with your wrist flick, face fast yorkers, and see how many runs you can score!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-900">
            <Trophy className="w-3.5 h-3.5 text-red-600" />
            <span>Target: 100 Runs</span>
          </div>
          <button
            onClick={triggerCheer}
            className="px-4 py-2 rounded-xl bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Cheer 🎉</span>
          </button>
        </div>
      </div>

      {/* Batting Game Engine */}
      <ModernBattingGame />

      {/* 3 Easy Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="ald-card p-5 rounded-2xl border border-[#ded7cb] bg-white">
          <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase mb-1">
            <Flame className="w-4 h-4 text-red-600" />
            Your Trademark Flick
          </div>
          <p className="text-xs text-[#78716c] leading-relaxed">
            Your best shot in real life. When the ball is on your legs, flick it with your wrists for an easy 6 runs!
          </p>
        </div>

        <div className="ald-card p-5 rounded-2xl border border-[#ded7cb] bg-white">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase mb-1">
            <Zap className="w-4 h-4 text-amber-600" />
            The Virat Straight Six
          </div>
          <p className="text-xs text-[#78716c] leading-relaxed">
            Channel your idol Virat Kohli. Punch the ball straight back over the bowler’s head into the crowd.
          </p>
        </div>

        <div className="ald-card p-5 rounded-2xl border border-[#ded7cb] bg-white">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1c1917] uppercase mb-1">
            <Target className="w-4 h-4 text-[#1c1917]" />
            The Shoelace Move 😂
          </div>
          <p className="text-xs text-[#78716c] leading-relaxed">
            Tie your shoes mid-delivery! The ball misses everyone, nutmegs the keeper, and races for 4 runs.
          </p>
        </div>
      </div>
    </div>
  );
};
