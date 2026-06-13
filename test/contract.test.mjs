import test from "node:test";
import assert from "node:assert/strict";
import { CHARACTERS, MAX_EPISODE_DURATION_SECONDS, MAX_FULL_SCREEN_EDUCATION_GRAPHICS_SECONDS, spokenWords, validateEpisode } from "../scripts/lib.mjs";

test("locked provider IDs remain unchanged", () => {
  assert.equal(CHARACTERS.milo.avatarId, "13d2fb313843409f90480c856b31f986");
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

test("validator requires a scene with both animated characters", () => {
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
