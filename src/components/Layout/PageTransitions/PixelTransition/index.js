"use client";

import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const anim = {
  initial: { opacity: 0 },
  open: (i) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: 0.03 * i },
  }),
  closed: (i) => ({
    opacity: 0,
    transition: { duration: 0.5, delay: 0.03 * i },
  }),
};

export default function PixelTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setIsTransitioning(true);
    const handleRouteChangeComplete = () => setIsTransitioning(false);

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { innerWidth, innerHeight } = window;
      const blockSize = innerWidth * 0.05;
      const amountOfBlocks = Math.ceil(innerHeight / blockSize);

      setBlocks(
        [...Array(amountOfBlocks)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.block}
            variants={anim}
            initial="initial"
            animate={isTransitioning ? "open" : "closed"}
            custom={i}
          />
        ))
      );
    }
  }, [isTransitioning]);

  return (
    <div className={styles.pixelBackground}>
      {[...Array(20)].map((_, i) => (
        <div key={i} className={styles.column}>
          {blocks}
        </div>
      ))}
      <div className={isTransitioning ? styles.hidden : styles.visible}>
        {children}
      </div>
    </div>
  );
}
