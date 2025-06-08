"use client";

import styles from "@/components/work/style.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

const anim = {
  initial: { width: 0 },
  open: { width: "auto", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
  closed: { width: 0 }
};

export default function Index5({ project, onHoverChange }) {
  const [isActive, setIsActive] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [bounds, setBounds] = useState(null);
  const imgRef = useRef(null);
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
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      setBounds(rect);
      setIsExpanding(true);
    }
  };

  const handleAnimationComplete = () => {
    router.push(`/work/${project.id}`);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`${styles.project} flex flex-row items-center justify-center gap-0 -mb-2`}
      >
        <p className="text-[6vh] md:text-[15.8vh] flex uppercase">{title1}</p>

        <motion.div
          ref={imgRef}
          variants={anim}
          initial="closed"
          animate={isActive ? "open" : "closed"}
          className={`${styles.imgContainer} hidden md:block`}
        >
          <img src={`/images/gallery/${src}`} alt={title1} />
        </motion.div>

        {title3 ? (
          <div className={`${styles.doubleTitle} flex flex-row md:flex-col items-start justify-start text-[2.5vh] md:text-[7.5vh] leading-[3.0vh] md:leading-[6.0vh] whitespace-nowrap`}>
            <p className="text-left uppercase">{title2}</p>
            <p className="text-left uppercase">{title3}</p>
          </div>
        ) : (
          <p className="text-[6vh] md:text-[15.8vh] flex whitespace-nowrap uppercase">{title2}</p>
        )}
      </div>

      <AnimatePresence>
        {isExpanding && bounds && (
          <motion.div
            className={styles.fullscreenImage}
            initial={{
              top: bounds.top,
              left: bounds.left,
              width: bounds.width,
              height: bounds.height,
              position: "fixed",
              zIndex: 9999
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
            }}
            onAnimationComplete={handleAnimationComplete}
          >
            <img
              src={`/images/gallery/${src}`}
              alt={title1}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
