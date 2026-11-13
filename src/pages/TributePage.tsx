import React from 'react';
import { ModernGuestbook } from '../components/ModernGuestbook';
import { Gift, Sparkles, Heart, Trophy, Target, ArrowRight, Flame, Zap, Shield, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TributePageProps {
  onNavigate?: (page: 'batting' | 'fielding' | 'scores' | 'players') => void;
}

export const TributePage: React.FC<TributePageProps> = ({ onNavigate }) => {
  const triggerBirthdayCheer = () => {
    confetti({
      particleCount: 160,
      spread: 110,
      origin: { y: 0.35 },
      colors: ['#dc2626', '#d97706', '#f8fafc', '#ef4444']
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Main Hero Banner */}
      <div className="ald-card p-6 md:p-10 rounded-3xl bg-gradient-to-br from-[#17181d] via-[#1a1518] to-[#17181d] border border-white/[0.08] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
        {/* Subtle #10 Watermark */}
        <div className="absolute right-4 -bottom-6 font-editorial font-bold text-[160px] text-white/[0.03] pointer-events-none select-none">
          10
        </div>

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              HAPPY BIRTHDAY SANJITH • JERSEY #10 💥
            </span>
            <span className="text-xs text-[#94a3b8] font-medium">
              RCB 12TH MAN ARMY
            </span>
          </div>

          <h1 className="font-editorial text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Happy Birthday, Skipper!
          </h1>

          <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed">
            Made this site just for you bro! You love your cricket, you never back down from a match, and nobody hits the wrist flick or bowls death yorkers quite like you. Raise your bat high—today you're 100* not out!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-white">
            <span className="flex items-center gap-1.5 text-red-400">
              <Heart className="w-4 h-4 fill-red-400" />
              Made by Azan & the boys
            </span>
            <span className="text-[#64748b]">•</span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <Trophy className="w-4 h-4" />
              Team Captain & No. 1 Player
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={triggerBirthdayCheer}
            className="px-6 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>POP CONFETTI 🎉</span>
          </button>

          {onNavigate && (
            <button
              onClick={() => onNavigate('batting')}
              className="px-5 py-3 bg-[#22242d] hover:bg-[#2c303c] text-white font-semibold text-xs rounded-2xl border border-white/[0.08] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Target className="w-3.5 h-3.5 text-red-400" />
              <span>Play Batting Game</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#94a3b8]" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Sanjith's Player Card */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-red-500" />
              <span className="text-xs uppercase tracking-wider text-[#94a3b8] font-bold">
                OFFICIAL SQUAD CARD
              </span>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold text-white">
              Captain Sanjith (#10)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20">
              TEAM: RCB 💥
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.08] text-white text-xs font-bold border border-white/[0.08]">
              ROLE: ALL-ROUNDER
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Stats Panel */}
          <div className="lg:col-span-5 bg-[#121317] p-6 rounded-2xl border border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94a3b8] uppercase font-bold">SHIRT NUMBER</span>
              <span className="text-sm font-bold text-white">#10 (THE SKIPPER)</span>
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-[#64748b] uppercase block font-bold">CRICKET HEROES</span>
                <span className="text-sm font-bold text-white">Virat Kohli & Mitchell Starc</span>
              </div>

              <div>
                <span className="text-[11px] text-[#64748b] uppercase block font-bold">FAVORITE SHOT</span>
                <span className="text-sm font-bold text-red-400">The Wrist Flick (whips it right over mid-wicket)</span>
              </div>

              <div>
                <span className="text-[11px] text-[#64748b] uppercase block font-bold">BOWLING WEAPON</span>
                <span className="text-sm font-bold text-white">Mitchell Starc-style fast yorker in the 20th over</span>
              </div>

              <div>
                <span className="text-[11px] text-[#64748b] uppercase block font-bold">FAVORITE MATCHES</span>
                <span className="text-sm font-bold text-amber-400">Virat 82* vs Pakistan & Stokes 135* vs Australia</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-[#1a1b22] rounded-xl border border-white/[0.06]">
                  <span className="text-[10px] text-[#64748b] uppercase font-bold block">STRIKE RATE</span>
                  <span className="text-xl font-editorial font-bold text-white">198.5</span>
                </div>
                <div className="p-3 bg-[#1a1b22] rounded-xl border border-white/[0.06]">
                  <span className="text-[10px] text-[#64748b] uppercase font-bold block">TODAY'S SCORE</span>
                  <span className="text-xl font-editorial font-bold text-red-500">100* N.O.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Letter from Azan & Shortcuts */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 bg-[#121317] rounded-2xl border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-red-400">
                <Shield className="w-4 h-4" />
                Note From The Squad
              </div>
              <p className="text-sm text-[#cbd5e1] leading-relaxed italic">
                "Whether you're setting crazy field placements, bowling yorkers in the final over like Mitchell Starc, or cheering for RCB with your whole heart—you're the leader of our squad. Hope you have an awesome birthday bro! We're lucky to play alongside you."
              </p>
              <div className="mt-3 text-xs font-bold text-white text-right">
                — Azan & The Squad
              </div>
            </div>

            {/* Simple Shortcuts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {onNavigate && (
                <>
                  <button
                    onClick={() => onNavigate('batting')}
                    className="p-4 rounded-xl bg-[#121317] hover:bg-[#1a1b22] border border-white/[0.06] hover:border-red-500/40 transition-all text-left cursor-pointer group"
                  >
                    <Target className="w-4 h-4 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white">Play Batting Game</div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">Hit your flick shot</div>
                  </button>

                  <button
                    onClick={() => onNavigate('fielding')}
                    className="p-4 rounded-xl bg-[#121317] hover:bg-[#1a1b22] border border-white/[0.06] hover:border-white/[0.2] transition-all text-left cursor-pointer group"
                  >
                    <Compass className="w-4 h-4 text-white mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white">Move Fielders</div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">Drag & drop field setup</div>
                  </button>

                  <button
                    onClick={() => onNavigate('scores')}
                    className="p-4 rounded-xl bg-[#121317] hover:bg-[#1a1b22] border border-white/[0.06] hover:border-amber-500/40 transition-all text-left cursor-pointer group"
                  >
                    <Trophy className="w-4 h-4 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-white">Live Matches</div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">Check real scores</div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Shoelace Story Card */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#181512] to-[#141418] border border-amber-500/20 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                TRUE CRICKET STORY
              </span>
              <h3 className="font-editorial text-2xl font-bold text-white">
                The Time You Tied Your Shoelaces During a Match 😂
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-500/10 px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-500/20">
            SHOES TIED: 100% • RUNS SAVED: 0
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              <strong>What happened:</strong> The bowler starts running in. The batsman gets ready to smack the ball. Meanwhile, there you are in the outfield, peacefully bending down to tie your shoelaces.
            </p>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              The bowler doesn't see you and bowls the ball. The batsman whacks it <em>directly</em> at you! But your head is down, focusing 100% on your shoes. The ball zooms right past you and crosses the rope for four runs!
            </p>
            <p className="text-sm font-semibold text-amber-300 italic">
              "Bowler didn't look, batsman took aim, and you secured your shoes. The funniest boundary in squad history."
            </p>
          </div>

          <div className="md:col-span-4 bg-[#121317] p-5 rounded-2xl border border-amber-500/20 space-y-2 text-center">
            <div className="text-3xl font-editorial font-bold text-white">
              4 RUNS
            </div>
            <div className="text-xs text-[#94a3b8] uppercase font-semibold">
              THE VERDICT
            </div>
            <div className="h-px bg-white/[0.06]" />
            <div className="text-xs text-[#cbd5e1] font-medium leading-relaxed">
              👟 Shoelaces: Tied tight<br/>
              👀 Ball spotted: Not at all<br/>
              👑 Confidence: 10/10
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sanjith's Favorite Matches */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-red-500" />
          <span className="text-xs uppercase tracking-wider text-[#94a3b8] font-bold">
            BEST GAMES EVER
          </span>
        </div>
        <h3 className="font-editorial text-2xl font-bold text-white mb-6">
          Sanjith's Favorite Cricket Finishes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Match 1: Virat 82* */}
          <div className="p-6 rounded-2xl bg-[#121317] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
                MELBOURNE 2022
              </span>
              <span className="text-xs text-[#94a3b8] font-medium">T20 World Cup</span>
            </div>

            <h4 className="font-editorial text-xl font-bold text-white">
              Virat Kohli's 82* vs Pakistan
            </h4>

            <p className="text-xs text-[#94a3b8] leading-relaxed">
              India was 31/4 and it looked like game over. Then King Kohli played the innings of his life—hitting that crazy straight six off Haris Rauf back over his head. Pure chills every single time.
            </p>

            <div className="pt-2 text-xs font-semibold text-white">
              ✦ Sanjith's take: <span className="text-[#94a3b8] font-normal">The greatest T20 chase of all time.</span>
            </div>
          </div>

          {/* Match 2: Ben Stokes 135* */}
          <div className="p-6 rounded-2xl bg-[#121317] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                HEADINGLEY 2019
              </span>
              <span className="text-xs text-[#94a3b8] font-medium">The Ashes</span>
            </div>

            <h4 className="font-editorial text-xl font-bold text-white">
              Ben Stokes' 135* vs Australia
            </h4>

            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Last wicket, 73 runs still needed to win. Stokes started smashing sixes all over the ground while Jack Leach kept cleaning his glasses at the other end. Never ever give up.
            </p>

            <div className="pt-2 text-xs font-semibold text-white">
              ✦ Sanjith's take: <span className="text-[#94a3b8] font-normal">Pure fight until the last ball.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Birthday Wishes Board */}
      <section>
        <ModernGuestbook />
      </section>
    </div>
  );
};
