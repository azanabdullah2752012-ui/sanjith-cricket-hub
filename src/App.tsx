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
      colors: ['#c92a2a', '#d97706', '#1c1917']
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
    <div className="min-h-screen bg-[#fbfbfa] text-[#1c1917] flex flex-col justify-between selection:bg-[#c92a2a] selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-[#e7e5e4] px-6 py-5 bg-[#fbfbfa]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#c92a2a] flex items-center justify-center font-num font-black text-white text-base shadow-sm">
              10
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-[#1c1917] block">Sanjith</span>
              <span className="text-[11px] text-[#78716c] block -mt-0.5">Birthday Edition • 2026</span>
            </div>
          </div>

          <button
            onClick={popConfetti}
            className="px-4 py-2 rounded-lg bg-[#c92a2a] hover:bg-[#b02525] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Celebrate 🎉</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 w-full space-y-14">
        {/* Hero Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#b91c1c] text-xs font-semibold">
            <span>RCB 12th Man Army</span>
            <span>•</span>
            <span>Jersey #10</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1c1917] leading-tight">
            Happy Birthday, Sanjith.
          </h1>

          <p className="text-[#44403c] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Made this for you bro. Today you're 100* not out. Here's celebrating your love for RCB, King Kohli's Melbourne chase, Mitchell Starc's yorkers, and the funniest shoelace boundary in cricket history.
          </p>
        </section>

        {/* Quick Facts */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
            Player Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white border border-[#e7e5e4] shadow-sm space-y-1">
              <span className="text-[11px] text-[#78716c] uppercase font-semibold">Favorite Team</span>
              <p className="text-base font-bold text-[#1c1917]">Royal Challengers Bengaluru (RCB 💥)</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#e7e5e4] shadow-sm space-y-1">
              <span className="text-[11px] text-[#78716c] uppercase font-semibold">Jersey Number</span>
              <p className="text-base font-bold text-[#1c1917]">#10 (The Skipper)</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#e7e5e4] shadow-sm space-y-1">
              <span className="text-[11px] text-[#78716c] uppercase font-semibold">Trademark Shot</span>
              <p className="text-base font-bold text-[#1c1917]">The Wrist Flick</p>
              <p className="text-xs text-[#78716c]">Whipping balls off the pads straight into the stands.</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#e7e5e4] shadow-sm space-y-1">
              <span className="text-[11px] text-[#78716c] uppercase font-semibold">Death Bowling Weapon</span>
              <p className="text-base font-bold text-[#1c1917]">Mitchell Starc 148k Yorker</p>
              <p className="text-xs text-[#78716c]">Toe-crusher aimed at the base of off-stump.</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#e7e5e4] shadow-sm space-y-1 sm:col-span-2">
              <span className="text-[11px] text-[#78716c] uppercase font-semibold">The Two All-Time Finishes</span>
              <p className="text-base font-bold text-[#1c1917]">
                Virat Kohli 82* vs Pakistan (MCG 2022) & Ben Stokes 135* vs Australia (Headingley 2019)
              </p>
              <p className="text-xs text-[#78716c]">
                The greatest T20 chase under pressure alongside the most stubborn 73-run last wicket miracle.
              </p>
            </div>
          </div>
        </section>

        {/* The True Story */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#fffbeb] border border-[#fde68a] space-y-3 shadow-sm">
          <div className="text-xs uppercase tracking-widest text-[#b45309] font-bold">
            Squad Folklore
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#78350f]">
            The Time You Tied Your Shoelaces During a Match 😂
          </h3>

          <p className="text-sm sm:text-base text-[#92400e] leading-relaxed">
            The bowler runs in. The batsman gets set. Meanwhile, out in the deep, you calmly bend down to tie your shoelaces. The bowler doesn't see you and bowls. The batsman whacks it right in your direction! But your head is down, 100% focused on your knot. The ball zips straight past you for four runs while your shoes stay perfectly tied.
          </p>

          <p className="text-xs sm:text-sm text-[#b45309] font-semibold italic pt-1">
            "Runs saved: 0. Shoes tied: 100%. Confidence: 10/10."
          </p>
        </section>

        {/* Message Board */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-[#78716c] font-bold">
              Birthday Wishes
            </h2>
            <p className="text-xs text-[#78716c] mt-1">Leave a message for Sanjith below.</p>
          </div>

          <form onSubmit={handlePost} className="p-5 rounded-xl bg-white border border-[#e7e5e4] shadow-sm space-y-3">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#fbfbfa] border border-[#d6d3d1] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Write a birthday wish or inside joke..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#fbfbfa] border border-[#d6d3d1] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:border-[#c92a2a] focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saved ? (
                <span className="text-xs text-[#15803d] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Note saved!
                </span>
              ) : (
                <span />
              )}

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#c92a2a] hover:bg-[#b02525] text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Note</span>
              </button>
            </div>
          </form>

          {/* Notes list */}
          <div className="space-y-3">
            {notes.map(note => (
              <div key={note.id} className="p-4 rounded-xl bg-white border border-[#e7e5e4] shadow-sm space-y-1">
                <span className="text-xs font-bold text-[#1c1917] block">{note.from}</span>
                <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed">
                  "{note.text}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-[#e7e5e4] px-6 py-8 text-center text-xs text-[#78716c] bg-[#fbfbfa]">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-1.5">
          <span>Made by Azan for Sanjith</span>
          <span>•</span>
          <Heart className="w-3.5 h-3.5 text-[#c92a2a] fill-[#c92a2a] inline" />
          <span>Stay 100* Not Out!</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
