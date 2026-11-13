import React, { useState } from 'react';
import { REAL_DETAILED_MATCHES, DetailedMatch } from '../data/matchIntelligenceData';
import { MatchStudioView } from './MatchStudioView';
import { Radio, RefreshCw, Zap, Compass, ChevronRight } from 'lucide-react';

export const LiveScoresPage: React.FC = () => {
  const [activeMatch, setActiveMatch] = useState<DetailedMatch | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleOpenMatchStudio = (match: DetailedMatch) => {
    setActiveMatch(match);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // If a match is selected, render the full dedicated MatchStudioView in-page
  if (activeMatch) {
    return <MatchStudioView match={activeMatch} onBack={() => setActiveMatch(null)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-500" />
              Real-Time Cricket Scores
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Live Cricket Center
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Click any match card to see ball tracking, the dynamic field setup, and 360° wagon wheel.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Checking...' : 'Refresh Scores'}</span>
        </button>
      </div>

      {/* Interactive Match Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {REAL_DETAILED_MATCHES.map((match) => (
          <div
            key={match.id}
            onClick={() => handleOpenMatchStudio(match)}
            className="p-6 rounded-2xl bg-[#16181d] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer group flex flex-col justify-between hover:shadow-xl hover:bg-[#1a1c22] relative overflow-hidden"
          >
            {/* Top Status Bar */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="text-[10px] font-bold text-red-400 bg-red-950/40 border border-red-800/40 px-2 py-0.5 rounded">
                    LIVE NOW
                  </span>
                  <span className="text-xs font-bold text-slate-200">{match.format}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{match.teamB.overs || match.teamA.overs}</span>
              </div>

              {/* Tournament & Venue */}
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                {match.series}
              </div>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-red-400 transition-colors">
                {match.matchTitle}
              </h3>

              {/* Live Scores Box */}
              <div className="mt-4 p-4 rounded-xl bg-[#0e0f12] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{match.teamA.flag}</span>
                    <span className="text-sm font-semibold text-slate-200">{match.teamA.name}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-white">{match.teamA.score}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{match.teamB.flag}</span>
                    <span className="text-sm font-semibold text-slate-200">{match.teamB.name}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-red-400">{match.teamB.score}</span>
                </div>
              </div>

              {/* Match Situation */}
              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                {match.matchSituation}
              </p>
            </div>

            {/* Bottom Card Action Prompt */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1.5 text-xs text-slate-300 group-hover:text-white transition-colors">
                <Compass className="w-4 h-4 text-red-500" />
                Open Live Field View ({match.playersOnField.length} players)
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Tactical Pitch Surface Guide */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#16181d] border border-white/[0.08]">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            Pitch Conditions & Ground Info
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#0e0f12] rounded-xl border border-white/[0.08]">
            <span className="text-[10px] font-bold text-red-400 uppercase block tracking-wider">Rawalpindi Surface</span>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Good batting bounce early on. Reverse swing comes into play as the ball gets scuffed up in the middle overs.
            </p>
          </div>

          <div className="p-4 bg-[#0e0f12] rounded-xl border border-white/[0.08]">
            <span className="text-[10px] font-bold text-red-400 uppercase block tracking-wider">Seddon Park Green Grass</span>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Fresh green grass on the pitch. Fast bowlers get swing and seam off the deck, keeping slips busy.
            </p>
          </div>

          <div className="p-4 bg-[#0e0f12] rounded-xl border border-white/[0.08]">
            <span className="text-[10px] font-bold text-red-400 uppercase block tracking-wider">SCG Floodlit Track</span>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Firm surface great for playing big shots. Evening dew helps the ball skid nicely onto the bat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
