# Content Publishing SOP - AI Odd Couple Studio

**Version:** 2.0
**Owner:** Publishing_Manager  
**Last Updated:** 2026-06-13

## Policy

Production and publishing are separate workflows. The production workflow creates a 28-32 second review video and stops at `awaiting_approval`. No video may publish until a human approves the protected GitHub Environment named `social-production`.

## Standard Platform Format

- 1080 x 1920 vertical MP4
- 28-32 seconds
- Burned-in captions
- Approved Milo and Gladys identities only
- Approved branding and theme music only

## Standard Schedule

| Day | Time CT | Action |
|---|---:|---|
| Monday | 9:00 AM | Approve topics for the week |
| Tuesday | 9:00 AM | Produce episode one |
| Tuesday | After review | Approve and publish episode one |
| Thursday | 9:00 AM | Produce episode two |
| Thursday | After review | Approve and publish episode two |
| Friday | 3:00 PM | Review results, costs, and next-week topics |

Additional ad hoc episodes may be produced at any time. The guide permits up to four episodes per week, subject to provider budget and review capacity.

## Production and Approval

1. Run **Produce approved episode** in `readiness`, `produce`, or `produce_ad_hoc` mode.
2. The agent creates scripts, HeyGen performances, the HyperFrames composition, final review MP4, manifest, and QA report.
3. The agent uploads the production artifact and emails the approval recipient.
4. Review the MP4, script, QA report, and publish metadata.
5. Run **Publish approved episode** using the production run ID.
6. Approve the `social-production` environment request.
7. The workflow publishes only to the platforms selected in the dispatch form.

## Platform Credentials

### YouTube Shorts

Requires `YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, and `YOUTUBE_REFRESH_TOKEN`. The Google project must have YouTube Data API access and permission to upload to the intended channel.

### TikTok

Requires `TIKTOK_ACCESS_TOKEN`. The TikTok application must be approved for the Content Posting API and Direct Post. TikTok may restrict unaudited applications to private visibility.

### Instagram Reels

Requires `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_ACCOUNT_ID`, and a public URL for the approved MP4 supplied during publish dispatch. The Instagram account must be a professional account authorized for content publishing.

## Quality Gates

- Canon, PG, accuracy, hook, caption, duration, resolution, and approved-asset checks pass.
- Final review MP4 exists.
- Workflow state is `awaiting_approval`.
- Human reviewer approves the exact production artifact.
- The protected `social-production` environment is approved.

## Failure Handling

- Production failure: no email and no publishing.
- Email failure: video artifact remains available; workflow reports failure.
- One platform failure: successful platform results remain recorded; retry only the failed platform.
- Missing or expired social credentials: publishing stops without substituting another account or route.
