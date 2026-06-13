---
name: ai-odd-couple-video-production
description: Produces and reviews AI Odd Couple episode videos under the current production-efficiency rules.
---

# AI Odd Couple Video Production

Use this skill whenever producing, revising, or reviewing an AI Odd Couple episode video.

## Hard Production Rules

- Do not use music. Sound effects are allowed but optional.
- Do not add a standalone intro or outro. Start and end with animated character performances.
- Every dialogue turn must use the locked animated Milo or Gladys performance.
- At least one scene per episode must visibly show animated Milo and Gladys together.
- Full-screen educational graphics that replace the characters may total no more than 8 seconds per episode.
- Final episode duration may be up to 45 seconds. Keep the concise 30-second pacing when it works; use extra time for natural animated interaction, not filler.
- Captions, lower thirds, persistent logo bugs, and overlays that leave characters visible do not count toward the 8-second limit.
- Stop production at `awaiting_approval`. Never publish from the production workflow.

## Efficient Default

- Default full-screen educational graphics budget: 0 seconds.
- Use alternating animated speaker clips plus one split-screen interaction.
- Keep the approved studio background and framing consistent.
- Use graphics only when they explain the concept more clearly than the characters can.

## Required QA Evidence

- Music: `NONE`
- Intro/outro cards: `NONE`
- Animated character performances: `PASS`
- Both characters together in at least one scene: `PASS`
- Full-screen educational graphics: report actual seconds and confirm `<= 8`
- Workflow state: `awaiting_approval`

## Continuous Improvement Rule

Whenever the user refines the video-production process, update this skill and the matching source-of-truth files, production code, and tests in the same change.
