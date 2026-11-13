import React, { useState } from 'react';
import { DetailedMatch, MatchPlayer } from '../data/matchIntelligenceData';
import { Target, User, Activity, MapPin, Compass, Shield, ArrowLeft, Radio, Flame } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

interface LiveMatchModalProps {
  match: DetailedMatch;
  onClose: () => void;
}

export const LiveMatchDetailModal: React.FC<LiveMatchModalProps> = ({ match, onClose }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<MatchPlayer>(
    match.playersOnField.find(p => p.currentMatchStats.isBattingNow) || match.playersOnField[0]
  );
  const [activeTab, setActiveTab] = useState<'field' | 'squad' | 'pitch'>('field');

  const handleSelectPlayer = (player: MatchPlayer) => {
    setSelectedPlayer(player);
    pavilionAudio.playWillowCrack();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[#f5f2eb] border border-[#ded7cb] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#1c1917]">
        {/* Modal Header */}
        <div className="p-6 md:p-8 bg-[#ece7de] border-b border-[#ded7cb] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300">
                LIVE ON-FIELD TELEMETRY
              </span>
              <span className="text-xs text-[#78716c] font-medium">• {match.series}</span>
            </div>

            <h2 className="font-editorial text-2xl md:text-3xl font-bold text-[#1c1917] tracking-tight">
              {match.matchTitle}
            </h2>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#78716c]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#1c1917]" />
                {match.venue}
              </span>
              <span>•</span>
              <span className="font-mono font-semibold text-[#1c1917] bg-white px-2 py-0.5 rounded border border-[#ded7cb]">
                {match.daySessionStatus}
              </span>
            </div>
          </div>

          {/* Close & Action Buttons */}
          <div className="flex items-center gap-3">
            {/* View Mode Tabs */}
            <div className="flex bg-white p-1 rounded-xl border border-[#ded7cb]">
              <button
                onClick={() => setActiveTab('field')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'field' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
                }`}
              >
                Live Field Placements
              </button>
              <button
                onClick={() => setActiveTab('squad')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'squad' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
                }`}
              >
                Active XI Profiles ({match.playersOnField.length})
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] text-xs font-bold transition-colors cursor-pointer shadow-sm"
            >
              Exit Live View
            </button>
          </div>
        </div>

        {/* Live Scoreboard Summary Banner */}
        <div className="px-6 md:px-8 py-3.5 bg-white border-b border-[#ded7cb] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-lg">{match.teamA.flag}</span>
              <span className="font-editorial text-sm font-bold">{match.teamA.shortName}</span>
              <span className="font-mono text-sm font-bold text-[#1c1917] bg-[#f7f5f0] px-2 py-0.5 rounded border border-[#ded7cb]">
                {match.teamA.score}
              </span>
            </div>

            <span className="text-[#78716c] font-bold">vs</span>

            <div className="flex items-center gap-2">
              <span className="text-lg">{match.teamB.flag}</span>
              <span className="font-editorial text-sm font-bold">{match.teamB.shortName}</span>
              <span className="font-mono text-sm font-bold text-[#1c1917] bg-[#f7f5f0] px-2 py-0.5 rounded border border-[#ded7cb]">
                {match.teamB.score}
              </span>
            </div>
          </div>

          <div className="text-xs text-[#1c1917] font-semibold bg-[#ece7de] px-3 py-1 rounded-full border border-[#ded7cb]">
            {match.matchSituation}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Active Tactical Trap Alert */}
          <div className="p-4 rounded-lg bg-[#ece7de] border border-[#ded7cb] flex items-start gap-3">
            <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-[#78716c] uppercase tracking-wider block">
                CURRENT TACTICAL TRAP & BOWLING PLAN
              </span>
              <p className="text-xs md:text-sm font-medium text-[#1c1917] mt-0.5 leading-relaxed">
                {match.activeTacticalTrap}
              </p>
            </div>
          </div>

          {activeTab === 'field' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Interactive 360 Field Placements with Real Players */}
              <div className="lg:col-span-7 ald-card p-6 md:p-8 rounded-lg flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-4 pb-2 border-b border-[#ded7cb]">
                  <span className="text-xs font-mono text-[#78716c] uppercase">LIVE ON-FIELD POSITIONS ({match.playersOnField.length} PLAYERS)</span>
                  <span className="text-xs font-semibold text-[#1c1917] bg-[#ece7de] px-2 py-0.5 rounded">
                    Selected: {selectedPlayer.name}
                  </span>
                </div>

                <div className="relative w-full max-w-[460px] aspect-square rounded-full border-2 border-dashed border-[#1c1917] bg-[#f7f5f0] p-6 flex items-center justify-center shadow-inner select-none">
                  {/* 30-Yard Circle */}
                  <div className="absolute inset-16 rounded-full border border-dashed border-[#ded7cb] pointer-events-none" />

                  {/* 22-yard pitch strip */}
                  <div className="absolute w-10 h-36 bg-[#ece7de] border border-[#ded7cb] rounded-sm flex flex-col justify-between items-center py-2 shadow-sm">
                    <div className="w-6 h-1 bg-[#1c1917]" />
                    <div className="text-[8px] font-mono text-[#78716c] uppercase -rotate-90">22 YDS</div>
                    <div className="w-6 h-1 bg-[#1c1917]" />
                  </div>

                  {/* Player Nodes directly positioned on the turf */}
                  {match.playersOnField.map((player) => {
                    const isSelected = selectedPlayer.id === player.id;
                    const isBatting = player.currentMatchStats.isBattingNow;
                    const isBowling = player.currentMatchStats.isBowlingNow;

                    return (
                      <button
                        key={player.id}
                        onClick={() => handleSelectPlayer(player)}
                        style={{
                          left: `${player.fieldCoordinates.x}%`,
                          top: `${player.fieldCoordinates.y}%`,
                        }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all cursor-pointer flex flex-col items-center group z-10 ${
                          isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                        }`}
                        title={`${player.name} (${player.fieldingPositionCurrent})`}
                      >
                        {/* Node Pin */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shadow-md border ${
                            isSelected
                              ? 'bg-[#1c1917] text-[#f5f2eb] ring-4 ring-[#ded7cb]'
                              : isBatting
                              ? 'bg-amber-400 text-black border-amber-600'
                              : isBowling
                              ? 'bg-red-500 text-white border-red-700'
                              : 'bg-white text-[#1c1917] border-[#1c1917]'
                          }`}
                        >
                          {player.name.charAt(0)}
                        </div>

                        {/* Name label */}
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap mt-1 shadow-sm ${
                          isSelected ? 'bg-[#1c1917] text-white' : 'bg-white/90 text-[#1c1917] border border-[#ded7cb]'
                        }`}>
                          {player.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="w-full mt-6 pt-3 border-t border-[#ded7cb] flex flex-wrap items-center justify-between text-xs text-[#78716c] gap-2">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Batsmen</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Bowler</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-white border border-[#1c1917]" /> Fielders</span>
                  </div>
                  <span className="text-[11px] font-mono">Click any player to inspect current stats</span>
                </div>
              </div>

              {/* Right: Selected Player Current Match State & Info */}
              <div className="lg:col-span-5 ald-card p-6 md:p-8 rounded-lg flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#ded7cb]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#78716c]">
                      LIVE PLAYER INSPECTOR
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#ece7de] text-[#1c1917]">
                      {selectedPlayer.role}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#1c1917] mt-3">
                    {selectedPlayer.name}
                  </h3>
                  <div className="text-xs text-[#78716c] mt-0.5">
                    {selectedPlayer.battingHand} {selectedPlayer.bowlingStyle ? `• ${selectedPlayer.bowlingStyle}` : ''}
                  </div>

                  {/* Current Fielding Station */}
                  <div className="mt-4 p-3.5 bg-[#f7f5f0] rounded-xl border border-[#ded7cb]">
                    <span className="text-[10px] text-[#78716c] uppercase font-bold block mb-0.5">
                      Stationed At Right Now
                    </span>
                    <span className="text-sm font-bold text-[#1c1917] flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[#1c1917]" />
                      {selectedPlayer.fieldingPositionCurrent}
                    </span>
                  </div>

                  {/* Live Match Performance Card */}
                  <div className="mt-4 p-4 bg-white rounded-xl border border-[#ded7cb] shadow-sm">
                    <span className="text-[10px] text-[#78716c] uppercase font-bold block mb-2">
                      Current Match Performance
                    </span>

                    {selectedPlayer.currentMatchStats.runs !== undefined && (
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-3xl font-editorial font-bold text-[#1c1917]">
                            {selectedPlayer.currentMatchStats.runs}*
                          </span>
                          <span className="text-xs text-[#78716c] ml-1.5 font-mono">
                            off {selectedPlayer.currentMatchStats.balls} balls
                          </span>
                        </div>
                        <div className="text-right text-xs font-mono text-[#78716c]">
                          {selectedPlayer.currentMatchStats.fours}x4 • {selectedPlayer.currentMatchStats.sixes}x6
                        </div>
                      </div>
                    )}

                    {selectedPlayer.currentMatchStats.overs && (
                      <div className="mt-2 pt-2 border-t border-[#ded7cb] flex items-baseline justify-between text-xs">
                        <span className="font-mono font-bold text-[#1c1917]">
                          Figures: {selectedPlayer.currentMatchStats.overs} ov • {selectedPlayer.currentMatchStats.maidens}m • {selectedPlayer.currentMatchStats.runsConceded}r • {selectedPlayer.currentMatchStats.wickets}w
                        </span>
                        {selectedPlayer.currentMatchStats.isBowlingNow && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                            BOWLING NOW
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Player Bio & Tactical Weapon */}
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-[#f7f5f0] rounded-lg border border-[#ded7cb]">
                      <span className="text-[10px] text-[#78716c] uppercase font-bold block">Career Style</span>
                      <p className="text-xs text-[#44403c] mt-0.5 leading-relaxed">
                        {selectedPlayer.profileBio}
                      </p>
                    </div>

                    <div className="p-3 bg-[#f7f5f0] rounded-lg border border-[#ded7cb]">
                      <span className="text-[10px] text-[#78716c] uppercase font-bold block">Signature Weapon</span>
                      <p className="text-xs text-[#1c1917] font-semibold mt-0.5">
                        {selectedPlayer.signatureWeapon}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'squad' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {match.playersOnField.map((player) => (
                <div
                  key={player.id}
                  onClick={() => {
                    setSelectedPlayer(player);
                    setActiveTab('field');
                  }}
                  className="p-5 rounded-xl bg-white border border-[#ded7cb] hover:border-[#1c1917] transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#ded7cb] mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#ece7de] text-[#1c1917]">
                        {player.role}
                      </span>
                      <span className="text-xs text-[#78716c]">
                        {player.fieldingPositionCurrent}
                      </span>
                    </div>

                    <h4 className="font-editorial text-lg font-bold text-[#1c1917] group-hover:underline">
                      {player.name}
                    </h4>
                    <p className="text-xs text-[#78716c] mt-1 line-clamp-2">
                      {player.profileBio}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#ded7cb] flex items-center justify-between text-xs font-semibold text-[#1c1917]">
                    <span>Inspect On Field</span>
                    <Compass className="w-3.5 h-3.5 text-[#1c1917]" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
