// components/PageTransitionOverlay.js
import { motion } from "framer-motion";

const overlayVariants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: {
    scaleX: 0,
    originX: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const PageTransitionOverlay = ({ nextRoute }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-black z-[1000] flex items-center justify-center"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1
        className="text-white text-4xl font-bold uppercase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {nextRoute}
      </motion.h1>
    </motion.div>
  );
};

export default PageTransitionOverlay;
