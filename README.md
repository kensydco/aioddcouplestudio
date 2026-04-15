# AI Odd Couple Studio

**A fully automated short-form AI comedy education content factory.**

## Characters
- **Milo** — 8-year-old chaotic AI genius
- **Gladys** — 82-year-old skeptical grandmother

## Mission
Produce 2 high-retention, funny, beginner-friendly AI education videos per week across YouTube Shorts, TikTok, and Instagram Reels on a $100–150/month budget.

## Agents
| Agent | Role | Model |
|---|---|---|
| CEO_Showrunner | Creative authority + budget oversight | claude-sonnet |
| Episode_Architect | Script creation | claude-sonnet |
| Canon_Guardian | Character consistency validation | gpt-5.4-mini |
| Short_Form_Optimizer | Pacing + hook optimization | gpt-5.4-mini |
| Visual_Director | HeyGen prompts + visuals | gpt-5.4-mini |
| Publishing_Manager | Titles, descriptions, hashtags | gpt-5.4-nano |
| Trend_Scout | Topic + trend generation | ollama |
| Comment_Agent | In-character comment replies | gpt-5.4-nano |

## Pipeline
`Trend_Scout → Episode_Architect → Canon_Guardian → Short_Form_Optimizer → Visual_Director → Publishing_Manager → Auto Publish → Comment_Agent (optional)`

## Key Files
- `VISION.md` — Company constitution
- `CEO_BOOTSTRAP.md` — One-time CEO activation sequence
- `OPERATIONS.md` — Pipeline + calendar + escalation paths
- `PHASES/PHASE_1.md` — First production phase plan
- `paperclip-import/import-blueprint.md` — Paperclip import spec
- `assets/avatars/` — Milo and Gladys character avatars
- `agents/` — All 8 agent config files
- `skills/` — All 10 custom skills
