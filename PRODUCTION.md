# AI Odd Couple Hosted Production Agent

The production agent runs in GitHub Actions, so the PC does not need to be on.
It accepts only a committed topic file with `"approved": true`, creates the
episode artifacts, submits one locked HeyGen avatar clip per dialogue turn, and
stops before publishing.

Every production uses animated character performances, includes at least one
scene with animated Milo and Gladys together, uses no music or standalone
intro/outro, and limits full-screen educational graphics that replace the
characters to no more than eight seconds.
Final episode duration may be up to 45 seconds.

## Required GitHub repository secrets

- `OPENAI_API_KEY`
- `HEYGEN_API_KEY`
- `HEYGEN_STUDIO_BACKGROUND_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`
- `SMTP_FROM`, `APPROVAL_EMAIL`

Social publishing credentials are platform-specific:

- YouTube: `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`
- TikTok: `TIKTOK_ACCESS_TOKEN`
- Instagram: `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_ACCOUNT_ID`

Optional repository variable: `OPENAI_MODEL` (defaults to `gpt-5.5`).

## Run

1. Run **Produce approved episode** using a committed approved topic or `produce_ad_hoc`.
2. Download the workflow artifact and review the final MP4, manifest, script, storyboard, and QA trail.
3. Run **Publish approved episode** with the production run ID.
4. Approve the protected `social-production` environment to release publishing.

The workflow has no publish credentials or publish step. Missing required
identities, secrets, assets, or runtime dependencies stop production.

## Approval boundary

The production workflow stops at `awaiting_approval`. Publishing is isolated in
a separate workflow protected by the `social-production` GitHub Environment.
