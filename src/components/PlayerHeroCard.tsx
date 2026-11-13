import React from 'react';
import { SANJITH_PROFILE } from '../data/cricketData';
import { Shield, Sparkles, Award, Zap, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pavilionAudio } from '../utils/audioEngine';

export const PlayerHeroCard: React.FC = () => {
  const triggerBirthdayCheer = () => {
    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#d4af37', '#fef08a', '#881337', '#ffffff']
    });
  };

  return (
    <div className="relative rounded-xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl bg-gradient-to-b from-[#241a13] via-[#1a1410] to-[#120e0b]">
      {/* Decorative Ornate Corner Borders */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />

      {/* Top Banner Ribbon */}
      <div className="bg-[#581825] border-b border-[#d4af37]/30 py-2.5 px-6 flex items-center justify-between text-xs text-[#fef08a] font-semibold tracking-wider uppercase">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" />
          <span>Official Birthday Tribute Edition • MCC & Pavilion Certified</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#e5d0a8]">
          <span>JERSEY #{SANJITH_PROFILE.jerseyNumber}</span>
        </div>
      </div>

      <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Player Profile & Badge */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <div className="relative group cursor-pointer" onClick={triggerBirthdayCheer}>
            {/* Golden Frame Oval Avatar */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-[#d4af37] p-1.5 shadow-2xl bg-gradient-to-b from-[#3a291f] to-[#18110c] relative flex items-center justify-center">
              {/* Cricket Crest Graphic SVG */}
              <svg viewBox="0 0 100 100" className="w-32 h-32 text-[#d4af37] drop-shadow-lg">
                {/* Crossed bats */}
                <path d="M22,78 L78,22" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" />
                <path d="M78,78 L22,22" stroke="#d4af37" strokeWidth="6" strokeLinecap="round" />
                {/* Wickets in center */}
                <rect x="42" y="30" width="4" height="40" fill="#fef08a" />
                <rect x="48" y="30" width="4" height="40" fill="#fef08a" />
                <rect x="54" y="30" width="4" height="40" fill="#fef08a" />
                {/* Bails */}
                <rect x="40" y="27" width="20" height="3" fill="#fef08a" rx="1" />
                {/* Golden Crown on top */}
                <path d="M35,22 L42,12 L50,18 L58,12 L65,22 Z" fill="#d4af37" />
                {/* Ball */}
                <circle cx="50" cy="54" r="8" fill="#881337" stroke="#fef08a" strokeWidth="1.5" />
              </svg>

              {/* Jersey Number Badge */}
              <div className="absolute -bottom-2 bg-gradient-to-r from-[#d4af37] to-[#aa8014] text-[#141210] font-cinzel font-extrabold text-sm px-4 py-0.5 rounded-full shadow-lg border border-white/50">
                NO. {SANJITH_PROFILE.jerseyNumber}
              </div>
            </div>

            <span className="text-[11px] text-[#d4af37] mt-3 block font-medium group-hover:underline">
              ✦ Click crest to raise the stadium cheer ✦
            </span>
          </div>

          <div className="mt-4">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              The Legend • The Maestro
            </span>
            <h2 className="font-serif-vintage text-3xl md:text-4xl font-extrabold text-[#f4efe6] mt-0.5 tracking-tight">
              {SANJITH_PROFILE.fullName}
            </h2>
            <p className="text-xs md:text-sm text-[#b8afa3] mt-1 max-w-sm">
              {SANJITH_PROFILE.role}
            </p>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#581825]/40 border border-[#d4af37]/30 text-xs text-[#fef08a]">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Bat: {SANJITH_PROFILE.batStyle}</span>
          </div>
        </div>

        {/* Right: Career High Honours & Stats Matrix */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/25">
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                Career Performance Portfolio
              </span>
              <span className="text-xs text-[#b8afa3]">
                78 Matches • 3,450 Runs • 89 Wickets
              </span>
            </div>

            {/* Stat Pill Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-5">
              <div className="p-3.5 rounded-xl bg-[#18120e] border border-[#d4af37]/25 text-center">
                <span className="text-[10px] uppercase text-[#a89f92] tracking-wider">Batting Avg</span>
                <div className="text-2xl font-cinzel font-bold text-[#f4efe6] mt-0.5">
                  {SANJITH_PROFILE.stats.battingAverage}
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">World Class Tier</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18120e] border border-[#d4af37]/25 text-center">
                <span className="text-[10px] uppercase text-[#a89f92] tracking-wider">Strike Rate</span>
                <div className="text-2xl font-cinzel font-bold text-[#facc15] mt-0.5">
                  {SANJITH_PROFILE.stats.strikeRate}
                </div>
                <span className="text-[10px] text-amber-300 font-medium">Explosive Finisher</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18120e] border border-[#d4af37]/25 text-center">
                <span className="text-[10px] uppercase text-[#a89f92] tracking-wider">Highest Score</span>
                <div className="text-2xl font-cinzel font-bold text-[#f4efe6] mt-0.5">
                  {SANJITH_PROFILE.stats.highestScore}
                </div>
                <span className="text-[10px] text-rose-300 font-medium">Unbeaten Century</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18120e] border border-[#d4af37]/25 text-center">
                <span className="text-[10px] uppercase text-[#a89f92] tracking-wider">100s / 50s</span>
                <div className="text-2xl font-cinzel font-bold text-[#f4efe6] mt-0.5">
                  {SANJITH_PROFILE.stats.centuries} / {SANJITH_PROFILE.stats.fifties}
                </div>
                <span className="text-[10px] text-[#a89f92]">28 Fifty-Plus Scores</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18120e] border border-[#d4af37]/25 text-center">
                <span className="text-[10px] uppercase text-[#a89f92] tracking-wider">Wickets / Best</span>
                <div className="text-2xl font-cinzel font-bold text-emerald-300 mt-0.5">
                  {SANJITH_PROFILE.stats.wickets}
                </div>
                <span className="text-[10px] text-emerald-400 font-medium">Best: {SANJITH_PROFILE.stats.bestBowling}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#18120e] border border-[#d4af37]/25 text-center">
                <span className="text-[10px] uppercase text-[#a89f92] tracking-wider">Clutch Chases</span>
                <div className="text-2xl font-cinzel font-bold text-rose-300 mt-0.5">
                  {SANJITH_PROFILE.stats.clutchChasesWon}
                </div>
                <span className="text-[10px] text-rose-400 font-medium">100% Win Ratio</span>
              </div>
            </div>

            {/* Motto Quote */}
            <div className="mt-5 p-4 rounded-xl bg-[#15100c] border border-[#d4af37]/20 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#a89f92] uppercase tracking-wider font-semibold">The Sanjith Creed</span>
                <p className="font-serif-vintage italic text-sm text-[#e5d0a8] mt-0.5">
                  "{SANJITH_PROFILE.motto}"
                </p>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-6 pt-4 border-t border-[#d4af37]/20 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#a89f92] flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              Gifted with admiration by your best mates
            </span>
            <button
              onClick={triggerBirthdayCheer}
              className="px-5 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] hover:opacity-95 text-[#141210] font-cinzel font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Raise Bat in Celebration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
