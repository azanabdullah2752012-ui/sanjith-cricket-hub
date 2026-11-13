import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Flame, 
  Trophy, 
  Send, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  Play, 
  RotateCcw,
  Zap
} from 'lucide-react';

export function App() {
  // Batting game interactive state
  const [currentBall, setCurrentBall] = useState(0);
  const [score, setScore] = useState(18);
  const [wickets, setWickets] = useState(0);
  const [lastCommentary, setLastCommentary] = useState('Mitchell Starc is marking his run-up. 6 runs needed off the final over!');
  const [isGameOver, setIsGameOver] = useState(false);

  // Field setup interactive state (11 positions)
  const [activeFielder, setActiveFielder] = useState<string>('Long-on');

  // Guestbook state
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: 'Azan',
      tag: 'Opening Partner',
      text: 'Happy Birthday Sanjith! Another year, another century in the game of life. Nobody whips the flick shot off their pads like you bro. Keep leading from the front!'
    },
    {
      id: 2,
      author: 'The Dressing Room Boys',
      tag: 'RCB Squad XI',
      text: 'To our skipper: may this year bring endless maximums, toe-crushing yorkers, and zero run-outs while tying shoelaces! Play Bold!'
    }
  ]);
  const [authorInput, setAuthorInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#dc2626', '#eab308', '#ffffff', '#000000']
    });
  };

  const handleShot = (type: 'flick' | 'yorker_block' | 'shoelace') => {
    if (isGameOver) return;

    if (type === 'flick') {
      setScore(s => s + 6);
      setLastCommentary('BOOM! Sanjith whips it off his pads with that trademark wrist flick—102 meters into the Chinnaswamy second tier! SIX RUNS!');
      triggerConfetti();
    } else if (type === 'yorker_block') {
      setScore(s => s + 2);
      setLastCommentary('CLANG! 148 km/h Mitchell Starc laser yorker jammed out into the covers! Scurries back for two runs.');
    } else if (type === 'shoelace') {
      setWickets(w => w + 0);
      setLastCommentary('LEGENDARY! You bent down to tie your shoelaces! The ball whistles past your ear for four bye runs while shoes stay 100% tied!');
    }

    if (currentBall >= 5) {
      setIsGameOver(true);
    } else {
      setCurrentBall(b => b + 1);
    }
  };

  const resetGame = () => {
    setCurrentBall(0);
    setScore(18);
    setWickets(0);
    setLastCommentary('Mitchell Starc is marking his run-up. 6 runs needed off the final over!');
    setIsGameOver(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorInput.trim() || !noteInput.trim()) return;

    setNotes(prev => [
      {
        id: Date.now(),
        author: authorInput.trim(),
        tag: 'Match Day VIP',
        text: noteInput.trim()
      },
      ...prev
    ]);
    setAuthorInput('');
    setNoteInput('');
    setPostSuccess(true);
    triggerConfetti();
    setTimeout(() => setPostSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-stone-100 font-sans selection:bg-red-600 selection:text-white">
      {/* 1. TOP TICKER STRIP */}
      <div className="bg-red-600 text-stone-950 px-4 py-1.5 text-xs font-black tracking-widest uppercase flex items-center justify-between border-b-2 border-stone-950 select-none overflow-x-auto">
        <div className="flex items-center gap-3 shrink-0">
          <span className="bg-stone-950 text-white px-2 py-0.5 text-[10px]">BREAKING</span>
          <span>ROYAL CHALLENGERS BENGALURU • SANJITH #10 BIRTHDAY TEST SPECIAL</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono shrink-0">
          <span>VENUE: M. CHINNASWAMY</span>
          <span>STATUS: 100* NOT OUT</span>
          <span>TARGET: UNLIMITED</span>
        </div>
      </div>

      {/* 2. THE EDITORIAL MASTHEAD */}
      <header className="border-b-4 border-stone-900 bg-[#0c0d12] px-4 sm:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-red-500 uppercase">
              <span className="w-2.5 h-2.5 bg-red-600 inline-block" />
              SPECIAL BIRTHDAY EDITION // 12TH MAN ARMY
            </div>
            <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase leading-none">
              CAPTAIN <span className="text-red-600">SANJITH</span>
            </h1>
            <p className="text-stone-400 text-sm sm:text-base max-w-xl font-medium">
              The official squad record for the boy who defends King Kohli with his life, bowls 148k Starc yorkers at the death, and secures his shoelaces under live fire.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="bg-[#14151e] border-2 border-stone-800 p-4 text-center">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">JERSEY NUMBER</div>
              <div className="font-editorial text-5xl font-black text-white leading-none mt-1">#10</div>
            </div>
            <button
              onClick={triggerConfetti}
              className="bg-red-600 hover:bg-red-500 text-white font-black text-sm px-6 py-4 uppercase tracking-wider border-2 border-red-400 shadow-[4px_4px_0px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>POP CONFETTI 🎉</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. MAIN SCORECARD / PLAYER DOSSIER (NEWSPAPER BROADHEET STYLE) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        {/* BIG NUMBERS SCOREBOARD */}
        <div className="border-4 border-stone-800 bg-[#0f1017] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-stone-800 gap-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h2 className="font-editorial text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                Official Career Scorecard
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-400 bg-stone-900 px-3 py-1 border border-stone-800">
              VERIFIED SQUAD FOLKLORE
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
            <div className="p-4 bg-[#141620] border-2 border-stone-800">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">ROLE IN THE XI</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">ALL-ROUNDER</div>
              <div className="text-xs text-red-500 font-bold mt-1">First Name on Teamsheet</div>
            </div>

            <div className="p-4 bg-[#141620] border-2 border-stone-800">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">IPL ALLIANCE</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">RCB 💥</div>
              <div className="text-xs text-yellow-500 font-bold mt-1">12th Man Army Stand D</div>
            </div>

            <div className="p-4 bg-[#141620] border-2 border-stone-800">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">STRIKE RATE</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1 font-mono">198.5</div>
              <div className="text-xs text-emerald-400 font-bold mt-1">Maximums Everywhere</div>
            </div>

            <div className="p-4 bg-[#141620] border-2 border-stone-800">
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">BIRTHDAY INNINGS</div>
              <div className="text-xl sm:text-2xl font-black text-red-500 mt-1 font-mono">100* N.O.</div>
              <div className="text-xs text-stone-300 font-bold mt-1">Raise the bat high!</div>
            </div>
          </div>

          {/* THE 4 PILLARS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 bg-[#090a0d] border border-stone-800 space-y-1">
              <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-black">
                TRADEMARK SHOT
              </div>
              <div className="text-lg font-black text-white">The Sublime Wrist Flick</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Whacks anything pitched on middle or leg stump off his pads cleanly into the deep mid-wicket grandstand. Pure timing, zero follow-through hesitation.
              </p>
            </div>

            <div className="p-5 bg-[#090a0d] border border-stone-800 space-y-1">
              <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-black">
                FINAL OVER WEAPON (6 RUNS TO DEFEND)
              </div>
              <div className="text-lg font-black text-white">Mitchell Starc 148k Yorker</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Fast left-arm sling trajectory, targeting the base of off-stump with late tail. The only ball you bowl when a match is on the line.
              </p>
            </div>

            <div className="p-5 bg-[#090a0d] border border-stone-800 space-y-1">
              <div className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest font-black">
                CRICKET IDOLS / GOATS
              </div>
              <div className="text-lg font-black text-white">Virat Kohli & Mitchell Starc</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                The players you defend with your life in every single cricket argument. The greatest chase master in world history paired with the lethal World Cup spearhead.
              </p>
            </div>

            <div className="p-5 bg-[#090a0d] border border-stone-800 space-y-1">
              <div className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest font-black">
                TOP 2 MATCH FINISHES
              </div>
              <div className="text-lg font-black text-white">Melbourne 82* & Headingley 135*</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Virat smashing Haris Rauf back over his head at the MCG (2022) and Ben Stokes pulling off the 73-run last wicket miracle against Australia (2019).
              </p>
            </div>
          </div>
        </div>

        {/* 4. THE SHOELACE LEGEND (BROADSHEET COMIC STRIP) */}
        <div className="border-4 border-yellow-600/40 bg-[#121008] p-6 sm:p-8 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-yellow-600/30 gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-editorial text-2xl font-black text-white uppercase tracking-tight">
                Folklore Story: The Time You Tied Your Shoelaces During Live Play 😂
              </h3>
            </div>
            <span className="text-xs font-mono font-black text-yellow-500 bg-yellow-950/60 border border-yellow-700/50 px-2.5 py-1">
              RUNS SAVED: 0 • SHOES TIED: 100%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-[#1a170e] border border-yellow-600/20 space-y-2">
              <div className="text-2xl font-black text-yellow-500">01. THE PREPARATION</div>
              <p className="text-xs text-stone-300 leading-relaxed">
                The bowler is steaming in. The batsman takes his stance. Out in the deep covers, Sanjith notices his shoelace has come undone. He calmly bends down on both knees to tie it tight.
              </p>
            </div>

            <div className="p-4 bg-[#1a170e] border border-yellow-600/20 space-y-2">
              <div className="text-2xl font-black text-yellow-500">02. THE DELIVERY</div>
              <p className="text-xs text-stone-300 leading-relaxed">
                The bowler doesn't see him and delivers. The batsman spots the gap and smashes the ball <em>directly</em> at Sanjith. But Sanjith's head is 100% focused down on the double-knot.
              </p>
            </div>

            <div className="p-4 bg-[#1a170e] border border-yellow-600/20 space-y-2">
              <div className="text-2xl font-black text-yellow-500">03. THE BOUNDARY</div>
              <p className="text-xs text-stone-300 leading-relaxed">
                The ball whistles 2 inches past his ear and crashes into the boundary cushions for four! Sanjith stands up, shoes perfectly laced, looking around wondering what just happened.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-950/40 border-2 border-yellow-600/40 text-center text-xs sm:text-sm font-bold text-yellow-200">
            "Bowler bowled, batsman hit, Sanjith knotted. The funniest 4 runs ever conceded in squad history." — Squad XI
          </div>
        </div>

        {/* 5. INTERACTIVE BATTING NET (PLAY IN REAL-TIME) */}
        <div className="border-4 border-stone-800 bg-[#0c0d12] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-stone-800 gap-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-red-500" />
              <h3 className="font-editorial text-2xl font-black text-white uppercase tracking-tight">
                Final Over Simulator: Sanjith vs Mitchell Starc
              </h3>
            </div>
            <span className="text-xs font-mono text-stone-400 bg-stone-900 px-3 py-1 border border-stone-800">
              BALL {currentBall} OF 6 • 150 KM/H NETS
            </span>
          </div>

          {/* SIMULATOR SCREEN */}
          <div className="mt-6 p-6 bg-black border-2 border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-xs font-mono text-red-500 font-bold uppercase tracking-wider">
                MATCH SITUATION // 20TH OVER
              </div>
              <div className="font-editorial text-3xl sm:text-4xl font-black text-white">
                SCORE: {score} RUNS • {wickets} WKTS
              </div>
              <p className="text-xs text-stone-400 max-w-md font-mono mt-1">
                {lastCommentary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
              {!isGameOver ? (
                <>
                  <button
                    onClick={() => handleShot('flick')}
                    className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider border border-white/20 cursor-pointer shadow-md"
                  >
                    1. Trademark Flick (6)
                  </button>
                  <button
                    onClick={() => handleShot('yorker_block')}
                    className="px-4 py-3 bg-stone-800 hover:bg-stone-700 text-white font-black text-xs uppercase tracking-wider border border-white/20 cursor-pointer"
                  >
                    2. Dig Out Yorker (2)
                  </button>
                  <button
                    onClick={() => handleShot('shoelace')}
                    className="px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-stone-950 font-black text-xs uppercase tracking-wider border border-white/20 cursor-pointer"
                  >
                    3. Tie Shoelaces (4)
                  </button>
                </>
              ) : (
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-white text-stone-950 font-black text-xs uppercase tracking-wider border border-white flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>PLAY OVER AGAIN</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 6. REAL FIELD STRATEGY BOARD (INTERACTIVE 360 OVAL) */}
        <div className="border-4 border-stone-800 bg-[#0c0d12] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-stone-800 gap-2">
            <div>
              <h3 className="font-editorial text-2xl font-black text-white uppercase tracking-tight">
                Captain Sanjith's Field Strategy
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">Click any fielder on the pitch to see why Sanjith put them there.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1">
              CHINNASWAMY 360° DEFENSE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-6">
            {/* OVAL CRICKET FIELD CANVAS */}
            <div className="md:col-span-7 flex justify-center">
              <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-full border-4 border-dashed border-emerald-600/40 bg-gradient-to-b from-[#0a180e] to-[#050f08] p-4 flex items-center justify-center select-none shadow-2xl">
                {/* 30 Yard Circle */}
                <div className="absolute inset-10 rounded-full border border-dashed border-emerald-500/20 pointer-events-none" />

                {/* Pitch Strip */}
                <div className="absolute w-8 h-28 bg-[#2d271f] border border-amber-900/40 rounded-sm flex flex-col justify-between items-center py-1">
                  <div className="w-5 h-1 bg-stone-300" />
                  <div className="text-[7px] font-mono text-stone-400 -rotate-90">22 YDS</div>
                  <div className="w-5 h-1 bg-stone-300" />
                </div>

                {/* Field Position Nodes */}
                {[
                  { name: 'Slip', x: '58%', y: '25%' },
                  { name: 'Point', x: '80%', y: '42%' },
                  { name: 'Cover', x: '75%', y: '68%' },
                  { name: 'Mid-off', x: '58%', y: '82%' },
                  { name: 'Long-off', x: '45%', y: '92%' },
                  { name: 'Long-on', x: '25%', y: '88%' },
                  { name: 'Mid-wicket', x: '18%', y: '65%' },
                  { name: 'Square Leg', x: '20%', y: '40%' },
                  { name: 'Fine Leg', x: '35%', y: '20%' },
                  { name: 'Keeper', x: '50%', y: '16%' },
                  { name: 'Bowler', x: '50%', y: '72%' },
                ].map((pos) => {
                  const isSelected = activeFielder === pos.name;
                  return (
                    <button
                      key={pos.name}
                      onClick={() => setActiveFielder(pos.name)}
                      style={{ left: pos.x, top: pos.y }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-sm border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-red-600 text-white border-white scale-125 z-20 shadow-lg'
                          : 'bg-stone-900/90 text-stone-300 border-stone-700 hover:border-white'
                      }`}
                    >
                      {pos.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Position Intel Card */}
            <div className="md:col-span-5 p-5 bg-[#141620] border-2 border-stone-800 space-y-3">
              <div className="text-xs font-mono text-red-500 uppercase tracking-widest font-black">
                SELECTED FIELDER // POSITION BREAKDOWN
              </div>
              <div className="text-2xl font-black text-white font-editorial">{activeFielder}</div>
              <div className="h-px bg-stone-800" />
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeFielder === 'Long-on' && "Stationed right where Sanjith's wrist flick lands. Protects the boundary ropes against big-hitting power batsmen."}
                {activeFielder === 'Point' && "The squad's most athletic fielder. Stops backward point cuts and saves 20+ runs every single match."}
                {activeFielder === 'Slip' && "Catches the outside edge when Mitchell Starc bowls an outswinging 148k beauty with the new white ball."}
                {activeFielder === 'Bowler' && "Captain Sanjith himself! Bowling death yorkers with pinpoint accuracy when 6 runs are needed in the final over."}
                {activeFielder === 'Keeper' && "Stands back 20 meters to take the flying carry from express fast bowling."}
                {!['Long-on', 'Point', 'Slip', 'Bowler', 'Keeper'].includes(activeFielder) && `Custom placement ordered by Skipper Sanjith to strangle the scoring rate and force an aerial mistake.`}
              </p>
              <div className="pt-2 text-[11px] font-mono text-stone-400">
                Tap other fielders on the green to review their role.
              </div>
            </div>
          </div>
        </div>

        {/* 7. SQUAD MESSAGE BOARD */}
        <div className="border-4 border-stone-800 bg-[#0f1017] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-stone-800 gap-2">
            <div>
              <h3 className="font-editorial text-2xl font-black text-white uppercase tracking-tight">
                Squad Guestbook: Leave a Note for Sanjith
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">Post your birthday wishes or squad memories. Notes stay pinned live.</p>
            </div>
            <span className="text-xs font-mono text-yellow-500 bg-yellow-950/60 border border-yellow-800 px-3 py-1">
              {notes.length} MESSAGES RECORDED
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            {/* Form */}
            <form onSubmit={handleAddNote} className="lg:col-span-5 p-5 bg-[#141620] border-2 border-stone-800 space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1 font-bold">YOUR NAME</label>
                <input
                  type="text"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  placeholder="e.g. Azan, Teammate..."
                  className="w-full bg-[#0a0b10] border border-stone-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-stone-400 block mb-1 font-bold">YOUR MESSAGE OR INSIDE JOKE</label>
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Drop a birthday wish or roast him about his shoelaces..."
                  rows={3}
                  className="w-full bg-[#0a0b10] border border-stone-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider py-3 border border-red-400 cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>PIN MESSAGE TO BOARD</span>
              </button>

              {postSuccess && (
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Message pinned! Confetti fired! 🎉</span>
                </div>
              )}
            </form>

            {/* Note Cards List */}
            <div className="lg:col-span-7 space-y-3 max-h-96 overflow-y-auto pr-1">
              {notes.map(note => (
                <div key={note.id} className="p-4 bg-[#141620] border-2 border-stone-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-editorial text-base font-black text-white">{note.author}</span>
                    <span className="text-[10px] font-mono text-red-400 bg-red-950/60 border border-red-800 px-2 py-0.5">
                      {note.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    "{note.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 8. FOOTER */}
      <footer className="border-t-4 border-stone-900 bg-[#090a0d] py-10 text-center text-xs text-stone-500 font-mono">
        <div className="max-w-xl mx-auto px-4 space-y-2">
          <div className="font-editorial text-base font-black text-white">
            SANJITH #10 • ROYAL CHALLENGERS BENGALURU
          </div>
          <p>
            Crafted for Sanjith by Azan & the boys. Dedicated to the wrist flick, Chinnaswamy roar, and double-knotted shoelaces under fire.
          </p>
          <div className="text-red-500 font-bold pt-2">
            HAPPY BIRTHDAY SKIPPER! 100* NOT OUT FOREVER.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
