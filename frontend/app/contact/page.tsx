import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";
import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import { connectDB } from "@/lib/utils/db";
import SiteContent from "@/lib/models/SiteContent";
import type { HeroProps } from "@/types/portfolios";

async function getHeroContent(): Promise<Partial<HeroProps>> {
  await connectDB();
  const doc = await SiteContent.findOne({ key: "contact-hero" }).lean();
  return (doc?.fields ?? {}) as Partial<HeroProps>;
}

export default async function Contact() {
  const heroContent = await getHeroContent();

  return (
    <>
      <TopNavBar />
      <div className="mt-20"><Hero {...heroContent} /></div>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-8 py-16 text-background md:px-16 md:py-24">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-background/60">
                  Get in touch
                </p>
                <h1 className="mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
                  Let's start a project
                </h1>
                <p className="mt-4 max-w-md text-sm text-background/70 md:text-base">
                  Tell us a bit about what you're building — we read every message and reply within a day or two.
                </p>
                <div className="mt-10 space-y-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-background/50">Email</p>
                  <a
                    href="mailto:hello@zypher.example"
                    className="text-xl font-medium tracking-tight transition-opacity hover:opacity-70"
                  >
                    hello@zypher.example
                  </a>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
