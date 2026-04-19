# AIO Odd Couple Studio — Mode-Switching Routines

These two routines should be created in the **AI Odd Couple Studio** Paperclip workspace under **Routines → Create routine**.

---

## Routine 1: Switch to Frugal Mode

**Title:** Switch to Frugal Mode  
**Assignee:** ChiefOfStaff  
**Project:** Studio Operations  

**Instructions:**
```
Switch all agents to FRUGAL MODE immediately. Use the following model assignments:

| Agent | Adapter | Model |
|---|---|---|
| CEO_Showrunner | Hermes Agent | hermes3:8b |
| ChiefOfStaff | Hermes Agent | hermes3:8b |
| Episode_Architect | Hermes Agent | hermes3:8b |
| Canon_Guardian | OpenCode (local) | openai/gemma4:26b |
| Short_Form_Optimizer | OpenCode (local) | openai/gemma4:26b |
| Visual_Director | OpenCode (local) | openai/gemma4:26b |
| Trend_Scout | OpenCode (local) | openai/gemma4:26b |
| Publishing_Manager | OpenCode (local) | openai/gemma4:26b |
| Comment_Agent | OpenCode (local) | openai/gemma4:26b |

Steps:
1. Go to each agent's Configuration tab in Paperclip
2. Set Adapter type and Model per the table above
3. Save each agent's configuration
4. Post a team-wide message: "🟡 FRUGAL MODE ACTIVE — All agents switched to local Ollama models. Zero cloud cost until further notice."
5. Log the mode change in the Studio Operations project as a new issue: "Mode Switch: Frugal Mode Activated [date]"

Trigger this routine when:
- Monthly cloud spend exceeds $100
- ChiefOfStaff broadcasts SPENDING_CAP_HIT
- Kenny explicitly requests Frugal Mode
```

---

## Routine 2: Switch to Optimum Mode

**Title:** Switch to Optimum Mode  
**Assignee:** ChiefOfStaff  
**Project:** Studio Operations  

**Instructions:**
```
Switch all agents to OPTIMUM MODE immediately. Use the following best-in-class model assignments:

| Agent | Adapter | Model | Reason |
|---|---|---|---|
| CEO_Showrunner | Claude (local) | claude-opus-4-5 | Strategic vision, long-horizon planning |
| ChiefOfStaff | Claude (local) | claude-sonnet-4-5 | Orchestration, delegation, multi-agent coordination |
| Episode_Architect | Claude (local) | claude-sonnet-4-5 | Long-form creative writing, narrative structure |
| Canon_Guardian | OpenCode (local) | openai/gpt-4.1 | Precise rule enforcement, structured output |
| Short_Form_Optimizer | OpenCode (local) | openai/gpt-4.1 | Hook writing, viral content optimization |
| Visual_Director | OpenCode (local) | openai/gpt-4.1 | Visual concept generation, thumbnail briefs |
| Trend_Scout | OpenCode (local) | openai/gemini-2.5-flash | Real-time trend research with web grounding |
| Publishing_Manager | OpenCode (local) | openai/gpt-4.1-mini | Scheduling, metadata, structured publishing tasks |
| Comment_Agent | OpenCode (local) | openai/gpt-4.1-mini | Community replies, brand voice consistency |

Steps:
1. Go to each agent's Configuration tab in Paperclip
2. Set Adapter type and Model per the table above
3. Save each agent's configuration
4. Post a team-wide message: "🟢 OPTIMUM MODE ACTIVE — All agents switched to best-in-class cloud models. Maximum quality for high-stakes work."
5. Log the mode change in the Studio Operations project as a new issue: "Mode Switch: Optimum Mode Activated [date]"

Trigger this routine when:
- High-stakes deliverable is due (sponsor pitch, brand partnership, major episode)
- Kenny explicitly requests Optimum Mode
- Monthly token budget has been replenished and quality work is needed
```

---

## Quick Reference: AIO Mode Map

| Agent | Frugal Mode | Standard Mode (Auto) | Optimum Mode |
|---|---|---|---|
| CEO_Showrunner | `hermes3:8b` | `claude-sonnet` | `claude-opus-4-5` |
| ChiefOfStaff | `hermes3:8b` | `claude-sonnet` | `claude-sonnet-4-5` |
| Episode_Architect | `hermes3:8b` | `claude-sonnet` | `claude-sonnet-4-5` |
| Canon_Guardian | `gemma4:26b` | `gpt-5.4-mini` | `gpt-4.1` |
| Short_Form_Optimizer | `gemma4:26b` | `gpt-5.4-mini` | `gpt-4.1` |
| Visual_Director | `gemma4:26b` | `gpt-5.4-mini` | `gpt-4.1` |
| Trend_Scout | `gemma4:26b` | `ollama` (local) | `gemini-2.5-flash` |
| Publishing_Manager | `gemma4:26b` | `gpt-5.4-nano` | `gpt-4.1-mini` |
| Comment_Agent | `gemma4:26b` | `gpt-5.4-nano` | `gpt-4.1-mini` |
