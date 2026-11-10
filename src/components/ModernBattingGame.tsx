import React, { useState } from 'react';
import { Target, RotateCcw, Activity } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface DeliveryType {
  name: string;
  speed: string;
  length: string;
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
    name: "148 km/h Searing Yorker on Middle Stump",
    speed: "148 KM/H",
    length: "Blockhole",
    shotOptions: [
      { name: "Supersonic Wrist Helicopter Dig", description: "Flicks wrists at the point of impact, launching it over deep mid-wicket", outcome: 'SIX', runs: 6, points: 250 },
      { name: "Full Vertical Face Blade Jam", description: "Deadens the thunderous pace directly into the turf, steals 2", outcome: 'TWO', runs: 2, points: 80 },
      { name: "Blind Pre-meditated Cross-Bat Swat", description: "Beaten by sheer velocity, stumps uprooted", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "142 km/h Half-Volley Shaping Outwards",
    speed: "142 KM/H",
    length: "Full Outside Off",
    shotOptions: [
      { name: "Sanjith Trademark High-Elbow Cover Drive", description: "Head over ball, spine aligned, splits two diving boundary fielders", outcome: 'FOUR', runs: 4, points: 200 },
      { name: "Inside-Out Lofted Strike Over Extra Cover", description: "Carries high above the rope straight into the pavilion", outcome: 'SIX', runs: 6, points: 280 },
      { name: "Chasing With Reaching Hands", description: "Thick outside edge carried to keeper", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "150 km/h Hostile Chin Bouncer",
    speed: "150 KM/H",
    length: "Short Pitch",
    shotOptions: [
      { name: "Controlled Rolling Hook Over Square Leg", description: "Rolls top wrist down to keep it soaring flat for a 95m maximum", outcome: 'SIX', runs: 6, points: 300 },
      { name: "Deliberate Ramp Above Slips", description: "Uses bowler's extreme speed to glide it over third man rope", outcome: 'FOUR', runs: 4, points: 190 },
      { name: "Unbalanced Panic Fend", description: "Gloves it straight into silly mid-off", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  }
];

export const ModernBattingGame: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const delivery = DELIVERIES[index];

  const handleShot = (shot: DeliveryType['shotOptions'][0]) => {
    setBalls(prev => prev + 1);

    if (shot.outcome === 'WICKET') {
      setWickets(prev => prev + 1);
      pavilionAudio.playStumpClatter();
      setFeedback(`🔴 TIMBER! ${shot.description}`);
    } else if (shot.outcome === 'SIX') {
      setRuns(prev => prev + 6);
      setScore(prev => prev + shot.points);
      pavilionAudio.playBoundaryCheer();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#1c1917', '#78716c', '#ece7de']
      });
      setFeedback(`✦ 98m MAXIMUM! ${shot.name}`);
    } else if (shot.outcome === 'FOUR') {
      setRuns(prev => prev + 4);
      setScore(prev => prev + shot.points);
      pavilionAudio.playWillowCrack();
      setFeedback(`✦ RAZOR BOUNDARY! ${shot.name}`);
    } else {
      setRuns(prev => prev + 2);
      setScore(prev => prev + shot.points);
      pavilionAudio.playWillowCrack();
      setFeedback(`✦ QUICK RUNS: 2 runs added to total.`);
    }

    setIndex(prev => (prev + 1) % DELIVERIES.length);
  };

  const handleReset = () => {
    setIndex(0);
    setScore(0);
    setRuns(0);
    setWickets(0);
    setBalls(0);
    setFeedback(null);
  };

  return (
    <div className="ald-card p-6 md:p-10 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#ded7cb] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold">
              SIMULATION ENGINE • SHOT EXECUTION
            </span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
            The Pitch Battle • Face Express Bowling
          </h3>
          <p className="text-sm text-[#78716c] mt-1">
            Pick Sanjith's stroke with razor timing against hostile pace to chase down the target.
          </p>
        </div>

        {/* Live Score HUD */}
        <div className="flex items-center gap-4 bg-[#ece7de] px-4 py-2 rounded-xl border border-[#ded7cb]">
          <div>
            <span className="text-[10px] text-[#78716c] uppercase block">SCORE</span>
            <span className="text-base font-bold text-[#1c1917]">{runs} / {wickets}</span>
          </div>
          <div className="h-6 w-px bg-[#ded7cb]" />
          <div>
            <span className="text-[10px] text-[#78716c] uppercase block">BALLS</span>
            <span className="text-base font-bold text-[#1c1917]">{balls}</span>
          </div>
          <div className="h-6 w-px bg-[#ded7cb]" />
          <div>
            <span className="text-[10px] text-[#78716c] uppercase block">MAESTRO PTS</span>
            <span className="text-base font-bold text-[#1c1917]">{score}</span>
          </div>
          <button
            onClick={handleReset}
            title="Reset Game"
            className="p-1 rounded-md bg-white hover:bg-[#ded7cb] text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer border border-[#ded7cb]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Incoming Ball Card */}
        <div className="lg:col-span-5 bg-[#f7f5f0] p-6 rounded-xl border border-[#ded7cb] text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#78716c] font-mono">SPEED GUN</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1c1917] text-[#f5f2eb] font-bold font-mono">
              {delivery.speed}
            </span>
          </div>

          <div className="w-16 h-16 mx-auto rounded-full bg-[#ece7de] flex items-center justify-center border border-[#ded7cb] my-2">
            <Activity className="w-8 h-8 text-[#1c1917]" />
          </div>

          <div className="text-[11px] text-[#78716c] uppercase mt-2 font-medium">DELIVERY TRAJECTORY</div>
          <h4 className="font-editorial text-xl font-bold text-[#1c1917] mt-0.5">
            {delivery.name}
          </h4>

          <div className="mt-3 inline-block px-3 py-1 bg-white rounded-full text-xs text-[#78716c] border border-[#ded7cb]">
            LENGTH: <span className="font-bold text-[#1c1917]">{delivery.length}</span>
          </div>

          {feedback && (
            <div className="mt-4 p-3 rounded-lg bg-white border border-[#ded7cb] text-xs text-[#1c1917] text-left leading-relaxed">
              {feedback}
            </div>
          )}
        </div>

        {/* Shot Selection */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs uppercase tracking-wider text-[#1c1917] font-bold flex items-center gap-2 mb-2">
            <Target className="w-4 h-4" /> SELECT BATSMAN RESPONSE:
          </div>

          {delivery.shotOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleShot(opt)}
              className="w-full text-left p-4 rounded-xl bg-[#f7f5f0] hover:bg-[#ece7de] border border-[#ded7cb] hover:border-[#1c1917] transition-all cursor-pointer group flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#78716c] font-mono font-bold">
                    0{i + 1}.
                  </span>
                  <h5 className="font-editorial text-base font-bold text-[#1c1917]">
                    {opt.name}
                  </h5>
                </div>
                <p className="text-xs text-[#78716c] mt-1 pl-6 leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="text-right flex flex-col items-end shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  opt.outcome === 'SIX' ? 'bg-[#1c1917] text-[#f5f2eb] border-[#1c1917]' :
                  opt.outcome === 'FOUR' ? 'bg-white text-[#1c1917] border-[#ded7cb]' :
                  opt.outcome === 'TWO' ? 'bg-[#ece7de] text-[#1c1917] border-[#ded7cb]' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {opt.outcome}
                </span>
                <span className="text-[10px] text-[#78716c] mt-1 font-mono">+{opt.points} PTS</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
