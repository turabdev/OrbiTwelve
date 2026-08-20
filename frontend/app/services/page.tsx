import { connectDB } from "@/lib/utils/db";
import SiteContent from "@/lib/models/SiteContent";
import ServicesPathwayNode, {
  IServicesPathwayNode,
} from "@/lib/models/ServicesPathway";
import type { HeroProps } from "@/types/portfolios";
import ServicesView from "./ServicesView";

async function getHeroContent(): Promise<Partial<HeroProps>> {
  await connectDB();
  const doc = await SiteContent.findOne({ key: "services-hero" }).lean();
  return (doc?.fields ?? {}) as Partial<HeroProps>;
}

async function getPathwayServices(): Promise<IServicesPathwayNode[]> {
  await connectDB();
  const docs = await ServicesPathwayNode.find({ published: true })
    .sort({ order: 1 })
    .lean();
  return docs as unknown as IServicesPathwayNode[];
}

export default async function Services() {
  const [heroContent, pathwayServices] = await Promise.all([
    getHeroContent(),
    getPathwayServices(),
  ]);
  return (
    <ServicesView heroContent={heroContent} pathwayServices={pathwayServices} />
  );
}