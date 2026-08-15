"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "@/assets/images/logos/logo.webp";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Reviews", href: "/reviews" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SCROLL_THRESHOLD = 120;

export default function TopNavBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Collapsed pill only expands on hover if nothing forced it open (mobile has no hover)
  const isExpanded = !collapsed || hovered;

  return (
    <>
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed z-50 border rounded-4xl transition-[top,left,right,transform,width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          collapsed
            ? "top-4 left-auto right-4 translate-x-0 w-auto max-w-[calc(100%-32px)]"
            : "top-6 left-1/2 right-auto -translate-x-1/2 w-286.25 max-w-[calc(100%-74px)]"
        }`}
      >
        <div
          className={`relative flex items-center justify-between rounded-4xl background shadow-2xl border-[#00ADD3] transition-[height,padding,gap] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            collapsed
              ? isExpanded
                ? "h-16.75 px-6.25 gap-6"
                : "h-14 px-3 gap-0"
              : "h-16.75 px-6.25"
          }`}
        >
          <Link href="/" className="shrink-0 block overflow-hidden">
            <Image src={Logo} alt="Logo" width={collapsed && !isExpanded ? 100 : 171} height={36} className="transition-all duration-500 h-9 w-auto" />
          </Link>

          {/* Desktop links — hidden while collapsed+unhovered via width/opacity, not display, so the hover transition is smooth */}
          <nav
            className={`hidden md:flex items-center gap-2 overflow-hidden transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              collapsed
                ? isExpanded
                  ? "max-w-160 opacity-100"
                  : "max-w-0 opacity-0"
                : "max-w-160 opacity-100"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-xs font-semibold tracking-widest uppercase whitespace-nowrap text-(--color-dark-panel) hover:text-(--color-accent) transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-9 h-9 shrink-0"
          >
            <span className="block w-5 h-0.5 bg-(--color-dark-panel)" />
            <span className="block w-5 h-0.5 bg-(--color-dark-panel)" />
            <span className="block w-3.5 h-0.5 self-end bg-(--color-dark-panel)" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-60 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-black/40"
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[80%] background shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16.75 px-6.25 border-b border-[#00ADD3]/30">
            <Image src={Logo} alt="Logo" width={140} height={30} className="h-8 w-auto" />
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="relative w-8 h-8 shrink-0"
            >
              <span className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-(--color-dark-panel) -translate-x-1/2 -translate-y-1/2 rotate-45" />
              <span className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-(--color-dark-panel) -translate-x-1/2 -translate-y-1/2 -rotate-45" />
            </button>
          </div>
          <nav className="flex flex-col px-6.25 py-8 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="py-3 text-sm font-semibold tracking-widest uppercase text-(--color-dark-panel) hover:text-(--color-accent) transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
