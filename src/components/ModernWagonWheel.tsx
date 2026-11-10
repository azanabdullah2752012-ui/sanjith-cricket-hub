import React, { useState } from 'react';
import { ShotZone, WAGON_WHEEL_DATA } from '../data/cricketData';
import { pavilionAudio } from '../utils/audioEngine';
import { Target, Activity, ChevronRight } from 'lucide-react';

export const ModernWagonWheel: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ShotZone>(WAGON_WHEEL_DATA[0]);

  const size = 440;
  const center = size / 2;
  const radius = size * 0.42;

  const polarToCartesian = (angleInDegrees: number, r: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: center + r * Math.cos(angleInRadians),
      y: center + r * Math.sin(angleInRadians),
    };
  };

  const handleSelect = (zone: ShotZone) => {
    setSelectedZone(zone);
    pavilionAudio.playWillowCrack();
  };

  return (
    <div className="ald-card p-6 md:p-10 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#ded7cb] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold">
              FIELD DISPERSION • 360° COVERAGE
            </span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
            The Pitch & Wagon Wheel
          </h3>
          <p className="text-sm text-[#78716c] mt-1">
            Click any field sector to audit stroke analytics, boundary counts, and scoring density.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#ece7de] px-4 py-2 rounded-xl border border-[#ded7cb]">
          <Activity className="w-4 h-4 text-[#1c1917]" />
          <div className="text-xs">
            <span className="text-[#78716c] uppercase block text-[10px]">Primary Scoring Arc</span>
            <span className="text-[#1c1917] font-bold">Extra Cover • 1,040 Runs</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Field Graphic */}
        <div className="lg:col-span-7 flex justify-center relative">
          <div className="relative">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              className="relative max-w-full h-auto drop-shadow-sm select-none"
            >
              {/* Boundary Oval in soft oat sand */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="#f7f5f0"
                stroke="#1c1917"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* 30-yard ring */}
              <circle
                cx={center}
                cy={center}
                r={radius * 0.58}
                fill="none"
                stroke="#ded7cb"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />

              {/* Central Pitch Strip */}
              <rect
                x={center - 9}
                y={center - 32}
                width={18}
                height={64}
                rx={2}
                fill="#ece7de"
                stroke="#ded7cb"
                strokeWidth="1"
              />
              <line x1={center - 7} y1={center - 24} x2={center + 7} y2={center - 24} stroke="#78716c" strokeWidth="1" />
              <line x1={center - 7} y1={center + 24} x2={center + 7} y2={center + 24} stroke="#78716c" strokeWidth="1" />

              {/* Shot Vectors */}
              {WAGON_WHEEL_DATA.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                const strokeLength = radius * 0.94;
                const endPt = polarToCartesian(zone.angle, strokeLength);

                return (
                  <g
                    key={zone.id}
                    className="cursor-pointer transition-all duration-300 group"
                    onClick={() => handleSelect(zone)}
                  >
                    {/* Multi-ray cluster */}
                    {[-6, -3, 0, 3, 6].map((offset, idx) => {
                      const pt = polarToCartesian(zone.angle + offset, strokeLength * (0.8 + idx * 0.04));
                      return (
                        <line
                          key={idx}
                          x1={center}
                          y1={center}
                          x2={pt.x}
                          y2={pt.y}
                          stroke={isSelected ? '#1c1917' : '#a8a29e'}
                          strokeWidth={isSelected ? (idx === 2 ? 3 : 1.5) : 1}
                          strokeOpacity={isSelected ? 1 : 0.3}
                          strokeLinecap="round"
                        />
                      );
                    })}

                    {/* Target Node at boundary edge */}
                    <circle
                      cx={endPt.x}
                      cy={endPt.y}
                      r={isSelected ? 8 : 5}
                      fill={isSelected ? '#1c1917' : '#ffffff'}
                      stroke={isSelected ? '#1c1917' : '#a8a29e'}
                      strokeWidth={isSelected ? 2 : 1.5}
                      className="transition-all duration-300"
                    />

                    {/* Percentage Pill */}
                    <text
                      x={endPt.x}
                      y={endPt.y + (endPt.y < center ? -12 : 16)}
                      textAnchor="middle"
                      fill={isSelected ? '#1c1917' : '#78716c'}
                      fontSize={isSelected ? '12px' : '10px'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="Space Grotesk"
                    >
                      {zone.percentage}%
                    </text>
                  </g>
                );
              })}

              {/* Batsman Marker */}
              <circle cx={center} cy={center + 18} r={4.5} fill="#1c1917" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Selected Vector Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#f7f5f0] p-6 rounded-xl border border-[#ded7cb]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-[#78716c] font-bold">
                ISOLATED SECTOR
              </span>
              <span className="font-mono text-xs text-[#78716c]">
                ANG: {selectedZone.angle}°
              </span>
            </div>

            <h4 className="font-editorial text-2xl text-[#1c1917] font-bold tracking-tight">
              {selectedZone.name}
            </h4>

            <div className="mt-4 p-3.5 bg-white rounded-xl border border-[#ded7cb] flex items-center gap-3">
              <Target className="w-5 h-5 text-[#1c1917] shrink-0" />
              <div>
                <div className="text-[10px] text-[#78716c] uppercase font-medium">Signature Stroke</div>
                <div className="text-sm font-bold text-[#1c1917]">{selectedZone.favouriteShot}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-white rounded-xl border border-[#ded7cb]">
                <span className="text-[11px] text-[#78716c] uppercase font-medium">Runs Logged</span>
                <div className="font-editorial text-3xl font-bold text-[#1c1917] mt-1">
                  {selectedZone.runs}
                </div>
                <div className="text-[10px] text-[#78716c] mt-1">
                  {selectedZone.percentage}% of career tally
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#ded7cb]">
                <span className="text-[11px] text-[#78716c] uppercase font-medium">Boundary Count</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-editorial text-2xl font-bold text-[#1c1917]">
                    {selectedZone.boundaries.fours}
                  </span>
                  <span className="text-xs text-[#78716c]">4s</span>
                  <span className="font-editorial text-2xl font-bold text-[#78716c] ml-2">
                    {selectedZone.boundaries.sixes}
                  </span>
                  <span className="text-xs text-[#78716c]">6s</span>
                </div>
                <div className="text-[10px] text-[#78716c] mt-1">
                  {selectedZone.boundaries.fours * 4 + selectedZone.boundaries.sixes * 6} runs in ropes
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#ded7cb] flex items-center justify-between">
            <span className="text-xs text-[#78716c]">
              Click any point to shift focus
            </span>
            <button
              onClick={() => pavilionAudio.playWillowCrack()}
              className="px-3.5 py-1.5 rounded-lg bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Audit Stroke</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
