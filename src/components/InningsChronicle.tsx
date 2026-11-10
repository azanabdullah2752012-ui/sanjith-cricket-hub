import React, { useState } from 'react';
import { ICONIC_INNINGS, InningsHighlight } from '../data/cricketData';
import { pavilionAudio } from '../utils/audioEngine';
import { Trophy, Calendar, Zap, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InningsChronicle: React.FC = () => {
  const [activeInnings, setActiveInnings] = useState<InningsHighlight>(ICONIC_INNINGS[0]);

  const handleSelectInnings = (innings: InningsHighlight) => {
    setActiveInnings(innings);
    pavilionAudio.playApplause(1.5);
    if (innings.playerOfMatch) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#fef08a', '#881337', '#ffffff']
      });
    }
  };

  return (
    <div className="pavilion-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#d4af37]/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Hall of Fame & Legendary Masterclasses
          </span>
          <h3 className="font-serif-vintage text-2xl md:text-3xl text-[#f4efe6] font-bold mt-1">
            Iconic Innings & Match-Winning Heroics
          </h3>
          <p className="text-sm text-[#b8afa3] mt-1">
            A chronicle of clutch finishes, high-pressure chases, and game-turning spells.
          </p>
        </div>

        <div className="flex gap-2">
          {ICONIC_INNINGS.map((innings) => (
            <button
              key={innings.id}
              onClick={() => handleSelectInnings(innings)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                activeInnings.id === innings.id
                  ? 'bg-[#581825] border-[#d4af37] text-[#fef08a] shadow-lg'
                  : 'bg-[#181310] border-[#d4af37]/20 text-[#a89f92] hover:border-[#d4af37]/50'
              }`}
            >
              {innings.format}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scorecard Board View */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#120e0b] p-6 rounded-xl border border-[#d4af37]/30 shadow-inner">
            <div className="flex items-center justify-between text-xs text-[#a89f92] pb-3 border-b border-[#d4af37]/15">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {activeInnings.date}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#581825] text-[#fef08a] font-bold text-[10px] uppercase tracking-wide">
                {activeInnings.tournament}
              </span>
            </div>

            {/* Scorecard Hero Numbers */}
            <div className="mt-6 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#b8afa3]">Runs Scored</span>
                <div className="text-5xl font-cinzel font-extrabold text-[#f4efe6] mt-1 flex items-baseline gap-2">
                  <span>{activeInnings.runs}</span>
                  <span className="text-sm font-sans font-normal text-[#a89f92]">
                    off {activeInnings.balls}b
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-[#b8afa3]">Strike Rate</span>
                <div className="text-3xl font-cinzel font-bold text-[#facc15] mt-1">
                  {activeInnings.strikeRate}
                </div>
              </div>
            </div>

            {/* Boundary Breakdown */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-[#d4af37]/15 text-center">
              <div className="bg-[#1f1712] p-2.5 rounded-lg border border-[#d4af37]/10">
                <div className="text-[10px] text-[#a89f92] uppercase">Fours</div>
                <div className="text-xl font-bold font-cinzel text-amber-200 mt-0.5">{activeInnings.fours}</div>
              </div>
              <div className="bg-[#1f1712] p-2.5 rounded-lg border border-[#d4af37]/10">
                <div className="text-[10px] text-[#a89f92] uppercase">Sixes</div>
                <div className="text-xl font-bold font-cinzel text-rose-300 mt-0.5">{activeInnings.sixes}</div>
              </div>
              <div className="bg-[#1f1712] p-2.5 rounded-lg border border-[#d4af37]/10">
                <div className="text-[10px] text-[#a89f92] uppercase">Wickets Taken</div>
                <div className="text-xl font-bold font-cinzel text-emerald-400 mt-0.5">{activeInnings.wickets ?? 0}</div>
              </div>
            </div>

            {activeInnings.overs && (
              <div className="mt-4 p-2.5 bg-[#17201a] rounded-lg border border-emerald-900/40 text-xs text-emerald-200 flex items-center justify-between">
                <span className="font-medium">Bowling Figures:</span>
                <span className="font-mono font-bold text-emerald-300">{activeInnings.overs}</span>
              </div>
            )}
          </div>

          {/* Quick Innings Picker List */}
          <div className="space-y-2">
            {ICONIC_INNINGS.map((inn) => (
              <button
                key={inn.id}
                onClick={() => handleSelectInnings(inn)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                  activeInnings.id === inn.id
                    ? 'bg-[#291c15] border-[#d4af37] text-white'
                    : 'bg-[#15110e] border-[#d4af37]/15 text-[#a89f92] hover:bg-[#1e1713]'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold">{inn.match}</div>
                  <div className="text-[11px] text-[#8e8578]">{inn.runs} runs ({inn.balls} balls) • {inn.format}</div>
                </div>
                {inn.playerOfMatch && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1 font-medium">
                    <Award className="w-3 h-3" /> POTM
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Narrative & Commentary */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#191410] p-6 md:p-8 rounded-xl border border-[#d4af37]/25">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-bold mb-1">
              <Trophy className="w-4 h-4 text-[#d4af37]" /> Match Narrative
            </div>
            <h4 className="font-serif-vintage text-2xl text-[#f4efe6] font-bold">
              {activeInnings.match}
            </h4>

            {/* Narrative Prose */}
            <div className="mt-6 text-[#d6cdbf] text-base leading-relaxed space-y-4 font-normal">
              <p className="border-l-2 border-[#581825] pl-4 italic text-[#e6ded3] font-serif-vintage text-lg">
                "{activeInnings.narrative}"
              </p>
            </div>

            {/* Clutch Moment Card */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#2c0910] to-[#1a120e] border border-rose-900/50">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4 text-amber-400" /> Defining Moment
              </div>
              <div className="text-sm text-[#f0e6d8] leading-relaxed">
                {activeInnings.clutchMoment}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#d4af37]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#a89f92]">
              Status: <span className="text-emerald-400 font-semibold">Victory Confirmed • Not Out</span>
            </div>
            <button
              onClick={() => {
                pavilionAudio.playBoundaryCheer();
                confetti({
                  particleCount: 60,
                  spread: 70,
                  origin: { y: 0.8 },
                });
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#581825] to-[#881337] hover:from-[#721f31] hover:to-[#a21943] text-white text-xs font-bold rounded-lg border border-[#d4af37]/50 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#facc15]" />
              Applaud Innings & Sound Roar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
