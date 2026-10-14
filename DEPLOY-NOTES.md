# Dookie Dogs — Deploy Notes (this build)

Static, no-build multi-page site for GitHub → Cloudflare Pages. Root = this folder; each page lives at `/slug/index.html` for clean URLs (`/franklin`, `/instantquote`, etc). Cloudflare Pages serves these natively — no build step required. If Cloudflare's build settings ask for a build command, leave it blank and set the output directory to `/`.

## What's real
- `/`, `/franklin`, `/alvaton`, `/auburn`, `/plano`, `/rockfield`, `/woodburn`, `/instantquote`, `/faq`, `/plans-pricing`, `/commercial`, `/near-you`, `/freequote`, `/freescoop`, `/referral`, `/cashreferral`, `/privacy-policy`, `/terms`, `/blog` (index only) exist with per-page SEO metadata (title/description/canonical/OG) matching `07-priority-seo-copy.csv`.
- `_redirects` implements every 301 in `06-proposed-redirects.txt` (Cloudflare Pages reads this file automatically from the root).
- `robots.txt` + `sitemap.xml` list every indexable KEEP route. Woodburn is indexable (no noindex) and its ZIP (42170) is now recognized by the quote engine — it was missing from `quote-flow-v3.jsx`'s ZIP table, which would have silently rejected real Woodburn leads. Fixed.
- Pricing is correct everywhere: $20.77 weekly / $37.13 biweekly / $7.50 per additional dog / $50 typical reset, phone required before price, 5+ dogs or 1+ acre triggers a custom quote.
- Contact info corrected sitewide: 270-266-1818, dookiedogs.llc@gmail.com.

## What's still a stub (next phase)
- **No real build tooling.** This is static HTML/CSS, not the Astro architecture the brief specifies. It works fine on Cloudflare Pages as static files, but there's no framework, no content collections, no React-free SSR for the quote form — `/instantquote` still loads React/Babel/Lucide from public CDNs at runtime, which the brief explicitly says not to ship to production.
- **No lead backend.** `assets/quote-globals.js` has `SHEET_ENDPOINT` blank — leads only console-log (preview mode). The Cloudflare Pages Function, Google Apps Script, new Google Sheet, and webhook secret in `03-google-sheets-and-quote-system.md` are not built.
- **No analytics wiring** (GA4/Meta pixel IDs blank, no dataLayer events beyond console logging).
- **Blog is an index page only** — links to all 26 real post slugs (preserving SEO equity) but none of the post pages/content have been migrated yet from `source/extracted-content/`.
- **City pages** have unique, non-fabricated copy per the brief's rules, but do not include real testimonials (none were verified as city-specific — the brief prohibits fabricating those).
- Stripe checkout links (`STRIPE_LINKS`) are still empty.

## Before going live
Work through `docs/05-launch-checklist.md` in the original handoff package — most boxes need the backend/analytics work above before they can be checked.
