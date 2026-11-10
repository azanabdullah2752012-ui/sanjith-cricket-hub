import React, { useState, useEffect } from 'react';
import { LiveMatch } from '../data/liveCricketData';
import { fetchLiveScores } from '../services/cricketFeedService';
import { RefreshCw, Radio, ExternalLink, Activity } from 'lucide-react';
import { pavilionAudio } from '../utils/audioEngine';

export const LiveScoresSection: React.FC = () => {
  const [matches, setMatches] = useState<LiveMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadScores = async () => {
    setLoading(true);
    pavilionAudio.playWillowCrack();
    const data = await fetchLiveScores();
    setMatches(data);
    setLoading(false);
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  };

  useEffect(() => {
    loadScores();
    const interval = setInterval(loadScores, 60000); // Auto refresh every 60s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ald-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#ded7cb] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#78716c] font-semibold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-red-600" />
              LIVE MATCH BROADCAST FEED • ESPN CRICINFO
            </span>
          </div>
          <h2 className="font-editorial text-2xl md:text-3xl text-[#1c1917] font-bold tracking-tight">
            International & Tour Live Scores
          </h2>
          <p className="text-xs text-[#78716c] mt-0.5">
            Real-time scorecards, current innings status, and ball-by-ball updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-[11px] text-[#78716c] font-mono">
              Synced: {lastUpdated}
            </span>
          )}
          <button
            onClick={loadScores}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-[#1c1917] hover:bg-[#292524] text-[#f5f2eb] text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh Feed'}</span>
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-xl bg-[#f7f5f0] border border-[#ded7cb] hover:border-[#1c1917] transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ded7cb]">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${m.isLive ? 'bg-red-500 animate-ping' : 'bg-[#78716c]'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${m.isLive ? 'text-red-700' : 'text-[#78716c]'}`}>
                    {m.isLive ? 'LIVE' : 'FINISHED'}
                  </span>
                </div>
                <a
                  href={m.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-[#78716c] hover:text-[#1c1917] flex items-center gap-0.5"
                >
                  <span>Scorecard</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Teams & Scores */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-editorial text-sm font-bold text-[#1c1917] truncate pr-2">
                    {m.teamA}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1c1917]">
                    {m.scoreA || '-'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-editorial text-sm font-bold text-[#1c1917] truncate pr-2">
                    {m.teamB}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#1c1917]">
                    {m.scoreB || '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* Match Status */}
            <div className="mt-4 pt-3 border-t border-[#ded7cb]">
              <div className="text-xs text-[#78716c] leading-snug line-clamp-2">
                {m.status || m.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
