import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";
import ClientMap from "@/components/Clientmap";
import TestimonialMarquee from "@/components/testtimonialmarquee";
import cloudinary from "@/lib/utils/cloudinary";
import type { ReviewScreenshot } from "@/app/api/reviews/route";
import Hero from "@/components/Hero";

async function getScreenshots(): Promise<ReviewScreenshot[]> {
  try {
    const result = await cloudinary.search
      .expression("folder:reviews/*")
      .sort_by("created_at", "desc")
      .max_results(200)
      .execute();

    return (result.resources ?? []).map((r: any) => {
      const parts = String(r.folder ?? "").split("/");
      const country = parts[parts.length - 1] || "unknown";
      return {
        id: r.asset_id ?? r.public_id,
        imageUrl: r.secure_url,
        country,
        width: r.width,
        height: r.height,
      };
    });
  } catch (err) {
    console.error("Failed to load review screenshots:", err);
    return [];
  }
}

export default async function Reviews() {
  const screenshots = await getScreenshots();

  return (
    <>
      <TopNavBar />
      <Hero/>

      <div className="mx-6 mt-24 sm:mx-12 lg:mx-36">
        <div className="mb-16">
          <ClientMap />
        </div>
        <TestimonialMarquee screenshots={screenshots} />
      </div>

      <Footer />
    </>
  );
}