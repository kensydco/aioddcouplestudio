# VISUAL_STYLE.md — Look, Layout & Audio

> Encodes the AI Odd Couple house style. The HyperFrames template must conform to this file. Concrete values below are the approved defaults; change them only by updating this file and `APPROVED_ASSETS.md`.

---

## 1. Canvas & aspect

- **Resolution:** 1080 × 1920 (9:16 vertical).
- **Frame rate:** 30 fps.
- **Final duration:** 28–45 seconds.
- **Safe areas:** keep faces and captions clear of the top 12% and bottom 14% (platform UI). Captions live in the lower third but above the bottom-14% guard.

## 2. Character placement & scale

- **Alternating close-ups** are the default. For the designated interaction, keep the speaking character full-frame and show the listener as a static picture-in-picture.
- At least one scene must visibly show Milo and Gladys together.
- Only the speaking character may have mouth movement. The listening character must use a static picture-in-picture in the interaction scene.
- **Milo:** screen **left**, looking right. **Gladys:** screen **right**, looking left. Keep this consistent so viewers subconsciously track who's who.
- Head size consistent across cuts (eyes land roughly on the upper-third line). No jarring scale jumps between clips.
- Interaction picture-in-picture: static listener opposite the speaking character, kept clear of faces and captions.

## 3. Backgrounds

- Default: one character-free generated background based on the approved episode script.
- Generate one character-free background from the approved script before each episode and use it consistently throughout that episode.

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
- Full-screen educational graphics that replace the characters may total no more than **8 seconds** per episode. Default to zero seconds.
- Graphics overlaid while animated characters remain visible do not count toward the 8-second limit.
- Do not display a logo or logo bug.

## 8. Intro / outro

- No standalone intro or outro until the episode format is refined.
- Start immediately with animated character action.
- End on the final animated character line, which carries the CTA when requested.

## 9. Transitions & motion

- Restrained. Hard cuts between dialogue turns; an occasional quick whoosh or punch-in for comedic timing.
- One light "punch-in" zoom on a punchline is fine; avoid constant motion.
- Reaction inserts (silent): Gladys cleaning glasses, Milo's jaw-drop, Mr. Whiskers cameo — used for timing, max one per episode.

## 10. Audio levels

- **Music:** prohibited.
- **Dialogue:** always the priority; must be fully intelligible.
- **SFX:** sparing — pop/whoosh on transitions, optional record-scratch when Milo derails, a soft "ding" on a Gladys wisdom beat. Only from the approved SFX library.

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
- No music.
- No more than 8 seconds of full-screen educational graphics that replace the characters.
- No episode without at least one Milo-and-Gladys interaction scene.

---

*Companion: `APPROVED_ASSETS.md` (exact file paths + status), `SERIES_BIBLE.md` (structure & tone).*
