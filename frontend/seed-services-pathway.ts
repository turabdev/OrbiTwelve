// Run from ~/Desktop/orbitwelve/frontend:
//   npx tsx seed-services-pathway.ts
//
// Seeds lib/models/ServicesPathway.ts (ServicesPathwayNode) with the 3
// real pathway services. Upserts by serviceId — safe to re-run.
//
// Source of truth for description text: the client's live services page
// content (this session's paste), matched to the 3 services that overlap
// between the grid (12 services) and the pathway (3 real, 9 dropped).
//
// Source of truth for tools/logoUrl/projects: the ORIGINAL hardcoded
// `services` array that was in components/Servicespathway.tsx before the
// CMS refactor (first pasted at the start of this thread) — that data
// was already real and correct, not placeholder, EXCEPT the two flagged
// items below which were marked PLACEHOLDER in-code from the start.
//
// Still needs real values before this is fully accurate:
//   - orbitSize: defaulting to 120 (the original hardcoded itemSize) for
//     all 3 — no per-service value was ever specified, so this is a
//     starting point to adjust via the dashboard, not a measured choice.
//   - Burp Suite / Metasploit logoUrls: these were already flagged
//     PLACEHOLDER in the original file (no Simple Icons entry exists for
//     either) — carried over as-is rather than silently "fixed" with a
//     guess. Replace via the dashboard once real assets are available.

import { config } from "dotenv";
config({ path: ".env.local" });
(async () => {

const { connectDB } = await import("./lib/utils/db");
const { default: ServicesPathwayNode } = await import("./lib/models/ServicesPathway");


const services = [
  {
    serviceId: "web-development",
    title: "Web Development",
    // Description below is the ORIGINAL Servicespathway.tsx copy, kept
    // over the shorter grid-page summary ("Modern, responsive,
    // SEO-ready websites...") — the pathway's description is meant to
    // be longer/more narrative than the grid tile's one-liner, per the
    // two-surfaces distinction (grid = scannable tile, pathway =
    // full-screen pinned panel with room for real copy).
    description:
      "We build fast, scalable web applications from the ground up — frontend to backend, architected to grow with the product.",
    tools: [
      { name: "Next.js", logoUrl: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
      { name: "React", logoUrl: "https://static.cdnlogo.com/logos/r/85/react.svg" },
      { name: "TypeScript", logoUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
      { name: "Node.js", logoUrl: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Tailwind CSS", logoUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    ],
    orbitSize: 120,
    order: 0,
    projects: [
      {
        title: "Client Portal Rebuild",
        summary: "Migrated a legacy dashboard to a modern React stack.",
        href: "/projects/client-portal",
      },
      {
        title: "E-commerce Platform",
        summary: "Headless storefront with sub-second page loads.",
        href: "/projects/ecommerce-platform",
      },
    ],
    published: true,
  },
  {
    serviceId: "cybersecurity-intelligence",
    title: "Cybersecurity & Intelligence",
    description:
      "We assess, harden, and monitor infrastructure — identifying exposure before it becomes an incident.",
    tools: [
      { name: "Nmap", logoUrl: "https://cdn.simpleicons.org/nmap/FFFFFF" },
      { name: "Wireshark", logoUrl: "https://cdn.simpleicons.org/wireshark/1679A7" },
      // PLACEHOLDER, carried over as-is — see file header note.
      { name: "Burp Suite", logoUrl: "https://cdn.simpleicons.org/portswigger/FF6633" },
      { name: "Metasploit", logoUrl: "https://cdn.simpleicons.org/metasploit/2596CD" },
    ],
    orbitSize: 120,
    order: 1,
    projects: [
      {
        title: "Infrastructure Pentest",
        summary: "Full external assessment for a fintech client.",
        href: "/projects/infra-pentest",
      },
      {
        title: "Threat Intelligence Feed",
        summary: "Automated OSINT pipeline for early-warning alerts.",
        href: "/projects/threat-intel-feed",
      },
    ],
    published: true,
  },
  {
    serviceId: "seo-management",
    title: "SEO Management",
    description:
      "We drive organic visibility through technical SEO, content strategy, and ongoing performance measurement.",
    tools: [
      { name: "Google Search Console", logoUrl: "https://cdn.simpleicons.org/googlesearchconsole/458CF5" },
      { name: "Ahrefs", logoUrl: "https://cdn.simpleicons.org/ahrefs/FF7A50" },
      { name: "Screaming Frog", logoUrl: "https://cdn.simpleicons.org/screamingfrog/000000" },
      { name: "Lighthouse", logoUrl: "https://cdn.simpleicons.org/lighthouse/F44B21" },
    ],
    orbitSize: 120,
    order: 2,
    projects: [
      {
        title: "Organic Traffic Turnaround",
        summary: "3x organic sessions in 6 months for a SaaS client.",
        href: "/projects/organic-turnaround",
      },
      {
        title: "Technical SEO Audit",
        summary: "Site-wide crawl fixes lifting Core Web Vitals scores.",
        href: "/projects/technical-seo-audit",
      },
    ],
    published: true,
  },
];

async function seed() {
  await connectDB();
  let created = 0;
  let updated = 0;

  for (const svc of services) {
    const existing = await ServicesPathwayNode.findOne({
      serviceId: svc.serviceId,
    });
    await ServicesPathwayNode.findOneAndUpdate(
      { serviceId: svc.serviceId },
      svc,
      { upsert: true, new: true, runValidators: true }
    );
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
