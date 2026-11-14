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
  Ticket,
  Maximize2,
  MapPin,
  Zap
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
      particleCount: 130,
      spread: 85,
      origin: { y: 0.35 },
      colors: ['#a3321d', '#c25e2e', '#c98a2c', '#4a5b42', '#f7f4ee', '#23201a']
    });
  };

  // Guestbook State - purely local, zero fake bot data
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      localStorage.removeItem('sanjith_birthday_notes');
      localStorage.removeItem('sanjith_birthday_notes_v3');
      const saved = localStorage.getItem('sanjith_earthy_notes_v1');
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
      localStorage.setItem('sanjith_earthy_notes_v1', JSON.stringify(notes));
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
    <div className="min-h-screen bg-[#f7f4ee] text-[#23201a] relative selection:bg-[#a3321d] selection:text-white overflow-x-hidden flex flex-col justify-between">
      {/* Subtle Tactile Paper Grain */}
      <div className="fixed inset-0 pointer-events-none bg-grain z-0 opacity-60" />

      {/* Earthy Warm Masthead Header */}
      <header className="border-b border-[#e5dfd3] bg-[#f7f4ee]/95 backdrop-blur-md sticky top-0 z-40 px-6 sm:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl tracking-wider text-[#a3321d]">#10</span>
              <div className="w-2 h-2 rounded-full bg-[#a3321d]" />
            </div>
            <div className="h-4 w-px bg-[#d8d1c5]" />
            <div className="flex flex-col">
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#423d33]">
                RCB Stand D • Field Notebook
              </span>
              <span className="text-[10px] text-[#7d7465] font-num">
                BENGALURU • SPECIAL BIRTHDAY ISSUE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={popRcbConfetti}
              className="px-4 py-2 rounded-full bg-[#23201a] hover:bg-[#a3321d] text-[#f7f4ee] font-extrabold text-xs transition-colors duration-200 flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span className="tracking-wide">Ee Sala Cup Namde! 💥</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Experience Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 relative z-10 space-y-24 w-full">

        {/* HERO SECTION: Earthy Editorial Layout & Field Ticket Stub */}
        <section className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Hero Title & Real Story from Azan */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ede7dc] border border-[#d8d0c2] text-[11px] font-black tracking-widest text-[#a3321d] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a3321d]" />
                <span>CHINNASWAMY STAND D REGULAR</span>
                <span className="text-[#a89f8f]">•</span>
                <span>JERSEY #10</span>
              </div>

              <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-[0.86] text-[#23201a] uppercase">
                Happy Birthday, <br />
                <span className="text-[#a3321d]">
                  Sanjith.
                </span>
              </h1>

              <div className="space-y-3 max-w-2xl text-[#4a4439] text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  I don't play cricket myself, but nobody can spend five minutes around you without hearing about <strong className="text-[#23201a] font-bold">Royal Challengers Bengaluru</strong>, getting pulled into an intense debate over Virat Kohli, or watching you practice your wrist flick out of nowhere.
                </p>
                <p className="text-sm text-[#6e6657] font-normal">
                  Put together this field edition for your birthday bro — curated around your favorite team, iconic matches, and the funniest locker room lore we've got.
                </p>
              </div>
            </div>

            {/* Right Hero: Tactile Parchment Ticket Stub */}
            <div className="lg:col-span-4 bg-[#f0ebd9] border border-[#dbd3be] rounded-3xl p-6 relative overflow-hidden shadow-sm flex flex-col justify-between space-y-6">
              {/* Subtle Warm Earth Stamp flare */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#a3321d]/10 to-transparent pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#dbd3be] pb-3">
                  <div className="flex items-center gap-2 text-[#a3321d] font-black text-xs tracking-widest uppercase">
                    <Ticket className="w-4 h-4" />
                    <span>LIFETIME STAND PASS</span>
                  </div>
                  <span className="font-num text-[11px] text-[#7d7465] tracking-wider">SEC: D-10</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#7d7465]">HOLDER NAME</span>
                  <div className="font-display text-3xl text-[#23201a] tracking-wide">SANJITH #10</div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#e6dfcb] border border-[#d3c9b3]">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#6e6657] block">LOYALTY</span>
                    <span className="font-bold text-[#a3321d] text-sm">RCB 12th Man</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#e6dfcb] border border-[#d3c9b3]">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#6e6657] block">GROUND</span>
                    <span className="font-bold text-[#23201a] text-sm">Chinnaswamy</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs pt-1">
                  <div className="flex justify-between text-[#6e6657] text-[11px]">
                    <span>Favorite Shot:</span>
                    <span className="text-[#23201a] font-semibold">Wrist Flick off the pads</span>
                  </div>
                  <div className="flex justify-between text-[#6e6657] text-[11px]">
                    <span>Bowling Weapon:</span>
                    <span className="text-[#23201a] font-semibold">Starc 148k Yorker</span>
                  </div>
                </div>
              </div>

              {/* Faux Barcode & Stamp */}
              <div className="pt-4 border-t border-dashed border-[#d3c9b3] flex items-center justify-between">
                <div className="space-y-1">
                  {/* Decorative Barcode */}
                  <div className="flex items-center gap-[2px] h-6 opacity-70">
                    {[3,1,4,2,1,5,2,1,4,1,3,2,5,1,2,3,1,4,2].map((w, i) => (
                      <div key={i} className="bg-[#23201a] h-full" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <span className="text-[8px] font-num tracking-widest text-[#7d7465] block uppercase">
                    NO. 2024-SANJITH-RCB-10
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#a3321d]/15 border border-[#a3321d]/30 text-[#a3321d] text-[9px] font-black uppercase tracking-widest">
                  STAND D PASS
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
            className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-[#ede7dc] border border-[#dcd4c5] group cursor-pointer shadow-md"
          >
            <img 
              src="images/chinnaswamy_stadium.jpg" 
              alt="M. Chinnaswamy Stadium, Bengaluru - Home of Royal Challengers Bengaluru" 
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              loading="eager"
            />
            {/* Calibrated Warm Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1c16]/90 via-[#1f1c16]/35 to-transparent" />

            {/* Stadium Badge and Overlay Info */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#a3321d] text-[#f7f4ee] text-[10px] font-black uppercase tracking-widest shadow-xs">
                SANJITH'S SECOND HOME
              </span>
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-200 text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-amber-300" /> Bengaluru, Karnataka
              </span>
            </div>

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="space-y-1.5 max-w-2xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f4ee] tracking-tight">
                  M. Chinnaswamy Stadium
                </h2>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
                  Stand D. Where you lose your voice every single IPL season screaming for RCB through every boundary, dropped catch, and heart-stopping final over.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    popRcbConfetti();
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#f7f4ee] hover:bg-white text-[#23201a] font-black text-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#a3321d]" />
                  <span>Cheer Stand D</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PROFILE ATTRIBUTES STRIP (Warm Earth Bento) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-y border-[#e5dfd3] py-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f0ebd9] border border-[#ded5c2] space-y-1.5">
            <div className="flex items-center justify-between text-[#7d7465]">
              <span className="text-[10px] font-black uppercase tracking-wider">FRANCHISE</span>
              <Trophy className="w-3.5 h-3.5 text-[#a3321d]" />
            </div>
            <p className="text-2xl font-black text-[#23201a]">RCB 💥</p>
            <span className="text-xs text-[#6e6657] block">Royal Challengers Bengaluru</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#f0ebd9] border border-[#ded5c2] space-y-1.5">
            <div className="flex items-center justify-between text-[#7d7465]">
              <span className="text-[10px] font-black uppercase tracking-wider">SQUAD NUMBER</span>
              <span className="font-display text-[#a3321d] text-lg">#10</span>
            </div>
            <p className="text-2xl font-black text-[#23201a]">Jersey #10</p>
            <span className="text-xs text-[#6e6657] block">Sanjith's Official Number</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#f0ebd9] border border-[#ded5c2] space-y-1.5">
            <div className="flex items-center justify-between text-[#7d7465]">
              <span className="text-[10px] font-black uppercase tracking-wider">FAVORITE SHOT</span>
              <Flame className="w-3.5 h-3.5 text-[#c25e2e]" />
            </div>
            <p className="text-2xl font-black text-[#23201a]">The Wrist Flick</p>
            <span className="text-xs text-[#6e6657] block">Whipping balls off the pads</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#f0ebd9] border border-[#ded5c2] space-y-1.5">
            <div className="flex items-center justify-between text-[#7d7465]">
              <span className="text-[10px] font-black uppercase tracking-wider">BOWLING WEAPON</span>
              <Zap className="w-3.5 h-3.5 text-[#4a5b42]" />
            </div>
            <p className="text-2xl font-black text-[#23201a]">Starc-Style Yorker</p>
            <span className="text-xs text-[#6e6657] block">Fast 148k inswinger at the toes</span>
          </div>
        </section>

        {/* PHOTO ESSAYS: Earthy Field Editorial Gallery */}
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e5dfd3] pb-5">
            <div className="space-y-1">
              <span className="text-xs font-black tracking-widest text-[#a3321d] uppercase block">
                The Cricket Pantheon
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#23201a] uppercase tracking-wide">
                The Legends Sanjith Defends Forever
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#ede7dc] p-1.5 rounded-2xl border border-[#ded5c2] self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-[#f7f4ee] text-[#23201a] shadow-xs'
                    : 'text-[#6e6657] hover:text-[#23201a]'
                }`}
              >
                All 5 Stories
              </button>
              <button
                onClick={() => setActiveTab('rcb')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'rcb'
                    ? 'bg-[#a3321d] text-white shadow-xs'
                    : 'text-[#6e6657] hover:text-[#23201a]'
                }`}
              >
                RCB Legends
              </button>
              <button
                onClick={() => setActiveTab('finishes')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'finishes'
                    ? 'bg-[#c98a2c] text-[#23201a] shadow-xs'
                    : 'text-[#6e6657] hover:text-[#23201a]'
                }`}
              >
                Iconic Finishes
              </button>
            </div>
          </div>

          {/* ESSAY 1: Virat Kohli (Flagship Split Editorial) */}
          {(activeTab === 'all' || activeTab === 'rcb' || activeTab === 'finishes') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f0ebd9] p-6 sm:p-10 rounded-3xl border border-[#ded5c2] shadow-sm">
              <div 
                onClick={() => setSelectedImage({
                  src: 'images/virat_kohli.jpg',
                  title: 'Virat Kohli',
                  subtitle: 'The undisputed master of run chases and the heart of RCB for 17+ years.',
                  tag: 'THE GOAT'
                })}
                className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5dfd3] cursor-pointer group"
              >
                <img 
                  src="images/virat_kohli.jpg" 
                  alt="Virat Kohli" 
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#a3321d] text-[#f7f4ee] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  The GOAT
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full backdrop-blur">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-widest text-[#a3321d] uppercase">
                    India & Royal Challengers Bengaluru
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl text-[#23201a] uppercase leading-none">
                    Virat Kohli.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#4a4439] leading-relaxed font-normal">
                  I don't even follow cricket like that, but I know better than to ever debate Sanjith about Virat Kohli. He will defend him for two hours straight without flinching. The undisputed king of the run chase and the heartbeat of RCB for over 17 years.
                </p>

                {/* Highlight Box */}
                <div className="p-5 rounded-2xl bg-[#e6dfcb] border border-[#d3c9b3] space-y-1.5">
                  <span className="text-xs font-extrabold text-[#a3321d] uppercase tracking-wider block">
                    ✦ Favorite Knock: 82* vs Pakistan (Melbourne 2022)
                  </span>
                  <p className="text-xs sm:text-sm text-[#4a4439] leading-relaxed">
                    That straight six off Haris Rauf back over the bowler's head. Sanjith has made everyone in the room rewatch this exact clip at least fifty times.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ESSAY 2: Mitchell Starc (RCB 2014-2015 Era) */}
          {(activeTab === 'all' || activeTab === 'rcb') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f0ebd9] p-6 sm:p-10 rounded-3xl border border-[#ded5c2] shadow-sm">
              <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-widest text-[#4a5b42] uppercase">
                    2014–15 RCB Spearhead
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl text-[#23201a] uppercase leading-none">
                    Mitchell Starc.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#4a4439] leading-relaxed font-normal">
                  Every single time Sanjith starts talking about fast bowling, Starc comes up. Back when Starc was steaming in for RCB at Chinnaswamy and sending down 150k thunderbolts with Kohli as captain. Whenever Sanjith bowls, this is the bowling action and yorker he's attempting to replicate.
                </p>

                <div className="p-5 rounded-2xl bg-[#e6dfcb] border border-[#d3c9b3] space-y-1.5">
                  <span className="text-xs font-extrabold text-[#4a5b42] uppercase tracking-wider block">
                    ✦ The Signature Delivery: 148k Inswinging Yorker
                  </span>
                  <p className="text-xs sm:text-sm text-[#4a4439] leading-relaxed">
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
                className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5dfd3] cursor-pointer group order-1 lg:order-2"
              >
                <img 
                  src="images/mitchell_starc.jpg" 
                  alt="Mitchell Starc" 
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-[#4a5b42] text-[#f7f4ee] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
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
              <div className="bg-[#f0ebd9] rounded-3xl border border-[#ded5c2] overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div 
                    onClick={() => setSelectedImage({
                      src: 'images/ab_de_villiers.jpg',
                      title: 'AB de Villiers',
                      subtitle: 'Mr. 360 at Chinnaswamy — clearing roofs on command.',
                      tag: 'MR. 360'
                    })}
                    className="aspect-[16/10] w-full overflow-hidden bg-[#e5dfd3] relative cursor-pointer group"
                  >
                    <img 
                      src="images/ab_de_villiers.jpg" 
                      alt="AB de Villiers" 
                      className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#395c47] text-[#f7f4ee] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      Mr. 360
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 space-y-2.5">
                    <span className="text-xs font-bold text-[#395c47] uppercase tracking-wider">
                      Chinnaswamy Legend
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl text-[#23201a] uppercase">
                      AB de Villiers
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4a4439] leading-relaxed font-normal">
                      The sole reason Sanjith attempts ridiculous 360 ramp shots in gully cricket and occasionally misses completely. A true Bengaluru favorite who could clear any roof in the city on command.
                    </p>
                  </div>
                </div>
                <div className="p-6 sm:p-7 pt-0">
                  <div className="text-xs font-semibold text-[#2f4f3c] bg-[#e6dfcb] p-3 rounded-xl border border-[#d3c9b3]">
                    ✦ Chinnaswamy roof-top maximums
                  </div>
                </div>
              </div>

              {/* Chris Gayle */}
              <div className="bg-[#f0ebd9] rounded-3xl border border-[#ded5c2] overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div 
                    onClick={() => setSelectedImage({
                      src: 'images/chris_gayle.jpg',
                      title: 'Chris Gayle (Universe Boss)',
                      subtitle: '175* off 66 balls at Chinnaswamy — the highest T20 score in history.',
                      tag: 'UNIVERSE BOSS'
                    })}
                    className="aspect-[16/10] w-full overflow-hidden bg-[#e5dfd3] relative cursor-pointer group"
                  >
                    <img 
                      src="images/chris_gayle.jpg" 
                      alt="Chris Gayle Universe Boss" 
                      className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#a3321d] text-[#f7f4ee] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      Universe Boss
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 space-y-2.5">
                    <span className="text-xs font-bold text-[#a3321d] uppercase tracking-wider">
                      Chinnaswamy Record
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl text-[#23201a] uppercase">
                      Chris Gayle
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4a4439] leading-relaxed font-normal">
                      175 not out off 66 balls at Chinnaswamy Stadium. The golden era of pure RCB batting swagger and monster sixes that Sanjith brings up in every single cricket conversation.
                    </p>
                  </div>
                </div>
                <div className="p-6 sm:p-7 pt-0">
                  <div className="text-xs font-semibold text-[#872715] bg-[#e6dfcb] p-3 rounded-xl border border-[#d3c9b3]">
                    ✦ Highest T20 score in cricket history (175*)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ESSAY 4: Ben Stokes (Headingley 2019 Miracle) */}
          {(activeTab === 'all' || activeTab === 'finishes') && (
            <div className="bg-[#f0ebd9] p-6 sm:p-10 rounded-3xl border border-[#ded5c2] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div 
                onClick={() => setSelectedImage({
                  src: 'images/ben_stokes_headingley.jpg',
                  title: 'Ben Stokes at Headingley',
                  subtitle: '135* vs Australia — 73 runs with Jack Leach to seal the Ashes miracle.',
                  tag: 'ASHES 2019 • 135*'
                })}
                className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#e5dfd3] cursor-pointer group"
              >
                <img 
                  src="images/ben_stokes_headingley.jpg" 
                  alt="Ben Stokes Headingley 2019" 
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#c25e2e] text-[#f7f4ee] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  Ashes 2019 • 135*
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full backdrop-blur">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-black tracking-widest text-[#c25e2e] uppercase">
                    Favorite Test Finish Ever
                  </span>
                  <h3 className="font-display text-4xl sm:text-6xl text-[#23201a] uppercase leading-none">
                    Ben Stokes at Headingley.
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#4a4439] leading-relaxed font-normal">
                  Sanjith's favorite match outside RCB. 73 runs for the 10th wicket with Jack Leach, refusing to give up until the final boundary was creamed through the covers. The one Test finish Sanjith will passionately break down to anyone who asks.
                </p>

                <div className="p-5 rounded-2xl bg-[#e6dfcb] border border-[#d3c9b3] space-y-1">
                  <span className="text-xs font-extrabold text-[#a64e22] uppercase tracking-wider block">
                    ✦ 135 Not Out vs Australia
                  </span>
                  <p className="text-xs sm:text-sm text-[#4a4439]">
                    Jack Leach wiped his glasses, Stokes took care of the rest.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* THE SHOELACE STORY: Stand D Feature Article (Warm Parchment) */}
        <section className="bg-[#ede4d1] p-8 sm:p-12 rounded-3xl border border-[#d8cdb6] relative overflow-hidden shadow-sm">
          {/* Subtle watermark */}
          <div className="absolute -right-8 -bottom-10 font-display text-8xl text-[#23201a]/5 select-none pointer-events-none">
            #10 LACES
          </div>

          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#decfae] border border-[#ccbd9a] text-[11px] font-black tracking-widest text-[#784f17] uppercase">
              <span>STAND D LOCKER ROOM ARCHIVE</span>
              <span>•</span>
              <span>UNFILTERED LORE</span>
            </div>

            <h3 className="font-display text-4xl sm:text-6xl text-[#23201a] uppercase leading-[0.92]">
              The Time Sanjith Tied His Shoelaces During Live Play 😂
            </h3>

            <p className="text-base sm:text-lg text-[#4a4439] leading-relaxed font-normal">
              I don't play cricket, but this story will genuinely never get old. The bowler was at the top of his run-up. Sanjith is standing out in the deep, and for some inexplicable reason decides that exact second is prime time to bend down and double-knot his sneakers. The bowler bowls, the batsman slices it straight toward Sanjith, and the ball rolls past him for four while his head is still completely buried in his shoes.
            </p>

            <div className="pt-2">
              <blockquote className="border-l-4 border-[#a3321d] pl-5 py-2 text-base sm:text-xl font-bold italic text-[#23201a] bg-[#e6dcc5] rounded-r-xl">
                "Runs saved: 0. Shoes tied: 100%. Confidence: Unmatched."
              </blockquote>
            </div>
          </div>
        </section>

        {/* PAVILION GUESTBOOK: Earthy Field Ledger */}
        <section className="space-y-8">
          <div className="border-b border-[#e5dfd3] pb-5 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-black tracking-widest text-[#a3321d] uppercase block">
                Pavilion Registry
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#23201a] uppercase tracking-wide">
                Birthday Notes for Sanjith
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-[#ede7dc] border border-[#ded5c2] text-xs text-[#6e6657] font-num">
              {notes.length} {notes.length === 1 ? 'Message' : 'Messages'}
            </div>
          </div>

          {/* Clean Input Form */}
          <form onSubmit={handlePost} className="p-6 sm:p-8 rounded-3xl bg-[#f0ebd9] border border-[#ded5c2] shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6e6657] mb-2">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Azan, Stand D Friend..."
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f4ee] border border-[#ded5c2] text-sm text-[#23201a] placeholder:text-[#a89f8f] focus:outline-none focus:border-[#a3321d] focus:bg-white transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6e6657] mb-2">
                Birthday Wish or Roast
              </label>
              <textarea
                placeholder="Write a birthday wish, inside joke, or memory for Sanjith..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl bg-[#f7f4ee] border border-[#ded5c2] text-sm text-[#23201a] placeholder:text-[#a89f8f] focus:outline-none focus:border-[#a3321d] focus:bg-white transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saved ? (
                <span className="text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700" /> Note posted to Pavilion ledger!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#a3321d] hover:bg-[#872715] text-[#f7f4ee] font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-xs active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Birthday Note</span>
              </button>
            </div>
          </form>

          {/* Notes Feed */}
          <div className="space-y-3">
            {notes.length === 0 ? (
              <div className="p-10 text-center rounded-3xl bg-[#f0ebd9] border border-[#ded5c2] text-[#7d7465] text-xs space-y-1">
                <p className="font-semibold text-[#4a4439]">The Pavilion ledger is currently empty.</p>
                <p>Be the first to post a birthday wish or roast for Sanjith above!</p>
              </div>
            ) : (
              notes.map(note => (
                <div 
                  key={note.id} 
                  className="p-5 sm:p-6 rounded-2xl bg-[#f0ebd9] border border-[#ded5c2] space-y-2 flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#23201a] uppercase tracking-wider">
                        {note.from}
                      </span>
                      <span className="text-[10px] text-[#7d7465] font-num">
                        {note.timestamp || 'Just now'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4a4439] leading-relaxed font-normal">
                      "{note.text}"
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-[#a89f8f] hover:text-red-700 p-2 transition-colors cursor-pointer"
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
          className="fixed inset-0 z-50 bg-[#1f1c16]/85 backdrop-blur-md p-6 flex items-center justify-center cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#f0ebd9] border border-[#ded5c2] rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-bold hover:bg-black cursor-pointer"
            >
              ✕ Close
            </button>
            <div className="relative aspect-[16/10] w-full bg-[#23201a]">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 sm:p-8 space-y-2 bg-[#f0ebd9]">
              <span className="text-xs font-black text-[#a3321d] uppercase tracking-widest">
                {selectedImage.tag}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#23201a] uppercase">
                {selectedImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4a4439] leading-relaxed">
                {selectedImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[#e5dfd3] px-6 sm:px-12 py-10 bg-[#ede7dc] text-xs text-[#6e6657] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl text-[#a3321d]">SANJITH #10</span>
            <span className="text-[#b5ab9a]">•</span>
            <span className="text-[#23201a] font-bold">ROYAL CHALLENGERS BENGALURU</span>
            <span className="text-[#b5ab9a]">•</span>
            <span className="text-[#23201a] font-bold">STAND D</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium text-[#4a4439]">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#a3321d] fill-[#a3321d] inline" />
            <span>by Azan for Sanjith • Ee Sala Cup Namde! 💥</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
