import React, { useState } from 'react';
import { ICONIC_PLAYERS, PlayerProfileCard } from '../data/cricketEncyclopedia';
import { Shield, Activity, User, Search, Trophy } from 'lucide-react';

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
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
              <User className="w-4 h-4 text-red-500" />
              Sanjith's Cricket Heroes & Captain
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            The Greatest Players (And Sanjith!)
          </h1>
          <p className="text-sm text-stone-400 mt-1 max-w-2xl">
            The cricket stars Sanjith loves most: King Kohli chasing totals, Mitchell Starc bowling 150 km/h yorkers, and Captain Sanjith in Jersey #10.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search player or team..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0e0f12] border border-white/[0.1] text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div className="flex gap-1 bg-[#0e0f12] p-1 rounded-xl border border-white/[0.08] overflow-x-auto w-full sm:w-auto">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRole === r
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Player Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPlayers.map((player) => {
            const isSelected = activePlayer.id === player.id;
            const isSanjith = player.id === 'sanjith';
            const isKohli = player.id === 'kohli';
            const isStarc = player.id === 'starc';

            return (
              <div
                key={player.id}
                onClick={() => handleSelectPlayer(player)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#1b1e26] text-white border-red-500/70 shadow-xl shadow-red-950/20'
                    : 'bg-[#16181d] border-white/[0.08] hover:border-white/20 hover:bg-[#1a1c22]'
                }`}
              >
                {/* Subtle highlight bar for Sanjith / Kohli / Starc */}
                {(isSanjith || isKohli || isStarc) && (
                  <div className="absolute top-0 right-0 px-2.5 py-0.5 rounded-bl-lg bg-red-600 text-[9px] font-bold tracking-wider text-white uppercase">
                    {isSanjith ? 'Birthday Star' : isKohli ? 'GOAT Batter' : 'Starc 150k'}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-red-600 text-white' : 'bg-white/[0.06] text-stone-300'
                    }`}>
                      {player.role}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">
                      {player.country}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight ${
                    isSelected ? 'text-white' : 'text-stone-200'
                  }`}>
                    {player.name}
                  </h3>

                  <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed text-stone-400">
                    {player.signatureStyle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-400">
                    {player.masteryMetric.label}
                  </span>
                  <span className="font-bold text-white">
                    {player.masteryMetric.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Player Detail Card */}
        <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl space-y-6 bg-[#16181d] border border-white/[0.08] shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                PLAYER PROFILE
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">
                {activePlayer.name}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold text-stone-200 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08]">
                  {activePlayer.country}
                </span>
                <span className="text-xs text-stone-400">
                  {activePlayer.role}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">KEY STAT</span>
              <span className="text-xl font-bold text-red-500 font-mono">
                {activePlayer.masteryMetric.value}
              </span>
            </div>
          </div>

          {/* Signature Shot / Style */}
          <div className="p-4 rounded-2xl bg-[#0e0f12] border border-white/[0.08]">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-bold mb-1 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              What They Do Best
            </span>
            <p className="text-sm font-semibold text-white">
              "{activePlayer.signatureStyle}"
            </p>
          </div>

          {/* Why They're Great */}
          <div className="p-4 rounded-2xl bg-[#1b1e26] border border-white/[0.08]">
            <span className="text-[10px] text-red-400 uppercase tracking-wider block font-bold mb-1.5 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-red-500" />
              Why They're So Good
            </span>
            <p className="text-xs text-stone-300 leading-relaxed">
              {activePlayer.technicalBreakdown}
            </p>
          </div>

          {/* Match Winning Moment */}
          <div className="p-4 rounded-2xl bg-[#0e0f12] border border-white/[0.08]">
            <span className="text-[10px] text-amber-400 uppercase tracking-wider block font-bold mb-1.5 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              Match-Winning Impact
            </span>
            <p className="text-xs text-stone-300 leading-relaxed">
              {activePlayer.tacticalKey}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
