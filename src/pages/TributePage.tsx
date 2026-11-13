import React from 'react';
import { ModernGuestbook } from '../components/ModernGuestbook';
import { InteractiveJerseyArtifact } from '../components/InteractiveJerseyArtifact';
import { Sparkles, Target, ArrowUpRight, Flame, Zap, Shield, Compass, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TributePageProps {
  onNavigate?: (page: 'batting' | 'fielding' | 'scores' | 'players') => void;
}

export const TributePage: React.FC<TributePageProps> = ({ onNavigate }) => {
  const triggerBirthdayCheer = () => {
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { y: 0.35 },
      colors: ['#dc2626', '#d97706', '#f8fafc', '#ef4444', '#f59e0b']
    });
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* 1. Asymmetric Editorial Hero Showcase with Signature Interactive 3D Jersey Artifact */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#14151b] via-[#101115] to-[#0c0d10] border border-white/[0.08] shadow-2xl">
        {/* Architectural Diagonal Slash Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-red-600/[0.08] via-transparent to-transparent pointer-events-none" />
        <div className="absolute -right-6 -bottom-10 font-editorial font-black text-[220px] leading-none text-white/[0.025] pointer-events-none select-none tracking-tighter">
          10
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center relative z-10">
          {/* Left Column: Bold Editorial Typography */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-600 text-white font-label text-[11px] shadow-sm">
                <Star className="w-3 h-3 fill-white" />
                OFFICIAL COMMEMORATIVE EDITION
              </span>
              <span className="text-xs font-label text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                RCB 12TH MAN ARMY
              </span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95]">
              CAPTAIN <span className="text-red-500">SANJITH</span>
            </h1>

            <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed max-w-2xl font-light">
              Built with pride for our skipper. Channeling Virat’s Melbourne 82* chasing spirit, Mitchell Starc’s 150k toe-crushers, and your world-famous matchday shoelace knots. Today, you raise your bat at <span className="text-amber-400 font-bold">100* Not Out</span>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={triggerBirthdayCheer}
                className="px-7 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-lg shadow-xl shadow-red-950/40 transition-colors flex items-center gap-2.5 cursor-pointer active:bg-red-700"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>POP CELEBRATION 🎉</span>
              </button>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('batting')}
                  className="px-6 py-4 bg-[#1b1d24] hover:bg-[#232630] text-white font-semibold text-sm rounded-lg border border-white/[0.1] transition-colors flex items-center gap-2 cursor-pointer hover:border-red-500/50"
                >
                  <Target className="w-4 h-4 text-red-500" />
                  <span>Face Starc in the Nets</span>
                  <ArrowUpRight className="w-4 h-4 text-[#94a3b8]" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Signature 3D Interactive Spring Tilt Jersey Artifact */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <InteractiveJerseyArtifact />
          </div>
        </div>
      </section>

      {/* 2. Asymmetric Magazine Bento Matrix */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Bento: Technical Profile Breakdown (7 Cols) */}
        <div className="lg:col-span-7 p-7 sm:p-8 rounded-xl bg-[#14151b] border border-white/[0.08] shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" />
                <span className="text-xs text-red-400 font-label">
                  SQUAD PROFILE // RECORD #10
                </span>
              </div>
              <span className="px-3 py-0.5 rounded text-[11px] font-label bg-white/[0.06] text-white border border-white/[0.08]">
                ALL-ROUNDER
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#0e0f13] border border-white/[0.06]">
                <span className="text-[10px] font-label text-[#94a3b8] block mb-1">
                  TRADEMARK SHOT
                </span>
                <div className="text-sm font-bold text-white flex items-baseline gap-1.5">
                  The Wrist Flick
                </div>
                <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                  Whacks length deliveries off his pads cleanly into the mid-wicket stands.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e0f13] border border-white/[0.06]">
                <span className="text-[10px] font-label text-red-400 block mb-1">
                  20TH OVER WEAPON
                </span>
                <div className="text-sm font-bold text-white">
                  Mitchell Starc 148k Yorker
                </div>
                <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                  Fast inswinging toe-crusher at the base of off-stump to defend any target.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e0f13] border border-white/[0.06]">
                <span className="text-[10px] font-label text-amber-400 block mb-1">
                  CRICKET IDOLS
                </span>
                <div className="text-sm font-bold text-white">
                  Virat Kohli & Mitchell Starc
                </div>
                <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                  Defended with life in any debate. The fiercest chaser & the deadlier pacer.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0e0f13] border border-white/[0.06]">
                <span className="text-[10px] font-label text-[#94a3b8] block mb-1">
                  ICONIC MATCHES
                </span>
                <div className="text-sm font-bold text-white">
                  Melbourne 82* & Headingley 135*
                </div>
                <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                  Virat’s straight six vs Pakistan & Stokes’ impossible Ashes comeback.
                </p>
              </div>
            </div>
          </div>

          {/* Letter from Azan */}
          <div className="p-5 rounded-lg bg-[#181a22] border-l-4 border-l-red-600 border border-white/[0.06]">
            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed italic">
              "Whether you're setting crazy field placements, bowling yorkers in the final over like Mitchell Starc, or screaming for RCB with your whole heart—you're the leader of our squad. Proud to walk out to the crease with you, brother."
            </p>
            <div className="text-xs font-bold text-white mt-2 text-right">
              — Azan & The Squad XI
            </div>
          </div>
        </div>

        {/* Right Bento: Tactical Hub & Direct Actions (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Interactive Feature Cards */}
          <div className="p-6 rounded-xl bg-[#14151b] border border-white/[0.08] shadow-xl space-y-4">
            <span className="text-[10px] font-label text-[#94a3b8] block">
              GROUND COMMAND & GAMES
            </span>

            {onNavigate && (
              <div className="space-y-3">
                <div
                  onClick={() => onNavigate('batting')}
                  className="p-4 rounded-lg bg-[#0e0f13] hover:bg-[#1b1d24] border border-white/[0.06] hover:border-red-500/40 transition-colors cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                        Batting Challenge
                      </h4>
                      <p className="text-xs text-[#94a3b8]">Play your wrist flick against Mitchell Starc</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#94a3b8]" />
                </div>

                <div
                  onClick={() => onNavigate('fielding')}
                  className="p-4 rounded-lg bg-[#0e0f13] hover:bg-[#1b1d24] border border-white/[0.06] hover:border-emerald-500/40 transition-colors cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        360° Turf Setup
                      </h4>
                      <p className="text-xs text-[#94a3b8]">Drag 11 fielders into death over traps</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#94a3b8]" />
                </div>

                <div
                  onClick={() => onNavigate('scores')}
                  className="p-4 rounded-lg bg-[#0e0f13] hover:bg-[#1b1d24] border border-white/[0.06] hover:border-amber-500/40 transition-colors cursor-pointer group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                        Live Match Radar
                      </h4>
                      <p className="text-xs text-[#94a3b8]">Real-time ball flight & wagon wheel</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#94a3b8]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. The Shoelace Legend (Asymmetric Editorial Feature Plate) */}
      <section className="relative overflow-hidden rounded-xl bg-[#14151b] border-2 border-amber-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Zap className="w-4 h-4" />
              </span>
              <span className="text-xs font-label text-amber-400">
                SQUAD FOLKLORE ARCHIVE // UNFORGOTTEN MOMENT
              </span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-4xl font-black text-white tracking-tight">
              The Day You Tied Your Shoelaces During Live Play 😂
            </h3>

            <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
              Bowler runs in. Batsman gets set to pull. Meanwhile, there you are in the deep outfield, calmly bending down to fix your shoelaces. Bowler releases, batsman whacks it <em>directly</em> in your direction! But your head is down, 100% focused on tying that knot. The ball zips straight past you into the rope for four!
            </p>

            <p className="text-xs sm:text-sm font-semibold text-amber-300 italic border-l-2 border-amber-400 pl-3">
              "The bowler didn't see it, the batsman took aim, and you secured your footwear. Greatest boundary conceded in team history."
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-xs p-6 rounded-lg bg-[#0e0f13] border border-amber-500/30 text-center space-y-3">
              <div className="text-[10px] font-label text-amber-400">
                OFFICIAL MATCH VERDICT
              </div>
              <div className="font-editorial text-5xl font-black text-white">
                4 RUNS
              </div>
              <div className="h-px bg-white/[0.08]" />
              <div className="text-xs text-[#cbd5e1] space-y-1 text-left">
                <div>👟 Shoelaces: <strong className="text-white">Double-knotted (100%)</strong></div>
                <div>👀 Ball tracked: <strong className="text-red-400">0.0%</strong></div>
                <div>👑 Squad Laughs: <strong className="text-amber-400">Infinite</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Two GOAT Finishes (Editorial Magazine Cards) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" />
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Sanjith's Favorite Finishes of All Time
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Melbourne 82* Card */}
          <div className="p-7 rounded-xl bg-[#14151b] border border-white/[0.08] shadow-xl space-y-4 relative overflow-hidden group hover:border-red-500/40 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[11px] font-label text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded border border-red-500/20">
                MELBOURNE 2022 • T20 WORLD CUP
              </span>
              <span className="text-xs text-[#94a3b8] font-label">INDIA VS PAKISTAN</span>
            </div>

            <h4 className="font-editorial text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
              Virat Kohli's 82* (53 balls)
            </h4>

            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              India was 31/4 and dead in the water. Then King Kohli authored the greatest T20 chase ever—stepping back and dispatching Haris Rauf for that unfathomable straight six back over his head. Pure spine-tingling majesty.
            </p>

            <div className="pt-2 text-xs font-label text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Sanjith's Take: "The greatest run-chase under pressure in cricket history."
            </div>
          </div>

          {/* Headingley 135* Card */}
          <div className="p-7 rounded-xl bg-[#14151b] border border-white/[0.08] shadow-xl space-y-4 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[11px] font-label text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                HEADINGLEY 2019 • THE ASHES
              </span>
              <span className="text-xs text-[#94a3b8] font-label">ENGLAND VS AUSTRALIA</span>
            </div>

            <h4 className="font-editorial text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
              Ben Stokes' 135* (Last Wicket Heroics)
            </h4>

            <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              Last wicket standing, 73 runs still required with Jack Leach blocking and cleaning his glasses. Stokes launched an unrelenting six-hitting barrage to pull off the impossible Test miracle.
            </p>

            <div className="pt-2 text-xs font-label text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Sanjith's Take: "Pure heart. Proof that you never give up until the final ball."
            </div>
          </div>
        </div>
      </section>

      {/* 5. Birthday Guestbook Message Board */}
      <section>
        <ModernGuestbook />
      </section>
    </div>
  );
};
