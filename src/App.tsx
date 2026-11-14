import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Heart, 
  Send, 
  Check, 
  Flame, 
  Compass,
  Play,
  Quote,
  Shield,
  Award
} from 'lucide-react';

interface Note {
  id: number;
  from: string;
  text: string;
  date?: string;
}

// Interactive Wagon Wheel Shot Options (Only Sanjith's confirmed cricket profile)
interface ShotConfig {
  id: string;
  name: string;
  category: string;
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
    category: "Sanjith's Signature Shot",
    description: "Sanjith's trademark shot: picking the ball off his pads and whipping it high over the mid-wicket boundary.",
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
    name: 'The Shoelace Boundary',
    category: 'Squad Folklore',
    description: "The ball edged into the deep while Sanjith was bent down tying his shoelaces in the outfield.",
    color: '#d97706',
    startX: 150,
    startY: 155,
    controlX: 80,
    controlY: 180,
    endX: 35,
    endY: 220
  },
  {
    id: 'starc-yorker',
    name: 'Starc-Style Inswinging Yorker',
    category: "Sanjith's Bowling Weapon",
    description: "The full, fast yorker tailing into the base of middle and leg stump — inspired by Mitchell Starc's spell for RCB.",
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
    name: "Kohli's MCG Straight Six",
    category: 'Favorite Chase Moment',
    description: "Virat Kohli's iconic back-foot punch straight back over Haris Rauf at the Melbourne Cricket Ground in 2022.",
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
  // Wagon Wheel Interactive State
  const [activeShot, setActiveShot] = useState<ShotConfig>(SHOTS[0]);
  const [animatingBall, setAnimatingBall] = useState(false);
  const [ballPos, setBallPos] = useState({ x: SHOTS[0].endX, y: SHOTS[0].endY });

  const triggerShotAnimation = (shot: ShotConfig) => {
    setActiveShot(shot);
    setAnimatingBall(true);
    setBallPos({ x: shot.startX, y: shot.startY });

    const duration = 650; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Quadratic Bezier curve: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
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

      setBallPos({ x, y });

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatingBall(false);
      }
    };

    requestAnimationFrame(animate);
  };

  // Real Guestbook Notes: Only Azan's real message by default, plus user additions
  const defaultNotes: Note[] = [
    {
      id: 1,
      from: 'Azan',
      text: 'Happy Birthday Sanjith! Always got your back at the crease. Keep hitting that clean wrist flick and never change bro.'
    }
  ];

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem('sanjith_birthday_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return defaultNotes;
  });

  const [fromName, setFromName] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sanjith_birthday_notes', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const popConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#c92a2a', '#d97706', '#1c1917']
    });
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromName.trim() || !noteText.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      from: fromName.trim(),
      text: noteText.trim()
    };

    setNotes(prev => [newNote, ...prev]);
    setFromName('');
    setNoteText('');
    setSaved(true);
    popConfetti();
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#1c1917] flex flex-col justify-between selection:bg-[#c92a2a] selection:text-white">
      {/* Top Header */}
      <header className="border-b border-[#e7e5e4] px-4 sm:px-6 py-4 bg-white/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c92a2a] flex items-center justify-center font-num font-extrabold text-white text-lg shadow-sm">
              10
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-[#1c1917]">Sanjith</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fef2f2] text-[#c92a2a] border border-[#fecaca]">
                  RCB #10
                </span>
              </div>
              <span className="text-[11px] text-[#78716c] block">Birthday Tribute • 2026</span>
            </div>
          </div>

          <button
            onClick={popConfetti}
            className="px-4 py-2 rounded-lg bg-[#c92a2a] hover:bg-[#b02525] text-white font-semibold text-xs transition-transform flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Celebrate 🎉</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-xs font-semibold">
            <span>RCB 12th Man Army</span>
            <span>•</span>
            <span>Jersey #10</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1c1917] leading-tight">
            Happy Birthday, <span className="text-[#c92a2a]">Sanjith.</span>
          </h1>

          <p className="text-[#44403c] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Made this for you bro. Celebrating your passion for Royal Challengers Bengaluru, Virat Kohli's masterclasses, Mitchell Starc's yorkers, and the unforgettable shoelace boundary.
          </p>
        </section>

        {/* Real Profile Attributes (Only confirmed data) */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#e7e5e4] shadow-xs space-y-1">
            <span className="text-[11px] text-[#78716c] uppercase font-bold tracking-wider block">Favorite Team</span>
            <p className="text-sm sm:text-base font-extrabold text-[#1c1917]">RCB 💥</p>
            <span className="text-[11px] text-[#78716c] block">Royal Challengers</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#e7e5e4] shadow-xs space-y-1">
            <span className="text-[11px] text-[#78716c] uppercase font-bold tracking-wider block">Jersey Number</span>
            <p className="text-sm sm:text-base font-extrabold text-[#1c1917]">#10</p>
            <span className="text-[11px] text-[#78716c] block">The Skipper</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#e7e5e4] shadow-xs space-y-1">
            <span className="text-[11px] text-[#78716c] uppercase font-bold tracking-wider block">Trademark Shot</span>
            <p className="text-sm sm:text-base font-extrabold text-[#1c1917]">The Wrist Flick</p>
            <span className="text-[11px] text-[#78716c] block">Off the pads</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#e7e5e4] shadow-xs space-y-1">
            <span className="text-[11px] text-[#78716c] uppercase font-bold tracking-wider block">Bowling Idol</span>
            <p className="text-sm sm:text-base font-extrabold text-[#1c1917]">Mitchell Starc</p>
            <span className="text-[11px] text-[#78716c] block">Inswinging Yorker</span>
          </div>
        </section>

        {/* Real Chinnaswamy Stadium Photo Plate */}
        <section className="overflow-hidden rounded-2xl border border-[#e7e5e4] shadow-sm bg-white">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-100">
            <img 
              src="images/chinnaswamy_stadium.jpg" 
              alt="M. Chinnaswamy Stadium Bengaluru - Home of Royal Challengers Bengaluru" 
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#c92a2a] px-2.5 py-1 rounded text-white inline-block">
                HOME OF RCB 💥
              </span>
              <h3 className="text-lg sm:text-2xl font-extrabold text-white mt-1">
                M. Chinnaswamy Stadium, Bengaluru
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl mt-0.5">
                The home ground of Royal Challengers Bengaluru, where the 12th Man Army backs the team through every ball.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Animated Wagon Wheel (Only confirmed shots) */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e7e5e4] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c92a2a]" />
                <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                  Interactive Field & Shots
                </h2>
              </div>
              <p className="text-sm font-bold text-[#1c1917] mt-0.5">
                Select a shot to animate its trajectory on the cricket field
              </p>
            </div>

            <div className="text-xs font-semibold text-[#c92a2a] bg-[#fef2f2] px-3 py-1.5 rounded-lg border border-[#fecaca] self-start sm:self-auto">
              {activeShot.name}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG Cricket Field */}
            <div className="md:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-square rounded-full border-4 border-emerald-600/30 bg-emerald-50/70 p-3 shadow-inner flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Boundary */}
                  <circle cx="150" cy="150" r="142" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" strokeDasharray="6,4" />
                  
                  {/* 30-Yard Circle */}
                  <circle cx="150" cy="150" r="75" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />

                  {/* Pitch Strip */}
                  <rect x="142" y="100" width="16" height="100" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                  
                  {/* Creases */}
                  <line x1="138" y1="110" x2="162" y2="110" stroke="#b45309" strokeWidth="1.5" />
                  <line x1="138" y1="190" x2="162" y2="190" stroke="#b45309" strokeWidth="1.5" />

                  {/* Field Positions */}
                  <text x="150" y="22" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Long Off</text>
                  <text x="150" y="288" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Fine Leg</text>
                  <text x="268" y="154" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Cover</text>
                  <text x="32" y="154" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Mid-Wicket</text>

                  {/* Animated Shot Trajectory Path */}
                  <path
                    d={`M ${activeShot.startX} ${activeShot.startY} Q ${activeShot.controlX} ${activeShot.controlY} ${activeShot.endX} ${activeShot.endY}`}
                    fill="none"
                    stroke={activeShot.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="dash-animated"
                  />

                  {/* Destination Marker */}
                  <circle
                    cx={activeShot.endX}
                    cy={activeShot.endY}
                    r="5"
                    fill={activeShot.color}
                  />

                  {/* Animated Cricket Ball */}
                  <circle
                    cx={ballPos.x}
                    cy={ballPos.y}
                    r="5"
                    fill="#c92a2a"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>

            {/* Shot List */}
            <div className="md:col-span-6 space-y-3">
              <div className="space-y-2">
                {SHOTS.map(shot => {
                  const isSelected = activeShot.id === shot.id;
                  return (
                    <button
                      key={shot.id}
                      onClick={() => triggerShotAnimation(shot)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#fef2f2] border-[#c92a2a] shadow-xs'
                          : 'bg-white border-[#e7e5e4] hover:bg-[#fbfbfa]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: shot.color }}
                          />
                          <span className="text-xs font-bold text-[#1c1917]">
                            {shot.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#78716c] block mt-0.5">
                          {shot.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#c92a2a]">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Replay</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Shot Details Box */}
              <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-[#e7e5e4]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716c] block mb-1">
                  Shot Breakdown
                </span>
                <p className="text-xs text-[#44403c] leading-relaxed">
                  {activeShot.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Idols & Matches (Virat Kohli, Mitchell Starc, Ben Stokes) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#c92a2a]" />
            <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
              Cricket Idols & Historic Matches
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Virat Kohli */}
            <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img 
                    src="images/virat_kohli.jpg" 
                    alt="Virat Kohli" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#b91c1c] uppercase tracking-wide">Batter Idol</span>
                    <span className="text-xs text-[#78716c] font-medium">RCB & India</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">Virat Kohli</h3>
                  <p className="text-xs text-[#78716c] leading-relaxed">
                    Sanjith's favorite batter. Defended in every cricket debate with unwavering loyalty.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <span className="text-[11px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2 rounded-lg border border-[#e7e5e4] block">
                  ✦ Favorite Finish: 82* vs Pakistan (MCG 2022)
                </span>
              </div>
            </div>

            {/* 2. Mitchell Starc */}
            <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img 
                    src="images/mitchell_starc.jpg" 
                    alt="Mitchell Starc" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wide">Bowling Idol</span>
                    <span className="text-xs text-[#78716c] font-medium">2014-15 RCB Duo</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">Mitchell Starc</h3>
                  <p className="text-xs text-[#78716c] leading-relaxed">
                    Former RCB strike bowler and Sanjith's bowling idol for death overs.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <span className="text-[11px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2 rounded-lg border border-[#e7e5e4] block">
                  ✦ Weapon: Inswinging Laser Yorker
                </span>
              </div>
            </div>

            {/* 3. Ben Stokes */}
            <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img 
                    src="images/ben_stokes_headingley.jpg" 
                    alt="Ben Stokes Headingley 2019" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">Favorite Test</span>
                    <span className="text-xs text-[#78716c] font-medium">Ashes 2019</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">Ben Stokes</h3>
                  <p className="text-xs text-[#78716c] leading-relaxed">
                    Sanjith's other favorite finish — the 73-run 10th wicket miracle at Headingley.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <span className="text-[11px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2 rounded-lg border border-[#e7e5e4] block">
                  ✦ Finish: 135* vs Australia (Headingley)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Squad Folklore: The True Shoelace Incident */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#fffbeb] border border-[#fde68a] space-y-3 shadow-xs">
          <div className="text-xs uppercase tracking-widest text-[#b45309] font-bold">
            Squad Folklore
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#78350f]">
            The Match Where You Tied Your Shoelaces During Play 😂
          </h3>

          <p className="text-sm sm:text-base text-[#92400e] leading-relaxed">
            The bowler was running in to bowl. Meanwhile, out in the outfield, you calmly bent down to tie your shoelaces. The bowler delivered without noticing, the batsman hit it right in your direction, and the ball went straight past you for four while your head was down getting your knot right.
          </p>

          <p className="text-xs sm:text-sm text-[#b45309] font-medium italic pt-1">
            One of the funniest match moments in squad history.
          </p>
        </section>

        {/* Real Guestbook (No fake bots or generated commentators) */}
        <section className="space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <Quote className="w-4 h-4 text-[#c92a2a]" />
              <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                Birthday Messages
              </h2>
            </div>
            <p className="text-xs text-[#78716c] mt-0.5">
              Leave a birthday note for Sanjith below.
            </p>
          </div>

          <form onSubmit={handlePost} className="p-5 rounded-2xl bg-white border border-[#e7e5e4] shadow-xs space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfa] border border-[#d6d3d1] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Write a message for Sanjith..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfa] border border-[#d6d3d1] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saved ? (
                <span className="text-xs text-[#15803d] font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Note saved!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#c92a2a] hover:bg-[#b02525] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-transform shadow-xs active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Note</span>
              </button>
            </div>
          </form>

          {/* Real Notes list */}
          <div className="space-y-3">
            {notes.map(note => (
              <div 
                key={note.id} 
                className="p-4 rounded-xl bg-white border border-[#e7e5e4] shadow-2xs space-y-1"
              >
                <span className="text-xs font-bold text-[#1c1917] block">{note.from}</span>
                <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed">
                  "{note.text}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Clean Real Footer */}
      <footer className="border-t border-[#e7e5e4] px-6 py-8 text-center text-xs text-[#78716c] bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <span>Made by Azan for Sanjith</span>
          <span>•</span>
          <Heart className="w-3.5 h-3.5 text-[#c92a2a] fill-[#c92a2a] inline" />
          <span>Happy Birthday Bro!</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
