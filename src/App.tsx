import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Heart, 
  Send, 
  Check, 
  Flame, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw,
  Compass,
  Star,
  Quote
} from 'lucide-react';

interface Note {
  id: number;
  from: string;
  text: string;
  time?: string;
}

// Interactive Wagon Wheel Shot Options
interface ShotConfig {
  id: string;
  name: string;
  batter: string;
  type: string;
  result: string;
  color: string;
  commentary: string;
  startX: number;
  startY: number;
  controlX: number;
  controlY: number;
  endX: number;
  endY: number;
  distance: string;
  soundType: 'bat' | 'stump' | 'six';
}

const SHOTS: ShotConfig[] = [
  {
    id: 'wrist-flick',
    name: 'The Trademark Wrist Flick',
    batter: 'Sanjith #10',
    type: 'Whipped off the pads',
    result: 'SIX RUNS • 92m',
    color: '#c92a2a',
    commentary: "Full on leg stump, Sanjith rolls the wrists with surgical timing — whipped high and handsome deep over midwicket!",
    startX: 150,
    startY: 155,
    controlX: 195,
    controlY: 130,
    endX: 255,
    endY: 80,
    distance: '92m',
    soundType: 'six'
  },
  {
    id: 'shoelace',
    name: 'The Shoelace Boundary 😂',
    batter: 'Sanjith in the Deep',
    type: 'Squad Folklore',
    result: 'FOUR RUNS (Saved: 0, Tied: 100%)',
    color: '#d97706',
    commentary: "Bowler steams in, batsman edges past slip. Sanjith is calmly double-knotting his right sneaker. Ball zips past into the boundary foam!",
    startX: 150,
    startY: 155,
    controlX: 80,
    controlY: 180,
    endX: 35,
    endY: 220,
    distance: 'Grass Cutter',
    soundType: 'bat'
  },
  {
    id: 'starc-yorker',
    name: 'Mitchell Starc Laser Yorker',
    batter: 'Starc to Batter',
    type: '148.5 km/h Inswinger',
    result: 'WICKET (Middle Stump Out)',
    color: '#0284c7',
    commentary: "Paced, tailing back in late at 148k! Right at the base of leg and middle — cartwheeling the stump into the Bengaluru night sky!",
    startX: 150,
    startY: 70,
    controlX: 150,
    controlY: 120,
    endX: 150,
    endY: 165,
    distance: '148.5 km/h',
    soundType: 'stump'
  },
  {
    id: 'kohli-mcg',
    name: 'Kohli 82* Melbourne Six',
    batter: 'King Kohli vs Haris Rauf',
    type: 'Back-foot Straight Loft',
    result: 'SIX RUNS • The Miracle',
    color: '#c92a2a',
    commentary: "Shot of an emperor! Back of a length 145k delivery, punched straight back over the bowler's head into the MCG sight-screen!",
    startX: 150,
    startY: 155,
    controlX: 150,
    controlY: 90,
    endX: 150,
    endY: 25,
    distance: '98m',
    soundType: 'six'
  },
  {
    id: 'ab-360',
    name: 'AB de Villiers 360 Scoop',
    batter: 'Mr. 360 at Chinnaswamy',
    type: 'Lap over Fine Leg',
    result: 'SIX RUNS • Over Wicketkeeper',
    color: '#16a34a',
    commentary: "Gets down on one knee, changes his grip in a split second, and scoops a 140k delivery over fine leg onto the stadium roof!",
    startX: 150,
    startY: 155,
    controlX: 125,
    controlY: 200,
    endX: 100,
    endY: 265,
    distance: '88m',
    soundType: 'six'
  }
];

export function App() {
  // Web Audio Synthesizer for Cricket Sounds
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playCricketSound = (type: 'bat' | 'stump' | 'six') => {
    if (!soundEnabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === 'bat' || type === 'six') {
        // Crisp wood-on-leather "thwack"
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);

        if (type === 'six') {
          // Crowd cheer shimmer
          const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 1200;
          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.01, now);
          noiseGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          whiteNoise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          whiteNoise.start(now);
        }
      } else if (type === 'stump') {
        // High timber clatter
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch {
      // Audio fallback silent
    }
  };

  // Wagon Wheel Interactive State
  const [activeShot, setActiveShot] = useState<ShotConfig>(SHOTS[0]);
  const [animatingBall, setAnimatingBall] = useState(false);
  const [ballPos, setBallPos] = useState({ x: SHOTS[0].endX, y: SHOTS[0].endY });

  const triggerShotAnimation = (shot: ShotConfig) => {
    setActiveShot(shot);
    setAnimatingBall(true);
    setBallPos({ x: shot.startX, y: shot.startY });
    playCricketSound(shot.soundType);

    // Quadratic Bezier Interpolation for Ball Flight
    const duration = 700; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);

      // B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
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
        if (shot.soundType === 'six') {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#c92a2a', '#d97706', '#16a34a']
          });
        }
      }
    };

    requestAnimationFrame(animate);
  };

  // Gallery Filter State
  const [galleryTab, setGalleryTab] = useState<'all' | 'rcb' | 'legends'>('all');

  // Scoreboard Bat Raise Counter
  const [score, setScore] = useState(100);
  const [hasRaisedBat, setHasRaisedBat] = useState(false);

  const raiseBat = () => {
    setHasRaisedBat(true);
    playCricketSound('six');
    confetti({
      particleCount: 160,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#c92a2a', '#eab308', '#ffffff', '#1c1917']
    });
    setTimeout(() => setHasRaisedBat(false), 3000);
  };

  // Persistent Guestbook Notes
  const defaultNotes: Note[] = [
    {
      id: 1,
      from: 'Azan',
      text: 'Happy Birthday Sanjith! Always got your back at the crease. Keep hitting that clean wrist flick and never change bro.',
      time: 'Just now'
    },
    {
      id: 2,
      from: 'The Squad XI',
      text: 'Happy birthday skipper! Hope this year brings you tons of runs, match-winning overs, and untied shoelaces.',
      time: 'Earlier today'
    },
    {
      id: 3,
      from: 'The Bowler Who Bowled The Shoelace Ball 😂',
      text: 'I still remember looking at you in the deep tying your shoelaces while the ball rolled right past you. Legend!',
      time: 'Squad Folklore'
    },
    {
      id: 4,
      from: 'RCB 12th Man Stand D',
      text: 'Eesala Cup Namde! May your year be as explosive as King Kohli at the MCG!',
      time: 'Matchday'
    }
  ];

  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem('sanjith_birthday_notes');
      if (saved) return JSON.parse(saved);
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
    playCricketSound('six');
    confetti({
      particleCount: 150,
      spread: 90,
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
      text: noteText.trim(),
      time: 'Just now'
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
      <header className="border-b border-[#e7e5e4] px-4 sm:px-6 py-4 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c92a2a] flex items-center justify-center font-num font-extrabold text-white text-lg shadow-sm shadow-red-200">
              10
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-[#1c1917]">Sanjith</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fef2f2] text-[#c92a2a] border border-[#fecaca]">
                  RCB #10
                </span>
              </div>
              <span className="text-[11px] text-[#78716c] block">Birthday Special Edition • 100* Not Out</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle Button */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) {
                  initAudio();
                  playCricketSound('bat');
                }
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                soundEnabled 
                  ? 'bg-amber-50 text-amber-900 border-amber-300' 
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
              title="Toggle cricket sound effects"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Audio: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  <span className="hidden sm:inline">Audio: OFF</span>
                </>
              )}
            </button>

            {/* Celebrate Confetti Button */}
            <button
              onClick={popConfetti}
              className="px-4 py-2 rounded-lg bg-[#c92a2a] hover:bg-[#b02525] text-white font-semibold text-xs transition-transform flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Celebrate 🎉</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-12">
        {/* Hero Section with Scorecard Summary */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#c92a2a] animate-pulse"></span>
                <span>MATCHDAY INNINGS • CHINNASWAMY STADIUM</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1c1917] leading-tight">
                Happy Birthday, <span className="text-[#c92a2a]">Sanjith.</span>
              </h1>

              <p className="text-[#44403c] text-sm sm:text-base leading-relaxed font-normal">
                Dedicated to the skipper of our squad. Loyal to Royal Challengers Bengaluru through every high and heartbreak, master of the wrist flick, disciple of Mitchell Starc's 148k yorkers, and author of the legendary shoelace boundary.
              </p>
            </div>

            {/* Interactive Live Scorecard Badge */}
            <div className="w-full sm:w-auto p-4 rounded-2xl bg-white border border-[#e7e5e4] shadow-sm flex flex-col justify-between sm:min-w-[240px]">
              <div className="flex items-center justify-between border-b border-[#f5f5f4] pb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716c]">Match Status</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Batting Live
                </span>
              </div>

              <div className="py-3 text-center space-y-0.5">
                <div className="text-4xl sm:text-5xl font-num font-black text-[#1c1917] tracking-tight">
                  {score}*
                </div>
                <div className="text-xs text-[#78716c] font-medium">Runs in Life • Not Out</div>
              </div>

              <button
                onClick={raiseBat}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  hasRaisedBat
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-[#1c1917] hover:bg-[#292524] text-white shadow-sm active:scale-95'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span>{hasRaisedBat ? "Bat Raised! 🏏 100*" : "Raise Bat to the Crowd 🏏"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* SIGNATURE ANIMATED INTERACTIVE ARTIFACT: The Wagon Wheel & Field Simulator */}
        <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e7e5e4] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c92a2a]" />
                <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                  Interactive Wagon Wheel & Ball Tracker
                </h2>
              </div>
              <p className="text-sm font-bold text-[#1c1917] mt-1">
                Click any shot below to simulate Sanjith's signature strokes on the Chinnaswamy pitch
              </p>
            </div>

            <div className="text-xs text-[#78716c] font-medium bg-[#fbfbfa] px-3 py-1.5 rounded-lg border border-[#e7e5e4]">
              Trajectory: <span className="font-bold text-[#c92a2a]">{activeShot.name}</span>
            </div>
          </div>

          {/* Interactive SVG Oval Field */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-square rounded-full border-4 border-emerald-600/30 bg-emerald-50/70 p-3 shadow-inner flex items-center justify-center overflow-hidden">
                {/* Cricket Field SVG */}
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Boundary Grass Rings */}
                  <circle cx="150" cy="150" r="142" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" strokeDasharray="6,4" />
                  
                  {/* 30 Yard Circle */}
                  <circle cx="150" cy="150" r="75" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />

                  {/* Pitch Strip */}
                  <rect x="142" y="100" width="16" height="100" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                  
                  {/* Bowling Crease & Stumps */}
                  <line x1="138" y1="110" x2="162" y2="110" stroke="#b45309" strokeWidth="1.5" />
                  <line x1="138" y1="190" x2="162" y2="190" stroke="#b45309" strokeWidth="1.5" />

                  {/* Stumps Markers */}
                  <circle cx="147" cy="110" r="1.5" fill="#78350f" />
                  <circle cx="150" cy="110" r="1.5" fill="#78350f" />
                  <circle cx="153" cy="110" r="1.5" fill="#78350f" />

                  <circle cx="147" cy="190" r="1.5" fill="#78350f" />
                  <circle cx="150" cy="190" r="1.5" fill="#78350f" />
                  <circle cx="153" cy="190" r="1.5" fill="#78350f" />

                  {/* Field Positions Labels */}
                  <text x="150" y="20" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Long Off</text>
                  <text x="150" y="290" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Long On / Fine Leg</text>
                  <text x="270" y="154" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Cover</text>
                  <text x="30" y="154" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Midwicket</text>

                  {/* Animated Shot Trajectory Curve */}
                  <path
                    d={`M ${activeShot.startX} ${activeShot.startY} Q ${activeShot.controlX} ${activeShot.controlY} ${activeShot.endX} ${activeShot.endY}`}
                    fill="none"
                    stroke={activeShot.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="dash-animated"
                  />

                  {/* Impact/Destination Ring */}
                  <circle
                    cx={activeShot.endX}
                    cy={activeShot.endY}
                    r="8"
                    fill={activeShot.color}
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                  <circle
                    cx={activeShot.endX}
                    cy={activeShot.endY}
                    r="5"
                    fill={activeShot.color}
                  />

                  {/* Animated Traveling Cricket Ball */}
                  <circle
                    cx={ballPos.x}
                    cy={ballPos.y}
                    r="5.5"
                    fill="#c92a2a"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="filter drop-shadow"
                  />
                  {/* Seam line on ball */}
                  <line 
                    x1={ballPos.x - 4} 
                    y1={ballPos.y} 
                    x2={ballPos.x + 4} 
                    y2={ballPos.y} 
                    stroke="#ffffff" 
                    strokeWidth="1" 
                    strokeDasharray="1,1" 
                  />
                </svg>
              </div>
            </div>

            {/* Shot Selector Controls & Commentary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716c]">
                  Select Shot to Replay
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {SHOTS.map(shot => {
                    const isSelected = activeShot.id === shot.id;
                    return (
                      <button
                        key={shot.id}
                        onClick={() => triggerShotAnimation(shot)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#fef2f2] border-[#c92a2a] shadow-xs'
                            : 'bg-white border-[#e7e5e4] hover:bg-[#fbfbfa]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: shot.color }}
                            />
                            <span className="text-xs font-bold text-[#1c1917]">
                              {shot.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#78716c]">
                            {shot.batter} • {shot.result}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#c92a2a]">
                          <Play className="w-3 h-3 fill-current" />
                          <span>Track</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Commentary Callout */}
              <div className="p-4 rounded-xl bg-[#fbfbfa] border border-[#e7e5e4] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c92a2a]">
                    Chinnaswamy Commentary
                  </span>
                  <span className="text-[11px] font-num font-bold text-[#78716c]">
                    Distance: {activeShot.distance}
                  </span>
                </div>
                <p className="text-xs text-[#44403c] leading-relaxed italic">
                  "{activeShot.commentary}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stadium Atmosphere Hero Plate (Real Chinnaswamy Photo) */}
        <section className="overflow-hidden rounded-2xl border border-[#e7e5e4] shadow-sm bg-white">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-100">
            <img 
              src="images/chinnaswamy_stadium.jpg" 
              alt="M. Chinnaswamy Stadium Bengaluru - Home of Royal Challengers Bengaluru" 
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#c92a2a] px-2.5 py-1 rounded text-white inline-block">
                  HOME OF RCB 💥
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  M. Chinnaswamy Stadium, Bengaluru
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
                  The electric colosseum of the 12th Man Army Stand D. Where Sanjith lives every single run, six, and wicket!
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/30 self-start sm:self-auto">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Stand D Season Ticket</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cricket Idols & RCB Legends Gallery (6 Real Verified Photos) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#c92a2a]" />
                <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                  Sanjith's Cricket Pantheon
                </h2>
              </div>
              <p className="text-base font-extrabold text-[#1c1917] mt-0.5">
                The Icons Who Define Sanjith's Cricket Philosophy
              </p>
            </div>

            {/* Gallery Tabs */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-[#e7e5e4] self-start sm:self-auto">
              <button
                onClick={() => setGalleryTab('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  galleryTab === 'all'
                    ? 'bg-white text-[#1c1917] shadow-xs'
                    : 'text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                All 5 Idols
              </button>
              <button
                onClick={() => setGalleryTab('rcb')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  galleryTab === 'rcb'
                    ? 'bg-white text-[#c92a2a] shadow-xs'
                    : 'text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                RCB Hall of Fame
              </button>
              <button
                onClick={() => setGalleryTab('legends')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  galleryTab === 'legends'
                    ? 'bg-white text-[#1c1917] shadow-xs'
                    : 'text-[#78716c] hover:text-[#1c1917]'
                }`}
              >
                Epic Finishes
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Virat Kohli */}
            {(galleryTab === 'all' || galleryTab === 'rcb') && (
              <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-sm flex flex-col justify-between hover:border-red-200 transition-colors group">
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                    <img 
                      src="images/virat_kohli.jpg" 
                      alt="Virat Kohli" 
                      className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#c92a2a] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      THE GOAT
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#b91c1c] uppercase tracking-wide">RCB & India</span>
                      <span className="text-xs text-[#78716c] font-medium">King Kohli</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1c1917]">Virat Kohli</h3>
                    <p className="text-xs text-[#78716c] leading-relaxed">
                      Sanjith's undisputed hero. Defended in every group chat debate with mathematical conviction. Creator of the iconic 82* vs Pakistan.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="text-[11px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2.5 rounded-xl border border-[#e7e5e4] block">
                    ✦ Milestone: 82* vs Pakistan (MCG 2022)
                  </span>
                </div>
              </div>
            )}

            {/* 2. Mitchell Starc */}
            {(galleryTab === 'all' || galleryTab === 'rcb') && (
              <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-sm flex flex-col justify-between hover:border-sky-200 transition-colors group">
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                    <img 
                      src="images/mitchell_starc.jpg" 
                      alt="Mitchell Starc" 
                      className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-sky-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      150 KM/H SPEARHEAD
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wide">2014-15 RCB Duo</span>
                      <span className="text-xs text-[#78716c] font-medium">Death Specialist</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1c1917]">Mitchell Starc</h3>
                    <p className="text-xs text-[#78716c] leading-relaxed">
                      Sanjith's bowling archetype. The left-arm sling action, 148k reverse-swinging yorkers, and ice-cold nerve when defending 7 runs in the final over.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="text-[11px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2.5 rounded-xl border border-[#e7e5e4] block">
                    ✦ Weapon: 148.5k Inswinging Laser Yorker
                  </span>
                </div>
              </div>
            )}

            {/* 3. AB de Villiers */}
            {(galleryTab === 'all' || galleryTab === 'rcb') && (
              <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-colors group">
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                    <img 
                      src="images/ab_de_villiers.jpg" 
                      alt="AB de Villiers" 
                      className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      MR. 360
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">Chinnaswamy Legend</span>
                      <span className="text-xs text-[#78716c] font-medium">RCB Hall of Fame</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1c1917]">AB de Villiers</h3>
                    <p className="text-xs text-[#78716c] leading-relaxed">
                      The genius who proved no boundary is safe. Every time Sanjith attempts an audacious scoop or ramp shot in gully cricket, this is the inspiration.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="text-[11px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2.5 rounded-xl border border-[#e7e5e4] block">
                    ✦ Special: Chinnaswamy Roof-Top Sixes
                  </span>
                </div>
              </div>
            )}

            {/* 4. Ben Stokes */}
            {(galleryTab === 'all' || galleryTab === 'legends') && (
              <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-sm flex flex-col justify-between hover:border-amber-200 transition-colors group">
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                    <img 
                      src="images/ben_stokes_headingley.jpg" 
                      alt="Ben Stokes Headingley 2019" 
                      className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      HEADES 2019 • 135*
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">The Greatest Finish</span>
                      <span className="text-xs text-[#78716c] font-medium">Headingley Miracle</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1c1917]">Ben Stokes</h3>
                    <p className="text-xs text-[#78716c] leading-relaxed">
                      Sanjith's favorite Test match epic. 73-run last wicket partnership with Jack Leach. Pure guts, reverse sweeps, and never giving up until the final boundary.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="text-[11px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2.5 rounded-xl border border-[#e7e5e4] block">
                    ✦ Iconic Chase: 135* vs Australia (2019)
                  </span>
                </div>
              </div>
            )}

            {/* 5. Chris Gayle */}
            {(galleryTab === 'all' || galleryTab === 'rcb') && (
              <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-sm flex flex-col justify-between hover:border-red-200 transition-colors group">
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                    <img 
                      src="images/chris_gayle.jpg" 
                      alt="Chris Gayle Universe Boss" 
                      className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#c92a2a] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      UNIVERSE BOSS
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#b91c1c] uppercase tracking-wide">RCB Powerhouse</span>
                      <span className="text-xs text-[#78716c] font-medium">175* World Record</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1c1917]">Chris Gayle</h3>
                    <p className="text-xs text-[#78716c] leading-relaxed">
                      The man who smashed 175* off 66 balls at Chinnaswamy. The swagger, the maximums, and the golden era of RCB batting entertainment.
                    </p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="text-[11px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2.5 rounded-xl border border-[#e7e5e4] block">
                    ✦ Bangalore Record: 175* vs PWI (2013)
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Squad Folklore: The Famous Shoelace Incident */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#fffbeb] border border-[#fde68a] space-y-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-[#b45309] font-bold">
              Matchday Archives • Stand D Locker Room Story
            </span>
            <span className="text-xs font-bold bg-[#fef3c7] text-[#92400e] px-2.5 py-1 rounded-full border border-[#fcd34d]">
              True Squad Lore
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#78350f]">
            The Day You Tied Your Shoelaces During Live Play 😂👟
          </h3>

          <p className="text-sm sm:text-base text-[#92400e] leading-relaxed">
            The bowler begins his run-up. The batsman takes his guard. Meanwhile, out at deep backward point, you calmly bend over to double-knot your sneakers. The bowler bowls without looking. The batsman slices it right straight down your throat! You are completely dialed in on your shoelace knot. The ball rolls past your heels into the fence for four.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs font-bold bg-white text-[#78350f] px-3 py-1.5 rounded-lg border border-[#fde68a] shadow-2xs">
              Runs Saved: 0
            </span>
            <span className="text-xs font-bold bg-white text-[#78350f] px-3 py-1.5 rounded-lg border border-[#fde68a] shadow-2xs">
              Shoelaces Tied: 100%
            </span>
            <span className="text-xs font-bold bg-[#78350f] text-white px-3 py-1.5 rounded-lg shadow-2xs">
              Swagger Level: 10/10
            </span>
          </div>
        </section>

        {/* Pavilion Ledger (Guestbook with LocalStorage) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#c92a2a]" />
                <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                  Pavilion Visitor Ledger
                </h2>
              </div>
              <p className="text-base font-extrabold text-[#1c1917] mt-0.5">
                Leave a Birthday Note for Sanjith
              </p>
            </div>

            <span className="text-xs text-[#78716c] bg-stone-100 px-3 py-1 rounded-lg border border-[#e7e5e4]">
              {notes.length} wishes recorded
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handlePost} className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e7e5e4] shadow-sm space-y-3">
            <div>
              <label className="block text-xs font-bold text-[#1c1917] mb-1">
                Your Name / Squad Nickname
              </label>
              <input
                type="text"
                placeholder="e.g. Azan, The Fast Bowler, Stand D Friend..."
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfa] border border-[#d6d3d1] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1c1917] mb-1">
                Birthday Wish or Cricket Roast
              </label>
              <textarea
                placeholder="Write a message, favorite match memory, or roast him about his bowling..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#fbfbfa] border border-[#d6d3d1] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saved ? (
                <span className="text-xs text-[#15803d] font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Wish saved into the ledger!
                </span>
              ) : (
                <span className="text-[11px] text-[#78716c]">
                  Wishes are stored in browser storage
                </span>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#c92a2a] hover:bg-[#b02525] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-transform shadow-sm active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Sign Ledger</span>
              </button>
            </div>
          </form>

          {/* Notes list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {notes.map(note => (
              <div 
                key={note.id} 
                className="p-4 rounded-xl bg-white border border-[#e7e5e4] shadow-xs space-y-1.5 flex flex-col justify-between hover:border-stone-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#1c1917]">{note.from}</span>
                    {note.time && (
                      <span className="text-[10px] text-[#a8a29e]">{note.time}</span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed mt-1">
                    "{note.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-[#e7e5e4] px-6 py-8 text-center text-xs text-[#78716c] bg-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1c1917]">Sanjith #10</span>
            <span>•</span>
            <span>Chinnaswamy Stand D</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#c92a2a] fill-[#c92a2a] inline" />
            <span>by Azan for Sanjith • Ee Sala Cup Namde!</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
