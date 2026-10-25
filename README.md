# Sulaiman Oorakam — portfolio

An editorial static portfolio in HTML, CSS and vanilla JavaScript. No framework, npm, build process, external font requests, tracking, or runtime CDN dependency.

## Open in VS Code
1. Extract this folder.
2. Open the folder in VS Code.
3. Open `index.html` using the Live Server extension, or run `python -m http.server 8000` in this folder and visit http://localhost:8000. Double-clicking index.html also works for the supplied static content.
4. Deploy this entire folder as a static site. The root entry point is index.html. No build command is needed.

## File guide
- `index.html`: biography, sections, links, search metadata.
- `styles.css`: design tokens, layouts, responsive rules, animation, reduced-motion support.
- `content.js`: your videos and gallery entries.
- `script.js`: mobile menu, media tabs, accessible media dialog and reveal animation.
- `assets/`: local portrait, favicon, and media folders.
- `SOURCES.md`: research provenance, attribution and facts requiring review.

## Add photos and videos
Place your files in `assets/gallery/` or `assets/videos/`, then edit the arrays in content.js. Examples are documented at the top of that file. Use straight quotes, a comma between entries, and valid JavaScript syntax. No server or upload dashboard is needed; update files and redeploy.

Gallery example:
```js
gallery: [
  { title: "Education event", src: "assets/gallery/event.webp", alt: "Sulaiman speaking at an education event", description: "Add the confirmed event name and date" }
]
```
Video example:
```js
videos: [
  { title: "Career conversation", type: "mp4", src: "assets/videos/talk.mp4", poster: "assets/gallery/talk.webp", description: "Add an accurate description" }
]
```
YouTube example: set `type: "youtube"` and `src: "https://www.youtube.com/watch?v=YOUR_11_CHARACTER_ID"`. YouTube loads only after a visitor selects a configured video. Self-hosted videos load on selection. Gallery images are lazy-loaded; a dialog supports Escape, a close button, and native focus containment. Tab buttons are category filters.

Instagram Reel example: set `type: "instagram"` and `src` to a public Reel URL such as `https://www.instagram.com/reel/REEL_ID/`. The Reel embed loads only after a visitor selects the video. Instagram must allow embedding for the Reel to play.

## Replace the portrait
Replace `assets/sulaiman-oorakam.jpg` with an approved portrait. Keep the same filename, or update index.html. The hero crop uses `object-position: 50% 30%` in styles.css. Adjust for a new photograph. Use WebP, ideally under 150 KB.

## Before going live
Review copy and portrait usage with Sulaiman. Add his confirmed direct contact details if wanted; current contact links go to his supplied public profiles and company website. No contact form claims to submit messages. Set your final domain's canonical URL and absolute social-share image URL in index.html after choosing the deployment domain. No invented qualifications, personal phone numbers, testimonials, dates of employment, or achievement counters are included. Supporting marketing language is drafted copy for approval.

## Performance & accessibility
System fonts; no libraries; local optimized portrait; CSS line graphics; deferred JavaScript; lazy media; responsive layout; keyboard focus indicators; skip link; reduced-motion preference; native dialog. No autoplay video or background downloads. Load speed depends on hosting and any media added later.

## Deployment
Upload the folder contents to any static host (e.g. an existing cPanel public_html directory). Preserve relative paths and filename casing. HTTPS should be enabled at your host. The site needs no environment variables or backend. Do not upload SOURCES.md and README.md if you prefer those to stay private.

## Revised visual direction
Aubergine #24202b, parchment #f1eee7, brass #d7c5a5 and oxblood #693d48. No emoji icons, headline slogans, counters, rotating badges, external fonts or UI dependencies. Navigation icons are drawn in CSS.
