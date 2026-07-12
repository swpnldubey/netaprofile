/**
 * fetch-photos.mjs
 *
 * One-time script to auto-download politician photos from Wikipedia.
 * Run: node scripts/fetch-photos.mjs
 *
 * What it does:
 *   1. Reads every JSON in data/politicians/
 *   2. Hits the Wikipedia API to get the page's main image
 *   3. Downloads the image to public/politicians/photos/<slug>.jpg
 *   4. Updates photo_url in the JSON file
 *
 * Requirements: Node 18+ (built-in fetch). No npm install needed.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const POLITICIANS_DIR = path.join(ROOT, "data", "politicians");
const PHOTOS_DIR = path.join(ROOT, "public", "politicians", "photos");

// Ensure the photos directory exists
fs.mkdirSync(PHOTOS_DIR, { recursive: true });

async function getWikipediaImage(wikipediaUrl) {
  if (!wikipediaUrl) return null;

  // Extract page title from URL
  // e.g. https://en.wikipedia.org/wiki/Nirmala_Sitharaman → Nirmala_Sitharaman
  const match = wikipediaUrl.match(/\/wiki\/(.+)$/);
  if (!match) return null;
  const pageTitle = decodeURIComponent(match[1]);

  const apiUrl =
    `https://en.wikipedia.org/w/api.php?` +
    new URLSearchParams({
      action: "query",
      titles: pageTitle,
      prop: "pageimages",
      pithumbsize: 400,     // request 400px wide thumbnail
      format: "json",
      origin: "*",
    });

  try {
    const res = await fetch(apiUrl, {
      headers: { "User-Agent": "NetaProfile/1.0 (netaprofile@gmail.com)" },
    });
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;

    const page = Object.values(pages)[0];
    return page?.thumbnail?.source ?? null;
  } catch (e) {
    console.error(`  ✗ API error for ${pageTitle}:`, e.message);
    return null;
  }
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: { "User-Agent": "NetaProfile/1.0 (netaprofile@gmail.com)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
}

async function processAll() {
  const files = fs
    .readdirSync(POLITICIANS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  console.log(`\n🔍 Processing ${files.length} politicians...\n`);

  for (const file of files) {
    const filePath = path.join(POLITICIANS_DIR, file);
    const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const { slug, name, photo_url, external_sources } = json;

    // Skip if photo already downloaded
    const ext = ".jpg";
    const destPath = path.join(PHOTOS_DIR, `${slug}${ext}`);
    const publicPath = `/politicians/photos/${slug}${ext}`;

    if (photo_url && photo_url.startsWith("/politicians/photos/")) {
      if (fs.existsSync(destPath)) {
        console.log(`  ✓ ${name} — already downloaded, skipping`);
        continue;
      }
    }

    console.log(`  → ${name}`);

    const imageUrl = await getWikipediaImage(external_sources?.wikipedia);
    if (!imageUrl) {
      console.log(`    ✗ No Wikipedia image found`);
      continue;
    }

    try {
      await downloadImage(imageUrl, destPath);
      // Update photo_url in JSON
      json.photo_url = publicPath;
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
      console.log(`    ✓ Downloaded → ${publicPath}`);
    } catch (e) {
      console.log(`    ✗ Download failed: ${e.message}`);
    }

    // Be polite to Wikipedia's servers — small delay between requests
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("\n✅ Done! Run `git add data/politicians/ public/politicians/` to stage changes.\n");
}

processAll();
