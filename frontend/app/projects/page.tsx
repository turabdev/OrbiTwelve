import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import type { HeroProps } from "@/types/portfolios";
import DragCarousel from "@/components/DragCarousel";
import { connectDB } from "@/lib/utils/db";
import SiteContent from "@/lib/models/SiteContent";

async function getHeroContent(): Promise<Partial<HeroProps>> {
  await connectDB();
  const doc = await SiteContent.findOne({ key: "projects-hero" }).lean();
  return (doc?.fields ?? {}) as Partial<HeroProps>;
}

export default async function Projects() {
  const heroContent = await getHeroContent();

  return (
    <>
      <TopNavBar />
      <div className="mt-20"> <Hero {...heroContent} /></div>
      <DragCarousel
        items={[
          {
            label: "Demo Project",
            category: "Web",
            imageUrl: "https://picsum.photos/seed/orbitwelve-project-1/800/1100",
            href: "https://turabzaidi.vercel.app",
          },
          {
            label: "Demo Project",
            category: "Web",
            imageUrl: "https://picsum.photos/seed/orbitwelve-project-1/800/1100",
            href: "https://turabzaidi.vercel.app",
          },
          {
            label: "Demo Project",
            category: "Web",
            imageUrl: "https://picsum.photos/seed/orbitwelve-project-1/800/1100",
            href: "https://turabzaidi.vercel.app",
          },
        ]}
      />

      <Footer />
    </>
  );
}
