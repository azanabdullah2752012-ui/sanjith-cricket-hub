import React, { useState } from 'react';
import { TributePage } from './pages/TributePage';
import { BattingChallengePage } from './pages/BattingChallengePage';
import { FieldingPage } from './pages/FieldingPage';
import { LiveScoresPage } from './pages/LiveScoresPage';
import { PlayersPage } from './pages/PlayersPage';
import { SanjithBirthdayHero } from './components/SanjithBirthdayHero';
import { Gift, Target, Compass, Radio, Users, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pavilionAudio } from './utils/audioEngine';

export type NavPage = 'tribute' | 'batting' | 'fielding' | 'scores' | 'players';

export function App() {
  // Start on Sanjith's Tribute page as the default home view
  const [currentPage, setCurrentPage] = useState<NavPage>('tribute');

  const handleNavClick = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    pavilionAudio.playWillowCrack();
  };

  const triggerCelebration = () => {
    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 140,
      spread: 95,
      origin: { y: 0.3 },
      colors: ['#1c1917', '#b45309', '#f5f2eb', '#d97706']
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#1c1917] flex flex-col relative selection:bg-[#1c1917] selection:text-[#f5f2eb]">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#f5f2eb]/90 border-b border-[#ded7cb] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Identity: Dedicated to Sanjith */}
          <div
            onClick={() => handleNavClick('tribute')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1c1917] flex items-center justify-center text-[#f5f2eb] font-editorial font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              18
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg md:text-xl font-bold tracking-tight text-[#1c1917]">
                  SANJITH'S PAVILION
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">
                  BIRTHDAY EDITION
                </span>
              </div>
              <span className="text-[11px] text-[#78716c] block -mt-0.5">
                THE SKIPPER'S CRICKET RETREAT • CRAFTED BY AZAN
              </span>
            </div>
          </div>

          {/* Dedicated Page Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#ece7de] p-1.5 rounded-full border border-[#ded7cb]">
            <button
              onClick={() => handleNavClick('tribute')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'tribute'
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-500" />
              <span>The Pavilion</span>
            </button>

            <button
              onClick={() => handleNavClick('batting')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'batting'
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-600" />
              <span>Batting Arena</span>
            </button>

            <button
              onClick={() => handleNavClick('fielding')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'fielding'
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Fielding Tactics</span>
            </button>

            <button
              onClick={() => handleNavClick('scores')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'scores'
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-red-600" />
              <span>Live Scores</span>
            </button>

            <button
              onClick={() => handleNavClick('players')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'players'
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Cricket Legends</span>
            </button>
          </nav>

          {/* Quick Celebration Trigger */}
          <button
            onClick={triggerCelebration}
            className="px-3.5 py-1.5 bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] font-editorial font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">CELEBRATE</span>
          </button>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto px-4 py-2 bg-[#ece7de] border-t border-[#ded7cb] gap-1.5 scrollbar-none">
          <button
            onClick={() => handleNavClick('tribute')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'tribute' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            <Gift className="w-3 h-3 text-amber-500" />
            The Pavilion
          </button>
          <button
            onClick={() => handleNavClick('batting')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'batting' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            <Target className="w-3 h-3 text-amber-600" />
            Batting Arena
          </button>
          <button
            onClick={() => handleNavClick('fielding')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'fielding' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            <Compass className="w-3 h-3" />
            Fielding Map
          </button>
          <button
            onClick={() => handleNavClick('scores')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'scores' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            <Radio className="w-3 h-3 text-red-600" />
            Live Scores
          </button>
          <button
            onClick={() => handleNavClick('players')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'players' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            <Users className="w-3 h-3" />
            Legends
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {/* Birthday Header Banner if not on the main tribute page */}
        {currentPage !== 'tribute' && (
          <SanjithBirthdayHero onOpenTribute={() => handleNavClick('tribute')} />
        )}

        {currentPage === 'tribute' && (
          <TributePage onNavigate={(page) => handleNavClick(page)} />
        )}
        {currentPage === 'batting' && <BattingChallengePage />}
        {currentPage === 'fielding' && <FieldingPage />}
        {currentPage === 'scores' && <LiveScoresPage />}
        {currentPage === 'players' && <PlayersPage />}
      </main>

      {/* Bespoke Gift Footer */}
      <footer className="mt-20 border-t border-[#ded7cb] bg-[#ece7de] py-10 text-center text-xs text-[#78716c]">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <div className="font-editorial text-sm font-bold text-[#1c1917] flex items-center justify-center gap-2">
            <span>SANJITH'S PAVILION</span>
            <span>•</span>
            <span className="text-amber-800">DEDICATED BIRTHDAY EDITION</span>
          </div>
          <p className="text-[#78716c]">
            A handcrafted digital cricket gift created with brotherhood by Azan. Featuring real live ESPNcricinfo scores, the Hawkeye 3D corridor, tactical fielding architect, and the Skipper's batting arena.
          </p>
          <div className="flex items-center justify-center gap-1.5 pt-2 text-[#1c1917] font-semibold">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
            <span>Happy Birthday Sanjith! May your score in the game of life remain 100* Not Out.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
