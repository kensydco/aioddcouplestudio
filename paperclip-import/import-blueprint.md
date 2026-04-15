# Paperclip Import Blueprint — AI Odd Couple Studio

## Company Definition
```yaml
company:
  name: "AI Odd Couple Studio"
  description: "Short-form AI comedy education media company using Milo & Gladys characters"
  monthly_budget_usd: 150
  auto_publish: true
  content_frequency_per_week: 2
  primary_platforms:
    - YouTube Shorts
    - TikTok
    - Instagram Reels
```

## Model Routing Policy
```yaml
model_policy:
  cheap_lane:
    - gpt-5.4-nano
    - gpt-5.4-mini
    - claude-haiku-3.5
    - ollama (local)

  mid_lane:
    - claude-sonnet
    - gpt-5.4-mini

  premium_lane:
    - gpt-5.4
    - claude-opus

rules:
  - "Only Episode Architect can use mid_lane by default"
  - "Premium requires escalation + max 1 retry"
  - "All ops agents default to cheap_lane"
```

## Agent Namespace
All agents use the `AIOddCouple-` namespace prefix.

| Agent | Config File | Namespace ID |
|---|---|---|
| CEO Showrunner | `agents/ceo-showrunner/config.yaml` | `AIOddCouple-CEO` |
| Episode Architect | `agents/episode-architect/config.yaml` | `AIOddCouple-EA` |
| Canon Guardian | `agents/canon-guardian/config.yaml` | `AIOddCouple-CG` |
| Short Form Optimizer | `agents/short-form-optimizer/config.yaml` | `AIOddCouple-SFO` |
| Visual Director | `agents/visual-director/config.yaml` | `AIOddCouple-VD` |
| Publishing Manager | `agents/publishing-manager/config.yaml` | `AIOddCouple-PM` |
| Trend Scout | `agents/trend-scout/config.yaml` | `AIOddCouple-TS` |
| Comment Agent | `agents/comment-agent/config.yaml` | `AIOddCouple-CA` |

## Pipeline Workflow
```
Trend_Scout → topic generation
Episode_Architect → script
Canon_Guardian → validation
Short_Form_Optimizer → pacing
Visual_Director → prompts
Publishing_Manager → metadata
Auto Publish
Comment_Agent (optional)
```

## Hard Rules
```yaml
rules:
  - "Reject scripts without both Milo + Gladys dialogue"
  - "Reject scripts without humor + teaching"
  - "Reject scripts failing PG filter"
  - "Reject scripts over 90 seconds"
```
