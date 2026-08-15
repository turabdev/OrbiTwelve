import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

console.log("CWD:", process.cwd());
console.log("MONGODB_URI loaded:", process.env.MONGODB_URI ? "YES" : "NO — still undefined");

import { connectDB } from "@/lib/utils/db";
import SiteContent from "@/lib/models/SiteContent";

const IMAGE_URL =
  "https://res.cloudinary.com/meszy76h/image/upload/v1786778931/realistic-technology-background_52683-73672.avif";

async function main() {
  await connectDB();

  await SiteContent.findOneAndUpdate(
    { key: "about-hero" },
    {
      key: "about-hero",
      fields: {
        eyebrow: "Orbitwelve",
        title: "About Orbitwelve",
        description:
          "A short message from our CEO on what drives Orbitwelve's approach to digital growth.",
        trust: "Trusted by ambitious teams",
        background: IMAGE_URL,
        thumbnail: IMAGE_URL,
      },
      updatedAt: new Date(),
    },
    { upsert: true, new: true }
  );

  console.log("Seeded about-hero SiteContent doc.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});