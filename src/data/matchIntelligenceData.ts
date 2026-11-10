export interface MatchPlayer {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicketkeeper';
  battingHand: 'Right-hand bat' | 'Left-hand bat';
  bowlingStyle?: string;
  currentMatchStats: {
    runs?: number;
    balls?: number;
    fours?: number;
    sixes?: number;
    isBattingNow?: boolean;
    dismissal?: string;
    overs?: string;
    maidens?: number;
    wickets?: number;
    runsConceded?: number;
    isBowlingNow?: boolean;
  };
  fieldingPositionCurrent: string; // The specific position on field right now
  fieldCoordinates: { x: number; y: number }; // Position on the 360 field oval
  profileBio: string;
  signatureWeapon: string;
}

export interface DetailedMatch {
  id: string;
  series: string;
  format: 'TEST' | 'ODI' | 'T20';
  matchTitle: string;
  venue: string;
  pitchReport: string;
  daySessionStatus: string;
  isLive: boolean;
  teamA: {
    name: string;
    shortName: string;
    flag: string;
    score: string;
    overs?: string;
    isBatting: boolean;
  };
  teamB: {
    name: string;
    shortName: string;
    flag: string;
    score: string;
    overs?: string;
    isBatting: boolean;
  };
  matchSituation: string;
  requiredEquation?: string;
  activeTacticalTrap: string;
  playersOnField: MatchPlayer[]; // Active XI players on field with live field placements
}

export const REAL_DETAILED_MATCHES: DetailedMatch[] = [
  {
    id: 'pak-sl-test',
    series: 'Sri Lanka in Pakistan Test Series 2026/27',
    format: 'TEST',
    matchTitle: 'Pakistan vs Sri Lanka • 1st Test',
    venue: 'Rawalpindi Cricket Stadium, Rawalpindi',
    pitchReport: 'Day 2 pitch. Hard surface offering good carry early on, with subtle reverse-swing emerging in 28th over.',
    daySessionStatus: 'Day 2 • Session 3 • Stumps Approaching',
    isLive: true,
    teamA: {
      name: 'Pakistan',
      shortName: 'PAK',
      flag: '🇵🇰',
      score: '328/10',
      overs: '94.2 ov',
      isBatting: false
    },
    teamB: {
      name: 'Sri Lanka',
      shortName: 'SL',
      flag: '🇱🇰',
      score: '114/3',
      overs: '27.1 ov',
      isBatting: true
    },
    matchSituation: 'Sri Lanka trail by 214 runs with 7 wickets remaining in 1st innings.',
    activeTacticalTrap: 'Babar & Shan Masood have set an aggressive 4th-stump cordon trap (3 slips + gully + catching cover) with Saqib Khan bowling reverse swing.',
    playersOnField: [
      {
        id: 'dhananjaya',
        name: 'Dhananjaya de Silva',
        role: 'Batsman',
        battingHand: 'Right-hand bat',
        bowlingStyle: 'Right-arm offbreak',
        currentMatchStats: { runs: 22, balls: 48, fours: 3, sixes: 0, isBattingNow: true },
        fieldingPositionCurrent: 'Striker Batting Crease',
        fieldCoordinates: { x: 50, y: 70 },
        profileBio: 'Sri Lanka Test Captain. Elegant stroke-maker known for wristy placement and resolute defense against pace.',
        signatureWeapon: 'Wristy on-drive and counter-punch off the back foot.'
      },
      {
        id: 'kamindu',
        name: 'Kamindu Mendis',
        role: 'All-Rounder',
        battingHand: 'Left-hand bat',
        bowlingStyle: 'Ambidextrous (Offbreak & Slow Left-Arm)',
        currentMatchStats: { runs: 40, balls: 62, fours: 5, sixes: 1, isBattingNow: true },
        fieldingPositionCurrent: 'Non-Striker Crease',
        fieldCoordinates: { x: 50, y: 30 },
        profileBio: 'Record-shattering Test prodigy. Can bowl both right-arm off-spin and left-arm orthodox with equal mastery.',
        signatureWeapon: 'Crisp square cut and ambidextrous bowling variety.'
      },
      {
        id: 'saqib',
        name: 'Saqib Khan',
        role: 'Bowler',
        battingHand: 'Right-hand bat',
        bowlingStyle: 'Right-arm fast medium (142 km/h)',
        currentMatchStats: { overs: '7.1', maidens: 1, runsConceded: 54, wickets: 2, isBowlingNow: true },
        fieldingPositionCurrent: 'Bowling Crease / Follow-Through',
        fieldCoordinates: { x: 50, y: 24 },
        profileBio: 'Express tearaway pacer generating late inward tail and wicked bounce from back of a length.',
        signatureWeapon: '144k reverse-swinging yorker targeting front toe.'
      },
      {
        id: 'rizwan',
        name: 'Mohammad Rizwan',
        role: 'Wicketkeeper',
        battingHand: 'Right-hand bat',
        currentMatchStats: { runs: 68, balls: 94, fours: 7, sixes: 1 },
        fieldingPositionCurrent: 'Wicket-Keeper (Standing Back 18m)',
        fieldCoordinates: { x: 50, y: 82 },
        profileBio: 'Hyper-athletic wicketkeeper with explosive leg-side diving reach and rapid batting strike-rate.',
        signatureWeapon: 'Lightning one-handed diving take in front of first slip.'
      },
      {
        id: 'babar',
        name: 'Babar Azam',
        role: 'Batsman',
        battingHand: 'Right-hand bat',
        currentMatchStats: { runs: 74, balls: 112, fours: 9, sixes: 0 },
        fieldingPositionCurrent: 'First Slip',
        fieldCoordinates: { x: 55, y: 80 },
        profileBio: 'Former World #1 batsman and specialist slip catcher with velcro hands for edges off pace.',
        signatureWeapon: 'Rock-steady low stance and soft-hands edge snare.'
      },
      {
        id: 'shan',
        name: 'Shan Masood',
        role: 'Batsman',
        battingHand: 'Left-hand bat',
        currentMatchStats: { runs: 58, balls: 84, fours: 6, sixes: 0 },
        fieldingPositionCurrent: 'Second Slip',
        fieldCoordinates: { x: 61, y: 79 },
        profileBio: 'Pakistan Test Captain. Master tactician who leads by setting aggressive catching cordons.',
        signatureWeapon: 'Anticipatory reading of batsman trigger movement.'
      },
      {
        id: 'salman',
        name: 'Agha Salman',
        role: 'All-Rounder',
        battingHand: 'Right-hand bat',
        bowlingStyle: 'Right-arm offbreak',
        currentMatchStats: { runs: 45, overs: '4.0', wickets: 1, runsConceded: 18 },
        fieldingPositionCurrent: 'Gully',
        fieldCoordinates: { x: 70, y: 72 },
        profileBio: 'Clutch all-rounder stationed at gully to intercept sliced aerial cuts and steep edges.',
        signatureWeapon: 'Leaping one-handed catches at shoulder height.'
      },
      {
        id: 'naseem',
        name: 'Naseem Shah',
        role: 'Bowler',
        battingHand: 'Right-hand bat',
        bowlingStyle: 'Right-arm fast',
        currentMatchStats: { overs: '8.0', maidens: 2, runsConceded: 24, wickets: 0 },
        fieldingPositionCurrent: 'Deep Fine Leg',
        fieldCoordinates: { x: 26, y: 84 },
        profileBio: 'Young pace phenomenon with classical wrist position capable of moving the ball both ways.',
        signatureWeapon: 'Bullet throw from the boundary rope.'
      },
      {
        id: 'shaheen',
        name: 'Shaheen Shah Afridi',
        role: 'Bowler',
        battingHand: 'Left-hand bat',
        bowlingStyle: 'Left-arm fast',
        currentMatchStats: { overs: '8.0', maidens: 1, runsConceded: 32, wickets: 1 },
        fieldingPositionCurrent: 'Mid-On',
        fieldCoordinates: { x: 38, y: 38 },
        profileBio: 'Left-arm spearhead with 6ft 6in frame generating awkward high release angles.',
        signatureWeapon: 'Deadly opening over inswingers to right-handers.'
      },
      {
        id: 'saud',
        name: 'Saud Shakeel',
        role: 'Batsman',
        battingHand: 'Left-hand bat',
        currentMatchStats: { runs: 52, balls: 98, fours: 4, sixes: 0 },
        fieldingPositionCurrent: 'Extra Cover',
        fieldCoordinates: { x: 74, y: 55 },
        profileBio: 'Test specialist renowned for high batting average and energetic ring fielding.',
        signatureWeapon: 'Direct-hit run-outs from the 30-yard ring.'
      },
      {
        id: 'saim',
        name: 'Saim Ayub',
        role: 'Batsman',
        battingHand: 'Left-hand bat',
        currentMatchStats: { runs: 24, balls: 31, fours: 3, sixes: 1 },
        fieldingPositionCurrent: 'Backward Point',
        fieldCoordinates: { x: 78, y: 68 },
        profileBio: 'Modern athletic fielder who cuts off boundaries with acrobatic slides and quick releases.',
        signatureWeapon: 'Fierce pickup and flat return.'
      }
    ]
  },
  {
    id: 'ind-nz-tour',
    series: 'India A tour of New Zealand 2026',
    format: 'TEST',
    matchTitle: 'India A vs New Zealand A • 4-Day Match',
    venue: 'Seddon Park, Hamilton',
    pitchReport: 'Seaming surface with heavy moisture in morning air. India A piled on 464 runs before declaring.',
    daySessionStatus: 'Day 2 • Stumps',
    isLive: true,
    teamA: {
      name: 'India A',
      shortName: 'IND A',
      flag: '🇮🇳',
      score: '464/5 d',
      overs: '112.0 ov',
      isBatting: false
    },
    teamB: {
      name: 'New Zealand A',
      shortName: 'NZ A',
      flag: '🇳🇿',
      score: '26/2',
      overs: '9.4 ov',
      isBatting: true
    },
    matchSituation: 'New Zealand A trail by 438 runs with 8 wickets remaining.',
    activeTacticalTrap: 'Full slip cordon (3 slips + gully + leg slip) hunting edges under overcast Hamilton sky.',
    playersOnField: [
      {
        id: 'sarfaraz',
        name: 'Sarfaraz Khan',
        role: 'Batsman',
        battingHand: 'Right-hand bat',
        currentMatchStats: { runs: 142, balls: 168, fours: 18, sixes: 2 },
        fieldingPositionCurrent: 'First Slip',
        fieldCoordinates: { x: 56, y: 80 },
        profileBio: 'Domestic run machine who converts starts into mammoth centuries with sweep and upper-cut mastery.',
        signatureWeapon: 'Paddle sweep and aggressive batting tempo.'
      },
      {
        id: 'abhimanyu',
        name: 'Abhimanyu Easwaran',
        role: 'Batsman',
        battingHand: 'Right-hand bat',
        currentMatchStats: { runs: 118, balls: 210, fours: 14, sixes: 0 },
        fieldingPositionCurrent: 'Cover Point',
        fieldCoordinates: { x: 75, y: 62 },
        profileBio: 'Rock-solid opening batsman with classical technique and high temperament.',
        signatureWeapon: 'Compact front-foot defense.'
      },
      {
        id: 'mukesh',
        name: 'Mukesh Kumar',
        role: 'Bowler',
        battingHand: 'Right-hand bat',
        bowlingStyle: 'Right-arm medium fast',
        currentMatchStats: { overs: '5.0', maidens: 2, runsConceded: 12, wickets: 2, isBowlingNow: true },
        fieldingPositionCurrent: 'Bowling Crease',
        fieldCoordinates: { x: 50, y: 24 },
        profileBio: 'Seam bowling craftsman who hits the seam constantly at 135 km/h.',
        signatureWeapon: 'Nip-backer that hits the top of off stump.'
      },
      {
        id: 'jurel',
        name: 'Dhruv Jurel',
        role: 'Wicketkeeper',
        battingHand: 'Right-hand bat',
        currentMatchStats: { runs: 64, balls: 80, fours: 6, sixes: 2 },
        fieldingPositionCurrent: 'Wicket-Keeper',
        fieldCoordinates: { x: 50, y: 82 },
        profileBio: 'Calm and composed wicket-keeper batsman with agile footwork and swift hands.',
        signatureWeapon: 'Crisp drives and sharp catches up to the stumps.'
      }
    ]
  },
  {
    id: 'wbbl-derby',
    series: 'Women Big Bash League 2026',
    format: 'T20',
    matchTitle: 'Sydney Sixers W vs Sydney Thunder W',
    venue: 'Sydney Cricket Ground, Sydney',
    pitchReport: 'True-bouncing SCG deck with short square boundaries and floodlights burning bright.',
    daySessionStatus: 'Innings 2 • 13th Over • Live Chase',
    isLive: true,
    teamA: {
      name: 'Sydney Sixers W',
      shortName: 'SYS W',
      flag: '🌸',
      score: '162/2',
      overs: '20.0 ov',
      isBatting: false
    },
    teamB: {
      name: 'Sydney Thunder W',
      shortName: 'SYT W',
      flag: '⚡',
      score: '86/4',
      overs: '12.4 ov',
      isBatting: true
    },
    matchSituation: 'Sydney Thunder need 77 runs from 44 balls at 10.5 rpo.',
    activeTacticalTrap: 'Defensive ring with deep mid-wicket & long-on back, bowling wide outside off stump.',
    playersOnField: [
      {
        id: 'perry',
        name: 'Ellyse Perry',
        role: 'All-Rounder',
        battingHand: 'Right-hand bat',
        bowlingStyle: 'Right-arm medium',
        currentMatchStats: { runs: 78, balls: 54, fours: 8, sixes: 3, overs: '2.0', wickets: 1, runsConceded: 14 },
        fieldingPositionCurrent: 'Long-On Boundary',
        fieldCoordinates: { x: 40, y: 15 },
        profileBio: 'All-time legend of women’s cricket. Supreme athletic physical conditioning and textbook technique.',
        signatureWeapon: 'Lofted straight drive and clutch death bowling.'
      },
      {
        id: 'healy',
        name: 'Alyssa Healy',
        role: 'Wicketkeeper',
        battingHand: 'Right-hand bat',
        currentMatchStats: { runs: 45, balls: 30, fours: 6, sixes: 1 },
        fieldingPositionCurrent: 'Wicket-Keeper (Standing Up to Stumps)',
        fieldCoordinates: { x: 50, y: 78 },
        profileBio: 'Combative world-champion keeper captain with supersonic stumping reaction speed.',
        signatureWeapon: '0.10 second stumpings off spinners.'
      },
      {
        id: 'ecclestone',
        name: 'Sophie Ecclestone',
        role: 'Bowler',
        battingHand: 'Right-hand bat',
        bowlingStyle: 'Slow Left-Arm Orthodox',
        currentMatchStats: { overs: '3.0', maidens: 0, runsConceded: 16, wickets: 2, isBowlingNow: true },
        fieldingPositionCurrent: 'Bowling Crease',
        fieldCoordinates: { x: 50, y: 24 },
        profileBio: 'World #1 ranked T20 bowler. Imposing height delivers high release bounce and vicious turn.',
        signatureWeapon: 'Drifting arm ball that sneaks through bat-pad gate.'
      }
    ]
  }
];
