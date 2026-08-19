// Run from ~/Desktop/orbitwelve/frontend:
//   node patch-services-view.js
//
// Does exact substring find-and-replace, not regex — sidesteps sed's
// silent no-op on a whitespace/tab mismatch. Reports FOUND/NOT FOUND
// per edit instead of doing nothing quietly, so a mismatch surfaces
// immediately instead of three turns later.

const fs = require("fs");
const path = "app/services/ServicesView.tsx";

let content = fs.readFileSync(path, "utf8");
let appliedCount = 0;

function applyEdit(label, find, replace) {
  if (content.includes(find)) {
    content = content.replace(find, replace);
    console.log(`✓ FOUND & APPLIED: ${label}`);
    appliedCount++;
  } else {
    console.log(`✗ NOT FOUND — skipped: ${label}`);
    console.log(`  Looking for: ${JSON.stringify(find)}`);
  }
}

// Edit 1 — import
applyEdit(
  "add IServicesPathwayNode import",
  `import type { HeroProps } from "@/types/portfolios";`,
  `import type { HeroProps } from "@/types/portfolios";\nimport type { IServicesPathwayNode } from "@/lib/models/ServicesPathway";`
);

// Edit 2 — extend props type
applyEdit(
  "extend ServicesViewProps type",
  `type ServicesViewProps = {\n  heroContent?: Partial<HeroProps>;\n};`,
  `type ServicesViewProps = {\n  heroContent?: Partial<HeroProps>;\n  pathwayServices?: IServicesPathwayNode[];\n};`
);

// Edit 3 — destructure with default
applyEdit(
  "add pathwayServices to function signature",
  `export default function ServicesView({ heroContent }: ServicesViewProps) {`,
  `export default function ServicesView({ heroContent, pathwayServices = [] }: ServicesViewProps) {`
);

if (appliedCount === 3) {
  fs.writeFileSync(path, content, "utf8");
  console.log("\nAll 3 edits applied — file written.");
} else {
  console.log(
    `\n${appliedCount}/3 edits matched — file NOT written (all-or-nothing, to avoid a half-patched file). Paste this output back.`
  );
}
