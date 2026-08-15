"use client";

import { Turret_Road } from "next/font/google";
import { useState } from "react";

function getEmbedUrl(url: string): { embedUrl: string; thumbnailUrl: string } | null {
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/
  );
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return {
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`,
      thumbnailUrl: "", // Vimeo thumbnails need an API call; pass thumbnailUrl prop manually if needed
    };
  }

  return null;
}

export default function CeoVideo({
  videoUrl,
  thumbnailUrl,
  name,
  role,
  title,
  description,
}: {
  videoUrl: string;
  thumbnailUrl?: string;
  name: string;
  role: string;
  title: string;
  description: string;
}) {
  const [playing, setPlaying] = useState(true);
  const parsed = getEmbedUrl(videoUrl);
  const poster = thumbnailUrl || parsed?.thumbnailUrl || "";

  if (!parsed) return null;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-dark-panel/50">
              A word from our CEO
            </p>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight text-(--color-dark-panel) md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-dark-panel/70 md:text-base">
              {description}
            </p>
            <div className="mt-6">
              <p className="text-sm font-semibold text-(--color-dark-panel)">{name}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-dark-panel/50">
                {role}
              </p>
            </div>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-3xl bg-(--color-dark-panel)">
            {playing ? (
              <iframe
                src={parsed.embedUrl}
                title={`${name} — ${title}`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 h-full w-full"
                aria-label={`Play video: ${title}`}
              >
                {poster ? (
                  <img
                    src={poster}
                    alt=""
                    className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-60"
                  />
                ) : (
                  <div className="h-full w-full bg-(--color-dark-panel)" />
                )}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-background/95 transition-transform group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 h-6 w-6 fill-(--color-dark-panel)"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}