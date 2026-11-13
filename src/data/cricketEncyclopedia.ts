export interface FieldingPositionDetailed {
  id: string;
  name: string;
  category: 'Cordon & Slips' | 'Infield Ring' | 'Outfield Patrol' | 'Wicketkeeper';
  side: 'Off Side' | 'Leg Side' | 'Behind Stumps';
  distanceMeters: string;
  purpose: string;
  idealPlayerProfile: string;
  legendaryMasters: string[];
  tacticalTrigger: string;
  dangerZone: string;
  coordinates: { x: number; y: number };
}

export interface PlayerProfileCard {
  id: string;
  name: string;
  country: string;
  role: 'Batsman' | 'Fast Bowler' | 'Spin Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  image: string;
  signatureStyle: string;
  masteryMetric: { label: string; value: string };
  technicalBreakdown: string;
  tacticalKey: string;
}

export const ALL_FIELDING_POSITIONS: FieldingPositionDetailed[] = [
  {
    id: 'first-slip',
    name: 'First Slip',
    category: 'Cordon & Slips',
    side: 'Off Side',
    distanceMeters: '16 - 22m',
    purpose: 'Stationed next to the wicketkeeper to catch sharp outside edges off outswingers, seaming deliveries, and defensive pushes.',
    idealPlayerProfile: 'Elite soft hands, lightning reaction times, zen-like patience, and height to pluck flying edges.',
    legendaryMasters: ['Rahul Dravid (210 Test Catches)', 'Mark Waugh', 'Stephen Fleming', 'Joe Root'],
    tacticalTrigger: 'Deploys with the new ball or anytime seam/spin movement is active. Crucial against top-order batsmen.',
    dangerZone: 'Edge flies between keeper and slip; requires pre-determined catching protocols.',
    coordinates: { x: 53, y: 28 }
  },
  {
    id: 'second-slip',
    name: 'Second Slip',
    category: 'Cordon & Slips',
    side: 'Off Side',
    distanceMeters: '17 - 23m',
    purpose: 'Catches thicker outside edges when the batsman plays with hard hands away from the body.',
    idealPlayerProfile: 'Agile sideways diving mechanics and rapid vision tracking off the bat shoulder.',
    legendaryMasters: ['Ricky Ponting', 'Jacques Kallis', 'Steve Smith', 'Shane Warne'],
    tacticalTrigger: 'Essential in the first 25 overs of a Test or whenever express pace induces driving errors.',
    dangerZone: 'Low dipping chances that fall inches short of grass.',
    coordinates: { x: 58, y: 29 }
  },
  {
    id: 'gully',
    name: 'Gully',
    category: 'Cordon & Slips',
    side: 'Off Side',
    distanceMeters: '18 - 25m',
    purpose: 'Positioned squarer than slips to intercept sliced drives, aerial cuts, and steep bounce edges off a good length.',
    idealPlayerProfile: 'Acrobatic, fearless, explosive lateral jump with high-flying vertical reach.',
    legendaryMasters: ['Jonty Rhodes', 'Cameron Green', 'Eknath Solkar'],
    tacticalTrigger: 'Lethal on bouncy wickets (WACA, Centurion, Gabba) where back-of-a-length deliveries fly squarer.',
    dangerZone: 'Steep tennis-ball bounce carrying over the fielder’s fingertips.',
    coordinates: { x: 67, y: 34 }
  },
  {
    id: 'point',
    name: 'Backward Point / Point',
    category: 'Infield Ring',
    side: 'Off Side',
    distanceMeters: '22 - 30m',
    purpose: 'The premier defensive ring station. Shuts down square cuts, backward point dabs, and saves 20+ runs every match.',
    idealPlayerProfile: 'The team’s most athletic sprinter, lethal direct-hit throwing arm from any angle.',
    legendaryMasters: ['Jonty Rhodes', 'Ravindra Jadeja', 'Herschelle Gibbs', 'Ricky Ponting'],
    tacticalTrigger: 'Always occupied in white-ball cricket inside the powerplay to starve off-side boundary flow.',
    dangerZone: 'Direct hits at the striker’s end while tumbling sideways.',
    coordinates: { x: 78, y: 48 }
  },
  {
    id: 'cover',
    name: 'Cover / Extra Cover',
    category: 'Infield Ring',
    side: 'Off Side',
    distanceMeters: '25 - 32m',
    purpose: 'Patrols the classic driving arc between point and mid-off. Intercepts high-velocity front-foot drives.',
    idealPlayerProfile: 'Explosive forward charge, ability to pick up on the bounce with one hand and throw flat.',
    legendaryMasters: ['Virat Kohli', 'AB de Villiers', 'Paul Collingwood', 'Kane Williamson'],
    tacticalTrigger: 'Positioned tighter when bowling tight fourth-stump channel to tempt an ambitious drive.',
    dangerZone: 'Aerial punch timed just above the fielder’s leaping reach.',
    coordinates: { x: 72, y: 64 }
  },
  {
    id: 'mid-off',
    name: 'Mid-Off',
    category: 'Infield Ring',
    side: 'Off Side',
    distanceMeters: '25 - 35m',
    purpose: 'Directly guards the straight drive and checks the non-striker backing up.',
    idealPlayerProfile: 'Calm leader (often the captain), sharp straight-line speed, and laser-accurate throws to bowler.',
    legendaryMasters: ['Pat Cummins', 'Imran Khan', 'Clive Lloyd', 'Ben Stokes'],
    tacticalTrigger: 'Brought closer to induce an attempted lofted shot over the infield.',
    dangerZone: 'Back-drive struck with maximum power straight back past bowler.',
    coordinates: { x: 58, y: 82 }
  },
  {
    id: 'mid-on',
    name: 'Mid-On',
    category: 'Infield Ring',
    side: 'Leg Side',
    distanceMeters: '25 - 35m',
    purpose: 'Parallels mid-off on the leg side. Prevents easy singles off straight and on-drives.',
    idealPlayerProfile: 'Sturdy, excellent catching hands, alert to mishit pulls that drop short.',
    legendaryMasters: ['MS Dhoni (when bowling shifts)', 'Wasim Akram', 'Andrew Symonds'],
    tacticalTrigger: 'Vital when bowling yorkers and straight full balls in death overs.',
    dangerZone: 'Batsman chipping the ball high back over the bowler’s head.',
    coordinates: { x: 42, y: 82 }
  },
  {
    id: 'mid-wicket',
    name: 'Mid-Wicket',
    category: 'Infield Ring',
    side: 'Leg Side',
    distanceMeters: '25 - 32m',
    purpose: 'Guards the prime leg-side power arc against wrist flicks, on-drives, and short-arm jabs.',
    idealPlayerProfile: 'Supreme anticipation, rapid reflex reaction to high-velocity pulled balls.',
    legendaryMasters: ['Suresh Raina', 'Glenn Maxwell', 'Steve Waugh'],
    tacticalTrigger: 'Tightened to create catchers when spinner turns the ball sharply from outside off into middle.',
    dangerZone: 'Bullet pull shot traveling at 140+ km/h off the bat sweet-spot.',
    coordinates: { x: 28, y: 66 }
  },
  {
    id: 'square-leg',
    name: 'Square Leg / Short Leg',
    category: 'Infield Ring',
    side: 'Leg Side',
    distanceMeters: '8 - 25m',
    purpose: 'Under the lid at short leg to catch bat-pad deflections, or placed back at square leg for mistimed hooks.',
    idealPlayerProfile: 'Steel nerves, body-armour resilience, lightning crouch-and-pounce reflexes.',
    legendaryMasters: ['Eknath Solkar', 'David Boon', 'Cheteshwar Pujara', 'Ollie Pope'],
    tacticalTrigger: 'Essential against subcontinent spin (turning square) or targeted short-pitched bumper barrages.',
    dangerZone: 'Taking brutal blows to shin pads and helmet from pull shots.',
    coordinates: { x: 22, y: 48 }
  },
  {
    id: 'fine-leg',
    name: 'Deep Fine Leg',
    category: 'Outfield Patrol',
    side: 'Leg Side',
    distanceMeters: '55 - 75m',
    purpose: 'Stationed on the boundary rope behind square leg to cut off boundaries from sweeps, hooks, and glances.',
    idealPlayerProfile: 'Endurance runner with boundary-line rope awareness and a rocket throwing arm.',
    legendaryMasters: ['Lasith Malinga', 'Zaheer Khan', 'Brett Lee'],
    tacticalTrigger: 'Always deployed when bowling short bouncers to catch top edges or limit boundaries.',
    dangerZone: 'Sliding stops near boundary advertising triangles.',
    coordinates: { x: 30, y: 22 }
  },
  {
    id: 'third-man',
    name: 'Deep Third Man',
    category: 'Outfield Patrol',
    side: 'Off Side',
    distanceMeters: '55 - 75m',
    purpose: 'Boundary anchor behind point to protect edges, ramps, uppercuts, and reverse sweeps.',
    idealPlayerProfile: 'Long boundary sprinter with precise spatial awareness of the rope.',
    legendaryMasters: ['Jasprit Bumrah', 'Mitchell Starc', 'Dale Steyn'],
    tacticalTrigger: 'Crucial in T20 death overs to eliminate four-runs from thick outside edges.',
    dangerZone: 'Swirling top edges carried by cross-breeze into boundary cushions.',
    coordinates: { x: 72, y: 20 }
  },
  {
    id: 'wicketkeeper',
    name: 'Wicket-Keeper',
    category: 'Wicketkeeper',
    side: 'Behind Stumps',
    distanceMeters: '1 - 22m',
    purpose: 'The nerve-center of the entire fielding unit. Responsible for dismissals via catches, stumpings, and run-outs.',
    idealPlayerProfile: 'Supreme crouch flexibility, footwork mobility, soft webbing catch technique, captaincy intellect.',
    legendaryMasters: ['MS Dhoni (Lightning 0.08s Stumpings)', 'Adam Gilchrist', 'Ian Healy', 'Kumar Sangakkara'],
    tacticalTrigger: 'Stands up to the stumps for spinners/medium pacers; stands back 18-22m for express pacers.',
    dangerZone: 'Late vicious wobble seam deviating after passing the batsman’s bat.',
    coordinates: { x: 50, y: 24 }
  }
];

export const ICONIC_PLAYERS: PlayerProfileCard[] = [
  {
    id: 'sanjith',
    name: 'Captain Sanjith (#10)',
    country: 'RCB & Squad XI (The Skipper)',
    role: 'All-Rounder',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    signatureStyle: 'The Sublime Wrist Flick & Mitchell Starc 148k Death Yorker',
    masteryMetric: { label: 'JERSEY #10', value: '100* N.O.' },
    technicalBreakdown: 'Combines Virat Kohli’s fierce chasing discipline with Mitchell Starc’s toe-crushing reverse-swinging yorker. Punches length deliveries off his pads with an effortless wrist flick into the mid-wicket grandstand. Renowned for unflappable composure, clutch finishes, and world-class shoelace knotting under pressure.',
    tacticalKey: 'Entrusted with the ball when 6 runs are needed in the 20th over. Spearheads the batting chase from ball one.'
  },
  {
    id: 'kohli',
    name: 'Virat Kohli',
    country: 'India / RCB (Sanjith’s GOAT)',
    role: 'Batsman',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    signatureStyle: 'High-Elbow Cover Drive & Relentless Chasing Engine (82* Melbourne Hero)',
    masteryMetric: { label: 'RUN CHASE AVG', value: '64.8' },
    technicalBreakdown: 'Flawless head position directly over the ball, zero preliminary trigger shuffle, transferring 100% bodyweight into the stroke.',
    tacticalKey: 'Unlocks off-side fields by piercing the gap between cover and mid-off with millimeter placement.'
  },
  {
    id: 'starc',
    name: 'Mitchell Starc',
    country: 'Australia (Sanjith’s Bowling Idol)',
    role: 'Fast Bowler',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    signatureStyle: '150 km/h Inswinging Laser Yorker & White-Ball World Cup Demolisher',
    masteryMetric: { label: 'WORLD CUP WKTS', value: '65 Wkts' },
    technicalBreakdown: 'High-arm left-arm sling action generating late reverse swing into right-handers’ base of off-stump at 148+ km/h.',
    tacticalKey: 'The undisputed final-over specialist. Bowls unhittable yorkers at the death to defend any target.'
  },
  {
    id: 'bumrah',
    name: 'Jasprit Bumrah',
    country: 'India',
    role: 'Fast Bowler',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    signatureStyle: 'Hyperextended Sling Arm & 145k Crushing Yorker',
    masteryMetric: { label: 'DEATH OVER ECON', value: '6.4 RPO' },
    technicalBreakdown: 'Unique 8-step stutter run-up coupled with an extreme hyperextended elbow release point 30cm closer to batsman than conventional bowlers.',
    tacticalKey: 'Lethal reverse swinging yorkers dipping viciously into the batsman’s front toe.'
  },
  {
    id: 'stokes',
    name: 'Ben Stokes',
    country: 'England',
    role: 'All-Rounder',
    image: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&w=800&q=80',
    signatureStyle: 'Clutch 4th-Innings Counter-Attack & Heavy Ball Spells',
    masteryMetric: { label: 'HEADINGLEY ICON', value: '135* N.O.' },
    technicalBreakdown: 'Unmatched mental fortitude, dynamic switch from iron-clad defensive block to explosive 100m straight hits.',
    tacticalKey: 'Breaks stubborn partnerships by bowling aggressive bouncer barrage with 4 catchers on leg side.'
  },
  {
    id: 'cummins',
    name: 'Pat Cummins',
    country: 'Australia',
    role: 'Fast Bowler',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=80',
    signatureStyle: 'Relentless 4th Stump Seam & World Cup Winning Captaincy',
    masteryMetric: { label: 'TEST BOWLING AVG', value: '21.5' },
    technicalBreakdown: 'Laser-guided upright seam position, landing 75% of deliveries on a nickel length at 142 km/h with subtle nip both ways.',
    tacticalKey: 'Constructs pressure traps: silences the crowd and forces batsman to play at balls they wish to leave.'
  },
  {
    id: 'kane',
    name: 'Kane Williamson',
    country: 'New Zealand',
    role: 'Batsman',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    signatureStyle: 'Soft Hands Late Glide Behind Point & Zen Temperament',
    masteryMetric: { label: 'TEST CENTURIES', value: '32' },
    technicalBreakdown: 'Waits for the ball until the last millisecond beneath his eyes, deadening pace and guiding through vacant slip corridors.',
    tacticalKey: 'Defuses world-class seam bowling by playing with minimal bat grip tension.'
  },
  {
    id: 'rashid',
    name: 'Rashid Khan',
    country: 'Afghanistan',
    role: 'Spin Bowler',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    signatureStyle: 'Rapid 100 km/h Mystery Googly & Quicker Arm Ball',
    masteryMetric: { label: 'T20 WICKETS', value: '600+' },
    technicalBreakdown: 'Delivers leg-spin and googlies with identical high-arm trajectory at fast-medium bowler pace, giving batsman zero reaction time.',
    tacticalKey: 'Targets stumps directly; 60% of dismissals are bowled or LBW.'
  }
];
