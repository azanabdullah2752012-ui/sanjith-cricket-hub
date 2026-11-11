import React, { useState } from 'react';
import { Target, RotateCcw, Activity, Trophy, Flame, Sparkles } from 'lucide-react';
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
      { name: "Supersonic Wrist Helicopter Dig", description: "Flicks wrists at the point of impact, launching it over deep mid-wicket into the second tier", outcome: 'SIX', runs: 6, points: 280 },
      { name: "Full Vertical Face Blade Jam", description: "Deadens the thunderous pace directly into the turf, scrambles for 2 quick runs", outcome: 'TWO', runs: 2, points: 90 },
      { name: "Blind Pre-meditated Cross-Bat Swat", description: "Beaten by sheer velocity, off-stump uprooted and flying!", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "142 km/h Half-Volley Shaping Outwards",
    speed: "142 KM/H",
    length: "Full Outside Off",
    shotOptions: [
      { name: "Sanjith Trademark High-Elbow Cover Drive", description: "Head over ball, spine aligned, splits two diving boundary fielders for a majestic boundary", outcome: 'FOUR', runs: 4, points: 220 },
      { name: "Inside-Out Lofted Strike Over Extra Cover", description: "Carries high above the rope straight into the VIP pavilion", outcome: 'SIX', runs: 6, points: 300 },
      { name: "Chasing With Reaching Hands", description: "Thick outside edge carried directly to first slip", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "150 km/h Hostile Chin Bouncer",
    speed: "150 KM/H",
    length: "Short Pitch",
    shotOptions: [
      { name: "Controlled Rolling Hook Over Square Leg", description: "Rolls top wrist down to keep it soaring flat for a 95m maximum", outcome: 'SIX', runs: 6, points: 320 },
      { name: "Deliberate Upper-Cut Above Slips", description: "Uses bowler's extreme pace to glide it softly over the third-man boundary rope", outcome: 'FOUR', runs: 4, points: 200 },
      { name: "Unbalanced Panic Fend", description: "Gloves it straight into silly mid-off's waiting hands", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "118 km/h Deceptive Back-of-the-Hand Slower Ball",
    speed: "118 KM/H",
    length: "Good Length Off-Stump",
    shotOptions: [
      { name: "Patience Step & Straight Loft Over Bowler", description: "Waits back, holds the pose, and pumps it over long-on for a monumental six", outcome: 'SIX', runs: 6, points: 310 },
      { name: "Soft-Hand Push Through Mid-Wicket", description: "Reads the lack of pace, pierces the ring, walks 2 easy runs", outcome: 'TWO', runs: 2, points: 100 },
      { name: "Early Through The Shot Check-Drive", description: "Through the stroke way too early, leading edge straight up in the air", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "145 km/h Reverse-Swinging Full Delivery on Pads",
    speed: "145 KM/H",
    length: "Full on Leg Stump",
    shotOptions: [
      { name: "Sublime Whipped Flick Over Deep Mid-Wicket", description: "Effortless wrist snap, picking the ball off middle stump and sending it 90m back", outcome: 'SIX', runs: 6, points: 290 },
      { name: "Glance Through Fine Leg Gap", description: "Delicate touch off hip, beats the diving short fine leg to the boundary", outcome: 'FOUR', runs: 4, points: 210 },
      { name: "Playing Around The Front Pad", description: "Trapped in front, loud appeal from all 11 fielders, umpire raises finger", outcome: 'WICKET', runs: 0, points: -50 }
    ]
  },
  {
    name: "92 km/h Loopy Leg-Break Turning Sharply",
    speed: "92 KM/H",
    length: "Tempting Flight Outside Off",
    shotOptions: [
      { name: "Skipper Charge Down The Pitch & Inside-Out Drive", description: "Dances down to the pitch of the turn, lofts with authority over covers into the stands", outcome: 'SIX', runs: 6, points: 330 },
      { name: "Rocking Back Square Cut", description: "Sees the turn, rocks onto back foot, punches crisply past point for four", outcome: 'FOUR', runs: 4, points: 230 },
      { name: "Lunging Forward Blindly", description: "Beaten by the drift and turn, keeper whips off bails in 0.08 seconds!", outcome: 'WICKET', runs: 0, points: -50 }
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
  const [milestone, setMilestone] = useState<string | null>(null);

  const delivery = DELIVERIES[index];

  const handleShot = (shot: DeliveryType['shotOptions'][0]) => {
    const nextBalls = balls + 1;
    setBalls(nextBalls);

    if (shot.outcome === 'WICKET') {
      const nextWickets = wickets + 1;
      setWickets(nextWickets);
      pavilionAudio.playStumpClatter();
      setFeedback(`🔴 TIMBER! ${shot.description}`);
    } else {
      const nextRuns = runs + shot.runs;
      const nextScore = score + shot.points;
      setRuns(nextRuns);
      setScore(nextScore);

      // Milestone celebrations
      if (runs < 50 && nextRuns >= 50) {
        setMilestone("🎉 50 UP! HALF-CENTURY FOR SKIPPER SANJITH! The entire stadium rises in applause!");
        pavilionAudio.playApplause(3.5);
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#1c1917', '#b45309', '#f5f2eb']
        });
      } else if (runs < 100 && nextRuns >= 100) {
        setMilestone("🏆 100*! THE BIRTHDAY CENTURY! Sanjith removes his helmet, raises the bat to thunderous cheers!");
        pavilionAudio.playBoundaryCheer();
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.4 },
          colors: ['#b45309', '#d97706', '#1c1917', '#ffffff']
        });
      }

      if (shot.outcome === 'SIX') {
        pavilionAudio.playBoundaryCheer();
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#1c1917', '#78716c', '#ece7de']
        });
        setFeedback(`✦ 98m MAXIMUM! ${shot.name}`);
      } else if (shot.outcome === 'FOUR') {
        pavilionAudio.playWillowCrack();
        setFeedback(`✦ RAZOR BOUNDARY! ${shot.name}`);
      } else {
        pavilionAudio.playWillowCrack();
        setFeedback(`✦ QUICK RUNS: 2 runs added to the tally.`);
      }
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
    setMilestone(null);
  };

  const strikeRate = balls > 0 ? ((runs / balls) * 100).toFixed(1) : '0.0';

  return (
    <div className="ald-card p-6 md:p-10 rounded-3xl relative overflow-hidden bg-white border border-[#ded7cb] shadow-sm">
      {/* Header & HUD */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-[#ded7cb] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold">
              LIVE SIMULATION • SANJITH AT THE CREASE
            </span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
            Chasing The Century • Face Hostile Pace & Spin
          </h3>
          <p className="text-sm text-[#78716c] mt-1">
            Read the line and length, choose your stroke, and dispatch every ball into the stands.
          </p>
        </div>

        {/* Live Score HUD */}
        <div className="flex items-center gap-3 sm:gap-4 bg-[#ece7de] px-4 py-2.5 rounded-2xl border border-[#ded7cb]">
          <div>
            <span className="text-[10px] text-[#78716c] uppercase font-bold block">RUNS</span>
            <span className="text-lg font-bold text-[#1c1917]">{runs} <span className="text-xs text-[#78716c]">({wickets} wkt)</span></span>
          </div>
          <div className="h-7 w-px bg-[#ded7cb]" />
          <div>
            <span className="text-[10px] text-[#78716c] uppercase font-bold block">BALLS</span>
            <span className="text-lg font-bold text-[#1c1917]">{balls}</span>
          </div>
          <div className="h-7 w-px bg-[#ded7cb]" />
          <div>
            <span className="text-[10px] text-[#78716c] uppercase font-bold block">STRIKE RATE</span>
            <span className="text-lg font-bold text-amber-700">{strikeRate}</span>
          </div>
          <div className="h-7 w-px bg-[#ded7cb]" />
          <div>
            <span className="text-[10px] text-[#78716c] uppercase font-bold block">POINTS</span>
            <span className="text-lg font-bold text-[#1c1917]">{score}</span>
          </div>
          <button
            onClick={handleReset}
            title="Reset Innings"
            className="p-1.5 rounded-lg bg-white hover:bg-[#ded7cb] text-[#78716c] hover:text-[#1c1917] transition-colors cursor-pointer border border-[#ded7cb] ml-1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Milestone Notification Banner */}
      {milestone && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-sm font-semibold flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{milestone}</span>
          </div>
          <button
            onClick={() => setMilestone(null)}
            className="text-xs text-amber-700 hover:text-amber-900 underline cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Incoming Ball Card */}
        <div className="lg:col-span-5 bg-[#f7f5f0] p-6 rounded-2xl border border-[#ded7cb] text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-[#78716c] font-mono font-semibold">SPEED RADAR</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1c1917] text-[#f5f2eb] font-bold font-mono">
              {delivery.speed}
            </span>
          </div>

          <div className="w-16 h-16 mx-auto rounded-full bg-[#ece7de] flex items-center justify-center border border-[#ded7cb] my-3">
            <Activity className="w-8 h-8 text-[#1c1917]" />
          </div>

          <div className="text-[11px] text-[#78716c] uppercase tracking-wider font-bold">INCOMING DELIVERY #{((balls % DELIVERIES.length) + 1)}</div>
          <h4 className="font-editorial text-xl font-bold text-[#1c1917] mt-1">
            {delivery.name}
          </h4>

          <div className="mt-3 inline-block px-3 py-1 bg-white rounded-full text-xs text-[#78716c] border border-[#ded7cb]">
            CORRIDOR: <span className="font-bold text-[#1c1917]">{delivery.length}</span>
          </div>

          {feedback && (
            <div className="mt-5 p-3.5 rounded-xl bg-white border border-[#ded7cb] text-xs text-[#1c1917] text-left leading-relaxed shadow-sm">
              {feedback}
            </div>
          )}
        </div>

        {/* Shot Selection Options */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs uppercase tracking-wider text-[#1c1917] font-bold flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-amber-600" /> SELECT SKIPPER SANJITH'S RESPONSE:
          </div>

          {delivery.shotOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleShot(opt)}
              className="w-full text-left p-4 rounded-2xl bg-[#f7f5f0] hover:bg-[#ece7de] border border-[#ded7cb] hover:border-[#1c1917] transition-all cursor-pointer group flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#78716c] font-mono font-bold">
                    0{i + 1}.
                  </span>
                  <h5 className="font-editorial text-base font-bold text-[#1c1917] group-hover:text-amber-800 transition-colors">
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
                  opt.outcome === 'FOUR' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                  opt.outcome === 'TWO' ? 'bg-white text-[#1c1917] border-[#ded7cb]' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {opt.outcome}
                </span>
                <span className="text-[10px] text-[#78716c] mt-1 font-mono font-semibold">+{opt.points} PTS</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
