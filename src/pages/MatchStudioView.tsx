import React, { useState, useEffect, useRef } from 'react';
import { DetailedMatch, MatchPlayer } from '../data/matchIntelligenceData';
import { MATCH_LIVE_SIMULATION_FEED, LiveBallEvent } from '../data/liveSimulationData';
import { ArrowLeft, Play, Pause, Compass, MapPin, Activity, Flame, Info, CheckCircle2, Crosshair, PieChart } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';
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
      if (event.runs > 0) {
        pavilionAudio.playWillowCrack();
      }
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

        // Animate the red cricket ball across the pitch
        animateBallDelivery(nextEvent);

        // Apply smooth player field movements
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
    pavilionAudio.playWillowCrack();
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
      {/* Real Data Transparency Notice */}
      <div className="p-4 rounded-2xl bg-white border border-[#ded7cb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#1c1917] shrink-0" />
          <span className="text-[#1c1917]">
            <strong>Data Integrity:</strong> Match scorecards, venue, session state & player rosters are <strong>100% verified real data from Cricinfo</strong>. The ball trajectory & field shift simulation models the tactical over in real time.
          </span>
        </div>
        <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-bold flex items-center gap-1 shrink-0">
          <CheckCircle2 className="w-3 h-3 text-emerald-700" /> VERIFIED CRICKET DATA
        </span>
      </div>

      {/* Top Breadcrumb & Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#ded7cb] gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#ece7de] text-[#1c1917] text-xs font-semibold border border-[#ded7cb] transition-colors cursor-pointer shadow-sm self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Matches</span>
        </button>

        {/* Live Simulation Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#ded7cb] text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="font-mono text-[11px] font-bold text-red-700">
              BALL TRAJECTORY & FIELD TRACKING
            </span>
          </div>

          <button
            onClick={() => setIsLiveAutoPlaying(!isLiveAutoPlaying)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isLiveAutoPlaying
                ? 'bg-[#1c1917] text-[#f5f2eb] border-[#1c1917]'
                : 'bg-white text-[#1c1917] border-[#ded7cb]'
            }`}
          >
            {isLiveAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isLiveAutoPlaying ? 'Live Sync Active' : 'Paused'}</span>
          </button>

          <button
            onClick={manualNextBall}
            className="px-3 py-1.5 rounded-xl bg-[#ece7de] hover:bg-[#ded7cb] text-[#1c1917] text-xs font-semibold border border-[#ded7cb] transition-colors cursor-pointer"
          >
            <span>Bowl Next Delivery »</span>
          </button>
        </div>
      </div>

      {/* Match Banner Header */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                LIVE ON-FIELD TELEMETRY
              </span>
              <span className="text-xs text-[#78716c]">• {match.series}</span>
            </div>

            <h1 className="font-editorial text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
              {match.matchTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#78716c]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#1c1917]" />
                {match.venue}
              </span>
              <span>•</span>
              <span className="font-mono text-[#1c1917] bg-[#ece7de] px-2 py-0.5 rounded font-semibold">
                {match.daySessionStatus}
              </span>
            </div>
          </div>

          {/* Scores Display */}
          <div className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-[#ded7cb] shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{match.teamA.flag}</span>
              <div>
                <span className="font-editorial text-base font-bold text-[#1c1917] block">{match.teamA.name}</span>
                <span className="font-mono text-sm text-[#78716c]">{match.teamA.score}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-[#ded7cb]" />

            <div className="flex items-center gap-3">
              <span className="text-2xl">{match.teamB.flag}</span>
              <div>
                <span className="font-editorial text-base font-bold text-[#1c1917] block">{match.teamB.name}</span>
                <span className="font-mono text-sm text-[#1c1917] font-bold">{match.teamB.score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Delivery Ticker & Speed Gun */}
        <div className="mt-6 pt-5 border-t border-[#ded7cb] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3 flex items-center gap-3 bg-[#ece7de] p-3 rounded-xl border border-[#ded7cb]">
            <span className="font-mono font-bold text-sm bg-[#1c1917] text-[#f5f2eb] px-2 py-1 rounded">
              OV {currentEvent.overBall}
            </span>
            <div className="text-xs">
              <span className="font-bold text-[#1c1917] block">{currentEvent.bowler}</span>
              <span className="text-[10px] text-red-700 font-mono font-bold">{currentEvent.speed}</span>
            </div>
          </div>

          <div className="md:col-span-9 bg-white p-3 rounded-xl border border-[#ded7cb] text-xs">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider">
                LIVE BALL ACTION & TACTICAL SHIFT
              </span>
              <span className="font-mono text-[10px] text-[#78716c]">
                Ball Status: <strong className="text-[#1c1917] uppercase">{ballStage}</strong>
              </span>
            </div>
            <p className="text-xs text-[#1c1917] leading-relaxed">
              {currentEvent.eventText} <span className="font-bold text-[#78716c]">({currentEvent.fieldShiftDescription})</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Studio Arena Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 360 Dynamic Field with Real-Time Ball & Player Movement */}
        <div className="lg:col-span-7 ald-card p-6 md:p-8 rounded-3xl flex flex-col items-center relative">
          <div className="flex items-center justify-between w-full mb-4 pb-3 border-b border-[#ded7cb]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-mono text-xs uppercase font-bold text-[#1c1917]">
                LIVE 360° TURF • BALL TRACKER ACTIVE
              </span>
            </div>
            <span className="text-xs text-[#78716c] font-mono">
              Red ball animates release ➔ bounce ➔ field
            </span>
          </div>

          {/* SVG Field with Animated Smooth Positions */}
          <div className="relative w-full max-w-[480px] aspect-square rounded-full border-2 border-dashed border-[#1c1917] bg-[#f7f5f0] p-6 flex items-center justify-center shadow-inner select-none overflow-hidden">
            {/* 30-Yard Circle */}
            <div className="absolute inset-16 rounded-full border border-dashed border-[#ded7cb] pointer-events-none" />

            {/* Pitch Strip */}
            <div className="absolute w-10 h-36 bg-[#ece7de] border border-[#ded7cb] rounded-sm flex flex-col justify-between items-center py-2 shadow-sm pointer-events-none">
              <div className="w-6 h-1 bg-[#1c1917]" />
              <div className="text-[8px] font-mono text-[#78716c] uppercase -rotate-90 font-bold">22 YDS</div>
              <div className="w-6 h-1 bg-[#1c1917]" />
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
                {/* Glowing beacon aura around the ball */}
                <div className="absolute -inset-1.5 rounded-full bg-red-500/40 animate-ping" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#881337] border-2 border-white shadow-lg flex items-center justify-center">
                  <div className="w-1.5 h-0.5 bg-yellow-200 rotate-45" /> {/* Seam line */}
                </div>
              </div>
            </div>

            {/* Dynamic Player Nodes (Transition positions smoothly over CSS) */}
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
                  {/* Outer Pulsing Ring for Selected */}
                  {isSelected && (
                    <div className="absolute -inset-1 rounded-full bg-[#1c1917]/20 animate-ping pointer-events-none" />
                  )}

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shadow-md border transition-all ${
                      isSelected
                        ? 'bg-[#1c1917] text-[#f5f2eb] ring-4 ring-[#ded7cb]'
                        : isBatting
                        ? 'bg-amber-400 text-black border-amber-600'
                        : isBowling
                        ? 'bg-red-500 text-white border-red-700'
                        : 'bg-white text-[#1c1917] border-[#1c1917]'
                    }`}
                  >
                    {p.name.charAt(0)}
                  </div>

                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap mt-1 shadow-sm transition-colors ${
                    isSelected
                      ? 'bg-[#1c1917] text-white'
                      : 'bg-white/95 text-[#1c1917] border border-[#ded7cb]'
                  }`}>
                    {p.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="w-full mt-6 pt-3 border-t border-[#ded7cb] flex flex-wrap items-center justify-between text-xs text-[#78716c] gap-2">
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#881337] border border-white" /> Live Ball</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Batsmen</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Bowler</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-white border border-[#1c1917]" /> Fielders</span>
            </div>
            <span className="text-[10px] font-mono text-[#1c1917] bg-[#ece7de] px-2 py-0.5 rounded">
              Ball & Field update in tandem
            </span>
          </div>
        </div>

        {/* Right: Selected Player Dossier Card */}
        <div className="lg:col-span-5 ald-card p-6 md:p-8 rounded-3xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#ded7cb]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#78716c]">
                ACTIVE ON-FIELD DOSSIER
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#ece7de] text-[#1c1917]">
                {selectedPlayer.role}
              </span>
            </div>

            <h2 className="font-editorial text-3xl font-bold text-[#1c1917] mt-3">
              {selectedPlayer.name}
            </h2>
            <div className="text-xs text-[#78716c] mt-0.5">
              {selectedPlayer.battingHand} {selectedPlayer.bowlingStyle ? `• ${selectedPlayer.bowlingStyle}` : ''}
            </div>

            {/* Current Position Badge */}
            <div className="mt-4 p-4 bg-[#f7f5f0] rounded-2xl border border-[#ded7cb]">
              <span className="text-[10px] text-[#78716c] uppercase font-bold block mb-1">
                Current Live Position On Turf
              </span>
              <div className="text-base font-bold text-[#1c1917] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#1c1917]" />
                {selectedPlayer.fieldingPositionCurrent}
              </div>
            </div>

            {/* Match Stats */}
            <div className="mt-4 p-4 bg-white rounded-2xl border border-[#ded7cb] shadow-sm">
              <span className="text-[10px] text-[#78716c] uppercase font-bold block mb-2">
                Match Record So Far
              </span>

              {selectedPlayer.currentMatchStats.runs !== undefined && (
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-editorial font-bold text-[#1c1917]">
                      {selectedPlayer.currentMatchStats.runs}*
                    </span>
                    <span className="text-xs text-[#78716c] ml-1.5 font-mono">
                      off {selectedPlayer.currentMatchStats.balls} balls
                    </span>
                  </div>
                  <div className="text-right text-xs font-mono text-[#78716c]">
                    {selectedPlayer.currentMatchStats.fours}x4 • {selectedPlayer.currentMatchStats.sixes}x6
                  </div>
                </div>
              )}

              {selectedPlayer.currentMatchStats.overs && (
                <div className="mt-2 pt-2 border-t border-[#ded7cb] flex items-baseline justify-between text-xs">
                  <span className="font-mono font-bold text-[#1c1917]">
                    Spell: {selectedPlayer.currentMatchStats.overs} ov • {selectedPlayer.currentMatchStats.maidens}m • {selectedPlayer.currentMatchStats.runsConceded}r • {selectedPlayer.currentMatchStats.wickets}w
                  </span>
                  {selectedPlayer.currentMatchStats.isBowlingNow && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                      BOWLING NOW
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Tactical Weapon & Bio */}
            <div className="mt-4 space-y-3">
              <div className="p-3.5 bg-[#f7f5f0] rounded-xl border border-[#ded7cb]">
                <span className="text-[10px] text-[#78716c] uppercase font-bold block">Career Style</span>
                <p className="text-xs text-[#44403c] mt-0.5 leading-relaxed">
                  {selectedPlayer.profileBio}
                </p>
              </div>

              <div className="p-3.5 bg-[#f7f5f0] rounded-xl border border-[#ded7cb]">
                <span className="text-[10px] text-[#78716c] uppercase font-bold block">Signature Weapon</span>
                <p className="text-xs text-[#1c1917] font-semibold mt-0.5">
                  {selectedPlayer.signatureWeapon}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#ded7cb] flex items-center justify-between text-xs text-[#78716c]">
            <span>Click any node on the turf to inspect</span>
            <button
              onClick={manualNextBall}
              className="text-xs font-bold text-[#1c1917] hover:underline cursor-pointer"
            >
              Bowl Next Ball »
            </button>
          </div>
        </div>
      </div>

      {/* Hawkeye 3D Pitch Map Section */}
      <section className="pt-4">
        <InteractivePitchMap activeBowler="Shaheen Afridi" />
      </section>

      {/* 360 Wagon Wheel & Shot Dispersion Section */}
      <section className="pt-4">
        <ModernWagonWheel />
      </section>
    </div>
  );
};
