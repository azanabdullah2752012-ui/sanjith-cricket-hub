import React, { useState, useEffect } from 'react';
import { Send, Heart, Trash2, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WishMessage {
  id: string;
  sender: string;
  badge: string;
  message: string;
  timestamp: string;
}

const INITIAL_MESSAGES: WishMessage[] = [
  {
    id: '1',
    sender: "Azan",
    badge: "OPENING PARTNER & BROTHER",
    message: "Happy Birthday Sanjith (#10)! Another year, another century in the game of life. Keep whipping that trademark wrist flick over mid-wicket and spearing those Starc yorkers at the death! And promise me you'll never stop tying your shoelaces mid-over while the ball flies to the boundary 😂. Proud to share the crease with you, brother! RCB for life 💥",
    timestamp: "PINNED"
  },
  {
    id: '2',
    sender: "The Dressing Room Squad",
    badge: "RCB 12TH MAN ARMY",
    message: "To Skipper Sanjith: Channeling King Kohli's Melbourne 82* fire, Mitchell Starc's 150k toe-crushers, and holding the team together from the front. May this milestone year bring endless boundaries, match-winning spells, and an undefeated century!",
    timestamp: "TODAY"
  }
];

export const ModernGuestbook: React.FC = () => {
  const [messages, setMessages] = useState<WishMessage[]>(() => {
    const saved = localStorage.getItem('sanjith_broadcast_wishes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MESSAGES;
  });

  const [name, setName] = useState('');
  const [badge, setBadge] = useState('Teammate / Brother');
  const [text, setText] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  useEffect(() => {
    localStorage.setItem('sanjith_broadcast_wishes', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newMsg: WishMessage = {
      id: Date.now().toString(),
      sender: name.trim(),
      badge: badge.trim().toUpperCase(),
      message: text.trim(),
      timestamp: "JUST NOW"
    };

    setMessages([newMsg, ...messages]);
    setName('');
    setText('');
    setSubmittedFeedback(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dc2626', '#d97706', '#f8fafc', '#ef4444']
    });

    setTimeout(() => {
      setSubmittedFeedback(false);
    }, 4500);
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="ald-card p-6 md:p-10 rounded-3xl relative overflow-hidden bg-[#16181d] border border-white/[0.08]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-red-400" />
              SQUAD MESSAGE BOARD
            </span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl text-white font-bold tracking-tight">
            Birthday Wishes for Sanjith
          </h3>
          <p className="text-sm text-[#94a3b8] mt-1">
            Leave a birthday note for the skipper. Messages stay saved on the board.
          </p>
        </div>

        <button
          onClick={() => {
            confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 }, colors: ['#dc2626', '#d97706', '#f8fafc'] });
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Cheer 🎉</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 bg-[#121317] p-6 rounded-2xl border border-white/[0.06] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4">
            {submittedFeedback && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Note pinned to the board! 🏏</span>
              </div>
            )}
            <div>
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1 font-semibold">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Azan, Teammate..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b22] border border-white/[0.08] text-white text-xs placeholder:text-[#64748b] focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1 font-semibold">
                Nickname / Role
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Opening Partner, RCB Fan..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b22] border border-white/[0.08] text-white text-xs placeholder:text-[#64748b] focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#94a3b8] uppercase tracking-wider mb-1 font-semibold">
                Your Birthday Message
              </label>
              <textarea
                required
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Drop a birthday wish or inside joke for Sanjith..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b22] border border-white/[0.08] text-white text-xs placeholder:text-[#64748b] focus:outline-none focus:border-red-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Message</span>
            </button>
          </form>
        </div>

        {/* Messages List */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
          {messages.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-[#121317] border border-white/[0.06] hover:border-white/[0.12] transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center">
                    {m.sender.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-editorial text-sm font-bold text-white block">
                      {m.sender}
                    </span>
                    <span className="text-[10px] text-red-400 font-semibold tracking-wider uppercase block">
                      {m.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#64748b] font-mono">
                    {m.timestamp}
                  </span>
                  {m.id !== '1' && m.id !== '2' && (
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#64748b] hover:text-red-400 transition-all cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#cbd5e1] leading-relaxed pl-9">
                {m.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
