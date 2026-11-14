import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Heart, 
  Send, 
  Check, 
  Trash2,
  Trophy,
  Flame,
  ArrowUpRight,
  Quote,
  Ticket,
  Maximize2,
  MapPin,
  Calendar,
  Layers,
  Zap,
  Volume2
} from 'lucide-react';

interface Note {
  id: number;
  from: string;
  text: string;
  timestamp?: string;
}

export function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'rcb' | 'finishes'>('all');
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; subtitle: string; tag: string } | null>(null);

  const popRcbConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.3 },
      colors: ['#e11d48', '#d92323', '#eab308', '#f5f4f0', '#1c1917']
    });
  };

  // Guestbook State - purely local, zero fake bot data
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      localStorage.removeItem('sanjith_birthday_notes');
      localStorage.removeItem('sanjith_birthday_notes_v3');
      const saved = localStorage.getItem('sanjith_editorial_notes_v4');
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
      localStorage.setItem('sanjith_editorial_notes_v4', JSON.stringify(notes));
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
      timestamp: 'Just now'
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
    <div className="min-h-screen bg-[#0c0b0a] text-[#f5f4f0] relative selection:bg-[#d92323] selection:text-white overflow-x-hidden">
      {/* Subtle Grain & Ambient Glow Background */}
      <div className="fixed inset-0 pointer-events-none bg-grain z-0 opacity-40" />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-[#d92323]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/2 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Matchday Pass Header */}
      <header className="border-b border-[#22201c] bg-[#0c0b0a]/90 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl tracking-wider text-[#d92323]">#10</span>
              <div className="w-2 h-2 rounded-full bg-[#d92323] animate-pulse" />
            </div>
            <div className="h-4 w-px bg-[#262420]" />
            <div className="flex flex-col">
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-stone-300">
                RCB Stand D • VIP Ledger
              </span>
              <span className="text-[10px] text-stone-500 font-num">
                BENGALURU • SPECIAL ISSUE FOR SANJITH
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={popRcbConfetti}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#d92323] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#d92323] text-white font-extrabold text-xs transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,35,35,0.35)] active:scale-95"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span className="tracking-wide">Ee Sala Cup Namde! 💥</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Experience Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 relative z-10 space-y-24">

        {/* HERO SECTION: Editorial Stadium Pass & High-Impact Typography */}
        <section className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Hero Title & Real Story from Azan */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1917] border border-[#2e2a25] text-[11px] font-black tracking-widest text-amber-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>CHINNASWAMY STAND D REGULAR</span>
                <span className="text-stone-600">•</span>
                <span>OCTOBER 2024 SPECIAL</span>
              </div>

              <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-[0.86] text-white uppercase">
                Happy Birthday, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d92323] via-[#ff4d4d] to-amber-500">
                  Sanjith.
                </span>
              </h1>

              <div className="space-y-3 max-w-2xl text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  I don't play cricket myself, but nobody can spend five minutes around you without hearing about <strong className="text-white font-bold">Royal Challengers Bengaluru</strong>, getting into a heated two-hour debate over Virat Kohli, or having to watch you shadow-practice your wrist flick.
                </p>
                <p className="text-sm text-stone-400 font-normal">
                  Built this custom matchday hub for your birthday bro — curated around your favorite team, players, and the funniest locker room lore we've got.
                </p>
              </div>
            </div>

            {/* Right Hero: Authentic Stand D Match Pass / Ticket Stub */}
            <div className="lg:col-span-4 bg-[#141210] border border-[#272522] rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between space-y-6">
              {/* Gold Accent corner flare */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#22201c] pb-3">
                  <div className="flex items-center gap-2 text-amber-400 font-black text-xs tracking-widest uppercase">
                    <Ticket className="w-4 h-4" />
                    <span>LIFETIME STAND PASS</span>
                  </div>
                  <span className="font-num text-[11px] text-stone-500 tracking-wider">SEC: D-10</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500">HOLDER NAME</span>
                  <div className="font-display text-3xl text-white tracking-wide">SANJITH #10</div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#1c1917] border border-[#262420]">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 block">LOYALTY</span>
                    <span className="font-bold text-[#d92323] text-sm">RCB 12th Man</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#1c1917] border border-[#262420]">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 block">STADIUM</span>
                    <span className="font-bold text-amber-300 text-sm">Chinnaswamy</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs pt-1">
                  <div className="flex justify-between text-stone-400 text-[11px]">
                    <span>Favorite Shot:</span>
                    <span className="text-white font-medium">Wrist Flick off the pads</span>
                  </div>
                  <div className="flex justify-between text-stone-400 text-[11px]">
                    <span>Bowling Weapon:</span>
                    <span className="text-white font-medium">Starc 148k Yorker</span>
                  </div>
                </div>
              </div>

              {/* Faux Barcode & Stamp */}
              <div className="pt-4 border-t border-dashed border-[#272522] flex items-center justify-between">
                <div className="space-y-1">
                  {/* Decorative Barcode */}
                  <div className="flex items-center gap-[2px] h-6 opacity-60">
                    {[3,1,4,2,1,5,2,1,4,1,3,2,5,1,2,3,1,4,2].map((w, i) => (
                      <div key={i} className="bg-white h-full" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <span className="text-[8px] font-num tracking-widest text-stone-500 block uppercase">
                    NO. 2024-SANJITH-RCB-10
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#d92323]/20 border border-[#d92323]/40 text-[#d92323] text-[9px] font-black uppercase tracking-widest">
                  VALID 4EVER
                </div>
              </div>
            </div>

          </div>

          {/* CHINNASWAMY FULL-BLEED STADIUM HERO PLATE */}
          <div 
            onClick={() => setSelectedImage({
              src: 'images/chinnaswamy_stadium.jpg',
              title: 'M. Chinnaswamy Stadium, Bengaluru',
              subtitle: 'Stand D — The epicenter of RCB passion where Sanjith loses his voice every single IPL season.',
              tag: "SANJITH'S SECOND HOME"
            })}
            className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-[#141210] border border-[#262420] group cursor-pointer shadow-2xl"
          >
            <img 
              src="images/chinnaswamy_stadium.jpg" 
              alt="M. Chinnaswamy Stadium, Bengaluru - Home of Royal Challengers Bengaluru" 
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
              loading="eager"
            />
            {/* Calibrated Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a]/70 via-transparent to-transparent hidden sm:block" />

            {/* Stadium Badge and Overlay Info */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#d92323] text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                SANJITH'S SECOND HOME
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-amber-400" /> Bengaluru, Karnataka
              </span>
            </div>

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  M. Chinnaswamy Stadium
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                  Stand D. Where you lose your voice every single IPL season screaming for RCB through every boundary, dropped catch, and heart-stopping final over.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    popRcbConfetti();
                  }}
                  className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-200 text-[#0c0b0a] font-black text-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#d92323]" />
                  <span>Cheer Stand D</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PROFILE ATTRIBUTES STRIP (Tonal, Precision Bento) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-y border-[#22201c] py-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-[#22201c] space-y-1.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-[10px] font-black uppercase tracking-wider">FRANCHISE</span>
              <Trophy className="w-3.5 h-3.5 text-[#d92323]" />
            </div>
            <p className="text-2xl font-black text-white">RCB 💥</p>
            <span className="text-xs text-stone-400 block">Royal Challengers Bengaluru</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-[#22201c] space-y-1.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-[10px] font-black uppercase tracking-wider">SQUAD NUMBER</span>
              <span className="font-display text-[#d92323] text-lg">#10</span>
            </div>
            <p className="text-2xl font-black text-white">Jersey #10</p>
            <span className="text-xs text-stone-400 block">Sanjith's Official Number</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-[#22201c] space-y-1.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-[10px] font-black uppercase tracking-wider">FAVORITE SHOT</span>
              <Flame className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-white">The Wrist Flick</p>
            <span className="text-xs text-stone-400 block">Whipping balls off the pads</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#141210] border border-[#22201c] space-y-1.5">
            <div className="flex items-center justify-between text-stone-500">
              <span className="text-[10px] font-black uppercase tracking-wider">BOWLING WEAPON</span>
              <Zap className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <p className="text-2xl font-black text-white">Starc-Style Yorker</p>
            <span className="text-xs text-stone-400 block">Fast 148k inswinger at the toes</span>
          </div>
        </section>

        {/* PHOTO ESSAYS: Editorial Gallery of Sanjith's Cricket Pantheon */}
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#22201c] pb-5">
            <div className="space-y-1">
              <span className="text-xs font-black tracking-widest text-[#d92323] uppercase block">
                The Cricket Pantheon
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-wide">
                The Legends Sanjith Defends Forever
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#141210] p-1.5 rounded-2xl border border-[#262420] self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#22201c] text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                All 5 Stories
              </button>
              <button
                onClick={() => setActiveTab('rcb')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'rcb'
                    ? 'bg-[#d92323] text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                RCB Legends
              </button>
              <button
                onClick={() => setActiveTab('finishes')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'finishes'
                    ? 'bg-[#22201c] text-amber-300 shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Iconic Finishes
              </button>
            </div>
          </div>

          {/* ESSAY 1: Virat Kohli (Flagship Split Editorial) */}
          {(activeTab === 'all' || activeTab === 'rcb' || activeTab === 'finishes') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141210] p-6 sm:p-10 rounded-3xl border border-[#22201c] shadow-xl hover:border-[#33302a] transition-all">
              <div 
                onClick={() => setSelectedImage({
                  src: 'images/virat_kohli.jpg',
                  title: 'Virat Kohli',
                  subtitle: 'The undisputed master of run chases and the heart of RCB for 17+ years.',
                  tag: 'THE GOAT'
                })}
                className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 cursor-pointer group"
              >
                <img 
                  src="images/virat_kohli.jpg" 
                  alt="Virat Kohli" 
                  className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-[#d92323] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  The GOAT
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full backdrop-blur">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-widest text-[#d92323] uppercase">
                    India & Royal Challengers Bengaluru
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl text-white uppercase leading-none">
                    Virat Kohli.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                  I don't even follow cricket like that, but I know better than to ever debate Sanjith about Virat Kohli. He will defend him for two hours straight without flinching. The undisputed king of the run chase and the heartbeat of RCB for over 17 years.
                </p>

                {/* Highlight Box */}
                <div className="p-5 rounded-2xl bg-[#1c1917] border border-[#2a2722] space-y-1.5">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider block">
                    ✦ Favorite Knock: 82* vs Pakistan (Melbourne 2022)
                  </span>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    That straight six off Haris Rauf back over the bowler's head. Sanjith has made everyone in the room rewatch this exact clip at least fifty times.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ESSAY 2: Mitchell Starc (RCB 2014-2015 Era) */}
          {(activeTab === 'all' || activeTab === 'rcb') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141210] p-6 sm:p-10 rounded-3xl border border-[#22201c] shadow-xl hover:border-[#33302a] transition-all">
              <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-widest text-sky-400 uppercase">
                    2014–15 RCB Spearhead
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl text-white uppercase leading-none">
                    Mitchell Starc.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                  Every single time Sanjith starts talking about fast bowling, Starc comes up. Back when Starc was steaming in for RCB at Chinnaswamy and sending down 150k thunderbolts with Kohli as captain. Whenever Sanjith bowls, this is the bowling action and yorker he's attempting to replicate.
                </p>

                <div className="p-5 rounded-2xl bg-[#1c1917] border border-[#2a2722] space-y-1.5">
                  <span className="text-xs font-extrabold text-sky-400 uppercase tracking-wider block">
                    ✦ The Signature Delivery: 148k Inswinging Yorker
                  </span>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Fast, late tailing inward, and aiming right at the toes and base of middle stump.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setSelectedImage({
                  src: 'images/mitchell_starc.jpg',
                  title: 'Mitchell Starc',
                  subtitle: '150k thunderbolts for RCB at Chinnaswamy — the blueprint for Sanjith bowling.',
                  tag: '150K PACER'
                })}
                className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 cursor-pointer group order-1 lg:order-2"
              >
                <img 
                  src="images/mitchell_starc.jpg" 
                  alt="Mitchell Starc" 
                  className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-sky-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  150k Pacer
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full backdrop-blur">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* ESSAY 3: AB de Villiers & Chris Gayle (Chinnaswamy Demolition Duo) */}
          {(activeTab === 'all' || activeTab === 'rcb') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AB de Villiers */}
              <div className="bg-[#141210] rounded-3xl border border-[#22201c] overflow-hidden shadow-xl hover:border-[#33302a] transition-all flex flex-col justify-between">
                <div>
                  <div 
                    onClick={() => setSelectedImage({
                      src: 'images/ab_de_villiers.jpg',
                      title: 'AB de Villiers',
                      subtitle: 'Mr. 360 at Chinnaswamy — clearing roofs on command.',
                      tag: 'MR. 360'
                    })}
                    className="aspect-[16/10] w-full overflow-hidden bg-stone-900 relative cursor-pointer group"
                  >
                    <img 
                      src="images/ab_de_villiers.jpg" 
                      alt="AB de Villiers" 
                      className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Mr. 360
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 space-y-2.5">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Chinnaswamy Legend
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl text-white uppercase">
                      AB de Villiers
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                      The sole reason Sanjith attempts ridiculous 360 ramp shots in gully cricket and occasionally misses completely. A true Bengaluru favorite who could clear any roof in the city on command.
                    </p>
                  </div>
                </div>
                <div className="p-6 sm:p-7 pt-0">
                  <div className="text-xs font-semibold text-emerald-300 bg-[#1c1917] p-3 rounded-xl border border-[#262420]">
                    ✦ Chinnaswamy roof-top maximums
                  </div>
                </div>
              </div>

              {/* Chris Gayle */}
              <div className="bg-[#141210] rounded-3xl border border-[#22201c] overflow-hidden shadow-xl hover:border-[#33302a] transition-all flex flex-col justify-between">
                <div>
                  <div 
                    onClick={() => setSelectedImage({
                      src: 'images/chris_gayle.jpg',
                      title: 'Chris Gayle (Universe Boss)',
                      subtitle: '175* off 66 balls at Chinnaswamy — the highest T20 score in history.',
                      tag: 'UNIVERSE BOSS'
                    })}
                    className="aspect-[16/10] w-full overflow-hidden bg-stone-900 relative cursor-pointer group"
                  >
                    <img 
                      src="images/chris_gayle.jpg" 
                      alt="Chris Gayle Universe Boss" 
                      className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 bg-[#d92323] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Universe Boss
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 space-y-2.5">
                    <span className="text-xs font-bold text-[#ff4d4d] uppercase tracking-wider">
                      Chinnaswamy Record
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl text-white uppercase">
                      Chris Gayle
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                      175 not out off 66 balls at Chinnaswamy Stadium. The golden era of pure RCB batting swagger and monster sixes that Sanjith brings up in every single cricket conversation.
                    </p>
                  </div>
                </div>
                <div className="p-6 sm:p-7 pt-0">
                  <div className="text-xs font-semibold text-[#ff8080] bg-[#1c1917] p-3 rounded-xl border border-[#262420]">
                    ✦ Highest T20 score in cricket history (175*)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ESSAY 4: Ben Stokes (Headingley 2019 Miracle) */}
          {(activeTab === 'all' || activeTab === 'finishes') && (
            <div className="bg-[#141210] p-6 sm:p-10 rounded-3xl border border-[#22201c] shadow-xl hover:border-[#33302a] transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div 
                onClick={() => setSelectedImage({
                  src: 'images/ben_stokes_headingley.jpg',
                  title: 'Ben Stokes at Headingley',
                  subtitle: '135* vs Australia — 73 runs with Jack Leach to seal the Ashes miracle.',
                  tag: 'ASHES 2019 • 135*'
                })}
                className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 cursor-pointer group"
              >
                <img 
                  src="images/ben_stokes_headingley.jpg" 
                  alt="Ben Stokes Headingley 2019" 
                  className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  Ashes 2019 • 135*
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full backdrop-blur">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
                    Favorite Test Finish Ever
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl text-white uppercase leading-none">
                    Ben Stokes at Headingley.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
                  Sanjith's favorite match outside RCB. 73 runs for the 10th wicket with Jack Leach, refusing to give up until the final boundary was creamed through the covers. The one Test finish Sanjith will passionately break down to anyone who asks.
                </p>

                <div className="p-5 rounded-2xl bg-[#1c1917] border border-[#2a2722] space-y-1">
                  <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider block">
                    ✦ 135 Not Out vs Australia
                  </span>
                  <p className="text-xs sm:text-sm text-stone-300">
                    Jack Leach wiped his glasses, Stokes took care of the rest.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* THE SHOELACE STORY: Stand D Feature Article */}
        <section className="bg-gradient-to-br from-[#1a150e] to-[#120f0a] p-8 sm:p-12 rounded-3xl border border-amber-900/40 relative overflow-hidden shadow-2xl">
          {/* Subtle watermark */}
          <div className="absolute -right-8 -bottom-10 font-display text-8xl text-amber-500/5 select-none pointer-events-none">
            #10 LACES
          </div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-700/40 text-[11px] font-black tracking-widest text-amber-300 uppercase">
              <span>STAND D LOCKER ROOM VAULT</span>
              <span>•</span>
              <span>UNFILTERED LORE</span>
            </div>

            <h3 className="font-display text-4xl sm:text-6xl text-amber-100 uppercase leading-[0.92]">
              The Time Sanjith Tied His Shoelaces During Live Play 😂
            </h3>

            <p className="text-base sm:text-lg text-amber-200/80 leading-relaxed font-normal">
              I don't play cricket, but this story will genuinely never get old. The bowler was at the top of his run-up. Sanjith is standing out in the deep, and for some inexplicable reason decides that exact second is prime time to bend down and double-knot his sneakers. The bowler bowls, the batsman slices it straight toward Sanjith, and the ball rolls past him for four while his head is still completely buried in his shoes.
            </p>

            <div className="pt-2">
              <blockquote className="border-l-4 border-amber-500 pl-5 py-2 text-base sm:text-xl font-bold italic text-amber-100 bg-amber-950/30 rounded-r-xl">
                "Runs saved: 0. Shoes tied: 100%. Confidence: Unmatched."
              </blockquote>
            </div>
          </div>
        </section>

        {/* PAVILION GUESTBOOK: Sleek VIP Ledger */}
        <section className="space-y-8">
          <div className="border-b border-[#22201c] pb-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black tracking-widest text-[#d92323] uppercase block">
                Pavilion Registry
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-wide">
                Birthday Notes for Sanjith
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-[#141210] border border-[#262420] text-xs text-stone-400 font-num">
              {notes.length} {notes.length === 1 ? 'Message' : 'Messages'}
            </div>
          </div>

          {/* Clean Input Form */}
          <form onSubmit={handlePost} className="p-6 sm:p-8 rounded-3xl bg-[#141210] border border-[#22201c] shadow-xl space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Azan, Stand D Friend..."
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[#1c1917] border border-[#2a2722] text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-[#d92323] focus:bg-[#22201c] transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Birthday Wish or Roast
              </label>
              <textarea
                placeholder="Write a birthday wish, inside joke, or memory for Sanjith..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl bg-[#1c1917] border border-[#2a2722] text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-[#d92323] focus:bg-[#22201c] transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saved ? (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-400" /> Note posted to Pavilion ledger!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d92323] to-[#b91c1c] hover:from-[#e11d48] hover:to-[#d92323] text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Birthday Note</span>
              </button>
            </div>
          </form>

          {/* Notes Feed */}
          <div className="space-y-3">
            {notes.length === 0 ? (
              <div className="p-10 text-center rounded-3xl bg-[#141210] border border-[#22201c] text-stone-500 text-xs space-y-1">
                <p className="font-semibold text-stone-400">The Pavilion ledger is currently empty.</p>
                <p>Be the first to post a birthday wish or roast for Sanjith above!</p>
              </div>
            ) : (
              notes.map(note => (
                <div 
                  key={note.id} 
                  className="p-5 sm:p-6 rounded-2xl bg-[#141210] border border-[#22201c] space-y-2 flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white uppercase tracking-wider">
                        {note.from}
                      </span>
                      <span className="text-[10px] text-stone-600 font-num">
                        {note.timestamp || 'Just now'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                      "{note.text}"
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-stone-600 hover:text-red-400 p-2 transition-colors cursor-pointer"
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

      {/* Lightbox Modal for Full Image Inspection */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-6 flex items-center justify-center cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#141210] border border-[#2e2a25] rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-bold hover:bg-black cursor-pointer"
            >
              ✕ Close
            </button>
            <div className="relative aspect-[16/10] w-full bg-black">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-2 bg-[#141210]">
              <span className="text-xs font-black text-[#d92323] uppercase tracking-widest">
                {selectedImage.tag}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-white uppercase">
                {selectedImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[#22201c] px-6 sm:px-12 py-10 bg-[#0c0b0a] text-xs text-stone-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl text-[#d92323]">SANJITH #10</span>
            <span className="text-stone-700">•</span>
            <span className="text-stone-400 font-bold">ROYAL CHALLENGERS BENGALURU</span>
            <span className="text-stone-700">•</span>
            <span className="text-stone-400 font-bold">STAND D</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium text-stone-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#d92323] fill-[#d92323] inline" />
            <span>by Azan for Sanjith • Ee Sala Cup Namde! 💥</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
