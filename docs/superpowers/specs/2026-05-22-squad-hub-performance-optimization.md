# Design Spec: Squad Hub Performance Optimization

## Problem Statement
The Squad Hub page (`/squad-hub`) experiences significant lag on mobile devices.
- **Root Cause 1:** Massive image files (e.g., `player5.jpeg` is 12.3MB) causing high memory usage and bandwidth throttling.
- **Root Cause 2:** `bg-fixed` utility class on the main container causes expensive repaints on every scroll event in mobile browsers.
- **Root Cause 3:** Heavy Framer Motion layout animations combined with unoptimized images strain the mobile GPU.

## Proposed Changes

### 1. Asset Optimization
- Compress all images in `public/players/` using `sharp` (if available) or a comparable compression strategy.
- Target: All player images should be < 300KB.
- Convert large JPEGs to optimized formats or lower quality levels that preserve visual fidelity for mobile screens.

### 2. CSS Refactoring (Scrolling Performance)
- Remove `bg-fixed` from the `<main>` tag in `src/app/squad-hub/page.tsx`.
- Implement a fixed background `div` with `inset-0` and `z-index-0` to achieve the "fixed background" look without the performance penalty of `background-attachment: fixed`.

### 3. Component Optimization
- Verify `next/image` usage to ensure proper `sizes` and `priority` attributes are used to minimize Cumulative Layout Shift (CLS) and improve Largest Contentful Paint (LCP).
- Maintain all existing `framer-motion` animations as requested.

## Success Criteria
- Page weight reduced from ~40MB to < 5MB.
- Smooth 60fps scrolling on mobile devices.
- Visual appearance remains identical to the current version.

## Implementation Plan
1. Research and install `sharp` if necessary, or use a shell-based compression tool.
2. Batch compress player images.
3. Update `src/app/squad-hub/page.tsx` for CSS optimization.
4. Verify fixes.
