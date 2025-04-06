"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const images = [
  "/images/image00014.jpeg",
  "/images/image00027.jpeg",
  "/images/image00001.jpeg",
  "/images/image00028.jpeg",
  "/images/image00038.jpeg",
  "/images/image00030.jpeg",
  "/images/image00017.jpeg",
  "/images/image00041.jpeg",
  "/images/image00025.jpeg",
  "/images/image00036.jpeg",
];

const HomeGallery5 = () => {
  const [index, setIndex] = useState(0);

  const currentIndex = index % images.length;
  const backgroundIndex = (index + 1) % images.length;
  const nextBackgroundIndex = (index + 2) % images.length;

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
        src={images[nextBackgroundIndex]}
        alt="Siguiente fondo"
        className="absolute w-full h-full"
        initial={{ opacity: 0, filter: "blur(25px)" }}
        animate={{ opacity: 1, scale: 1.1, filter: "blur(0px)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Imagen actual que está en fondo y pasará al centro */}
      <motion.img
        key={backgroundIndex}
        src={images[backgroundIndex]}
        alt="Fondo actual"
        className="absolute"
        initial={{ opacity: 1, scale: 1, objectFit: "cover", clipPath: "inset(0%)" }}
        animate={{
          opacity: 1,
          scale: 0.85,
          objectFit: "contain",
          clipPath: "inset(5%)", // Hace que el cambio se vea más progresivo
        }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Imagen que está en el centro y desaparecerá */}
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt="Imagen central"
        className="absolute"
        initial={{ opacity: 1, scale: 0.85, filter: "blur(0px)" }}
        animate={{ opacity: 0, scale: 0, filter: "blur(25px)" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </div>

  );
};

export default HomeGallery5;
