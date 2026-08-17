"use client";

import OrbitImages from "@/components/OrbitImages";

// PLACEHOLDER — swap for CMS-driven images once dashboard wiring lands.
// When that happens: this file takes `images: string[]` as a prop instead
// of the hardcoded array below, and the parent page/component passes it in.
const PLACEHOLDER_IMAGES = [
  "https://picsum.photos/300/300?grayscale&random=1",
  "https://picsum.photos/300/300?grayscale&random=2",
  "https://picsum.photos/300/300?grayscale&random=3",
  "https://picsum.photos/300/300?grayscale&random=4",
  "https://picsum.photos/300/300?grayscale&random=5",
  "https://picsum.photos/300/300?grayscale&random=6",
];

export default function ServiceOrbit() {
  return (
    <OrbitImages
      images={PLACEHOLDER_IMAGES}
      shape="ellipse"
      radiusX={700}
      radiusY={340}
      radius={400}
      rotation={-32}
      duration={30}
      itemSize={120}
      responsive
      direction="normal"
      fill
      showPath
      paused={false}
    />
  );
}