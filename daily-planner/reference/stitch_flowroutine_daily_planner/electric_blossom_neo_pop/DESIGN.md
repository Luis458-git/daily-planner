---
name: Electric Blossom Neo-Pop
colors:
  surface: '#f8f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f8f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#edeef0'
  surface-container-high: '#e7e8ea'
  surface-container-highest: '#e1e2e4'
  on-surface: '#191c1e'
  on-surface-variant: '#474554'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f3'
  outline: '#787586'
  outline-variant: '#c8c4d7'
  surface-tint: '#5847d2'
  primary: '#5341cd'
  on-primary: '#ffffff'
  primary-container: '#6c5ce7'
  on-primary-container: '#faf6ff'
  inverse-primary: '#c6bfff'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#56f9f9'
  on-secondary-container: '#007071'
  tertiary: '#a62a30'
  on-tertiary: '#ffffff'
  tertiary-container: '#c84245'
  on-tertiary-container: '#fff5f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4dfff'
  primary-fixed-dim: '#c6bfff'
  on-primary-fixed: '#160066'
  on-primary-fixed-variant: '#4029ba'
  secondary-fixed: '#56f9f9'
  secondary-fixed-dim: '#26dcdd'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f50'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b0'
  on-tertiary-fixed: '#410006'
  on-tertiary-fixed-variant: '#8c1520'
  background: '#f8f9fb'
  on-background: '#191c1e'
  surface-variant: '#e1e2e4'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style
The design system embodies a fresh, high-energy, yet meticulously organized Neo-Pop aesthetic tailored for Gen-Z productivity seekers. It rejects cold, clinical task management in favor of a playful, tactile, and rewarding digital playground. The emotional tone is optimistic, motivating, and uncluttered—turning mundane daily discipline into visual celebrations.

Key stylistic pillars:
- **Neo-Pop Vibrancy:** High-chroma accents deployed over expansive, ultra-clean neutral surfaces. Color acts as an emotional reward and functional categorizer.
- **Organic Softness:** Pillowy forms, deep border radiuses, and bouncy micro-interactions create an approachable, low-stress environment.
- **Tactile Gamification:** Subtle chromatic ambient glows and crisp micro-details simulate interactive stickers, tokens, and stamps rather than bureaucratic checklist items.

## Colors
The palette balances stark clarity with punchy chromatic accents:
- **Canvas & Neutral Surfaces:** Built on `#F9FAFC` with pure `#FFFFFF` cards, ensuring visual breathability and allowing category tags to pop without sensory overload.
- **Electric Violet (`#6C5CE7`):** The operational backbone. Used for core navigation, primary triggers, hero states, and active metrics.
- **Energizing Mint (`#00D2D3`):** High-momentum complement. Dictates streaks, completion states, hydration/exercise categories, and success checkpoints.
- **Coral Spark (`#FF6B6B`):** Urgent, attention-grabbing tertiary. Reserved for high-priority habits, timers, streaks at risk, and focus intervals.
- **Sunburst Yellow (`#FFD166`):** Supportive functional accent for morning routines, star streaks, awards, and personal milestones.
- **Text & Contrast Hierarchy:** Base text sits on deep slate `#1E202C` for effortless legibility, supported by muted lavender-gray `#8F95B2` for secondary metadata.

## Typography
Plus Jakarta Sans delivers structural balance between modern precision and welcoming geometry.
- Large title scales utilize heavy weights (`700` and `800`) with tightened tracking (`-0.02em` to `-0.03em`) to create snappy, punchy headings that command attention.
- Body levels maintain weight at `500` rather than standard `400` to anchor presence against rich color swatches and colored badges.
- Label levels operate in bold uppercase or tight sentence case, functioning as high-visibility indicators for streak counts, timestamps, and emoji-tagged chips.

## Layout & Spacing
A fluid column framework built primarily for single-column and multi-card mobile experiences:
- **Viewport Layout:** Mobile views leverage a 4-column responsive grid with `margin: 1.25rem` (20px) safety borders and `gutter: 1rem` (16px) between card modules. Tablet/Desktop expansions shift to 8 and 12 columns with standard max-content containers (480px for focused mobile views, 960px for tablet dashboards).
- **Rhythm & Gaps:** Component clusters maintain a tight `space-sm` (8px) or `space-md` (16px) separation to keep associated habits visually bound, while distinct chronological blocks (e.g., Morning vs. Afternoon routines) breathe with `space-xl` (36px).
- **Internal Padding:** Cards and interactive targets utilize a generous `space-lg` (24px) internal layout to preserve openness and soft touch zones.

## Elevation & Depth
Depth is created through chromatic ambient halos and tonal layering, steering clear of stark black-drop shadows:
- **Ground Floor:** `#F9FAFC` canvas.
- **Level 1 (Cards & Modules):** Crisp `#FFFFFF` surface lifted by a soft, warm ambient diffusion: `box-shadow: 0 8px 24px -4px rgba(108, 92, 231, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.03)`.
- **Level 2 (Floating Action Triggers & Modals):** Elevated with an energized chromatic aura: `box-shadow: 0 12px 32px -4px rgba(108, 92, 231, 0.28)`.
- **Active Accented States:** Interactive elements inherit colored halos reflecting their intent—e.g., Mint tasks glow with `rgba(0, 210, 211, 0.35)`, Coral triggers glow with `rgba(255, 107, 107, 0.35)`.
- **Ghost Outlines:** Where separation is needed against white-on-white placements, an ultra-faint border of `1.5px solid rgba(108, 92, 231, 0.08)` maintains edge fidelity without visual noise.

## Shapes
Hyper-rounded, organic curves reinforce the friendly, low-friction philosophy:
- **Base Surfaces:** Routine and habit cards feature dramatic `24px` (`rounded-2xl`) or `28px` contours.
- **Action Triggers & Pills:** Interactive buttons, category pills, progress meters, and floating navigational islands use full stadium radii (`rounded-full` / 9999px) to invite direct physical interaction.
- **Nested Inner Badges:** Internal emoji frames and counter capsules match the outer curve proportionally, sitting between `12px` and `16px`.

## Components

### Buttons
- **Primary:** Full stadium shape, saturated `#6C5CE7` fill, white bold text, and responsive scale click states (`active:scale-95`). Backed by an ambient violet drop glow.
- **Secondary / Action Ghost:** Translucent violet wash (`rgba(108, 92, 231, 0.1)`) with vibrant `#6C5CE7` text, no hard border.
- **Completion Check Trigger:** Circular 36px interactive button that snaps from faint neutral-gray to rich secondary mint (`#00D2D3`) with a spring pop on click.

### Category Chips
Stadium-pill shapes pairing an expressive emoji with label typography:
- *Programación:* Light violet tint background (`#F0EDFF`), `#6C5CE7` text.
- *Inglés:* Sunburst tint background (`#FFF8E7`), `#D99B00` text.
- *Ejercicio:* Mint tint background (`#E6FAF8`), `#009E9F` text.
- *Comida:* Coral tint background (`#FFEBEB`), `#E04848` text.
- *Descanso:* Soft sky tint background (`#EBF5FF`), `#2B78D4` text.
- *Personal:* Blossom pink tint background (`#FDF0F6`), `#C7387E` text.

### Habit & Routine Cards
- Flat pure-white base with `rounded-3xl` (28px) radius, structured with a left-aligned colored task identifier bar or icon orb.
- Title in `headline-sm`, complemented by duration badges and routine series trackers.
- Streak counters styled as miniature sticker capsules (e.g., "🔥 5 días") with Sunburst Yellow or Coral highlights.

### Progress Gauges & Rings
- Continuous fluid meters with rounded terminal caps.
- Tracks set against soft background washes with dual-color energetic gradients (e.g., `#6C5CE7` to `#00D2D3`) to visualize habit completion momentum.

### Input Fields
- Capsule and rounded-2xl search and task creation fields with `#FFFFFF` or pale `#F1F3F9` backdrops.
- Inactive border is completely invisible; focused states activate a 2px energetic violet outline with a matching diffused chromatic glow.
- Leading emoji picker anchor embedded into the field padding.