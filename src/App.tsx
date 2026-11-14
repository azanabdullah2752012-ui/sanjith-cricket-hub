import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Heart, 
  Send, 
  Check, 
  Compass,
  Play,
  Trash2,
  ArrowUpRight,
  Shield,
  Zap,
  MapPin
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
  category: string;
  standLocation: string;
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
    category: "Sanjith's Signature Stroke",
    standLocation: 'Chinnaswamy Stand D',
    description: "Sanjith's hallmark stroke: picking the delivery off his pads and whipping it high over the deep mid-wicket boundary.",
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
    standLocation: 'Deep Third Man',
    description: "The edge trickling past into the boundary foam while Sanjith was bent down double-knotting his right sneaker.",
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
    name: 'Starc 2015 RCB Yorker',
    category: "Sanjith's Bowling Idol",
    standLocation: 'Base of Middle Stump',
    description: "The toe-crushing 148k inswinger Mitchell Starc weaponized to defend final overs for RCB at Chinnaswamy.",
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
    standLocation: 'Long-Off Sightscreen',
    description: "Virat Kohli's iconic back-foot punch straight back over Haris Rauf in the 19th over at the Melbourne Cricket Ground.",
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
  // Wagon Wheel Animation
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

  // Clean Guestbook State (Zero preloaded fake bots)
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      localStorage.removeItem('sanjith_birthday_notes');
      const saved = localStorage.getItem('sanjith_editorial_notes_v1');
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
      localStorage.setItem('sanjith_editorial_notes_v1', JSON.stringify(notes));
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
      {/* Editorial Top Masthead */}
      <header className="border-b border-[#e5e5e3] px-6 sm:px-10 py-5 bg-[#fcfbf9]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl tracking-wider text-[#c92a2a]">
              #10
            </span>
            <div className="h-4 w-px bg-stone-300" />
            <div className="text-xs tracking-widest uppercase font-bold text-stone-600">
              RCB Special Edition • Sanjith
            </div>
          </div>

          <button
            onClick={popConfetti}
            className="px-4 py-2 rounded-full bg-[#141210] hover:bg-[#c92a2a] text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Celebrate Sanjith 🎉</span>
          </button>
        </div>
      </header>

      {/* Main Editorial Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-12 w-full space-y-20">
        
        {/* HERO: The Athletic / Nike Style Editorial Splash */}
        <section className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#c92a2a] uppercase">
              <span>ROYAL CHALLENGERS BENGALURU</span>
              <span>—</span>
              <span>STAND D</span>
              <span>—</span>
              <span>JERSEY #10</span>
            </div>

            <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-[#141210] uppercase">
              Sanjith. <br />
              <span className="text-[#c92a2a]">100 Not Out.</span>
            </h1>

            <p className="text-lg sm:text-xl text-stone-700 max-w-2xl font-normal leading-relaxed pt-2">
              An editorial tribute to the squad's skipper. Dedicated to seventeen unbroken years supporting Royal Challengers Bengaluru, King Kohli's chasing masterclasses, Mitchell Starc's 148k yorkers, and the timeless match where shoes came before boundaries.
            </p>
          </div>

          {/* Full-Bleed Chinnaswamy Stadium Hero Plate */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-stone-100 shadow-sm border border-stone-200">
            <img 
              src="images/chinnaswamy_stadium.jpg" 
              alt="M. Chinnaswamy Stadium, Bengaluru - Home of Royal Challengers Bengaluru" 
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#c92a2a] px-2.5 py-1 rounded text-white inline-block">
                  THE FORTRESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  M. Chinnaswamy Stadium, Bengaluru
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Home of the 12th Man Army Stand D. Where every roar echoes across Cubbon Park and every boundary is lived with passion.
                </p>
              </div>

              <div className="text-right text-xs text-stone-300 font-medium hidden sm:block">
                <span className="block font-bold text-white text-sm">Stand D Season Post</span>
                <span>Bengaluru, Karnataka</span>
              </div>
            </div>
          </div>
        </section>

        {/* SPEC SHEET RIBBON */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-stone-200 py-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Franchise</span>
            <p className="text-lg font-black text-[#141210]">RCB 💥</p>
            <span className="text-xs text-stone-500">Royal Challengers</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Squad Number</span>
            <p className="text-lg font-black text-[#141210]">Jersey #10</p>
            <span className="text-xs text-stone-500">The Skipper</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Signature Shot</span>
            <p className="text-lg font-black text-[#141210]">The Wrist Flick</p>
            <span className="text-xs text-stone-500">Whip off the pads</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Bowling Weapon</span>
            <p className="text-lg font-black text-[#141210]">Starc-Style Yorker</p>
            <span className="text-xs text-stone-500">148k Inswinger</span>
          </div>
        </section>

        {/* EDITORIAL PHOTO ESSAYS (Big, striking photography) */}
        <section className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-black tracking-widest text-[#c92a2a] uppercase block">
                The Cricket Pantheon
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase tracking-wide">
                The Idols & Defining Matches
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Curated for Sanjith's Cricket Philosophy
            </span>
          </div>

          {/* ESSAY 1: Virat Kohli (Large Split Feature) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
              <img 
                src="images/virat_kohli.jpg" 
                alt="Virat Kohli" 
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#c92a2a] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                The GOAT
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                Batting Archetype • India & RCB
              </span>
              
              <h3 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase leading-none">
                Virat Kohli.
              </h3>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                Sanjith's undisputed hero. The player he defends in every single group chat debate with mathematical conviction. King of the run chase, 17 unbroken years wearing the red and gold for RCB, and creator of the Melbourne 82* miracle.
              </p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-[#c92a2a] uppercase tracking-wider block">
                  ✦ Iconic Finish
                </span>
                <p className="text-sm font-extrabold text-stone-900">
                  82* vs Pakistan • Melbourne (MCG 2022)
                </p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Back-foot straight six over Haris Rauf in the 19th over that turned an impossible chase into history.
                </p>
              </div>
            </div>
          </div>

          {/* ESSAY 2: Mitchell Starc (2014-2015 RCB Era) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">
                Bowling Archetype • 2014–15 RCB Duo
              </span>
              
              <h3 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase leading-none">
                Mitchell Starc.
              </h3>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                Sanjith's bowling idol. When Starc spearheaded the Royal Challengers Bengaluru attack in 2014 and 2015, he made Chinnaswamy feel impregnable, taking 34 wickets at an economy of 7.16 with ice-cold death overs.
              </p>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                  ✦ The Weapon
                </span>
                <p className="text-sm font-extrabold text-stone-900">
                  148.5 km/h Inswinging Laser Yorker
                </p>
                <p className="text-xs text-stone-500 leading-relaxed">
                  The delivery Sanjith tries to bowl every time six runs are needed in the final over.
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
              <div className="absolute top-4 right-4 bg-sky-700 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                150k Pacer
              </div>
            </div>
          </div>

          {/* ESSAY 3: Paired Legends (AB de Villiers & Ben Stokes) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <div className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Mr. 360
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    RCB Hall of Fame
                  </span>
                  <h4 className="font-display text-3xl text-[#141210] uppercase">
                    AB de Villiers
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Chinnaswamy's adopted son who proved no boundary was safe. The inspiration behind every audacious gully scoop and ramp stroke.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="text-xs font-semibold text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-200 block">
                  ✦ Landmark: Chinnaswamy Roof-Top Maximums
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
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Headingley 135*
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    The Greatest Finish
                  </span>
                  <h4 className="font-display text-3xl text-[#141210] uppercase">
                    Ben Stokes
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Sanjith's favorite Test match epic. The 73-run 10th-wicket partnership with Jack Leach. Pure guts, refusing to concede until the final ball was bowled.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="text-xs font-semibold text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-200 block">
                  ✦ Miracle: 135* vs Australia (Headingley 2019)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TACTICAL CHINNASWAMY PITCH & WAGON WHEEL */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-black tracking-widest text-[#c92a2a] uppercase block">
                Tactical Breakdown
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase tracking-wide">
                Chinnaswamy Pitch Trajectories
              </h2>
            </div>
            <span className="text-xs font-bold text-[#c92a2a] bg-red-50 px-3 py-1.5 rounded-full border border-red-200">
              {activeShot.name}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* The SVG Tactical Ground */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-square rounded-full border-2 border-stone-200 bg-[#fbfbfa] p-4 flex items-center justify-center">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Outer Boundary */}
                  <circle cx="150" cy="150" r="142" fill="none" stroke="#e5e5e3" strokeWidth="2" />
                  
                  {/* 30-Yard Circle */}
                  <circle cx="150" cy="150" r="75" fill="none" stroke="#e5e5e3" strokeWidth="1.5" strokeDasharray="4,4" />

                  {/* Pitch Strip */}
                  <rect x="142" y="100" width="16" height="100" rx="2" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1" />
                  
                  {/* Creases */}
                  <line x1="138" y1="110" x2="162" y2="110" stroke="#a8a29e" strokeWidth="1.5" />
                  <line x1="138" y1="190" x2="162" y2="190" stroke="#a8a29e" strokeWidth="1.5" />

                  {/* Field Positions */}
                  <text x="150" y="24" fontSize="9" fill="#78716c" fontWeight="bold" textAnchor="middle">Long Off</text>
                  <text x="150" y="286" fontSize="9" fill="#78716c" fontWeight="bold" textAnchor="middle">Fine Leg</text>
                  <text x="265" y="154" fontSize="9" fill="#78716c" fontWeight="bold" textAnchor="middle">Cover</text>
                  <text x="35" y="154" fontSize="9" fill="#c92a2a" fontWeight="bold" textAnchor="middle">Stand D</text>

                  {/* Animated Trajectory */}
                  <path
                    d={`M ${activeShot.startX} ${activeShot.startY} Q ${activeShot.controlX} ${activeShot.controlY} ${activeShot.endX} ${activeShot.endY}`}
                    fill="none"
                    stroke={activeShot.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="dash-animated"
                  />

                  {/* Endpoint Marker */}
                  <circle
                    cx={activeShot.endX}
                    cy={activeShot.endY}
                    r="5"
                    fill={activeShot.color}
                  />

                  {/* Ball Marker */}
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
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-stone-50 border-stone-400 shadow-2xs'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: shot.color }}
                          />
                          <span className="text-sm font-extrabold text-[#141210]">
                            {shot.name}
                          </span>
                        </div>
                        <span className="text-xs text-stone-500 block mt-0.5">
                          {shot.category} • {shot.standLocation}
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

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  Tactical Analysis
                </span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {activeShot.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURETTE: THE SHOELACE INCIDENT */}
        <section className="bg-amber-50/60 p-8 sm:p-12 rounded-3xl border border-amber-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-amber-800 uppercase">
            <span>Stand D Locker Room Archives</span>
            <span>•</span>
            <span>Unfiltered Folklore</span>
          </div>

          <h3 className="font-display text-4xl sm:text-5xl text-amber-950 uppercase leading-none">
            The Outfield Mystery: Four Runs, Zero Regrets 😂
          </h3>

          <p className="text-base sm:text-lg text-amber-900 leading-relaxed font-normal max-w-3xl">
            The bowler was at the top of his mark. The batsman took guard. Meanwhile, out at deep backward point, Sanjith calmly dropped to one knee to double-knot his right sneaker. The bowler released without looking, the batsman slashed it straight down Sanjith's throat, and the ball bounced cleanly past his heels into the foam boundary while his knot was completed to perfection.
          </p>

          <div className="pt-2">
            <blockquote className="border-l-4 border-amber-500 pl-4 py-1 text-sm sm:text-base font-bold italic text-amber-950">
              "Runs saved: zero. Shoes tied: one hundred percent. Swagger: unquestionable."
            </blockquote>
          </div>
        </section>

        {/* PAVILION GUESTBOOK LEDGER */}
        <section className="space-y-6">
          <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-black tracking-widest text-[#c92a2a] uppercase block">
                Pavilion Registry
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase tracking-wide">
                Birthday Notes for Sanjith
              </h2>
            </div>
            <span className="text-xs text-stone-500">
              {notes.length} {notes.length === 1 ? 'Message' : 'Messages'}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handlePost} className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Your Name / Nickname
              </label>
              <input
                type="text"
                placeholder="e.g. Azan, Stand D Teammate..."
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#141210] placeholder:text-stone-400 focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Birthday Message
              </label>
              <textarea
                placeholder="Write a birthday wish, inside joke, or match memory for Sanjith..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#141210] placeholder:text-stone-400 focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saved ? (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Saved into the pavilion registry!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#c92a2a] hover:bg-[#b02525] text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-transform shadow-xs active:scale-95"
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
                No notes yet. Be the first to leave a birthday message for Sanjith!
              </div>
            ) : (
              notes.map(note => (
                <div 
                  key={note.id} 
                  className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-black text-[#141210] uppercase tracking-wide block">
                      {note.from}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      "{note.text}"
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-stone-300 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-stone-200 px-6 sm:px-10 py-10 bg-white text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl text-[#c92a2a]">SANJITH #10</span>
            <span>•</span>
            <span>ROYAL CHALLENGERS BENGALURU</span>
            <span>•</span>
            <span>STAND D</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#c92a2a] fill-[#c92a2a] inline" />
            <span>by Azan for Sanjith • Ee Sala Cup Namdu! 💥</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
