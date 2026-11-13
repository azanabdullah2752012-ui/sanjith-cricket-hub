# Product Context: Sanjith's Cricket Pavilion (#10)

## 1. Overview & Vision
**Sanjith's Cricket Pavilion** is a bespoke, interactive digital clubhouse and high-fidelity tribute created specifically for Sanjith's birthday. Built by his brother/teammate Azan and dressing-room squad, it marries a heartfelt personal celebration with deep, authentic cricket nerdery.

Unlike generic birthday e-cards or static landing pages, this application functions as a full-featured, dark-theme cricket pavilion that reflects Sanjith’s love for Royal Challengers Bangalore (RCB), Captain Virat Kohli, Mitchell Starc’s lethal left-arm pace, tactical field craft, and real-time match telemetry.

---

## 2. Subject Profile: Sanjith (#10)

- **Name & Moniker**: Sanjith "The Maestro" R. / Skipper Sanjith
- **Jersey Number**: **#10** (Iconic signature emblem across the app)
- **Primary Role**: Premier All-Rounder (Right-Hand Batsman / Right-Arm Medium-Fast Pace)
- **Cricket Idols**:
  - **Virat Kohli (King Kohli)**: High-intensity chases, Melbourne 82* back-foot punch, passion, clutch dominance.
  - **Mitchell Starc**: Lethal 150 km/h toe-crushing inswinging yorkers at the death.
  - **Glenn Maxwell**: Reverse-lap audacious audacity.
- **Batting Identity & Signature Shots**:
  - Signature wrist flick off the pads over deep mid-wicket for 98-meter maximums.
  - Classic high-elbow English Willow cover drive.
  - Trademark quirky inside joke: "Tying shoelaces mid-delivery" while the ball nutmegs the keeper to the boundary.
- **Bowling Identity**: Spearing 5th-stump death yorkers, holding tight economy rates in the final overs.
- **Club Allegiance**: Loyal member of the **RCB 12th Man Army** (*"Ee Sala Cup Namde"* spirit).
- **Milestone Stats**:
  - 78 Matches | 3,450 Runs | 54.8 Batting Avg | 152.4 Strike Rate | 89 Wickets | Best Bowling: 5/19 | 19 Clutch Chases Won.

---

## 3. Core Tone & Voice

- **Authentic & Brotherhood**: Warm, affectionate banter between cricket mates. Direct, confident, and free of artificial sentimentality or marketing fluff.
- **Inside Jokes & Shared Lore**:
  - Tying shoelaces while the bowler runs in.
  - Calling for quick singles when there isn't one.
  - The sacred English Willow sweet spot sound.
- **Deep Tactical Precision**: Uses actual professional cricket terminology (slip cordons, fly slips, 7-2 offside fields, seam presentations, trajectory physics, pitch map lengths, hawk-eye ball tracking).
- **Celebratory Energy**: Confetti bursts upon milestone actions, standing ovations, and tribute notes.

---

## 4. Key Functional Modules & Architecture

The application is structured into five core pavilion wings accessible via the top floating navigation:

### 1. The Birthday Tribute Wing (`TributePage.tsx`)
- **Hero Banner**: Celebratory milestone card featuring jersey #10 watermark, birthday message, and live celebration confetti trigger.
- **Player Dossier (`PlayerHeroCard.tsx`)**: High-impact breakdown of Sanjith's stats, batting archetype, bowling metrics, and personal motto.
- **Interactive Shot Analysis (`ModernWagonWheel.tsx`)**: Visual radial wagon wheel diagram depicting runs distributed across 8 field sectors with boundary counts.
- **Career Chronicle (`InningsChronicle.tsx`)**: Notable match narratives highlighting memorable clutch run chases and 5-wicket hauls.
- **Pavilion Soundboard (`ModernSoundboard.tsx`)**: Tactile acoustic sound triggers (willow sweet spot, timber cartwheel, slip cordon appeal, crowd roar, standing ovation).
- **Brotherhood Guestbook (`ModernGuestbook.tsx`)**: Interactive guestbook persisted in `localStorage` allowing friends and teammates to leave pinned matchday wishes and cricket badges.

### 2. Batting Challenge Mini-Game (`BattingChallengePage.tsx` / `ModernBattingGame.tsx`)
- An interactive shot-selection simulator where users bat as Captain Sanjith (#10).
- Face iconic bowlers (Mitchell Starc 150 km/h yorker, Haris Rauf 145 km/h bouncer, Rashid Khan googly, Jasprit Bumrah slower ball).
- Choose between technical textbook drives, the signature wrist flick, or the comedic "tie your shoelaces" gambit.
- Tracks runs, balls faced, strike rate, boundaries, and high-score records with milestone confetti on reaching 50 and 100.

### 3. Tactical Fielding Studio (`FieldingPage.tsx`)
- Full interactive 2D cricket oval board with inner 30-yard circle and pitch crease.
- Drag-and-drop positional mechanics for all 11 fielders.
- Pre-loaded with professional masterplans:
  - *Sanjith's Death Trap (7-2 Off-Side Ring)*
  - *Aggressive Test Cordon (4 Slips + Gully)*
  - *T20 Powerplay Clamp (Leg-Side Trap)*
- Save custom field layouts to `localStorage` and inspect detailed fielding position encyclopedias (angles, distance, tactical trigger, legendary masters).

### 4. Live Match Center & Match Studio (`LiveScoresPage.tsx` / `MatchStudioView.tsx`)
- Real-time simulation of international and league matches (e.g., India vs Australia T20, RCB vs CSK IPL Classic).
- Interactive ball-by-ball delivery playback with animated ball trajectories (bowler release $\rightarrow$ pitch bounce $\rightarrow$ bat impact $\rightarrow$ boundary sweep).
- Integrated Pitch Map visualizer showing line and length distribution (yorkers, good length, short pitch).
- Live wagon wheel showing delivery angles and active batsman telemetry.

### 5. Legends & Heroes Gallery (`PlayersPage.tsx`)
- Curated roster of Sanjith's favorite cricketing icons (Virat Kohli, Mitchell Starc, AB de Villiers, Jasprit Bumrah, Glenn Maxwell, MS Dhoni) presented alongside Sanjith's own captain profile card.
- Filterable by role (Batsman, Fast Bowler, Spin Bowler, All-Rounder) with technical mastery breakdowns.

---

## 5. Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Bespoke CSS Tokens (`ald-card`, `ald-subcard`, `ald-pill`)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas-Confetti
- **Audio Engine**: Lightweight HTML5 Web Audio synthesis hook architecture
- **State Management**: Local React state + HTML5 `localStorage` persistence
