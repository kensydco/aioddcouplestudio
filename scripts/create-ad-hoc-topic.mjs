import fs from "node:fs/promises";
import { assert } from "./lib.mjs";

assert(process.env.AD_HOC_TOPIC, "AD_HOC_TOPIC is required.");
assert(process.env.AD_HOC_BACKGROUND_URL, "AD_HOC_BACKGROUND_URL is required and must point to a generated background based on the approved script.");
await fs.mkdir("topics/runtime", { recursive: true });
await fs.writeFile("topics/runtime/ad-hoc.json", `${JSON.stringify({
  topic: process.env.AD_HOC_TOPIC,
  audience: process.env.AD_HOC_AUDIENCE || "Small-business owners who are curious about AI",
  cta: process.env.AD_HOC_CTA || "Even WE can understand it!",
  backgroundUrl: process.env.AD_HOC_BACKGROUND_URL,
  backgroundPrompt: process.env.AD_HOC_BACKGROUND_PROMPT || "Generate a character-free background based on the approved episode script.",
  approved: true,
  approvalSource: "manual GitHub Actions dispatch"
}, null, 2)}\n`);
console.log("Created topics/runtime/ad-hoc.json");
