export interface ShotZone {
  id: string;
  name: string;
  angle: number; // in degrees from top (0 = straight drive, 90 = cover/point, 180 = fine leg, 270 = pull/hook)
  runs: number;
  percentage: number;
  favouriteShot: string;
  boundaries: { fours: number; sixes: number };
}

export interface InningsHighlight {
  id: string;
  match: string;
  tournament: string;
  format: 'T20' | 'ODI' | 'Test Championship' | 'Sunday League';
  date: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  wickets?: number;
  overs?: string;
  economy?: number;
  narrative: string;
  clutchMoment: string;
  playerOfMatch: boolean;
}

export interface SoundSample {
  id: string;
  label: string;
  description: string;
  icon: string;
  type: 'willow' | 'crowd' | 'appeal' | 'cheer' | 'ovation';
}

export const SANJITH_PROFILE = {
  fullName: "Sanjith 'The Maestro' R.",
  jerseyNumber: 18,
  role: "Premier All-Rounder (Right-Hand Bat / Right-Arm Medium Pace)",
  batStyle: "English Willow Grade 1 • Pure Middle",
  motto: "Play with straight bat, strike with ruthless timing.",
  stats: {
    matches: 78,
    runs: 3450,
    highestScore: "134*",
    battingAverage: 54.8,
    strikeRate: 152.4,
    centuries: 6,
    fifties: 22,
    wickets: 89,
    bestBowling: "5/19",
    catches: 42,
    clutchChasesWon: 19
  }
};

export const WAGON_WHEEL_DATA: ShotZone[] = [
  { id: 'cover-drive', name: 'Extra Cover & Cover Drive', angle: 45, runs: 1040, percentage: 30, favouriteShot: 'Classic High-Elbow Cover Drive', boundaries: { fours: 92, sixes: 18 } },
  { id: 'straight-drive', name: 'Straight & Long-On', angle: 0, runs: 720, percentage: 21, favouriteShot: 'Punchy Lofted Straight Drive', boundaries: { fours: 58, sixes: 24 } },
  { id: 'mid-wicket', name: 'Mid-Wicket & Cow Corner', angle: 315, runs: 860, percentage: 25, favouriteShot: 'Wristy Flick & Pick-up Pull', boundaries: { fours: 64, sixes: 36 } },
  { id: 'square-cut', name: 'Point & Backward Point', angle: 90, runs: 380, percentage: 11, favouriteShot: 'Late Cut & Leaping Square Cut', boundaries: { fours: 44, sixes: 4 } },
  { id: 'fine-leg', name: 'Fine Leg & Sweep', angle: 225, runs: 280, percentage: 8, favouriteShot: 'Paddle Sweep & Ramp Shot', boundaries: { fours: 30, sixes: 6 } },
  { id: 'third-man', name: 'Third Man Glide', angle: 135, runs: 170, percentage: 5, favouriteShot: 'Soft-Hands Dab Behind Slip', boundaries: { fours: 18, sixes: 0 } },
];

export const ICONIC_INNINGS: InningsHighlight[] = [
  {
    id: 'bday-special',
    match: "Grand Birthday Championship Final",
    tournament: "Premier Invitational Trophy",
    format: "T20",
    date: "November 2026",
    runs: 108,
    balls: 49,
    fours: 11,
    sixes: 7,
    strikeRate: 220.4,
    wickets: 3,
    overs: "4.0-0-21-3",
    narrative: "Walked out at 34/3 in a high-pressure 200+ chase. Unfurled breathtaking lofted drives against pace and tore through spin with surgical sweep shots. Finished the game with a 98-meter six over long-off.",
    clutchMoment: "Needed 14 off the last 4 balls: dispatched two consecutive sixes to seal an immortal triumph.",
    playerOfMatch: true
  },
  {
    id: 'derby-clutch',
    match: "The Derby Classic: Rivals vs Titans",
    tournament: "Annual Inter-Club Cup",
    format: "ODI",
    date: "Summer 2026",
    runs: 94,
    balls: 78,
    fours: 8,
    sixes: 3,
    strikeRate: 120.5,
    wickets: 2,
    overs: "8.0-1-38-2",
    narrative: "Anchored an otherwise crumbling top order under menacing seam movement. Played with impeccable soft hands, converting ones into twos, before unleashing thunderous pulls at the death.",
    clutchMoment: "Held off 3 yorkers in the 48th over while batting with cramps, scoring 18 vital runs.",
    playerOfMatch: true
  },
  {
    id: 'miracle-test',
    match: "4th Innings Miracle Chase",
    tournament: "Red-Ball Championship",
    format: "Sunday League",
    date: "Autumn 2025",
    runs: 76,
    balls: 62,
    fours: 9,
    sixes: 2,
    strikeRate: 122.5,
    wickets: 4,
    overs: "10.0-2-31-4",
    narrative: "Took four key middle-order wickets with reverse swing before striding out to chase a daunting target on day 4 pitch conditions. Pure masterclass of courage and temperament.",
    clutchMoment: "Punched the opening fast bowler through point for consecutive boundaries to break the bowler's spirit.",
    playerOfMatch: true
  }
];

export const PAVILION_SOUNDS: SoundSample[] = [
  { id: 'sweet-spot', label: 'Sweet Willow Crisp Sound', description: 'English willow meeting leather in the dead center of the bat.', icon: 'Bat', type: 'willow' },
  { id: 'stump-clatter', label: 'Stumps Rattled (Timber!)', description: 'Pace yorker hitting base of middle stump.', icon: 'Sparkles', type: 'appeal' },
  { id: 'crowd-applause', label: 'Pavilion Standing Ovation', description: 'Gentlemen cheering and clapping for a historic century.', icon: 'Trophy', type: 'ovation' },
  { id: 'howzat', label: 'Roaring "HOWZAT!" Appeal', description: 'Whole slip cordon in unison asking for LBW.', icon: 'Volume2', type: 'appeal' },
  { id: 'boundary-cheer', label: 'Six Over Long-Off Roar', description: 'Stadium erupts as the ball sails into the upper tier.', icon: 'Flame', type: 'cheer' },
];
