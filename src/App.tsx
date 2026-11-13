import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Send, Check } from 'lucide-react';

interface Note {
  id: number;
  from: string;
  text: string;
}

export function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      from: 'Azan',
      text: 'Happy Birthday Sanjith! Always got your back at the crease. Keep hitting that clean wrist flick and never change bro.'
    },
    {
      id: 2,
      from: 'The Squad XI',
      text: 'Happy birthday skipper! Hope this year brings you tons of runs, match-winning overs, and untied shoelaces.'
    }
  ]);

  const [fromName, setFromName] = useState('');
  const [noteText, setNoteText] = useState('');
  const [saved, setSaved] = useState(false);

  const popConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.4 },
      colors: ['#dc2626', '#eab308', '#ffffff']
    });
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromName.trim() || !noteText.trim()) return;

    setNotes(prev => [
      {
        id: Date.now(),
        from: fromName.trim(),
        text: noteText.trim()
      },
      ...prev
    ]);

    setFromName('');
    setNoteText('');
    setSaved(true);
    popConfetti();
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-stone-100 flex flex-col justify-between selection:bg-red-600 selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-white/[0.08] px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center font-num font-black text-white text-base">
              10
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">Sanjith</span>
              <span className="text-[11px] text-stone-400 block -mt-0.5">Birthday Edition • 2026</span>
            </div>
          </div>

          <button
            onClick={popConfetti}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Celebrate 🎉</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 w-full space-y-16">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-semibold">
            <span>RCB 12th Man Army</span>
            <span>•</span>
            <span>Jersey #10</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Happy Birthday, Sanjith.
          </h1>

          <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Made this for you bro. Today you're 100* not out. Here's celebrating your love for RCB, King Kohli's Melbourne chase, Mitchell Starc's yorkers, and the funniest shoelace boundary in cricket history.
          </p>
        </section>

        {/* Quick Facts */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 font-bold">
            Player Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Favorite Team</span>
              <p className="text-base font-bold text-white">Royal Challengers Bengaluru (RCB 💥)</p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Jersey Number</span>
              <p className="text-base font-bold text-white">#10 (The Skipper)</p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Trademark Shot</span>
              <p className="text-base font-bold text-white">The Wrist Flick</p>
              <p className="text-xs text-stone-400">Whipping balls off the pads straight into the stands.</p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">Death Bowling Weapon</span>
              <p className="text-base font-bold text-white">Mitchell Starc 148k Yorker</p>
              <p className="text-xs text-stone-400">Toe-crusher aimed at the base of off-stump.</p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1 sm:col-span-2">
              <span className="text-[11px] text-stone-400 uppercase font-semibold">The Two All-Time Finishes</span>
              <p className="text-base font-bold text-white">
                Virat Kohli 82* vs Pakistan (MCG 2022) & Ben Stokes 135* vs Australia (Headingley 2019)
              </p>
              <p className="text-xs text-stone-400">
                The greatest T20 chase under pressure alongside the most stubborn 73-run last wicket miracle.
              </p>
            </div>
          </div>
        </section>

        {/* The True Story */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#171510] to-[#0d0d12] border border-yellow-500/20 space-y-3">
          <div className="text-xs uppercase tracking-widest text-yellow-400 font-bold">
            Squad Folklore
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white">
            The Time You Tied Your Shoelaces During a Match 😂
          </h3>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            The bowler runs in. The batsman gets set. Meanwhile, out in the deep, you calmly bend down to tie your shoelaces. The bowler doesn't see you and bowls. The batsman whacks it right in your direction! But your head is down, 100% focused on your knot. The ball zips straight past you for four runs while your shoes stay perfectly tied.
          </p>

          <p className="text-xs sm:text-sm text-yellow-300/80 italic pt-1">
            "Runs saved: 0. Shoes tied: 100%. Confidence: 10/10."
          </p>
        </section>

        {/* Message Board */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-stone-400 font-bold">
              Birthday Wishes
            </h2>
            <p className="text-xs text-stone-400 mt-1">Leave a message for Sanjith below.</p>
          </div>

          <form onSubmit={handlePost} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Write a birthday wish or inside joke..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-red-500"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saved ? (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Note saved!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Note</span>
              </button>
            </div>
          </form>

          {/* Notes list */}
          <div className="space-y-3">
            {notes.map(note => (
              <div key={note.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                <span className="text-xs font-bold text-white block">{note.from}</span>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  "{note.text}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-white/[0.08] px-6 py-8 text-center text-xs text-stone-500">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-1.5">
          <span>Made by Azan for Sanjith</span>
          <span>•</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>Stay 100* Not Out!</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
