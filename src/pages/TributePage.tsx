import React from 'react';
import { ModernGuestbook } from '../components/ModernGuestbook';
import { Gift, Sparkles, Heart, Trophy, Award, Shield, Compass, Target, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pavilionAudio } from '../utils/audioEngine';

interface TributePageProps {
  onNavigate?: (page: 'batting' | 'fielding' | 'scores' | 'players') => void;
}

export const TributePage: React.FC<TributePageProps> = ({ onNavigate }) => {
  const triggerBirthdayCheer = () => {
    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 160,
      spread: 110,
      origin: { y: 0.35 },
      colors: ['#1c1917', '#b45309', '#f5f2eb', '#d97706']
    });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 1. Grand Sanjith Birthday Celebration Hero Card */}
      <div className="ald-card p-6 md:p-10 rounded-3xl bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden shadow-sm">
        {/* Subtle decorative background watermark */}
        <div className="absolute right-4 -bottom-6 font-editorial font-bold text-[140px] text-[#1c1917]/5 pointer-events-none select-none">
          100*
        </div>

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping" />
            <span className="text-xs uppercase tracking-widest text-amber-800 font-bold flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Gift className="w-3.5 h-3.5 text-amber-700" />
              SPECIAL BIRTHDAY EDITION • DEDICATED TO SANJITH
            </span>
            <span className="text-xs text-[#78716c] font-mono">
              MILESTONE CENTURY
            </span>
          </div>

          <h1 className="font-editorial text-3xl md:text-5xl font-bold text-[#1c1917] tracking-tight leading-tight">
            Happy Birthday, Skipper Sanjith!
          </h1>

          <p className="text-sm md:text-base text-[#44403c] leading-relaxed">
            Welcome to your dedicated cricket pavilion. Built with pure brotherhood for your love of the game—from your trademark high-elbow cover drive to tactical field settings and boundary chases. Raise the bat high for an undefeated century year!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#1c1917]">
            <span className="flex items-center gap-1.5 text-red-600">
              <Heart className="w-4 h-4 fill-red-600" />
              Crafted by Azan & the Squad with brotherhood
            </span>
            <span className="text-[#a8a29e]">•</span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <Trophy className="w-4 h-4" />
              Dressing Room General & No. 1 All-Rounder
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={triggerBirthdayCheer}
            className="px-6 py-4 bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] font-editorial font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>FIRE CELEBRATION CANNON</span>
          </button>

          {onNavigate && (
            <button
              onClick={() => onNavigate('batting')}
              className="px-5 py-3 bg-[#ece7de] hover:bg-white text-[#1c1917] font-semibold text-xs rounded-2xl border border-[#ded7cb] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Target className="w-3.5 h-3.5 text-amber-700" />
              <span>Step Out & Bat as Sanjith</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Captain Sanjith's Official Hall of Fame Player Card */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-white border border-[#ded7cb] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#ded7cb] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                OFFICIAL PLAYER DOSSIER • CAPTAIN & MAESTRO
              </span>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold text-[#1c1917]">
              Captain Sanjith: The Legend's Dossier
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#1c1917] text-[#f5f2eb] text-xs font-mono font-bold">
              ROLE: ALL-ROUND MAESTRO
            </span>
          </div>
        </div>

        {/* Stats & Citation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-[#f7f5f0] p-6 rounded-2xl border border-[#ded7cb] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#78716c] uppercase">DRESSING ROOM NO.</span>
              <span className="text-sm font-bold font-mono text-[#1c1917]">#18 (THE SKIPPER)</span>
            </div>

            <div className="h-px bg-[#ded7cb]" />

            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-semibold">BATTING STANCE</span>
                <span className="text-sm font-bold text-[#1c1917]">Right-Hand Classical Anchor & Power Striker</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-semibold">SIGNATURE SHOT</span>
                <span className="text-sm font-bold text-amber-800">High-Elbow Cover Drive (Better than Kohli)</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-semibold">BOWLING ARSENAL</span>
                <span className="text-sm font-bold text-[#1c1917]">Golden Arm Seam & Clutch Death Yorker</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-semibold">UMPIRE REVIEW (DRS) ACCURACY</span>
                <span className="text-sm font-bold text-emerald-700">100% (The Umpire admits error immediately)</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-[#ded7cb]">
                  <span className="text-[10px] text-[#78716c] uppercase block">CAREER STRIKE RATE</span>
                  <span className="text-xl font-editorial font-bold text-[#1c1917]">198.5</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#ded7cb]">
                  <span className="text-[10px] text-[#78716c] uppercase block">BIRTHDAY INNINGS</span>
                  <span className="text-xl font-editorial font-bold text-amber-600">100* N.O.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 bg-[#f7f5f0] rounded-2xl border border-[#ded7cb]">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                <Shield className="w-4 h-4 text-amber-600" />
                The Squad's Citation of Honour
              </div>
              <p className="text-sm text-[#44403c] leading-relaxed italic">
                "Whether setting aggressive 7-2 field cordons, delivering match-saving spells in the dying overs, or dispatching 150 km/h bouncers straight into the car park—Sanjith is the heartbeat of this team. Happy Birthday to the captain who turns every impossible chase into a stroll in the park."
              </p>
              <div className="mt-3 text-xs font-bold text-[#1c1917] text-right">
                — Azan & The Squad
              </div>
            </div>

            {/* Quick Interactive Portals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {onNavigate && (
                <>
                  <button
                    onClick={() => onNavigate('batting')}
                    className="p-4 rounded-xl bg-white hover:bg-[#ece7de] border border-[#ded7cb] hover:border-[#1c1917] transition-all text-left cursor-pointer group"
                  >
                    <Target className="w-4 h-4 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-[#1c1917]">Batting Arena</div>
                    <div className="text-[11px] text-[#78716c] mt-0.5">Play as Sanjith</div>
                  </button>

                  <button
                    onClick={() => onNavigate('fielding')}
                    className="p-4 rounded-xl bg-white hover:bg-[#ece7de] border border-[#ded7cb] hover:border-[#1c1917] transition-all text-left cursor-pointer group"
                  >
                    <Compass className="w-4 h-4 text-[#1c1917] mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-[#1c1917]">Fielding Architect</div>
                    <div className="text-[11px] text-[#78716c] mt-0.5">Set 360° field traps</div>
                  </button>

                  <button
                    onClick={() => onNavigate('scores')}
                    className="p-4 rounded-xl bg-white hover:bg-[#ece7de] border border-[#ded7cb] hover:border-[#1c1917] transition-all text-left cursor-pointer group"
                  >
                    <Trophy className="w-4 h-4 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-[#1c1917]">Live Match Center</div>
                    <div className="text-[11px] text-[#78716c] mt-0.5">Real-time match radar</div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* The Birthday Wishes Locker & Guestbook */}
      <section>
        <ModernGuestbook />
      </section>
    </div>
  );
};
