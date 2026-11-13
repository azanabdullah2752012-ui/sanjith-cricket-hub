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
      colors: ['#dc2626', '#d97706', '#f8fafc', '#ef4444']
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="ald-card p-6 md:p-8 rounded-xl bg-gradient-to-br from-[#17181d] via-[#1a1518] to-[#17181d] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
              <Target className="w-4 h-4 text-red-500" />
              PLAY AS SANJITH • BATTING MINI-GAME 💥
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl font-bold text-white tracking-tight">
            Can You Score a Century?
          </h1>
          <p className="text-sm text-[#94a3b8] mt-1 max-w-2xl">
            You are batting as Captain Sanjith (#10). Pick the right shot for each ball, smash sixes with your wrist flick, face fast yorkers, and see how many runs you can score!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400">
            <Trophy className="w-3.5 h-3.5 text-red-400" />
            <span>Target: 100 Runs</span>
          </div>
          <button
            onClick={triggerCheer}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Cheer 🎉</span>
          </button>
        </div>
      </div>

      {/* Batting Game Engine */}
      <ModernBattingGame />

      {/* 3 Easy Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="ald-card p-5 rounded-lg border border-white/[0.08] bg-[#16181d]">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase mb-1">
            <Flame className="w-4 h-4 text-red-500" />
            Your Trademark Flick
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Your best shot in real life. When the ball is on your legs, flick it with your wrists for an easy 6 runs!
          </p>
        </div>

        <div className="ald-card p-5 rounded-lg border border-white/[0.08] bg-[#16181d]">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase mb-1">
            <Zap className="w-4 h-4 text-amber-500" />
            The Virat Straight Six
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Channel your idol Virat Kohli. Punch the ball straight back over the bowler’s head into the crowd.
          </p>
        </div>

        <div className="ald-card p-5 rounded-lg border border-white/[0.08] bg-[#16181d]">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase mb-1">
            <Target className="w-4 h-4 text-white" />
            The Shoelace Move 😂
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Tie your shoes mid-delivery! The ball misses everyone, nutmegs the keeper, and races for 4 runs.
          </p>
        </div>
      </div>
    </div>
  );
};
