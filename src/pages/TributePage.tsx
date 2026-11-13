import React from 'react';
import { ModernGuestbook } from '../components/ModernGuestbook';
import { Gift, Sparkles, Heart, Trophy, Award, Shield, Compass, Target, ArrowRight, Flame, Zap } from 'lucide-react';
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
      colors: ['#dc2626', '#b45309', '#1c1917', '#f5f2eb'] // RCB red & gold tribute colors
    });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 1. Grand Sanjith Birthday Celebration Hero Card */}
      <div className="ald-card p-6 md:p-10 rounded-3xl bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden shadow-sm">
        {/* Subtle decorative background watermark with #10 */}
        <div className="absolute right-4 -bottom-6 font-editorial font-bold text-[140px] text-[#1c1917]/5 pointer-events-none select-none">
          10
        </div>

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs uppercase tracking-widest text-red-800 font-bold flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
              <Gift className="w-3.5 h-3.5 text-red-600" />
              RCB SQUAD SKIPPER • JERSEY #10 • SPECIAL BIRTHDAY EDITION 💥
            </span>
            <span className="text-xs text-[#78716c] font-mono">
              VIRAT & STARC DISCIPLE
            </span>
          </div>

          <h1 className="font-editorial text-3xl md:text-5xl font-bold text-[#1c1917] tracking-tight leading-tight">
            Happy Birthday, Skipper Sanjith!
          </h1>

          <p className="text-sm md:text-base text-[#44403c] leading-relaxed">
            Welcome to your dedicated cricket pavilion. Built with pure brotherhood for your love of the game—from your trademark wrist flick off the pads to Mitchell Starc-style death yorkers and unshakeable RCB loyalty. Raise the bat high for an undefeated century year!
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
              <Target className="w-3.5 h-3.5 text-red-700" />
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
              <Award className="w-4 h-4 text-red-600" />
              <span className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                OFFICIAL SQUAD DOSSIER • CAPTAIN & MAESTRO
              </span>
            </div>
            <h2 className="font-editorial text-2xl md:text-3xl font-bold text-[#1c1917]">
              Captain Sanjith: The Legend's Dossier
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-mono font-bold border border-red-300">
              FRANCHISE: RCB LOYALIST 💥
            </span>
            <span className="px-3 py-1 rounded-full bg-[#1c1917] text-[#f5f2eb] text-xs font-mono font-bold">
              ROLE: ALL-ROUND MAESTRO
            </span>
          </div>
        </div>

        {/* Stats & Citation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-[#f7f5f0] p-6 rounded-2xl border border-[#ded7cb] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#78716c] uppercase">OFFICIAL JERSEY</span>
              <span className="text-sm font-bold font-mono text-[#1c1917]">#10 (THE SKIPPER)</span>
            </div>

            <div className="h-px bg-[#ded7cb]" />

            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-semibold">CRICKET IDOLS / GOATS</span>
                <span className="text-sm font-bold text-[#1c1917]">Virat Kohli (The King) & Mitchell Starc (The Sandman)</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-semibold">SIGNATURE SHOT</span>
                <span className="text-sm font-bold text-red-700">The Sublime Wrist Flick (Whipping length balls into mid-wicket)</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-semibold">FINAL OVER DEFENSE WEAPON</span>
                <span className="text-sm font-bold text-[#1c1917]">148 km/h Mitchell Starc Inswinging Yorker</span>
              </div>

              <div>
                <span className="text-[11px] text-[#78716c] uppercase block font-semibold">FAVORITE ICONIC FINISHES</span>
                <span className="text-sm font-bold text-amber-800">Virat 82* vs PAK (MCG) & Stokes 135* vs AUS (Headingley)</span>
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
                  <span className="text-xl font-editorial font-bold text-red-600">100* N.O.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="p-6 bg-[#f7f5f0] rounded-2xl border border-[#ded7cb]">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                <Shield className="w-4 h-4 text-red-600" />
                The Squad's Citation of Honour
              </div>
              <p className="text-sm text-[#44403c] leading-relaxed italic">
                "Whether setting aggressive 7-2 field cordons, defending 6 runs in the 20th over with toe-crushing Starc yorkers, or channeling King Kohli's Melbourne chase energy—Sanjith is the heartbeat of this team. Happy Birthday to the captain who turns every impossible chase into a stroll in the park."
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
                    <Target className="w-4 h-4 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-[#1c1917]">Batting Arena</div>
                    <div className="text-[11px] text-[#78716c] mt-0.5">Execute Sanjith's Flick</div>
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
                    <Trophy className="w-4 h-4 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold text-[#1c1917]">Live Match Center</div>
                    <div className="text-[11px] text-[#78716c] mt-0.5">Real-time match radar</div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Legendary Shoelace Incident (Special Featured Memory) */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 border border-amber-200/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Zap className="w-5 h-5 text-amber-700" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-800">
                OFFICIAL SQUAD FOLKLORE • IMMORTAL MOMENT
              </span>
              <h3 className="font-editorial text-2xl font-bold text-[#1c1917]">
                The Legendary Shoelace Boundary of Honour 😂
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-900 border border-amber-300">
            SHOELACES TIED: 100% • RUNS STOPPED: 0
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <p className="text-sm text-[#44403c] leading-relaxed">
              <strong>The Scene:</strong> The bowler starts running in from the top of his mark. The batsman winds up for a ferocious lofted drive. Meanwhile, at deep boundary, <strong>Captain Sanjith</strong> decides this exact delivery is the prime moment to bend down and meticulously tie his shoelaces.
            </p>
            <p className="text-sm text-[#44403c] leading-relaxed">
              The bowler delivers, the batsman hammers a missile right into Sanjith's exact corridor. Sanjith is peacefully perfecting his double knot, completely oblivious. The ball whistles past his ear at 120 km/h and crashes straight into the boundary triangles.
            </p>
            <p className="text-sm font-semibold text-amber-950 italic">
              "Bowler didn't look, batsman took aim, and the skipper secured his footwear. Pure fielding artistry."
            </p>
          </div>

          <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-amber-200 space-y-3 text-center">
            <div className="text-3xl font-editorial font-bold text-[#1c1917]">
              4 RUNS
            </div>
            <div className="text-xs text-[#78716c] uppercase tracking-wider font-semibold">
              OFFICIAL MATCH RULING
            </div>
            <div className="h-px bg-[#ded7cb]" />
            <div className="text-xs text-[#1c1917] font-medium leading-normal">
              ✅ Knot Integrity: Flawless<br/>
              ❌ Spatial Awareness: 0%<br/>
              👑 Skipper Composure: 10/10
            </div>
          </div>
        </div>
      </div>

      {/* 4. The Skipper's Holy Grail Matches Spotlight */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-white border border-[#ded7cb] shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-red-600" />
          <span className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
            MASTERCLASS INSPIRATION • SANJITH'S GOAT MATCHES
          </span>
        </div>
        <h3 className="font-editorial text-2xl font-bold text-[#1c1917] mb-6">
          The Matches That Built Sanjith's Cricket DNA
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Match 1: Virat 82* vs Pakistan */}
          <div className="p-6 rounded-2xl bg-[#f7f5f0] border border-[#ded7cb] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">
                MELBOURNE 2022
              </span>
              <span className="text-xs font-mono text-[#78716c]">T20 WORLD CUP</span>
            </div>

            <h4 className="font-editorial text-xl font-bold text-[#1c1917]">
              Virat Kohli's Immortal 82* vs Pakistan
            </h4>

            <p className="text-xs text-[#44403c] leading-relaxed">
              India reeling at 31/4. King Kohli orchestrates the greatest chase in cricket history—capping it off with that impossible back-foot straight six off Haris Rauf over long-on. Pure goosebumps and ice in the veins.
            </p>

            <div className="pt-2 text-xs font-semibold text-[#1c1917] flex items-center gap-1.5">
              <span>✦ Sanjith's Take:</span>
              <span className="text-[#78716c]">The undisputed greatest T20 innings ever played.</span>
            </div>
          </div>

          {/* Match 2: Ben Stokes 135* vs Australia */}
          <div className="p-6 rounded-2xl bg-[#f7f5f0] border border-[#ded7cb] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                HEADINGLEY 2019
              </span>
              <span className="text-xs font-mono text-[#78716c]">THE ASHES</span>
            </div>

            <h4 className="font-editorial text-xl font-bold text-[#1c1917]">
              Ben Stokes' Miracle 135* vs Australia
            </h4>

            <p className="text-xs text-[#44403c] leading-relaxed">
              73 runs needed with only 1 wicket in hand. Stokes goes berserk with switch-hits and towering sixes while Jack Leach polishes his glasses. Absolute defiance against hostile pace.
            </p>

            <div className="pt-2 text-xs font-semibold text-[#1c1917] flex items-center gap-1.5">
              <span>✦ Sanjith's Take:</span>
              <span className="text-[#78716c]">Never throw in the towel while you still have the willow.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. The Birthday Wishes Locker & Guestbook */}
      <section>
        <ModernGuestbook />
      </section>
    </div>
  );
};
