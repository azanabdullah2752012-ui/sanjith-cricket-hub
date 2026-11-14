import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Heart, 
  Send, 
  Check, 
  Trash2,
  Trophy,
  Shield,
  MapPin,
  Flame,
  ArrowUpRight,
  Quote
} from 'lucide-react';

interface Note {
  id: number;
  from: string;
  text: string;
  timestamp?: string;
}

export function App() {
  // Gallery Filter Tab
  const [activeTab, setActiveTab] = useState<'all' | 'rcb' | 'finishes'>('all');

  const popRcbConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.35 },
      colors: ['#c92a2a', '#d97706', '#141210', '#ffffff', '#eab308']
    });
  };

  // Clean Guestbook State (Zero preloaded fake bots)
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      localStorage.removeItem('sanjith_birthday_notes');
      localStorage.removeItem('sanjith_birthday_notes_v3');
      const saved = localStorage.getItem('sanjith_editorial_notes_v3');
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
      localStorage.setItem('sanjith_editorial_notes_v3', JSON.stringify(notes));
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
    <div className="min-h-screen bg-[#fcfbf9] text-[#141210] flex flex-col justify-between selection:bg-[#c92a2a] selection:text-white">
      {/* Top Editorial Masthead Bar */}
      <header className="border-b border-stone-200 px-6 sm:px-12 py-5 bg-[#fcfbf9]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl tracking-wider text-[#c92a2a]">
              #10
            </span>
            <div className="h-4 w-px bg-stone-300" />
            <div className="text-xs font-black tracking-widest uppercase text-stone-700">
              RCB Special Issue • Sanjith
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={popRcbConfetti}
              className="px-4 py-2 rounded-full bg-[#141210] hover:bg-[#c92a2a] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Ee Sala Cup Namde! 💥</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Editorial Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-12 w-full space-y-20">
        
        {/* HERO SECTION: The Athletic / Nike High-Impact Cover */}
        <section className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#c92a2a] uppercase">
              <span>SPECIAL BIRTHDAY ISSUE</span>
              <span>—</span>
              <span>STAND D REGULAR</span>
              <span>—</span>
              <span>JERSEY #10</span>
            </div>

            <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-[0.88] text-[#141210] uppercase">
              Happy Birthday, <br />
              <span className="text-[#c92a2a]">Sanjith.</span>
            </h1>

            <p className="text-base sm:text-xl text-stone-700 max-w-2xl font-normal leading-relaxed pt-2">
              I don't play cricket myself, but nobody can spend five minutes around you without hearing about Royal Challengers Bengaluru, getting into a heated argument over Virat Kohli, or watching you practice your wrist flick. Made this page for your birthday bro.
            </p>
          </div>

          {/* Full-Bleed Chinnaswamy Stadium Hero Feature Plate */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-stone-100 shadow-sm border border-stone-200 group">
            <img 
              src="images/chinnaswamy_stadium.jpg" 
              alt="M. Chinnaswamy Stadium, Bengaluru - Home of Royal Challengers Bengaluru" 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#c92a2a] px-2.5 py-1 rounded text-white inline-block">
                  SANJITH'S SECOND HOME
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  M. Chinnaswamy Stadium, Bengaluru
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Stand D. Where you lose your voice every single IPL season screaming for RCB through every high and heartbreak.
                </p>
              </div>

              <button
                onClick={popRcbConfetti}
                className="bg-white hover:bg-stone-100 text-[#141210] font-black text-xs px-4 py-2.5 rounded-full transition-transform active:scale-95 cursor-pointer self-start sm:self-auto shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c92a2a]" />
                <span>Cheer Stand D</span>
              </button>
            </div>
          </div>
        </section>

        {/* PROFILE ATTRIBUTES RIBBON */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-stone-200 py-8">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Franchise Loyalty</span>
            <p className="text-xl font-black text-[#141210]">RCB 💥</p>
            <span className="text-xs text-stone-500">Royal Challengers Bengaluru</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Squad Number</span>
            <p className="text-xl font-black text-[#141210]">Jersey #10</p>
            <span className="text-xs text-stone-500">Sanjith</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Favorite Shot</span>
            <p className="text-xl font-black text-[#141210]">The Wrist Flick</p>
            <span className="text-xs text-stone-500">Whipping balls off the pads</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">Bowling Weapon</span>
            <p className="text-xl font-black text-[#141210]">Starc-Style Yorker</p>
            <span className="text-xs text-stone-500">Fast inswinger at the toes</span>
          </div>
        </section>

        {/* EDITORIAL PHOTO ESSAYS (Big, Striking Photography) */}
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-black tracking-widest text-[#c92a2a] uppercase block">
                The Cricket Pantheon
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase tracking-wide">
                The Players Sanjith Will Defend Forever
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start sm:self-auto border border-stone-200">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white text-[#141210] shadow-2xs'
                    : 'text-stone-500 hover:text-[#141210]'
                }`}
              >
                All 5 Stories
              </button>
              <button
                onClick={() => setActiveTab('rcb')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'rcb'
                    ? 'bg-white text-[#c92a2a] shadow-2xs'
                    : 'text-stone-500 hover:text-[#141210]'
                }`}
              >
                RCB Legends
              </button>
              <button
                onClick={() => setActiveTab('finishes')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'finishes'
                    ? 'bg-white text-[#141210] shadow-2xs'
                    : 'text-stone-500 hover:text-[#141210]'
                }`}
              >
                Iconic Finishes
              </button>
            </div>
          </div>

          {/* ESSAY 1: Virat Kohli (Large Split Feature) */}
          {(activeTab === 'all' || activeTab === 'rcb' || activeTab === 'finishes') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                <img 
                  src="images/virat_kohli.jpg" 
                  alt="Virat Kohli" 
                  className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#c92a2a] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  The GOAT
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  India & Royal Challengers Bengaluru
                </span>
                
                <h3 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase leading-none">
                  Virat Kohli.
                </h3>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                  I don't even follow cricket that closely, but I know better than to ever debate Sanjith about Virat Kohli. He will defend him for two hours straight no matter what. The undisputed king of the run chase and the heart of RCB for over 17 years.
                </p>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-xs font-bold text-[#c92a2a] uppercase tracking-wider block">
                    ✦ Favorite Knock: 82* vs Pakistan (Melbourne 2022)
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    That straight six off Haris Rauf back over the bowler's head. Sanjith has made everyone in the room rewatch this clip countless times.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ESSAY 2: Mitchell Starc (2014-2015 RCB Era) */}
          {(activeTab === 'all' || activeTab === 'rcb') && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
              <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">
                  2014–15 RCB Spearhead
                </span>
                
                <h3 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase leading-none">
                  Mitchell Starc.
                </h3>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                  Every time Sanjith talks about fast bowling, Starc comes up. Back when Starc was steaming in for RCB at Chinnaswamy and bowling 150k thunderbolts with Kohli as captain. Every time Sanjith bowls, this is the bowling action he tries to pull off.
                </p>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                    ✦ The Delivery: 148k Inswinging Yorker
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Fast, curving late, and aiming right for the base of middle stump.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 order-1 lg:order-2">
                <img 
                  src="images/mitchell_starc.jpg" 
                  alt="Mitchell Starc" 
                  className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-sky-700 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  150k Pacer
                </div>
              </div>
            </div>
          )}

          {/* ESSAY 3: AB de Villiers & Chris Gayle (RCB Chinnaswamy Icons) */}
          {(activeTab === 'all' || activeTab === 'rcb') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AB de Villiers */}
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 relative">
                    <img 
                      src="images/ab_de_villiers.jpg" 
                      alt="AB de Villiers" 
                      className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Mr. 360
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Chinnaswamy Legend
                    </span>
                    <h4 className="font-display text-3xl text-[#141210] uppercase">
                      AB de Villiers
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      The reason Sanjith tries ridiculous ramp shots in gully cricket and occasionally misses completely. A pure Chinnaswamy favorite who could clear any roof in the city.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <span className="text-xs font-semibold text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-200 block">
                    ✦ Chinnaswamy roof-top maximums
                  </span>
                </div>
              </div>

              {/* Chris Gayle */}
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 relative">
                    <img 
                      src="images/chris_gayle.jpg" 
                      alt="Chris Gayle Universe Boss" 
                      className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-[#c92a2a] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Universe Boss
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-xs font-bold text-[#c92a2a] uppercase tracking-wider">
                      Chinnaswamy Record
                    </span>
                    <h4 className="font-display text-3xl text-[#141210] uppercase">
                      Chris Gayle
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      175 not out off 66 balls at Chinnaswamy Stadium. The golden era of RCB batting swagger that Sanjith still brings up in every cricket chat.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <span className="text-xs font-semibold text-stone-800 bg-stone-50 p-3 rounded-xl border border-stone-200 block">
                    ✦ Highest T20 score in cricket history (175*)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ESSAY 4: Ben Stokes (Headingley 2019 Miracle) */}
          {(activeTab === 'all' || activeTab === 'finishes') && (
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-100">
                <img 
                  src="images/ben_stokes_headingley.jpg" 
                  alt="Ben Stokes Headingley 2019" 
                  className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Ashes 2019 • 135*
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Favorite Test Finish Ever
                </span>
                
                <h3 className="font-display text-4xl sm:text-5xl text-[#141210] uppercase leading-none">
                  Ben Stokes at Headingley.
                </h3>

                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                  Sanjith's favorite match outside RCB. 73 runs for the 10th wicket with Jack Leach, refusing to concede until the final boundary was struck through the covers. The one Test finish Sanjith constantly rewatches.
                </p>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                    ✦ 135 Not Out vs Australia
                  </span>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Jack Leach cleaned his glasses, Stokes did the rest.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* THE SHOELACE STORY: Nike / Athletic Feature Column */}
        <section className="bg-amber-50/70 p-8 sm:p-12 rounded-3xl border border-amber-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-amber-800 uppercase">
            <span>Stand D Locker Room Archives</span>
            <span>•</span>
            <span>Unfiltered Story</span>
          </div>

          <h3 className="font-display text-4xl sm:text-5xl text-amber-950 uppercase leading-none">
            The Time Sanjith Tied His Shoelaces During Live Play 😂
          </h3>

          <p className="text-base sm:text-lg text-amber-900 leading-relaxed font-normal max-w-3xl">
            I don't play cricket, but this story will never get old. The bowler was at the top of his run-up. Sanjith is out in the deep, and for some reason decides that exact second is the time to bend down and double-knot his sneakers. The bowler bowls, the batsman slices it right in Sanjith's direction, and the ball rolls past him for four while his head is completely down.
          </p>

          <div className="pt-2">
            <blockquote className="border-l-4 border-amber-500 pl-4 py-1 text-base sm:text-lg font-bold italic text-amber-950">
              "Runs saved: 0. Shoes tied: 100%. Confidence: Unmatched."
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
            <span className="text-xs text-stone-500 font-medium">
              {notes.length} {notes.length === 1 ? 'Message' : 'Messages'}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handlePost} className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Azan, Stand D Friend..."
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#141210] placeholder:text-stone-400 focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Birthday Wish or Roast
              </label>
              <textarea
                placeholder="Write a birthday wish, inside joke, or memory for Sanjith..."
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
                  <Check className="w-4 h-4" /> Note posted!
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
      <footer className="border-t border-stone-200 px-6 sm:px-12 py-10 bg-white text-xs text-stone-500">
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
            <span>by Azan for Sanjith • Ee Sala Cup Namde! 💥</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
