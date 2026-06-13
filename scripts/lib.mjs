import fs from "node:fs/promises";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..");
export const CHARACTERS = {
  milo: { avatarId: "13d2fb313843409f90480c856b31f986", voiceId: "F08jhUNBtlE8Gs2Bnrj1", speed: 1.15 },
  gladys: { avatarId: "5917b84d9e224e46918a61245456efbe", voiceId: "fb0de32da8c4499f9b6e27245b8794c1", speed: 0.92 }
};

export const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const spokenWords = (scenes) => scenes.reduce((n, scene) => n + scene.line.trim().split(/\s+/).length, 0);
export const assert = (condition, message) => { if (!condition) throw new Error(message); };
export const exists = async (file) => fs.access(file).then(() => true, () => false);
export const writeJson = (file, value) => fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
export const readText = (file) => fs.readFile(path.join(ROOT, file), "utf8");

export function validateEpisode(episode) {
  assert(episode.scenes.length >= 4 && episode.scenes.length <= 6, "Episode must contain 4-6 dialogue turns.");
  assert(spokenWords(episode.scenes) >= 65 && spokenWords(episode.scenes) <= 80, "Episode must contain 65-80 spoken words.");
  assert(episode.scenes.some((s) => s.character === "milo"), "Milo must speak.");
  assert(episode.scenes.some((s) => s.character === "gladys"), "Gladys must speak.");
  assert(episode.scenes.some((s) => /harold/i.test(s.line)), "Gladys must mention Harold.");
  assert(episode.scenes.some((s) => /mr\.? whiskers|pizza|lego|game|snack|dinosaur/i.test(s.line)), "Milo needs a kid-world analogy.");
  assert(episode.takeaway?.trim(), "A single takeaway is required.");
}

export async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}
