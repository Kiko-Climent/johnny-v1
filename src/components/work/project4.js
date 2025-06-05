"use client";

import styles from "@/components/work/style.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/router";

const anim = {
  initial: { width: 0 },
  open: { width: "auto", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
  closed: { width: 0 }
};

export default function Index4({ project, onHoverChange }) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const { title1, title2, title3, src } = project;

  const handleMouseEnter = () => {
    setIsActive(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    onHoverChange?.(false);
  };

  const handleClick = () => {
    router.push(`/work/${project.id}`);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${styles.project} flex flex-row items-center justify-center gap-0 text-4xl -mb-2`}
    >
      {/* Título izquierda */}
      <p className="text-[6vh] md:text-[15.8vh] flex">{title1}</p>

      {/* Imagen con animación */}
      <motion.div
        variants={anim}
        initial="closed"
        animate={isActive ? "open" : "closed"}
        className={styles.imgContainer}
      >
        <img src={`/images/gallery/${src}`} alt={title1} />
      </motion.div>

      {/* Título derecha */}
      {title3 ? (
        // Si hay title3, mostramos title2 y title3 en columna
        <div className={`${styles.doubleTitle} flex flex-row md:flex-col items-start justify-start text-[2.5vh] md:text-[7.5vh] leading-[3.0vh] md:leading-[6.0vh] whitespace-nowrap`}>
          <p className="text-left">{title2}</p>
          <p className="text-left">{title3}</p>
        </div>
      ) : (
        // Si no, mostramos solo title2 en línea
        <p className="text-[6vh] md:text-[15.8vh] flex whitespace-nowrap">{title2}</p>
      )}
    </div>
  );
}
