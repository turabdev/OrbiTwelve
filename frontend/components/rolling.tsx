// components/RollingStats.tsx
"use client";

import { useEffect, useRef, useState } from "react";

function OdometerDigit({ digit, active }: { digit: number; active: boolean }) {
  const strip = Array.from({ length: 10 }, (_, i) => i);
  return (
    <span className="relative inline-block h-[1.2em] w-[0.62em] overflow-hidden align-bottom tabular-nums">
      <span
        className="absolute left-0 top-0 flex flex-col transition-transform duration-1400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: active ? `translateY(-${digit * 1.2}em)` : "translateY(0em)" }}
      >
        {strip.map((n) => (
          <span key={n} className="flex h-[1.2em] items-center justify-center leading-none">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export type StatItem = { value: string; label: string };

function RollingStat({ value, label }: StatItem) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="flex items-end text-[clamp(2.25rem,4vw,3.25rem)] font-medium tracking-tight text-(--color-dark-panel)">
        {value.split("").map((char, i) =>
          /\d/.test(char) ? (
            <OdometerDigit key={i} digit={Number(char)} active={active} />
          ) : (
            <span key={i} className="leading-none">
              {char}
            </span>
          )
        )}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.16em] text-dark-panel/60">
        {label}
      </div>
    </div>
  );
}

export default function RollingStats({ items }: { items: StatItem[] }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((item, i) => (
          <RollingStat key={i} {...item} />
        ))}
      </div>
    </section>
  );
}

/* usage:
<RollingStats items={[{ value: "XX+", label: "your stat" }]} />
*/