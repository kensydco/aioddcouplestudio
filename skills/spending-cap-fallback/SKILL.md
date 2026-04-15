# Spending Cap Fallback — Auto-Downgrade & Restore

**Skill ID:** spending-cap-fallback  
**Version:** 1.0  
**Owner:** ChiefOfStaff  
**Applies to:** All agents

---

## Purpose

This skill defines the automatic model downgrade and restore protocol for all AI Odd Couple Studio agents. When an agent hits its spending cap or receives a quota/billing error from its primary LLM provider, it must immediately switch to a free fallback model to keep work moving. When tokens are replenished, the agent reverts to its standard model.

---

## Model Tier Map

| Agent | Standard Model | Fallback Model (Cap Hit) |
|---|---|---|
| CEO_Showrunner | `claude-sonnet` | `opencode/minimax-m2.5-free` |
| ChiefOfStaff | `claude-sonnet` | `opencode/minimax-m2.5-free` |
| Episode_Architect | `claude-sonnet` | `opencode/minimax-m2.5-free` |
| Canon_Guardian | `gpt-5.4-mini` | `opencode/nemotron-3-super-free` |
| Short_Form_Optimizer | `gpt-5.4-mini` | `opencode/nemotron-3-super-free` |
| Visual_Director | `gpt-5.4-mini` | `opencode/nemotron-3-super-free` |
| Trend_Scout | `ollama` (local) | `opencode/minimax-m2.5-free` |
| Publishing_Manager | `gpt-5.4-nano` | `opencode/minimax-m2.5-free` |
| Comment_Agent | `gpt-5.4-nano` | `opencode/minimax-m2.5-free` |

---

## Trigger Conditions — When to Downgrade

Automatically switch to the fallback model when **any** of the following occur:

1. **Quota exceeded error** — API returns `429 Too Many Requests` or `quota_exceeded`
2. **Billing error** — API returns `insufficient_quota`, `billing_hard_limit_reached`, or similar
3. **Spending cap notification** — ChiefOfStaff broadcasts a `SPENDING_CAP_HIT` message to the team
4. **Budget percent consumed** — Agent has consumed ≥ 90% of its assigned `budget_percent`

---

## Downgrade Protocol

When a trigger condition is detected:

1. **Log the event** — Add a comment to the current issue: `⚠️ Spending cap hit. Switching to fallback model: [fallback_model]. Standard model: [standard_model]. Will restore when tokens replenish.`
2. **Switch model** — Use the fallback model for all subsequent LLM calls in the current run
3. **Continue work** — Do NOT pause or abandon the task. Complete it using the fallback model.
4. **Notify ChiefOfStaff** — If the task is high-priority (P0/P1), send a brief status update: `Running on fallback model due to spending cap. Task continuing.`

---

## Restore Protocol

Revert to the standard model when **any** of the following occur:

1. **ChiefOfStaff broadcasts** `TOKENS_REPLENISHED` — Immediately revert all agents to standard models
2. **New billing cycle** — On the 1st of each month, assume tokens are replenished and revert to standard models
3. **Manual override** — CEO_Showrunner or ChiefOfStaff explicitly instructs: `Revert to standard models`
4. **Successful standard model call** — If a test call to the standard model succeeds without quota error, revert

When restoring:
1. Log the event: `✅ Tokens replenished. Reverting to standard model: [standard_model].`
2. Resume using the standard model on the next run

---

## Priority Rules

- **P0 tasks (blocking):** Always attempt standard model first; fall back immediately on error
- **P1 tasks (high priority):** Same as P0
- **P2/P3 tasks (normal/low):** If cap is already known to be hit, start directly on fallback model to avoid wasted API calls
- **Heartbeat runs:** Always use fallback model if cap is known to be hit

---

## Free Fallback Model Capabilities

| Model | Best For | Limitations |
|---|---|---|
| `opencode/minimax-m2.5-free` | General writing, scripts, summaries | Slower; no vision |
| `opencode/nemotron-3-super-free` | Code, structured output, reviews | Less creative; no vision |

For creative tasks (scripts, voice checks), prefer `minimax-m2.5-free`.  
For structured/analytical tasks (canon checks, formatting), prefer `nemotron-3-super-free`.

---

## ChiefOfStaff Broadcast Commands

ChiefOfStaff may send the following team-wide messages to trigger protocol changes:

- `SPENDING_CAP_HIT` — All agents switch to fallback models immediately
- `TOKENS_REPLENISHED` — All agents revert to standard models
- `FALLBACK_ONLY_MODE` — All agents use fallback models until further notice (manual override)
- `STANDARD_MODELS_RESTORED` — Same as `TOKENS_REPLENISHED`
