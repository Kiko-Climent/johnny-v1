import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Splash2 from "@/components/loader/index2";

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const PageTransitionWrapper6 = ({ children }) => {
  // const [showSplash, setShowSplash] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowSplash(false);
  //   }, 3000); // duración del splash
  //   return () => clearTimeout(timeout);
  // }, []);

  // if (showSplash) {
  //   return (
  //     <motion.div
  //       initial={{ opacity: 1 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //       className="fixed top-0 left-0 w-full h-full bg-white z-50"
  //     >
  //       <Splash2 />
  //     </motion.div>
  //   );
  // }

  return (
    <motion.div
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // className="fixed top-0 left-0 w-screen h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper6;
