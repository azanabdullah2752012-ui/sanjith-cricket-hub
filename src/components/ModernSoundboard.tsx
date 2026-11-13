import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

interface SoundDef {
  id: string;
  label: string;
  category: string;
  description: string;
  type: 'willow' | 'appeal' | 'ovation' | 'cheer';
}

const SOUND_LIST: SoundDef[] = [
  { id: 'willow', label: 'English Willow Sweet Spot', category: 'ACOUSTICS', description: 'Center-of-bat crisp impact with high wood resonance.', type: 'willow' },
  { id: 'timber', label: '148k Timber Cartwheel', category: 'PACE DESTRUCTION', description: 'Stump cartwheeling out of the ground.', type: 'appeal' },
  { id: 'maximum', label: 'Upper-Tier 98m Roar', category: 'ARENA REACTION', description: 'Crowd eruption as the ball sails into the grandstand.', type: 'cheer' },
  { id: 'howzat', label: 'Slip Cordon Howzat Appeal', category: 'APPEAL', description: 'All 4 slips & wicketkeeper roaring in unison.', type: 'appeal' },
  { id: 'century', label: 'Standing Ovation Century', category: 'RESPECT', description: 'Standing applause across the pavilion for the maestro.', type: 'ovation' },
];

export const ModernSoundboard: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  const handlePlay = (snd: SoundDef) => {
    setActive(snd.id);

    if (snd.type === 'willow') pavilionAudio.playWillowCrack();
    if (snd.type === 'appeal') {
      if (snd.id === 'timber') pavilionAudio.playStumpClatter();
      else pavilionAudio.playHowzat();
    }
    if (snd.type === 'ovation') {
      pavilionAudio.playApplause(3.0);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 }, colors: ['#1c1917', '#78716c', '#ece7de'] });
    }
    if (snd.type === 'cheer') {
      pavilionAudio.playBoundaryCheer();
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.8 }, colors: ['#1c1917', '#78716c', '#ece7de'] });
    }

    setTimeout(() => setActive(null), 500);
  };

  return (
    <div className="ald-card p-6 md:p-10 rounded-lg relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#ded7cb] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold">
              WEB AUDIO SYNTHESIS • PROCEDURAL FX
            </span>
          </div>
          <h3 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
            The Stadium Sound Engine
          </h3>
          <p className="text-sm text-[#78716c] mt-1">
            Procedural acoustics generated live using mathematical oscillators and frequency filters.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#1c1917] bg-[#ece7de] px-3.5 py-1.5 rounded-full border border-[#ded7cb]">
          <Volume2 className="w-4 h-4" />
          <span className="font-medium">AUDIO ENGINE ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SOUND_LIST.map((snd) => {
          const isPlaying = active === snd.id;

          return (
            <button
              key={snd.id}
              onClick={() => handlePlay(snd)}
              className={`p-5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer group ${
                isPlaying
                  ? 'bg-[#1c1917] text-[#f5f2eb] border-[#1c1917] shadow-md scale-[1.01]'
                  : 'bg-[#f7f5f0] border-[#ded7cb] hover:border-[#1c1917] hover:bg-[#ece7de]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] tracking-wider uppercase font-semibold ${
                  isPlaying ? 'text-[#a8a29e]' : 'text-[#78716c]'
                }`}>
                  {snd.category}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  isPlaying ? 'bg-[#f5f2eb] text-[#1c1917]' : 'bg-white text-[#1c1917] border border-[#ded7cb]'
                }`}>
                  {isPlaying ? 'ACTIVE' : 'TRIGGER'}
                </span>
              </div>

              <h4 className={`font-editorial text-lg font-bold mt-3 transition-colors ${
                isPlaying ? 'text-[#f5f2eb]' : 'text-[#1c1917]'
              }`}>
                {snd.label}
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${
                isPlaying ? 'text-[#ded7cb]' : 'text-[#78716c]'
              }`}>
                {snd.description}
              </p>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-[#1c1917] transition-opacity ${
                  isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
