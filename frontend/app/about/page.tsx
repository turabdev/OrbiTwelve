import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";
import AboutStats from "@/components/AboutStats";
import AboutServices from "@/components/AboutServices";
import { stats, services } from "@/app/lib/about-content";
import Hero from "@/components/Hero";
import CeoVideo from "@/components/CeoVideo";
import TeamMember from "@/lib/models/TeamMember";
import SiteContent from "@/lib/models/SiteContent";
import { connectDB } from "@/lib/utils/db";
import TeamProfileGrid from "@/components/TeamProfileGrid";
import type { HeroProps } from "@/types/portfolios";

export default async function About() {
  await connectDB();
  const team = await TeamMember.find().sort({ order: 1 }).lean();
  const heroContent = await SiteContent.findOne({ key: "about-hero" }).lean();
  const heroProps = (heroContent?.fields ?? {}) as Partial<HeroProps>;

  return (
    <>
      <TopNavBar />
      <div className="mt-20">
        <Hero {...heroProps} />
      </div>

      <AboutStats stats={stats} />

      <CeoVideo
        videoUrl="https://youtuDmhhsteSc.be/K-"
        name="Syed Ghazi"
        role="CEO & Co-Founder"
        title="Building Orbitwelve, one client at a time"
        description="A short message from our CEO on what drives Orbitwelve's approach to digital growth — and what to expect when you work with us."
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-dark-panel/10 p-8">
            <h3 className="text-lg font-medium tracking-tight text-(--color-dark-panel)">
              Our Purpose
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-dark-panel/70">
              Empowering our clients to achieve sustainable digital growth through creativity,
              intelligence, and security — where innovation meets trust.
            </p>
          </div>
          <div className="rounded-3xl border border-dark-panel/10 p-8">
            <h3 className="text-lg font-medium tracking-tight text-(--color-dark-panel)">
              Our Vision
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-dark-panel/70">
              To shape the future of digital excellence through innovation, integrity, and
              intelligent data.
            </p>
          </div>
          <div className="rounded-3xl border border-dark-panel/10 p-8">
            <h3 className="text-lg font-medium tracking-tight text-(--color-dark-panel)">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-dark-panel/70">
              To empower people, organizations, and systems through secure and scalable
              digital transformation.
            </p>
          </div>
        </div>
      </section>

      <AboutServices services={services} />
      <TeamProfileGrid team={JSON.parse(JSON.stringify(team))} />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-(--color-dark-panel) px-8 py-16 text-background md:px-16 md:py-24">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-background/60">
                  Get in touch
                </p>
                <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
                  We help brands speak human in a digital world
                </h2>
                <p className="mt-4 text-sm text-background/70 md:text-base">
                  contact@orbitwelve.com · 03299711113
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-(--color-dark-panel) transition-transform hover:-translate-y-0.5"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}