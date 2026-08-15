"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── NOTE ───────────────────────────────────────────────────────────────
// If SmoothScrollProvider.tsx wraps scroll (Lenis or similar), ScrollTrigger
// needs a scrollerProxy hookup or the pin will desync from the visible
// scroll position. Paste what's in SmoothScrollProvider.tsx and I'll give
// you the exact glue — don't skip this, it's the #1 way this breaks.
// ──────────────────────────────────────────────────────────────────────

interface ProjectCard {
  title: string;
  summary: string;
  href: string;
}

interface ServiceNode {
  id: string;
  title: string;
  description: string;
  tools: string[];
  projects: [ProjectCard, ProjectCard, ...ProjectCard[]]; // min 2
}

const services: ServiceNode[] = [
  {
    id: "web-development",
    title: "Web Development",
    description:
      "We build fast, scalable web applications from the ground up — frontend to backend, architected to grow with the product.",
    tools: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
    projects: [
      {
        title: "Client Portal Rebuild",
        summary: "Migrated a legacy dashboard to a modern React stack.",
        href: "/projects/client-portal",
      },
      {
        title: "E-commerce Platform",
        summary: "Headless storefront with sub-second page loads.",
        href: "/projects/ecommerce-platform",
      },
    ],
  },
  {
    id: "cybersecurity-intelligence",
    title: "Cybersecurity & Intelligence",
    description:
      "We assess, harden, and monitor infrastructure — identifying exposure before it becomes an incident.",
    tools: ["Nmap", "Burp Suite", "Metasploit", "Wireshark", "OSINT tooling"],
    projects: [
      {
        title: "Infrastructure Pentest",
        summary: "Full external assessment for a fintech client.",
        href: "/projects/infra-pentest",
      },
      {
        title: "Threat Intelligence Feed",
        summary: "Automated OSINT pipeline for early-warning alerts.",
        href: "/projects/threat-intel-feed",
      },
    ],
  },
  {
    id: "seo-management",
    title: "SEO Management",
    description:
      "We drive organic visibility through technical SEO, content strategy, and ongoing performance measurement.",
    tools: ["Google Search Console", "Ahrefs", "Screaming Frog", "Lighthouse"],
    projects: [
      {
        title: "Organic Traffic Turnaround",
        summary: "3x organic sessions in 6 months for a SaaS client.",
        href: "/projects/organic-turnaround",
      },
      {
        title: "Technical SEO Audit",
        summary: "Site-wide crawl fixes lifting Core Web Vitals scores.",
        href: "/projects/technical-seo-audit",
      },
    ],
  },
  // ── PLACEHOLDER — tools & projects below are NOT from the client PDF ──
  // The PDF only detailed Web Development, Cybersecurity & Intelligence,
  // and SEO Management. These 9 entries use the correct titles/order from
  // the PDF's service list but generic tools/copy. Swap before shipping.
  {
    id: "social-media-management",
    title: "Social Media Management",
    description:
      "We plan, produce, and run content calendars that keep brands consistent and visible across platforms.",
    tools: ["Meta Business Suite", "Buffer", "Canva", "Sprout Social"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Social Media Management project.",
        href: "/projects/placeholder-1",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Social Media Management project.",
        href: "/projects/placeholder-2",
      },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description:
      "We run paid and owned campaigns across channels, tying spend to measurable acquisition outcomes.",
    tools: ["Google Ads", "Meta Ads Manager", "HubSpot", "Google Analytics"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Digital Marketing project.",
        href: "/projects/placeholder-3",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Digital Marketing project.",
        href: "/projects/placeholder-4",
      },
    ],
  },
  {
    id: "android-app-development",
    title: "Android App Development",
    description:
      "We design and build native Android applications, from prototype through Play Store release.",
    tools: ["Kotlin", "Jetpack Compose", "Android Studio", "Firebase"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Android App Development project.",
        href: "/projects/placeholder-5",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Android App Development project.",
        href: "/projects/placeholder-6",
      },
    ],
  },
  {
    id: "graphic-designing",
    title: "Graphic Designing",
    description:
      "We produce brand identity, marketing collateral, and visual systems that hold up across every touchpoint.",
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Graphic Designing project.",
        href: "/projects/placeholder-7",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Graphic Designing project.",
        href: "/projects/placeholder-8",
      },
    ],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description:
      "We cut and grade video for social, ads, and brand content — scripted through final export.",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Video Editing project.",
        href: "/projects/placeholder-9",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Video Editing project.",
        href: "/projects/placeholder-10",
      },
    ],
  },
  {
    id: "academic-research-writing",
    title: "Academic Research Writing",
    description:
      "We support research and writing work with structured, sourced, citation-accurate output.",
    tools: ["Zotero", "Grammarly", "Turnitin", "Google Scholar"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Academic Research Writing project.",
        href: "/projects/placeholder-11",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Academic Research Writing project.",
        href: "/projects/placeholder-12",
      },
    ],
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    description:
      "We build pipelines that identify, qualify, and route prospects into sales-ready leads.",
    tools: ["Apollo.io", "LinkedIn Sales Navigator", "HubSpot CRM"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Lead Generation project.",
        href: "/projects/placeholder-13",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Lead Generation project.",
        href: "/projects/placeholder-14",
      },
    ],
  },
  {
    id: "infrastructure-operations",
    title: "Infrastructure & Operations",
    description:
      "We design, deploy, and maintain the infrastructure that keeps products running reliably at scale.",
    tools: ["AWS", "Docker", "Terraform", "GitHub Actions"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Infrastructure & Operations project.",
        href: "/projects/placeholder-15",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Infrastructure & Operations project.",
        href: "/projects/placeholder-16",
      },
    ],
  },
  {
    id: "secure-development",
    title: "Secure Development",
    description:
      "We build software with security baked into the development lifecycle, not bolted on after.",
    tools: ["OWASP ZAP", "Snyk", "SonarQube", "GitHub Advanced Security"],
    projects: [
      {
        title: "PLACEHOLDER — Project 1",
        summary: "Replace with a real Secure Development project.",
        href: "/projects/placeholder-17",
      },
      {
        title: "PLACEHOLDER — Project 2",
        summary: "Replace with a real Secure Development project.",
        href: "/projects/placeholder-18",
      },
    ],
  },
];

// Gradient stops, top to bottom, per the client spec. Kept as a constant so
// there's exactly one place to edit if the palette changes.
const GRADIENT_COLORS = ["#00ADD3", "#323232", "#FFFFFF"];

export default function ServicesPathway() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const gradient = gradientRef.current;
    if (!section || !path || !gradient) return;

    const ctx = gsap.context(() => {
      // ── ORDER MATTERS HERE ──────────────────────────────────────────
      // Pins (below) each add scroll-distance via pinSpacing, which
      // inflates the page's real scrollable height beyond what `section`
      // measures on its own. The path-draw and gradient scrubs use
      // `end: "bottom bottom"` against `section` — if that gets computed
      // BEFORE the pins exist, it locks in the smaller pre-pin height,
      // and both animations finish (clamp to their end value) way before
      // the user has actually scrolled past all 12 pinned panels. That's
      // why the gradient was reading as "stuck at the bottom color" —
      // it hit progress=1 early and just sat there for the rest of the
      // scroll. Same bug was silently affecting the path draw too.
      //
      // Fix: create the pins FIRST, then the section-wide scrubs, then
      // force ScrollTrigger.refresh() so `bottom bottom` recalculates
      // against the final, pin-inflated page height.

      // Pin each service node full-screen while its content animates in
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;

        const tools = node.querySelectorAll("[data-tool]");
        const cards = node.querySelectorAll("[data-project-card]");
        const copy = node.querySelectorAll("[data-copy]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            id: `service-pin-${i}`,
          },
        });

        tl.from(copy, {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.4,
        })
          .from(
            tools,
            {
              scale: 0,
              opacity: 0,
              stagger: 0.08,
              duration: 0.3,
              ease: "back.out(2)",
            },
            "-=0.2"
          )
          .from(
            cards,
            {
              y: 60,
              opacity: 0,
              stagger: 0.15,
              duration: 0.4,
            },
            "-=0.15"
          );
      });

      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Draw the path across the full scroll range of the section
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Scrub the gradient across the SAME scroll range as the path draw,
      // so both stay in sync. --gradient-progress goes 0 → 1 and the CSS
      // linear-gradient below reads it to shift the color stops.
      gsap.fromTo(
        gradient,
        { "--gradient-progress": 0 },
        {
          "--gradient-progress": 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      // All ScrollTrigger instances now exist (pins + the two section-wide
      // scrubs). Force a recalculation of every trigger's start/end against
      // the FINAL page geometry, now that the pins have added their
      // scroll-distance spacers. Without this, "bottom bottom" above locks
      // to the pre-pin height and both scrubs finish scrolling way too early.
      //
      // refresh(true) — not the bare call — because GSAP's own docs note
      // the browser doesn't always reflect DOM/layout changes immediately;
      // the `true` arg waits ~1 rAF tick (up to ~200ms) so pin-spacer
      // geometry is fully settled before positions are recalculated.
      ScrollTrigger.refresh(true);
    }, section);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ background: "var(--background)" }}
    >
      {/*
        Fixed backdrop layer, not absolute — this needs to stay put behind
        the pinned panels and shift color as the USER scrolls the whole
        section, not scroll away with any single panel. z-index keeps it
        behind both the path and the service content.
      */}
      <div
        ref={gradientRef}
        className="pointer-events-none fixed inset-0 -z-10"
        style={
          {
            "--gradient-progress": 0,
            background: `linear-gradient(to bottom,
              ${GRADIENT_COLORS[0]} calc((var(--gradient-progress) - 0.15) * 100%),
              ${GRADIENT_COLORS[1]} calc(var(--gradient-progress) * 100%),
              ${GRADIENT_COLORS[2]} calc((var(--gradient-progress) + 0.15) * 100%)
            )`,
          } as React.CSSProperties
        }
      />

      {/* Winding path, absolutely positioned behind the service nodes */}
      <svg
        className="pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2"
        viewBox={`0 0 200 ${services.length * 1000}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={pathRef}
          d={buildWindingPath(services.length)}
          stroke="var(--color-accent)"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>

      {services.map((service, i) => (
        <div
          key={service.id}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          id={service.id}
          className="relative flex min-h-screen w-full items-center justify-center px-6 md:px-16"
        >
          <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-center">
            {/* Copy + tools */}
            <div>
              <p data-copy className="mb-2 text-sm uppercase tracking-widest opacity-60">
                Service {String(i + 1).padStart(2, "0")}
              </p>
              <h3 data-copy className="mb-4 text-3xl font-semibold md:text-4xl">
                {service.title}
              </h3>
              <p data-copy className="mb-6 max-w-md opacity-80">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    data-tool
                    className="rounded-full px-3 py-1 text-sm"
                    style={{
                      background: "var(--color-dark-panel)",
                      border: "1px solid var(--color-accent)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Project cards — min 2 per service, enforced by ServiceNode type */}
            <div className="flex flex-col gap-4">
              {service.projects.map((project) => (
                <a
                  key={project.title}
                  href={project.href}
                  data-project-card
                  className="rounded-lg p-5 transition-transform hover:-translate-y-1"
                  style={{
                    background: "var(--color-dark-panel)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h4 className="mb-1 font-medium">{project.title}</h4>
                  <p className="text-sm opacity-70">{project.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/**
 * Generates a winding path (alternating left/right curves) across n
 * service sections stacked at 1000-unit intervals in the viewBox.
 */
function buildWindingPath(count: number): string {
  const segmentHeight = 1000;
  let d = `M 100 0`;
  for (let i = 0; i < count; i++) {
    const midY = i * segmentHeight + segmentHeight / 2;
    const endY = (i + 1) * segmentHeight;
    const swing = i % 2 === 0 ? 170 : 30; // alternate right/left
    d += ` C 100 ${midY - 150}, ${swing} ${midY}, ${swing} ${midY + 50}`;
    d += ` S 100 ${endY - 100}, 100 ${endY}`;
  }
  return d;
}