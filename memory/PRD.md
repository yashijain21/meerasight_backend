# ClearVision Eye Hospitals - PRD

## Original Problem Statement
Create a website for ophthalmologist inspired by https://sharpsight.in - keep the site design same

## Architecture

### Backend (FastAPI + MongoDB)
- `server.py` — Appointment booking API, Contact API
- Endpoints: POST/GET `/api/appointments`, POST/GET `/api/contacts`

### Frontend (React)
- `App.js` — Main app routing
- `components/Navbar.jsx` — Sticky navbar with logo, nav links, Book Appointment CTA
- `components/HeroCarousel.jsx` — Full-width 3-slide hero carousel
- `components/VisionSection.jsx` — Mission/Vision with feature cards
- `components/AboutSection.jsx` — About story + animated stats counter
- `components/ServicesSection.jsx` — 8 service cards (bento grid)
- `components/TestimonialsSection.jsx` — Auto-scrolling testimonials marquee
- `components/BlogSection.jsx` — 3 blog post cards
- `components/AppointmentSection.jsx` — Appointment booking form
- `components/Footer.jsx` — 5-column footer

## Design System
- Primary Color: `#246B24` (Forest Green - like sharpsight.in)
- Background: `#F8FAF8` (Bone White)
- Text: `#0A1F0A`
- Fonts: Plus Jakarta Sans (headings), Manrope (body)
- Style: Clean, medical professional, white/green theme

## Branding & Contact Info
- Brand: MeeraSight — Expert Eye Care Solutions
- Doctor: Dr. Sonia Sharma
- Address: C5C-14A, Janak Puri, New Delhi
- Phone: +91-11-47092310
- WhatsApp: +91-7428728458
- Email: meerasight@gmail.com
- Hours: Mon–Wed/Fri–Sat 9am–1:30pm, 6–8pm | Sunday 9am–12noon | Thursday: CLOSED
- Colors: Purple #601E8E + Teal #00A8D7

## What's Been Implemented (Date: 2025-05)
- [x] Sticky navbar with top info bar (phone/email/blog links)
- [x] Hero carousel with 3 slides, auto-rotate, prev/next, dots
- [x] Vision/Mission section with 4 feature cards
- [x] About section with animated counters (22+ years, 500K+ surgeries etc)
- [x] Services grid with 8 specialties (Cataract, LASIK, Retina, Glaucoma, Cornea, Pediatric, Dry Eye, Oculoplasty)
- [x] Auto-scrolling testimonials marquee (6 testimonials)
- [x] Blog preview with 3 posts
- [x] Appointment booking form → saves to MongoDB
- [x] 5-column footer with locations, links, social icons
- [x] Fully responsive (mobile/tablet/desktop)
- [x] Framer-motion animations (scroll reveal, stats counter)
- [x] Backend: Appointment & Contact APIs

## Prioritized Backlog

### P0 (Core - Done)
- [x] Homepage with all sections
- [x] Appointment booking form
- [x] Backend API

### P1 (Next Phase)
- [x] Individual service pages (all 10 services with full content)
- [x] WhatsApp floating button
- [x] Calendar-based appointment booking (4-step: service → date/time → details → confirm)
- [x] /api/slots endpoint with opening hours logic (Thursday CLOSED, morning/evening sessions)
- [ ] Admin panel to view/manage appointments
- [ ] Email notifications for appointments (SendGrid/Resend)
- [ ] Blog detail pages

### P2 (Future)
- [ ] Patient portal with login
- [ ] Online payment for consultations
- [ ] Google Maps integration for locations
- [ ] WhatsApp floating chat button
- [ ] Multilingual support (Hindi/English)

## Test Credentials
N/A - No authentication required
