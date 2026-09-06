"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Global smooth scrolling (Lenis) for every page, mounted from the root layout.
// autoRaf runs Lenis' rAF loop internally; anchors makes in-page #links work.
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
}
