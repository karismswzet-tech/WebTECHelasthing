# ELASTECH PRODUCTION — Landing Page

## Original Problem Statement
"Buatkan landing page dari file PDF yg saya kirim dalam bahasa pemrograman html"
(Sumber: PDF Company Profile ELASTECH PRODUCTION — SAAS, IoT, Web Development)

System reminder: Award-worthy (Awwwards Site-of-the-Day), kinetic hero, framer-motion, lenis, editorial marquee, numbered manifesto, spotlight portfolio.

## User Choices
- Format: React multi-file (in /app/frontend)
- Bahasa: Indonesia
- Kontak: Skip kontak asli, gunakan dummy form
- Style: Dark mode futuristik

## Architecture
- React 19 + Tailwind + framer-motion + lenis + react-fast-marquee + sonner
- Single-page landing (no backend), all client-side
- Fonts: Unbounded (display) + Outfit (body) + JetBrains Mono
- Custom cursor with mix-blend-mode, noise SVG overlay, grid background
- Lenis smooth momentum scrolling + framer-motion for reveals & parallax

## File Structure
/app/frontend/src/
- App.js — renders <Landing />
- pages/Landing.jsx — Lenis init + section composition
- components/landing/
  - Cursor.jsx (dual-ring animated cursor)
  - Nav.jsx (glassmorphic fixed header)
  - Hero.jsx (kinetic line reveal + parallax bg)
  - Marquee.jsx (outlined text scroll strip)
  - Manifesto.jsx (numbered chapters 01/02/03)
  - Services.jsx (SAAS + IoT + Web bento)
  - Stats.jsx (animated counters: 500+, 99.9%, 24/7, 40%)
  - Portfolio.jsx (4 project tiles w/ clipped frames)
  - Testimonials.jsx (3 client quotes, star ratings)
  - Contact.jsx (dummy form + sonner toast)
  - Footer.jsx (huge "Terima Kasih" outro)
  - Reveal.jsx (FadeUp + MaskLine motion helpers)
- tailwind.config.js — added font families, ink/acid tokens
- index.css — global dark theme + Google Fonts + noise + custom cursor

## Implemented Features (2026-Q4)
- Kinetic on-load hero reveal with 3 masked lines (Solusi / Digital / Terdepan)
- Parallax hero background image (Unsplash) + grid + scroll-linked y/scale/opacity
- Custom cursor (dot + ring, mix-blend-mode difference)
- Smooth scrolling via Lenis + anchor-link handler
- Editorial marquee with 1px-stroke outline text
- 3-chapter manifesto with huge outlined numbers
- Services bento grid (asymmetric 8/4/12 spans, clipped-frame image hover)
- Animated numeric counters triggered by useInView
- Portfolio grid with 4 spotlight project tiles
- 3 testimonials with acid-cyan star ratings
- Dummy contact form with toast feedback (sonner)
- Giant "Terima Kasih" outro footer with social links
- data-testid on every interactive element

## What's NOT Implemented (Deferred / P1)
- Real integrations (contact form is dummy — no backend)
- Multi-language switcher (currently ID only)
- Blog / About Us / individual service detail pages
- CMS-driven portfolio
- 3D WebGL hero (currently 2D parallax image only)

## Next Action Items (P1/P2)
- P1: Real contact backend + email delivery (Resend playbook)
- P1: Real portfolio case-study pages
- P2: 3D globe in hero (Three.js / R3F)
- P2: Bilingual (ID/EN) toggle with i18next
- P2: Blog / Insights section
