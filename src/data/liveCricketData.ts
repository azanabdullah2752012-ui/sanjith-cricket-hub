export interface LiveMatch {
  id: string;
  title: string;
  teamA: string;
  scoreA: string;
  teamB: string;
  scoreB: string;
  status: string;
  isLive: boolean;
  link: string;
}

export interface CricketNewsItem {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  link: string;
  image?: string;
  source: string;
}

// Fallback high-fidelity live match snapshot in case client network is offline
export const FALLBACK_LIVE_MATCHES: LiveMatch[] = [
  {
    id: 'm1',
    title: 'Bangladesh vs West Indies',
    teamA: 'Bangladesh',
    scoreA: '386/10',
    teamB: 'West Indies',
    scoreB: '356 & 112/1*',
    status: 'Day 4: West Indies lead by 82 runs',
    isLive: true,
    link: 'https://www.espncricinfo.com'
  },
  {
    id: 'm2',
    title: 'Afghanistan vs Zimbabwe',
    teamA: 'Afghanistan',
    scoreA: '402/7*',
    teamB: 'Zimbabwe',
    scoreB: '504/10',
    status: 'Day 3: Afghanistan trail by 102 runs',
    isLive: true,
    link: 'https://www.espncricinfo.com'
  },
  {
    id: 'm3',
    title: 'India A vs New Zealand A',
    teamA: 'India A',
    scoreA: '464/5 d',
    teamB: 'New Zealand A',
    scoreB: '26/2*',
    status: 'New Zealand A trail by 438 runs',
    isLive: true,
    link: 'https://www.espncricinfo.com'
  },
  {
    id: 'm4',
    title: 'Sydney Sixers Women vs Sydney Thunder Women',
    teamA: 'Sixers W',
    scoreA: '162/2 (20 ov)',
    teamB: 'Thunder W',
    scoreB: '86/4 (12.4 ov)*',
    status: 'Thunder need 77 runs in 44 balls',
    isLive: true,
    link: 'https://www.espncricinfo.com'
  }
];

export const FALLBACK_NEWS: CricketNewsItem[] = [
  {
    id: 'n1',
    title: "Warner backs Khawaja over explosive ball-tampering claims",
    description: "Former vice-captain breaks his eight-year silence and claims Cricket Australia investigation was botched.",
    pubDate: "Just now",
    link: "https://www.theguardian.com/sport/cricket",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80",
    source: "The Guardian"
  },
  {
    id: 'n2',
    title: "Suryakumar ready to bounce back from difficult phase",
    description: "Looking to play with the same love and passion that started his dream of representing Mumbai as a teenager.",
    pubDate: "1 hour ago",
    link: "https://www.espncricinfo.com",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    source: "ESPNcricinfo"
  },
  {
    id: 'n3',
    title: "Shakeel, Saqib hand Pakistan the advantage in opening Test",
    description: "Sensational partnership turns match dynamics with disciplined application against spin.",
    pubDate: "3 hours ago",
    link: "https://www.espncricinfo.com",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80",
    source: "ESPNcricinfo"
  }
];
