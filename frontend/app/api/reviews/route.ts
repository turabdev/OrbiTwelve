import { NextResponse } from "next/server";
import cloudinary from "@/lib/utils/cloudinary";

export type ReviewScreenshot = {
  id: string;
  imageUrl: string;
  country: string; // slug, e.g. "usa", "saudi-arabia"
  width: number;
  height: number;
};

// Cloudinary folder scheme: reviews/<country-slug>/<anything>.{jpg,png,webp}
const ROOT_FOLDER = "reviews";

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression(`folder:${ROOT_FOLDER}/*`)
      .sort_by("created_at", "desc")
      .max_results(200)
      .execute();

    const screenshots: ReviewScreenshot[] = (result.resources ?? []).map(
      (r: any) => {
        // r.folder looks like "reviews/usa" -> country slug is the segment after ROOT_FOLDER
        const parts = String(r.folder ?? "").split("/");
        const country = parts[parts.length - 1] || "unknown";

        return {
          id: r.asset_id ?? r.public_id,
          imageUrl: r.secure_url,
          country,
          width: r.width,
          height: r.height,
        };
      }
    );

    return NextResponse.json({ screenshots });
  } catch (err) {
    console.error("Failed to list review screenshots:", err);
    return NextResponse.json(
      { screenshots: [], error: "Failed to load reviews" },
      { status: 500 }
    );
  }
}