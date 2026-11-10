import { LiveMatch, CricketNewsItem, FALLBACK_LIVE_MATCHES, FALLBACK_NEWS } from '../data/liveCricketData';

// High-resolution reliable cricket editorial photos
const CURATED_CRICKET_PHOTOS = [
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80", // Cricket stadium match action
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80", // Batsman facing fast bowler
  "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=1200&q=80", // Ball on pitch with seam
  "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1200&q=80", // Stadium floodlight night match
  "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80", // Athlete focus
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"  // Match celebration
];

export async function fetchLiveScores(): Promise<LiveMatch[]> {
  try {
    const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.espncricinfo.com/rss/livescores.xml");
    if (!res.ok) throw new Error("Network error fetching live scores");
    const data = await res.json();
    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      return FALLBACK_LIVE_MATCHES;
    }

    const matches: LiveMatch[] = data.items.map((item: { title: string; link: string; description: string; guid: string }, idx: number) => {
      const rawTitle = item.title.replace(/&amp;/g, '&');
      const parts = rawTitle.split(/\s+v\s+/i);
      let teamA = "Team 1";
      let scoreA = "";
      let teamB = "Team 2";
      let scoreB = "";

      if (parts.length >= 2) {
        const teamAMatch = parts[0].match(/^(.*?)(?:\s+([\d\/&*\s]+))?$/);
        if (teamAMatch) {
          teamA = teamAMatch[1]?.trim() || "Team A";
          scoreA = teamAMatch[2]?.trim() || "-";
        }
        const teamBMatch = parts[1].match(/^(.*?)(?:\s+([\d\/&*\s]+))?$/);
        if (teamBMatch) {
          teamB = teamBMatch[1]?.trim() || "Team B";
          scoreB = teamBMatch[2]?.trim() || "-";
        }
      } else {
        teamA = rawTitle;
      }

      const isLive = rawTitle.includes('*');

      return {
        id: item.guid || `match-${idx}`,
        title: rawTitle,
        teamA,
        scoreA,
        teamB,
        scoreB,
        status: isLive ? 'LIVE • In Progress' : 'Match Concluded / Stumps',
        isLive,
        link: item.link || 'https://www.espncricinfo.com'
      };
    });

    return matches;
  } catch (err) {
    console.warn("Using fallback live scores", err);
    return FALLBACK_LIVE_MATCHES;
  }
}

export async function fetchCricketNews(): Promise<CricketNewsItem[]> {
  try {
    const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.theguardian.com/sport/cricket/rss");
    if (!res.ok) throw new Error("Network error fetching news");
    const data = await res.json();
    if (data.status !== 'ok' || !data.items || data.items.length === 0) {
      return FALLBACK_NEWS;
    }

    return data.items.slice(0, 8).map((item: { title: string; link: string; pubDate: string; description: string }, idx: number) => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.description || '';
      const cleanDesc = tempDiv.textContent || tempDiv.innerText || '';

      // Use dependable, beautiful cricket editorial photography guaranteed to load
      const photoUrl = CURATED_CRICKET_PHOTOS[idx % CURATED_CRICKET_PHOTOS.length];

      return {
        id: `news-${idx}`,
        title: item.title,
        description: cleanDesc.slice(0, 160) + (cleanDesc.length > 160 ? '...' : ''),
        pubDate: item.pubDate ? new Date(item.pubDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently',
        link: item.link,
        image: photoUrl,
        source: 'The Guardian Cricket'
      };
    });
  } catch (err) {
    console.warn("Using fallback news", err);
    return FALLBACK_NEWS;
  }
}
