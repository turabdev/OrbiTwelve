"use client";

import { useCallback, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useRouter } from "next/navigation";

export type CarouselItem = {
  label: string;
  category?: string;
  imageUrl: string;
  href?: string;
};

export default function DragCarousel({
  items,
  cardWidth = 320,
  cardHeight = 460,
}: {
  items: CarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
}) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, startCenter: 0, moved: false });

  const spacing = cardWidth * 0.62;

  const onPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      dragState.current = { startX: e.clientX, startCenter: centerIndex, moved: false };
      setIsDragging(true);
      containerRef.current?.setPointerCapture(e.pointerId);
    },
    [centerIndex]
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragState.current.startX;
      if (Math.abs(deltaX) > 5) dragState.current.moved = true;
      const next = dragState.current.startCenter - deltaX / spacing;
      setCenterIndex(Math.max(0, Math.min(items.length - 1, next)));
    },
    [isDragging, spacing, items.length]
  );

  const endDrag = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    setCenterIndex((c) => Math.round(c));
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto touch-none select-none"
      style={{ height: "min(85vh, 620px)", perspective: 2500 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="absolute left-1/2 top-1/2">
        {items.map((item, i) => {
          const distance = i - centerIndex;
          const abs = Math.abs(distance);
          const isFront = abs < 0.5;

          return (
            <div
              key={i}
              role={item.href ? "button" : undefined}
              tabIndex={isFront && item.href ? 0 : -1}
              onClick={() => {
                if (dragState.current.moved || !item.href) return;
                if (/^https?:\/\//.test(item.href)) {
                  window.open(item.href, "_blank", "noopener,noreferrer");
                } else {
                  router.push(item.href);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && item.href) {
                  e.preventDefault();
                  if (/^https?:\/\//.test(item.href)) {
                    window.open(item.href, "_blank", "noopener,noreferrer");
                  } else {
                    router.push(item.href);
                  }
                }
              }}
              className={`absolute overflow-hidden rounded-2xl bg-dark-panel/10 shadow-[0_4px_16px_rgba(0,0,0,0.18)] ${
                isFront ? "cursor-grab active:cursor-grabbing" : ""
              }`}
              style={{
                width: cardWidth,
                height: cardHeight,
                top: 0,
                left: 0,
                zIndex: Math.round(100 - abs * 10),
                transform: `translate(-50%, -50%) translateX(${distance * spacing}px) scale(${Math.max(
                  0.72,
                  1 - abs * 0.14
                )}) rotateY(${Math.max(-18, Math.min(18, distance * -10))}deg)`,
                opacity: Math.max(0, 1 - abs * 0.35),
                transition: isDragging
                  ? "none"
                  : "transform 500ms cubic-bezier(0.32,0.72,0,1), opacity 500ms",
                pointerEvents: isFront ? "auto" : "none",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.label}
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
              />
              {item.category && (
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                    {item.category}
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-white">{item.label}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs uppercase tracking-[0.18em] text-dark-panel/50">
        Drag to rotate
      </p>
    </div>
  );
}
