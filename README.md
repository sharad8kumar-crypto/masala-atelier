# Masala Atelier

A premium restaurant / cafe website built as a portfolio concept project.
All names, dishes, prices and reviews are sample content.

**Live demo:** https://YOUR-LIVE-LINK.vercel.app

## Features

- Editorial, photo-led design with script + serif typography
- Scroll storytelling (GSAP ScrollTrigger), smooth scrolling (Lenis), Motion animations
- Full menu with search, veg / non-veg / spicy filters and dish dialog
- Cart with WhatsApp order message (zustand, safe localStorage persistence)
- Reservation form with Indian mobile validation, closed-day and time-slot checks (IST)
- Live "Open now" badge, gallery lightbox, mobile bottom action bar
- SEO: metadata, Open Graph image, sitemap, robots, Restaurant JSON-LD
- Accessibility: skip link, labelled forms, visible focus, reduced-motion support

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · GSAP · Lenis · zustand · sonner · lucide-react

## Run locally

    npm install
    npm run dev

## Production check

    npm run lint
    npm run build
    npm run start

## Lighthouse (mobile, production build)

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| __ | __ | __ | __ |

## Notes

- Restaurant details live in `data/site.ts`, the menu in `data/menu.ts`.
  Change them (and the colour tokens in `app/globals.css`) to reuse this for another client.
- Food photos from Unsplash and Pexels.