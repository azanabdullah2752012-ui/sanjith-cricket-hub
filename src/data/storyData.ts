export interface StoryChapter {
  id: string;
  chapterNumber: string;
  actTitle: string;
  headline: string;
  subhead: string;
  commentary: string;
  contextTag: string;
  statsHighlight: { label: string; value: string; detail: string }[];
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'walkout',
    chapterNumber: 'ACT 01',
    actTitle: 'THE TUNNEL WALKOUT',
    headline: 'Under the 80,000 Lux Floodlights',
    subhead: 'The dressing room gate creaks open. Spikes echo on concrete. The roar of the arena swallows the night.',
    commentary: 'Scoreboard reads 38/3. Required rate: 11.2 an over. Silence falls over the away dugout. Number 18 adjusts his grip, taps the blade twice against the turf, and stares straight down the pitch.',
    contextTag: 'MATCH SITUATION: HIGH STAKES FINAL',
    statsHighlight: [
      { label: 'CAREER RUNS', value: '3,450', detail: 'High pressure avg 54.8' },
      { label: 'STRIKE RATE', value: '152.4', detail: 'Death overs 210.8' },
      { label: 'MATCH STATUS', value: 'CHASE ON', detail: 'Target: 218 in 20 ov' }
    ]
  },
  {
    id: 'tempo',
    chapterNumber: 'ACT 02',
    actTitle: 'SURGICAL DISSECTION',
    headline: 'Splitting The Off-Side With Razor Precision',
    subhead: 'No wild swings. Just high elbows, head over ball, and the unmistakable sound of sweet willow.',
    commentary: '145 km/h out-swinger. Leans in with pure balance. The cover fielder does not even flinch as the ball kisses the boundary rope before the bowler turns around.',
    contextTag: 'SHOT PROFILE: SIGNATURE COVER DRIVE',
    statsHighlight: [
      { label: 'COVER RUNS', value: '1,040', detail: '30% of career runs' },
      { label: 'TIMING SPEED', value: '0.38s', detail: 'Reaction window' },
      { label: 'BALL DISPATCH', value: '142 KM/H', detail: 'Exit velocity off face' }
    ]
  },
  {
    id: 'carnage',
    chapterNumber: 'ACT 03',
    actTitle: 'THE CARNAGE AT THE DEATH',
    headline: 'Two Balls. Ten Needed. The Staggering Maximum.',
    subhead: 'The bowler goes for the yorker. Sanjith gets underneath with supersonic wrists.',
    commentary: 'The ball arcs 98 meters into the night sky, disappearing into the top tier of the grandstand. Stunned silence transforms into bedlam. One ball left. History beckons.',
    contextTag: 'CLUTCH SITUATION: 19 CHASES WON',
    statsHighlight: [
      { label: 'SIX DISTANCE', value: '98 METERS', detail: 'Upper deck long-off' },
      { label: 'PRESSURE SR', value: '245.0', detail: 'Overs 16-20' },
      { label: 'CENTURIES', value: '06', detail: 'All in run-chases' }
    ]
  },
  {
    id: 'century',
    chapterNumber: 'ACT 04',
    actTitle: 'THE HELMET RAISES',
    headline: 'A Century In The Game of Life',
    subhead: 'Helmet off. Arms spread wide. A tribute to the dedication, the friendship, and the relentless craft.',
    commentary: 'Cricket is more than 22 yards. It is the camaraderie under the sun, the laughs in the dressing room, and celebrating a brother who always stands tall when the game is on the line. Happy Birthday, Sanjith!',
    contextTag: 'BIRTHDAY TRIBUTE • 2026',
    statsHighlight: [
      { label: 'WRECKING BALL', value: '89 WKTS', detail: 'Best spell 5/19' },
      { label: 'PARTNERSHIP', value: 'BROTHERHOOD', detail: 'Unbroken loyalty' },
      { label: 'LIFE SCORE', value: '100* N.O.', detail: 'Century of respect' }
    ]
  }
];
