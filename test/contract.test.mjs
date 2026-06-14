import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { CHARACTERS, MAX_EPISODE_DURATION_SECONDS, MAX_FULL_SCREEN_EDUCATION_GRAPHICS_SECONDS, spokenWords, validateEpisode } from "../scripts/lib.mjs";

test("locked provider IDs remain unchanged", () => {
  assert.equal(CHARACTERS.milo.avatarId, "e9a00cac1e934e6f80bd550fd2803d10");
  assert.equal(CHARACTERS.gladys.voiceId, "fb0de32da8c4499f9b6e27245b8794c1");
});

test("word counter counts scene dialogue", () => {
  assert.equal(spokenWords([{ line: "one two" }, { line: "three four five" }]), 5);
});

test("validator rejects short scripts", () => {
  assert.throws(() => validateEpisode({ takeaway: "x", scenes: [{ character: "milo", line: "pizza" }, { character: "gladys", line: "Harold" }] }));
});

test("full-screen educational graphics are capped at eight seconds", () => {
  assert.equal(MAX_FULL_SCREEN_EDUCATION_GRAPHICS_SECONDS, 8);
});

test("episode duration ceiling is forty-five seconds", () => {
  assert.equal(MAX_EPISODE_DURATION_SECONDS, 45);
});

test("validator requires a scene showing both characters", () => {
  assert.throws(() => validateEpisode({
    takeaway: "x",
    scenes: [
      { character: "milo", line: "Basically pizza games and Mister Whiskers make clear instructions easy for every curious small business owner to understand today.", framing: "close-up" },
      { character: "gladys", line: "Harold always needed a written list before attempting important errands because vague directions sent him to the wrong store.", framing: "close-up" },
      { character: "milo", line: "Better directions help the computer return a useful answer instead of guessing what the owner wanted.", framing: "close-up" },
      { character: "gladys", line: "That sounds practical enough for me to try without calling the neighborhood computer fellow for extra help.", framing: "close-up" }
    ]
  }), /together/);
});

test("production source prohibits logos and animated listener reactions", () => {
  const source = fs.readFileSync(new URL("../scripts/run-episode.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /episode-logo|branding\/logo|reactionResponse|role: "reaction"/);
  assert.match(source, /class="clip listener/);
  assert.match(source, /mouthMovementPolicy: "speaking_character_only"/);
});
