"use client";

import type { FC } from "react";
import type { HeroProps, HeroSocial } from "@/types/portfolios";

const Hero: FC<HeroProps> = ({
  eyebrow = "Orbitwelve",
  title = "Creative digital work that ships.",
  description = "A portfolio hero built for landing pages and editorial case studies.",
  trust = "Trusted by ambitious teams",
  background = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_jp7-cTjDuG9k0IwcFBl3S2kFzLYPvKumLBbth_ORQ&s=10",
  thumbnail = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTASKk9GYy9h6cGzOY18FaqMi8wKELL_nsg7IHIlCFUQ&s=10",
  socials = [],
}) => {
  return (
    <div className="px-4 pt-4">
      <div className="relative mx-auto max-w-360 overflow-hidden rounded-[2.5rem] bg-hero-bg">
        <div className="absolute inset-0">
          <img
            src={background}
            alt=""
            loading="lazy"
            decoding="async"
            className="block h-full w-full rounded-none! object-cover"
          />
          <div className="absolute inset-0 mix-blend-overlay hero-grain" />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />
        </div>

        <div className="relative grid min-h-[640px] grid-rows-[auto_1fr_auto] gap-10 p-8 md:min-h-[720px] md:p-14">
          <span className="absolute left-6 top-6 h-5 w-5 rounded-tl border-l border-t border-white/40" />
          <span className="absolute right-6 top-6 h-5 w-5 rounded-tr border-r border-t border-white/40" />
          <span className="absolute bottom-6 left-6 h-5 w-5 rounded-bl border-b border-l border-white/40" />
          <span className="absolute bottom-6 right-6 h-5 w-5 rounded-br border-b border-r border-white/40" />

          <div className="relative z-10 max-w-2xl pt-12 md:pt-20">
            <div className="flex items-center gap-2 text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
              <span className="text-xs uppercase tracking-[0.18em]">{eyebrow}</span>
            </div>
            <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-white md:text-6xl lg:text-7xl">
              {title}
            </h1>
          </div>

          <div className="relative z-10 mt-auto flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm md:h-36 md:w-36">
                <img
                  src={thumbnail}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full rounded-none! object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
              <p className="max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                {description}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/85">{trust}</span>
                <div className="flex items-center gap-2">
                  {socials.map((social: HeroSocial) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <SocialIcon label={social.label} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialIcon: FC<{ label: string }> = ({ label }) => {
  if (label.toLowerCase() === "instagram") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
};

export default Hero;
