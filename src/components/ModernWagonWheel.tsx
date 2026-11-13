import React, { useState } from 'react';
import { ShotZone, WAGON_WHEEL_DATA } from '../data/cricketData';
import { Target, Activity } from 'lucide-react';

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
  };

  return (
    <div className="p-6 md:p-10 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-lg relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold">
              360° SCORING MAP
            </span>
          </div>
          <h3 className="text-xl md:text-2xl text-white font-bold tracking-tight">
            The 360° Wagon Wheel
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Click any field sector to see where the runs were scored and which shots were played.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#0e0f12] px-4 py-2 rounded-xl border border-white/[0.08]">
          <Activity className="w-4 h-4 text-amber-400" />
          <div className="text-xs">
            <span className="text-slate-400 uppercase block text-[10px] font-bold">Top Scoring Area</span>
            <span className="text-white font-bold">Extra Cover • 1,040 Runs</span>
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
              {/* Boundary Oval in dark stadium grass */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="#0d1b12"
                stroke="#10b981"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* 30-yard ring */}
              <circle
                cx={center}
                cy={center}
                r={radius * 0.58}
                fill="none"
                stroke="#10b981"
                strokeOpacity="0.2"
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
                fill="#2a261f"
                stroke="#3f3b33"
                strokeWidth="1"
              />
              <line x1={center - 7} y1={center - 24} x2={center + 7} y2={center - 24} stroke="#a8a29e" strokeWidth="1" />
              <line x1={center - 7} y1={center + 24} x2={center + 7} y2={center + 24} stroke="#a8a29e" strokeWidth="1" />

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
                          stroke={isSelected ? '#ef4444' : '#64748b'}
                          strokeWidth={isSelected ? (idx === 2 ? 3 : 1.5) : 1}
                          strokeOpacity={isSelected ? 1 : 0.4}
                          strokeLinecap="round"
                        />
                      );
                    })}

                    {/* Target Node at boundary edge */}
                    <circle
                      cx={endPt.x}
                      cy={endPt.y}
                      r={isSelected ? 8 : 5}
                      fill={isSelected ? '#ef4444' : '#1e293b'}
                      stroke={isSelected ? '#ffffff' : '#64748b'}
                      strokeWidth={isSelected ? 2 : 1.5}
                      className="transition-all duration-300"
                    />

                    {/* Percentage Pill */}
                    <text
                      x={endPt.x}
                      y={endPt.y + (endPt.y < center ? -12 : 16)}
                      textAnchor="middle"
                      fill={isSelected ? '#ef4444' : '#94a3b8'}
                      fontSize={isSelected ? '12px' : '10px'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="sans-serif"
                    >
                      {zone.percentage}%
                    </text>
                  </g>
                );
              })}

              {/* Batsman Marker */}
              <circle cx={center} cy={center + 18} r={4.5} fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        {/* Selected Vector Breakdown */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#0e0f12] p-6 rounded-2xl border border-white/[0.08]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-red-400 font-bold">
                CHOSEN SECTOR
              </span>
              <span className="font-mono text-xs text-slate-400">
                {selectedZone.angle}° on the field
              </span>
            </div>

            <h4 className="text-2xl text-white font-bold tracking-tight">
              {selectedZone.name}
            </h4>

            <div className="mt-4 p-3.5 bg-[#16181d] rounded-xl border border-white/[0.08] flex items-center gap-3">
              <Target className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Best Shot Here</div>
                <div className="text-sm font-bold text-white">{selectedZone.favouriteShot}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-[#16181d] rounded-xl border border-white/[0.08]">
                <span className="text-[11px] text-slate-400 uppercase font-bold">Total Runs</span>
                <div className="text-3xl font-bold text-white font-mono mt-1">
                  {selectedZone.runs}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {selectedZone.percentage}% of all runs
                </div>
              </div>

              <div className="p-4 bg-[#16181d] rounded-xl border border-white/[0.08]">
                <span className="text-[11px] text-slate-400 uppercase font-bold">Boundaries Hit</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-white font-mono">
                    {selectedZone.boundaries.fours}
                  </span>
                  <span className="text-xs text-slate-400">fours</span>
                  <span className="text-2xl font-bold text-red-400 font-mono ml-2">
                    {selectedZone.boundaries.sixes}
                  </span>
                  <span className="text-xs text-slate-400">sixes</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {selectedZone.boundaries.fours * 4 + selectedZone.boundaries.sixes * 6} runs in boundaries
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span>Tap any dot around the rope to inspect</span>
            <span className="text-red-400 font-medium">360° Coverage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
