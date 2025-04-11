"use client";

import styles from "@/components/work/style.module.css";
import { motion } from "framer-motion";
import { useState } from "react";

const anim = {

  initial: {width: 0},

  open: {width: "auto", transition: {duration: 0.4, ease: [0.23, 1, 0.32, 1]}},

  closed: {width: 0}

}

export default function index({project, onHoverChange}) {

  const [isActive, setIsActive] = useState(false)

  const { title1, title2, src } = project;

  const handleMouseEnter = () => {
    setIsActive(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    onHoverChange?.(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.project}
    >
      <p>{title1}</p>
      <motion.div
        variants={anim}
        animate={isActive ? "open" : "closed"}
        className={styles.imgContainer}
      >
        <img src={`/images/${src}`} />
      </motion.div>
      <p>{title2}</p>
    </div>
  );
}

