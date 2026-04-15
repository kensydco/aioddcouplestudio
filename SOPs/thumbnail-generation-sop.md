# Thumbnail Generation SOP — AI Odd Couple Studio

**Version:** 1.0  
**Owner:** Visual_Director  
**Reviewed by:** Publishing_Manager, ChiefOfStaff  
**Last Updated:** 2026-04-14

---

## Overview

This SOP defines the brand style guide, platform-specific thumbnail specifications, composition templates, and generation workflow for all AI Odd Couple Studio thumbnails. Thumbnails are used primarily for YouTube Shorts covers and any platform that supports custom cover images.

---

## Brand Style Guide

### Color Palette

| Color | Hex | Usage |
|---|---|---|
| Bulls Red | `#CE1141` | Primary accent, borders, CTA elements |
| Deep Black | `#1A1A1A` | Background base |
| Warm White | `#F5F5F0` | Text, Gladys's setting tones |
| Lavender Soft | `#C8A8D8` | Gladys accent color |
| Gold Highlight | `#FFD700` | Emphasis text, star/sparkle elements |
| Sky Blue | `#4A9EDB` | Tech/AI visual elements |

### Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| Main Title | Impact or Bebas Neue | 72–96pt | Bold |
| Subtitle / Reaction | Open Sans | 36–48pt | Bold |
| Episode Number | Roboto Mono | 24pt | Regular |

**Text Rules:**
- All caps for main title
- Maximum 6 words on thumbnail
- White text with black stroke (3–4px) for readability on any background
- Never use more than 2 font sizes on one thumbnail

### Visual Style

- High contrast — thumbnails must read at 120px width
- Milo and Gladys should appear together whenever possible
- Exaggerated expressions preferred (surprise, confusion, delight)
- Avoid cluttered backgrounds — use solid color or blurred scene
- AI/tech elements: circuit patterns, chat bubbles, robot icons (minimal)

---

## Platform Specifications

| Platform | Thumbnail Size | Format | Notes |
|---|---|---|---|
| YouTube Shorts | 1080 × 1920 | JPG/PNG | Cover frame; custom upload supported |
| YouTube Standard | 1280 × 720 | JPG/PNG | For any long-form content |
| TikTok | 1080 × 1920 | JPG | Cover frame only; limited custom support |
| Instagram Reels | 1080 × 1920 | JPG/PNG | Cover frame; custom upload supported |

**File Size:** Under 2MB for all platforms  
**Color Space:** sRGB  
**Resolution:** 72 DPI minimum (150 DPI preferred)

---

## Composition Templates

### Template A: Split Reaction

**Layout:** Milo (left, 40%) + Gladys (right, 40%) + Text overlay (center/bottom 20%)

```
┌─────────────────────────────┐
│  MILO  │  TEXT   │  GLADYS  │
│ (😄)   │ "WAIT   │  (😱)    │
│        │  WHAT?" │          │
│        │         │          │
│  [Episode tag bottom-left]  │
└─────────────────────────────┘
```

**Best for:** Reaction episodes, "Gladys discovers X" episodes

---

### Template B: Milo Explains

**Layout:** Milo (center, large) + AI concept visual (background) + Text overlay (top)

```
┌─────────────────────────────┐
│  "CHATGPT IS LIKE..."       │
│                             │
│        [MILO large]         │
│         (pointing)          │
│                             │
│  [AI visual element bg]     │
└─────────────────────────────┘
```

**Best for:** Concept explanation episodes, "Milo teaches" episodes

---

### Template C: Gladys Skeptic

**Layout:** Gladys (center, large) + Skeptical expression + Bold question text

```
┌─────────────────────────────┐
│  "IS AI GOING TO            │
│   STEAL MY RECIPES?"        │
│                             │
│        [GLADYS large]       │
│        (suspicious look)    │
│                             │
│  [Milo small, bottom-right] │
└─────────────────────────────┘
```

**Best for:** "Gladys asks" episodes, myth-busting episodes

---

## Generation Workflow

### Step 1 — Select Template
Based on episode type, select Template A, B, or C from above.

### Step 2 — Source Character Images
- Use HeyGen-generated stills from the episode OR
- Use reference images from `assets/avatars/Milo.png` and `assets/avatars/Gladys.png`
- Select frames with strong, readable expressions

### Step 3 — Generate with AI Tool
Submit to image generation tool (DALL-E, Midjourney, or Canva) with this prompt structure:

```
Thumbnail for YouTube Shorts. [Template description]. 
Characters: [Milo description] and/or [Gladys description].
Text overlay: "[TITLE TEXT]" in bold white Impact font with black stroke.
Color palette: deep black background, Bulls red accents, gold highlights.
Style: high contrast, bold, readable at small size.
Aspect ratio: 9:16.
No watermarks. Clean edges.
```

### Step 4 — Apply Brand Overlay
In Canva or editing tool:
1. Add episode number tag (bottom-left): `AIO-EP-XXX` in Roboto Mono
2. Verify text has black stroke
3. Check readability at 120px width (zoom out test)
4. Export at correct platform dimensions

### Step 5 — Quality Check
- [ ] Readable at 120px width
- [ ] Max 6 words of text
- [ ] Both characters visible (Template A) or single character prominent (B/C)
- [ ] Brand colors present (red, black, white minimum)
- [ ] Episode number tag present
- [ ] No copyrighted logos or marks
- [ ] File under 2MB

---

## Escalation

If generated thumbnail fails quality check, regenerate with adjusted prompt. Note which element failed (readability, composition, brand colors) and adjust prompt accordingly. After 2 failed attempts, escalate to Visual_Director with the failing images and issue description.
