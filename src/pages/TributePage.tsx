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
      colors: ['#dc2626', '#b45309', '#1c1917', '#f5f2eb']
    });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 1. Main Birthday Banner */}
      <div className="ald-card p-6 md:p-10 rounded-3xl bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden shadow-sm">
        {/* Big Watermark #10 */}
        <div className="absolute right-4 -bottom-6 font-editorial font-bold text-[150px] text-[#1c1917]/5 pointer-events-none select-none">
          10
        </div>

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs uppercase tracking-wider text-red-800 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-200">
              HAPPY BIRTHDAY SANJITH • JERSEY #10 💥
            </span>
            <span className="text-xs text-[#78716c] font-medium">
              RCB FOREVER
            </span>
          </div>

          <h1 className="font-editorial text-3xl md:text-5xl font-bold text-[#1c1917] tracking-tight leading-tight">
            Happy Birthday, Skipper!
          </h1>

          <p className="text-sm md:text-base text-[#44403c] leading-relaxed">
            Made this site just for you bro! You love your cricket, you never back down from a match, and nobody hits the wrist flick or bowls death yorkers quite like you. Raise your bat high—today you're 100* not out!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#1c1917]">
            <span className="flex items-center gap-1.5 text-red-600">
              <Heart className="w-4 h-4 fill-red-600" />
              Made by Azan & the boys
            </span>
            <span className="text-[#a8a29e]">•</span>
            <span className="flex items-center gap-1.5 text-amber-700">
              <Trophy className="w-4 h-4" />
              Team Captain & No. 1 Player
            </span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={triggerBirthdayCheer}
            className="px-6 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>POP CONFETTI 🎉</span>
          </button>

          {onNavigate && (
            <button
              onClick={() => onNavigate('batting')}
              className="px-5 py-3 bg-[#ece7de] hover:bg-white text-[#1c1917] font-semibold text-xs rounded-2xl border border-[#ded7cb] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Target className="w-3.5 h-3.5 text-red-600" />
              <span>Play Batting Game</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Sanjith's Official Player Card */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-white border border-[#ded7cb] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#ded7cb] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-red-600" />
              <span className="text-xs uppercase tracking-wider text-[#78716c] font-bold">
                PLAYER CARD
              </span>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold text-[#1c1917]">
              Captain Sanjith (#10)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200">
              TEAM: RCB 💥
            </span>
            <span className="px-3 py-1 rounded-full bg-[#1c1917] text-[#f5f2eb] text-xs font-bold">
              ROLE: ALL-ROUNDER
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Player Facts */}
          <div className="lg:col-span-5 bg-[#f7f5f0] p-6 rounded-2xl border border-[#ded7cb] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#78716c] uppercase font-bold">SHIRT NUMBER</span>
              <span className="text-sm font-bold text-[#1c1917]">#10 (THE SKIPPER)</span>
            </div>

            <div className="h-px bg-[#ded7cb]" />

            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-bold">CRICKET HEROES</span>
                <span className="text-sm font-bold text-[#1c1917]">Virat Kohli & Mitchell Starc</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-bold">FAVORITE SHOT</span>
                <span className="text-sm font-bold text-red-700">The Wrist Flick (whips it right over mid-wicket)</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-bold">BOWLING TRICK</span>
                <span className="text-sm font-bold text-[#1c1917]">Mitchell Starc-style fast yorker to finish the game</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-bold">FAVORITE MATCHES</span>
                <span className="text-sm font-bold text-amber-800">Virat 82* vs Pakistan & Stokes 135* vs Australia</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-[#ded7cb]">
                  <span className="text-[10px] text-[#78716c] uppercase font-bold block">STRIKE RATE</span>
                  <span className="text-xl font-editorial font-bold text-[#1c1917]">198.5</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#ded7cb]">
                  <span className="text-[10px] text-[#78716c] uppercase font-bold block">TODAY'S SCORE</span>
                  <span className="text-xl font-editorial font-bold text-red-600">100* N.O.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Letter from the Team */}
          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 bg-[#f7f5f0] rounded-2xl border border-[#ded7cb]">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                <Shield className="w-4 h-4 text-red-600" />
                Note From The Squad
              </div>
              <p className="text-sm text-[#44403c] leading-relaxed italic">
                "Whether you're setting crazy field placements, bowling yorkers in the final over like Mitchell Starc, or cheering for RCB with your whole heart—you're the leader of our squad. Hope you have an awesome birthday bro! We're lucky to play alongside you."
              </p>
              <div className="mt-3 text-xs font-bold text-[#1c1917] text-right">
                — Azan & The Squad
              </div>
            </div>

            {/* Simple Shortcuts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {onNavigate && (
                <>
                  <button
                    onClick={() => onNavigate('batting')}
                    className="p-4 rounded-xl bg-white hover:bg-[#ece7de] border border-[#ded7cb] hover:border-[#1c1917] transition-all text-left cursor-pointer group"
                  >
                    <Target className="w-4 h-4 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-[#1c1917]">Play Batting Game</div>
                    <div className="text-[11px] text-[#78716c] mt-0.5">Hit your flick shot</div>
                  </button>

                  <button
                    onClick={() => onNavigate('fielding')}
                    className="p-4 rounded-xl bg-white hover:bg-[#ece7de] border border-[#ded7cb] hover:border-[#1c1917] transition-all text-left cursor-pointer group"
                  >
                    <Compass className="w-4 h-4 text-[#1c1917] mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-[#1c1917]">Move Fielders</div>
                    <div className="text-[11px] text-[#78716c] mt-0.5">Drag & drop field setup</div>
                  </button>

                  <button
                    onClick={() => onNavigate('scores')}
                    className="p-4 rounded-xl bg-white hover:bg-[#ece7de] border border-[#ded7cb] hover:border-[#1c1917] transition-all text-left cursor-pointer group"
                  >
                    <Trophy className="w-4 h-4 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-[#1c1917]">Live Matches</div>
                    <div className="text-[11px] text-[#78716c] mt-0.5">Check real scores</div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Shoelace Story Card */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-amber-50/40 border border-amber-200/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Zap className="w-5 h-5 text-amber-700" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800">
                TRUE CRICKET STORY
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#1c1917]">
                The Time You Tied Your Shoelaces During a Match 😂
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-xs font-bold text-amber-900 border border-amber-300">
            SHOES TIED: 100% • RUNS SAVED: 0
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <p className="text-sm text-[#44403c] leading-relaxed">
              <strong>What happened:</strong> The bowler starts running in. The batsman gets ready to smack the ball. Meanwhile, there you are in the outfield, peacefully bending down to tie your shoelaces.
            </p>
            <p className="text-sm text-[#44403c] leading-relaxed">
              The bowler doesn't see you and bowls the ball. The batsman whacks it <em>directly</em> at you! But your head is down, focusing 100% on your shoes. The ball zooms right past you and crosses the rope for four runs!
            </p>
            <p className="text-sm font-semibold text-amber-950 italic">
              "Bowler didn't look, batsman took aim, and you secured your shoes. The funniest boundary in squad history."
            </p>
          </div>

          <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-amber-200 space-y-2 text-center">
            <div className="text-3xl font-editorial font-bold text-[#1c1917]">
              4 RUNS
            </div>
            <div className="text-xs text-[#78716c] uppercase font-semibold">
              THE VERDICT
            </div>
            <div className="h-px bg-[#ded7cb]" />
            <div className="text-xs text-[#1c1917] font-medium leading-relaxed">
              👟 Shoelaces: Tied tight<br/>
              👀 Ball spotted: Not at all<br/>
              👑 Confidence: 10/10
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sanjith's Favorite Matches */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-white border border-[#ded7cb] shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-red-600" />
          <span className="text-xs uppercase tracking-wider text-[#78716c] font-bold">
            BEST GAMES EVER
          </span>
        </div>
        <h3 className="font-editorial text-2xl font-bold text-[#1c1917] mb-6">
          Sanjith's Favorite Cricket Finishes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Match 1: Virat 82* */}
          <div className="p-6 rounded-2xl bg-[#f7f5f0] border border-[#ded7cb] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">
                MELBOURNE 2022
              </span>
              <span className="text-xs text-[#78716c] font-medium">T20 World Cup</span>
            </div>

            <h4 className="font-editorial text-xl font-bold text-[#1c1917]">
              Virat Kohli's 82* vs Pakistan
            </h4>

            <p className="text-xs text-[#44403c] leading-relaxed">
              India was 31/4 and it looked like game over. Then King Kohli played the innings of his life—hitting that crazy straight six off Haris Rauf back over his head. Pure chills every single time.
            </p>

            <div className="pt-2 text-xs font-semibold text-[#1c1917]">
              ✦ Sanjith's take: <span className="text-[#78716c] font-normal">The greatest T20 chase of all time.</span>
            </div>
          </div>

          {/* Match 2: Ben Stokes 135* */}
          <div className="p-6 rounded-2xl bg-[#f7f5f0] border border-[#ded7cb] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                HEADINGLEY 2019
              </span>
              <span className="text-xs text-[#78716c] font-medium">The Ashes</span>
            </div>

            <h4 className="font-editorial text-xl font-bold text-[#1c1917]">
              Ben Stokes' 135* vs Australia
            </h4>

            <p className="text-xs text-[#44403c] leading-relaxed">
              Last wicket, 73 runs still needed to win. Stokes started smashing sixes all over the ground while Jack Leach kept cleaning his glasses at the other end. Never ever give up.
            </p>

            <div className="pt-2 text-xs font-semibold text-[#1c1917]">
              ✦ Sanjith's take: <span className="text-[#78716c] font-normal">Pure fight until the last ball.</span>
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
