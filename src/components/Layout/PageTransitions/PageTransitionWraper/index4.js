"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Splash2 from "@/components/loader/index2";

const PageTransitionWrapper2 = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [displayedChildren, setDisplayedChildren] = useState(children);

  // Forzar transición en cada pathname diferente
  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => {
      setDisplayedChildren(children);
      setIsTransitioning(false);
    }, 600); // Dura lo mismo que las animaciones combinadas

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Cortina negra con texto */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
          key="overlay"
          initial={{
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          exit={{
            clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          className="fixed top-0 left-0 w-full h-full bg-white z-[1000] flex items-center justify-center"
        >
          <Splash2 />
        </motion.div>
        )}
      </AnimatePresence>


      {/* Página que se revela con clip-path */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
        className="relative z-10 h-full w-full"
      >
        {displayedChildren}
      </motion.div>
    </div>
  );
};

export default PageTransitionWrapper2;
