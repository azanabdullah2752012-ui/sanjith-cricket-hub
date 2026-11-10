export interface LiveBallEvent {
  overBall: string;
  bowler: string;
  batsman: string;
  speed: string;
  eventText: string;
  runs: number;
  isWicket: boolean;
  fieldShiftDescription: string;
  // Ball 2D pitch trajectory animation: release -> pitch landing -> bat contact -> field arrival
  ballTrajectory: {
    release: { x: number; y: number };
    pitchBounce: { x: number; y: number };
    batContact: { x: number; y: number };
    finalRest: { x: number; y: number };
  };
  // Field position shifts for this delivery
  playerShifts: { [playerId: string]: { x: number; y: number; positionName: string } };
}

export const MATCH_LIVE_SIMULATION_FEED: LiveBallEvent[] = [
  {
    overBall: '27.2',
    bowler: 'Saqib Khan',
    batsman: 'Dhananjaya de Silva',
    speed: '143 KM/H',
    eventText: 'Good length 143k delivery shaping outside off stump. Dhananjaya leaves comfortably through to keeper Rizwan.',
    runs: 0,
    isWicket: false,
    fieldShiftDescription: 'Shan Masood tightens 2nd slip 2 steps finer; Salman shifts deeper at gully.',
    ballTrajectory: {
      release: { x: 50, y: 26 },
      pitchBounce: { x: 52, y: 55 },
      batContact: { x: 53, y: 70 },
      finalRest: { x: 50, y: 82 } // Rizwan gloves it behind stumps
    },
    playerShifts: {
      'shan': { x: 63, y: 79, positionName: 'Second Slip (Finer)' },
      'salman': { x: 72, y: 70, positionName: 'Gully (Deep)' },
      'saim': { x: 79, y: 65, positionName: 'Backward Point' }
    }
  },
  {
    overBall: '27.3',
    bowler: 'Saqib Khan',
    batsman: 'Dhananjaya de Silva',
    speed: '141 KM/H',
    eventText: 'CRACKING COVER DRIVE! Full outside off, Dhananjaya leans in with immaculate high elbows, piercing the gap for 4 runs.',
    runs: 4,
    isWicket: false,
    fieldShiftDescription: 'Saud Shakeel runs to retrieve at deep cover boundary; Babar pushes extra cover deeper.',
    ballTrajectory: {
      release: { x: 50, y: 26 },
      pitchBounce: { x: 54, y: 62 },
      batContact: { x: 52, y: 70 },
      finalRest: { x: 88, y: 48 } // Boundary rope at deep extra cover!
    },
    playerShifts: {
      'saud': { x: 84, y: 50, positionName: 'Deep Cover Boundary' },
      'saim': { x: 74, y: 60, positionName: 'Cover Ring' }
    }
  },
  {
    overBall: '27.4',
    bowler: 'Saqib Khan',
    batsman: 'Dhananjaya de Silva',
    speed: '146 KM/H',
    eventText: 'FIERCE BOUNCER! Saqib bends his back, whistled past the grille at 146k. Dhananjaya ducks underneath safely.',
    runs: 0,
    isWicket: false,
    fieldShiftDescription: 'Tactical short-ball trap! Naseem steps back to fine leg rope; Salman moves to leg gully catcher.',
    ballTrajectory: {
      release: { x: 50, y: 26 },
      pitchBounce: { x: 49, y: 45 },
      batContact: { x: 48, y: 69 },
      finalRest: { x: 49, y: 83 } // High over stumps into Rizwan's chest
    },
    playerShifts: {
      'naseem': { x: 22, y: 88, positionName: 'Deep Fine Leg Rope' },
      'salman': { x: 38, y: 78, positionName: 'Leg Gully Catching' },
      'shaheen': { x: 35, y: 45, positionName: 'Short Mid-Wicket' }
    }
  },
  {
    overBall: '27.5',
    bowler: 'Saqib Khan',
    batsman: 'Dhananjaya de Silva',
    speed: '144 KM/H',
    eventText: 'INSWINGING YORKER! Dug out with soft hands towards mid-on. Quick single taken, Kamindu Mendis on strike.',
    runs: 1,
    isWicket: false,
    fieldShiftDescription: 'Strike rotation! Field flips for left-handed Kamindu Mendis.',
    ballTrajectory: {
      release: { x: 50, y: 26 },
      pitchBounce: { x: 49, y: 68 },
      batContact: { x: 49, y: 70 },
      finalRest: { x: 38, y: 48 } // Tapped towards Shaheen at mid-on
    },
    playerShifts: {
      'dhananjaya': { x: 50, y: 30, positionName: 'Non-Striker Crease' },
      'kamindu': { x: 50, y: 70, positionName: 'Striker Crease (Left-Hand Bat)' },
      'babar': { x: 45, y: 80, positionName: 'First Slip (LHB side)' },
      'shan': { x: 39, y: 79, positionName: 'Second Slip (LHB side)' },
      'saud': { x: 26, y: 55, positionName: 'Extra Cover (LHB)' },
      'shaheen': { x: 62, y: 38, positionName: 'Mid-Off' }
    }
  },
  {
    overBall: '27.6',
    bowler: 'Saqib Khan',
    batsman: 'Kamindu Mendis',
    speed: '139 KM/H',
    eventText: 'Over-pitched outside off, Kamindu punches solidly off backfoot to point. Dot ball to finish a pulsating over.',
    runs: 0,
    isWicket: false,
    fieldShiftDescription: 'Over complete! Fielders cross over for the next over change.',
    ballTrajectory: {
      release: { x: 50, y: 26 },
      pitchBounce: { x: 53, y: 58 },
      batContact: { x: 51, y: 70 },
      finalRest: { x: 24, y: 68 } // Cut straight to Saim at point
    },
    playerShifts: {
      'saim': { x: 22, y: 68, positionName: 'Point Ring' },
      'naseem': { x: 28, y: 82, positionName: 'Fine Leg' }
    }
  }
];
