import React, { useState } from 'react';
import { Target, Zap, Trophy, Shield, Flame, RotateCcw } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface DeliveryType {
  name: string;
  speed: string;
  length: 'Full Pitch' | 'Good Length' | 'Short Pitch' | 'Yorker';
  shotOptions: {
    name: string;
    description: string;
    outcome: 'SIX' | 'FOUR' | 'TWO' | 'WICKET';
    runs: number;
    points: number;
  }[];
}

const DELIVERIES: DeliveryType[] = [
  {
    name: "Express Yorker on Leg Stump",
    speed: "144 km/h",
    length: "Yorker",
    shotOptions: [
      { name: "Wristy Helicopter Dig-Out", description: "Flicks wrists with supersonic speed under the ball", outcome: 'SIX', runs: 6, points: 200 },
      { name: "Classic Straight Defense", description: "Presents full vertical face of the bat back to bowler", outcome: 'TWO', runs: 2, points: 50 },
      { name: "Blind Wild Slog", description: "Swings too early, completely misses line", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "Half-Volley outside Off Stump",
    speed: "138 km/h",
    length: "Full Pitch",
    shotOptions: [
      { name: "Sanjith Signature High-Elbow Cover Drive", description: "Leans into the pitch, head over ball, splits the gap with velvet timing", outcome: 'FOUR', runs: 4, points: 150 },
      { name: "Lofted Inside-Out Strike", description: "Clears extra cover boundary into the grandstand", outcome: 'SIX', runs: 6, points: 220 },
      { name: "Wafty Edge", description: "Pokes loosely with hands away from body", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "Fierce Throat Bouncer",
    speed: "148 km/h",
    length: "Short Pitch",
    shotOptions: [
      { name: "Swashbuckling Hook Over Square Leg", description: "Rolls wrists over the top, sending it sailing 95 meters", outcome: 'SIX', runs: 6, points: 250 },
      { name: "Upper Cut Over Slips", description: "Uses bowler's ferocious pace to guide it over third man", outcome: 'FOUR', runs: 4, points: 160 },
      { name: "Awkward Fend", description: "Gloves it towards short leg fielder", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "Deceptive Slower Ball Cutter",
    speed: "115 km/h",
    length: "Good Length",
    shotOptions: [
      { name: "Patient Backfoot Punch Through Covers", description: "Waits until the last millisecond to thread the infield", outcome: 'FOUR', runs: 4, points: 140 },
      { name: "Bottom-Hand Whip to Mid-Wicket", description: "Generates explosive torque to pierce deep cow corner", outcome: 'SIX', runs: 6, points: 210 },
      { name: "Early Slog Against the Turn", description: "Skies it high towards mid-on", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  }
];

export const BattingSimulator: React.FC = () => {
  const [currentDeliveryIndex, setCurrentDeliveryIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [ballsFaced, setBallsFaced] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const currentDelivery = DELIVERIES[currentDeliveryIndex];

  const handleShotSelection = (shot: DeliveryType['shotOptions'][0]) => {
    setBallsFaced(prev => prev + 1);

    if (shot.outcome === 'WICKET') {
      setWickets(prev => prev + 1);
      pavilionAudio.playStumpClatter();
      setLastFeedback(`💥 WICKET! ${shot.description}`);
    } else if (shot.outcome === 'SIX') {
      setRuns(prev => prev + 6);
      setScore(prev => prev + shot.points);
      pavilionAudio.playBoundaryCheer();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      setLastFeedback(`🚀 MAXIMUM 6 RUNS! ${shot.name} • ${shot.description}`);
    } else if (shot.outcome === 'FOUR') {
      setRuns(prev => prev + 4);
      setScore(prev => prev + shot.points);
      pavilionAudio.playWillowCrack();
      setLastFeedback(`✨ CRACKING 4 RUNS! ${shot.name} • ${shot.description}`);
    } else {
      setRuns(prev => prev + shot.runs);
      setScore(prev => prev + shot.points);
      pavilionAudio.playWillowCrack();
      setLastFeedback(`⚡ Good Running: 2 Runs taken.`);
    }

    // Advance to next delivery
    setCurrentDeliveryIndex((prev) => (prev + 1) % DELIVERIES.length);
  };

  const handleReset = () => {
    setCurrentDeliveryIndex(0);
    setScore(0);
    setRuns(0);
    setWickets(0);
    setBallsFaced(0);
    setLastFeedback(null);
  };

  return (
    <div className="pavilion-card p-6 md:p-8 rounded-lg relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#d4af37]/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-300" /> Interactive Pitch Simulator
          </span>
          <h3 className="font-serif-vintage text-2xl md:text-3xl text-[#f4efe6] font-bold mt-1">
            Sanjith's Masterclass Batting Challenge
          </h3>
          <p className="text-sm text-[#b8afa3] mt-1">
            Face express bowling. Pick the right shot with Sanjith's signature timing to rack up runs!
          </p>
        </div>

        {/* Live Mini Scoreboard */}
        <div className="flex items-center gap-4 bg-[#140e0b] px-4 py-2.5 rounded-xl border border-[#d4af37]/30 self-start md:self-auto">
          <div>
            <div className="text-[10px] text-[#a89f92] uppercase">Runs / Wkts</div>
            <div className="text-xl font-cinzel font-bold text-[#f4efe6]">
              {runs} / {wickets}
            </div>
          </div>
          <div className="h-8 w-px bg-[#d4af37]/20" />
          <div>
            <div className="text-[10px] text-[#a89f92] uppercase">Balls</div>
            <div className="text-xl font-cinzel font-bold text-amber-300">
              {ballsFaced}
            </div>
          </div>
          <div className="h-8 w-px bg-[#d4af37]/20" />
          <div>
            <div className="text-[10px] text-[#a89f92] uppercase">Maestro Points</div>
            <div className="text-xl font-cinzel font-bold text-emerald-400">
              {score}
            </div>
          </div>
          <button
            onClick={handleReset}
            title="Reset Game"
            className="p-1.5 rounded-lg bg-[#271d17] hover:bg-[#382a21] text-[#a89f92] hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Pitch Graphic & Incoming Ball */}
        <div className="lg:col-span-5 bg-[#16120e] p-6 rounded-xl border border-[#d4af37]/30 text-center relative overflow-hidden">
          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-[#581825] text-[10px] font-bold text-[#fef08a] border border-[#d4af37]/40">
            {currentDelivery.speed}
          </div>

          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-rose-700 flex items-center justify-center text-white shadow-xl border-2 border-amber-300/40 mb-3">
            <Flame className="w-8 h-8 text-amber-200" />
          </div>

          <div className="text-xs uppercase tracking-wider text-[#a89f92]">Bowler Approaching Crease</div>
          <h4 className="font-serif-vintage text-xl font-bold text-[#f4efe6] mt-1">
            {currentDelivery.name}
          </h4>

          <div className="mt-3 inline-block px-3 py-1 bg-[#221a14] rounded-full text-xs text-[#d4af37] border border-[#d4af37]/20">
            Length: <span className="font-semibold text-white">{currentDelivery.length}</span>
          </div>

          {/* Feedback Display */}
          {lastFeedback && (
            <div className="mt-5 p-3 rounded-lg bg-[#261c16] border border-[#d4af37]/30 text-xs text-[#fef08a] leading-relaxed">
              {lastFeedback}
            </div>
          )}
        </div>

        {/* Shot Selection Options */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Target className="w-4 h-4" /> Choose Sanjith's Response:
          </div>

          {currentDelivery.shotOptions.map((shot, idx) => (
            <button
              key={idx}
              onClick={() => handleShotSelection(shot)}
              className="w-full text-left p-4 rounded-xl bg-[#1b1511] hover:bg-[#251d17] border border-[#d4af37]/25 hover:border-[#d4af37] transition-all cursor-pointer group flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#581825] border border-[#d4af37]/40 flex items-center justify-center text-[10px] font-bold text-[#fef08a]">
                    {idx + 1}
                  </span>
                  <h5 className="font-serif-vintage text-sm md:text-base font-bold text-[#f4efe6] group-hover:text-[#facc15] transition-colors">
                    {shot.name}
                  </h5>
                </div>
                <p className="text-xs text-[#a89f92] mt-1.5 leading-relaxed pl-7">
                  {shot.description}
                </p>
              </div>

              <div className="text-right flex flex-col items-end">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  shot.outcome === 'SIX' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' :
                  shot.outcome === 'FOUR' ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/40' :
                  shot.outcome === 'TWO' ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {shot.outcome}
                </span>
                <span className="text-[11px] text-[#8e8578] mt-1">+{shot.points} pts</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
