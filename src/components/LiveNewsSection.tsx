import React, { useState, useEffect } from 'react';
import { CricketNewsItem } from '../data/liveCricketData';
import { fetchCricketNews } from '../services/cricketFeedService';
import { Newspaper, ExternalLink, Calendar, RefreshCw } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

export const LiveNewsSection: React.FC = () => {
  const [news, setNews] = useState<CricketNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="ald-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#ded7cb] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold flex items-center gap-1.5">
              <Newspaper className="w-3.5 h-3.5 text-[#1c1917]" />
              GLOBAL EDITORIAL WIRE • DISPATCHES
            </span>
          </div>
          <h2 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
            Cricket News & Tactical Analysis
          </h2>
          <p className="text-xs text-[#78716c] mt-0.5">
            Breaking stories, player controversies, tactical reviews, and international squad moves.
          </p>
        </div>

        <button
          onClick={() => {
            pavilionAudio.playWillowCrack();
            loadNews();
          }}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg bg-[#ece7de] hover:bg-[#ded7cb] text-[#1c1917] text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all border border-[#ded7cb]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Fetching...' : 'Update Wire'}</span>
        </button>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between bg-[#f7f5f0] border border-[#ded7cb] rounded-xl overflow-hidden hover:border-[#1c1917] transition-all hover:shadow-md cursor-pointer"
          >
            {/* Image banner */}
            {item.image && (
              <div className="h-44 w-full overflow-hidden bg-[#ece7de] relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-105"
                  onError={(e) => {
                    // Fallback to background color if image load fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-[#1c1917] uppercase tracking-wider">
                  {item.source}
                </div>
              </div>
            )}

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#78716c] font-medium mb-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{item.pubDate}</span>
                </div>
                <h3 className="font-editorial text-base font-bold text-[#1c1917] group-hover:underline leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#78716c] mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#ded7cb] flex items-center justify-between text-xs text-[#1c1917] font-semibold">
                <span>Read Full Dispatch</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
