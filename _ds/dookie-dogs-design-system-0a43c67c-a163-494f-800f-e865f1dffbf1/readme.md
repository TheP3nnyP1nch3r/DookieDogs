# Dookie Dogs — Design System

Brand + UI system for **Dookie Dogs®**, a local, family-owned **dog waste removal (poop-scooping) service** in **Bowling Green, KY** and surrounding areas. Reliable, no contracts, pet-friendly, year-round service.

> "They're #1 at taking care of your #2."

## Sources used to build this system
- **Live website:** https://www.dookiedogs.com (Wix site) — homepage copy, structure, tone, testimonials, service tiers.
- **Uploaded brand assets** (in `uploads/`): logo files (`DD-LOGO.png/.gif/.mp4`, variants), the yellow "FREE INITIAL CLEANUP" ad, product photos (yellow scoop bucket, bags, picker), team/owner photos, technician photos, promo video (`General AD-Dookie Dogs.mp4`).
- **Owner:** Ty (270-645-1321). Contact: 270-266-1818 · dookiedogs.lcc@gmail.com. Owners: **Ty, Kaitlyn, and Lawson.**
- No codebase or Figma was provided — this is a **from-scratch brand system** derived from the site + assets. No component inventory existed, so a **standard, brand-fitted set** was authored (see Components).

---

## CONTENT FUNDAMENTALS — how Dookie Dogs talks

**Voice:** friendly, plain-spoken small-town, cheeky. Confident but never corporate. Leans into tasteful poop puns as a brand device — the humor IS the differentiator.

- **Person:** speaks to "**you**" (the customer); the company is "**we / us**". Owner story uses first-person "I".
- **Casing:** **Headlines are UPPERCASE and bold** (echoing the logo). Body is sentence case.
- **Tone words:** simple, quick, hassle-free, worry-free, dependable, family, clean yard.
- **Signature puns / lines (reuse these):**
  - "They're #1 at taking care of your #2."
  - "Ready to Ditch the Dookie?"
  - "We're Dookie-Free and living the dream."
  - "So Simple, You'll Wish You Hired Us Sooner"
  - "Rain or Snow? No Problem!"
- **CTAs are direct verbs:** *Instant Quote · Get Started · Call Now · Free Estimate · Book Your Cleanup · Contact Us*. Short. Action-first.
- **Proof, stated plainly:** "Bowling Green's #1 Pooper Scooper Service", "Trusted in 34+ Yards", "5-star", named testimonials ("- Julie E.").
- **Emoji:** essentially none in body copy. The "#1 / #2" pun does the playful work instead. Don't sprinkle emoji.
- **Local pride:** Bowling Green, KY is named constantly — locality is a selling point.

**Micro-examples**
- Eyebrow: `BOWLING GREEN, KY`
- Headline: `BOWLING GREEN'S #1 POOPER SCOOPER SERVICE`
- Sub: `Fast service. Easy signup. No contracts.`
- Button: `Instant Quote`

---

## VISUAL FOUNDATIONS

**Color.** A two-color world: **brand yellow `#FEC800`** + **near-black ink `#171512`** on warm white/paper. Yellow is the hero — full-bleed yellow fields, yellow buckets, yellow logo. Black does the typography and hard accents. Neutrals are *warm* (paper `#FBF9F4`, sand `#F1ECE1`) not cool gray. Support colors (grass green, amber stars) appear only from real content (clean-yard cue, review stars). See `tokens/colors.css`.

**Type.** Big, bold, condensed, **UPPERCASE** display — the logo is a custom heavy-condensed, right-slanted wordmark. Display substitutes **Anton** (skewed ~-6° for hero marks to echo the tilt); body/UI is **Archivo** (warm grotesque, weights 400–800). Headlines are tight (leading ~0.92) and loud; body is comfortable (1.6). See `tokens/typography.css`. **Substitution flagged** — real logo font not provided.

**Backgrounds & motif.** Alternating **solid yellow ↔ white/paper** section blocks (max 1–2 bg colors per view). Signature motif: a **torn / rough paper edge** dividing a yellow block from white (seen on the ad). Photography is **real, warm, outdoor** — happy dogs, green yards, the yellow bucket, the owners in black tees. No stock-cool blue grading; warm and sunny. No gradients, no glows.

**Shape & depth.** Friendly rounded corners (buttons pill/rounded `999px`/`20px`; cards `12–20px`). Two shadow ideas: (1) soft warm ambient shadows for cards; (2) a **signature hard "sticker" shadow** — solid offset, no blur (`4px 4px 0 ink`) — for stickers/badges/CTAs that should feel bold and physical. Borders are hairline warm (`#E4DED2`) or a confident 2px ink outline.

**Animation.** Restrained and snappy. Fades + short rises on scroll; buttons use a small **bounce** ease on hover/press. Press = slight shrink + shadow collapse (the sticker "presses down"). Respect `prefers-reduced-motion`.

**Interaction states.**
- Hover (yellow button): darken to `--dd-yellow-deep`.
- Hover (ink button): lighten slightly / lift.
- Press: `translate(2px,2px)` and collapse the sticker shadow; or `scale(0.98)`.
- Focus: 2px ink focus ring (`--focus-ring`), high contrast.

**Layout.** Centered `1200px` container; text measure `~720px`. Generous vertical rhythm between full-bleed section blocks. Sticky top nav with the logo + a single yellow "Instant Quote" CTA. Transparency/blur used rarely (maybe a subtle scrolled-nav backdrop) — this brand is opaque and bold, not glassy.

---

## ICONOGRAPHY

Dookie Dogs has **no proprietary icon set**. The site is photo-led with minimal iconography (a location pin, review stars, a few simple marks). Approach for this system:

- **Primary "icons" are photography** — real dogs, the yellow bucket, yards. Prefer a photo to an icon when possible.
- **Line/solid glyphs:** use **Lucide** (CDN) as the substitute icon set — clean, rounded, friendly stroke that matches the brand's approachable feel. **This is a substitution (flagged)** since no brand icon font was provided. Load via CDN: `https://unpkg.com/lucide@latest`. Keep stroke ~2px, color `--dd-ink` (or black on yellow).
- **Stars** for reviews use amber `--dd-star`.
- **No emoji** as UI icons. No hand-drawn custom SVG mascots (none exist in the brand).
- A location **pin** in yellow appears in brand assets (`uploads/DD-LOGO (8).png`) — reserved for map/location use.

The **`Icon` component** wraps Lucide names for consistent sizing/color.

---

## INDEX — what's in this folder

- **`styles.css`** — global entry point (import this). `@import`s only.
- **`tokens/`** — `colors.css`, `typography.css`, `spacing.css` (spacing + radius + shadow + motion), `fonts.css`.
- **`assets/`** — `logo-wordmark.png`, `ad-hero.png`, `team-owners.jpg`, `technician.jpeg`, `full-bucket.png`, `picker-bucket.png` (hero action shot), `bags-bucket.jpeg`, `products.png`. (An AI-cartoon `Pickup.webp` from the uploads was rejected — real photography only.)
- **`guidelines/`** — foundation specimen cards (Type, Colors, Spacing, Brand) for the Design System tab.
- **`components/`** — reusable React primitives (see below).
- **`ui_kits/website/`** — full homepage recreation (hero + sections), interactive.
- **`SKILL.md`** — Agent-Skills-compatible entry for downloading/reusing this system.

### Components (planned/authored)
`Button`, `IconButton`, `Badge`, `Card`, `Input`, `Icon` (Lucide wrapper), plus brand-composite cards: `ServiceCard` (Weekly/Bi-Weekly/Custom tiers), `TestimonialCard`, `StepCard` ("how it works").

### Fonts note
Fonts load via Google Fonts `@import` (Anton + Archivo). Consumers need internet, or self-host the `.woff2` in `assets/fonts/` and convert to `@font-face`. Flagged for the owner.
