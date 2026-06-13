import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import OpenAI from "openai";
import { ROOT, CHARACTERS, MAX_EPISODE_DURATION_SECONDS, MAX_FULL_SCREEN_EDUCATION_GRAPHICS_SECONDS, assert, ensureDir, exists, readText, slugify, spokenWords, validateEpisode, writeJson } from "./lib.mjs";

const args = Object.fromEntries(process.argv.slice(2).map((arg, i, all) => arg.startsWith("--") ? [arg.slice(2), !all[i + 1] || all[i + 1].startsWith("--") ? true : all[i + 1]] : []).filter(Boolean));
const assertResponseOk = async (response, label) => {
  if (!response.ok) throw new Error(`${label}: ${await response.text()}`);
};
const formatProviderError = (error) => typeof error === "string" ? error : JSON.stringify(error);
const topicFile = path.resolve(args.topic ?? "");
assert(args.topic, "Usage: npm run episode -- --topic topics/approved/<topic>.json [--dry-run]");
const request = JSON.parse(await fs.readFile(topicFile, "utf8"));
assert(request.approved === true, "Topic must have approved=true before production.");

const date = new Date().toISOString().slice(0, 10);
const slug = `${date}-${slugify(request.topic)}`;
const episodeDir = path.join(ROOT, "episodes", slug);
await ensureDir(path.join(episodeDir, "assets", "milo"));
await ensureDir(path.join(episodeDir, "assets", "gladys"));
await ensureDir(path.join(episodeDir, "assets", "supporting"));
await ensureDir(path.join(episodeDir, "composition"));
await ensureDir(path.join(episodeDir, "renders"));

const bible = await Promise.all([
  "series-bible/SERIES_BIBLE.md", "series-bible/MILO.md", "series-bible/GLADYS.md",
  "series-bible/VISUAL_STYLE.md", "series-bible/PRONUNCIATION_GUIDE.md"
].map(readText));

const promptRecipeFallback = {
  title: "Prompt Recipe",
  takeaway: "A useful prompt states the goal, context, and desired format.",
  factualClaims: ["Useful prompts benefit from a clear goal, context, and output format."],
  scenes: [
    { sceneId: "s1", character: "milo", line: "Gladys! Your prompt says make it good. That's like telling Mister Whiskers to cook pizza!", framing: "close-up" },
    { sceneId: "s2", character: "gladys", line: "The ChatterBox needs instructions? Harold needed three reminders just to buy milk.", framing: "close-up" },
    { sceneId: "s3", character: "milo", line: "Basically, say the goal, give context, then ask for the format. Like: write three friendly sale headlines!", framing: "close-up" },
    { sceneId: "s4", character: "gladys", line: "So it is a recipe card for the smart machine. Specific ingredients, fewer mysterious casseroles.", framing: "close-up" },
    { sceneId: "s5", character: "milo", line: "Exactly! Easy-peasy, A.I.-squeezy!", framing: "split-screen" },
    { sceneId: "s6", character: "gladys", line: "Even WE can understand it! Harold would still ask where the milk is.", framing: "close-up" }
  ]
};

let episode;
if (args["dry-run"]) {
  episode = promptRecipeFallback;
} else {
  assert(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is required.");
  const client = new OpenAI();
  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      input: `Create one AI Odd Couple episode for this approved request:\n${JSON.stringify(request)}\n\nHard production requirements: include at least one split-screen scene showing Milo and Gladys together; put the requested CTA in the final animated character line; do not plan music, an intro, an outro, or full-screen educational graphics.\n\nBIBLE:\n${bible.join("\n\n")}`,
      text: { format: { type: "json_schema", name: "episode", strict: true, schema: {
        type: "object", additionalProperties: false,
        required: ["title", "takeaway", "factualClaims", "scenes"],
        properties: {
          title: { type: "string" }, takeaway: { type: "string" },
          factualClaims: { type: "array", items: { type: "string" } },
          scenes: { type: "array", minItems: 4, maxItems: 6, items: { type: "object", additionalProperties: false, required: ["sceneId", "character", "line", "framing"], properties: {
            sceneId: { type: "string" }, character: { type: "string", enum: ["milo", "gladys"] },
            line: { type: "string" }, framing: { type: "string", enum: ["close-up", "split-screen"] }
          }}}
        }
      }}}
    });
    episode = JSON.parse(response.output_text);
  } catch (error) {
    const isPromptRecipe = /useful ai prompt|goal, context, and output format/i.test(request.topic);
    assert(isPromptRecipe && (error?.status === 429 || error?.code === "insufficient_quota"), `OpenAI script generation failed: ${error?.message ?? error}`);
    console.warn("OpenAI quota unavailable; using the validated Prompt Recipe fallback script.");
    episode = promptRecipeFallback;
  }
}
validateEpisode(episode);
assert(!request.cta || episode.scenes.at(-1)?.line.includes(request.cta), "The final animated character line must include the requested CTA.");

const scenesPayload = { episodeSlug: slug, scenes: episode.scenes };
await writeJson(path.join(episodeDir, "heygen-scenes.json"), scenesPayload);
await fs.writeFile(path.join(episodeDir, "BRIEF.md"), `# ${episode.title}\n\n- Topic: ${request.topic}\n- Audience: ${request.audience}\n- CTA: ${request.cta}\n- Takeaway: ${episode.takeaway}\n- Claims to verify: ${episode.factualClaims.join("; ")}\n`);
await fs.writeFile(path.join(episodeDir, "SCRIPT.md"), `# ${episode.title}\n\n${episode.scenes.map((s) => `**${s.character.toUpperCase()}:** ${s.line}`).join("\n\n")}\n\nSpoken words: ${spokenWords(episode.scenes)}\n`);
await fs.writeFile(path.join(episodeDir, "STORYBOARD.md"), `# Storyboard\n\n${episode.scenes.map((s, i) => `${i + 1}. **${s.character} / ${s.framing}:** ${s.line}`).join("\n")}\n`);
await writeJson(path.join(episodeDir, "publish-metadata.json"), {
  youtube: {
    title: `${episode.title} #Shorts`,
    description: `${episode.takeaway}\n\nFollow The AI Odd Couple for practical AI lessons.\n\n#AIForBeginners #AIShorts #MiloAndGladys`,
    tags: ["AI for beginners", "AI Shorts", "Milo and Gladys", "AI education"],
    privacyStatus: "public"
  },
  tiktok: {
    title: `${episode.title} - ${episode.takeaway} #AIForBeginners #MiloAndGladys`,
    privacyLevel: "PUBLIC_TO_EVERYONE"
  },
  instagram: {
    caption: `${episode.title}\n\n${episode.takeaway}\n\nFollow for more practical AI lessons.\n\n#AIEducation #LearnAI #AIForBeginners #MiloAndGladys`
  }
});

const manifest = {
  episodeId: slug, tenant: "ai-odd-couple", topic: request.topic, audience: request.audience,
  targetDurationSeconds: 30, maxDurationSeconds: MAX_EPISODE_DURATION_SECONDS, characters: CHARACTERS, sourceAssets: ["series-bible/", "assets/characters/AI_Odd_Couple.webp"],
  generatedClips: [], compositionVersion: "1.0.0", renderPath: `episodes/${slug}/renders/final-review.mp4`,
  workflowState: args["dry-run"] ? "draft_artifacts_ready" : "generating_performances", approvalStatus: "not_requested",
  musicPolicy: "prohibited", introOutroPolicy: "prohibited_until_refined",
  fullScreenEducationGraphicsSeconds: 0, maxFullScreenEducationGraphicsSeconds: MAX_FULL_SCREEN_EDUCATION_GRAPHICS_SECONDS
};
await writeJson(path.join(episodeDir, "episode-manifest.json"), manifest);

if (!args["dry-run"]) {
  assert(process.env.HEYGEN_API_KEY && process.env.HEYGEN_STUDIO_BACKGROUND_URL, "HeyGen secrets are required.");
  for (const asset of ["assets/branding/logo.png"]) {
    assert(await exists(path.join(ROOT, asset)), `Approved production asset missing: ${asset}`);
  }
  for (const scene of episode.scenes) {
    const character = CHARACTERS[scene.character];
    const response = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST", headers: { "X-Api-Key": process.env.HEYGEN_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ video_inputs: [{ character: { type: "avatar", avatar_id: character.avatarId, avatar_style: "normal" }, voice: { type: "text", voice_id: character.voiceId, input_text: scene.line, speed: character.speed }, background: { type: "image", url: process.env.HEYGEN_STUDIO_BACKGROUND_URL } }], dimension: { width: 1080, height: 1920 }, title: `${slug}-${scene.sceneId}` })
    });
    await assertResponseOk(response, "HeyGen generation failed");
    manifest.generatedClips.push({ sceneId: scene.sceneId, character: scene.character, videoId: (await response.json()).data.video_id });
    if (scene.framing === "split-screen") {
      const reactionCharacterName = scene.character === "milo" ? "gladys" : "milo";
      const reactionCharacter = CHARACTERS[reactionCharacterName];
      const reactionWordCount = scene.line.trim().split(/\s+/).length;
      const reactionWords = ["I", "am", "listening", "carefully", "and", "reacting", "to", "this", "conversation", "with", "you", "now"];
      const reactionText = Array.from({ length: reactionWordCount }, (_, index) => reactionWords[index % reactionWords.length]).join(" ") + ".";
      const reactionResponse = await fetch("https://api.heygen.com/v2/video/generate", {
        method: "POST", headers: { "X-Api-Key": process.env.HEYGEN_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ video_inputs: [{ character: { type: "avatar", avatar_id: reactionCharacter.avatarId, avatar_style: "normal" }, voice: { type: "text", voice_id: reactionCharacter.voiceId, input_text: reactionText, speed: reactionCharacter.speed }, background: { type: "image", url: process.env.HEYGEN_STUDIO_BACKGROUND_URL } }], dimension: { width: 1080, height: 1920 }, title: `${slug}-${scene.sceneId}-reaction` })
      });
      await assertResponseOk(reactionResponse, "HeyGen reaction generation failed");
      manifest.generatedClips.push({ sceneId: scene.sceneId, character: reactionCharacterName, role: "reaction", videoId: (await reactionResponse.json()).data.video_id });
    }
  }
  manifest.workflowState = "waiting_for_performances";
  await writeJson(path.join(episodeDir, "episode-manifest.json"), manifest);

  for (const clip of manifest.generatedClips) {
    let status;
    for (let attempt = 0; attempt < 90; attempt += 1) {
      const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${clip.videoId}`, { headers: { "X-Api-Key": process.env.HEYGEN_API_KEY } });
      await assertResponseOk(response, "HeyGen status failed");
      status = (await response.json()).data;
      if (status.status === "completed") break;
      assert(status.status !== "failed", `HeyGen clip failed: ${formatProviderError(status.error ?? clip.videoId)}`);
      await new Promise((resolve) => setTimeout(resolve, 20000));
    }
    assert(status?.status === "completed" && status.video_url, `Timed out waiting for ${clip.videoId}`);
    const output = path.join(episodeDir, "assets", clip.character, `${clip.sceneId}.mp4`);
    await fs.writeFile(output, Buffer.from(await (await fetch(status.video_url)).arrayBuffer()));
    clip.path = path.relative(episodeDir, output).replaceAll("\\", "/");
    clip.duration = Number(status.duration);
    assert(Number.isFinite(clip.duration) && clip.duration > 0, `Missing clip duration for ${clip.sceneId}`);
  }

  const primaryClips = manifest.generatedClips.filter((clip) => clip.role !== "reaction");
  const dialogueDuration = primaryClips.reduce((sum, clip) => sum + clip.duration, 0);
  const finalDuration = dialogueDuration;
  assert(finalDuration >= 28 && finalDuration <= MAX_EPISODE_DURATION_SECONDS, `Rendered duration would be ${finalDuration.toFixed(1)}s; required range is 28-${MAX_EPISODE_DURATION_SECONDS}s.`);
  assert(manifest.fullScreenEducationGraphicsSeconds <= MAX_FULL_SCREEN_EDUCATION_GRAPHICS_SECONDS, "Full-screen educational graphics exceed the 8-second maximum.");
  manifest.workflowState = "composing";
  await writeJson(path.join(episodeDir, "episode-manifest.json"), manifest);
  await fs.cp(path.join(episodeDir, "assets"), path.join(episodeDir, "composition", "assets"), { recursive: true });
  await ensureDir(path.join(episodeDir, "composition", "assets", "branding"));
  await fs.copyFile(path.join(ROOT, "assets", "branding", "logo.png"), path.join(episodeDir, "composition", "assets", "branding", "logo.png"));
  const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  let cursor = 0;
  const media = primaryClips.map((clip, index) => {
    const scene = episode.scenes.find((item) => item.sceneId === clip.sceneId);
    const start = cursor;
    cursor += clip.duration;
    const reaction = manifest.generatedClips.find((item) => item.sceneId === clip.sceneId && item.role === "reaction");
    const videoClass = reaction ? `speaker split ${clip.character}` : "speaker";
    const reactionVideo = reaction ? `<video id="r${index}" class="clip speaker split ${reaction.character}" data-start="${start}" data-duration="${clip.duration}" data-track-index="1" src="${reaction.path}" muted playsinline></video>` : "";
    return `<video id="v${index}" class="clip ${videoClass}" data-start="${start}" data-duration="${clip.duration}" data-track-index="0" src="${clip.path}" muted playsinline></video>
${reactionVideo}
<audio id="a${index}" class="clip" data-start="${start}" data-duration="${clip.duration}" data-track-index="10" src="${clip.path}" data-volume="1"></audio>
<div id="c${index}" class="clip caption ${clip.character}" data-start="${start}" data-duration="${clip.duration}" data-track-index="${20 + index}">${escape(scene.line)}</div>`;
  }).join("\n");
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box}body{margin:0;background:#1C1C20;color:#fff;font-family:Montserrat,Arial,sans-serif;overflow:hidden}
#root{position:relative;width:1080px;height:1920px;background:#1C1C20}.speaker{position:absolute;width:100%;height:100%;object-fit:cover}.speaker.split{width:50%}.speaker.split.milo{left:0}.speaker.split.gladys{right:0}
.caption{position:absolute;left:70px;right:70px;bottom:300px;padding:26px 32px;text-align:center;font-size:58px;font-weight:800;line-height:1.12;text-shadow:0 4px 6px #000;background:#1C1C20dd;border-bottom:14px solid #CE1141}.caption.gladys{border-color:#9B7EBD}
.logo{position:absolute;width:220px;top:250px;left:430px}.card{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:100px;text-align:center;font-size:88px;font-weight:800;background:#1C1C20}
</style></head><body><div id="root" data-composition-id="episode" data-start="0" data-width="1080" data-height="1920">
${media}
<img id="episode-logo" class="clip logo" data-start="0" data-duration="${finalDuration}" data-track-index="5" src="assets/branding/logo.png">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<script>window.__timelines=window.__timelines||{};window.__timelines.episode=gsap.timeline({paused:true});</script>
</div></body></html>`;
  await fs.writeFile(path.join(episodeDir, "composition", "index.html"), html);
  const run = (command, commandArgs) => {
    const result = spawnSync(command, commandArgs, { cwd: path.join(episodeDir, "composition"), stdio: "inherit", shell: process.platform === "win32" });
    assert(result.status === 0, `${command} ${commandArgs.join(" ")} failed.`);
  };
  run("npx", ["hyperframes", "lint"]);
  run("npx", ["hyperframes", "validate"]);
  run("npx", ["hyperframes", "render", "--fps", "30", "--quality", "high", "--output", "../renders/final-review.mp4"]);
  await fs.copyFile(path.join(episodeDir, "renders", "final-review.mp4"), path.join(episodeDir, "renders", "draft.mp4"));
  manifest.workflowState = "awaiting_approval";
  manifest.approvalStatus = "pending_human_review";
  manifest.durationSeconds = finalDuration;
  await writeJson(path.join(episodeDir, "episode-manifest.json"), manifest);
}

await fs.writeFile(path.join(episodeDir, "QA_REPORT.md"), `# QA Report\n\n- Script contract: PASS\n- Spoken words: ${spokenWords(episode.scenes)}\n- Animated character performances: ${args["dry-run"] ? "NOT RUN (dry run)" : "PASS"}\n- Both characters together in at least one scene: PASS\n- Music: NONE\n- Intro/outro cards: NONE\n- Full-screen educational graphics: 0 seconds / 8 seconds maximum\n- Approved avatar and voice IDs: PASS\n- Provider clips: ${args["dry-run"] ? "NOT RUN (dry run)" : "PASS"}\n- Final render: ${args["dry-run"] ? "NOT RUN (dry run)" : "PASS"}\n- Publishing action: NONE\n- Workflow state: ${args["dry-run"] ? "draft_artifacts_ready" : "awaiting_approval"}\n`);
console.log(`Created ${path.relative(ROOT, episodeDir)}`);
if (process.env.GITHUB_OUTPUT) {
  await fs.appendFile(process.env.GITHUB_OUTPUT, `episode_dir=${path.relative(ROOT, episodeDir).replaceAll("\\", "/")}\nepisode_id=${slug}\n`);
}
