# AI Odd Couple Hosted Production Agent

The production agent runs in GitHub Actions, so the PC does not need to be on.
It accepts only a committed topic file with `"approved": true`, creates the
episode artifacts, submits one locked HeyGen avatar clip per dialogue turn, and
stops before publishing.

## Required GitHub repository secrets

- `OPENAI_API_KEY`
- `HEYGEN_API_KEY`
- `HEYGEN_STUDIO_BACKGROUND_URL`

Optional repository variable: `OPENAI_MODEL` (defaults to `gpt-5.5`).

## Run

1. Copy `topics/approved/example.json` to a topic-specific file.
2. Set the topic, audience, CTA, and `"approved": true`.
3. Run the **Produce approved episode** workflow with that file path.
4. Download the workflow artifact for the manifest, script, storyboard, and QA trail.

The workflow has no publish credentials or publish step. Missing required
identities, secrets, assets, or runtime dependencies stop production.

## Current limitation

The repository now handles intake, scripting, contract validation, HeyGen
submission, state, and the approval guard. Clip polling/download and final
HyperFrames composition remain blocked until the pending approved studio plate,
logo, music, and branding assets are supplied.
