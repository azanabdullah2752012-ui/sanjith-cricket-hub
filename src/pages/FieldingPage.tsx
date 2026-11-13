import React, { useState, useRef, useEffect } from 'react';
import { TACTICAL_MASTERPLANS, TacticalMasterplan } from '../data/tacticsMasterplanData';
import { ALL_FIELDING_POSITIONS } from '../data/cricketEncyclopedia';
import { Compass, RotateCcw, Move, Sparkles, Check, BookmarkPlus, Flame, Shield } from 'lucide-react';

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
        { id: 'wk', name: 'Wicket-Keeper', role: 'Standing up to stumps', coordinates: { x: 50, y: 78 } },
        { id: 'sl1', name: 'Fly Slip', role: 'Deep fine edge catcher', coordinates: { x: 65, y: 76 }, isKeyCatcher: true },
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
  };

  const selectedFielder = fielders.find(f => f.id === selectedFielderId) || fielders[0];

  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    setDraggingId(id);
    setSelectedFielderId(id);
    setIsCustomMode(true);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingId || !fieldRef.current) return;
      const rect = fieldRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Calculate percentage inside the field boundaries
      let newX = Math.round(((clientX - rect.left) / rect.width) * 100);
      let newY = Math.round(((clientY - rect.top) / rect.height) * 100);

      // Clamping to stay reasonably inside the oval
      newX = Math.max(10, Math.min(90, newX));
      newY = Math.max(10, Math.min(90, newY));

      setFielders(prev => prev.map(f => {
        if (f.id === draggingId) {
          return { ...f, coordinates: { x: newX, y: newY } };
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
  };

  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const saveCustomPlan = () => {
    if (!customPlanName.trim()) return;
    setSavedCustomPlans(prev => [
      { name: customPlanName.trim(), fielders: [...fielders] },
      ...prev
    ]);
    setSaveSuccess(`Field "${customPlanName}" saved to Sanjith's Playbook!`);
    setTimeout(() => setSaveSuccess(null), 4000);
  };

  const loadSavedCustomPlan = (saved: { name: string; fielders: EditableFielder[] }) => {
    setFielders(saved.fielders);
    setIsCustomMode(true);
    setSelectedFielderId(saved.fielders[0].id);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="ald-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-br from-[#17181d] via-[#1a1518] to-[#17181d] border border-white/[0.08] shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-red-500" />
              CAPTAIN SANJITH'S FIELD BOARD 💥
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl font-bold text-white tracking-tight">
            Set Your Field • Move Any Player
          </h1>
          <p className="text-sm text-[#94a3b8] mt-1 max-w-2xl">
            Pick a ready-made field below, or <strong className="text-white">drag and drop any of the 11 fielders</strong> anywhere on the turf to set your own trap!
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
                  ? 'bg-white text-[#0e0f12] border-white shadow-sm'
                  : 'bg-[#121317] hover:bg-[#1a1b22] text-[#94a3b8] hover:text-white border-white/[0.08]'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Field and Strategic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Stadium Turf */}
        <div className="lg:col-span-7 ald-card p-6 md:p-8 rounded-3xl flex flex-col items-center relative bg-[#16181d] border border-white/[0.08] shadow-xl">
          <div className="flex items-center justify-between w-full mb-4 pb-3 border-b border-white/[0.08]">
            <div>
              <span className="font-editorial text-sm uppercase font-bold text-white flex items-center gap-2">
                {isCustomMode ? '★ SANJITH CUSTOM FIELD SETUP' : activePlan.name}
                {isCustomMode && (
                  <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-bold">
                    EDITING
                  </span>
                )}
              </span>
              <span className="text-xs text-[#94a3b8]">
                {isCustomMode ? 'Drag any player circle across the ground' : `Setup: ${activePlan.fieldingPreset}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isCustomMode && (
                <button
                  onClick={resetCurrentPlan}
                  className="px-2.5 py-1 text-xs rounded-lg bg-[#22242d] hover:bg-[#2b2e38] text-white transition-all flex items-center gap-1 cursor-pointer border border-white/[0.08]"
                  title="Reset to default preset"
                >
                  <RotateCcw className="w-3 h-3 text-[#94a3b8]" />
                  <span>Reset</span>
                </button>
              )}
              <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
                {activePlan.scenario}
              </span>
            </div>
          </div>

          {/* Deep Natural Turf Oval Ground */}
          <div
            ref={fieldRef}
            className="relative w-full max-w-[500px] aspect-square rounded-full border-2 border-[#1e4525] bg-gradient-to-br from-[#0c2211] via-[#0e2914] to-[#0a1c0e] p-6 flex items-center justify-center shadow-2xl select-none overflow-hidden touch-none"
          >
            {/* 30-Yard Circle */}
            <div className="absolute inset-16 rounded-full border border-dashed border-white/20 pointer-events-none" />

            {/* Pitch Strip */}
            <div className="absolute w-10 h-36 bg-[#382d20] border border-[#524230] rounded-sm flex flex-col justify-between items-center py-2 shadow-inner pointer-events-none">
              <div className="w-6 h-1 bg-white/60" />
              <div className="text-[8px] font-mono text-[#a3927d] uppercase -rotate-90 font-bold">22 YDS</div>
              <div className="w-6 h-1 bg-white/60" />
            </div>

            {/* Draggable Fielder Nodes */}
            {fielders.map((fielder) => {
              const isSelected = fielder.id === selectedFielderId;
              const isDragging = fielder.id === draggingId;

              return (
                <div
                  key={fielder.id}
                  onPointerDown={(e) => handlePointerDown(fielder.id, e)}
                  style={{
                    left: `${fielder.coordinates.x}%`,
                    top: `${fielder.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isDragging ? 40 : isSelected ? 30 : 20,
                  }}
                  className={`absolute flex flex-col items-center group cursor-grab active:cursor-grabbing transition-transform ${
                    isDragging ? 'scale-125' : isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  {/* Fielder Circle Node */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg border transition-all ${
                      fielder.isKeyCatcher
                        ? 'bg-red-600 text-white border-white'
                        : isSelected
                        ? 'bg-white text-[#0e0f12] border-white'
                        : 'bg-[#1e2027] text-white border-white/40'
                    }`}
                  >
                    {fielder.id === 'wk' ? 'WK' : fielder.id === 'bowl' ? 'B' : fielder.name.charAt(0)}
                  </div>

                  {/* Fielder Label Tag */}
                  <span
                    className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-tight whitespace-nowrap shadow-sm pointer-events-none border ${
                      isSelected
                        ? 'bg-white text-[#0e0f12] border-white font-bold'
                        : 'bg-[#0e0f12]/90 text-white/90 border-white/20'
                    }`}
                  >
                    {fielder.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Controls Bar Below Ground */}
          <div className="w-full mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#94a3b8]">
              <Move className="w-3.5 h-3.5 text-white" />
              <span>Tap & drag any player circle to reposition</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={customPlanName}
                onChange={(e) => setCustomPlanName(e.target.value)}
                className="bg-[#121317] border border-white/[0.08] px-3 py-1.5 rounded-xl text-xs text-white font-medium w-48 focus:outline-none focus:border-red-500"
                placeholder="Name your setup..."
              />
              <button
                onClick={saveCustomPlan}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-md shrink-0"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Save Setup</span>
              </button>
            </div>
          </div>
          {saveSuccess && (
            <div className="mt-3 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-fade-in w-full justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{saveSuccess}</span>
            </div>
          )}
        </div>

        {/* Right: Tactical Plan Details */}
        <div className="lg:col-span-5 ald-card p-6 md:p-8 rounded-3xl flex flex-col justify-between space-y-6 bg-[#16181d] border border-white/[0.08] shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#94a3b8]">
                {isCustomMode ? "SANJITH'S CUSTOM FIELD" : 'HOW THIS FIELD WORKS'}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/[0.08] text-white">
                Bowler: {activePlan.bowlerType}
              </span>
            </div>

            <h3 className="font-editorial text-2xl font-bold text-white mt-3">
              {isCustomMode ? customPlanName : activePlan.name}
            </h3>

            {/* The Plan */}
            <div className="mt-4 p-4 rounded-2xl bg-[#121317] border border-white/[0.06]">
              <span className="text-[10px] text-[#94a3b8] uppercase font-bold block mb-1">
                The Plan
              </span>
              <p className="text-xs md:text-sm text-[#cbd5e1] leading-relaxed">
                {isCustomMode
                  ? "Your custom setup. Fielders are placed to stop easy singles and force the batsman to take big risks."
                  : activePlan.captaincyObjective}
              </p>
            </div>

            {/* How We Get Them Out */}
            <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] text-amber-400 uppercase font-bold block mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                How We Get Them Out
              </span>
              <p className="text-xs text-[#cbd5e1] leading-relaxed">
                {isCustomMode
                  ? "The batsman gets frustrated by tight fielding and tries a risky shot, leading straight to a catch!"
                  : activePlan.dismissalTrapDescription}
              </p>
            </div>

            {/* Selected Fielder Details */}
            <div className="mt-5 p-4 rounded-2xl bg-[#121317] border border-white/[0.06] shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#94a3b8] uppercase font-bold block">
                  Selected Fielder: {selectedFielder.name}
                </span>
                <span className="text-[10px] text-[#64748b] font-mono">
                  {selectedFielder.coordinates.x}%, {selectedFielder.coordinates.y}%
                </span>
              </div>
              <p className="text-sm font-bold text-white mt-1">
                {selectedFielder.role}
              </p>
              {selectedFielder.isKeyCatcher && (
                <span className="inline-block mt-2 text-[10px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
                  ★ Main Catcher
                </span>
              )}
            </div>

            {/* Saved Plans Selector */}
            {savedCustomPlans.length > 0 && (
              <div className="mt-5 pt-4 border-t border-white/[0.08]">
                <span className="text-[10px] uppercase font-bold text-[#94a3b8] block mb-2 font-mono">
                  SANJITH'S SAVED FIELD PRESETS
                </span>
                <div className="space-y-2">
                  {savedCustomPlans.map((sp, idx) => (
                    <button
                      key={idx}
                      onClick={() => loadSavedCustomPlan(sp)}
                      className="w-full text-left p-3 rounded-xl bg-[#121317] hover:bg-[#1a1b22] border border-white/[0.06] text-xs font-semibold text-white flex items-center justify-between transition-all cursor-pointer"
                    >
                      <span>{sp.name}</span>
                      <span className="text-[10px] font-mono text-[#94a3b8]">11 Fielders • Load</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#94a3b8]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              Key Men: {activePlan.keyFielder}
            </span>
          </div>
        </div>
      </div>

      {/* Field Positions Guide */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-xl">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#94a3b8]">
              GROUND POSITIONS
            </span>
            <h2 className="font-editorial text-2xl font-bold text-white">
              Field Positions Guide
            </h2>
          </div>
          <span className="text-xs text-[#94a3b8] font-mono">12 Main Positions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_FIELDING_POSITIONS.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-[#121317] border border-white/[0.06] hover:border-white/[0.14] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                  <span className="text-xs font-bold text-white">{p.name}</span>
                  <span className="text-[10px] font-mono text-[#94a3b8]">{p.distanceMeters}</span>
                </div>
                <p className="text-xs text-[#94a3b8] line-clamp-2 leading-relaxed">
                  {p.purpose}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#94a3b8]">
                <span className="font-semibold text-white">{p.side}</span>
                <span className="truncate max-w-[140px] text-right">{p.legendaryMasters[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
