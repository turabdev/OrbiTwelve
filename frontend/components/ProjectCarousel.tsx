"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import type { PortfolioCarouselProps } from "@/types/portfolios";

gsap.registerPlugin(Draggable, InertiaPlugin);

const RADIUS = 480;
const ROTATE_PER_PX = 0.35;

export default function PortfolioCarousel({ section, items }: PortfolioCarouselProps) {
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    gsap.set(wheel, { xPercent: -50, yPercent: -50, rotationY: 0 });

    const proxy = document.createElement("div");
    proxy.style.cssText = "visibility:hidden;position:fixed;top:0;left:0;";
    document.body.appendChild(proxy);

    function updateRotation(this: Draggable) {
      gsap.set(wheel, { rotationY: this.x * ROTATE_PER_PX });
    }

    const [draggable] = Draggable.create(proxy, {
      type: "x",
      trigger: wheel,
      inertia: true,
      onDrag: updateRotation,
      onThrowUpdate: updateRotation,
    });

    return () => {
      draggable.kill();
      proxy.remove();
    };
  }, []);

  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {section.eyebrow}
        </p>
        <h2 className="text-balance text-center text-3xl font-medium tracking-tight md:text-5xl">
          {section.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-muted-foreground md:text-lg">
          {section.description}
        </p>

        <div
          className="relative mt-12 select-none"
          style={{ height: "min(95vh, 900px)", perspective: 2500 }}
        >
          <div
            ref={wheelRef}
            className="absolute left-1/2 top-1/2 cursor-grab active:cursor-grabbing"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((item, i) => (
              <Link
                key={item.slug}
                href={`/portfolios/${item.slug}`}
                className="absolute overflow-hidden rounded-2xl bg-muted shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
                style={{
                  width: "min(70vw, 320px)",
                  height: "min(85vh, 460px)",
                  top: 0,
                  left: 0,
                  transform: `translate(-50%, -50%) rotateY(${i * (360 / items.length)}deg) translateZ(${RADIUS}px)`,
                }}
              >
                {item.media.endsWith(".mp4") ? (
                  <video
                    src={item.media}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={item.media}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <span
                  className="absolute left-3 top-3 z-10 text-xs font-bold text-white/90"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {String(i + 1).padStart(3, "0")}
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                    {item.category}
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-white">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Drag to rotate
        </p>
      </div>
    </section>
  );
}