// components/PageTransitionWrapper.js
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  },
  animate: {
    opacity: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
  },
  exit: {
    opacity: 0,
    clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
  },
};

const pageTransition = {
  duration: 0.6,
  ease: "easeInOut",
};

const PageTransitionWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;
