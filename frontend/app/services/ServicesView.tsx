"use client";

import React from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";
import { Users, Sparkles, Check } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Ser from "@/components/Servicespathway";
import type { HeroProps } from "@/types/portfolios";
import type { IServicesPathwayNode } from "@/lib/models/ServicesPathway.ts";



const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
];


type ServicesViewProps = {
  heroContent?: Partial<HeroProps>;
  pathwayServices?: IServicesPathwayNode[];
};

export default function ServicesView({ heroContent, pathwayServices = [] }: ServicesViewProps) {
  const eyebrow = heroContent?.eyebrow || "Services";
  const title = heroContent?.title || "Digital services, end to end";
  const description =
    heroContent?.description ||
    "From discovery to shipped product — every engagement runs on the same shape: brief, design, build, launch.";
  const backgroundUrl =
    heroContent?.background || "https://4kwallpapers.com/images/walls/thumbs_2t/7630.jpg";
  const thumbnailUrl =
    heroContent?.thumbnail || "https://4kwallpapers.com/images/walls/thumbs_2t/20444.jpg";

  return <>
    <TopNavBar />

    <div className="px-4 pt-4 mt-20">
      <div className="relative mx-auto overflow-hidden rounded-[2.5rem] bg-hero-bg max-w-360">
        <div className="hero-bg absolute inset-0">
          <img
            src={backgroundUrl}
            alt="Picture"
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover rounded-none!"
          />
          <div className="hero-grain absolute inset-0 mix-blend-overlay" />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />
        </div>

        <div className="relative grid min-h-160 grid-rows-[auto_1fr_auto] gap-10 p-8 md:min-h-180 md:p-14">
          <span className="absolute left-6 top-6 h-5 w-5 rounded-tl border-l border-t border-white/40" />
          <span className="absolute right-6 top-6 h-5 w-5 rounded-tr border-r border-t border-white/40" />
          <span className="absolute bottom-6 left-6 h-5 w-5 rounded-bl border-b border-l border-white/40" />
          <span className="absolute bottom-6 right-6 h-5 w-5 rounded-br border-b border-r border-white/40" />

          <div className="relative z-10 max-w-2xl pt-12 md:pt-20">
            <div className="hero-eyebrow flex items-center gap-2 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              <span className="text-xs uppercase tracking-[0.18em]">{eyebrow}</span>
            </div>
            <h1 className="hero-title mt-4 text-balance text-4xl font-medium leading-[1.05] text-white md:text-6xl lg:text-7xl">
              {title}
            </h1>
          </div>

          <div className="relative z-10 mt-auto flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="hero-thumb relative">
              <div className="h-32 w-32 overflow-hidden rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm md:h-36 md:w-36">
                <img
                  src={thumbnailUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover rounded-none!"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
              <p className="hero-description max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                {description}
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
    <Ser services={pathwayServices} />

    <Footer/>

  </>;
}
