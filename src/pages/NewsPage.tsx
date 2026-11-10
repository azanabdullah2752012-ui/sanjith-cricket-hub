import React, { useState, useEffect } from 'react';
import { CricketNewsItem } from '../data/liveCricketData';
import { fetchCricketNews } from '../services/cricketFeedService';
import { PRACTICAL_CRICKET_RULES } from '../data/cricketMasteryData';
import { Newspaper, ExternalLink, Calendar, RefreshCw, BookOpen, ShieldCheck, Tag, TrendingUp } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

export const NewsPage: React.FC = () => {
  const [news, setNews] = useState<CricketNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTopic, setFilterTopic] = useState<string>('All');

  const topics = ['All', 'Test Cricket', 'IPL & T20', 'Player Wire', 'Analysis'];

  const loadNews = async () => {
    setLoading(true);
    const data = await fetchCricketNews();
    setNews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Top Newsroom Header */}
      <div className="ald-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-br from-white via-[#f7f5f0] to-white border border-[#ded7cb]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-red-700 font-bold flex items-center gap-1.5 font-mono">
              <Newspaper className="w-4 h-4 text-[#1c1917]" />
              GLOBAL CRICKET WIRE & JOURNALISM
            </span>
          </div>
          <h1 className="font-editorial text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
            Live Cricket Wire & Investigative Reports
          </h1>
          <p className="text-sm text-[#78716c] mt-1 max-w-2xl">
            Live editorial feeds syndicated directly from **The Guardian** and **ESPNcricinfo**: breaking captaincy decisions, player controversies, and tour reports.
          </p>
        </div>

        <button
          onClick={() => {
            pavilionAudio.playWillowCrack();
            loadNews();
          }}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all shadow-sm shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Updating Wire...' : 'Refresh Live Feeds'}</span>
        </button>
      </div>

      {/* Featured Lead Story + Editorial Grid */}
      {news.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Big Featured Lead Story (Column 7) */}
          <div className="lg:col-span-7">
            <a
              href={news[0].link}
              target="_blank"
              rel="noreferrer"
              className="ald-card rounded-3xl overflow-hidden block group bg-white border border-[#ded7cb] hover:border-[#1c1917] transition-all hover:shadow-xl cursor-pointer"
            >
              {news[0].image && (
                <div className="w-full h-72 sm:h-80 overflow-hidden bg-[#ece7de] relative">
                  <img
                    src={news[0].image}
                    alt={news[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1c1917] shadow-sm flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-red-600" />
                    <span>LEAD STORY • {news[0].source}</span>
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#78716c] font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#1c1917]" />
                  <span>{news[0].pubDate}</span>
                </div>

                <h2 className="font-editorial text-2xl md:text-3xl font-bold text-[#1c1917] group-hover:underline leading-tight">
                  {news[0].title}
                </h2>

                <p className="text-sm text-[#44403c] leading-relaxed">
                  {news[0].description}
                </p>

                <div className="pt-4 border-t border-[#ded7cb] flex items-center justify-between text-xs font-bold text-[#1c1917]">
                  <span>Read Full Guardian Investigation</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          </div>

          {/* Secondary Editorial Wire (Column 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ded7cb]">
              <span className="font-mono text-xs font-bold uppercase text-[#1c1917]">
                LIVE WIRE HEADLINES
              </span>
              <span className="text-xs text-[#78716c]">Direct Dispatches</span>
            </div>

            {news.slice(1, 6).map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="ald-card p-5 rounded-2xl block group bg-white border border-[#ded7cb] hover:border-[#1c1917] transition-all hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px] text-[#78716c] font-mono mb-1.5">
                  <span className="font-bold text-[#1c1917]">{item.source}</span>
                  <span>{item.pubDate}</span>
                </div>

                <h3 className="font-editorial text-base font-bold text-[#1c1917] group-hover:underline leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#78716c] mt-1.5 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center justify-end text-[11px] font-semibold text-[#1c1917] gap-1">
                  <span>View Story</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Physics Laboratory & Technical Umpiring Guidelines */}
      <div className="ald-card p-6 md:p-8 rounded-3xl bg-white border border-[#ded7cb]">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ded7cb]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#1c1917]" />
            <h2 className="font-editorial text-2xl font-bold text-[#1c1917]">
              Technical Physics & Umpiring Regulations
            </h2>
          </div>
          <span className="text-xs text-[#78716c] font-mono">ICC Rulebook Laws</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRACTICAL_CRICKET_RULES.map((r) => (
            <div key={r.id} className="p-5 rounded-2xl bg-[#f7f5f0] border border-[#ded7cb] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#78716c] uppercase tracking-wider block mb-1">
                  {r.topic}
                </span>
                <h3 className="font-editorial text-base font-bold text-[#1c1917] mb-2">
                  {r.title}
                </h3>
                <p className="text-xs text-[#44403c] leading-relaxed mb-4">
                  {r.summary}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#ded7cb] text-[11px] text-[#1c1917] leading-snug flex items-start gap-2 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[#1c1917] shrink-0 mt-0.5" />
                <span>{r.practicalInsight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
