"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PageTransitionWrapper = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(true);

  const formatPathname = (path) => {
    if (!path) return "Home";

    return path
      .slice(1)
      .split("/")
      .map(segment =>
        segment
          .replace(/_/g, " ")
          .replace(/\b\w/g, c => c.toUpperCase())
      )
      .join(" / ");
  }

  // Forzar transición en cada pathname diferente
  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 1200); // Dura lo mismo que las animaciones combinadas

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Cortina negra con texto */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
          key="overlay"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed top-0 left-0 w-full h-full bg-black z-[1000] flex items-center justify-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-white text-4xl font-bold uppercase"
          >
            {formatPathname(pathname)}
          </motion.h1>
        </motion.div>
        )}
      </AnimatePresence>
      {!isTransitioning && (

        <motion.div
          key={pathname}
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
          className="relative z-10 h-full w-full"
        >
          {children}
        </motion.div>
      )}
      {/* Página que se revela con clip-path */}
    </div>
  );
};

export default PageTransitionWrapper;
