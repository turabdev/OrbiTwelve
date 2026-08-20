// Run from ~/Desktop/orbitwelve/frontend:
//   npx tsx seed-services-grid.ts
//
// Seeds lib/models/Service.ts (the ServicesView.tsx grid) with all 12
// real services from the client's live site (orbitwelve.com/services).
// Upserts by slug — safe to re-run, won't duplicate.
//
// NOTE: Service.ts's `image` field has no source in the pasted content
// (that page listed titles + one-line summaries only, no per-service
// media). Left as "" here — same open item as the tools/logoUrl gaps
// flagged during the pathway work; fill via the dashboard once that's
// built, or paste real image URLs and I'll fold them into a v2 of this
// script.
import { config } from "dotenv";
config({ path: ".env.local" });
(async () => {

const { connectDB } = await import("./lib/utils/db");
const { default: Service } = await import("./lib/models/Service");

const services = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description:
      "Build your brand's voice and grow your community with full-funnel social media management.",
    tools: [],
    order: 0,
    image: "",
    published: true,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "From PPC and content to automation and funnels—attract, convert, and retain customers.",
    tools: [],
    order: 1,
    image: "",
    published: true,
  },
  {
    slug: "android-app-development",
    title: "Android App Development",
    description:
      "Secure, scalable, and user-friendly Android applications optimized for speed and UX.",
    tools: [],
    order: 2,
    image: "",
    published: true,
  },
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Modern, responsive, SEO-ready websites with end-to-end performance optimization.",
    tools: [],
    order: 3,
    image: "",
    published: true,
  },
  {
    slug: "graphic-designing",
    title: "Graphic Designing",
    description:
      "Logos, brand kits, campaigns, and UI/UX that deliver a memorable brand presence.",
    tools: [],
    order: 4,
    image: "",
    published: true,
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    description:
      "Corporate videos, product reels, promos, and motion graphics aligned to your story.",
    tools: [],
    order: 5,
    image: "",
    published: true,
  },
  {
    slug: "academic-research-writing",
    title: "Academic Research Writing",
    description:
      "From literature reviews to journal-ready manuscripts—structured and compliant.",
    tools: [],
    order: 6,
    image: "",
    published: true,
  },
  {
    slug: "seo-management",
    title: "SEO Management",
    description:
      "Rank higher with data-driven keyword research, on-page optimization, and backlinks.",
    tools: [],
    order: 7,
    image: "",
    published: true,
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    description:
      "Automation, analytics, and creative funnels to acquire qualified leads efficiently.",
    tools: [],
    order: 8,
    image: "",
    published: true,
  },
  {
    // NOTE: source page uses the slug "cybersecurity-and-intelligence"
    // (with "and"), which differs from the pathway's "cybersecurity-intelligence"
    // (serviceId, no "and") already committed in Servicespathway.tsx.
    // Kept exactly as it appears on the live site for this model, since
    // Service.ts's slug is this model's own routing key, independent of
    // ServicesPathwayNode's serviceId — the two are NOT required to match,
    // per the two-separate-arrays decision. Flagging so it's a known
    // difference, not a copy error.
    slug: "cybersecurity-and-intelligence",
    title: "Cybersecurity & Intelligence",
    description:
      "OSINT, forensics, VAPT, and research writing to protect what matters most.",
    tools: [],
    order: 9,
    image: "",
    published: true,
  },
  {
    slug: "infrastructure-and-operations",
    title: "Infrastructure & Operations",
    description:
      "IT support, network security, and Linux administration for a reliable backbone.",
    tools: [],
    order: 10,
    image: "",
    published: true,
  },
  {
    slug: "secure-development",
    title: "Secure Development",
    description:
      "Secure full-stack development and AI in cybersecurity for next-gen defense.",
    tools: [],
    order: 11,
    image: "",
    published: true,
  },
];

async function seed() {
  await connectDB();
  let created = 0;
  let updated = 0;

  for (const svc of services) {
    const existing = await Service.findOne({ slug: svc.slug });
    await Service.findOneAndUpdate({ slug: svc.slug }, svc, {
      upsert: true,
      new: true,
    });
    if (existing) updated++;
    else created++;
  }

  console.log(`Done. ${created} created, ${updated} updated.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
})();
