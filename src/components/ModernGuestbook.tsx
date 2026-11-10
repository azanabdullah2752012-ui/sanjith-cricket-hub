import React, { useState, useEffect } from 'react';
import { Send, Heart, Trash2, Sparkles } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';
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
    badge: "OPENING PARTNER",
    message: "Happy Birthday Sanjith! Another year, another century in the game of life. Keep dispatching every bouncer straight over deep square leg. Proud to share the crease with you, brother!",
    timestamp: "LIVE"
  },
  {
    id: '2',
    sender: "The Dressing Room Squad",
    badge: "FIRST XI",
    message: "To our premier all-rounder: that cover drive is pure artistry. May this year bring endless boundaries, match-winning spells, and countless trophies!",
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

    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#1c1917', '#78716c', '#ece7de']
    });
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="ald-card p-6 md:p-10 rounded-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#ded7cb] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold">
              ATHLETICS TRIBUTE LEDGER
            </span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
            Dressing Room Birthday Messages
          </h3>
          <p className="text-sm text-[#78716c] mt-1">
            Leave a permanent personal tribute for Sanjith. All messages persist automatically.
          </p>
        </div>

        <button
          onClick={() => {
            pavilionAudio.playBoundaryCheer();
            confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 }, colors: ['#1c1917', '#78716c', '#ece7de'] });
          }}
          className="px-4 py-2 bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>FIRE CONFETTI CANNON</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <div className="lg:col-span-5 bg-[#f7f5f0] p-6 rounded-xl border border-[#ded7cb]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] text-[#78716c] uppercase tracking-wider mb-1 font-semibold">
                Your Name / Calling Sign
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Azan, Skipper, Coach..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ded7cb] text-[#1c1917] text-xs focus:outline-none focus:border-[#1c1917] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#78716c] uppercase tracking-wider mb-1 font-semibold">
                Title / Locker Room Badge
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Opening Partner, Slip Cordon..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ded7cb] text-[#1c1917] text-xs focus:outline-none focus:border-[#1c1917] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#78716c] uppercase tracking-wider mb-1 font-semibold">
                Personal Birthday Wish
              </label>
              <textarea
                required
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your birthday memory, match moment, or message for Sanjith..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#ded7cb] text-[#1c1917] text-xs focus:outline-none focus:border-[#1c1917] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] font-editorial font-bold text-sm tracking-wide rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>TRANSMIT TRIBUTE</span>
            </button>
          </form>
        </div>

        {/* Message Stream */}
        <div className="lg:col-span-7 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className="p-5 bg-[#f7f5f0] rounded-xl border border-[#ded7cb] hover:border-[#1c1917] transition-colors relative group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1c1917] text-[#f5f2eb] flex items-center justify-center font-editorial font-bold text-sm">
                    {m.sender.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-editorial font-bold text-sm text-[#1c1917]">
                      {m.sender}
                    </h4>
                    <span className="text-[10px] text-[#78716c] uppercase tracking-wider font-semibold">
                      {m.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#78716c] font-mono">{m.timestamp}</span>
                  <button
                    onClick={() => handleDelete(m.id)}
                    title="Delete wish"
                    className="opacity-0 group-hover:opacity-100 text-[#78716c] hover:text-red-600 transition-opacity p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-xs md:text-sm text-[#44403c] leading-relaxed">
                "{m.message}"
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-[#78716c]">
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span className="font-medium">VERIFIED TEAMMATE TRIBUTE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
