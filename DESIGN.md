# Design System: Dark Clubhouse & Cricket Pavilion

## 1. Design Philosophy: The Dark Clubhouse Aesthetic

The design system for Sanjith's Cricket Pavilion is built on the **Dark Clubhouse / Editorial Sports Precision** archetype. It takes inspiration from elite stadium media suites, night cricket floodlights, and premium member lounges.

### Guiding Principles:
1. **Atmospheric Tonal Depth**: Rich, layered dark charcoal surfaces (`#0e0f12`, `#16181d`, `#1f2128`) rather than flat grayish blacks or harsh pure blacks.
2. **60-30-10 Color Discipline**:
   - **60% Dominant Base**: Obsidian canvas (`#0e0f12`) and deep stadium night backdrop.
   - **30% Structural Panels**: Card containers (`#16181d`), navigation headers, and sub-panels (`#121317`) with 1-step tonal borders (`rgba(255, 255, 255, 0.08)`).
   - **10% High-Impact Accents**: RCB Crimson (`#dc2626` / `#ef4444`) and Pavilion Gold (`#d97706`), strictly reserved for primary badges, live indicators, key interactive targets, and celebration states.
3. **Decoupled Anti-Slop Discipline**:
   - **Zero generic AI gradients**: Strictly NO generic blue-to-purple (`#6366f1` $\rightarrow$ `#8b5cf6`) blends.
   - **Zero pastel aurora blobs or floating neon orbs**.
   - **Zero bouncy hover jumps (`translateY(-4px)`) or rubbery card boops**.
   - **Zero decorative monospace abuse**: Monospace font is not used as decorative stamps; crisp tabular small-caps are preferred.
   - **Zero defensive legitimacy copy**: No AI boilerplate text like "Real case studies" or "100% authentic".

---

## 2. Design Tokens & Palette

### Base Surfaces
| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--canvas-bg` | `#0e0f12` | Deep obsidian stadium canvas base (60%) |
| `--canvas-surface` | `#16181d` | Primary structural card & panel background (30%) |
| `--canvas-elevated` | `#1f2128` | Elevated modals, hover states, and dropdowns |
| `--canvas-subsurface`| `#121317` | Inset data buckets, code zones, and stat blocks |
| `--canvas-border` | `rgba(255, 255, 255, 0.08)` | Subtle 1-step perimeter separator |
| `--canvas-border-hover` | `rgba(255, 255, 255, 0.16)` | Focused or hovered container boundary |

### Typography & Text Hierarchy
| Token | Hex / Value | Contrast Ratio | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `#f8fafc` | ~16.5:1 on `#0e0f12` | High-emphasis headers, active values, card titles |
| `--text-secondary` | `#94a3b8` | ~7.2:1 on `#0e0f12` | Body copy, descriptions, captions (WCAG AA compliant) |
| `--text-muted` | `#64748b` | ~4.6:1 on `#0e0f12` | Inactive tabs, helper metadata, timestamps |

### Signature Accents (RCB & Pavilion Theme)
| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| `--rcb-red` | `#dc2626` | Primary action CTA, jersey #10 badge, live match pingers |
| `--rcb-red-glow` | `rgba(220, 38, 38, 0.2)` | Calibrated backlight glow for high-impact milestones |
| `--rcb-gold` | `#d97706` | Centuries, golden awards, trophy highlights, clutch tags |
| `--field-turf` | `#0d2818` / `#166534` | Pitch map green, outfield canvas grass tone |
| `--crease-line` | `rgba(255, 255, 255, 0.6)` | Cricket pitch popping crease, return crease markings |

---

## 3. Typography Rules & Ergonomics

### Font Pairing
1. **Display & Numbers (`font-editorial`)**:
   - **Family**: `Space Grotesk`, system-ui, sans-serif
   - **Tracking**: `-0.03em` for tight, sporty confidence
   - **Usage**: Main pavilion headings, jersey #10 watermarks, run tally counters, strike rate figures.
2. **Body & Interface (`font-sans`)**:
   - **Family**: `Plus Jakarta Sans`, system-ui, -apple-system, sans-serif
   - **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
   - **Measure & Leading**: All narrative paragraphs are constrained to `max-w-prose` (45–75 characters per line) with `leading-relaxed` (1.6) to prevent eye strain across wide viewports.

---

## 4. Layout Rhythm & Elevation Classes

### Container Tokens (from `index.css`)
```css
/* Primary Clubhouse Panel */
.ald-card {
  background-color: #16181d;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 24px -2px rgba(0, 0, 0, 0.35);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.ald-card:hover {
  border-color: rgba(255, 255, 255, 0.14);
}

/* Inset Sub-Panel */
.ald-subcard {
  background-color: #121317;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* Metadata Pill */
.ald-pill {
  background-color: #1e2027;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f8fafc;
}
```

### Elevation & Spatial Grid
- **Border Radii**:
  - `rounded-3xl` (24px) for top-level wing banners and primary stadium cards.
  - `rounded-2xl` (16px) for interior widgets, shot cards, and audio controls.
  - `rounded-xl` (12px) for buttons, inputs, and interactive pills.
  - `rounded-full` for badges, status indicators, and avatar rings.
- **Header Structure**:
  - Floating sticky bar (`sticky top-0 z-50`) with backdrop blur (`backdrop-blur-md bg-[#0e0f12]/85`).
  - Seamless integration: No harsh opaque slab slicing the viewport fold.

---

## 5. Component Construction Guidelines

### 1. Interactive Wagon Wheel & Pitch Maps
- Rendered using crisp, responsive SVG matrices.
- Coordinates originate from calibrated pitch geometry (e.g., batsman standing at $(x: 50, y: 50)$ on the wheel, bowler releasing from bottom or top).
- Color coding:
  - Fours: Gold/Yellow arc (`#eab308`)
  - Sixes: RCB Crimson arc (`#dc2626`)
  - Singles/Twos: Muted slate (`#64748b`)

### 2. Live Match Simulation & Ball Trajectory
- Motion paths strictly adhere to constant physical acceleration: Bowler Release $\rightarrow$ Pitch Bounce $\rightarrow$ Bat Contact $\rightarrow$ Outfield Destination.
- Zero rubber-band linear jumps; state changes reflect actual ball flight timeframes (400ms release-to-bounce, 400ms bounce-to-bat, 800ms bat-to-boundary).

### 3. Tactile Audio & Confetti
- Acoustic triggers trigger subtle canvas confetti calibrated to RCB shades (`['#dc2626', '#d97706', '#f8fafc', '#ef4444']`).
- Origin offsets point toward the active button or hero milestone to anchor the eye.

### 4. Accessible Contrast & State Feedback
- All buttons maintain high visible contrast and explicit focus rings (`focus-visible:ring-2 focus-visible:ring-red-500/50`).
- Text content is never hidden behind `opacity: 0` initial mount delays. If JavaScript takes time to hydrate, layout and typography remain legible immediately.

---

## 6. Anti-Slop Enforcement Checklist

- [x] **No generic violet/purple gradients**: Every gradient uses authentic brand shades (crimson to dark cherry or subtle graphite value shifts).
- [x] **No boilerplate cards with icon-in-colored-square**: Icons are integrated into typography context or styled with subtle outline containers.
- [x] **No bouncy hover jumps**: Interactions use surface luminescence shifts (`hover:border-white/20`, `hover:bg-white/[0.04]`) instead of jarring `translateY` transforms.
- [x] **WCAG AA Compliance**: Primary text at `#f8fafc` and secondary text at `#94a3b8` guarantee >7:1 contrast on dark base.
- [x] **Domain Authenticity**: Complete absence of generic SaaS phrases or templates; 100% tailored to cricket and Sanjith's personal celebration.
