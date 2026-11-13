import React, { useState } from 'react';
import { TributePage } from './pages/TributePage';
import { BattingChallengePage } from './pages/BattingChallengePage';
import { FieldingPage } from './pages/FieldingPage';
import { LiveScoresPage } from './pages/LiveScoresPage';
import { PlayersPage } from './pages/PlayersPage';
import { SanjithBirthdayHero } from './components/SanjithBirthdayHero';
import { Gift, Target, Compass, Radio, Users, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export type NavPage = 'tribute' | 'batting' | 'fielding' | 'scores' | 'players';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('tribute');

  const handleNavClick = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.35 },
      colors: ['#dc2626', '#d97706', '#f8fafc', '#ef4444']
    });
  };

  return (
    <div className="min-h-screen bg-[#0e0f12] text-[#f8fafc] flex flex-col relative selection:bg-red-600 selection:text-white">
      {/* Floating Modern Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0e0f12]/85 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            onClick={() => handleNavClick('tribute')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-editorial font-bold text-lg shadow-sm group-hover:scale-105 transition-transform border border-red-500/30">
              10
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg md:text-xl font-bold tracking-tight text-white">
                  SANJITH'S PAVILION
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 font-bold border border-red-500/20">
                  RCB #10
                </span>
              </div>
              <span className="text-[11px] text-[#94a3b8] block -mt-0.5">
                Happy Birthday Sanjith • Made by Azan
              </span>
            </div>
          </div>

          {/* Clean Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#16181d] p-1.5 rounded-full border border-white/[0.08]">
            <button
              onClick={() => handleNavClick('tribute')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'tribute'
                  ? 'bg-white text-[#0e0f12] shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-red-500" />
              <span>Birthday Hub</span>
            </button>

            <button
              onClick={() => handleNavClick('batting')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'batting'
                  ? 'bg-white text-[#0e0f12] shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-amber-500" />
              <span>Batting Game</span>
            </button>

            <button
              onClick={() => handleNavClick('fielding')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'fielding'
                  ? 'bg-white text-[#0e0f12] shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Field Setup</span>
            </button>

            <button
              onClick={() => handleNavClick('scores')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'scores'
                  ? 'bg-white text-[#0e0f12] shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-red-500" />
              <span>Live Matches</span>
            </button>

            <button
              onClick={() => handleNavClick('players')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'players'
                  ? 'bg-white text-[#0e0f12] shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Cricket GOATs</span>
            </button>
          </nav>

          {/* Celebration Button */}
          <button
            onClick={triggerCelebration}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">CELEBRATE 🎉</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden overflow-x-auto px-4 py-2 bg-[#121317] border-t border-white/[0.08] gap-1.5 scrollbar-none">
          <button
            onClick={() => handleNavClick('tribute')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'tribute' ? 'bg-white text-[#0e0f12]' : 'text-[#94a3b8]'
            }`}
          >
            <Gift className="w-3 h-3 text-red-500" />
            Birthday Hub
          </button>
          <button
            onClick={() => handleNavClick('batting')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'batting' ? 'bg-white text-[#0e0f12]' : 'text-[#94a3b8]'
            }`}
          >
            <Target className="w-3 h-3 text-amber-500" />
            Batting Game
          </button>
          <button
            onClick={() => handleNavClick('fielding')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'fielding' ? 'bg-white text-[#0e0f12]' : 'text-[#94a3b8]'
            }`}
          >
            <Compass className="w-3 h-3" />
            Field Setup
          </button>
          <button
            onClick={() => handleNavClick('scores')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'scores' ? 'bg-white text-[#0e0f12]' : 'text-[#94a3b8]'
            }`}
          >
            <Radio className="w-3 h-3 text-red-500" />
            Live Matches
          </button>
          <button
            onClick={() => handleNavClick('players')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentPage === 'players' ? 'bg-white text-[#0e0f12]' : 'text-[#94a3b8]'
            }`}
          >
            <Users className="w-3 h-3" />
            GOATs
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {/* Banner shown on non-tribute pages */}
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

      {/* Clean Modern Footer */}
      <footer className="mt-20 border-t border-white/[0.08] bg-[#121317] py-10 text-center text-xs text-[#94a3b8]">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <div className="font-editorial text-sm font-bold text-white flex items-center justify-center gap-2">
            <span>SANJITH'S PAVILION</span>
            <span>•</span>
            <span className="text-red-400">RCB #10 BIRTHDAY SPECIAL</span>
          </div>
          <p className="text-[#94a3b8]">
            Made with love for Sanjith by Azan. Dedicated to the 12th Man Army, the classic wrist flick, and memories that'll never fade.
          </p>
          <div className="flex items-center justify-center gap-1.5 pt-2 text-white font-medium">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>Happy Birthday Sanjith! Stay 100* Not Out forever.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
