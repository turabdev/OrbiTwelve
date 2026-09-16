import TopNavBar from "@/components/TopNavBar";
import Hero from "@/components/Hero";
import Footer from "@/components/footer";
import RollingStats from "@/components/rolling";
import ServicesList from "@/components/ServicesList";
import HoverExpandPanels from "@/components/HoverExpendPanels";
import DragCarousel from "@/components/DragCarousel";
import ServiceCardSection from "@/components/ServiceCardSection";
import PortfolioCarousel from "@/components/ProjectCarousel";
import { connectDB } from "@/lib/utils/db";
import SiteContent from "@/lib/models/SiteContent";
import type { HeroProps } from "@/types/portfolios";
import Service, { IService } from "@/lib/models/Service";

async function getHeroContent(): Promise<HeroProps | undefined> {
  await connectDB();
  const doc = await SiteContent.findOne({ key: "home-hero" }).lean();
  return doc?.fields as HeroProps | undefined;
}

async function getServices(): Promise<IService[]> {
  await connectDB();
  const docs = await Service.find({ published: true })
    .sort({ order: 1 })
    .lean();
  return docs as unknown as IService[];
}

export default async function Home() {
  const [heroContent, services] = await Promise.all([
    getHeroContent(),
    getServices(),
  ]);

  return (
    <div className="relative">
      <TopNavBar />
      <div className="mt-20"><Hero {...heroContent} /></div>

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

      <RollingStats
        items={[
          { value: "450+", label: "Clients served" },
          { value: "300+", label: "Projects delivered" },
          { value: "15+", label: "Industries" },
          { value: "20+", label: "Countries" },
          { value: "10+", label: "Employees" },
        ]}
      />
      

      <HoverExpandPanels
        items={[
          {
            slug: "web",
            title: "Web",
            summary: "Marketing sites and product front-ends, built fast.",
            imageUrl: "https://picsum.photos/seed/orbitwelve-service-web/800/600",
          },
          {
            slug: "brand",
            title: "Brand",
            summary: "Identity systems teams can actually ship with.",
            imageUrl: "https://picsum.photos/seed/orbitwelve-service-brand/800/600",
          },
          {
            slug: "product",
            title: "Product",
            summary: "UX and front-end engineering for SaaS and apps.",
            imageUrl: "https://picsum.photos/seed/orbitwelve-service-product/800/600",
          },
        ]}
      />

      <div className="mb-32" ><ServiceCardSection services={services} /></div> 
      <PortfolioCarousel
        section={{
          eyebrow: "Selected Work",
          title: "Recent Projects",
          description: "A look at what we've shipped for clients.",
        }}
        items={[
          {
            slug: "demo-project-1",
            title: "Demo Project",
            category: "Web",
            media: "https://picsum.photos/seed/orbitwelve-project-1/800/1100",
          },
          {
            slug: "demo-project-2",
            title: "Demo Project",
            category: "Web",
            media: "https://picsum.photos/seed/orbitwelve-project-2/800/1100",
          },
          {
            slug: "demo-project-3",
            title: "Demo Project",
            category: "Web",
            media: "https://picsum.photos/seed/orbitwelve-project-3/800/1100",
          },
          {
            slug: "demo-project-4",
            title: "Demo Project",
            category: "Web",
            media: "https://picsum.photos/seed/orbitwelve-project-4/800/1100",
          },
        ]}
      />
      <Footer />
    </div>
  );
}