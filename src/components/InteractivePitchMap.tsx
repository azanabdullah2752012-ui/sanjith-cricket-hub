import React, { useState } from 'react';
import { Target, Activity, Shield, Crosshair, HelpCircle, Layers } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

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
    description: '141.8 km/h, seams away late past outside edge, beaten all ends up!'
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
    description: '138.6 km/h, well-directed bumper, pulled down safely to deep square leg.'
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
    description: '144.5 km/h, TOE-CRUSHER! Inswinging yorker rattles middle and leg base!'
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
    description: '139.0 km/h, squared him up on 4th stump! Thick outside edge falls just short of 2nd slip.'
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
    pavilionAudio.playWillowCrack();
  };

  const getOutcomeColor = (outcome: BallTrackPoint['outcome']) => {
    switch (outcome) {
      case 'wicket':
        return 'bg-red-600 border-red-900 text-white shadow-red-300';
      case 'four':
        return 'bg-amber-500 border-amber-800 text-white shadow-amber-200';
      case 'six':
        return 'bg-emerald-600 border-emerald-900 text-white shadow-emerald-200';
      case 'edge':
        return 'bg-purple-600 border-purple-900 text-white shadow-purple-200';
      case 'single':
        return 'bg-[#78716c] border-[#44403c] text-white';
      default:
        return 'bg-[#1c1917] border-[#44403c] text-white';
    }
  };

  return (
    <div className="ald-card p-6 md:p-8 rounded-3xl bg-white border border-[#ded7cb] space-y-6">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#ded7cb] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono text-xs uppercase font-bold text-[#78716c] tracking-widest flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-[#1c1917]" />
              HAWKEYE 3D PITCH CORRIDOR • LIVE LENGTH DISPERSION
            </span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#1c1917] tracking-tight">
            Pitch Map & Length Telemetry
          </h3>
          <p className="text-xs text-[#78716c]">
            Real-time landing point analysis for {activeBowler}. Click any ball bounce point to review speed and radar trajectory.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-[#ece7de] p-1 rounded-xl border border-[#ded7cb] text-xs font-semibold">
          {(['all', 'yorker', 'full', 'good', 'short'] as const).map((len) => (
            <button
              key={len}
              onClick={() => setFilterLength(len)}
              className={`px-3 py-1 rounded-lg uppercase text-[11px] font-mono transition-all cursor-pointer ${
                filterLength === len
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
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
          <div className="relative w-64 h-96 bg-[#ece7de] border-2 border-[#1c1917] rounded-lg shadow-inner overflow-hidden select-none p-3 flex flex-col justify-between">
            {/* Length Zones (Top is Bowler End, Bottom is Batter Crease) */}
            
            {/* Zone 4: Short Pitch (6-10m) */}
            <div className="absolute top-0 left-0 right-0 h-[35%] bg-amber-900/5 border-b border-dashed border-[#ded7cb] flex items-center justify-start pl-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#78716c] font-bold">
                SHORT (8-10m)
              </span>
            </div>

            {/* Zone 3: Good Length (4-6m) */}
            <div className="absolute top-[35%] left-0 right-0 h-[30%] bg-emerald-900/5 border-b border-dashed border-[#ded7cb] flex items-center justify-start pl-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#78716c] font-bold">
                GOOD LENGTH (6-8m)
              </span>
            </div>

            {/* Zone 2: Full Length (2-4m) */}
            <div className="absolute top-[65%] left-0 right-0 h-[22%] bg-blue-900/5 border-b border-dashed border-[#ded7cb] flex items-center justify-start pl-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#78716c] font-bold">
                FULL (2-4m)
              </span>
            </div>

            {/* Zone 1: Yorker / Crease (0-2m) */}
            <div className="absolute bottom-0 left-0 right-0 h-[13%] bg-red-900/10 flex items-center justify-start pl-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-red-900 font-bold">
                YORKER / BLOCKHOLE
              </span>
            </div>

            {/* Stumps at Batter Crease (Bottom) */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
              <div className="w-1.5 h-4 bg-[#b45309] rounded-t-sm shadow-sm" />
              <div className="w-1.5 h-4 bg-[#b45309] rounded-t-sm shadow-sm" />
              <div className="w-1.5 h-4 bg-[#b45309] rounded-t-sm shadow-sm" />
              {/* Bails */}
              <div className="absolute -top-0.5 left-0 right-0 h-0.5 bg-[#d97706]" />
            </div>

            {/* Popping Crease Line */}
            <div className="absolute bottom-6 left-0 right-0 h-0.5 bg-white shadow-sm" />
            <div className="absolute bottom-7 right-2 text-[8px] font-mono text-[#78716c]">POPPING CREASE</div>

            {/* Ball Markers */}
            {filteredBalls.map((b) => {
              const isSelected = selectedBall.id === b.id;
              // Map coordinates: y: 0 is popping crease (bottom), y: 100 is bowler (top)
              // We invert y so 0 is bottom
              const bottomPercent = (b.y / 100) * 88 + 4; // stay within strip
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
                  className={`absolute z-20 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border-2 transition-all cursor-pointer shadow-md ${
                    getOutcomeColor(b.outcome)
                  } ${isSelected ? 'scale-130 ring-4 ring-[#1c1917]/20 z-30' : 'hover:scale-115'}`}
                  title={`${b.over} • ${b.speed} • ${b.outcome}`}
                >
                  {b.ball}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 mt-3 text-[10px] font-mono text-[#78716c]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Wicket
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Boundary
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Edge
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1c1917]" /> Dot
            </span>
          </div>
        </div>

        {/* Right: Selected Ball Detailed Telemetry */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-[#f7f5f0] border border-[#ded7cb] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ded7cb]">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#1c1917] text-[#f5f2eb] font-mono text-xs font-bold flex items-center justify-center">
                  #{selectedBall.ball}
                </span>
                <div>
                  <span className="text-xs font-mono font-bold text-[#1c1917] block">
                    BALL {selectedBall.over}
                  </span>
                  <span className="text-[11px] text-[#78716c]">
                    {selectedBall.bowler} to {selectedBall.batter}
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded font-mono text-xs font-bold uppercase bg-white border border-[#ded7cb] text-[#1c1917]">
                {selectedBall.speed}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-white p-3 rounded-xl border border-[#ded7cb]">
                <span className="text-[#78716c] text-[10px] block uppercase">PITCH LENGTH</span>
                <span className="text-[#1c1917] font-bold text-sm uppercase">{selectedBall.pitchZone}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#ded7cb]">
                <span className="text-[#78716c] text-[10px] block uppercase">STUMP LINE</span>
                <span className="text-[#1c1917] font-bold text-sm uppercase">{selectedBall.line.replace('-', ' ')}</span>
              </div>
            </div>

            {/* Radar Commentary */}
            <div className="bg-white p-4 rounded-xl border border-[#ded7cb]">
              <span className="text-[10px] font-mono uppercase text-[#78716c] font-bold block mb-1">
                RADAR & TRAJECTORY ANALYSIS
              </span>
              <p className="text-xs text-[#1c1917] leading-relaxed">
                "{selectedBall.description}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
