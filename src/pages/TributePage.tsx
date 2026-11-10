import React from 'react';
import { ModernSoundboard } from '../components/ModernSoundboard';
import { ModernGuestbook } from '../components/ModernGuestbook';
import { Gift, Volume2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pavilionAudio } from '../utils/audioEngine';

export const TributePage: React.FC = () => {
  const triggerBirthdayCheer = () => {
    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.4 },
      colors: ['#1c1917', '#78716c', '#ece7de', '#ded7cb']
    });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Sanjith Birthday Celebration Hero Card */}
      <div className="ald-card p-6 md:p-10 rounded-2xl bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-[#1c1917]" />
              SPECIAL DEDICATION • BIRTHDAY CENTURY
            </span>
          </div>

          <h1 className="font-editorial text-3xl md:text-5xl font-bold text-[#1c1917] tracking-tight">
            Happy Birthday Sanjith!
          </h1>

          <p className="text-base text-[#44403c] mt-2 max-w-xl leading-relaxed">
            Wishing you an unforgettable birthday. This live cricket terminal is crafted for your love of the game—from real-time match tracking to tactical masterclasses. Raise the bat for another milestone year!
          </p>

          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-[#1c1917]">
            <Heart className="w-4 h-4 text-red-600 fill-red-600" />
            <span>Built by Azan & the squad with pure cricket brotherhood.</span>
          </div>
        </div>

        <button
          onClick={triggerBirthdayCheer}
          className="px-6 py-3.5 bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] font-editorial font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>FIRE BIRTHDAY CANNON</span>
        </button>
      </div>

      {/* Procedural Soundboard */}
      <section>
        <ModernSoundboard />
      </section>

      {/* Guestbook Ledger */}
      <section>
        <ModernGuestbook />
      </section>
    </div>
  );
};
