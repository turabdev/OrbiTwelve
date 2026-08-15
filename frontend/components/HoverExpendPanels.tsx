// components/HoverExpandPanels.tsx
"use client";

import { useState } from "react";

export type ServicePanel = {
  slug: string;
  title: string;
  summary: string;
  imageUrl: string;
  onSelect?: () => void;
};

export default function HoverExpandPanels({ items }: { items: ServicePanel[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex h-100 items-stretch gap-3 md:h-120">
      {items.map((item, i) => {
        const isActive = activeIndex === i;
        return (
          <div
            key={item.slug}
            role={item.onSelect ? "button" : undefined}
            tabIndex={item.onSelect ? 0 : -1}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-dark-panel/10"
            style={{
              flex: isActive ? 3 : 1,
              transition: "flex 500ms cubic-bezier(0.32, 0.72, 0, 1)",
              minWidth: 0,
            }}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(i)}
            onBlur={() => setActiveIndex(null)}
            onClick={() => item.onSelect?.()}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && item.onSelect) {
                e.preventDefault();
                item.onSelect();
              }
            }}
          >
            <div className="absolute inset-0">
              <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
            </div>

            <span
              className="absolute left-4 top-4 z-10 select-none text-xs font-semibold tabular-nums text-white/80"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <span
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-base font-medium uppercase tracking-[0.18em] text-white transition-opacity duration-300"
              style={{
                opacity: isActive ? 0 : 1,
                writingMode: "vertical-rl",
                transform: "translate(-50%, -50%) rotate(180deg)",
                textShadow: "0 1px 3px rgba(0,0,0,0.6)",
              }}
            >
              {item.title}
            </span>

            <div
              className="absolute inset-x-0 bottom-0 z-10 p-5 transition-all duration-300"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                transform: isActive ? "translateY(0)" : "translateY(12px)",
                opacity: isActive ? 1 : 0,
              }}
            >
              <h3 className="text-lg font-medium leading-tight text-white md:text-xl">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-snug text-white/85">{item.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* usage:
<HoverExpandPanels items={[{ slug: "web", title: "Web", summary: "...", imageUrl: "/services/web.jpg" }]} />
*/