import React, { useState } from 'react';
import { PAVILION_SOUNDS, SoundSample } from '../data/cricketData';
import { pavilionAudio } from '../utils/audioEngine';
import { Volume2, Sparkles, Trophy, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Soundboard: React.FC = () => {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);

  const playSound = (sound: SoundSample) => {
    setActiveSoundId(sound.id);

    switch (sound.type) {
      case 'willow':
        pavilionAudio.playWillowCrack();
        break;
      case 'appeal':
        if (sound.id === 'stump-clatter') {
          pavilionAudio.playStumpClatter();
        } else {
          pavilionAudio.playHowzat();
        }
        break;
      case 'ovation':
        pavilionAudio.playApplause(3.0);
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#d4af37', '#ffffff']
        });
        break;
      case 'cheer':
        pavilionAudio.playBoundaryCheer();
        confetti({
          particleCount: 75,
          spread: 90,
          origin: { y: 0.8 },
          colors: ['#d4af37', '#881337', '#38bdf8']
        });
        break;
    }

    setTimeout(() => {
      setActiveSoundId(null);
    }, 600);
  };

  return (
    <div className="pavilion-card p-6 md:p-8 rounded-lg relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#d4af37]/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Synthesized Audio Engineering
          </span>
          <h3 className="font-serif-vintage text-2xl md:text-3xl text-[#f4efe6] font-bold mt-1">
            The Pavilion Soundboard
          </h3>
          <p className="text-sm text-[#b8afa3] mt-1">
            Real-time procedural audio synthesis generated via Web Audio API. Zero external audio downloads needed.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#a89f92] bg-[#120e0b] px-3 py-1.5 rounded-lg border border-[#d4af37]/20">
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span>Interactive Audio Enabled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAVILION_SOUNDS.map((sound) => {
          const isActive = activeSoundId === sound.id;

          return (
            <button
              key={sound.id}
              onClick={() => playSound(sound)}
              className={`p-5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer group ${
                isActive
                  ? 'bg-[#581825] border-[#facc15] shadow-lg scale-[1.02]'
                  : 'bg-[#181310] border-[#d4af37]/25 hover:border-[#d4af37]/60 hover:bg-[#221a15]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-lg bg-[#2a1d16] border border-[#d4af37]/30 text-[#facc15]">
                  {sound.id === 'sweet-spot' && <Sparkles className="w-5 h-5 text-amber-300" />}
                  {sound.id === 'stump-clatter' && <Flame className="w-5 h-5 text-rose-400" />}
                  {sound.id === 'crowd-applause' && <Trophy className="w-5 h-5 text-yellow-300" />}
                  {sound.id === 'howzat' && <Volume2 className="w-5 h-5 text-cyan-400" />}
                  {sound.id === 'boundary-cheer' && <Flame className="w-5 h-5 text-amber-400" />}
                </div>

                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                  isActive ? 'bg-[#facc15] text-[#141210]' : 'bg-[#2e231c] text-[#a89f92]'
                }`}>
                  {isActive ? 'Playing' : 'Trigger'}
                </span>
              </div>

              <div className="mt-4">
                <h4 className="font-serif-vintage text-base font-bold text-[#f4efe6] group-hover:text-[#facc15] transition-colors">
                  {sound.label}
                </h4>
                <p className="text-xs text-[#a89f92] mt-1 line-clamp-2 leading-relaxed">
                  {sound.description}
                </p>
              </div>

              {/* Bottom pulse line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-rose-500 transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
