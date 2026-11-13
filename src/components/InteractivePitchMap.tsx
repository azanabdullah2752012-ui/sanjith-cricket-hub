import React, { useState } from 'react';
import { Crosshair } from 'lucide-react';

export interface BallTrackPoint {
  id: string;
  over: string;
  ball: number;
  bowler: string;
  batter: string;
  speed: string; // e.g. "142.4 km/h"
  pitchZone: 'yorker' | 'full' | 'good' | 'short';
  line: 'outside-off' | 'off-stump' | 'middle' | 'leg-stump' | 'down-leg';
  x: number; // 0 to 100 on pitch width (stump corridor)
  y: number; // 0 (crease) to 100 (bowler end)
  outcome: 'wicket' | 'dot' | 'four' | 'six' | 'single' | 'edge';
  description: string;
}

export const SAMPLE_BALL_TRACKS: BallTrackPoint[] = [
  {
    id: 'b1',
    over: '44.1',
    ball: 1,
    bowler: 'Shaheen Afridi',
    batter: 'Dhananjaya de Silva',
    speed: '141.8 km/h',
    pitchZone: 'good',
    line: 'outside-off',
    x: 62,
    y: 38,
    outcome: 'dot',
    description: '141.8 km/h, swings away late past the outside edge. Good leave!'
  },
  {
    id: 'b2',
    over: '44.2',
    ball: 2,
    bowler: 'Shaheen Afridi',
    batter: 'Dhananjaya de Silva',
    speed: '143.2 km/h',
    pitchZone: 'full',
    line: 'off-stump',
    x: 52,
    y: 22,
    outcome: 'four',
    description: '143.2 km/h, full on off-stump, drilled through extra cover with pure timing!'
  },
  {
    id: 'b3',
    over: '44.3',
    ball: 3,
    bowler: 'Shaheen Afridi',
    batter: 'Dhananjaya de Silva',
    speed: '138.6 km/h',
    pitchZone: 'short',
    line: 'middle',
    x: 48,
    y: 64,
    outcome: 'single',
    description: '138.6 km/h bouncer, pulled down safely to deep square leg for a run.'
  },
  {
    id: 'b4',
    over: '44.4',
    ball: 4,
    bowler: 'Shaheen Afridi',
    batter: 'Kusal Mendis',
    speed: '144.5 km/h',
    pitchZone: 'yorker',
    line: 'middle',
    x: 50,
    y: 9,
    outcome: 'wicket',
    description: '144.5 km/h, TOE-CRUSHER! Fast inswinging yorker crashes into middle stump!'
  },
  {
    id: 'b5',
    over: '44.5',
    ball: 5,
    bowler: 'Shaheen Afridi',
    batter: 'Angelo Mathews',
    speed: '139.0 km/h',
    pitchZone: 'good',
    line: 'outside-off',
    x: 68,
    y: 42,
    outcome: 'edge',
    description: '139.0 km/h on 4th stump! Thick outside edge falls just short of 2nd slip.'
  },
  {
    id: 'b6',
    over: '44.6',
    ball: 6,
    bowler: 'Shaheen Afridi',
    batter: 'Angelo Mathews',
    speed: '140.2 km/h',
    pitchZone: 'full',
    line: 'leg-stump',
    x: 36,
    y: 20,
    outcome: 'dot',
    description: '140.2 km/h, driven firmly straight to mid-on, no run taken.'
  }
];

export const InteractivePitchMap: React.FC<{ activeBowler?: string }> = ({ activeBowler = 'Shaheen Afridi' }) => {
  const [selectedBall, setSelectedBall] = useState<BallTrackPoint>(SAMPLE_BALL_TRACKS[3]);
  const [filterLength, setFilterLength] = useState<'all' | 'yorker' | 'full' | 'good' | 'short'>('all');

  const filteredBalls = filterLength === 'all'
    ? SAMPLE_BALL_TRACKS
    : SAMPLE_BALL_TRACKS.filter(b => b.pitchZone === filterLength);

  const handleSelectBall = (b: BallTrackPoint) => {
    setSelectedBall(b);
  };

  const getOutcomeColor = (outcome: BallTrackPoint['outcome']) => {
    switch (outcome) {
      case 'wicket':
        return 'bg-red-600 border-red-400 text-white shadow-red-950/50';
      case 'four':
        return 'bg-amber-500 border-amber-300 text-slate-950';
      case 'six':
        return 'bg-emerald-600 border-emerald-400 text-white';
      case 'edge':
        return 'bg-purple-600 border-purple-400 text-white';
      case 'single':
        return 'bg-slate-600 border-slate-400 text-white';
      default:
        return 'bg-slate-800 border-slate-600 text-white';
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-lg space-y-6">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase font-bold text-red-400 tracking-wider flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-red-500" />
              Pitch Map & Landing Spot
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Pitch Map for {activeBowler}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Click any numbered ball on the 22-yard pitch strip to see speed and ball details.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-[#0e0f12] p-1 rounded-xl border border-white/[0.08] text-xs font-semibold">
          {(['all', 'yorker', 'full', 'good', 'short'] as const).map((len) => (
            <button
              key={len}
              onClick={() => setFilterLength(len)}
              className={`px-3 py-1 rounded-lg uppercase text-[11px] transition-all cursor-pointer ${
                filterLength === len
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Pitch Strip and Telemetry Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Turf Pitch Strip */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-64 h-96 bg-[#231f18] border-2 border-slate-600/70 rounded-lg shadow-inner overflow-hidden select-none p-3 flex flex-col justify-between">
            {/* Short Pitch */}
            <div className="absolute top-0 left-0 right-0 h-[35%] bg-amber-500/5 border-b border-dashed border-slate-700 flex items-center justify-start pl-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                SHORT (8-10m)
              </span>
            </div>

            {/* Good Length */}
            <div className="absolute top-[35%] left-0 right-0 h-[30%] bg-emerald-500/5 border-b border-dashed border-slate-700 flex items-center justify-start pl-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                GOOD LENGTH (6-8m)
              </span>
            </div>

            {/* Full Length */}
            <div className="absolute top-[65%] left-0 right-0 h-[22%] bg-blue-500/5 border-b border-dashed border-slate-700 flex items-center justify-start pl-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                FULL (2-4m)
              </span>
            </div>

            {/* Yorker */}
            <div className="absolute bottom-0 left-0 right-0 h-[13%] bg-red-500/10 flex items-center justify-start pl-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-red-400 font-bold">
                YORKER (0-2m)
              </span>
            </div>

            {/* Stumps */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              <div className="w-1.5 h-4 bg-amber-600 rounded-t-sm shadow-sm" />
              <div className="w-1.5 h-4 bg-amber-600 rounded-t-sm shadow-sm" />
              <div className="w-1.5 h-4 bg-amber-600 rounded-t-sm shadow-sm" />
              <div className="absolute -top-0.5 left-0 right-0 h-0.5 bg-amber-400" />
            </div>

            {/* Popping Crease */}
            <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-white/70 shadow-sm" />
            <div className="absolute bottom-7 right-2 text-[8px] font-mono text-slate-400">CREASE</div>

            {/* Ball Markers */}
            {filteredBalls.map((b) => {
              const isSelected = selectedBall.id === b.id;
              const bottomPercent = (b.y / 100) * 88 + 4;
              const leftPercent = b.x;

              return (
                <button
                  key={b.id}
                  onClick={() => handleSelectBall(b)}
                  style={{
                    bottom: `${bottomPercent}%`,
                    left: `${leftPercent}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                  className={`absolute z-20 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-all cursor-pointer shadow-md ${
                    getOutcomeColor(b.outcome)
                  } ${isSelected ? 'scale-125 ring-4 ring-white/30 z-30' : 'hover:scale-115'}`}
                  title={`${b.over} • ${b.speed} • ${b.outcome}`}
                >
                  {b.ball}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Wicket
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Four
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Edge
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-500" /> Dot
            </span>
          </div>
        </div>

        {/* Right: Selected Ball Info */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-[#0e0f12] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-mono text-sm font-bold flex items-center justify-center">
                  #{selectedBall.ball}
                </span>
                <div>
                  <span className="text-sm font-bold text-white block">
                    Ball {selectedBall.over}
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedBall.bowler} to {selectedBall.batter}
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-white/[0.08] text-red-400 border border-white/[0.08]">
                {selectedBall.speed}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#16181d] p-3 rounded-xl border border-white/[0.08]">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Length</span>
                <span className="text-white font-bold text-sm uppercase mt-0.5 block">{selectedBall.pitchZone}</span>
              </div>
              <div className="bg-[#16181d] p-3 rounded-xl border border-white/[0.08]">
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Line</span>
                <span className="text-white font-bold text-sm uppercase mt-0.5 block">{selectedBall.line.replace('-', ' ')}</span>
              </div>
            </div>

            {/* Commentary */}
            <div className="bg-[#16181d] p-4 rounded-xl border border-white/[0.08]">
              <span className="text-[10px] uppercase text-red-400 font-bold block mb-1">
                Ball Commentary
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                "{selectedBall.description}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
