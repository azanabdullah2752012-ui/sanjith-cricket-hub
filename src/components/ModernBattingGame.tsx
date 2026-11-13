import React, { useState } from 'react';
import { Target, RotateCcw, Activity, Trophy } from 'lucide-react';
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
    name: "150 km/h Fast Inswinging Yorker",
    speed: "150 KM/H",
    length: "Right at your toes",
    bowler: "Mitchell Starc",
    shotOptions: [
      { 
        name: "Sanjith's Signature Wrist Flick", 
        description: "Flick your wrists off your toes and send it 98 meters into the crowd for SIX!", 
        outcome: 'SIX', 
        runs: 6, 
        points: 300 
      },
      { 
        name: "Tie Your Shoelaces Right Now 😂", 
        description: "You bend down to tie your shoes! The ball misses you, nutmegs the keeper, and races for 4!", 
        outcome: 'FOUR', 
        runs: 4, 
        points: 250 
      },
      { 
        name: "Wild Slog Across the Line", 
        description: "Way too late on 150 km/h pace! Middle stump goes flying out of the ground.", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
    ]
  },
  {
    name: "145 km/h Bouncer Outside Off",
    speed: "145 KM/H",
    length: "Chest-high bouncer",
    bowler: "Haris Rauf",
    shotOptions: [
      { 
        name: "King Kohli Straight Six (Melbourne Style)", 
        description: "Punch it off the back foot straight over the bowler’s head for a huge SIX!", 
        outcome: 'SIX', 
        runs: 6, 
        points: 320 
      },
      { 
        name: "Crisp Flick Behind Square", 
        description: "Roll the wrists and guide the ball through the gap for a clean four.", 
        outcome: 'FOUR', 
        runs: 4, 
        points: 200 
      },
      { 
        name: "Blind Swing with Eyes Closed", 
        description: "Big edge straight into the keeper's gloves. You're out!", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
    ]
  },
  {
    name: "142 km/h Straight Fast Yorker",
    speed: "142 KM/H",
    length: "Base of middle stump",
    bowler: "Death Overs Bowler",
    shotOptions: [
      { 
        name: "Helicopter Shot", 
        description: "Dig it out with quick wrists and launch it high over long-on for a MAXIMUM!", 
        outcome: 'SIX', 
        runs: 6, 
        points: 310 
      },
      { 
        name: "Block Straight Down and Run 2", 
        description: "Solid straight bat into the grass, sprint fast and steal 2 runs.", 
        outcome: 'TWO', 
        runs: 2, 
        points: 100 
      },
      { 
        name: "Step Across Stumps", 
        description: "Trapped right in front of the stumps! Umpire raises the finger: OUT LBW.", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
    ]
  },
  {
    name: "148 km/h Short Pitch Chin Music",
    speed: "148 KM/H",
    length: "Short ball at your helmet",
    bowler: "Pat Cummins",
    shotOptions: [
      { 
        name: "Ben Stokes Ramp Over Keeper", 
        description: "Arch your back, use the bowler's speed, and flip it over the keeper for 4 runs!", 
        outcome: 'FOUR', 
        runs: 4, 
        points: 220 
      },
      { 
        name: "Pull Shot Into Mid-Wicket", 
        description: "Rock back on your heels and pull it flat into the stands for SIX!", 
        outcome: 'SIX', 
        runs: 6, 
        points: 300 
      },
      { 
        name: "Panic Poke", 
        description: "Ball hits the handle of the bat and pops up for an easy catch.", 
        outcome: 'WICKET', 
        runs: 0, 
        points: -50 
      }
    ]
  },
  {
    name: "115 km/h Slower Ball",
    speed: "115 KM/H",
    length: "Tempting full toss",
    bowler: "Death Overs Master",
    shotOptions: [
      { 
        name: "Wait Back and Smash Over Long-On", 
        description: "Spot the slower ball early, wait for it, and smash it into the top tier for SIX!", 
        outcome: 'SIX', 
        runs: 6, 
        points: 310 
      },
      { 
        name: "Soft Touch for 2 Runs", 
        description: "Tap it gently into the vacant field and jog an easy two.", 
        outcome: 'TWO', 
        runs: 2, 
        points: 100 
      },
      { 
        name: "Swing Way Too Early", 
        description: "Tricked by the slow pace! Skied high into the air and caught.", 
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
        setMilestone("🎉 50 RUNS! Half-century for Sanjith! Great batting skipper!");
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#dc2626', '#d97706', '#f8fafc', '#ef4444']
        });
      } else if (runs < 100 && nextRuns >= 100) {
        setMilestone("🏆 100* RUNS! CENTURY FOR SANJITH! Take a bow, what an innings!");
        confetti({
          particleCount: 220,
          spread: 120,
          origin: { y: 0.4 },
          colors: ['#dc2626', '#d97706', '#f8fafc', '#ffffff']
        });
      }

      if (shot.outcome === 'SIX') {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#dc2626', '#d97706', '#f8fafc']
        });
        setFeedback(`💥 HUGE SIX! ${shot.name}`);
      } else if (shot.outcome === 'FOUR') {
        setFeedback(`⚡ FOUR RUNS! ${shot.name}`);
      } else {
        setFeedback(`🏃 2 RUNS! Good running between the wickets.`);
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
    <div className="ald-card p-6 md:p-10 rounded-xl relative overflow-hidden bg-[#16181d] border border-white/[0.08] shadow-xl">
      {/* Header & Scoreboard */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold">
              SANJITH (#10) AT BAT
            </span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl text-white font-bold tracking-tight">
            Face The Bowler • Pick Your Shot
          </h3>
          <p className="text-sm text-[#94a3b8] mt-1">
            Read where the ball is coming, pick your shot, and score as many runs as you can!
          </p>
        </div>

        {/* Clean Modern Scorecard */}
        <div className="flex items-center gap-3 sm:gap-4 bg-[#121317] px-4 py-2.5 rounded-lg border border-white/[0.08]">
          <div>
            <span className="text-[10px] text-[#64748b] uppercase font-bold block">RUNS</span>
            <span className="text-lg font-bold text-white">{runs} <span className="text-xs text-[#94a3b8]">({wickets} out)</span></span>
          </div>
          <div className="h-7 w-px bg-white/[0.08]" />
          <div>
            <span className="text-[10px] text-[#64748b] uppercase font-bold block">BALLS</span>
            <span className="text-lg font-bold text-white">{balls}</span>
          </div>
          <div className="h-7 w-px bg-white/[0.08]" />
          <div>
            <span className="text-[10px] text-[#64748b] uppercase font-bold block">STRIKE RATE</span>
            <span className="text-lg font-bold text-red-400">{strikeRate}</span>
          </div>
          <div className="h-7 w-px bg-white/[0.08]" />
          <div>
            <span className="text-[10px] text-[#64748b] uppercase font-bold block">POINTS</span>
            <span className="text-lg font-bold text-white">{score}</span>
          </div>
          <button
            onClick={handleReset}
            title="Start Over"
            className="p-1.5 rounded-lg bg-[#1a1b22] hover:bg-[#252834] text-[#94a3b8] hover:text-white transition-colors cursor-pointer border border-white/[0.08] ml-1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Century / Half Century Alert */}
      {milestone && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-semibold flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-red-400 shrink-0" />
            <span>{milestone}</span>
          </div>
          <button
            onClick={() => setMilestone(null)}
            className="text-xs text-red-400 hover:text-red-300 underline cursor-pointer shrink-0"
          >
            Close
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Incoming Ball Card */}
        <div className="lg:col-span-5 bg-[#121317] p-6 rounded-lg border border-white/[0.06] text-center relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-red-400 font-bold bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
              Bowler: {delivery.bowler}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.08] text-white font-bold">
              {delivery.speed}
            </span>
          </div>

          <div className="w-16 h-16 mx-auto rounded-full bg-[#1a1b22] flex items-center justify-center border border-white/[0.08] my-3">
            <Activity className="w-8 h-8 text-white" />
          </div>

          <div className="text-[11px] text-[#64748b] uppercase tracking-wider font-bold">BALL #{((balls % DELIVERIES.length) + 1)}</div>
          <h4 className="font-editorial text-xl font-bold text-white mt-1">
            {delivery.name}
          </h4>

          <div className="mt-3 inline-block px-3 py-1 bg-[#1a1b22] rounded-full text-xs text-[#94a3b8] border border-white/[0.06]">
            Where it lands: <span className="font-bold text-white">{delivery.length}</span>
          </div>

          {feedback && (
            <div className="mt-5 p-3.5 rounded-xl bg-[#1a1b22] border border-white/[0.08] text-xs text-white text-left leading-relaxed shadow-sm font-medium">
              {feedback}
            </div>
          )}
        </div>

        {/* Shot Selection Options */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-red-500" /> CHOOSE YOUR SHOT:
          </div>

          {delivery.shotOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleShot(opt)}
              className="w-full text-left p-4 rounded-lg bg-[#121317] hover:bg-[#1a1b22] border border-white/[0.06] hover:border-red-500/40 transition-all cursor-pointer group flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#64748b] font-bold">
                    #{i + 1}
                  </span>
                  <h5 className="font-editorial text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    {opt.name}
                  </h5>
                </div>
                <p className="text-xs text-[#94a3b8] mt-1 pl-5 leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="text-right flex flex-col items-end shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  opt.outcome === 'SIX' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                  opt.outcome === 'FOUR' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                  opt.outcome === 'TWO' ? 'bg-white/10 text-white border-white/20' :
                  'bg-red-950/40 text-red-400 border-red-800/40'
                }`}>
                  {opt.outcome === 'SIX' ? '6 RUNS' : opt.outcome === 'FOUR' ? '4 RUNS' : opt.outcome === 'TWO' ? '2 RUNS' : 'OUT'}
                </span>
                <span className="text-[10px] text-[#64748b] mt-1 font-bold">+{opt.points} pts</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
