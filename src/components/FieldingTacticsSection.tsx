import React, { useState } from 'react';
import { FIELDING_POSITIONS, PRACTICAL_CRICKET_RULES, FieldingPosition } from '../data/cricketMasteryData';
import { Target, Compass, BookOpen, ShieldCheck } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

export const FieldingTacticsSection: React.FC = () => {
  const [selectedPos, setSelectedPos] = useState<FieldingPosition>(FIELDING_POSITIONS[0]);

  const handleSelect = (pos: FieldingPosition) => {
    setSelectedPos(pos);
    pavilionAudio.playWillowCrack();
  };

  return (
    <div className="ald-card p-6 md:p-8 rounded-lg relative overflow-hidden">
      {/* Header */}
      <div className="pb-6 mb-6 border-b border-[#ded7cb]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
          <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#1c1917]" />
            TACTICAL BOARD • CAPTAINCY DISCIPLINE
          </span>
        </div>
        <h2 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
          Fielding Position Map & Physics of Cricket
        </h2>
        <p className="text-xs text-[#78716c] mt-0.5">
          Interactive field setting diagram: click positions to view tactical assignments and dismissal theory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Field Oval Diagram */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[440px] aspect-square rounded-full border-2 border-dashed border-[#1c1917] bg-[#f7f5f0] p-4 flex items-center justify-center shadow-inner">
            {/* 30-Yard Inner Circle */}
            <div className="absolute inset-16 rounded-full border border-dashed border-[#ded7cb] pointer-events-none" />

            {/* Pitch Strip in Center */}
            <div className="absolute w-8 h-28 bg-[#ece7de] border border-[#ded7cb] rounded-sm flex flex-col justify-between items-center py-2">
              <div className="w-4 h-1 bg-[#1c1917]" /> {/* Bowling crease */}
              <div className="text-[8px] font-mono text-[#78716c] uppercase rotate-90">22 YARDS</div>
              <div className="w-4 h-1 bg-[#1c1917]" /> {/* Batting crease */}
            </div>

            {/* Field Positions Nodes */}
            {FIELDING_POSITIONS.map((pos) => {
              const isSelected = selectedPos.id === pos.id;
              return (
                <button
                  key={pos.id}
                  onClick={() => handleSelect(pos)}
                  style={{
                    left: `${pos.coordinates.x}%`,
                    top: `${pos.coordinates.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-sm ${
                    isSelected
                      ? 'w-7 h-7 bg-[#1c1917] text-[#f5f2eb] ring-4 ring-[#ded7cb] scale-110'
                      : 'w-5 h-5 bg-white border border-[#1c1917] text-[#1c1917] hover:bg-[#ece7de]'
                  }`}
                  title={pos.name}
                >
                  <span className="text-[9px] font-bold font-mono">
                    {pos.name.charAt(0)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Position Details */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#f7f5f0] p-6 rounded-xl border border-[#ded7cb] h-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-[#78716c] font-bold">
                ACTIVE POSITION
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-[#1c1917] border border-[#ded7cb]">
                {selectedPos.zone}
              </span>
            </div>

            <h3 className="font-editorial text-2xl font-bold text-[#1c1917]">
              {selectedPos.name}
            </h3>

            <div className="mt-4 p-4 rounded-xl bg-white border border-[#ded7cb]">
              <span className="text-[10px] text-[#78716c] uppercase tracking-wider block font-semibold">
                Strategic Purpose
              </span>
              <p className="text-sm text-[#1c1917] mt-1 leading-relaxed">
                {selectedPos.purpose}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#ded7cb]">
            <span className="text-[11px] text-[#78716c] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#1c1917]" /> Click nodes on the field to reposition focus
            </span>
          </div>
        </div>
      </div>

      {/* Real Cricket Physics & Rules Matrix */}
      <div className="mt-10 pt-6 border-t border-[#ded7cb]">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-[#1c1917]" />
          <h3 className="font-editorial text-lg font-bold text-[#1c1917]">
            Core Cricket Physics & Technical Rules
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRACTICAL_CRICKET_RULES.map((r) => (
            <div key={r.id} className="p-5 rounded-xl bg-[#f7f5f0] border border-[#ded7cb]">
              <span className="text-[10px] font-bold text-[#78716c] uppercase tracking-wider block mb-1">
                {r.topic}
              </span>
              <h4 className="font-editorial text-sm font-bold text-[#1c1917] mb-2">
                {r.title}
              </h4>
              <p className="text-xs text-[#44403c] leading-relaxed mb-3">
                {r.summary}
              </p>
              <div className="p-2.5 rounded bg-white border border-[#ded7cb] text-[11px] text-[#1c1917] leading-snug flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1c1917] shrink-0 mt-0.5" />
                <span>{r.practicalInsight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
