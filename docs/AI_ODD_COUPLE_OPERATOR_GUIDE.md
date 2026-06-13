# The AI Odd Couple Production System

## Operator Guide

**Version:** 1.0  
**Updated:** June 13, 2026  
**Repository:** `kensydco/aioddcouplestudio`

## 1. What the System Does

The AI Odd Couple production system is a hosted video-production and approval pipeline. It runs in GitHub Actions, so the production PC may be off.

For each approved topic, the system can:

- Read the locked series bible and approved asset registry.
- Write a 65-80 word, maximum-six-turn Milo and Gladys script.
- Validate character voice, episode structure, and locked provider IDs.
- Create one HeyGen speaking clip per dialogue turn.
- Download provider clips and assemble a branded 1080 x 1920 HyperFrames video.
- Burn in captions, add approved branding, and render a review MP4 with no music.
- Create the brief, script, storyboard, manifest, scene plan, publish metadata, and QA report.
- Persist the state as `awaiting_approval`.
- Email the approval recipient when the video is ready.
- Publish an approved video to selected social platforms after explicit human approval.

The production workflow cannot publish. Social credentials exist only in the separately protected publishing workflow.

## 2. Agents and Responsibilities

| Agent or Component | Responsibility |
|---|---|
| Episode Architect | Writes one clear, funny, beginner-friendly AI lesson. |
| Canon Guardian | Enforces Milo, Gladys, PG, and accuracy rules. |
| Visual Director | Converts dialogue into HeyGen scenes and repeatable framing. |
| HeyGen | Generates locked Milo and Gladys speaking performances and voices. |
| HyperFrames | Adds composition, captions, branding, and final rendering without music. |
| Publishing Manager | Creates platform metadata and routes approved media to social platforms. |
| GitHub Actions | Runs production while the PC is off, stores artifacts, sends email, and enforces approval. |

## 3. Approval and Safety Controls

The system has two hard boundaries:

1. **Topic approval:** A committed topic must contain `"approved": true`, or the operator must manually launch `produce_ad_hoc`.
2. **Publishing approval:** The `Publish approved episode` workflow waits for approval of the protected `social-production` GitHub Environment.

The publisher uses the exact final review MP4 from the selected production run. It does not regenerate, modify, or substitute the video during publishing.

## 4. Workflow Options

### Produce Approved Episode

Open GitHub Actions and select **Produce approved episode**.

| Mode | Use |
|---|---|
| `readiness` | Verifies secrets, OpenAI model access, HeyGen access, background URL, assets, Node, FFmpeg, and tests without generating video. |
| `produce` | Produces a committed JSON topic from `topics/approved/`. |
| `produce_ad_hoc` | Produces a topic entered directly in the workflow form. Manual dispatch serves as topic approval. |

After successful production, an email provides the run link and production run ID.

### Publish Approved Episode

Open GitHub Actions and select **Publish approved episode**.

Enter:

- The successful production run ID from the email.
- Platforms such as `youtube`, `tiktok`, or `youtube,tiktok,instagram`.
- A public approved-video URL when publishing to Instagram.

Review the environment approval request. Approving `social-production` releases the publisher.

## 5. Recommended Schedule

| Day | Time CT | Activity |
|---|---:|---|
| Monday | 9:00 AM | Select and approve weekly topics. |
| Tuesday | 9:00 AM | Produce episode one. |
| Tuesday | After review | Approve and publish episode one. |
| Thursday | 9:00 AM | Produce episode two. |
| Thursday | After review | Approve and publish episode two. |
| Friday | 3:00 PM | Review results, cost, failures, and next-week ideas. |

The system supports up to four episodes per week. Use ad hoc production for timely topics, sponsor requests, or experiments.

## 6. Social Publishing Capabilities

### YouTube Shorts

Direct upload from the approved artifact using YouTube Data API credentials. Metadata includes title, description, tags, education category, and public visibility.

### TikTok

Direct upload using TikTok Content Posting API. The TikTok application must be approved for Direct Post. Platform review rules may restrict unaudited apps.

### Instagram Reels

Publishing uses Instagram Graph API. Instagram requires a public URL for the approved MP4. Provide that URL in the publish workflow form.

One platform may be selected without enabling the others. Missing credentials stop only the selected publishing run; no alternate account is used.

## 7. Email Notifications

When production succeeds, the agent emails the configured approval recipient with:

- Episode ID
- GitHub Actions review link
- Production run ID
- Instructions for launching the approval-gated publisher

Email uses the configured SMTP account. Required secrets are `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM`, and `APPROVAL_EMAIL`.

## 8. Required Configuration

### Production Secrets

- `OPENAI_API_KEY`
- `HEYGEN_API_KEY`
- `HEYGEN_STUDIO_BACKGROUND_URL`

### Email Secrets

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `SMTP_FROM`
- `APPROVAL_EMAIL`

### Social Secrets

- YouTube: `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`
- TikTok: `TIKTOK_ACCESS_TOKEN`
- Instagram: `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_ACCOUNT_ID`

## 9. Ad Hoc Video Prompt Examples

Use these prompts with Codex when you want Codex to prepare or launch an episode.

### Basic Episode

> Create an AI Odd Couple episode explaining why a useful AI prompt includes a goal, context, and output format. Audience: small-business owners. CTA: Even WE can understand it. Produce it as an ad hoc video and stop at awaiting approval.

### Tool Explanation

> Create an ad hoc AI Odd Couple episode explaining the difference between an AI chatbot and a search engine. Keep claims general and current. Use one Harold reference and one Mr. Whiskers analogy. Produce the review video but do not publish.

### Small-Business Use Case

> Produce a 30-second AI Odd Couple episode showing how a restaurant owner can use AI to draft three social post ideas without sharing private customer data. Audience: local business owners. CTA: Follow for more.

### Segment Variant

> Create a "Gladys vs. The Internet" episode about image generators. Milo coaches Gladys, she misnames the tool, and she ends reluctantly impressed. Produce it for approval.

### Publish After Review

> Publish the approved AI Odd Couple production run `[RUN ID]` to YouTube and TikTok. Do not publish to Instagram. Wait for the social-production approval gate.

### Readiness Check

> Run the hosted AI Odd Couple readiness check. Verify OpenAI, HeyGen, approved assets, email configuration, and social publishing prerequisites. Do not generate or publish a video.

## 10. Review Checklist

Before approving social publishing:

- The video teaches exactly one correct concept.
- Milo and Gladys look and sound consistent.
- Dialogue is 65-80 spoken words and no more than six turns.
- Duration is 28-45 seconds and output is vertical 1080 x 1920.
- Captions match speech and remain readable.
- No music or standalone intro/outro is present.
- Animated Milo and Gladys appear together in at least one scene.
- Full-screen educational graphics that replace the characters total no more than 8 seconds.
- QA report passes and manifest state is `awaiting_approval`.
- Platform metadata is accurate and appropriate.

## 11. Troubleshooting

| Symptom | Response |
|---|---|
| Readiness fails | Open the failed step and correct the named missing secret, asset, or provider access. |
| Production succeeds but email fails | Download the production artifact from the run; correct SMTP secrets and rerun notification or the production workflow. |
| HeyGen clip fails | Stop and inspect the saved provider ID, account access, and failure response. Never substitute an identity. |
| Duration is outside 28-45 seconds | Revise the script or performance speed and produce a new review artifact. |
| Social workflow is waiting | Approve or reject the `social-production` environment request. |
| Platform credential expired | Refresh only that platform credential and retry only that platform. |
| Instagram cannot publish | Confirm the professional account authorization and that the supplied MP4 URL is publicly reachable. |

## 12. Operating Principle

Every run follows: approved topic, production, QA, email notification, human review, protected approval, and selected-platform publishing. When a required provider, credential, asset, or approval is unavailable, the system stops rather than substituting or publishing around the control.
