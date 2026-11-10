import React, { useState } from 'react';
import { ShotZone, WAGON_WHEEL_DATA } from '../data/cricketData';
import { pavilionAudio } from '../utils/audioEngine';
import { Target, Trophy, Flame } from 'lucide-react';

export const WagonWheel: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ShotZone>(WAGON_WHEEL_DATA[0]);

  // SVG dimensions
  const size = 460;
  const center = size / 2;
  const radius = size * 0.42;

  // Converts polar coordinates (angle in degrees from top, radius) to SVG Cartesian (x, y)
  const polarToCartesian = (angleInDegrees: number, r: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: center + r * Math.cos(angleInRadians),
      y: center + r * Math.sin(angleInRadians),
    };
  };

  const handleZoneClick = (zone: ShotZone) => {
    setSelectedZone(zone);
    pavilionAudio.playWillowCrack();
  };

  return (
    <div className="pavilion-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#d4af37]/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Telemetry & Shot Dispersion
          </span>
          <h3 className="font-serif-vintage text-2xl md:text-3xl text-[#f4efe6] font-bold mt-1">
            The 360° Wagon Wheel
          </h3>
          <p className="text-sm text-[#b8afa3] mt-1">
            Interactive scoring chart across all formats. Click any vector or quadrant to inspect stroke data.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto bg-[#17120e] px-4 py-2 rounded-lg border border-[#d4af37]/30">
          <Trophy className="w-5 h-5 text-[#d4af37]" />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#a89f92]">Career Highest Zone</div>
            <div className="text-sm font-bold text-[#f4efe6]">Extra Cover (1,040 Runs)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Wagon Wheel SVG Graphic */}
        <div className="lg:col-span-7 flex justify-center relative">
          <div className="relative">
            {/* Ground subtle glow */}
            <div className="absolute inset-0 bg-[#0f281e]/30 rounded-full blur-2xl pointer-events-none" />

            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="relative max-w-full h-auto drop-shadow-2xl select-none"
            >
              <defs>
                <radialGradient id="fieldGrass" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#142c1e" />
                  <stop offset="70%" stopColor="#0c1f15" />
                  <stop offset="100%" stopColor="#08140e" />
                </radialGradient>
                <linearGradient id="creaseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
              </defs>

              {/* Boundary Oval */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="url(#fieldGrass)"
                stroke="#d4af37"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="opacity-80"
              />

              {/* 30-Yard Circle Inner Ring */}
              <circle
                cx={center}
                cy={center}
                r={radius * 0.58}
                fill="none"
                stroke="#d4af37"
                strokeWidth="1"
                strokeDasharray="6 6"
                className="opacity-40"
              />

              {/* Pitch Rectangle in Center */}
              <rect
                x={center - 10}
                y={center - 32}
                width={20}
                height={64}
                rx={3}
                fill="#855f38"
                stroke="#eab308"
                strokeWidth="1"
                className="opacity-90"
              />
              {/* Stumps & Crease Lines */}
              <line
                x1={center - 8}
                y1={center - 24}
                x2={center + 8}
                y2={center - 24}
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <line
                x1={center - 8}
                y1={center + 24}
                x2={center + 8}
                y2={center + 24}
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.9"
              />

              {/* Field Rays & Shot Trajectories */}
              {WAGON_WHEEL_DATA.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                const strokeLength = radius * 0.94;
                const endPt = polarToCartesian(zone.angle, strokeLength);

                // Fan of strokes in this sector to mimic authentic wagon wheel lines
                const subOffsets = [-8, -4, 0, 4, 8];

                return (
                  <g
                    key={zone.id}
                    className="cursor-pointer transition-all duration-300 group"
                    onClick={() => handleZoneClick(zone)}
                  >
                    {/* Multi-ball trail rays */}
                    {subOffsets.map((degOffset, idx) => {
                      const subPt = polarToCartesian(zone.angle + degOffset, strokeLength * (0.8 + idx * 0.04));
                      return (
                        <line
                          key={idx}
                          x1={center}
                          y1={center}
                          x2={subPt.x}
                          y2={subPt.y}
                          stroke={isSelected ? '#fde047' : '#d4af37'}
                          strokeWidth={isSelected ? (idx === 2 ? 3 : 1.5) : 1}
                          strokeOpacity={isSelected ? 0.9 : 0.35}
                          strokeLinecap="round"
                        />
                      );
                    })}

                    {/* Zone Boundary Target Node */}
                    <circle
                      cx={endPt.x}
                      cy={endPt.y}
                      r={isSelected ? 10 : 6}
                      fill={isSelected ? '#facc15' : '#881337'}
                      stroke={isSelected ? '#ffffff' : '#d4af37'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="transition-all duration-300 drop-shadow-md"
                    />

                    {/* Percentage Pill Indicator at perimeter */}
                    <text
                      x={endPt.x}
                      y={endPt.y + (endPt.y < center ? -14 : 18)}
                      textAnchor="middle"
                      fill={isSelected ? '#fde047' : '#e7e0d3'}
                      fontSize={isSelected ? '12px' : '10px'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="system-ui"
                    >
                      {zone.percentage}%
                    </text>
                  </g>
                );
              })}

              {/* Batsman Marker at Batting Crease */}
              <circle
                cx={center}
                cy={center + 18}
                r={5}
                fill="#d4af37"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* Selected Zone Deep Intelligence Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#1b1511] p-6 rounded-xl border border-[#d4af37]/30">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                Active Zone Analysis
              </span>
            </div>

            <h4 className="font-serif-vintage text-2xl text-[#f4efe6] font-bold">
              {selectedZone.name}
            </h4>

            <div className="mt-4 p-3 bg-[#110e0c] rounded-lg border border-[#d4af37]/15">
              <div className="text-xs text-[#a89f92] uppercase tracking-wide">Signature Master Stroke</div>
              <div className="text-base font-semibold text-[#facc15] mt-0.5 flex items-center gap-2">
                <Target className="w-4 h-4 text-[#facc15]" />
                {selectedZone.favouriteShot}
              </div>
            </div>

            {/* Run tally and percentage */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-3 bg-[#241a14] rounded-lg border border-[#d4af37]/20">
                <div className="text-xs text-[#b8afa3]">Total Runs Scored</div>
                <div className="text-3xl font-cinzel font-bold text-[#f4efe6] mt-1">
                  {selectedZone.runs}
                </div>
                <div className="text-[11px] text-[#8fa89b] mt-0.5">{selectedZone.percentage}% of all career runs</div>
              </div>

              <div className="p-3 bg-[#241a14] rounded-lg border border-[#d4af37]/20">
                <div className="text-xs text-[#b8afa3]">Boundaries Struck</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-cinzel font-bold text-amber-300">
                    {selectedZone.boundaries.fours}
                  </span>
                  <span className="text-xs text-[#a89f92]">Fours</span>
                  <span className="text-xl font-cinzel font-bold text-rose-400 ml-1">
                    {selectedZone.boundaries.sixes}
                  </span>
                  <span className="text-xs text-[#a89f92]">Sixes</span>
                </div>
                <div className="text-[11px] text-amber-200/70 mt-0.5">
                  {selectedZone.boundaries.fours * 4 + selectedZone.boundaries.sixes * 6} runs in boundaries
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#d4af37]/15 flex items-center justify-between">
            <span className="text-xs text-[#8d8276] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Click field targets to toggle stroke sectors
            </span>
            <button
              onClick={() => pavilionAudio.playBoundaryCheer()}
              className="text-xs bg-[#581825] hover:bg-[#721f31] text-[#f4efe6] px-3.5 py-1.5 rounded-md border border-[#d4af37]/40 transition-colors font-medium flex items-center gap-1.5"
            >
              Sound Willow Crack
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
