import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageSquare, Trash2, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pavilionAudio } from '../utils/audioEngine';

interface WishMessage {
  id: string;
  sender: string;
  badge: string;
  message: string;
  timestamp: string;
}

const DEFAULT_MESSAGES: WishMessage[] = [
  {
    id: '1',
    sender: "Azan",
    badge: "Opening Partner",
    message: "Happy Birthday Sanjith! Another year, another century in the game of life. Keep dispatching every bouncer straight over deep square leg. Honored to share the pitch with you bro!",
    timestamp: "Just now"
  },
  {
    id: '2',
    sender: "Coach & The Dressing Room",
    badge: "Team Management",
    message: "To our finest all-rounder: your composure under pressure and that cover drive are unmatched. May this year bring you countless trophies and match-winning spells!",
    timestamp: "2 hours ago"
  },
  {
    id: '3',
    sender: "The Sunday XI Squad",
    badge: "Vice Captain",
    message: "Wishing you a massive birthday mate! Today no dot balls allowed—pure boundaries, celebrations, and an unforgettable celebration tonight!",
    timestamp: "Earlier today"
  }
];

export const BirthdayTributeBoard: React.FC = () => {
  const [messages, setMessages] = useState<WishMessage[]>(() => {
    const saved = localStorage.getItem('sanjith_bday_wishes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_MESSAGES;
  });

  const [senderName, setSenderName] = useState('');
  const [badgeTitle, setBadgeTitle] = useState('Teammate / Best Friend');
  const [wishText, setWishText] = useState('');

  useEffect(() => {
    localStorage.setItem('sanjith_bday_wishes', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !wishText.trim()) return;

    const newWish: WishMessage = {
      id: Date.now().toString(),
      sender: senderName.trim(),
      badge: badgeTitle.trim() || 'Supporter',
      message: wishText.trim(),
      timestamp: "Just now"
    };

    setMessages([newWish, ...messages]);
    setSenderName('');
    setWishText('');

    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f4efe6', '#881337', '#38bdf8', '#4ade80']
    });
  };

  const handleClearWish = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="pavilion-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#d4af37]/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5">
            <Cake className="w-4 h-4 text-amber-300" /> Birthday Tribute Ledger
          </span>
          <h3 className="font-serif-vintage text-2xl md:text-3xl text-[#f4efe6] font-bold mt-1">
            The Pavilion Guestbook & Birthday Messages
          </h3>
          <p className="text-sm text-[#b8afa3] mt-1">
            Leave your personalized birthday tribute or wish for Sanjith. Messages are preserved locally.
          </p>
        </div>

        <button
          onClick={() => {
            confetti({
              particleCount: 80,
              spread: 100,
              origin: { y: 0.5 },
            });
            pavilionAudio.playApplause(2.5);
          }}
          className="px-4 py-2 bg-[#581825] hover:bg-[#721f31] text-[#fef08a] border border-[#d4af37]/40 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          Fire Birthday Confetti Cannon
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form to append a message */}
        <div className="lg:col-span-5 bg-[#17120e] p-6 rounded-xl border border-[#d4af37]/30">
          <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#d4af37] tracking-wider mb-4">
            <MessageSquare className="w-4 h-4 text-[#d4af37]" /> Sign the Match Day Pavilion Ledger
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#b8afa3] mb-1">
                Your Name / Nickname
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Azan, Rahul, Skipper..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0b09] border border-[#d4af37]/30 text-[#f4efe6] text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b8afa3] mb-1">
                Your Title / Relation
              </label>
              <input
                type="text"
                value={badgeTitle}
                onChange={(e) => setBadgeTitle(e.target.value)}
                placeholder="e.g. Opening Partner, Childhood Friend, Slip Cordon..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0b09] border border-[#d4af37]/30 text-[#f4efe6] text-sm focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b8afa3] mb-1">
                Birthday Tribute & Wishes
              </label>
              <textarea
                required
                rows={4}
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Share a memory, praise his cover drive, or wish him a stellar year ahead..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e0b09] border border-[#d4af37]/30 text-[#f4efe6] text-sm focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] hover:opacity-95 text-[#141210] font-cinzel font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Inscribe in Ledger
            </button>
          </form>
        </div>

        {/* Message Feed Display */}
        <div className="lg:col-span-7 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="p-8 text-center bg-[#17120e] rounded-xl border border-[#d4af37]/20 text-[#a89f92]">
              No entries yet. Be the first to sign Sanjith's birthday guestbook!
            </div>
          ) : (
            messages.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-[#1a1410] rounded-xl border border-[#d4af37]/20 hover:border-[#d4af37]/45 transition-colors relative group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#581825] border border-[#d4af37]/50 flex items-center justify-center font-bold text-xs text-[#fef08a]">
                      {item.sender.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-serif-vintage font-bold text-sm text-[#f4efe6]">
                        {item.sender}
                      </h4>
                      <span className="text-[10px] text-[#d4af37] uppercase tracking-wider font-medium">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#7d7469]">{item.timestamp}</span>
                    <button
                      onClick={() => handleClearWish(item.id)}
                      title="Remove message"
                      className="opacity-0 group-hover:opacity-100 text-[#8d8276] hover:text-rose-400 transition-opacity p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-xs md:text-sm text-[#d6cdbf] leading-relaxed pl-2 border-l border-[#d4af37]/30 italic">
                  "{item.message}"
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-amber-300/80">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                  <span>Pavilion Certified Warmth</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
