import { useState } from "react";
import { motion } from "framer-motion";
import { disperse } from "@/components/TextDisperse/animation";

export default function TextDisperse({ children, setBackground }) {
  const [isAnimated, setIsAnimated] = useState(false);

  const getChars = (text) => {
    if (typeof text !== "string") return null; // Evita errores si no es un string

    return text.split("").map((char, i) => (
      <motion.span
        custom={i}
        variants={disperse}
        animate={isAnimated ? "open" : "closed"}
        key={char + i}
      >
        {char}
      </motion.span>
    ));
  };

  const manageMouseEnter = () => setIsAnimated(true);
  const manageMouseLeave = () => setIsAnimated(false);

  return (
    <div
      style={{ cursor: "pointer" }}
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
      className="introLine"
    >
      {getChars(children)}
    </div>
  );
}
