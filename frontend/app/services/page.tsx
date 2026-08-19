import { connectDB } from "@/lib/utils/db";
import SiteContent from "@/lib/models/SiteContent";
import type { HeroProps } from "@/types/portfolios";
import ServicesView from "./ServicesView";
import ServicesPathway from "@/components/Servicespathway";

async function getHeroContent(): Promise<Partial<HeroProps>> {
  await connectDB();
  const doc = await SiteContent.findOne({ key: "services-hero" }).lean();
  return (doc?.fields ?? {}) as Partial<HeroProps>;
}

export default async function Services() {
  const heroContent = await getHeroContent();
  return <><ServicesView heroContent={heroContent} /><ServicesPathway services={[]} /></>
  
  ;
}
