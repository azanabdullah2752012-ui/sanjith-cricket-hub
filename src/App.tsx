import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Heart, 
  Send, 
  Check, 
  Play, 
  Trash2 
} from 'lucide-react';

interface Note {
  id: number;
  from: string;
  text: string;
  timestamp?: string;
}

interface ShotConfig {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  startX: number;
  startY: number;
  controlX: number;
  controlY: number;
  endX: number;
  endY: number;
}

const SHOTS: ShotConfig[] = [
  {
    id: 'wrist-flick',
    name: 'The Wrist Flick',
    subtitle: "Sanjith's Go-To Shot",
    description: "His favorite shot in the book. Waiting for anything full on leg stump and whipping it high over mid-wicket into Stand D.",
    color: '#c92a2a',
    startX: 150,
    startY: 155,
    controlX: 195,
    controlY: 130,
    endX: 255,
    endY: 80
  },
  {
    id: 'shoelace',
    name: 'The Shoelace Four',
    subtitle: 'Classic Squad Moment',
    description: "The batsman edges it past slip while Sanjith is bent down tying his laces in the deep. Ball trickles right past for four.",
    color: '#b45309',
    startX: 150,
    startY: 155,
    controlX: 80,
    controlY: 180,
    endX: 35,
    endY: 220
  },
  {
    id: 'starc-yorker',
    name: 'The Starc Yorker',
    subtitle: 'Death Overs Weapon',
    description: "Trying to bowl like Mitchell Starc back when he played for RCB — full at the toes, aiming straight at middle stump.",
    color: '#0284c7',
    startX: 150,
    startY: 70,
    controlX: 150,
    controlY: 120,
    endX: 150,
    endY: 165
  },
  {
    id: 'kohli-mcg',
    name: 'Kohli vs Rauf (MCG)',
    subtitle: 'Favorite Chase Ever',
    description: "That back-foot straight six over Haris Rauf in the 19th over. Sanjith has probably watched this replay a hundred times.",
    color: '#c92a2a',
    startX: 150,
    startY: 155,
    controlX: 150,
    controlY: 90,
    endX: 150,
    endY: 25
  }
];

export function App() {
  const [activeShot, setActiveShot] = useState<ShotConfig>(SHOTS[0]);
  const [animatingBall, setAnimatingBall] = useState(false);
  const [pitchBallPos, setPitchBallPos] = useState({ x: SHOTS[0].endX, y: SHOTS[0].endY });

  const triggerShotAnimation = (shot: ShotConfig) => {
    setActiveShot(shot);
    setAnimatingBall(true);
    setPitchBallPos({ x: shot.startX, y: shot.startY });

    const duration = 650;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);

      const x = Math.round(
        Math.pow(1 - t, 2) * shot.startX +
        2 * (1 - t) * t * shot.controlX +
        Math.pow(t, 2) * shot.endX
      );
      const y = Math.round(
        Math.pow(1 - t, 2) * shot.startY +
        2 * (1 - t) * t * shot.controlY +
        Math.pow(t, 2) * shot.endY
      );

      setPitchBallPos({ x, y });

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatingBall(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const popConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.35 },
      colors: ['#c92a2a', '#d97706', '#141210', '#ffffff']
    });
  };

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      localStorage.removeItem('sanjith_birthday_notes');
      localStorage.removeItem('sanjith_birthday_notes_v3');
      const saved = localStorage.getItem('sanjith_real_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [fromName, setFromName] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sanjith_real_notes', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromName.trim() || !noteText.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      from: fromName.trim(),
      text: noteText.trim(),
      timestamp: 'Today'
    };

    setNotes(prev => [newNote, ...prev]);
    setFromName('');
    setNoteText('');
    setSaved(true);
    popConfetti();
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#141210] flex flex-col justify-between selection:bg-[#c92a2a] selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-stone-200 px-6 sm:px-10 py-5 bg-[#fcfbf9]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl tracking-wider text-[#c92a2a]">
              #10
            </span>
            <div className="h-4 w-px bg-stone-300" />
            <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
              Sanjith's Birthday
            </span>
          </div>

          <button
            onClick={popConfetti}
            className="px-4 py-2 rounded-full bg-[#141210] hover:bg-[#c92a2a] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Celebrate 🎉</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-12 w-full space-y-16">
        
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#c92a2a] uppercase">
              <span>RCB Fan</span>
              <span>•</span>
              <span>Stand D</span>
              <span>•</span>
              <span>Jersey #10</span>
            </div>

            <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-[#141210] uppercase">
              Happy Birthday <br />
              <span className="text-[#c92a2a]">Sanjith.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 max-w-2xl font-normal leading-relaxed pt-1">
              Made this for your birthday bro. Celebrating your die-hard love for RCB, defending Virat Kohli in every argument, trying to bowl 150k yorkers like Starc, and of course, that match where you gave away four runs tying your shoelaces.
            </p>
          </div>

          {/* Chinnaswamy Stadium Picture */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-stone-100 shadow-sm border border-stone-200">
            <img 
              src="images/chinnaswamy_stadium.jpg" 
              alt="M. Chinnaswamy Stadium, Bengaluru" 
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#c92a2a] px-2 py-0.5 rounded text-white inline-block">
                  RCB Fortress
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  M. Chinnaswamy Stadium, Bengaluru
                </h2>
                <p className="text-xs sm:text-sm text-stone-300">
                  Stand D. Where you lose your voice every single IPL season shouting for RCB.
                </p>
              </div>

              <div className="text-xs text-stone-300 font-medium">
                Ee Sala Cup Namde! 💥
              </div>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-stone-200 py-6">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Favorite Team</span>
            <p className="text-base sm:text-lg font-bold text-[#141210]">RCB 💥</p>
            <span className="text-xs text-stone-500">Royal Challengers Bengaluru</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Squad Number</span>
            <p className="text-base sm:text-lg font-bold text-[#141210]">#10</p>
            <span className="text-xs text-stone-500">The Skipper</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Signature Shot</span>
            <p className="text-base sm:text-lg font-bold text-[#141210]">The Wrist Flick</p>
            <span className="text-xs text-stone-500">Whipping balls off the pads</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Bowling Weapon</span>
            <p className="text-base sm:text-lg font-bold text-[#141210]">Starc-Style Yorker</p>
            <span className="text-xs text-stone-500">Fast inswinger at the toes</span>
          </div>
        </section>

        {/* Cricket Idols & Matches */}
        <section className="space-y-8">
          <div className="border-b border-stone-200 pb-3">
            <span className="text-xs font-bold tracking-wider text-[#c92a2a] uppercase block">
              The Idols
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase tracking-wide">
              Players You Always Back
            </h2>
          </div>

          {/* Virat Kohli */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
              <img 
                src="images/virat_kohli.jpg" 
                alt="Virat Kohli" 
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#c92a2a] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                The GOAT
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                RCB & India
              </span>
              
              <h3 className="font-display text-4xl text-[#141210] uppercase">
                Virat Kohli
              </h3>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                The man you will defend no matter what. Nobody can say a single bad thing about Kohli around you without getting into a 2-hour debate. King of the run chase and the heart of RCB.
              </p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-[#c92a2a] uppercase tracking-wider block">
                  Favorite Knock: 82* vs Pakistan (MCG 2022)
                </span>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  That straight six off Haris Rauf back over his head. You've probably watched the highlights a hundred times.
                </p>
              </div>
            </div>
          </div>

          {/* Mitchell Starc */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
            <div className="lg:col-span-6 space-y-3 order-2 lg:order-1">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                2014–15 RCB Spearhead
              </span>
              
              <h3 className="font-display text-4xl text-[#141210] uppercase">
                Mitchell Starc
              </h3>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                Your favorite bowler to copy. Back when Starc was steaming in for RCB at Chinnaswamy and bowling 150k thunderbolts. Every time you bowl in the last over, this is the delivery you try to pull off.
              </p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                  Signature Ball: The Inswinging Yorker
                </span>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Fast, curving in late at the base of middle and leg.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 order-1 lg:order-2">
              <img 
                src="images/mitchell_starc.jpg" 
                alt="Mitchell Starc" 
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-sky-700 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                150k Pacer
              </div>
            </div>
          </div>

          {/* AB de Villiers & Ben Stokes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AB de Villiers */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 relative">
                  <img 
                    src="images/ab_de_villiers.jpg" 
                    alt="AB de Villiers" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    Mr. 360
                  </div>
                </div>
                <div className="p-6 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Chinnaswamy Legend
                  </span>
                  <h4 className="font-display text-3xl text-[#141210] uppercase">
                    AB de Villiers
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    The reason you try audacious ramp shots in gully cricket and occasionally miss. A pure Chinnaswamy favorite.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="text-xs font-medium text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200 block">
                  ✦ Hits sixes onto the Chinnaswamy roof
                </span>
              </div>
            </div>

            {/* Ben Stokes */}
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 relative">
                  <img 
                    src="images/ben_stokes_headingley.jpg" 
                    alt="Ben Stokes Headingley 2019" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    135* Not Out
                  </div>
                </div>
                <div className="p-6 space-y-1.5">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Headingley 2019
                  </span>
                  <h4 className="font-display text-3xl text-[#141210] uppercase">
                    Ben Stokes
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Your favorite finish outside RCB. 73 runs with Jack Leach, smashing Australia everywhere to steal the match from nowhere.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="text-xs font-medium text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200 block">
                  ✦ The greatest Test finish of our lifetime
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pitch Diagram & Trajectory */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#c92a2a] uppercase block">
                The Pitch
              </span>
              <h2 className="font-display text-4xl text-[#141210] uppercase tracking-wide">
                Signature Shots & Trajectories
              </h2>
            </div>
            <span className="text-xs font-bold text-[#c92a2a] bg-red-50 px-3 py-1 rounded-full border border-red-200">
              {activeShot.name}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* The SVG Ground */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-square rounded-full border border-stone-200 bg-[#fbfbfa] p-4 flex items-center justify-center">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  <circle cx="150" cy="150" r="142" fill="none" stroke="#e5e5e3" strokeWidth="2" />
                  <circle cx="150" cy="150" r="75" fill="none" stroke="#e5e5e3" strokeWidth="1.5" strokeDasharray="4,4" />

                  <rect x="142" y="100" width="16" height="100" rx="2" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1" />
                  
                  <line x1="138" y1="110" x2="162" y2="110" stroke="#a8a29e" strokeWidth="1.5" />
                  <line x1="138" y1="190" x2="162" y2="190" stroke="#a8a29e" strokeWidth="1.5" />

                  <text x="150" y="24" fontSize="9" fill="#78716c" fontWeight="bold" textAnchor="middle">Long Off</text>
                  <text x="150" y="286" fontSize="9" fill="#78716c" fontWeight="bold" textAnchor="middle">Fine Leg</text>
                  <text x="265" y="154" fontSize="9" fill="#78716c" fontWeight="bold" textAnchor="middle">Cover</text>
                  <text x="35" y="154" fontSize="9" fill="#c92a2a" fontWeight="bold" textAnchor="middle">Stand D</text>

                  <path
                    d={`M ${activeShot.startX} ${activeShot.startY} Q ${activeShot.controlX} ${activeShot.controlY} ${activeShot.endX} ${activeShot.endY}`}
                    fill="none"
                    stroke={activeShot.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="dash-animated"
                  />

                  <circle
                    cx={activeShot.endX}
                    cy={activeShot.endY}
                    r="5"
                    fill={activeShot.color}
                  />

                  <circle
                    cx={pitchBallPos.x}
                    cy={pitchBallPos.y}
                    r="5"
                    fill="#c92a2a"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* Shot List */}
            <div className="lg:col-span-6 space-y-3">
              <div className="space-y-2">
                {SHOTS.map(shot => {
                  const isSelected = activeShot.id === shot.id;
                  return (
                    <button
                      key={shot.id}
                      onClick={() => triggerShotAnimation(shot)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-stone-50 border-stone-400'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: shot.color }}
                          />
                          <span className="text-sm font-bold text-[#141210]">
                            {shot.name}
                          </span>
                        </div>
                        <span className="text-xs text-stone-500 block mt-0.5">
                          {shot.subtitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-[#c92a2a]">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Track</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeShot.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Real Story: The Shoelace Incident */}
        <section className="bg-amber-50/70 p-6 sm:p-10 rounded-3xl border border-amber-200 space-y-3">
          <div className="text-xs font-bold tracking-wider text-amber-800 uppercase">
            Squad Folklore
          </div>

          <h3 className="font-display text-4xl text-amber-950 uppercase">
            The Time You Tied Your Shoelaces During a Match 😂
          </h3>

          <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-normal">
            We will never let you forget this one. The bowler starts running in to bowl. You're out in the deep, and for some reason decide that exact second is the time to bend down and double-knot your shoes. The bowler delivers, the batsman slices it straight at you, and the ball rolls past you into the boundary for four while your head is completely down.
          </p>

          <p className="text-xs sm:text-sm font-bold text-amber-950 pt-1">
            "Runs saved: 0. Shoes tied: 100%."
          </p>
        </section>

        {/* Birthday Messages (Guestbook) */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#c92a2a] uppercase block">
                Leave a Note
              </span>
              <h2 className="font-display text-4xl text-[#141210] uppercase tracking-wide">
                Birthday Messages for Sanjith
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              {notes.length} {notes.length === 1 ? 'Message' : 'Messages'}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handlePost} className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Azan, Squad Friend..."
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#141210] placeholder:text-stone-400 focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Message or Roast
              </label>
              <textarea
                placeholder="Write a birthday wish, inside joke, or match memory for Sanjith..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#141210] placeholder:text-stone-400 focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saved ? (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Note posted!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#c92a2a] hover:bg-[#b02525] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-transform shadow-xs active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Note</span>
              </button>
            </div>
          </form>

          {/* Notes list */}
          <div className="space-y-3">
            {notes.length === 0 ? (
              <div className="p-8 text-center rounded-3xl bg-white border border-stone-200 text-stone-400 text-xs">
                No messages yet. Be the first to leave a birthday note for Sanjith!
              </div>
            ) : (
              notes.map(note => (
                <div 
                  key={note.id} 
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1 flex items-start justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#141210] block">
                      {note.from}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      "{note.text}"
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-stone-300 hover:text-red-500 p-1 transition-colors cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 px-6 sm:px-10 py-8 bg-white text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg text-[#c92a2a]">SANJITH #10</span>
            <span>•</span>
            <span>RCB 12TH MAN ARMY</span>
            <span>•</span>
            <span>STAND D</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#c92a2a] fill-[#c92a2a] inline" />
            <span>by Azan for Sanjith • Ee Sala Cup Namde! 💥</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
