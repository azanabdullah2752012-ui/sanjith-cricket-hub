import React, { useState, useEffect } from 'react';
import { DetailedMatch, MatchPlayer } from '../data/matchIntelligenceData';
import { MATCH_LIVE_SIMULATION_FEED, LiveBallEvent } from '../data/liveSimulationData';
import { ArrowLeft, Play, Pause, Compass, MapPin, Info, CheckCircle2 } from 'lucide-react';
import { InteractivePitchMap } from '../components/InteractivePitchMap';
import { ModernWagonWheel } from '../components/ModernWagonWheel';

interface MatchStudioViewProps {
  match: DetailedMatch;
  onBack: () => void;
}

export const MatchStudioView: React.FC<MatchStudioViewProps> = ({ match, onBack }) => {
  const [players, setPlayers] = useState<MatchPlayer[]>(match.playersOnField);
  const [selectedPlayer, setSelectedPlayer] = useState<MatchPlayer>(
    match.playersOnField.find(p => p.currentMatchStats.isBattingNow) || match.playersOnField[0]
  );
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isLiveAutoPlaying, setIsLiveAutoPlaying] = useState(true);

  // Real-time moving red cricket ball coordinates
  const currentEvent: LiveBallEvent = MATCH_LIVE_SIMULATION_FEED[currentEventIndex];
  const [ballPos, setBallPos] = useState<{ x: number; y: number }>(currentEvent.ballTrajectory.finalRest);
  const [ballStage, setBallStage] = useState<'idle' | 'bowling' | 'pitch' | 'struck'>('idle');

  // Trigger real-time ball flight animation whenever a new delivery begins
  const animateBallDelivery = (event: LiveBallEvent) => {
    // Stage 1: Bowler release point (t = 0)
    setBallPos(event.ballTrajectory.release);
    setBallStage('bowling');

    // Stage 2: Pitch bounce point (t = 400ms)
    setTimeout(() => {
      setBallPos(event.ballTrajectory.pitchBounce);
      setBallStage('pitch');
    }, 400);

    // Stage 3: Bat contact at crease (t = 800ms)
    setTimeout(() => {
      setBallPos(event.ballTrajectory.batContact);
      setBallStage('struck');
    }, 800);

    // Stage 4: Ball travels to final field destination (t = 1400ms)
    setTimeout(() => {
      setBallPos(event.ballTrajectory.finalRest);
      setBallStage('idle');
    }, 1400);
  };

  // Auto-play deliveries every 6.5s
  useEffect(() => {
    if (!isLiveAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => {
        const nextIdx = (prev + 1) % MATCH_LIVE_SIMULATION_FEED.length;
        const nextEvent = MATCH_LIVE_SIMULATION_FEED[nextIdx];

        animateBallDelivery(nextEvent);

        setPlayers((prevPlayers) => {
          return prevPlayers.map((p) => {
            if (nextEvent.playerShifts[p.id]) {
              const shift = nextEvent.playerShifts[p.id];
              return {
                ...p,
                fieldCoordinates: { x: shift.x, y: shift.y },
                fieldingPositionCurrent: shift.positionName
              };
            }
            return p;
          });
        });

        return nextIdx;
      });
    }, 6500);

    return () => clearInterval(interval);
  }, [isLiveAutoPlaying]);

  const handleSelectPlayer = (p: MatchPlayer) => {
    setSelectedPlayer(p);
  };

  const manualNextBall = () => {
    const nextIdx = (currentEventIndex + 1) % MATCH_LIVE_SIMULATION_FEED.length;
    const nextEvent = MATCH_LIVE_SIMULATION_FEED[nextIdx];
    setCurrentEventIndex(nextIdx);

    animateBallDelivery(nextEvent);

    setPlayers((prevPlayers) => {
      return prevPlayers.map((p) => {
        if (nextEvent.playerShifts[p.id]) {
          const shift = nextEvent.playerShifts[p.id];
          return {
            ...p,
            fieldCoordinates: { x: shift.x, y: shift.y },
            fieldingPositionCurrent: shift.positionName
          };
        }
        return p;
      });
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Real Data Notice */}
      <div className="p-4 rounded-2xl bg-[#16181d] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-red-500 shrink-0" />
          <span className="text-slate-300">
            <strong>Match Info:</strong> Real scorecards, grounds, and players from actual international cricket games.
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40 font-bold flex items-center gap-1 shrink-0">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> OFFICIAL MATCH DATA
        </span>
      </div>

      {/* Top Breadcrumb & Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e2027] hover:bg-[#282b36] hover:border-white/20 text-white text-xs font-semibold border border-white/[0.12] transition-all cursor-pointer shadow-sm self-start group active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 group-hover:text-white transition-all" />
          <span>Back to All Matches</span>
        </button>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#16181d] border border-white/[0.08] text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="font-mono text-[11px] font-bold text-red-400">
              LIVE BALL TRACKING
            </span>
          </div>

          <button
            onClick={() => setIsLiveAutoPlaying(!isLiveAutoPlaying)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isLiveAutoPlaying
                ? 'bg-red-600 text-white border-red-500'
                : 'bg-[#16181d] text-slate-300 border-white/[0.08]'
            }`}
          >
            {isLiveAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isLiveAutoPlaying ? 'Live Running' : 'Paused'}</span>
          </button>

          <button
            onClick={manualNextBall}
            className="px-3 py-1.5 rounded-xl bg-[#1b1e26] hover:bg-[#232733] text-slate-200 text-xs font-semibold border border-white/[0.08] transition-colors cursor-pointer"
          >
            <span>Bowl Next Ball »</span>
          </button>
        </div>
      </div>

      {/* Match Banner Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/50 text-red-400 border border-red-800/40">
                LIVE ACTION
              </span>
              <span className="text-xs text-slate-400">• {match.series}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {match.matchTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {match.venue}
              </span>
              <span>•</span>
              <span className="text-slate-300 bg-white/[0.06] px-2 py-0.5 rounded font-medium">
                {match.daySessionStatus}
              </span>
            </div>
          </div>

          {/* Scores Display */}
          <div className="flex items-center gap-6 bg-[#0e0f12] p-4 rounded-2xl border border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{match.teamA.flag}</span>
              <div>
                <span className="text-sm font-bold text-white block">{match.teamA.name}</span>
                <span className="font-mono text-sm text-slate-400">{match.teamA.score}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/[0.1]" />

            <div className="flex items-center gap-3">
              <span className="text-2xl">{match.teamB.flag}</span>
              <div>
                <span className="text-sm font-bold text-white block">{match.teamB.name}</span>
                <span className="font-mono text-sm text-red-400 font-bold">{match.teamB.score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Delivery Ticker */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3 flex items-center gap-3 bg-[#0e0f12] p-3 rounded-xl border border-white/[0.08]">
            <span className="font-mono font-bold text-sm bg-red-600 text-white px-2 py-1 rounded">
              OV {currentEvent.overBall}
            </span>
            <div className="text-xs">
              <span className="font-bold text-white block">{currentEvent.bowler}</span>
              <span className="text-[10px] text-red-400 font-mono font-bold">{currentEvent.speed}</span>
            </div>
          </div>

          <div className="md:col-span-9 bg-[#0e0f12] p-3 rounded-xl border border-white/[0.08] text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                LATEST DELIVERY
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                Ball Status: <strong className="text-white uppercase">{ballStage}</strong>
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {currentEvent.eventText} <span className="text-slate-400">({currentEvent.fieldShiftDescription})</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Studio Arena Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 360 Dynamic Field */}
        <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-xl flex flex-col items-center relative">
          <div className="flex items-center justify-between w-full mb-4 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs uppercase font-bold text-white">
                LIVE 360° GROUND
              </span>
            </div>
            <span className="text-xs text-slate-400">
              Red ball moves: bowler ➔ pitch ➔ fielder
            </span>
          </div>

          {/* Oval Field Canvas */}
          <div className="relative w-full max-w-[480px] aspect-square rounded-full border-2 border-dashed border-emerald-600/40 bg-gradient-to-b from-[#0c2014] to-[#08170e] p-6 flex items-center justify-center shadow-inner select-none overflow-hidden">
            {/* 30-Yard Circle */}
            <div className="absolute inset-16 rounded-full border border-dashed border-emerald-500/25 pointer-events-none" />

            {/* Pitch Strip */}
            <div className="absolute w-10 h-36 bg-[#2a261f] border border-amber-900/30 rounded-sm flex flex-col justify-between items-center py-2 shadow-sm pointer-events-none">
              <div className="w-6 h-1 bg-white/60" />
              <div className="text-[8px] font-mono text-slate-400 uppercase -rotate-90 font-bold">22 YDS</div>
              <div className="w-6 h-1 bg-white/60" />
            </div>

            {/* REAL-TIME MOVING RED CRICKET BALL */}
            <div
              style={{
                left: `${ballPos.x}%`,
                top: `${ballPos.y}%`,
                transition: 'left 0.45s ease-out, top 0.45s ease-out'
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
            >
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-full bg-red-500/50 animate-ping" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#dc2626] border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-yellow-200 rotate-45" />
                </div>
              </div>
            </div>

            {/* Dynamic Player Nodes */}
            {players.map((p) => {
              const isSelected = selectedPlayer.id === p.id;
              const isBatting = p.currentMatchStats.isBattingNow;
              const isBowling = p.currentMatchStats.isBowlingNow;

              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectPlayer(p)}
                  style={{
                    left: `${p.fieldCoordinates.x}%`,
                    top: `${p.fieldCoordinates.y}%`,
                    transition: 'left 0.8s cubic-bezier(0.25, 1, 0.5, 1), top 0.8s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer flex flex-col items-center group z-10 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                  title={`${p.name} • ${p.fieldingPositionCurrent}`}
                >
                  {isSelected && (
                    <div className="absolute -inset-1 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                  )}

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shadow-md border transition-all ${
                      isSelected
                        ? 'bg-red-600 text-white ring-4 ring-red-500/30 border-white'
                        : isBatting
                        ? 'bg-amber-400 text-slate-950 border-amber-300'
                        : isBowling
                        ? 'bg-red-600 text-white border-red-400'
                        : 'bg-[#1e2330] text-slate-200 border-white/20'
                    }`}
                  >
                    {p.name.charAt(0)}
                  </div>

                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap mt-1 shadow-sm transition-colors ${
                    isSelected
                      ? 'bg-red-600 text-white'
                      : 'bg-[#0e0f12]/90 text-slate-300 border border-white/[0.08]'
                  }`}>
                    {p.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="w-full mt-6 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white" /> Cricket Ball</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Batsmen</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Bowler</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#1e2330] border border-white/30" /> Fielders</span>
            </div>
            <span className="text-[10px] text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">
              Ball & Fielders move live
            </span>
          </div>
        </div>

        {/* Right: Selected Player Dossier Card */}
        <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl bg-[#16181d] border border-white/[0.08] shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-400">
                PLAYER PROFILE
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/[0.06] text-slate-200">
                {selectedPlayer.role}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mt-3">
              {selectedPlayer.name}
            </h2>
            <div className="text-xs text-slate-400 mt-0.5">
              {selectedPlayer.battingHand} {selectedPlayer.bowlingStyle ? `• ${selectedPlayer.bowlingStyle}` : ''}
            </div>

            {/* Current Position Badge */}
            <div className="mt-4 p-4 bg-[#0e0f12] rounded-2xl border border-white/[0.08]">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                Current Position on the Field
              </span>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-red-500" />
                {selectedPlayer.fieldingPositionCurrent}
              </div>
            </div>

            {/* Match Stats */}
            <div className="mt-4 p-4 bg-[#1b1e26] rounded-2xl border border-white/[0.08]">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">
                Today's Match Stats
              </span>

              {selectedPlayer.currentMatchStats.runs !== undefined && (
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-white font-mono">
                      {selectedPlayer.currentMatchStats.runs}*
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-mono">
                      off {selectedPlayer.currentMatchStats.balls} balls
                    </span>
                  </div>
                  <div className="text-right text-xs font-mono text-slate-400">
                    {selectedPlayer.currentMatchStats.fours} fours • {selectedPlayer.currentMatchStats.sixes} sixes
                  </div>
                </div>
              )}

              {selectedPlayer.currentMatchStats.overs && (
                <div className="mt-2 pt-2 border-t border-white/[0.08] flex items-baseline justify-between text-xs">
                  <span className="font-mono text-slate-300">
                    {selectedPlayer.currentMatchStats.overs} overs • {selectedPlayer.currentMatchStats.wickets} wickets • {selectedPlayer.currentMatchStats.runsConceded} runs
                  </span>
                  {selectedPlayer.currentMatchStats.isBowlingNow && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-950/60 border border-red-800 text-red-400 font-bold">
                      BOWLING NOW
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="mt-4 space-y-3">
              <div className="p-3.5 bg-[#0e0f12] rounded-xl border border-white/[0.08]">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Style of Play</span>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedPlayer.profileBio}
                </p>
              </div>

              <div className="p-3.5 bg-[#0e0f12] rounded-xl border border-white/[0.08]">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Special Shot or Ball</span>
                <p className="text-xs text-white font-semibold mt-1">
                  {selectedPlayer.signatureWeapon}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
            <span>Tap any fielder on the ground to inspect</span>
            <button
              onClick={manualNextBall}
              className="text-xs font-bold text-red-400 hover:text-red-300 cursor-pointer"
            >
              Next Ball »
            </button>
          </div>
        </div>
      </div>

      {/* Hawkeye 3D Pitch Map Section */}
      <section className="pt-4">
        <InteractivePitchMap activeBowler="Shaheen Afridi" />
      </section>

      {/* 360 Wagon Wheel Section */}
      <section className="pt-4">
        <ModernWagonWheel />
      </section>
    </div>
  );
};
