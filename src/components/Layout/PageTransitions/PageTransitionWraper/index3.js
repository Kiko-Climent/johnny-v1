"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PageTransitionWrapper3 = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(true);

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
          className="fixed top-0 left-0 w-full h-full z-[1000] backdrop-blur-xl mix-blend-difference bg-black/70 flex items-center justify-center"
          key="overlay"
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", transition: { duration: 0.6 } }}
          exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", transition: { duration: 0.6 } }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-white text-4xl font-bold uppercase"
          >
            {pathname?.replace("/", "") || "home"}
          </motion.h1>
        </motion.div>
        
        )}
      </AnimatePresence>


      {/* Página que se revela con clip-path */}
      <motion.div
        key={pathname}
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
        className="relative z-10 h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransitionWrapper3;
