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

export default function Index7({ project, onHoverChange }) {
  const [isActive, setIsActive] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [showCenterText, setShowCenterText] = useState(false);
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
      setShowCenterText(true); // Mostrar texto central
    }
  };
  

  const handleAnimationComplete = () => {
    setShowCenterText(false); // Ocultamos antes de redirigir
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
        <p className={`flex uppercase ${styles.title1}`}>{title1}</p>

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
          <div className={`${styles.doubleTitle} flex flex-row md:flex-col items-start justify-start leading-[3.5vw] whitespace-nowrap`}>
            <p className={`text-left uppercase ${styles.title2}`}>{title2}</p>
            <p className={`text-left uppercase ${styles.title3}`}>{title3}</p>
          </div>
        ) : (
          <p className={`flex uppercase ${styles.title1}`}>{title2}</p>
        )}
      </div>

      <AnimatePresence>
        {isExpanding && bounds && (
          <>
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

            {showCenterText && (
              <motion.div
              className="fixed top-1/2 left-1/2 z-[10000] text-gray-300 mix-blend-difference uppercase pointer-events-none"
              initial={{opacity: 0}}
              animate={{opacity: 1, transition: { duration: 0.6 }}} // No animación
              exit={{opacity: 0, transition: { duration: 0.3 }}} // Sin animación de salida
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <div className="flex flex-row items-center justify-center gap-1">
                <p className="text-[6vh] md:text-[15.8vh] flex uppercase">{title1}</p>
                {title3 ? (
                  <div className={`${styles.doubleTitle} flex flex-row md:flex-col items-start justify-start leading-[6.0vh] whitespace-nowrap`}>
                    <p className="text-left uppercase">{title2}</p>
                    <p className="text-left uppercase">{title3}</p>
                  </div>
                ) : (
                  <p className="flex whitespace-nowrap uppercase">{title2}</p>
                )}
              </div>
            </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

    </>
  );
}
