import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Splash2 from "@/components/loader/index2";

const variants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { x: "-100%", transition: { duration: 0.5, ease: "easeIn" } },
};

const PageTransitionWrapper6 = ({ children }) => {
  const [step, setStep] = useState("splash"); // splash → slide → content

  useEffect(() => {
    // Duración total de tu animación Splash2
    const timeout = setTimeout(() => {
      setStep("slide");
    }, 3000); // ajusta según tu animación

    return () => clearTimeout(timeout);
  }, []);

  if (step === "splash") {
    return (
      <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
        <Splash2 />
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="absolute top-0 left-0 w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper6;