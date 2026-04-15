# HeyGen Visual Prompting SOP — AI Odd Couple Studio

**Version:** 1.0  
**Owner:** Visual_Director  
**Reviewed by:** Canon_Guardian, ChiefOfStaff  
**Last Updated:** 2026-04-14

---

## Overview

This SOP governs all HeyGen avatar video production for AI Odd Couple Studio. Every episode is produced as a split-screen or alternating-avatar short featuring **Milo** and **Gladys**. This document defines character profiles, scene arc structure, prompt templates, settings, and the quality checklist.

---

## Character Profiles

### Milo — The Kid Who Gets It

| Attribute | Specification |
|---|---|
| Age | 10 years old |
| Appearance | Young Black boy, locs with fade, Chicago Bulls jersey |
| Setting | Bedroom desk with Bulls poster, laptop with Bulls sticker |
| Voice Tone | Enthusiastic, patient, slightly proud, never condescending |
| Speech Style | Simple vocabulary, uses analogies, short sentences |
| Emotional Range | Excited → patient → slightly exasperated (when Gladys misses the point) |
| Signature Phrases | "Okay Grandma, think of it like this…", "It's actually really cool!", "No no no, it's not like that" |

**HeyGen Avatar ID:** Upload `assets/avatars/Milo.png` to HeyGen → Custom Avatars → Photo Avatar

---

### Gladys — The Skeptic Who Comes Around

| Attribute | Specification |
|---|---|
| Age | 70s |
| Appearance | White-haired grandmother, pearl necklace, lavender cardigan, reading glasses |
| Setting | Floral armchair, knitting basket, portrait of late husband on wall |
| Voice Tone | Skeptical, slightly suspicious, dry humor, ultimately warm |
| Speech Style | Old-fashioned expressions, misunderstands tech terms literally, asks "why" a lot |
| Emotional Range | Suspicious → confused → resistant → reluctant acceptance → secretly impressed |
| Signature Phrases | "I don't trust anything I can't see", "In my day we used a card catalog", "Well I'll be darned", "Don't tell Harold I said this but…" |

**HeyGen Avatar ID:** Upload `assets/avatars/Gladys.png` to HeyGen → Custom Avatars → Photo Avatar

---

## Scene Arc Structure (Every Episode)

Every episode follows this 5-beat structure within 60–90 seconds:

| Beat | Duration | Description | Speaker |
|---|---|---|---|
| 1. Hook | 0–5s | Gladys says something skeptical/wrong about AI | Gladys |
| 2. Setup | 5–20s | Milo introduces the AI concept being taught | Milo |
| 3. Confusion | 20–45s | Gladys misunderstands; Milo clarifies with analogy | Both |
| 4. Breakthrough | 45–65s | Gladys has an "aha" moment (often misapplied) | Gladys |
| 5. Punchline | 65–90s | Funny misapplication or Gladys's unexpected insight | Both |

---

## HeyGen Prompt Template

Use this template for every script submitted to HeyGen:

```
CHARACTER: [MILO / GLADYS]
SCENE: [Brief scene description — 1 sentence]
EMOTION: [Starting emotion] → [Ending emotion]
PACING: [Slow / Medium / Fast]
EMPHASIS WORDS: [List 3–5 words to emphasize]

SCRIPT:
[Full dialogue for this character's segment]

NOTES FOR AVATAR:
- [Any specific gesture or expression notes]
- [Eye contact: direct to camera or slightly off]
```

### Example — Milo Segment

```
CHARACTER: MILO
SCENE: Milo at his desk, explaining ChatGPT to camera
EMOTION: Excited → Patient
PACING: Medium
EMPHASIS WORDS: "actually", "like", "really", "think", "cool"

SCRIPT:
Okay so ChatGPT is basically like having a really smart friend who's read every book ever written.
You ask it anything — like ANYTHING — and it just… answers.
It's not magic. It learned from tons of text on the internet.
Think of it like… if you read a million books, you'd probably be pretty good at answering questions too, right?

NOTES FOR AVATAR:
- Lean forward slightly on "ANYTHING"
- Direct eye contact throughout
- Small smile when saying "right?"
```

### Example — Gladys Segment

```
CHARACTER: GLADYS
SCENE: Gladys in her armchair, holding her tablet, looking suspicious
EMOTION: Suspicious → Reluctant curiosity
PACING: Slow
EMPHASIS WORDS: "trust", "machine", "Harold", "darned", "see"

SCRIPT:
I don't trust anything I can't see, Milo.
How do I know this ChatGPT isn't just some young person typing real fast on the other end?
In my day, if you wanted to know something, you went to the library. You talked to a PERSON.
…Well. I suppose if it can help me find my reading glasses, I might give it a try.

NOTES FOR AVATAR:
- Slight head tilt on "typing real fast"
- Look slightly off-camera as if speaking to Milo
- Small reluctant smile at the end
```

---

## HeyGen Settings Library

### Recommended Settings Per Character

| Setting | Milo | Gladys |
|---|---|---|
| Voice | Young male, energetic | Older female, warm/dry |
| Speaking Rate | 1.1x | 0.9x |
| Pitch | Slightly higher | Slightly lower |
| Background | Bedroom set (custom) | Living room set (custom) |
| Aspect Ratio | 9:16 | 9:16 |
| Resolution | 1080p | 1080p |

### Video Assembly

After generating individual character clips:
1. Export both clips as MP4
2. Assemble in editing software: alternating cuts per beat
3. Add captions (auto-generated, then reviewed)
4. Add subtle background music at -20dB (non-copyrighted)
5. Export final at 1080 × 1920, MP4, H.264

---

## Quality Checklist

Before approving any HeyGen output:

- [ ] Character appearance matches profile (correct avatar used)
- [ ] Voice tone matches emotional arc for the beat
- [ ] Pacing feels natural — not robotic
- [ ] Emphasis words land correctly
- [ ] No lip-sync errors on key words
- [ ] Eye contact is appropriate (direct to camera for most lines)
- [ ] Scene setting is correct (Milo = bedroom, Gladys = armchair)
- [ ] Final assembled video is 60–90 seconds
- [ ] Captions are accurate and readable

---

## Escalation

If HeyGen output fails quality check on more than 2 criteria, regenerate the failing segment with adjusted prompt. If regeneration fails twice, escalate to Visual_Director with the failing clip and specific issue noted.
