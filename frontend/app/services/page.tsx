"use client";


import React from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";
import { Users, Sparkles, Check } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Ser from "@/components/Servicespathway";





const columns = [
  {
    icon: Users,
    label: "Building in-house",
    statLabel: "Precious hours saved",
    stat: "2,000",
    statSuffix: "+",
    statUnit: "hours",
    points: [
      "3–4 months recruiting a senior design & engineering team",
      "~10 months of design and engineering effort",
      "$180K–$240K a year in salaries before anything ships",
      "Management, tooling, and retention overhead on top",
    ],
    roiLabel: "Return on investment",
    roi: "5",
    roiSuffix: "x",
  },
  {
    icon: Sparkles,
    label: "Building with AI",
    statLabel: "Precious hours saved",
    stat: "700",
    statSuffix: "+",
    statUnit: "hours",
    points: [
      "~4–5 months of prompting and polishing",
      "AI-generated output, endlessly revised",
      "Most effort burns on UI polish, not your business",
      "$45K–$65K in tooling and rework, plus your own hours",
    ],
    roiLabel: "Return on investment",
    roi: "3",
    roiSuffix: "x",
  },
];

const tiers = [
  {
    name: "Sprint",
    summary: "A focused two-week burst — single deliverable.",
    price: "$15k",
    period: "project",
    features: ["1 discipline", "2-week timeline", "1 round of revision", "Senior-led"],
    cta: { label: "Start a sprint", href: "/contact" },
  },
  {
    name: "Project",
    summary: "Full-cycle creative — most common engagement.",
    price: "$45k",
    period: "project",
    featured: true,
    features: [
      "Up to 3 disciplines",
      "8–10 week timeline",
      "2 rounds of revision",
      "Design system handoff",
      "30-day support window",
    ],
    cta: { label: "Talk about a project", href: "/contact" },
  },
  {
    name: "Retainer",
    summary: "Ongoing creative leadership for in-house teams.",
    price: "$9k",
    period: "month",
    features: [
      "Embedded creative direction",
      "Weekly working sessions",
      "Quarterly roadmap",
      "All disciplines on call",
    ],
    cta: { label: "Discuss retainer", href: "/contact" },
  },
];







const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
];


const services = [
  {
    slug: "brand",
    title: "Brand",
    summary:
      "Identity systems for digital products — tokens, type, and voice teams can ship with.",
    media:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBffYzJzF-mhVrKBESpIxC0QfUmyMkFcwHhHaq3lkGxw&s=10",
    tags: ["Identity", "Tokens", "Guidelines"],
  },
  {
    slug: "web",
    title: "Web",
    summary:
      "Marketing sites and landing pages on Astro + React — fast, accessible, easy to update.",
    media:
      "https://i.pinimg.com/736x/ab/ca/e8/abcae858b30cc0a87c70964a6b4f28fb.jpg",
    tags: ["Astro", "React", "CMS"],
  },
  {
    slug: "product",
    title: "Product",
    summary:
      "Product design and front-end engineering for SaaS and consumer apps.",
    media:
      "https://i.pinimg.com/1200x/b7/fe/be/b7febe53d9a19fed5be2ed34bea7a421.jpg",
    tags: ["UX", "UI", "Front-end"],
  },
];
 






export default function Services () {



    return <>
        <TopNavBar />
    
   <div className="px-4 pt-4 mt-20">
      <div className="relative mx-auto overflow-hidden rounded-[2.5rem] bg-hero-bg max-w-360">
        {/* Background image */}
        <div className="hero-bg absolute inset-0">
          <img
            src="https://4kwallpapers.com/images/walls/thumbs_2t/7630.jpg"
            alt="Picture"
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover rounded-none!"
          />
          <div className="hero-grain absolute inset-0 mix-blend-overlay" />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />
        </div>
 
        <div className="relative grid min-h-160 grid-rows-[auto_1fr_auto] gap-10 p-8 md:min-h-180 md:p-14">
          {/* Corner brackets */}
          <span className="absolute left-6 top-6 h-5 w-5 rounded-tl border-l border-t border-white/40" />
          <span className="absolute right-6 top-6 h-5 w-5 rounded-tr border-r border-t border-white/40" />
          <span className="absolute bottom-6 left-6 h-5 w-5 rounded-bl border-b border-l border-white/40" />
          <span className="absolute bottom-6 right-6 h-5 w-5 rounded-br border-b border-r border-white/40" />
 
          {/* Eyebrow + Title */}
          <div className="relative z-10 max-w-2xl pt-12 md:pt-20">
            <div className="hero-eyebrow flex items-center gap-2 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              <span className="text-xs uppercase tracking-[0.18em]">Services</span>
            </div>
            <h1 className="hero-title mt-4 text-balance text-4xl font-medium leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Digital services, end to end
            </h1>
          </div>
 
          {/* Bottom row: thumbnail + description/trust */}
          <div className="relative z-10 mt-auto flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="hero-thumb relative">
              <div className="h-32 w-32 overflow-hidden rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm md:h-36 md:w-36">
                <img
                  src="https://4kwallpapers.com/images/walls/thumbs_2t/20444.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover rounded-none!"
                />
              </div>
            </div>
 
            <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
              <p className="hero-description max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                From discovery to shipped product — every engagement runs on
                the same shape: brief, design, build, launch.
              </p>
              <div className="hero-trust flex items-center gap-4">
                <span className="text-sm text-white/85">Three core practices</span>
                <div className="flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {/* swap for lucide-react <Instagram /> / <Twitter /> icons */}
                      <span className="sr-only">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

{/* ---------------------------------------ServicesGrid*/}

     <section id="services" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            What we do
          </span>
          <h2 className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
            What we build
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Three practices, one team. Every service is offered as a
            standalone engagement or bundled into a multi-discipline
            retainer.
          </p>
        </div>
 
        <div className="flex h-100 items-stretch gap-3 md:h-120">
          {services.map((s, i) => (
            <a
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative min-w-0 flex-1 cursor-pointer overflow-hidden rounded-2xl bg-muted transition-[flex] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:flex-2"
            >
              <div className="absolute inset-0">
                <img
                  src={s.media}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover rounded-none!"
                />
              </div>
 
              <span className="absolute left-4 top-4 z-10 select-none text-xs font-semibold tabular-nums text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                {String(i + 1).padStart(2, "0")}
              </span>
 
              <span className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-base font-medium uppercase tracking-[0.18em] text-white opacity-100 transition-opacity duration-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.6)] [writing-mode:vertical-rl] group-hover:opacity-0"
                style={{ transform: "translate(-50%, -50%) rotate(180deg)" }}
              >
                {s.title}
              </span>
 
              <div className="absolute inset-x-0 bottom-0 z-10 translate-y-3 bg-linear-to-t from-black/55 to-transparent p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-lg font-medium leading-tight text-white md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm leading-snug text-white/85">
                  {s.summary}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section> 


{/* Pricing */}


     <section id="pricing" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            Pricing
          </span>
          <h2 className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
            Simple, scoped engagements
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Three formats, every brief. Custom scopes available for larger
            work.
          </p>
        </div>
 
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col gap-6 rounded-3xl border p-8 transition-all ${
                tier.featured
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card"
              }`}
            >
              <div>
                <h3 className="text-lg font-medium tracking-tight">
                  {tier.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    tier.featured ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {tier.summary}
                </p>
              </div>
 
              <div className="flex items-end gap-1">
                <span className="text-4xl font-medium tracking-tight">
                  {tier.price}
                </span>
                <span
                  className={`pb-1.5 text-sm ${
                    tier.featured ? "text-background/60" : "text-muted-foreground"
                  }`}
                >
                  /{tier.period}
                </span>
              </div>
 
              <ul className="space-y-2.5 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.featured ? "text-background" : "text-foreground"
                      }`}
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
 
              <a
                href={tier.cta.href}
                className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 ${
                  tier.featured
                    ? "bg-background text-foreground"
                    : "border border-border bg-card hover:border-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                {tier.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* RoiCompare */}

      <section id="roi" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            ROI calculation
          </span>
          <h2 className="max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
            What one engagement replaces
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            In-house hires or AI-assisted DIY — see what a single $45k
            project buys back either way.
          </p>
        </div>
 
        <div className="border-y border-border">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            {columns.map((col) => {
              const Icon = col.icon;
              return (
                <div key={col.label} className="border-x border-border p-7 md:p-10">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">
                      {col.label}
                    </span>
                  </div>
 
                  <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {col.statLabel}
                  </p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="text-6xl font-medium leading-none tracking-tight text-foreground md:text-7xl">
                      {col.stat}
                      {col.statSuffix}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      {col.statUnit}
                    </span>
                  </p>
 
                  <ul className="mt-8 space-y-3">
                    {col.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.75 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                        {pt}
                      </li>
                    ))}
                  </ul>
 
                  <div className="mt-8 border-t border-dashed border-border pt-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {col.roiLabel}
                    </p>
                    <p className="mt-3 text-5xl font-medium leading-none tracking-tight text-foreground md:text-6xl">
                      {col.roi}
                      {col.roiSuffix}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

{/* CTAbanner */}

    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-8 py-16 text-background md:px-16 md:py-24">
          <div className="hero-grain absolute inset-0 opacity-30" />
 
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.18em] text-background/60">
                Ready when you are
              </p>
              <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
                Let&#39;s scope your next project
              </h2>
              <p className="mt-4 max-w-md text-sm text-background/70 md:text-base">
                Most projects kick off within four weeks. Send a brief — even
                a rough one — and we&#39;ll respond within a day.
              </p>
            </div>
 
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
              >
                Send a brief
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="/portfolios"
                className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                See our work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Ser/>

        <Footer/>
       
    </>;
}