"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES: { title: string; description: string }[] = [
  { title: "Social Media Management", description: "PLACEHOLDER_COPY" },
  { title: "Digital Marketing", description: "PLACEHOLDER_COPY" },
  { title: "Android App Development", description: "PLACEHOLDER_COPY" },
  { title: "Web Development", description: "PLACEHOLDER_COPY" },
  { title: "Graphic Designing", description: "PLACEHOLDER_COPY" },
  { title: "Video Editing", description: "PLACEHOLDER_COPY" },
  { title: "Academic Research Writing", description: "PLACEHOLDER_COPY" },
  { title: "SEO Management", description: "PLACEHOLDER_COPY" },
  { title: "Lead Generation", description: "PLACEHOLDER_COPY" },
  { title: "Cybersecurity & Intelligence", description: "PLACEHOLDER_COPY" },
 
];

export default function ServiceCardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const getScrollDistance = () => track.scrollWidth - section.clientWidth;

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-12 mt-18"
    >
      <div className="mb-2 px-6 md:px-12">
        <span className="text-sm uppercase tracking-widest text-(--color-accent)">
          What We Do
        </span>
        <h2 className="mt-4 text-4xl font-semibold md:text-5xl">Our Services</h2>
      </div>

      <div
        ref={trackRef}
        className="flex w-max gap-6 px-6 will-change-transform md:px-12"
      >
        {SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="flex h-105 w-[320px] shrink-0 flex-col justify-between rounded-2xl border border-(--color-dark-panel) bg-(--color-dark-panel) p-8 md:w-95"
          >
            <span className="text-sm text-(--color-accent)">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-2xl font-medium">{service.title}</h3>
              <p className="mt-3 text-sm text-white/60">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
