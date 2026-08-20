// Run from ~/Desktop/orbitwelve/frontend:
//   node patch-seed-dotenv.js
//
// Patches both seed-services-grid.ts and seed-services-pathway.ts to
// explicitly load .env.local. `import "dotenv/config"` only auto-loads
// .env by default — Next.js loads .env.local for you at dev/build time,
// but a standalone tsx script run outside Next.js doesn't get that for
// free, so MONGODB_URI comes back undefined even though the file and
// key both exist.

const fs = require("fs");

const files = ["seed-services-grid.ts", "seed-services-pathway.ts"];

const find = `import "dotenv/config";`;
const replace = `import { config } from "dotenv";\nconfig({ path: ".env.local" });`;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.log(`✗ NOT FOUND — skipped: ${file} (not in current directory)`);
    continue;
  }

  let content = fs.readFileSync(file, "utf8");

  if (content.includes(find)) {
    content = content.replace(find, replace);
    fs.writeFileSync(file, content, "utf8");
    console.log(`✓ Patched: ${file}`);
  } else {
    console.log(`✗ NOT FOUND — skipped: ${file} (import line didn't match)`);
  }
}