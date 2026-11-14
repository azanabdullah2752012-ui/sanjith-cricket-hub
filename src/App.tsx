import React, { useState, useEffect, useRef } from 'react';
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
  Trash2,
  Trophy,
  Shield,
  Zap,
  MapPin,
  Volume2,
  VolumeX,
  RotateCw,
  Target,
  Maximize2,
  Award
} from 'lucide-react';

interface Note {
  id: number;
  from: string;
  text: string;
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
  isWicket?: boolean;
}

const SHOTS: ShotConfig[] = [
  {
    id: 'wrist-flick',
    name: 'The Wrist Flick',
    category: "Sanjith's Signature Shot",
    standLocation: 'Into Stand D / Mid-Wicket',
    description: "Sanjith's trademark stroke: whipping the ball off the pads high and clean into the Chinnaswamy mid-wicket stands.",
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
    description: "The edge trickling past into the boundary rope while Sanjith was bent down double-knotting his right sneaker.",
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
    name: 'Starc 2015 RCB Yorker',
    category: "Sanjith's Bowling Idol",
    standLocation: 'Base of Middle Stump',
    description: "The toe-crushing 148k inswinger that Mitchell Starc used to defend final overs for RCB at Chinnaswamy.",
    color: '#0284c7',
    startX: 150,
    startY: 70,
    controlX: 150,
    controlY: 120,
    endX: 150,
    endY: 165,
    isWicket: true
  },
  {
    id: 'kohli-mcg',
    name: "Kohli's Straight Six",
    category: 'Favorite Chase Moment',
    standLocation: 'Over Bowler into Sightscreen',
    description: "Virat Kohli's back-foot straight loft over Haris Rauf in the 19th over at Melbourne (MCG 2022).",
    color: '#c92a2a',
    startX: 150,
    startY: 155,
    controlX: 150,
    controlY: 90,
    endX: 150,
    endY: 25
  }
];

// Real Historic RCB Milestones
const RCB_MILESTONES = [
  {
    year: '2013',
    title: 'Gayle Storm: 175* (66)',
    location: 'Chinnaswamy Stadium',
    desc: 'The highest individual score in T20 cricket history, featuring 17 sixes that landed onto Cubbon Road.'
  },
  {
    year: '2015',
    title: 'The Starc & Kohli Era',
    location: 'Chinnaswamy Fortress',
    desc: 'Mitchell Starc spearheaded the RCB pace attack with 20 wickets in 13 matches (economy 6.76) carrying RCB into the playoffs.'
  },
  {
    year: '2016',
    title: "Kohli's 973 Runs & 4 Tons",
    location: 'Chinnaswamy Stadium',
    desc: 'The greatest individual batting season in IPL history, batting through stitches and leading RCB to the final.'
  },
  {
    year: '2024',
    title: 'May 18 Chinnaswamy Roar',
    location: 'Stand D & Chinnaswamy',
    desc: 'Six consecutive must-win victories capped with defending 218 against CSK in front of the loudest 12th Man crowd.'
  }
];

export function App() {
  // Web Audio Synthesizer for Authentic Cricket Atmosphere
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSound = (type: 'bat' | 'stump' | 'cheer' | 'horn') => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'bat') {
        // Deep resonant wood bat thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);
        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'stump') {
        // Timber clatter & bail rattle
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.22);
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'cheer') {
        // Stadium crowd roar shimmer
        const bufferSize = ctx.sampleRate * 0.7;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1100;
        filter.Q.value = 3;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        whiteNoise.start(now);
      } else if (type === 'horn') {
        // Cricket stadium horn: two-tone trumpet
        const notes = [440, 554, 659];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + i * 0.1);
          gain.gain.setValueAtTime(0.15, now + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.1);
          osc.stop(now + (i + 1) * 0.18);
        });
      }
    } catch {
      // Audio fallback
    }
  };

  // 3D Card Tilt State on Mouse Move
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setCardTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // Interactive Mini-Game State: "The Wrist Flick Challenge"
  const [gameActive, setGameActive] = useState(false);
  const [ballPosition, setBallPosition] = useState(0); // 0 to 100 (bowling progress)
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [scoreCount, setScoreCount] = useState(0);
  const gameIntervalRef = useRef<number | null>(null);

  const startBowling = () => {
    setGameActive(true);
    setGameResult(null);
    setBallPosition(0);

    const startTime = performance.now();
    const duration = 1200; // 1.2s delivery

    const step = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setBallPosition(progress);

      if (progress < 100) {
        gameIntervalRef.current = requestAnimationFrame(step);
      } else {
        setGameActive(false);
        setGameResult("Bowled! You missed the timing window. Try again!");
        playSound('stump');
      }
    };

    gameIntervalRef.current = requestAnimationFrame(step);
  };

  const hitShot = () => {
    if (!gameActive) {
      startBowling();
      return;
    }

    if (gameIntervalRef.current) {
      cancelAnimationFrame(gameIntervalRef.current);
    }
    setGameActive(false);

    // Sweet spot is between 68% and 82%
    if (ballPosition >= 70 && ballPosition <= 82) {
      playSound('bat');
      playSound('cheer');
      setGameResult("🔥 PERFECT SWEET SPOT! MASSIVE SIX INTO STAND D! (Sanjith's Signature Wrist Flick!)");
      setScoreCount(prev => prev + 6);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#c92a2a', '#eab308', '#ffffff']
      });
    } else if (ballPosition >= 55 && ballPosition < 70) {
      playSound('bat');
      setGameResult("🏏 A bit early! Driven along the ground to mid-on for 2 runs.");
      setScoreCount(prev => prev + 2);
    } else if (ballPosition > 82 && ballPosition <= 92) {
      playSound('bat');
      setGameResult("👟 The Shoelace Boundary! Sliced off the edge past deep third man for 4 runs while tying laces! 😂");
      setScoreCount(prev => prev + 4);
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#d97706', '#c92a2a']
      });
    } else {
      playSound('stump');
      setGameResult("💥 Beaten by Mitchell Starc's 148k yorker! Timber shattered!");
    }
  };

  // Wagon Wheel Interactive State
  const [activeShot, setActiveShot] = useState<ShotConfig>(SHOTS[0]);
  const [animatingBall, setAnimatingBall] = useState(false);
  const [pitchBallPos, setPitchBallPos] = useState({ x: SHOTS[0].endX, y: SHOTS[0].endY });

  const triggerShotAnimation = (shot: ShotConfig) => {
    setActiveShot(shot);
    setAnimatingBall(true);
    setPitchBallPos({ x: shot.startX, y: shot.startY });

    if (shot.isWicket) {
      playSound('stump');
    } else {
      playSound('bat');
      playSound('cheer');
    }

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

  // Red & Gold RCB Confetti
  const popRcbConfetti = () => {
    playSound('cheer');
    playSound('horn');
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#c92a2a', '#d97706', '#000000', '#ffffff', '#eab308']
    });
  };

  // Guestbook: Starts clean, wipes legacy test bots
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      localStorage.removeItem('sanjith_birthday_notes');
      const saved = localStorage.getItem('sanjith_birthday_notes_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(n => 
            !n.from?.includes('Squad XI') &&
            !n.from?.includes('Bowler') &&
            !n.from?.includes('12th Man') &&
            !n.text?.includes('Always got your back') &&
            !n.text?.includes('shoelaces') &&
            !n.text?.includes('Eesala Cup Namde')
          );
        }
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
      localStorage.setItem('sanjith_birthday_notes_v3', JSON.stringify(notes));
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
      text: noteText.trim()
    };

    setNotes(prev => [newNote, ...prev]);
    setFromName('');
    setNoteText('');
    setSaved(true);
    popRcbConfetti();
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#1c1917] flex flex-col justify-between selection:bg-[#c92a2a] selection:text-white">
      {/* Top RCB Bar */}
      <header className="border-b border-[#e7e5e4] px-4 sm:px-6 py-4 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c92a2a] to-[#991b1b] flex items-center justify-center font-num font-black text-white text-lg shadow-sm border border-red-700/40">
              10
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-[#1c1917]">Sanjith</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#fef2f2] text-[#c92a2a] border border-[#fecaca] tracking-wider uppercase">
                  RCB 12th Man
                </span>
              </div>
              <span className="text-[11px] text-[#78716c] block">Chinnaswamy Stand D • Special Edition</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Interactive Soundboard Mini Buttons */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button 
                onClick={() => playSound('bat')}
                className="px-2 py-1 text-[11px] font-bold text-stone-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Bat Crack Sound"
              >
                🏏 Bat
              </button>
              <button 
                onClick={() => playSound('stump')}
                className="px-2 py-1 text-[11px] font-bold text-stone-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Stump Shatter Sound"
              >
                💥 Stumps
              </button>
              <button 
                onClick={() => playSound('horn')}
                className="px-2 py-1 text-[11px] font-bold text-stone-700 hover:bg-white rounded-lg transition-colors cursor-pointer"
                title="Stadium Horn"
              >
                🎺 Horn
              </button>
            </div>

            {/* Ee Sala Cup Namdu Chant Button */}
            <button
              onClick={popRcbConfetti}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#c92a2a] hover:bg-[#b02525] text-white font-bold text-xs transition-transform flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Ee Sala Cup Namdu! 💥</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full space-y-14">
        {/* HERO SECTION WITH 3D INTERACTIVE COLLECTIBLE TRADING CARD */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Editorial Intro */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#c92a2a] animate-pulse"></span>
              <span>ROYAL CHALLENGERS BENGALURU • STAND D</span>
              <span>•</span>
              <span>#10</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1c1917] leading-tight">
              Happy Birthday, <br />
              <span className="text-[#c92a2a]">Skipper Sanjith.</span>
            </h1>

            <p className="text-[#44403c] text-base sm:text-lg leading-relaxed font-normal">
              A bespoke tribute to the finest batsman, fastest yorker bowler, and most dedicated Royal Challengers Bengaluru loyalist in the squad. Today we celebrate your passion for Chinnaswamy cricket, King Kohli's brilliance, and the legendary day you tied your shoelaces in the outfield.
            </p>

            {/* Key Attributes Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e7e5e4] text-xs font-bold text-[#1c1917] shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-[#c92a2a]" />
                RCB 12th Man Army
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e7e5e4] text-xs font-bold text-[#1c1917] shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                Trademark Wrist Flick
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e7e5e4] text-xs font-bold text-[#1c1917] shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-sky-600" />
                Starc 148k Yorker
              </span>
            </div>
          </div>

          {/* Right: 3D Holographic Player Trading Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div 
              className="perspective-1000 w-full max-w-[320px] aspect-[1/1.45] cursor-pointer select-none"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => setIsCardFlipped(!isCardFlipped)}
              ref={cardRef}
            >
              <div 
                className="w-full h-full relative preserve-3d transition-transform duration-500 rounded-3xl shadow-xl"
                style={{
                  transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY + (isCardFlipped ? 180 : 0)}deg)`
                }}
              >
                {/* FRONT OF THE CARD */}
                <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-[#181513] to-[#0a0908] p-5 text-white border-2 border-amber-400/40 flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Holographic light reflection sheen */}
                  <div 
                    className="absolute inset-0 holo-glare opacity-40 transition-opacity"
                    style={{
                      transform: `translate(${cardTilt.glareX - 50}%, ${cardTilt.glareY - 50}%)`
                    }}
                  />

                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-amber-400/30 pb-3 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#c92a2a] flex items-center justify-center font-num font-black text-xs text-white">
                        10
                      </div>
                      <span className="text-xs font-black tracking-widest text-amber-300 uppercase">
                        RCB • SKIPPER
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      LIMITED #10/10
                    </span>
                  </div>

                  {/* Card Center: Player Emblem & Chinnaswamy Stadium Plate */}
                  <div className="py-4 text-center space-y-3 z-10">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-tr from-[#c92a2a] to-amber-500 p-0.5 shadow-lg">
                      <div className="w-full h-full rounded-2xl bg-stone-900 flex flex-col items-center justify-center">
                        <span className="text-3xl font-num font-black text-white">#10</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-amber-300">SANJITH</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white tracking-wide">
                        SANJITH
                      </h3>
                      <p className="text-xs text-amber-300/90 font-medium">
                        Stand D • Royal Challengers Bengaluru
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Signature Stroke */}
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/15 z-10 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-amber-200 font-bold uppercase">
                      <span>Trademark Shot</span>
                      <span className="text-white">Wrist Flick</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-amber-200 font-bold uppercase">
                      <span>Bowling Style</span>
                      <span className="text-white">Starc Inswing</span>
                    </div>
                  </div>
                </div>

                {/* BACK OF THE CARD */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-3xl bg-white p-5 text-stone-900 border-2 border-stone-200 flex flex-col justify-between overflow-hidden shadow-2xl"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-[#c92a2a]">
                      Player Dossier • #10
                    </span>
                    <span className="text-[10px] font-bold text-stone-400">AUTHENTIC</span>
                  </div>

                  <div className="space-y-3 py-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">Franchise Loyalty</span>
                      <p className="font-extrabold text-stone-800">Royal Challengers Bengaluru (RCB)</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">Home Ground</span>
                      <p className="font-extrabold text-stone-800">M. Chinnaswamy Stadium (Stand D)</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">Cricket Idols</span>
                      <p className="font-extrabold text-stone-800">Virat Kohli & Mitchell Starc</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">Legendary Match</span>
                      <p className="font-extrabold text-stone-800">The Shoelace Boundary Match 😂</p>
                    </div>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-200 text-center">
                    <span className="text-[11px] font-bold text-[#c92a2a] block">
                      "Ee Sala Cup Namdu! 💥"
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#78716c] font-medium mt-3">
              <RotateCw className="w-3.5 h-3.5 text-[#c92a2a]" />
              <span>Hover to tilt in 3D • Click card to flip</span>
            </div>
          </div>
        </section>

        {/* INTERACTIVE MINI-GAME: "THE WRIST FLICK CHALLENGE" */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-[#1c1917] to-stone-900 text-white shadow-lg space-y-6 relative overflow-hidden">
          {/* Subtle cricket ground pitch markings background */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Interactive Mini-Game
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                The Wrist Flick Challenge 🏏
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Can you time Sanjith's signature flick off the pads into Stand D?
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-2xl border border-white/20 self-start sm:self-auto flex items-center gap-3">
              <span className="text-xs text-stone-300 font-medium">Squad Score:</span>
              <span className="text-xl font-num font-black text-amber-400">{scoreCount} Runs</span>
            </div>
          </div>

          {/* The Pitch Bowling Track */}
          <div className="space-y-3">
            <div className="relative h-12 bg-stone-800 rounded-2xl border border-stone-700 p-1 flex items-center overflow-hidden">
              {/* Timing Zones */}
              <div className="absolute inset-y-0 left-0 w-[55%] bg-stone-700/30 flex items-center justify-center text-[10px] text-stone-400 font-bold">
                Run-Up
              </div>
              <div className="absolute inset-y-0 left-[55%] w-[15%] bg-blue-500/20 border-l border-blue-500/40 flex items-center justify-center text-[9px] text-blue-300 font-bold">
                Drive (2)
              </div>
              <div className="absolute inset-y-0 left-[70%] w-[12%] bg-emerald-500/30 border-x border-emerald-400 flex items-center justify-center text-[10px] text-emerald-300 font-black animate-pulse">
                FLICK (6) 💥
              </div>
              <div className="absolute inset-y-0 left-[82%] w-[10%] bg-amber-500/30 border-r border-amber-400 flex items-center justify-center text-[9px] text-amber-300 font-bold">
                Shoelace (4)
              </div>

              {/* The Bowling Cricket Ball */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#c92a2a] to-red-900 border-2 border-white shadow-md flex items-center justify-center transition-all duration-75"
                style={{ left: `calc(${ballPosition}% - 12px)` }}
              >
                <div className="w-full h-0.5 bg-white/60 rotate-45" />
              </div>
            </div>

            {/* Game Controls & Feedback */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
              <div className="text-xs font-semibold text-stone-300">
                {gameResult ? (
                  <span className="text-amber-300 font-bold text-sm">{gameResult}</span>
                ) : (
                  <span>Click "Bowl Delivery", then time your click inside the green FLICK zone!</span>
                )}
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={startBowling}
                  disabled={gameActive}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition-transform cursor-pointer flex items-center justify-center gap-1.5 ${
                    gameActive 
                      ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                      : 'bg-white hover:bg-stone-100 text-stone-900 shadow-sm active:scale-95'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Bowl Delivery</span>
                </button>

                <button
                  onClick={hitShot}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#c92a2a] hover:bg-[#b02525] text-white font-black text-xs transition-transform cursor-pointer shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300 fill-current" />
                  <span>WHIP FLICK! 🏏</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Real Chinnaswamy Stadium Photo Plate */}
        <section className="overflow-hidden rounded-3xl border border-[#e7e5e4] shadow-sm bg-white">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-stone-100">
            <img 
              src="images/chinnaswamy_stadium.jpg" 
              alt="M. Chinnaswamy Stadium Bengaluru - Home of Royal Challengers Bengaluru" 
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#c92a2a] px-2.5 py-1 rounded text-white inline-block">
                    FORTRESS OF THE 12TH MAN ARMY 💥
                  </span>
                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur px-2 py-0.5 rounded text-white">
                    STAND D
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-white">
                  M. Chinnaswamy Stadium, Bengaluru
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                  Where Sanjith cheers for every ball, every boundary into Cubbon Park, and every match-winning over.
                </p>
              </div>

              <button
                onClick={popRcbConfetti}
                className="bg-white hover:bg-stone-100 text-[#1c1917] font-bold text-xs px-3.5 py-2 rounded-xl transition-transform active:scale-95 cursor-pointer self-start sm:self-auto shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c92a2a]" />
                <span>Cheer Stand D</span>
              </button>
            </div>
          </div>
        </section>

        {/* The 2014-2015 RCB Era & Sanjith's Cricket Pantheon */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#c92a2a]" />
                <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                  Sanjith's Cricket Pantheon & RCB Heroes
                </h2>
              </div>
              <p className="text-sm font-extrabold text-[#1c1917] mt-0.5">
                The players Sanjith defends, emulates, and celebrates
              </p>
            </div>

            <span className="text-xs font-bold text-[#c92a2a] bg-[#fef2f2] px-2.5 py-1 rounded-lg border border-[#fecaca] self-start sm:self-auto">
              Real Photos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Virat Kohli */}
            <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-xs flex flex-col justify-between hover:border-red-200 transition-colors">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                  <img 
                    src="images/virat_kohli.jpg" 
                    alt="Virat Kohli" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-[#c92a2a] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    RCB ICON
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#b91c1c] uppercase tracking-wide">The GOAT Batter</span>
                    <span className="text-[11px] text-[#78716c]">17+ Yrs RCB</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">Virat Kohli</h3>
                  <p className="text-xs text-[#78716c] leading-relaxed">
                    Sanjith's undisputed batting idol. Defended in every single cricket argument.
                  </p>
                </div>
              </div>
              <div className="p-3.5 pt-0">
                <span className="text-[10px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2 rounded-lg border border-[#e7e5e4] block">
                  ✦ Iconic Finish: 82* vs Pak (MCG)
                </span>
              </div>
            </div>

            {/* 2. Mitchell Starc (2014-15 RCB) */}
            <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-xs flex flex-col justify-between hover:border-sky-200 transition-colors">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                  <img 
                    src="images/mitchell_starc.jpg" 
                    alt="Mitchell Starc" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-sky-700 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    2014-15 RCB DUO
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wide">Bowling Idol</span>
                    <span className="text-[11px] text-[#78716c]">148k Pacer</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">Mitchell Starc</h3>
                  <p className="text-xs text-[#78716c] leading-relaxed">
                    The spearhead when Starc & Kohli played together in red & gold for RCB.
                  </p>
                </div>
              </div>
              <div className="p-3.5 pt-0">
                <span className="text-[10px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2 rounded-lg border border-[#e7e5e4] block">
                  ✦ Weapon: Inswinging Yorker
                </span>
              </div>
            </div>

            {/* 3. AB de Villiers */}
            <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-xs flex flex-col justify-between hover:border-emerald-200 transition-colors">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                  <img 
                    src="images/ab_de_villiers.jpg" 
                    alt="AB de Villiers" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    MR. 360
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">RCB Hall of Fame</span>
                    <span className="text-[11px] text-[#78716c]">Chinnaswamy Legend</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">AB de Villiers</h3>
                  <p className="text-xs text-[#78716c] leading-relaxed">
                    Chinnaswamy's adopted son who made every impossible ramp shot look natural.
                  </p>
                </div>
              </div>
              <div className="p-3.5 pt-0">
                <span className="text-[10px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2 rounded-lg border border-[#e7e5e4] block">
                  ✦ Special: Chinnaswamy Roof Sixes
                </span>
              </div>
            </div>

            {/* 4. Ben Stokes */}
            <div className="rounded-2xl bg-white border border-[#e7e5e4] overflow-hidden shadow-xs flex flex-col justify-between hover:border-amber-200 transition-colors">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 relative">
                  <img 
                    src="images/ben_stokes_headingley.jpg" 
                    alt="Ben Stokes Headingley 2019" 
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-amber-600 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    HEADES 2019
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Favorite Test</span>
                    <span className="text-[11px] text-[#78716c]">135* Miracle</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1c1917]">Ben Stokes</h3>
                  <p className="text-xs text-[#78716c] leading-relaxed">
                    Sanjith's favorite Test match finish — the 73-run 10th wicket partnership.
                  </p>
                </div>
              </div>
              <div className="p-3.5 pt-0">
                <span className="text-[10px] font-semibold text-[#1c1917] bg-[#fbfbfa] p-2 rounded-lg border border-[#e7e5e4] block">
                  ✦ 73-run 10th Wicket Chase
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Real RCB Historic Matchday Milestones */}
        <section className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e7e5e4] shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#c92a2a]" />
                <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                  RCB Matchday Archives
                </h2>
              </div>
              <p className="text-sm font-extrabold text-[#1c1917] mt-0.5">
                Historic Moments That Every RCB Fan Holds Close
              </p>
            </div>

            <span className="text-[11px] font-bold text-[#78716c] bg-[#fbfbfa] px-2.5 py-1 rounded-lg border border-[#e7e5e4]">
              Chinnaswamy Lore
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {RCB_MILESTONES.map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-[#fbfbfa] border border-[#e7e5e4] space-y-1.5 hover:border-red-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-num font-extrabold text-[#c92a2a] bg-red-50 px-2 py-0.5 rounded border border-red-100">
                    {item.year}
                  </span>
                  <span className="text-[11px] text-[#78716c] font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#c92a2a]" />
                    {item.location}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1c1917]">
                  {item.title}
                </h4>
                <p className="text-xs text-[#78716c] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Animated Wagon Wheel mapped to Chinnaswamy Field */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e7e5e4] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c92a2a]" />
                <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
                  Chinnaswamy Pitch & Wagon Wheel
                </h2>
              </div>
              <p className="text-sm font-bold text-[#1c1917] mt-0.5">
                Simulate Sanjith's signature strokes and Starc's yorkers on the pitch
              </p>
            </div>

            <div className="text-xs font-semibold text-[#c92a2a] bg-[#fef2f2] px-3 py-1.5 rounded-lg border border-[#fecaca] self-start sm:self-auto">
              {activeShot.name} • {activeShot.standLocation}
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
                  <text x="32" y="154" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">Stand D</text>

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
            <div className="md:col-span-6 space-y-3">
              <div className="space-y-2">
                {SHOTS.map(shot => {
                  const isSelected = activeShot.id === shot.id;
                  return (
                    <button
                      key={shot.id}
                      onClick={() => triggerShotAnimation(shot)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
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
                          {shot.category} • {shot.standLocation}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#c92a2a]">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Track</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Shot Details Box */}
              <div className="p-3.5 rounded-2xl bg-[#fbfbfa] border border-[#e7e5e4]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716c] block mb-1">
                  Chinnaswamy Pitch Trajectory
                </span>
                <p className="text-xs text-[#44403c] leading-relaxed">
                  {activeShot.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Squad Folklore: The True Shoelace Incident */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#fffbeb] border border-[#fde68a] space-y-3 shadow-xs">
          <div className="text-xs uppercase tracking-widest text-[#b45309] font-bold">
            Squad Folklore
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#78350f]">
            The Match Where You Tied Your Shoelaces During Live Play 😂
          </h3>

          <p className="text-sm sm:text-base text-[#92400e] leading-relaxed">
            The bowler was running in to bowl. Meanwhile, out in the outfield, you calmly bent down to tie your shoelaces. The bowler delivered without noticing, the batsman hit it right in your direction, and the ball went straight past you for four while your head was down getting your knot right.
          </p>

          <p className="text-xs sm:text-sm text-[#b45309] font-medium italic pt-1">
            "Runs saved: 0. Shoes tied: 100%. One of the funniest match moments in squad history."
          </p>
        </section>

        {/* Real Guestbook (No fake bots or preloaded messages) */}
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

          <form onSubmit={handlePost} className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e7e5e4] shadow-xs space-y-3">
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
              <div className="p-6 text-center rounded-2xl bg-white border border-[#e7e5e4] text-[#78716c] text-xs">
                No messages yet. Be the first to leave a birthday note for Sanjith!
              </div>
            ) : (
              notes.map(note => (
                <div 
                  key={note.id} 
                  className="p-4 rounded-2xl bg-white border border-[#e7e5e4] shadow-2xs space-y-1 flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#1c1917] block">{note.from}</span>
                    <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed">
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

      {/* Clean RCB Footer */}
      <footer className="border-t border-[#e7e5e4] px-6 py-8 text-center text-xs text-[#78716c] bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1c1917]">RCB 12th Man Stand D</span>
            <span>•</span>
            <span>Sanjith #10</span>
          </div>

          <div className="flex items-center gap-1.5">
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
