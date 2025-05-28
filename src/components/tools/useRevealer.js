"use client";

import { gsap } from "gsap";

export function playRevealerAnimation(callback) {
  import("gsap/CustomEase").then((mod) => {
    const CustomEase = mod.default;
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.9, 0, 0.1, 1");

    gsap.to(".revealer", {
      scaleY: 1, // primero aparece
      duration: 0.8,
      ease: "hop",
      onComplete: () => {
        callback?.(); // Navega
        gsap.to(".revealer", {
          scaleY: 0, // luego desaparece
          duration: 1,
          ease: "hop",
        });
      },
    });
  });
}
