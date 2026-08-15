"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/footer";

// Draws each stroke of the "404" + surrounding drafting marks as if a
// blueprint is being traced live, using stroke-dasharray/offset reveal.
function BlueprintNotFound() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.15, duration: 1.1, ease: "easeInOut" as const },
        opacity: { delay: i * 0.15, duration: 0.3 },
      },
    }),
  };

  return (
    <svg
      viewBox="0 0 640 280"
      className="mx-auto h-auto w-full max-w-2xl text-(--color-accent)"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {/* Corner brackets, echoing the Hero image frame accent */}
      <motion.path
        d="M20 20 H60 M20 20 V60"
        custom={0}
        variants={draw}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M620 20 H580 M620 20 V60"
        custom={0.5}
        variants={draw}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M20 260 H60 M20 260 V220"
        custom={0.5}
        variants={draw}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M620 260 H580 M620 260 V220"
        custom={1}
        variants={draw}
        initial="hidden"
        animate="visible"
      />

      {/* "404" drafted as blueprint strokes rather than a filled font */}
      <motion.path
        d="M120 90 L120 190 L180 190 M180 90 L180 190"
        custom={1.2}
        variants={draw}
        initial="hidden"
        animate="visible"
        strokeWidth="3"
      />
      <motion.path
        d="M240 90 L215 160 Q212 190 245 190 Q278 190 275 160 L250 90"
        custom={1.4}
        variants={draw}
        initial="hidden"
        animate="visible"
        strokeWidth="3"
      />
      <motion.path
        d="M400 90 L400 190 L460 190 M460 90 L460 190"
        custom={1.6}
        variants={draw}
        initial="hidden"
        animate="visible"
        strokeWidth="3"
      />

      {/* Dimension line under the numerals, drafting-style */}
      <motion.path
        d="M110 210 H470 M110 205 V215 M470 205 V215"
        custom={2}
        variants={draw}
        initial="hidden"
        animate="visible"
        strokeDasharray="4 4"
        opacity={1}
      />
    </svg>
  );
}

export default function NotFound() {
  return (
    <>
      <TopNavBar />

      <div className="mx-6 flex min-h-[70vh] flex-col items-center justify-center py-16 text-center sm:mx-12 lg:mx-36">
        <BlueprintNotFound />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="mt-10 max-w-lg"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-dark-panel/50">
            Structural gap detected
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-(--color-dark-panel) sm:text-3xl">
            This wing wasn&apos;t in the blueprint.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-dark-panel/70">
            The page you&apos;re looking for was either never built, or the
            architects quietly demolished it. Either way, precise engineering
            couldn&apos;t save this one.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-accent) px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            Back to solid ground
          </Link>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
