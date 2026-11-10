import React, { useState } from 'react';
import { LiveScoresPage } from './pages/LiveScoresPage';
import { NewsPage } from './pages/NewsPage';
import { FieldingPage } from './pages/FieldingPage';
import { PlayersPage } from './pages/PlayersPage';
import { TributePage } from './pages/TributePage';
import { SanjithBirthdayHero } from './components/SanjithBirthdayHero';
import { Radio, Newspaper, Compass, Users, Gift, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pavilionAudio } from './utils/audioEngine';

export type NavPage = 'scores' | 'news' | 'fielding' | 'players' | 'tribute';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('scores');

  const handleNavClick = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    pavilionAudio.playWillowCrack();
  };

  const triggerCelebration = () => {
    pavilionAudio.playBoundaryCheer();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.3 },
      colors: ['#1c1917', '#78716c', '#ece7de']
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-[#1c1917] flex flex-col relative selection:bg-[#1c1917] selection:text-[#f5f2eb]">
      {/* Top Multi-Page Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#f5f2eb]/90 border-b border-[#ded7cb] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Identity */}
          <div
            onClick={() => handleNavClick('scores')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1c1917] flex items-center justify-center text-[#f5f2eb] font-editorial font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              22
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-lg md:text-xl font-bold tracking-tight text-[#1c1917]">
                  CRICKET CENTRAL
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#ece7de] text-[#1c1917] font-semibold border border-[#ded7cb]">
                  PRO EDITION
                </span>
              </div>
              <span className="text-[11px] text-[#78716c] block -mt-0.5">
                LIVE TERMINAL • TACTICAL ACADEMY • PROFILES
              </span>
            </div>
          </div>

          {/* Dedicated Page Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#ece7de] p-1.5 rounded-full border border-[#ded7cb]">
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
              onClick={() => handleNavClick('news')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'news'
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>News Wire</span>
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
              onClick={() => handleNavClick('players')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'players'
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Player Dossiers</span>
            </button>

            <button
              onClick={() => handleNavClick('tribute')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentPage === 'tribute'
                  ? 'bg-[#1c1917] text-[#f5f2eb] shadow-sm'
                  : 'text-[#78716c] hover:text-[#1c1917]'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Sanjith's B'day</span>
            </button>
          </nav>

          {/* Quick Tribute Action */}
          <button
            onClick={triggerCelebration}
            className="px-3.5 py-1.5 bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] font-editorial font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CELEBRATE</span>
          </button>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto px-4 py-2 bg-[#ece7de] border-t border-[#ded7cb] gap-1 scrollbar-none">
          <button
            onClick={() => handleNavClick('scores')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold ${
              currentPage === 'scores' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            Live Scores
          </button>
          <button
            onClick={() => handleNavClick('news')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold ${
              currentPage === 'news' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            News Wire
          </button>
          <button
            onClick={() => handleNavClick('fielding')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold ${
              currentPage === 'fielding' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            Fielding Map
          </button>
          <button
            onClick={() => handleNavClick('players')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold ${
              currentPage === 'players' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            Players
          </button>
          <button
            onClick={() => handleNavClick('tribute')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap font-semibold ${
              currentPage === 'tribute' ? 'bg-[#1c1917] text-[#f5f2eb]' : 'text-[#78716c]'
            }`}
          >
            Sanjith Tribute
          </button>
        </div>
      </header>

      {/* Main View Area - Swapped based on Active Page */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {/* Birthday Header Banner if not already on the tribute page */}
        {currentPage !== 'tribute' && (
          <SanjithBirthdayHero onOpenTribute={() => handleNavClick('tribute')} />
        )}

        {currentPage === 'scores' && <LiveScoresPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'fielding' && <FieldingPage />}
        {currentPage === 'players' && <PlayersPage />}
        {currentPage === 'tribute' && <TributePage />}
      </main>

      {/* Multi-Page Clean Footer */}
      <footer className="mt-20 border-t border-[#ded7cb] bg-[#ece7de] py-10 text-center text-xs text-[#78716c]">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <div className="font-editorial text-sm font-bold text-[#1c1917]">
            CRICKET CENTRAL • DEDICATED CRICKET MULTI-PAGE TERMINAL
          </div>
          <p className="text-[#78716c]">
            Live score sync from ESPNcricinfo • Wire from The Guardian • Tactical Academy • Player Dossiers
          </p>
          <div className="pt-2 flex items-center justify-center gap-1 text-[#1c1917] font-semibold text-xs">
            <span>Crafted for Sanjith's Birthday with</span>
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 inline" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
