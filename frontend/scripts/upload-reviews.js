/**
 * Bulk-uploads review screenshots to Cloudinary under reviews/<country-slug>/.
 *
 * Usage:
 *   node scripts/upload-reviews.js /mnt/sda3/orbit12/divided/divided
 *
 * Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * in your environment (same vars lib/utils/cloudinary.ts already uses).
 */

const fs = require("fs");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");

// Plain `node script.js` doesn't auto-load .env.local like Next.js dev/build
// does — load it explicitly so CLOUDINARY_* vars are actually populated.
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Local folder name -> slug used by the app (DEFAULT_COUNTRIES keys in
// components/ClientMap.tsx and the country filter in testtimonialmarquee.tsx).
// Anything not listed here falls back to a lowercased, hyphenated version
// of the folder name itself.
const FOLDER_TO_SLUG = {
  arabia: "saudi-arabia",
  autralia: "australia", // typo in source folder
  "hong kong": "hong-kong",
  Mixed: "mixed",
};

function slugify(folderName) {
  if (FOLDER_TO_SLUG[folderName]) return FOLDER_TO_SLUG[folderName];
  return folderName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function uploadFolder(localDir, folderName) {
  const slug = slugify(folderName);
  const fullPath = path.join(localDir, folderName);
  const files = fs
    .readdirSync(fullPath)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));

  console.log(`\n${folderName} -> reviews/${slug}  (${files.length} images)`);

  let uploaded = 0;
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    try {
      await cloudinary.uploader.upload(filePath, {
        folder: `reviews/${slug}`,
        use_filename: false, // auto-generated public_id, avoids collisions
        unique_filename: true,
        overwrite: false,
      });
      uploaded++;
      process.stdout.write(`  [${uploaded}/${files.length}]\r`);
    } catch (err) {
      console.error(`  FAILED: ${file} — ${err.message}`);
    }
  }
  console.log(`  done: ${uploaded}/${files.length} uploaded`);
  return uploaded;
}

async function main() {
  const rootDir = process.argv[2];
  if (!rootDir) {
    console.error("Usage: node scripts/upload-reviews.js <path-to-divided-folder>");
    process.exit(1);
  }
  if (!fs.existsSync(rootDir)) {
    console.error(`Path does not exist: ${rootDir}`);
    process.exit(1);
  }

  const entries = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((e) => e.isDirectory());

  console.log(`Found ${entries.length} country folders in ${rootDir}`);

  let total = 0;
  for (const entry of entries) {
    total += await uploadFolder(rootDir, entry.name);
  }

  console.log(`\nAll done. ${total} images uploaded total.`);
}

main().catch((err) => {
  console.error("Upload script failed:", err);
  process.exit(1);
});