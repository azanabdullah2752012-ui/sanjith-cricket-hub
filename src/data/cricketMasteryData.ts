export interface CricketRuleItem {
  id: string;
  topic: string;
  title: string;
  summary: string;
  practicalInsight: string;
}

export interface FieldingPosition {
  id: string;
  name: string;
  zone: 'Off Side' | 'Leg Side' | 'Behind Stumps';
  purpose: string;
  coordinates: { x: number; y: number }; // Percentage 0-100 on field oval
}

export const FIELDING_POSITIONS: FieldingPosition[] = [
  { id: 'slips', name: 'First & Second Slip', zone: 'Off Side', purpose: 'Catch outside edges off seam and outswingers.', coordinates: { x: 55, y: 35 } },
  { id: 'gully', name: 'Gully', zone: 'Off Side', purpose: 'Catch squarer flying edges and sliced cuts.', coordinates: { x: 64, y: 40 } },
  { id: 'point', name: 'Point', zone: 'Off Side', purpose: 'Stop square cuts and backward point dabs; athletic diving spot.', coordinates: { x: 74, y: 50 } },
  { id: 'cover', name: 'Cover / Extra Cover', zone: 'Off Side', purpose: 'Stop classical cover drives and punches off the front foot.', coordinates: { x: 65, y: 65 } },
  { id: 'mid-off', name: 'Mid-Off', zone: 'Off Side', purpose: 'Protect the straight drive down the ground off-side.', coordinates: { x: 55, y: 76 } },
  { id: 'mid-on', name: 'Mid-On', zone: 'Leg Side', purpose: 'Protect the on-drive and prevent easy singles to long-on.', coordinates: { x: 45, y: 76 } },
  { id: 'mid-wicket', name: 'Mid-Wicket / Cow Corner', zone: 'Leg Side', purpose: 'Boundary patrol for pulls, sweeps, and leg glances.', coordinates: { x: 30, y: 65 } },
  { id: 'square-leg', name: 'Square Leg', zone: 'Leg Side', purpose: 'Catch top-edge hooks and miscued pull shots.', coordinates: { x: 26, y: 50 } },
  { id: 'fine-leg', name: 'Fine Leg', zone: 'Leg Side', purpose: 'Deep boundary rope cover for deflections off the pads.', coordinates: { x: 38, y: 32 } },
  { id: 'keeper', name: 'Wicket-Keeper', zone: 'Behind Stumps', purpose: 'Anchor behind the stumps for catches, stumpings, and run-outs.', coordinates: { x: 50, y: 32 } }
];

export const PRACTICAL_CRICKET_RULES: CricketRuleItem[] = [
  {
    id: 'drs',
    topic: 'DRS & BALL TRACKING',
    title: 'The 3 Invariable Checks of LBW',
    summary: 'Pitching (must be outside off or in-line; pitching outside leg is instant NOT OUT), Impact (must be in-line with stumps unless no shot offered), Wickets (must hit the stumps).',
    practicalInsight: "Umpire's Call applies if less than 50% of the ball hits the zone, keeping the on-field umpire's original decision intact."
  },
  {
    id: 'dew',
    topic: 'WEATHER & CONDITIONAL PHYSICS',
    title: 'How Dew & Overhead Cloud Affect Swing',
    summary: 'Cloud cover preserves air humidity and atmospheric micro-turbulence, prolonging the shine and seam roughness differential for pronounced conventional swing.',
    practicalInsight: 'Night dew slicks the leather ball, neutralising finger-spin and making seam grip slippery for fast bowlers in the 2nd innings.'
  },
  {
    id: 'reverse-swing',
    topic: 'BALL AERODYNAMICS',
    title: 'The Science of Reverse Swing',
    summary: 'When a ball is scuffed up to 40+ overs, keeping one side mirror-polished with sweat while the other side is rough causes turbulent boundary layer separation on the rough side earlier, reversing the lateral air pressure towards the smooth side.',
    practicalInsight: 'Bowlers must deliver at 138+ km/h for reverse swing fluid dynamics to activate before the ball reaches the batsman.'
  }
];
