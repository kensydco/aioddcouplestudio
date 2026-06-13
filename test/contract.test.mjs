import test from "node:test";
import assert from "node:assert/strict";
import { CHARACTERS, spokenWords, validateEpisode } from "../scripts/lib.mjs";

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
