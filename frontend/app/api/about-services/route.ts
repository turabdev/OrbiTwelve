import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/db";
import AboutServiceItem, {
  IAboutServiceItem,
} from "@/lib/models/AboutServiceItem";

// Mirrors app/api/services-pathway/route.ts's pattern — a collection,
// not a single-doc Mixed blob, so GET/PUT the whole ordered array rather
// than reusing content/[key]'s per-key-fields shape.
//
// One addition vs. the pathway route: after upserting the submitted
// items, this also deletes any AboutServiceItem NOT in the submitted
// set. The pathway route's findOneAndUpdate-by-serviceId loop doesn't do
// this — a removed-then-saved service just stops matching GET's
// published:true filter but the doc stays in the collection forever.
// Since this collection has no natural unique key from the source data
// (no slug), titles double as the identity key here; doing the explicit
// cleanup now avoids that same latent gap.

export async function GET() {
  await connectDB();
  const items = await AboutServiceItem.find({ published: true }).sort({
    order: 1,
  });
  return NextResponse.json(items);
}

export async function PUT(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body)) {
    return NextResponse.json(
      { error: "Body must be a JSON array of service items" },
      { status: 400 }
    );
  }

  const items = body as Partial<IAboutServiceItem>[];
  const missingTitle = items.find((it) => !it.title?.trim());
  if (missingTitle) {
    return NextResponse.json(
      { error: "Every service needs a title before saving." },
      { status: 400 }
    );
  }

  await connectDB();

  const saved = await Promise.all(
    items.map((it, i) =>
      AboutServiceItem.findOneAndUpdate(
        { title: it.title },
        { ...it, order: i },
        { upsert: true, new: true, runValidators: true }
      )
    )
  );

  // Remove any doc not present in this submission — keeps the
  // collection in sync with dashboard removals instead of leaving
  // orphaned rows behind.
  const keepTitles = items.map((it) => it.title);
  await AboutServiceItem.deleteMany({ title: { $nin: keepTitles } });

  return NextResponse.json(saved);
}
