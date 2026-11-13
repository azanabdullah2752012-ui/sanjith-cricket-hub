import React, { useRef } from 'react';
import { Camera, Shield } from 'lucide-react';

interface PlayerVisualFrameProps {
  customPhoto: string | null;
  onPhotoUpload: (url: string) => void;
  chapterIndex: number;
}

export const PlayerVisualFrame: React.FC<PlayerVisualFrameProps> = ({
  customPhoto,
  onPhotoUpload,
  chapterIndex
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onPhotoUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full aspect-[4/5] max-w-md mx-auto group">
      {/* Container */}
      <div className="relative h-full w-full rounded-lg overflow-hidden bg-[#ece7de] border border-[#ded7cb] shadow-sm flex flex-col justify-between p-6 transition-all">
        {/* Background Graphic or Real Photo */}
        {customPhoto ? (
          <div className="absolute inset-0 z-0">
            <img
              src={customPhoto}
              alt="Sanjith in action"
              className="w-full h-full object-cover object-top filter grayscale contrast-105"
            />
            {/* Subtle aesthetic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/90 via-[#1c1917]/20 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#ebe6dc]">
            {/* Minimalist Editorial Batsman Silhouette in Warm Charcoal */}
            <svg
              viewBox="0 0 200 240"
              className="w-64 h-80 text-[#1c1917] transition-transform duration-500 ease-out group-hover:scale-105"
            >
              <circle cx="100" cy="110" r="75" fill="none" stroke="#ded7cb" strokeWidth="1" strokeDasharray="4 4" />
              
              <g fill="currentColor">
                {/* Helmet */}
                <ellipse cx="100" cy="45" rx="14" ry="16" />
                <path d="M102,48 L116,46 L114,52 L102,51 Z" fill="#ffffff" />

                {/* Torso & Jersey #18 */}
                <path d="M86,63 C86,63 100,59 114,63 L120,115 L80,115 Z" fill="#1c1917" stroke="#ffffff" strokeWidth="0.5" />
                <text x="100" y="94" fill="#f5f2eb" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">18</text>

                {/* Arms */}
                <path d="M86,66 L68,90 L85,96" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M114,66 L128,88 L105,97" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                {/* Willow Bat */}
                <path d="M85,96 L45,160 L54,166 L95,100 Z" fill="#78716c" stroke="currentColor" strokeWidth="0.5" />
                <line x1="88" y1="98" x2="98" y2="82" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" />

                {/* Pads */}
                <rect x="80" y="120" width="16" height="75" rx="4" fill="#ffffff" stroke="#ded7cb" strokeWidth="1" />
                <rect x="104" y="120" width="16" height="75" rx="4" fill="#ffffff" stroke="#ded7cb" strokeWidth="1" />

                {/* Shoes */}
                <path d="M76,195 L98,195 L94,204 L74,204 Z" fill="#1c1917" />
                <path d="M104,195 L126,195 L122,204 L102,204 Z" fill="#1c1917" />
              </g>
            </svg>
          </div>
        )}

        {/* Top Minimal Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#ded7cb] text-xs text-[#1c1917] font-medium shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1c1917]" />
            <span className="tracking-widest text-[10px] uppercase font-semibold">
              ATHLETICS LOOKBOOK
            </span>
          </div>

          <div className="text-[11px] font-mono text-[#78716c] bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#ded7cb]">
            ACT {chapterIndex + 1} / 04
          </div>
        </div>

        {/* Bottom Upload Control */}
        <div className="relative z-10 mt-auto">
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#ded7cb] shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-editorial text-sm font-bold text-[#1c1917] tracking-tight flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#1c1917]" />
                  SANJITH • NO. 18
                </div>
                <div className="text-[11px] text-[#78716c] mt-0.5">
                  {customPhoto ? 'Custom Portrait In Frame' : 'Athletics Archive Silhouette'}
                </div>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Camera className="w-3 h-3" />
                <span>{customPhoto ? 'Change Photo' : 'Upload Sanjith\'s Pic'}</span>
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};
