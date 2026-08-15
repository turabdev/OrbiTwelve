"use client";

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import type { HeroProps, ClientMarqueeProps } from "@/types/portfolios";
import DragCarousel from "@/components/DragCarousel";

const heroData: HeroProps = {
  eyebrow: "Portfolios",
  title: "Selected work, 2018 — present",
  description:
    "A curated set of digital projects spanning product sites, web apps, and design systems.",
  trust: "60 brands · 14 cities",
  background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBffYzJzF-mhVrKBESpIxC0QfUmyMkFcwHhHaq3lkGxw&s=10",
  thumbnail: "https://wallpapercave.com/wp/wp12759217.jpg",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
  ],
};

const marqueeData: ClientMarqueeProps = {
  section: { title: "Tools we ship with" },
  clients: [
    { name: "Astro", icon: "/icon-tech/astro.svg" },
    { name: "React", icon: "/icon-tech/react.svg" },
    { name: "Next.js", icon: "/icon-tech/nextjs.svg" },
    { name: "Tailwind CSS", icon: "/icon-tech/tailwindcss.svg" },
    { name: "GSAP", icon: "/icon-tech/gsap.svg" },
    { name: "Figma", icon: "/icon-tech/figma.svg" },
    { name: "Node.js", icon: "/icon-tech/nodejs.svg" },
    { name: "GitHub", icon: "/icon-tech/github.svg" },
    { name: "Vercel", icon: "/icon-tech/netlify.svg" },
    { name: "Stripe", icon: "/icon-tech/stripe.svg" },
    { name: "Notion", icon: "/icon-tech/notion.svg" },
    { name: "Linear", icon: "/icon-tech/linear.svg" },
  ],
};



export default function Projects() {
  return (
    <>
      <TopNavBar />
     <div className="mt-20"> <Hero {...heroData} /></div>
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
     
     
      <Footer />
    </>
  );
}