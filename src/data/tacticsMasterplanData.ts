export interface TacticalMasterplan {
  id: string;
  name: string;
  scenario: string;
  bowlerType: string;
  fieldingPreset: string;
  keyFielder: string;
  captaincyObjective: string;
  dismissalTrapDescription: string;
  positionsOnField: {
    id: string;
    name: string;
    role: string;
    coordinates: { x: number; y: number };
    isKeyCatcher?: boolean;
  }[];
}

export const TACTICAL_MASTERPLANS: TacticalMasterplan[] = [
  {
    id: 'outswing-cordon',
    name: '4th-Stump Outswing Cordon Trap',
    scenario: 'New Ball (Overs 1 - 15) • Test Match',
    bowlerType: 'Fast Bowler (Right-Arm Over • 140+ km/h)',
    fieldingPreset: '3 Slips + Gully + Fly Slip + Tight Cover',
    keyFielder: 'Second Slip & Gully',
    captaincyObjective: 'Force the opening batsman to play at balls drifting 5th-stump line with subtle outward movement.',
    dismissalTrapDescription: 'The bowler bowls 3 consecutive deliveries angling into off stump, then delivers one slightly fuller with a tilted upright seam that leaves the bat. The batsman commits to an expansive front-foot drive with hard hands, slicing an edge straight into 2nd slip or gully.',
    positionsOnField: [
      { id: 'wk', name: 'Wicket-Keeper', role: 'Anchor behind stumps (18m back)', coordinates: { x: 50, y: 82 } },
      { id: 'sl1', name: '1st Slip', role: 'Catches thin faint nicks', coordinates: { x: 55, y: 81 }, isKeyCatcher: true },
      { id: 'sl2', name: '2nd Slip', role: 'Catches thick edged drives', coordinates: { x: 61, y: 80 }, isKeyCatcher: true },
      { id: 'sl3', name: '3rd Slip', role: 'Catches shoulder-of-bat deflections', coordinates: { x: 67, y: 77 }, isKeyCatcher: true },
      { id: 'gul', name: 'Gully', role: 'Intercepts sliced aerial cuts & steep bounce', coordinates: { x: 74, y: 71 }, isKeyCatcher: true },
      { id: 'pt', name: 'Backward Point', role: 'Patrols square single', coordinates: { x: 79, y: 55 } },
      { id: 'cov', name: 'Cover Ring', role: 'Prevents easy punch', coordinates: { x: 72, y: 44 } },
      { id: 'moff', name: 'Mid-Off', role: 'Straight boundary protection', coordinates: { x: 60, y: 35 } },
      { id: 'mon', name: 'Mid-On', role: 'Checks straight on-drive', coordinates: { x: 40, y: 35 } },
      { id: 'fl', name: 'Fine Leg', role: 'Protection against stray leg-stump flick', coordinates: { x: 26, y: 84 } },
      { id: 'bowl', name: 'Bowler', role: 'Hits 4th stump nickel corridor', coordinates: { x: 50, y: 24 } }
    ]
  },
  {
    id: 'bumper-barrage',
    name: 'Bodyline Leg-Side Bouncer Ambush',
    scenario: 'Middle Session (Over 35 - 55) • Broken Partnership',
    bowlerType: 'Enforcer Fast Bowler (145+ km/h)',
    fieldingPreset: 'Short Leg + Leg Gully + Deep Square Leg + Deep Fine Leg',
    keyFielder: 'Short Leg under lid & Deep Square Leg',
    captaincyObjective: 'Intimidate well-set batsman by targeting chest and armpit line with aggressive short pitch bumpers.',
    dismissalTrapDescription: 'With 4 men stationed on the leg side, the fast bowler digs into the turf at 147 km/h angling into the throat. The batsman must either duck, sway, or awkwardly fend. A mistimed pull flies straight to deep square leg, or an inside edge onto hip pad loops to short leg.',
    positionsOnField: [
      { id: 'wk', name: 'Wicket-Keeper', role: 'Standing back 22m', coordinates: { x: 50, y: 84 } },
      { id: 'sl1', name: 'Single Slip', role: 'Off-side safety catcher', coordinates: { x: 55, y: 81 } },
      { id: 'lgul', name: 'Leg Gully', role: 'Catches glanced glances off hip', coordinates: { x: 42, y: 79 }, isKeyCatcher: true },
      { id: 'sleg', name: 'Short Leg (Bat-Pad)', role: 'Helmeted catcher 6m from bat', coordinates: { x: 44, y: 68 }, isKeyCatcher: true },
      { id: 'mw', name: 'Mid-Wicket', role: 'Ring patrol', coordinates: { x: 30, y: 58 } },
      { id: 'dsq', name: 'Deep Square Leg', role: 'Boundary catcher on the fence for top edge hook', coordinates: { x: 18, y: 50 }, isKeyCatcher: true },
      { id: 'dfl', name: 'Deep Fine Leg', role: 'Deep fence protection', coordinates: { x: 22, y: 86 }, isKeyCatcher: true },
      { id: 'pt', name: 'Point', role: 'Off-side ring', coordinates: { x: 78, y: 55 } },
      { id: 'cov', name: 'Cover', role: 'Single saver', coordinates: { x: 70, y: 44 } },
      { id: 'moff', name: 'Mid-Off', role: 'Pushed back', coordinates: { x: 60, y: 35 } },
      { id: 'bowl', name: 'Bowler', role: 'Bowling 145+ hostile bumpers', coordinates: { x: 50, y: 24 } }
    ]
  },
  {
    id: 'spin-choke',
    name: 'Subcontinent Spin Web & Bat-Pad Siege',
    scenario: 'Day 4 / 5 Turning Pitch • Spin In Tandem',
    bowlerType: 'Right-Arm Off-Spinner or Mystery Spinner',
    fieldingPreset: 'Slip + Silly Point + Short Leg + Slip Cordon',
    keyFielder: 'Silly Point & Short Leg',
    captaincyObjective: 'Surround the batsman with 4 close catchers breathing on the bat to exploit puffing dust and vicious turn.',
    dismissalTrapDescription: 'The spinner tosses the ball up above eye level outside off stump, pitching in the rough. The ball bites the dry turf and turns sharply into the right-hander. The batsman pushes forward defensively; the ball takes the inside edge onto the front pad and loops into short leg’s diving clutches.',
    positionsOnField: [
      { id: 'wk', name: 'Wicket-Keeper', role: 'Standing up right over the stumps', coordinates: { x: 50, y: 75 }, isKeyCatcher: true },
      { id: 'sl1', name: '1st Slip', role: 'Standing close for outside edge', coordinates: { x: 55, y: 75 }, isKeyCatcher: true },
      { id: 'spoint', name: 'Silly Point', role: 'Crouched 4m away on off-side', coordinates: { x: 58, y: 66 }, isKeyCatcher: true },
      { id: 'sleg', name: 'Short Leg', role: 'Crouched 5m away on leg-side', coordinates: { x: 42, y: 66 }, isKeyCatcher: true },
      { id: 'pt', name: 'Point', role: 'Saves cut shot', coordinates: { x: 76, y: 56 } },
      { id: 'cov', name: 'Extra Cover', role: 'Forces aerial stroke', coordinates: { x: 68, y: 44 } },
      { id: 'moff', name: 'Mid-Off', role: 'Prevents easy single', coordinates: { x: 58, y: 35 } },
      { id: 'mon', name: 'Mid-On', role: 'Prevents on-drive', coordinates: { x: 42, y: 35 } },
      { id: 'mw', name: 'Mid-Wicket', role: 'Catches leading edge', coordinates: { x: 30, y: 55 } },
      { id: 'dsq', name: 'Deep Mid-Wicket', role: 'Boundary protection against slog sweep', coordinates: { x: 22, y: 38 } },
      { id: 'bowl', name: 'Spinner', role: 'Tossing ball into rough', coordinates: { x: 50, y: 24 } }
    ]
  },
  {
    id: 't20-death-choke',
    name: 'T20 Death Overs Wide-Yorker Defense',
    scenario: 'Overs 18 - 20 • Defending 12 Runs in Last Over',
    bowlerType: 'Death Specialist (Yorker & Slower Bouncer)',
    fieldingPreset: 'Deep Point + Deep Cover + Long-Off + Long-On + Deep Mid-Wicket',
    keyFielder: 'Deep Backward Point & Long-Off',
    captaincyObjective: 'Prevent the six at all costs by forcing the batsman to reach far outside off stump.',
    dismissalTrapDescription: 'The bowler darts in from around the wicket, firing 142 km/h yorkers inches inside the wide tramline. With 5 boundary riders patrolling the rope, the batsman is forced to drag the ball against the natural angle, leading to sliced catches at deep point or long-off.',
    positionsOnField: [
      { id: 'wk', name: 'Wicket-Keeper', role: 'Standing back 14m', coordinates: { x: 50, y: 80 } },
      { id: 'dpt', name: 'Deep Backward Point', role: 'Boundary fence for slice', coordinates: { x: 86, y: 62 }, isKeyCatcher: true },
      { id: 'dcov', name: 'Deep Extra Cover', role: 'Boundary fence for inside-out', coordinates: { x: 84, y: 40 }, isKeyCatcher: true },
      { id: 'pt', name: 'Point (Inside 30yd)', role: 'Single stopper', coordinates: { x: 74, y: 55 } },
      { id: 'cov', name: 'Cover (Inside 30yd)', role: 'Single stopper', coordinates: { x: 68, y: 44 } },
      { id: 'loff', name: 'Long-Off', role: 'Straight boundary rope', coordinates: { x: 62, y: 16 }, isKeyCatcher: true },
      { id: 'lon', name: 'Long-On', role: 'Straight boundary rope', coordinates: { x: 38, y: 16 }, isKeyCatcher: true },
      { id: 'dmw', name: 'Deep Mid-Wicket', role: 'Boundary rope for drag pull', coordinates: { x: 18, y: 36 }, isKeyCatcher: true },
      { id: 'mw', name: 'Mid-Wicket (Ring)', role: 'Ring single stopper', coordinates: { x: 32, y: 55 } },
      { id: 'sleg', name: 'Short Fine Leg', role: 'Stops cheeky ramp scoop', coordinates: { x: 34, y: 78 } },
      { id: 'bowl', name: 'Bowler', role: 'Executing wide line yorkers', coordinates: { x: 50, y: 24 } }
    ]
  }
];
