# CULT WARE — Project Guide

A premium **concept/portfolio** website for a dark streetwear brand called **CULT WARE**.
This is an Awwwards / agency-grade demo piece. Visual quality is the whole point — every
section must feel cinematic, intentional, and expensive. No real commerce.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for all animation (entrances, scroll, hover, ambient motion)
- Custom `<canvas>` for particle / mist / smoke ambience
- Fonts via `next/font` — **Cinzel** (gothic display) + **Inter** (UI/body)

## Brand & Aesthetic
- **Name:** CULT WARE — dark streetwear.
- **Mood:** dark, ancient/occult, cinematic, mysterious, ritualistic, premium.
- **Palette:** near-black backgrounds (`#05050a`–`#0b0b10`), deep shadows, gritty
  texture/grain, **gold** (`#c8a35a`/`#d9b777`) and **bone-white** (`#ece6d8`) accents.
- **Typography:** bold, editorial, occult. Cinzel for the brand mark and headlines.
- **Imagery:** elegant silhouettes / robed ritual figures as placeholders until real
  product photography is supplied.

## Design Rules (non-negotiable)
- Heavy, deliberate use of motion: entrance animations, scroll-linked reveals, hover states.
- **Smooth, slow easing** — cinematic. Nothing snappy, bouncy, or templated/cheap.
- Prefer custom eased curves (e.g. `[0.16, 1, 0.3, 1]`) and long durations.
- Respect `prefers-reduced-motion`.
- Layering & depth: vignettes, glows, grain, parallax — build atmosphere.

## Conventions
- Components in `components/`, route in `app/`. Client components flagged `"use client"`.
- Brand tokens (colors, easing) centralized in `tailwind.config.ts` + `globals.css`.
- Keep animation logic in dedicated components (e.g. `MistCanvas`, `RitualFigures`).

## Build Status
- [x] Project scaffold + CLAUDE.md
- [x] **Hero section** — full-screen cinematic landing (figures, mist, brand reveal, CTA). APPROVED & LOCKED — do not change.
- [x] **Collection grid** — `THE COLLECTION`, 6 products, reusable `ProductCard`. APPROVED.
- [x] **Size visualizer** — modal on "View Fit": height/weight (unit toggles) → proportional
      body+garment silhouette + S/M/L/XL recommendation + size chart.
- [ ] Supabase-backed inquiry form (card `onInquire` prop already threaded, unused)
- [ ] Lookbook, manifesto, footer, etc.

## Key files / extension points
- `data/products.ts` — single source of product data. Extend `Product` here.
- `lib/sizing.ts` — ALL sizing math (unit conversion, `recommendSize`, `bodyProportions`,
  `SIZE_CHART`, validation). Tune fit logic here only.
- `components/ProductCard.tsx` — reusable card; `onViewFit` (wired) + `onInquire` (free) props.
- `components/SizeVisualizer.tsx` — modal; `components/BodySilhouette.tsx` — parametric SVG figure.

## Run
```bash
npm install
npm run dev   # http://localhost:3000
```
