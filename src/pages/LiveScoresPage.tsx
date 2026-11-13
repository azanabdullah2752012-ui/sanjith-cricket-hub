import React, { useState } from 'react';
import { REAL_DETAILED_MATCHES, DetailedMatch } from '../data/matchIntelligenceData';
import { MatchStudioView } from './MatchStudioView';
import { Radio, RefreshCw, Zap, Compass, ChevronRight } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

export const LiveScoresPage: React.FC = () => {
  const [activeMatch, setActiveMatch] = useState<DetailedMatch | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleOpenMatchStudio = (match: DetailedMatch) => {
    setActiveMatch(match);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    pavilionAudio.playWillowCrack();
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    pavilionAudio.playWillowCrack();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // If a match is selected, render the full dedicated MatchStudioView in-page! (NO ugly popups)
  if (activeMatch) {
    return <MatchStudioView match={activeMatch} onBack={() => setActiveMatch(null)} />;
  }

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <div className="ald-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-800 font-bold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-600" />
              REAL-TIME CRICKET SCORES ⚡
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
            Live Cricket Matches
          </h1>
          <p className="text-sm text-[#78716c] mt-1 max-w-2xl">
            Tap any match below to see live scores, the 3D pitch map, and wagon wheel!
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="px-4 py-2.5 rounded-xl bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shadow-sm shrink-0"
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
            className="ald-card p-6 rounded-2xl hover:border-[#1c1917] transition-all cursor-pointer group flex flex-col justify-between hover:shadow-lg relative overflow-hidden bg-white"
          >
            {/* Top Status Bar */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ded7cb]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    LIVE NOW
                  </span>
                  <span className="text-xs font-bold text-[#1c1917]">{match.format}</span>
                </div>
                <span className="text-[11px] font-mono text-[#78716c]">{match.teamB.overs || match.teamA.overs}</span>
              </div>

              {/* Tournament & Venue */}
              <div className="text-[11px] text-[#78716c] uppercase tracking-wider font-semibold">
                {match.series}
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1c1917] mt-0.5 group-hover:underline">
                {match.matchTitle}
              </h3>

              {/* Live Scores Box */}
              <div className="mt-5 p-4 rounded-xl bg-[#f7f5f0] border border-[#ded7cb] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{match.teamA.flag}</span>
                    <span className="font-editorial text-sm font-bold text-[#1c1917]">{match.teamA.name}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#1c1917]">{match.teamA.score}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{match.teamB.flag}</span>
                    <span className="font-editorial text-sm font-bold text-[#1c1917]">{match.teamB.name}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#1c1917]">{match.teamB.score}</span>
                </div>
              </div>

              {/* Match Situation */}
              <p className="text-xs text-[#44403c] mt-4 font-medium leading-relaxed">
                {match.matchSituation}
              </p>
            </div>

            {/* Bottom Card Action Prompt */}
            <div className="mt-6 pt-4 border-t border-[#ded7cb] flex items-center justify-between text-xs font-bold text-[#1c1917]">
              <span className="flex items-center gap-1.5 text-xs">
                <Compass className="w-4 h-4 text-[#1c1917]" />
                Launch Live Field Studio & XI ({match.playersOnField.length})
              </span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Tactical Pitch Surface Guide */}
      <div className="ald-card p-6 md:p-8 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-[#1c1917]" />
          <h3 className="font-editorial text-lg font-bold text-[#1c1917]">
            Active Match Pitch Reports & Soil Analytics
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#f7f5f0] rounded-xl border border-[#ded7cb]">
            <span className="text-[10px] font-bold text-[#78716c] uppercase block">RAWALPINDI DECK (PAK VS SL)</span>
            <p className="text-xs text-[#1c1917] mt-1 leading-relaxed">
              True bounce on Day 1 & 2. As the leather scuffs past the 25th over, abrasive clay brings aggressive reverse-swing into play.
            </p>
          </div>

          <div className="p-4 bg-[#f7f5f0] rounded-xl border border-[#ded7cb]">
            <span className="text-[10px] font-bold text-[#78716c] uppercase block">SEDDON PARK GREEN TOP (IND A VS NZ A)</span>
            <p className="text-xs text-[#1c1917] mt-1 leading-relaxed">
              Heavy moisture and 8mm grass cut. Lateral seam deviation demands 3 slips + gully throughout the first 50 overs.
            </p>
          </div>

          <div className="p-4 bg-[#f7f5f0] rounded-xl border border-[#ded7cb]">
            <span className="text-[10px] font-bold text-[#78716c] uppercase block">SCG FLOODLIGHT TRACK (SYS W VS SYT W)</span>
            <p className="text-xs text-[#1c1917] mt-1 leading-relaxed">
              Firm sub-base tailored for strokeplay with evening dew making balls skip onto the bat cleanly for boundary chases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
