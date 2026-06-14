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
- At least one scene per episode must visibly show Milo and Gladys together.
- Only the speaking character may have mouth movement. Use a static listening-character picture-in-picture during the interaction scene.
- Do not display a logo or logo bug.
- Do not use the standard studio background. Generate one character-free background based on the approved script and use it consistently throughout the episode.
- Full-screen educational graphics that replace the characters may total no more than 8 seconds per episode.
- Final episode duration may be up to 45 seconds. Keep the concise 30-second pacing when it works; use extra time for natural animated interaction, not filler.
- Captions, lower thirds, and overlays that leave characters visible do not count toward the 8-second limit.
- Stop production at `awaiting_approval`. Never publish from the production workflow.

## Efficient Default

- Default full-screen educational graphics budget: 0 seconds.
- Use alternating animated speaker clips plus one split-screen interaction.
- Keep the speaking character full-frame and animated while the listener appears as a static picture-in-picture.
- Generate and host a script-specific background before starting provider video generation.
- Use graphics only when they explain the concept more clearly than the characters can.
- Stage generated media inside the composition project before HyperFrames lint and render.
- Treat approval email as optional when SMTP secrets are not configured; the completed production must still report success and remain at `awaiting_approval`.

## Required QA Evidence

- Music: `NONE`
- Intro/outro cards: `NONE`
- Animated character performances: `PASS`
- Both characters together in at least one scene: `PASS`
- Full-screen educational graphics: report actual seconds and confirm `<= 8`
- Workflow state: `awaiting_approval`

## Continuous Improvement Rule

Whenever the user refines the video-production process, update this skill and the matching source-of-truth files, production code, and tests in the same change.
