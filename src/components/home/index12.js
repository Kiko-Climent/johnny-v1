"use client";

//with coordenates FRAMER MOTION 

import { motion } from "framer-motion";
import { useState } from "react";



const HomeGallery7 = ({images}) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const currentIndex = index % images.length;
  const backgroundIndex = (index + 1) % images.length;
  const nextBackgroundIndex = (index + 2) % images.length;

  const currentImage = images[currentIndex];

  const handleClick = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-black relative overflow-hidden"
      onClick={handleClick}
    >
      {/* Imagen de fondo */}
      <motion.img
        key={nextBackgroundIndex}
        src={images[nextBackgroundIndex].src}
        alt="Siguiente fondo"
        className="absolute w-full h-full object-cover"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Imagen actual que está en fondo y pasará al centro */}
      <motion.img
        key={backgroundIndex}
        src={images[backgroundIndex].src}
        alt="Fondo actual"
        className="absolute w-full h-full"
        initial={{ opacity: 1, scale: 1, objectFit: "cover", clipPath: "inset(0%)" }}
        animate={{
          opacity: 1,
          scale: 0.85,
          objectFit: "contain",
          clipPath: "inset(5%)", // Hace que el cambio se vea más progresivo
        }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Imagen que está en el centro y desaparecerá */}
      
      <motion.img
        key={currentIndex}
        src={images[currentIndex].src}
        alt="Imagen central"
        className="absolute object-contain"
        initial={{ opacity: 1, scale: 0.85, filter: "blur(0px)" }}
        animate={{ opacity: 0, scale: 0, filter: "blur(25px)" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute text-white bottom-16 text-9xl whitespace-nowrap mix-blend-difference"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10, // Ajusta la velocidad aquí
          ease: "linear",
        }}
      >
        {currentImage.coordinates}
      </motion.div>
    </div>

  );
};

export default HomeGallery7;
