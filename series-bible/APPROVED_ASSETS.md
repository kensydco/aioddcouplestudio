# APPROVED_ASSETS.md — Approved Asset & ID Registry

> The single registry of everything the agent is allowed to use. If an asset isn't here with status **APPROVED**, the agent may not use it. Verify this registry during Phase 1 (Intake & readiness) of every episode.
>
> **Status legend:** ✅ APPROVED (locked, ready) · 🟡 PENDING (must be supplied/verified before production) · ⛔ DO NOT USE.

---

## 1. Provider identities (locked) ✅

| Character | HeyGen Avatar ID | Voice ID | Speed | Status |
|-----------|------------------|----------|-------|--------|
| **Milo** | `e9a00cac1e934e6f80bd550fd2803d10` | `F08jhUNBtlE8Gs2Bnrj1` | 1.15× | ✅ |
| **Gladys** | `5917b84d9e224e46918a61245456efbe` | `fb0de32da8c4499f9b6e27245b8794c1` | 0.92× | ✅ |

These are the **only** approved character identities. Never regenerate from text prompts. Never substitute.

## 2. Character reference images

| Asset | Path | Status |
|-------|------|--------|
| Milo reference set | `assets/characters/milo/` | 🟡 populate from the approved studio image + any approved looks |
| Gladys reference set | `assets/characters/gladys/` | 🟡 populate from the approved studio image + any approved looks |
| Original brand studio still | `assets/characters/AI_Odd_Couple.webp` | ✅ canonical look reference |

> The HeyGen avatars are the source of truth for likeness; these images are for human QA reference and drift-checking.

## 3. Backgrounds

| Asset | Path | Status |
|-------|------|--------|
| Script-specific generated backgrounds | `assets/backgrounds/generated/` | ✅ required per episode |
| Podcast studio (default) | `assets/backgrounds/studio.png` | ⛔ DO NOT USE |
| Studio (split-screen variant) | `assets/backgrounds/studio-split.png` | 🟡 optional |

## 4. Branding

| Asset | Spec | Path | Status |
|-------|------|------|--------|
| Logo (primary) | retained archive asset; prohibited in episodes | `assets/branding/logo.png` | ⛔ |
| Logo bug (corner) | retained archive asset; prohibited in episodes | `assets/branding/logo-bug.png` | ⛔ |
| Intro sting | ~1.5–2s, 1080×1920 | `assets/branding/intro.mp4` | 🟡 |
| Outro lockup | ~2s, 1080×1920 | `assets/branding/outro.mp4` | 🟡 |
| Color palette | see `VISUAL_STYLE.md` §4 | — | ✅ |

## 5. Fonts (open-source, commercial-safe) ✅

| Use | Font | License | Status |
|-----|------|---------|--------|
| Captions / lower thirds | Montserrat (Bold / ExtraBold) | SIL OFL | ✅ |
| Titles | Poppins (Bold) | SIL OFL | ✅ |

Place font files in `assets/branding/fonts/`. Do not substitute without updating this file.

## 6. Music

| Track | Mood | BPM | License | Path | Status |
|-------|------|-----|---------|------|--------|
| Episode bed | retained archive asset; prohibited in episode production | supplied by founder | do not use | `assets/music/episode-bed.mp3` | ⛔ |

> Music is prohibited in episode production. Sound effects remain allowed.

## 7. Sound effects

| SFX | Use | Path | Status |
|-----|-----|------|--------|
| Pop / whoosh | transitions | `assets/sound-effects/whoosh.wav` | 🟡 |
| Record scratch | Milo derails | `assets/sound-effects/scratch.wav` | 🟡 |
| Soft ding | Gladys wisdom beat | `assets/sound-effects/ding.wav` | 🟡 |
| Mic tap | intro hit (optional) | `assets/sound-effects/mic-tap.wav` | 🟡 |

## 8. Template

| Asset | Path | Status |
|-------|------|--------|
| HyperFrames episode template | `templates/ai-odd-couple-episode/` | 🟡 build once, conform to `VISUAL_STYLE.md` |

## 9. Environment / runtime (verify in Phase 1)

| Dependency | Requirement | Status |
|------------|-------------|--------|
| HeyGen account access | API key in `HEYGEN_API_KEY` env var | 🟡 verify |
| Episode background URL | public URL for a script-specific generated background | 🟡 required per production request |
| HyperFrames | `0.6.95`; lint and validate verified | ✅ |
| Node.js | `24` in GitHub Actions | ✅ |
| FFmpeg | installed by GitHub Actions workflow | ✅ |
| Output storage | GitHub Actions artifacts, retained 30 days | ✅ |

> **Do not claim the workflow is production-ready until every 🟡 above is verified and flipped to ✅.** Credentials live in environment variables only — never in this file or any episode artifact.

## 10. Change log

| Date | Change | By |
|------|--------|----|
| 2026-06 | Initial registry created; provider IDs locked | — |
| 2026-06-13 | Approved supplied background, logos, theme song, and hosted runtime route | Codex |
| 2026-06-13 | Prohibited music and intro/outro; required animated interaction scene; capped full-screen educational graphics at 8 seconds | Codex |
| 2026-06-13 | Replaced Milo avatar; prohibited standard background and logos; limited mouth movement to speaking characters; required script-specific generated backgrounds | Codex |

---

*Companion: `VISUAL_STYLE.md` (how assets are used), `SERIES_BIBLE.md` (rules).*
