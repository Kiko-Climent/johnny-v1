import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const elements = [
  { id: 1, name: "mediterraneo", image: "/images/image00032.webp" },
  { id: 2, name: "dolce vita", image: "/images/image00014.webp" },
  { id: 3, name: "islas", image: "/images/image00010.jpeg" },
  { id: 4, name: "tempelfog", image: "/images/image00001.webp" },
  { id: 5, name: "johnny color", image: "/images/image00036.jpeg" },
  { id: 6, name: "späti tales", image: "/images/image00029.webp" },
];

const WorkMenu6 = () => {
  const [selectedElement, setSelectedElement] = useState(elements[0]);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [expanded, setExanded] = useState(false)
  
  const handleTitleClick = (element) => {
    if (selectedElement.id === element.id) {
      setExanded(!expanded);
    } else {
      setSelectedElement(element);
      setPosition({
        x: `${Math.random() * 40 + 30}%`, // Evita que se quede pegado a los bordes
        y: `${Math.random() * 40 + 30}%`,
      });
      setExanded(false)
    }
  };
  
  return (
    <div className="flex flex-col h-screen w-screen relative overflow-hidden">
      {/* Imagen de fondo */}
      <motion.div
        className="absolute w-full h-full"
        animate={{
          clipPath: expanded
            ? "circle(100% at 50% 50%)"
            : `circle(25% at ${position.x} ${position.y})`,
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
      <div className="z-10 text-center flex flex-col pb-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="text-3xl uppercase text-white cursor-pointer transition-opacity"
            onClick={() => handleTitleClick(element)}
            animate={{
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

export default WorkMenu6;
