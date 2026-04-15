# OPERATIONS.md — AI Odd Couple Studio

*This document defines the Research → Plan → Execute pipeline, the 2-episode/week calendar, communication standards between agents, escalation paths, and the reporting structure.*

---

## Pipeline: Research → Plan → Execute

**Gate 1 — Research (Trend Scout)**
The Trend Scout generates 10 topics per week (trending + evergreen) with a hook idea for each. Output is a written document. No assumptions.

**Gate 2 — Plan (Episode Architect + Canon Guardian + Short Form Optimizer)**
The Episode Architect drafts the script from the approved topic. The Canon Guardian validates the script against the character checklist. The Short Form Optimizer tightens pacing and strengthens the hook. No execution begins until all three approve.

**Gate 3 — Execute (Visual Director + Publishing Manager → Auto Publish)**
The Visual Director converts the approved script into HeyGen scene prompts. The Publishing Manager prepares 3 title options, a description, 10–15 hashtags, and a hook caption. The content is then auto-published to YouTube Shorts, TikTok, and Instagram Reels.

---

## Weekly Calendar

| Day | Agent | Task |
|---|---|---|
| Monday | Trend_Scout | Deliver 10 topics with hooks |
| Tuesday | Episode_Architect | Draft 2 scripts |
| Wednesday | Canon_Guardian | Validate scripts |
| Wednesday | Short_Form_Optimizer | Tighten pacing |
| Thursday | Visual_Director | Create HeyGen prompts |
| Friday | Publishing_Manager | Prep metadata + auto-publish |
| Daily (Optional) | Comment_Agent | Reply to comments in character |

---

## Reporting Structure

The chain of command flows as follows:

```
Founder (Kenny B)
    └── CEO_Showrunner
            └── ChiefOfStaff
                    ├── Episode_Architect
                    ├── Canon_Guardian
                    ├── Short_Form_Optimizer
                    ├── Visual_Director
                    ├── Publishing_Manager
                    ├── Trend_Scout
                    └── Comment_Agent
```

**Agent → CoS:** Each content agent posts a completion comment on their assigned issue when work is done. The CoS reviews and routes to the next pipeline stage.

**CoS → CEO:** The ChiefOfStaff compiles a daily status digest and posts it as a comment on the active phase issue. The CEO reviews on its next heartbeat.

**CEO → Founder:** The CEO_Showrunner sends a weekly summary every Friday covering: (1) episodes published, (2) budget used vs. $150 cap, (3) any approvals needed from the Founder. The CEO creates a Paperclip issue tagged `[FOUNDER REVIEW]` for any item requiring Kenny B's input.

---

## Communication Standards

- All agents report to the CoS after completing their task.
- The CoS compiles a daily status report for the CEO.
- The CEO sends a weekly summary to the Founder (Kenny B) covering pipeline status, budget usage, and any approvals needed.
- **No agent contacts the Founder directly** — all escalations go through the CEO.

---

## Escalation Paths

| Trigger | Threshold | Action |
|---|---|---|
| Script fails Canon Guardian checklist | Any failure | Canon Guardian rewrites broken sections only |
| Budget alert | **$120/month reached** | CEO immediately creates a `[FOUNDER REVIEW]` issue and pauses non-critical runs |
| Budget hard cap | $150/month | CEO halts all non-essential agent runs; escalates to Founder |
| Premium model needed | Per episode | CEO approves max 1 retry per episode |
| Content fails PG filter | Any failure | Canon Guardian rejects and rewrites; no exceptions |
| HeyGen production issue | Any failure | Visual Director flags to CEO for manual review |
| No topics from Trend Scout | Monday EOD | ChiefOfStaff escalates to CEO; CEO triggers manual topic generation |
| Publishing failure | Any platform | Publishing Manager retries once; escalates to CoS if second failure |
