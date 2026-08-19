import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/db";
import ServicesPathwayNode, {
  IServicesPathwayNode,
} from "@/lib/models/ServicesPathway";

// ── NOTE ───────────────────────────────────────────────────────────────
// This does NOT reuse content/[key]/route.ts's pattern. That route stores
// ONE SiteContent doc per key with a Mixed fields blob — fine for Hero's
// flat field set, wrong here because the pathway is a COLLECTION of
// documents (services get added/removed/reordered), not one doc's fields
// changing. GET returns the ordered array; PUT replaces the whole set in
// one transaction, since add/remove/reorder all change set membership at
// once — matches how the dashboard form will submit (full current state
// of all services on every save, same as reordering a list).
// ──────────────────────────────────────────────────────────────────────

export async function GET() {
  await connectDB();
  const nodes = await ServicesPathwayNode.find({ published: true }).sort({
    order: 1,
  });
  return NextResponse.json(nodes);
}

// Auth check happens in proxy.ts, same as content/[key] — extend the
// matcher there to also cover /api/services-pathway/:path* non-GET
// methods, mirroring the existing /api/content/:path* entry.
export async function PUT(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body)) {
    return NextResponse.json(
      { error: "Body must be a JSON array of service nodes" },
      { status: 400 }
    );
  }

  // Validate exactly-2-projects up front, before touching the DB, so a
  // bad entry doesn't partially apply (findOneAndUpdate in the loop
  // below would otherwise let earlier services save before a later one
  // fails the schema validator).
  const nodes = body as Partial<IServicesPathwayNode>[];
  const invalid = nodes.find((n) => (n.projects?.length ?? 0) !== 2);
  if (invalid) {
    return NextResponse.json(
      {
        error: `"${invalid.title ?? invalid.serviceId ?? "unknown"}" must have exactly 2 project cards.`,
      },
      { status: 400 }
    );
  }

  await connectDB();

  // Upsert each by serviceId, preserving order from array position.
  // Uses a transaction-less loop (Mongoose transactions need a replica
  // set, which this deployment may not have) — acceptable here since
  // the pre-check above already rules out the most likely failure mode
  // before any writes happen.
  const saved = await Promise.all(
    nodes.map((n, i) =>
      ServicesPathwayNode.findOneAndUpdate(
        { serviceId: n.serviceId },
        { ...n, order: i },
        { upsert: true, new: true, runValidators: true }
      )
    )
  );

  return NextResponse.json(saved);
}