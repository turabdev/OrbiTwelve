import TopNavBar from "@/components/TopNavBar";
import Hero from "@/components/Hero";
import Footer from "@/components/footer";
import RollingStats from "@/components/rolling";
import ServicesList from "@/components/ServicesList";
import HoverExpandPanels from "@/components/HoverExpendPanels";
import DragCarousel from "@/components/DragCarousel";
import ServiceCardSection from "@/components/ServiceCardSection";
import PortfolioCarousel from "@/components/ProjectCarousel";




export default function Home() {
  return (
    <div className="relative">
      <TopNavBar />
      <div className="mt-20"><Hero /></div>

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
          { value: "5+", label: "Projects delivered" },
          { value: "3+", label: "Years building" },
          { value: "12+", label: "Repeat clients" },
          { value: "100%", label: "On-time delivery" },
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

      <div className="mb-32" ><ServiceCardSection /></div> 
      <PortfolioCarousel
        section={{
          eyebrow: "Selected Work",
          title: "Recent Projects",
          description: "A look at what we've shipped for clients.",
        }}
        items={[
          {
            slug: "demo-project",
            title: "Demo Project",
            category: "Web",
            media: "https://picsum.photos/seed/orbitwelve-project-1/800/1100",
          },
          {
            slug: "demo-project",
            title: "Demo Project",
            category: "Web",
            media: "https://picsum.photos/seed/orbitwelve-project-1/800/1100",
          },
          {
            slug: "demo-project",
            title: "Demo Project",
            category: "Web",
            media: "https://picsum.photos/seed/orbitwelve-project-1/800/1100",
          },
          {
            slug: "demo-project",
            title: "Demo Project",
            category: "Web",
            media: "https://picsum.photos/seed/orbitwelve-project-1/800/1100",
          },
        ]}
      />
      <Footer />
    </div>
  );
}
