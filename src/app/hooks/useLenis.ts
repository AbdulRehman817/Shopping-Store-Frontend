import { useEffect } from "react";

import Lenis from "@studio-freight/lenis";

export const useLenis = () => {
  useEffect(() => {
    // ✅ Prevent running on the server
    if (typeof window === "undefined") return;

    console.log("✅ Lenis initialized");

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};
