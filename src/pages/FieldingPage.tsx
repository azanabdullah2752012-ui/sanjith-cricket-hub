import React, { useState, useRef, useEffect } from 'react';
import { TACTICAL_MASTERPLANS, TacticalMasterplan } from '../data/tacticsMasterplanData';
import { ALL_FIELDING_POSITIONS } from '../data/cricketEncyclopedia';
import { Compass, Target, Shield, Users, Flame, RotateCcw, Move, Sparkles, Check, BookmarkPlus, HelpCircle } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

interface EditableFielder {
  id: string;
  name: string;
  role: string;
  coordinates: { x: number; y: number }; // percentage 0-100
  isKeyCatcher?: boolean;
}

export const FieldingPage: React.FC = () => {
  const [activePlan, setActivePlan] = useState<TacticalMasterplan>(TACTICAL_MASTERPLANS[0]);
  const [fielders, setFielders] = useState<EditableFielder[]>(TACTICAL_MASTERPLANS[0].positionsOnField);
  const [selectedFielderId, setSelectedFielderId] = useState<string>(TACTICAL_MASTERPLANS[0].positionsOnField[1].id);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [savedCustomPlans, setSavedCustomPlans] = useState<Array<{ name: string; fielders: EditableFielder[] }>>([
    {
      name: "Sanjith's Death Trap (7-2 Off-Side Ring)",
      fielders: [
        { id: 'wk', name: 'Wicket-Keeper', role: 'Standing up up to stumps', coordinates: { x: 50, y: 78 } },
        { id: 'sl1', name: 'Fly Slip', role: 'Deep fine edge snicker', coordinates: { x: 65, y: 76 }, isKeyCatcher: true },
        { id: 'pt', name: 'Backward Point', role: 'Direct hit patrol', coordinates: { x: 82, y: 56 }, isKeyCatcher: true },
        { id: 'dcov', name: 'Deep Cover', role: 'Boundary sweeper for wide yorker', coordinates: { x: 88, y: 38 } },
        { id: 'cov', name: 'Extra Cover', role: 'Diving ring catcher', coordinates: { x: 74, y: 44 } },
        { id: 'pt2', name: 'Deep Backward Point', role: 'Cut shot security', coordinates: { x: 85, y: 68 } },
        { id: 'moff', name: 'Long-Off', role: 'Straight loft boundary check', coordinates: { x: 62, y: 22 } },
        { id: 'mon', name: 'Long-On', role: 'V-arc sweeper', coordinates: { x: 38, y: 22 } },
        { id: 'midw', name: 'Mid-Wicket', role: 'Inner ring clamp', coordinates: { x: 32, y: 46 } },
        { id: 'fl', name: 'Short Fine Leg', role: 'Ramp scoop stopper', coordinates: { x: 32, y: 74 } },
        { id: 'bowl', name: 'Bowler', role: 'Spearing 5th stump yorkers', coordinates: { x: 50, y: 28 } }
      ]
    }
  ]);
  const [customPlanName, setCustomPlanName] = useState("Sanjith's Custom Ring");

  // Dragging state
  const fieldRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Sync fielders when user selects a preset
  const handleSelectPlan = (plan: TacticalMasterplan) => {
    setActivePlan(plan);
    setFielders(plan.positionsOnField);
    setSelectedFielderId(plan.positionsOnField[1]?.id || plan.positionsOnField[0].id);
    setIsCustomMode(false);
    pavilionAudio.playWillowCrack();
  };

  const selectedFielder = fielders.find(f => f.id === selectedFielderId) || fielders[0];

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    setDraggingId(id);
    setSelectedFielderId(id);
    setIsCustomMode(true);
    pavilionAudio.playWillowCrack();
  };

  // Global pointer move / up for fluid drag & drop
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingId || !fieldRef.current) return;
      const rect = fieldRef.current.getBoundingClientRect();
      const rawX = ((e.clientX - rect.left) / rect.width) * 100;
      const rawY = ((e.clientY - rect.top) / rect.height) * 100;

      // Bound within turf circle radius ~44% from center (50, 50)
      const dx = rawX - 50;
      const dy = rawY - 50;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 45; // stay inside ground boundary

      let clampedX = rawX;
      let clampedY = rawY;
      if (dist > maxDist) {
        clampedX = 50 + (dx / dist) * maxDist;
        clampedY = 50 + (dy / dist) * maxDist;
      }

      setFielders(prev => prev.map(f => {
        if (f.id === draggingId) {
          return {
            ...f,
            coordinates: {
              x: Math.round(clampedX * 10) / 10,
              y: Math.round(clampedY * 10) / 10
            }
          };
        }
        return f;
      }));
    };

    const handlePointerUp = () => {
      if (draggingId) {
        setDraggingId(null);
      }
    };

    if (draggingId) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggingId]);

  const resetCurrentPlan = () => {
    setFielders(activePlan.positionsOnField);
    setIsCustomMode(false);
    pavilionAudio.playWillowCrack();
  };

  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const saveCustomPlan = () => {
    if (!customPlanName.trim()) return;
    setSavedCustomPlans(prev => [
      { name: customPlanName.trim(), fielders: [...fielders] },
      ...prev
    ]);
    pavilionAudio.playBoundaryCheer();
    setSaveSuccess(`Tactical Field "${customPlanName}" saved to Sanjith's Playbook!`);
    setTimeout(() => setSaveSuccess(null), 4000);
  };

  const loadSavedCustomPlan = (saved: { name: string; fielders: EditableFielder[] }) => {
    setFielders(saved.fielders);
    setIsCustomMode(true);
    setSelectedFielderId(saved.fielders[0].id);
    pavilionAudio.playWillowCrack();
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header Banner */}
      <div className="ald-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-800 font-bold flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-red-600" />
              CAPTAIN SANJITH'S FIELD BOARD 💥
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
            Set Your Field • Move Any Player
          </h1>
          <p className="text-sm text-[#78716c] mt-1 max-w-2xl">
            Pick a ready-made field below, or <strong className="text-[#1c1917]">drag and drop any of the 11 fielders</strong> anywhere on the pitch to set your own trap!
          </p>
        </div>

        {/* Masterplan Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {TACTICAL_MASTERPLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handleSelectPlan(plan)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                activePlan.id === plan.id && !isCustomMode
                  ? 'bg-[#1c1917] text-[#f5f2eb] border-[#1c1917] shadow-sm'
                  : 'bg-white hover:bg-[#ece7de] text-[#1c1917] border-[#ded7cb]'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Field and Strategic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: The 360 Tactical Turf with Animated & Draggable Coordinates */}
        <div className="lg:col-span-7 ald-card p-6 md:p-8 rounded-3xl flex flex-col items-center relative bg-white">
          <div className="flex items-center justify-between w-full mb-4 pb-3 border-b border-[#ded7cb]">
            <div>
              <span className="font-mono text-xs uppercase font-bold text-[#1c1917] flex items-center gap-2">
                {isCustomMode ? '★ SANJITH CUSTOM FIELD SETUP' : activePlan.name}
                {isCustomMode && (
                  <span className="text-[10px] bg-[#1c1917] text-white px-2 py-0.5 rounded font-mono">
                    CUSTOM EDITING
                  </span>
                )}
              </span>
              <span className="text-xs text-[#78716c]">
                {isCustomMode ? 'Drag any player node across the ground' : `Setup: ${activePlan.fieldingPreset}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isCustomMode && (
                <button
                  onClick={resetCurrentPlan}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#ece7de] hover:bg-[#ded7cb] text-[#1c1917] transition-all flex items-center gap-1 cursor-pointer"
                  title="Reset to default preset"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
              <span className="text-xs font-mono font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                {activePlan.scenario}
              </span>
            </div>
          </div>

          {/* 360 Oval Ground */}
          <div
            ref={fieldRef}
            className="relative w-full max-w-[500px] aspect-square rounded-full border-2 border-dashed border-[#1c1917] bg-[#f7f5f0] p-6 flex items-center justify-center shadow-inner select-none overflow-hidden touch-none"
          >
            {/* 30-Yard Circle */}
            <div className="absolute inset-16 rounded-full border border-dashed border-[#ded7cb] pointer-events-none" />

            {/* Pitch Strip */}
            <div className="absolute w-10 h-36 bg-[#ece7de] border border-[#ded7cb] rounded-sm flex flex-col justify-between items-center py-2 shadow-sm pointer-events-none">
              <div className="w-6 h-1 bg-[#1c1917]" />
              <div className="text-[8px] font-mono text-[#78716c] uppercase -rotate-90 font-bold">22 YDS</div>
              <div className="w-6 h-1 bg-[#1c1917]" />
            </div>

            {/* Drag Instructions Overlay Banner */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#ded7cb] shadow-xs flex items-center gap-1.5 z-0">
              <Move className="w-3 h-3 text-[#1c1917]" />
              <span className="text-[10px] font-mono uppercase text-[#78716c] font-bold">
                DRAG NODES TO REPOSITION FIELDERS
              </span>
            </div>

            {/* All 11 Fielders Draggable On Turf */}
            {fielders.map((f) => {
              const isSelected = selectedFielder.id === f.id;
              const isKey = f.isKeyCatcher;
              const isBeingDragged = draggingId === f.id;

              return (
                <div
                  key={f.id}
                  onPointerDown={(e) => handlePointerDown(f.id, e)}
                  style={{
                    left: `${f.coordinates.x}%`,
                    top: `${f.coordinates.y}%`,
                    transition: isBeingDragged ? 'none' : 'left 0.4s cubic-bezier(0.25, 1, 0.5, 1), top 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing flex flex-col items-center group select-none z-10 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                  title={`${f.name} • Drag to reposition`}
                >
                  {isKey && (
                    <span className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                  )}

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shadow-md border transition-all ${
                      isSelected
                        ? 'bg-[#1c1917] text-[#f5f2eb] ring-4 ring-[#ded7cb]'
                        : isKey
                        ? 'bg-red-600 text-white border-red-800'
                        : 'bg-white text-[#1c1917] border-[#1c1917]'
                    } ${isBeingDragged ? 'ring-4 ring-amber-500 scale-130' : ''}`}
                  >
                    {f.name.charAt(0)}
                  </div>

                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap mt-1 shadow-sm transition-colors pointer-events-none ${
                    isSelected
                      ? 'bg-[#1c1917] text-white'
                      : 'bg-white/95 text-[#1c1917] border border-[#ded7cb]'
                  }`}>
                    {f.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Action Bar Below Field */}
          <div className="w-full mt-6 pt-3 border-t border-[#ded7cb] flex flex-wrap items-center justify-between text-xs text-[#78716c] gap-3">
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Key Trap Catcher</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-white border border-[#1c1917]" /> Ring & Outfield</span>
            </div>
            
            {/* Custom Field Saver Box */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customPlanName}
                onChange={(e) => setCustomPlanName(e.target.value)}
                className="bg-[#f7f5f0] border border-[#ded7cb] px-2.5 py-1 rounded-lg text-xs text-[#1c1917] font-semibold w-44 focus:outline-none focus:border-[#1c1917]"
                placeholder="Name your field plan..."
              />
              <button
                onClick={saveCustomPlan}
                className="px-3 py-1 bg-[#1c1917] hover:bg-[#292524] text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
            {saveSuccess && (
              <div className="mt-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{saveSuccess}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Tactical Trap Anatomy & Selected Fielder Role */}
        <div className="lg:col-span-5 ald-card p-6 md:p-8 rounded-3xl flex flex-col justify-between space-y-6 bg-white">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ded7cb]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#78716c]">
                {isCustomMode ? "SANJITH'S CUSTOM FIELD" : 'HOW THIS FIELD WORKS'}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#ece7de] text-[#1c1917]">
                Bowler: {activePlan.bowlerType}
              </span>
            </div>

            <h3 className="font-editorial text-2xl font-bold text-[#1c1917] mt-3">
              {isCustomMode ? customPlanName : activePlan.name}
            </h3>

            {/* Captain's Objective */}
            <div className="mt-4 p-4 rounded-2xl bg-[#f7f5f0] border border-[#ded7cb]">
              <span className="text-[10px] text-[#78716c] uppercase font-bold block mb-1">
                The Plan
              </span>
              <p className="text-xs md:text-sm text-[#1c1917] leading-relaxed">
                {isCustomMode
                  ? "Your custom setup. Fielders are placed to stop easy singles and force the batsman to take big risks."
                  : activePlan.captaincyObjective}
              </p>
            </div>

            {/* How the Wicket Falls (The Trap) */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-[10px] text-amber-900 uppercase font-bold block mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-700" />
                How We Get Them Out
              </span>
              <p className="text-xs text-[#44403c] leading-relaxed">
                {isCustomMode
                  ? "The batsman gets frustrated by tight fielding and tries a risky shot, leading straight to a catch!"
                  : activePlan.dismissalTrapDescription}
              </p>
            </div>

            {/* Selected Node Details */}
            <div className="mt-5 p-4 rounded-2xl bg-white border border-[#ded7cb] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#78716c] uppercase font-bold block">
                  Selected Fielder: {selectedFielder.name}
                </span>
                <span className="text-[10px] text-[#78716c]">
                  Position: {selectedFielder.coordinates.x}%, {selectedFielder.coordinates.y}%
                </span>
              </div>
              <p className="text-sm font-bold text-[#1c1917] mt-1">
                {selectedFielder.role}
              </p>
              {selectedFielder.isKeyCatcher && (
                <span className="inline-block mt-2 text-[10px] font-bold text-red-700 bg-red-100 border border-red-200 px-2.5 py-0.5 rounded-full">
                  ★ Main Catcher
                </span>
              )}
            </div>

            {/* Saved Plans Selector */}
            {savedCustomPlans.length > 0 && (
              <div className="mt-5 pt-4 border-t border-[#ded7cb]">
                <span className="text-[10px] uppercase font-bold text-[#78716c] block mb-2 font-mono">
                  SANJITH'S SAVED FIELD PRESETS
                </span>
                <div className="space-y-2">
                  {savedCustomPlans.map((sp, idx) => (
                    <button
                      key={idx}
                      onClick={() => loadSavedCustomPlan(sp)}
                      className="w-full text-left p-2.5 rounded-xl bg-[#f7f5f0] hover:bg-[#ece7de] border border-[#ded7cb] text-xs font-semibold text-[#1c1917] flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span>{sp.name}</span>
                      <span className="text-[10px] font-mono text-[#78716c]">11 Fielders • Load</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#ded7cb] flex items-center justify-between text-xs text-[#78716c]">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#1c1917]" />
              Key Men: {activePlan.keyFielder}
            </span>
          </div>
        </div>
      </div>

      {/* Encyclopedia of All 12 Positions */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-white border border-[#ded7cb]">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ded7cb]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#78716c]">
              GROUND ANATOMY REFERENCE
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#1c1917]">
              Complete Field Positions Guide
            </h2>
          </div>
          <span className="text-xs text-[#78716c] font-mono">12 Primary Stations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_FIELDING_POSITIONS.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-[#f7f5f0] border border-[#ded7cb] hover:border-[#1c1917] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#ded7cb]">
                  <span className="text-xs font-bold text-[#1c1917]">{p.name}</span>
                  <span className="text-[10px] font-mono text-[#78716c]">{p.distanceMeters}</span>
                </div>
                <p className="text-xs text-[#44403c] line-clamp-2 leading-relaxed">
                  {p.purpose}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#ded7cb] flex items-center justify-between text-[11px] text-[#78716c]">
                <span className="font-semibold text-[#1c1917]">{p.side}</span>
                <span className="truncate max-w-[140px] text-right">{p.legendaryMasters[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
