import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const elements = [
  { id: 1, name: "mediterraneo", image: "/images/image00032.webp" },
  { id: 2, name: "dolce vita", image: "/images/image00014.webp" },
  { id: 3, name: "islas", image: "/images/image00010.jpeg" },
  { id: 4, name: "tempelfog", image: "/images/image00001.webp" },
  { id: 5, name: "johnny color", image: "/images/image00036.jpeg" },
  { id: 6, name: "späti tales", image: "/images/image00029.webp" },
];

const animation = {
  initial: {y: "100%", opacity: 0.1, filter: "blur(15px)", transformOrigin: "bottom" },
  enter: (i) => ({
    y: "0",
    filter: "blur(0px)",
    opacity: 1,
    transformOrigin: "bottom",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.075 * i,
    },
  }),
};

const WorkMenu7 = () => {
  const body = useRef(null)
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [clipSize, setClipSize] = useState("33%");
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [expanded, setExanded] = useState(false);
  const [clipVisible, setClipVisible] = useState(false)
  const router = useRouter();
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setClipVisible(true);
    }, 800);
    return() => clearTimeout(timeout)
  }, [])

  const handleTitleClick = (element) => {
    if (selectedElement.id === element.id) {
      if (expanded) {
        router.push(`/work/${element.name.replace(/\s+/g, "-")}`);
      } else {
        setExanded(true);
      }
    } else {
      setSelectedElement(element);
      setPosition({
        x: `${Math.random() * 30 + 40}%`, // Evita que se quede pegado a los bordes
        y: `${Math.random() * 30 + 40}%`,
      });
      setClipSize(`${Math.random() * (33-16) +16}%`);
      setExanded(false)
    }
  };
  
  return (
    <div ref={body} className="flex flex-col h-screen w-screen relative">
      {/* Imagen de fondo */}
      {clipVisible && (
        <motion.div
          className="absolute w-full h-full"
          animate={{
            clipPath: expanded
              ? "circle(100% at 50% 50%)"
              : `circle(${clipSize} at ${position.x} ${position.y})`,
          }}
          style={{
            filter: "invert(1)",
            mixBlendMode: "difference",
            pointerEvents: "none", // Evita interferencias
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
            alt={selectedElement.name}
            src={selectedElement.image}
            fill
            priority={true}
            className="object-cover"
          />
        </motion.div>
      )}

      {/* Imagen de fondo real */}
      <Image
        alt={selectedElement.name}
        src={selectedElement.image}
        fill
        priority={true}
        className={`object-cover transition-opacity duration-500 ${
          expanded ? "opacity-100" : "opacity-0"
        }`}
      />


      {/* Menú de títulos */}
      <div className="z-10 text-center flex flex-col justify-center items-center absolute inset-0 pb-16">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="text-3xl uppercase text-black cursor-pointer transition-opacity"
            onClick={() => handleTitleClick(element)}
            initial="initial"
            animate="enter"
            custom={1}
            variants={animation}
            style={{
              opacity: selectedElement.id === element.id ? 1 : 0.5,
              fontWeight: selectedElement.id === element.id ? 700 : 400,
            }}
          >
            {element.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkMenu7;
