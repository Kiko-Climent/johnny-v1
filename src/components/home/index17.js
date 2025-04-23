"use client";

import styles from "@/styles/Home.module.css";
import { useState } from "react";

const images = [
  "/images/image00001.webp",
  "/images/image00002.webp",
  "/images/image00003.webp",
  "/images/image00007.webp",
  "/images/image00029.webp",
  "/images/image00014.webp",
  "/images/image00017.webp",
  "/images/image00023.webp",
  "/images/image00038.webp",
  "/images/image00035.webp",
];

const HomeGallery12 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const nextIndex = (currentIndex + 1) % images.length;
  const nextNextIndex = (nextIndex + 1) % images.length;

  const handleClick = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setFadeOut(true); // Aplica el fade rápido al front

    // Esperamos el fade, luego hacemos el cambio
    setTimeout(() => {
      setTriggerAnimation(true); // middle escala hacia front
    }, 50); // empieza casi instantáneo

    setTimeout(() => {
      // Hacemos el swap completo
      setCurrentIndex(nextIndex);
      setTriggerAnimation(false);
      setFadeOut(false);
      setIsAnimating(false);
    }, 1000); // mismo tiempo que la animación total
  };

  return (
    <div className={styles.slider} onClick={handleClick}>
      {/* BACKGROUND */}
      <img
        key={images[nextNextIndex]}
        src={images[nextNextIndex]}
        className={`${styles.image} ${styles.background} object-cover`}
        alt="Background"
      />

      {/* MIDDLE */}
      <img
        key={images[nextIndex] + (triggerAnimation ? "-anim" : "")}
        src={images[nextIndex]}
        className={`${styles.image} ${styles.middle} ${
          triggerAnimation ? styles["animate-to-front"] : ""
        } object-cover`}
        alt="Middle"
      />

      {/* FRONT */}
      <img
        key={images[currentIndex]}
        src={images[currentIndex]}
        className={`${styles.image} ${styles.front} ${
          fadeOut ? styles["fade-out"] : ""
        } object-contain`}
        alt="Front"
      />
    </div>
  );
};

export default HomeGallery12;
