# VISUAL_STYLE.md — Look, Layout & Audio

> Encodes the AI Odd Couple house style. The HyperFrames template must conform to this file. Concrete values below are the approved defaults; change them only by updating this file and `APPROVED_ASSETS.md`.

---

## 1. Canvas & aspect

- **Resolution:** 1080 × 1920 (9:16 vertical).
- **Frame rate:** 30 fps.
- **Final duration:** 28–32 seconds (standard episode); ~15s for the series intro.
- **Safe areas:** keep faces and captions clear of the top 12% and bottom 14% (platform UI). Captions live in the lower third but above the bottom-14% guard.

## 2. Character placement & scale

- **Alternating close-ups** are the default. Both-on-screen only via split-screen for the designated interaction/reaction.
- **Milo:** screen **left**, looking right. **Gladys:** screen **right**, looking left. Keep this consistent so viewers subconsciously track who's who.
- Head size consistent across cuts (eyes land roughly on the upper-third line). No jarring scale jumps between clips.
- Split-screen: clean vertical divider, 50/50, Milo left / Gladys right.

## 3. Backgrounds

- Default: the approved podcast studio — dark acoustic-foam walls, glowing red **ON AIR** sign, broadcast mics, mixing boards, water bottles, warm overhead key light.
- Background stays consistent episode to episode. Supporting graphics (diagrams, Milo's "MS Paint" drawings) appear as overlays, not background swaps.

## 4. Color palette

| Role | Name | Hex | Use |
|------|------|-----|-----|
| Milo primary | Bulls Red | `#CE1141` | Milo lower-third, his caption accents |
| Milo pop | Energy Orange | `#FF6B35` | highlights, emphasis on his words |
| Gladys primary | Lavender | `#9B7EBD` | Gladys lower-third, her caption accents |
| Gladys soft | Cardigan Lilac | `#C9B8E0` | soft fills, her graphic backgrounds |
| Studio base | Charcoal | `#1C1C20` | bars, dividers, title backplates |
| Light | Warm Cream | `#FBF7F0` | text on dark, title cards |
| Accent | On-Air Red | `#E63946` | CTA flashes, "ON AIR" callbacks |
| Caption text | White | `#FFFFFF` | spoken-word captions (with shadow) |

**Color-coding rule:** Milo's lower-third and his caption underline use red; Gladys's use lavender. This is a core readability device — keep it.

## 5. Typography

- **Captions / subtitles:** Montserrat ExtraBold. Large, mobile-readable, white `#FFFFFF` with a 4px black drop shadow + subtle outline.
- **Title cards / episode title:** Poppins Bold (Cream on Charcoal backplate).
- **Lower thirds (names):** Montserrat Bold — "MILO" in red plate, "GLADYS" in lavender plate.
- Both families are open-source (SIL OFL) — safe for commercial use. Do not substitute without updating `APPROVED_ASSETS.md`.

## 6. Captions (burned in by HyperFrames)

- **Always on.** Most viewers watch muted.
- Word-for-word match to spoken dialogue (QA-checked).
- 1–3 words highlighted per phrase in the speaker's accent color for emphasis/karaoke feel.
- Max ~2 lines on screen at once; never cover a character's face.
- 1–2 emoji per caption card maximum, for personality (😂 💀 🤖 ⬇️). Don't overdo it.

## 7. Lower thirds & graphics

- Name lower-third appears briefly on each character's first line per episode.
- Concept graphics (diagrams, Milo's deliberately-bad "MS Paint" sketches, Gladys's recipe cards) slide in during the 16–24s explanation beat, then out.
- Logo bug: small, top-left or top-right, persistent, low opacity (~70%).

## 8. Intro / outro

- **Intro sting:** ~1.5–2s branded open (logo + quick musical stinger). Consistent every episode.
- **Outro:** ~2s — logo lockup + the chosen CTA caption. Music fades to silence over the final ~2s on the closing point/freeze.
- The standalone ~15s series intro/trailer is a separate asset (see production guide §15).

## 9. Transitions & motion

- Restrained. Hard cuts between dialogue turns; an occasional quick whoosh or punch-in for comedic timing.
- One light "punch-in" zoom on a punchline is fine; avoid constant motion.
- Reaction inserts (silent): Gladys cleaning glasses, Milo's jaw-drop, Mr. Whiskers cameo — used for timing, max one per episode.

## 10. Audio levels

- **Music:** upbeat lo-fi hip-hop, ~100–115 BPM. Ducked to ~20% under dialogue; up to ~80% on title cards / intro / outro.
- **Dialogue:** always the priority; must be fully intelligible.
- **SFX:** sparing — pop/whoosh on transitions, optional record-scratch when Milo derails, a soft "ding" on a Gladys wisdom beat. Only from the approved SFX library.
- **Music fade:** to silence over the last ~2 seconds.

## 11. Running visual gags (use ≤1 per episode)

- Gladys cleaning her glasses when confused.
- Mr. Whiskers (hamster) cameo in the background.
- Harold's portrait on the wall "reacting."
- The 40%-miss high-five.

Pick at most one so the single concept stays the star.

## 12. Don'ts

- No background swaps mid-episode.
- No scale/eyeline jumps between cuts.
- No captions over faces or inside the platform-UI guards.
- No more than one primary split-screen per episode.
- No unapproved fonts, colors, music, or SFX.

---

*Companion: `APPROVED_ASSETS.md` (exact file paths + status), `SERIES_BIBLE.md` (structure & tone).*
