import { spawnSync } from "node:child_process";
import path from "node:path";
import { ROOT, exists } from "./lib.mjs";

const requiredFiles = [
  "series-bible/SERIES_BIBLE.md", "series-bible/MILO.md", "series-bible/GLADYS.md",
  "series-bible/VISUAL_STYLE.md", "series-bible/PRONUNCIATION_GUIDE.md",
  "series-bible/APPROVED_ASSETS.md", "assets/characters/AI_Odd_Couple.webp",
  "templates/ai-odd-couple-episode/index.html"
];
const optionalProductionAssets = ["assets/avatars/Milo.png", "assets/avatars/Gladys.png"];

let failed = false;
for (const file of requiredFiles) {
  const ok = await exists(path.join(ROOT, file));
  console.log(`${ok ? "PASS" : "FAIL"} required ${file}`);
  failed ||= !ok;
}
for (const file of optionalProductionAssets) {
  const ok = await exists(path.join(ROOT, file));
  console.log(`${ok ? "PASS" : "BLOCKED"} production asset ${file}`);
  failed ||= !ok;
}
for (const name of ["OPENAI_API_KEY", "HEYGEN_API_KEY"]) {
  const ok = Boolean(process.env[name]);
  console.log(`${ok ? "PASS" : "BLOCKED"} secret ${name}`);
  failed ||= !ok;
}
if (process.env.OPENAI_API_KEY) {
  const response = await fetch("https://api.openai.com/v1/models", { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } });
  console.log(`${response.ok ? "PASS" : "BLOCKED"} provider OpenAI authentication`);
  failed ||= !response.ok;
  if (response.ok) {
    const configuredModel = process.env.OPENAI_MODEL || "gpt-5.5";
    const models = (await response.json()).data ?? [];
    const available = models.some((model) => model.id === configuredModel);
    console.log(`${available ? "PASS" : "BLOCKED"} provider OpenAI model ${configuredModel}`);
    failed ||= !available;
  }
}
if (process.env.HEYGEN_API_KEY) {
  const response = await fetch("https://api.heygen.com/v2/avatars", { headers: { "X-Api-Key": process.env.HEYGEN_API_KEY } });
  console.log(`${response.ok ? "PASS" : "BLOCKED"} provider HeyGen authentication`);
  failed ||= !response.ok;
}
for (const cmd of [["node", ["--version"]], ["ffmpeg", ["-version"]], ["ffprobe", ["-version"]]]) {
  const result = spawnSync(cmd[0], cmd[1], { stdio: "ignore" });
  console.log(`${result.status === 0 ? "PASS" : "BLOCKED"} runtime ${cmd[0]}`);
  failed ||= result.status !== 0;
}
if (failed) process.exitCode = 1;
