<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Run dev server at localhost:3000
npm run build      # Build for production
npm run deploy     # Build and deploy to GitHub Pages
npm test           # Run tests in watch mode
```

## Architecture

This is a wedding website built with React 19, Tailwind CSS, and Framer Motion. It's a single-page scrolling site deployed to GitHub Pages.

### Key Files

- **`src/data/storyContent.js`** - Central data file containing all wedding content (names, dates, venue, RSVP messages, gallery images). Edit this to update wedding information.
- **`src/components/Navigation.jsx`** - Sticky nav with live countdown timer. Dynamically changes colors to match each section on scroll. Also updates CSS variables for scrollbar theming.
- **`src/index.css`** - Global styles with CSS variables for dynamic scrollbar/selection colors.

### Section Components

All sections use `ScrollSection` wrapper for scroll-triggered animations. Each section has its own color theme that the Navigation detects and adapts to.

Flow: Hero → Story → Bride → Groom → Journey → Gallery → Proposal → Celebration → Details → RSVP

### RSVP Integration

`RSVPSection.jsx` submits form data to a Google Apps Script endpoint. The Google Sheet columns are:
- name, email, phone, attending, essay, timestamp

### Images

Place images in `/public/`:
- `hero-bg.jpg` - Landing page background
- `bride.jpg` - Bride section photo
- `groom.jpg` - Groom section photo
- Gallery images in `/public/gallery/` (configure in storyContent.js)

### Dynamic Theming

The Navigation component updates CSS custom properties (`--scrollbar-track`, `--scrollbar-thumb`, etc.) as users scroll through sections, creating a cohesive color experience throughout the site.
