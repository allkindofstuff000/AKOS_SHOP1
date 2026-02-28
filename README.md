# AKOSSHOP

Standalone frontend-first marketing website built with Next.js 14 + TypeScript + TailwindCSS + Framer Motion.

## Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- lucide-react icons
- next/image and HTML5 video

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` Home page
- `/services` Services page
- `/contact` Contact page
- `/admin` Placeholder page

## Assets

All media is in `public/assets/`:

- `logo.png`
- `IP.mp4`
- `sales-accounts.jpg`
- `megaboostv1.png`

Site icon: `app/icon.png`

## Data Architecture (Future Backend Ready)

The UI maps from `app/lib/services.ts`, which mimics API response shape.

Each service object includes:

- `id`
- `title`
- `tagline`
- `description`
- `features[]`
- `priceText`
- `availableCount`
- `mediaType`
- `mediaSrc`
- `ctaText`

When connecting Node.js + Express + MongoDB Atlas + Admin CMS later, swap static service data for API fetches without rewriting UI components.

## Frontend Features

- Maroon/black neon aesthetic
- Glass blur navbar with pulsing online badge
- Animated glow blobs and gradient motion background
- Staggered page-load and scroll reveal animations
- Hover lift + glow and tilt effect on cards
- Button shine animation
- Animated availability counters
- Fully responsive layout
