"use client";

import { motion } from "framer-motion";
import { useMemo, useState, type CSSProperties } from "react";
import type { ReviewScreenshot } from "@/app/api/reviews/route";

export type Testimonial = ReviewScreenshot;

function ScreenshotCard({ imageUrl, country }: Testimonial) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative aspect-16/5 w-80 shrink-0 overflow-hidden rounded-3xl border border-dark-panel/10 bg-background sm:w-96 items-center justify-center"
    >
      <img
        src={imageUrl}
        alt={`Client review from ${country}`}
        loading="lazy"
        className="h-auto w-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-4 py-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="text-xs font-medium capitalize text-white">
          {country.replace(/-/g, " ")}
        </span>
      </div>
    </motion.figure>
  );
}

function MarqueeRow({
  items,
  durationSeconds,
  reverse,
}: {
  items: Testimonial[];
  durationSeconds: number;
  reverse?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div className="orbitwelve-marquee-row relative overflow-hidden">
      <div
        className={`flex w-max ${reverse ? "orbitwelve-marquee-reverse" : "orbitwelve-marquee"}`}
        style={{ "--orbitwelve-marquee-duration": `${durationSeconds}s` } as CSSProperties}
      >
        <div className="flex gap-5 pr-5">
          {items.map((t) => (
            <ScreenshotCard key={t.id} {...t} />
          ))}
        </div>
        <div className="flex gap-5 pr-5" aria-hidden="true">
          {items.map((t) => (
            <ScreenshotCard key={`dup-${t.id}`} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function splitIntoRows(
  items: Testimonial[],
  rowCount: number,
  baseDurations: number[]
) {
  const rows: { items: Testimonial[]; durationSeconds: number; reverse?: boolean }[] =
    Array.from({ length: rowCount }, (_, i) => ({
      items: [],
      durationSeconds: baseDurations[i % baseDurations.length],
      reverse: i % 2 === 1,
    }));

  items.forEach((item, i) => {
    rows[i % rowCount].items.push(item);
  });

  return rows;
}

export default function TestimonialMarquee({
  screenshots,
}: {
  screenshots: Testimonial[];
}) {
  const [country, setCountry] = useState<string>("all");
  const safeScreenshots = screenshots ?? [];

  const countries = useMemo(
    () => Array.from(new Set(safeScreenshots.map((t) => t.country))).sort(),
    [safeScreenshots]
  );

  const filteredItems = useMemo(() => {
    if (country === "all") return safeScreenshots;
    return safeScreenshots.filter((t) => t.country === country);
  }, [safeScreenshots, country]);

  const rows = useMemo(
    () => splitIntoRows(filteredItems, 3, [400, 400, 400]),
    [filteredItems]
  );

  return (
    <section className="relative py-20">
      <div className="mb-8 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1.5 text-xs">
          <span className="uppercase tracking-[0.14em] text-dark-panel/50">
            Country
          </span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-full border border-dark-panel/15 bg-background px-4 py-2 text-sm capitalize text-(--color-dark-panel) outline-none focus:border-(--color-accent)"
          >
            <option value="all">All</option>
            {countries.map((c) => (
              <option key={c} value={c} className="capitalize">
                {c.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </label>

        {country !== "all" && (
          <button
            type="button"
            onClick={() => setCountry("all")}
            className="rounded-full border border-dark-panel/15 px-4 py-2 text-xs font-medium text-dark-panel/70 transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
          >
            Clear filter
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <p className="py-16 text-center text-sm text-dark-panel/50">
          No reviews yet for that country.
        </p>
      ) : (
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />
          <div className="flex flex-col gap-5">
            {rows.map((row, i) => (
              <MarqueeRow key={i} {...row} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes orbitwelve-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .orbitwelve-marquee {
          animation: orbitwelve-marquee-scroll var(--orbitwelve-marquee-duration, 40s) linear infinite;
        }
        .orbitwelve-marquee-reverse {
          animation: orbitwelve-marquee-scroll var(--orbitwelve-marquee-duration, 40s) linear infinite reverse;
        }
        .orbitwelve-marquee-row:hover .orbitwelve-marquee,
        .orbitwelve-marquee-row:hover .orbitwelve-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}