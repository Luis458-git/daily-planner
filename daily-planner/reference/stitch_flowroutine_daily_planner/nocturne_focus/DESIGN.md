---
name: Nocturne Focus
colors:
  surface: '#0c1421'
  surface-dim: '#0c1421'
  surface-bright: '#323948'
  surface-container-lowest: '#070e1b'
  surface-container-low: '#141c29'
  surface-container: '#18202d'
  surface-container-high: '#222a38'
  surface-container-highest: '#2d3543'
  on-surface: '#dbe2f5'
  on-surface-variant: '#d8c3ad'
  inverse-surface: '#dbe2f5'
  inverse-on-surface: '#29313f'
  outline: '#a08e7a'
  outline-variant: '#534434'
  surface-tint: '#ffb95f'
  primary: '#ffc174'
  on-primary: '#472a00'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#855300'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#56e5a9'
  on-tertiary: '#003824'
  tertiary-container: '#30c88f'
  on-tertiary-container: '#004e34'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0c1421'
  on-background: '#dbe2f5'
  surface-variant: '#2d3543'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
  display-timer:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1.25rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for deep work, technical focus, and elite cognitive rhythm. It synthesizes futuristic dark-mode glassmorphism with high-utility developer and scholar dashboard ergonomics. The emotional tone is calm, atmospheric, immersive, and razor-sharp—evoking the solitude and clarity of midnight productivity.

The visual style pairs deep cosmic navy backgrounds with frosted glass cards, illuminated by warm amber solar accents and electric cyan telemetry highlights. Elements feel physically layered and softly suspended in space, utilizing precision-etched borders, backplate blurs, and localized neon glows rather than harsh flat lines.

## Colors

The color palette is built on deep obsidian and midnight navy foundation tones, offset by energized warm luminescence and analytical cool tones.

- **Primary (`#f59e0b`):** Radiant Amber. Used for primary calls-to-action, focus indicators, highlight metrics, active play states, and primary status tags.
- **Secondary (`#38bdf8`):** Electric Cyan. Used for analytical readouts, countdown highlights, tertiary badges, and dynamic data visualizations.
- **Tertiary (`#10b981`):** Emerald Mint. Used for completion states, active streaks, and positive delta values.
- **Neutral Surface Hierarchy:**
  - Base canvas: `#0b1320`
  - Subsurface / Sidebar background: `#0d1726`
  - Glass card fill: `rgba(17, 27, 46, 0.72)`
  - Elevated modal / Popover surface: `rgba(22, 36, 61, 0.88)`
  - Frosted border strokes: `rgba(255, 255, 255, 0.08)`
  - Hairline active strokes: `rgba(245, 158, 11, 0.4)`
- **Typography Tones:**
  - High-emphasis text: `#f8fafc`
  - Medium-emphasis text: `#94a3b8`
  - Muted / Meta text: `#64748b`

## Typography

Typography blends geometric clarity with technical legibility. Plus Jakarta Sans handles titles, primary labels, and numerical metrics with a humanistic yet modern edge. Inter is deployed for compact data grids, metadata, navigation chips, and tags to guarantee baseline density and readability across tight dark containers.

Numeric metrics (timers, counters, ratios) should always be set with tabular figures (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during real-time updates.

## Layout & Spacing

The layout is built upon a modular fluid grid structure tailored for information-dense workspaces. 

- **Desktop (1280px+):** Collapsible persistent sidebar (240px wide), an open fluid command center column, and a sticky secondary intelligence column (360px wide) housing timers, progress rings, and quick lists. Gutters maintain `1.5rem` (`gutter-lg`) spacing with `2rem` outer padding.
- **Tablet (768px - 1279px):** Sidebar converts into an icon rail (64px wide). The grid becomes a single or 2-column stacked flow with `1rem` gutters.
- **Mobile (< 768px):** Single-column stacked stream. Persistent bottom dock for navigation. Section margins compress to `1.25rem` (`margin`).

All child module compositions enforce strict 8pt vertical spacing rhythms, with sub-component elements spaced at 4pt increments.

## Elevation & Depth

Visual hierarchy uses frosted glass stacking and controlled ambient illumination rather than conventional solid shadows:

- **Level 0 (Canvas):** Pure `#0b1320` base, overlaid with faint atmospheric radial gradients in deep indigo (`rgba(28, 45, 78, 0.45)`) to generate soft visual depth.
- **Level 1 (Cards & Surface Panels):** Translucent glass panels with `background: rgba(17, 27, 46, 0.72)`, backdrop filter blur of `16px`, and an outer hairline border of `1px solid rgba(255, 255, 255, 0.08)`. Subtle ambient shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.5)`.
- **Level 2 (Active Hover & Interactive Panels):** Glass fill increases to `rgba(24, 38, 64, 0.85)` with an amber or cyan rim light: `box-shadow: 0 0 20px -2px rgba(245, 158, 11, 0.15), 0 8px 24px rgba(0, 0, 0, 0.6)`.
- **Level 3 (Modals, Overlays, Dropdowns):** Solid tinted glass `rgba(15, 23, 42, 0.94)`, backdrop blur of `24px`, bordered with `rgba(255, 255, 255, 0.12)`, floating with heavy shadow `0 24px 48px -8px rgba(0, 0, 0, 0.75)`.

## Shapes

The design system employs a soft-rounded aesthetic with distinct pill accents to soften dense technical information:

- **Standard Cards & Modules:** `rounded-lg` (1rem / 16px) for an approachable, sleek finish.
- **Nested Inner Containers & Inputs:** `rounded` (0.5rem / 8px) to maintain harmonious concentricity.
- **Pills & Status Indicators:** Full capsule radius (`9999px`) for navigation states, streak dots, quick action buttons, and countdown chips.

## Components

### Buttons
- **Primary Amber Button:** Pill-shaped (`rounded-full`), solid `#f59e0b` fill, `#0b1320` bold text. Subtle amber bloom shadow (`0 0 16px rgba(245, 158, 11, 0.35)`). Hover raises brightness and intensifies the glow.
- **Ghost / Glass Button:** Dark translucent fill (`rgba(255, 255, 255, 0.05)`), border `1px solid rgba(255, 255, 255, 0.1)`, text `#f8fafc`. Hover transition to `rgba(255, 255, 255, 0.1)`.
- **Icon Actions:** Circular (36px × 36px) or rounded pill with centered icon and low-contrast borders.

### Cards & Modules
- Structured with header zones (icon, title, secondary action pills), content bodies, and bottom metadata rails.
- Dividers between internal items are rendered with `1px solid rgba(255, 255, 255, 0.05)`.

### Chips & Badges
- **Status Pills:** Compact height (22px), `Inter 10px / 600`, pill radius, uppercase or capitalized. 
- **Active State:** Low-opacity green/amber background (`rgba(16, 185, 129, 0.15)` or `rgba(245, 158, 11, 0.15)`) with vibrant text and a 4px breathing glowing status pip.

### Habit Trackers & Matrix Cells
- Monospace weekday tokens (Mon, Tue, Wed) paired with circular punch buttons (28px) displaying check indicators. Inactive state: dark inset stroke. Completed state: amber or cyan glow fill with dark checkmark icon.

### Form Inputs & Checkboxes
- **Inputs:** `rgba(11, 19, 32, 0.8)` background, border `1px solid rgba(255, 255, 255, 0.1)`. Focus brings a sharp amber rim (`#f59e0b`) and subtle glow.
- **Checkboxes:** Squared with 4px corner radius, dark stroke. Checked state fills with `#f59e0b` displaying a dark `#0b1320` check.

### Circular Metric & Timer Rings
- Progress rings constructed with SVG strokes: track rendered in `rgba(255, 255, 255, 0.08)`, active stroke in `#f59e0b` with `stroke-linecap: round` and a soft drop shadow filter to produce an authentic light-tube glow.