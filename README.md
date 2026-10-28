# The Family Almanac

Landing page and downloads for The Family Almanac, a printable and fillable home-management guide for busy families.

Built with React, Vite, TypeScript and Tailwind. Motion uses GSAP + ScrollTrigger and Lenis smooth scroll, and the hero background is a Three.js "cocoa silk" shader.

## Deploy on Netlify
`netlify.toml` holds all the settings: build with `npm run build`, publish `dist/`, Node 20. Leave the build fields in the Netlify UI blank.

- **Email capture:** Netlify Forms, form name `signup`. The hidden form in `index.html` registers it at deploy time. Turn on email alerts under **Forms → Form notifications**.
- **Share links:** OG and Twitter tags use Netlify's `URL` build variable, so they point at the live address.

## What's where
| Path | What it is |
|---|---|
| `src/` | The landing page (sections, components, motion) |
| `public/The-Family-Almanac.pdf` | The 70-page printable PDF that visitors download |
| `public/family-almanac.html` | The fill-online version, also served at `/app` |
| `public/previews/` | Page images in WebP, 640px and 1100px wide |
| `public/og.jpg`, `favicon*`, `icon-*`, `site.webmanifest` | Share image, favicons and app icons |

## Develop
```bash
npm install
npm run dev
```
Add `?motion=off` to the URL to see the static version with every section fully visible. The page behaves the same way for visitors who have reduced motion turned on.
