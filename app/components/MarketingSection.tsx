"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MarketingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rolexRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Ensure GSAP context for proper setup and cleanup
    const ctx = gsap.context(() => {
      // Guard clause: ensure refs are populated
      if (!sectionRef.current || !rolexRef.current) {
        console.warn("GSAP animation skipped: refs not available yet.");
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Animation starts when section top hits viewport bottom
          end: "bottom top", // Animation ends when section bottom hits viewport top
          scrub: 1, // Smooth scrubbing effect (1-second lag) Show markers only in development
          invalidateOnRefresh: true, // Recalculate on resize/refresh
        },
      });

      tl.to(rolexRef.current, {
        y: -100, // Move the image 200px upwards
        ease: "none", // Linear animation, directly tied to scroll progress
      });
    }, sectionRef); // Scope the context to the main section element (optional, but good practice)

    return () => ctx.revert(); // Cleanup GSAP animations and ScrollTriggers on component unmount
  }, []); // Empty dependency array: runs once after initial render

  return (
    <section className="h-[150vh] bg-gray-100 relative overflow-hidden">
      <img
        ref={rolexRef}
        src="/rolex.png" // Make sure this path is correct and the image loads
        alt="Rolex"
        className="absolute bottom-0 left-100 w-[300px] h-[300px] object-contain"
      />
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-[143px] text-center leading-none">
          {" "}
          {/* Added leading-none for tighter lines if needed */}
          THE BEST <br /> WATCHES IN <br /> THE MARKET
        </h1>
      </div>
    </section>
  );
}
