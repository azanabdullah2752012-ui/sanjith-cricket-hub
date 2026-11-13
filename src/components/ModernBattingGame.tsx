import React, { useState } from 'react';
import { Target, RotateCcw, Activity, Trophy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DeliveryType {
  name: string;
  speed: string;
  length: string;
  bowler: string;
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
    name: "150 km/h Mitchell Starc Inswinging Missile",
    speed: "150 KM/H",
    length: "Blockhole Toe-Crusher",
    bowler: "Mitchell Starc",
    shotOptions: [
      { 
        name: "Sanjith Signature Sublime Wrist Flick", 
        description: "Flicks wrists with surgical timing off his toes, sending Starc's 150k missile 98m into the mid-wicket crowd!", 
        outcome: 'SIX', 
        runs: 6, 
        points: 350 
      },
      { 
        name: "The Legendary Shoelace Tie at the Crease", 
        description: "Bends down to tie shoelaces mid-delivery! Ball misses the batsman, nutmegs the keeper, and races to the boundary!", 
        outcome: 'FOUR', 
        runs: 4, 
        points: 250 
      },
      { 
        name: "Cross-Bat Swat Against Starc Pace", 
        description: "Late on the 150k lightning pace, off-stump cartwheels out of the ground!", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
    ]
  },
  {
    name: "145 km/h Hostile Length Ball on Off (Haris Rauf Melbourne Scenario)",
    speed: "145 KM/H",
    length: "Back of a Length",
    bowler: "Haris Rauf",
    shotOptions: [
      { 
        name: "King Kohli Melbourne Back-Foot Straight Loft", 
        description: "Punches off back foot with high elbows straight back over the bowler's head into the MCG grandstand!", 
        outcome: 'SIX', 
        runs: 6, 
        points: 340 
      },
      { 
        name: "Sanjith Trademark Wrist Flick Off Hip", 
        description: "Soft hands, rolls the wrists, pierces square leg and deep mid-wicket for a razor four", 
        outcome: 'FOUR', 
        runs: 4, 
        points: 220 
      },
      { 
        name: "Blind Slog Outside Off", 
        description: "Thick outside edge carried cleanly to first slip", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
    ]
  },
  {
    name: "142 km/h Searing Yorker on Middle Stump (Final Over Defense)",
    speed: "142 KM/H",
    length: "Laser Blockhole",
    bowler: "Death Overs Specialist",
    shotOptions: [
      { 
        name: "Sanjith Helicopter Wrist Snap", 
        description: "Digs underneath the dipping yorker with pure forearm power, launching it over long-on for a maximum", 
        outcome: 'SIX', 
        runs: 6, 
        points: 310 
      },
      { 
        name: "Vertical Blade Jam & Scramble", 
        description: "Deadens the thunderous pace directly into the turf, hustles for 2 clutch runs", 
        outcome: 'TWO', 
        runs: 2, 
        points: 100 
      },
      { 
        name: "Planting Front Foot Blindly", 
        description: "Plumb in front! Roaring LBW appeal, umpire raises the finger", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
    ]
  },
  {
    name: "149 km/h Fiery Chin Bouncer (Ben Stokes Headingley Atmosphere)",
    speed: "149 KM/H",
    length: "Aggressive Short Pitch",
    bowler: "Pat Cummins",
    shotOptions: [
      { 
        name: "Stokes-Inspired Ramp Over Keeper's Helmet", 
        description: "Arching back, uses 149k pace to glide the ball softly over the third-man boundary rope", 
        outcome: 'FOUR', 
        runs: 4, 
        points: 240 
      },
      { 
        name: "Controlled Rolling Hook Over Deep Square Leg", 
        description: "Rolls top wrist down to keep it soaring flat for a thunderous 95m maximum", 
        outcome: 'SIX', 
        runs: 6, 
        points: 330 
      },
      { 
        name: "Awkward Chest Fend", 
        description: "Gloves it straight into silly mid-off's waiting hands", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
    ]
  },
  {
    name: "116 km/h Back-of-the-Hand Deceptive Slower Ball",
    speed: "116 KM/H",
    length: "Good Length Outside Off",
    bowler: "RCB Death Master",
    shotOptions: [
      { 
        name: "Skipper Sanjith Patience Step & Straight Launch", 
        description: "Waits back, holds the pose, and pumps it high over long-off into the second tier", 
        outcome: 'SIX', 
        runs: 6, 
        points: 320 
      },
      { 
        name: "Soft-Hand Push Through Extra Cover Gap", 
        description: "Reads the lack of pace, pierces the ring, walks 2 easy runs", 
        outcome: 'TWO', 
        runs: 2, 
        points: 100 
      },
      { 
        name: "Through The Shot Way Too Early", 
        description: "Leading edge skies straight up into the clouds, keeper takes an easy catch", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
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
      setFeedback(`🔴 OUT! ${shot.description}`);
    } else {
      const nextRuns = runs + shot.runs;
      const nextScore = score + shot.points;
      setRuns(nextRuns);
      setScore(nextScore);

      // Milestone celebrations
      if (runs < 50 && nextRuns >= 50) {
        setMilestone("🎉 50 UP! HALF-CENTURY FOR SKIPPER SANJITH! The entire RCB pavilion rises in ovation!");
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#dc2626', '#b45309', '#1c1917', '#f5f2eb']
        });
      } else if (runs < 100 && nextRuns >= 100) {
        setMilestone("🏆 100*! THE BIRTHDAY CENTURY! Sanjith removes his helmet, raises the willow to the crowd!");
        confetti({
          particleCount: 220,
          spread: 120,
          origin: { y: 0.4 },
          colors: ['#dc2626', '#b45309', '#d97706', '#1c1917', '#ffffff']
        });
      }

      if (shot.outcome === 'SIX') {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#dc2626', '#b45309', '#1c1917']
        });
        setFeedback(`✦ 98m MAXIMUM! ${shot.name}`);
      } else if (shot.outcome === 'FOUR') {
        setFeedback(`✦ RAZOR BOUNDARY! ${shot.name}`);
      } else {
        setFeedback(`✦ CLUTCH RUNS: 2 runs added to the tally.`);
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
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span className="text-xs uppercase tracking-widest text-red-800 font-bold">
              CAPTAIN SANJITH (#10) AT THE CREASE • RCB BATTING CHASE
            </span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
            Chasing The Birthday Century • Face Starc & Express Pace
          </h3>
          <p className="text-sm text-[#78716c] mt-1">
            Read line and length, execute Sanjith's signature wrist flick, or channel King Kohli's Melbourne straight lift.
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
            <span className="text-lg font-bold text-red-700">{strikeRate}</span>
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
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-300 text-red-900 text-sm font-semibold flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-red-600 shrink-0" />
            <span>{milestone}</span>
          </div>
          <button
            onClick={() => setMilestone(null)}
            className="text-xs text-red-700 hover:text-red-900 underline cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Incoming Ball Card */}
        <div className="lg:col-span-5 bg-[#f7f5f0] p-6 rounded-2xl border border-[#ded7cb] text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-red-700 font-mono font-bold bg-red-100 px-2 py-0.5 rounded">BOWLER: {delivery.bowler}</span>
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
            ZONE: <span className="font-bold text-[#1c1917]">{delivery.length}</span>
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
            <Target className="w-4 h-4 text-red-600" /> SELECT SKIPPER SANJITH'S RESPONSE:
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
                  <h5 className="font-editorial text-base font-bold text-[#1c1917] group-hover:text-red-700 transition-colors">
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
                  opt.outcome === 'FOUR' ? 'bg-red-100 text-red-900 border-red-300' :
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
