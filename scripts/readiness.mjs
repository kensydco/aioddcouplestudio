import { spawnSync } from "node:child_process";
import path from "node:path";
import { ROOT, exists } from "./lib.mjs";

const requiredFiles = [
  "series-bible/SERIES_BIBLE.md", "series-bible/MILO.md", "series-bible/GLADYS.md",
  "series-bible/VISUAL_STYLE.md", "series-bible/PRONUNCIATION_GUIDE.md",
  "series-bible/APPROVED_ASSETS.md", "assets/characters/AI_Odd_Couple.webp",
  "templates/ai-odd-couple-episode/index.html"
];
const optionalProductionAssets = [
  "assets/backgrounds/studio.png", "assets/branding/logo.png",
  "assets/branding/logo-bug.png", "assets/music/episode-bed.mp3"
];

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
for (const name of ["OPENAI_API_KEY", "HEYGEN_API_KEY", "HEYGEN_STUDIO_BACKGROUND_URL"]) {
  const ok = Boolean(process.env[name]);
  console.log(`${ok ? "PASS" : "BLOCKED"} secret ${name}`);
  failed ||= !ok;
}
for (const cmd of [["node", ["--version"]], ["ffmpeg", ["-version"]], ["ffprobe", ["-version"]]]) {
  const result = spawnSync(cmd[0], cmd[1], { stdio: "ignore" });
  console.log(`${result.status === 0 ? "PASS" : "BLOCKED"} runtime ${cmd[0]}`);
  failed ||= result.status !== 0;
}
if (failed) process.exitCode = 1;
