"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import {motion} from "framer-motion";
import styles from "@/components/work/style.module.css";

export default function Index3({ project, onHoverChange, index }) {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const { title1, title2, src, id } = project;

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

  const isSpecialLayout = id === "mediterraneo";

  // Si es el layout especial y el primer proyecto
  const specialAndFirst = isSpecialLayout && index === 0;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`${styles.project} ${specialAndFirst ? "mb-24" : ""}`}
    >
      {isSpecialLayout ? (
        <>
          <div className={styles.specialTitle}>
            <div className="-space-y-6">
              <p>PARADISE</p>
              <p>IS</p>
            </div>
          </div>
          <motion.div
            variants={anim}
            animate={isActive ? "open" : "closed"}
            className={styles.imgContainer}
          >
            <img src={`/images/${src}`} />
          </motion.div>
          <div className={styles.specialTitle}>
            <div className="-space-y-6">
              <p>really</p>
              <p>nice</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>{title1}</p>
          <motion.div
            variants={anim}
            animate={isActive ? "open" : "closed"}
            className={styles.imgContainer}
          >
            <img src={`/images/${src}`} />
          </motion.div>
          <p>{title2}</p>
        </>
      )}
    </div>
  );
}
