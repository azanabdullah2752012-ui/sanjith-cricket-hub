import React, { useState } from 'react';
import { ICONIC_PLAYERS, PlayerProfileCard } from '../data/cricketEncyclopedia';
import { Shield, Award, Activity, User, Search, Filter } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

export const PlayersPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePlayer, setActivePlayer] = useState<PlayerProfileCard>(ICONIC_PLAYERS[0]);

  const roles = ['All', 'Batsman', 'Fast Bowler', 'Spin Bowler', 'All-Rounder'];

  const filteredPlayers = ICONIC_PLAYERS.filter(p => {
    const matchesRole = selectedRole === 'All' || p.role === selectedRole;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.signatureStyle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleSelectPlayer = (player: PlayerProfileCard) => {
    setActivePlayer(player);
    pavilionAudio.playWillowCrack();
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Page Header */}
      <div className="ald-card p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#1c1917]" />
              MODERN MASTERS & TECHNICAL PROFILES
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
            International Cricket Player Dossiers
          </h1>
          <p className="text-sm text-[#78716c] mt-1 max-w-2xl">
            Technical breakdowns of world-class cricketers: biomechanics, signature masterstrokes, and tactical deployment keys.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-[#78716c] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search player or country..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#ded7cb] text-xs text-[#1c1917] focus:outline-none focus:border-[#1c1917] transition-colors"
            />
          </div>

          <div className="flex gap-1 bg-[#ece7de] p-1 rounded-xl border border-[#ded7cb] overflow-x-auto w-full sm:w-auto">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRole === r
                    ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                    : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Player Grid Catalog */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPlayers.map((player) => {
            const isSelected = activePlayer.id === player.id;
            return (
              <div
                key={player.id}
                onClick={() => handleSelectPlayer(player)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1c1917] text-[#f5f2eb] border-[#1c1917] shadow-lg scale-[1.01]'
                    : 'bg-white border-[#ded7cb] hover:border-[#1c1917] hover:bg-[#f7f5f0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#ded7cb]/50 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-[#f5f2eb]' : 'bg-[#ece7de] text-[#1c1917]'
                    }`}>
                      {player.role}
                    </span>
                    <span className={`text-xs font-semibold ${
                      isSelected ? 'text-[#ded7cb]' : 'text-[#78716c]'
                    }`}>
                      {player.country}
                    </span>
                  </div>

                  <h3 className={`font-editorial text-xl font-bold tracking-tight ${
                    isSelected ? 'text-[#f5f2eb]' : 'text-[#1c1917]'
                  }`}>
                    {player.name}
                  </h3>

                  <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                    isSelected ? 'text-[#ded7cb]' : 'text-[#78716c]'
                  }`}>
                    {player.signatureStyle}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t flex items-center justify-between text-xs ${
                  isSelected ? 'border-white/15' : 'border-[#ded7cb]'
                }`}>
                  <span className={`font-mono text-[10px] uppercase ${isSelected ? 'text-[#ded7cb]' : 'text-[#78716c]'}`}>
                    {player.masteryMetric.label}
                  </span>
                  <span className={`font-mono font-bold ${isSelected ? 'text-[#f5f2eb]' : 'text-[#1c1917]'}`}>
                    {player.masteryMetric.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Player Masterclass Profile */}
        <div className="lg:col-span-5 ald-card p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#ded7cb]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716c]">
                TECHNICAL DOSSIER
              </span>
              <h2 className="font-editorial text-3xl font-bold text-[#1c1917]">
                {activePlayer.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-[#1c1917] px-2.5 py-0.5 rounded bg-[#ece7de]">
                  {activePlayer.country}
                </span>
                <span className="text-xs text-[#78716c] font-medium">
                  {activePlayer.role}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#78716c] uppercase font-mono block">BENCHMARK</span>
              <span className="font-editorial text-2xl font-bold text-[#1c1917]">
                {activePlayer.masteryMetric.value}
              </span>
            </div>
          </div>

          {/* Signature Style Quote */}
          <div className="p-4 rounded-xl bg-[#f7f5f0] border border-[#ded7cb]">
            <span className="text-[10px] text-[#78716c] uppercase tracking-wider block font-bold mb-1">
              Signature Hallmark & Craft
            </span>
            <p className="font-editorial text-base font-bold text-[#1c1917]">
              "{activePlayer.signatureStyle}"
            </p>
          </div>

          {/* Biomechanical Breakdown */}
          <div className="p-4 rounded-xl bg-white border border-[#ded7cb] shadow-sm">
            <span className="text-[10px] text-[#78716c] uppercase tracking-wider block font-bold mb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#1c1917]" />
              Biomechanical & Technical Mechanics
            </span>
            <p className="text-xs md:text-sm text-[#44403c] leading-relaxed">
              {activePlayer.technicalBreakdown}
            </p>
          </div>

          {/* Tactical Exploitation Key */}
          <div className="p-4 rounded-xl bg-[#f7f5f0] border border-[#ded7cb]">
            <span className="text-[10px] text-[#78716c] uppercase tracking-wider block font-bold mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#1c1917]" />
              Tactical Execution & Field Threat
            </span>
            <p className="text-xs md:text-sm text-[#1c1917] leading-relaxed">
              {activePlayer.tacticalKey}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
