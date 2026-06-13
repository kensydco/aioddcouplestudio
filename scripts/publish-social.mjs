import fs from "node:fs/promises";
import path from "node:path";
import { assert } from "./lib.mjs";

const args = Object.fromEntries(process.argv.slice(2).map((arg, i, all) => arg.startsWith("--") ? [arg.slice(2), all[i + 1]] : []).filter(Boolean));
const platforms = new Set((args.platforms || "youtube").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean));
const root = path.resolve(args.root || "approved-artifact");
const files = [];
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(target); else files.push(target);
  }
}
await walk(root);
const video = files.find((file) => file.endsWith(path.join("renders", "final-review.mp4")));
const metadataFile = files.find((file) => file.endsWith("publish-metadata.json"));
assert(video && metadataFile, "Approved artifact must contain final-review.mp4 and publish-metadata.json.");
const metadata = JSON.parse(await fs.readFile(metadataFile, "utf8"));
const bytes = await fs.readFile(video);
const results = {};

async function youtube() {
  for (const name of ["YOUTUBE_CLIENT_ID", "YOUTUBE_CLIENT_SECRET", "YOUTUBE_REFRESH_TOKEN"]) assert(process.env[name], `${name} is required.`);
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({
    client_id: process.env.YOUTUBE_CLIENT_ID, client_secret: process.env.YOUTUBE_CLIENT_SECRET,
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN, grant_type: "refresh_token"
  })});
  assert(tokenResponse.ok, `YouTube token refresh failed: ${await tokenResponse.text()}`);
  const { access_token } = await tokenResponse.json();
  const init = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
    method: "POST", headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Length": String(bytes.length), "X-Upload-Content-Type": "video/mp4" },
    body: JSON.stringify({ snippet: { title: metadata.youtube.title, description: metadata.youtube.description, tags: metadata.youtube.tags, categoryId: "27" }, status: { privacyStatus: metadata.youtube.privacyStatus || "public", selfDeclaredMadeForKids: false } })
  });
  assert(init.ok && init.headers.get("location"), `YouTube upload initialization failed: ${await init.text()}`);
  const upload = await fetch(init.headers.get("location"), { method: "PUT", headers: { "Content-Type": "video/mp4", "Content-Length": String(bytes.length) }, body: bytes });
  assert(upload.ok, `YouTube upload failed: ${await upload.text()}`);
  return await upload.json();
}

async function tiktok() {
  assert(process.env.TIKTOK_ACCESS_TOKEN, "TIKTOK_ACCESS_TOKEN is required.");
  const init = await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
    method: "POST", headers: { Authorization: `Bearer ${process.env.TIKTOK_ACCESS_TOKEN}`, "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ post_info: { title: metadata.tiktok.title, privacy_level: metadata.tiktok.privacyLevel || "SELF_ONLY", disable_duet: false, disable_comment: false, disable_stitch: false, brand_content_toggle: false, brand_organic_toggle: true, is_aigc: true }, source_info: { source: "FILE_UPLOAD", video_size: bytes.length, chunk_size: bytes.length, total_chunk_count: 1 } })
  });
  const initData = await init.json();
  assert(init.ok && initData.error?.code === "ok", `TikTok initialization failed: ${JSON.stringify(initData)}`);
  const upload = await fetch(initData.data.upload_url, { method: "PUT", headers: { "Content-Type": "video/mp4", "Content-Length": String(bytes.length), "Content-Range": `bytes 0-${bytes.length - 1}/${bytes.length}` }, body: bytes });
  assert(upload.ok, `TikTok upload failed: ${await upload.text()}`);
  return { publishId: initData.data.publish_id };
}

async function instagram() {
  for (const name of ["INSTAGRAM_ACCESS_TOKEN", "INSTAGRAM_ACCOUNT_ID", "INSTAGRAM_VIDEO_URL"]) assert(process.env[name], `${name} is required.`);
  const create = new URL(`https://graph.facebook.com/v23.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media`);
  create.search = new URLSearchParams({ media_type: "REELS", video_url: process.env.INSTAGRAM_VIDEO_URL, caption: metadata.instagram.caption, access_token: process.env.INSTAGRAM_ACCESS_TOKEN });
  const containerResponse = await fetch(create, { method: "POST" });
  const container = await containerResponse.json();
  assert(containerResponse.ok && container.id, `Instagram container failed: ${JSON.stringify(container)}`);
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const status = await (await fetch(`https://graph.facebook.com/v23.0/${container.id}?fields=status_code&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`)).json();
    if (status.status_code === "FINISHED") break;
    assert(status.status_code !== "ERROR", `Instagram processing failed: ${JSON.stringify(status)}`);
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
  const publish = await fetch(`https://graph.facebook.com/v23.0/${process.env.INSTAGRAM_ACCOUNT_ID}/media_publish?creation_id=${container.id}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`, { method: "POST" });
  const data = await publish.json();
  assert(publish.ok && data.id, `Instagram publish failed: ${JSON.stringify(data)}`);
  return data;
}

if (platforms.has("youtube")) results.youtube = await youtube();
if (platforms.has("tiktok")) results.tiktok = await tiktok();
if (platforms.has("instagram")) results.instagram = await instagram();
await fs.writeFile("publish-results.json", `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results, null, 2));
