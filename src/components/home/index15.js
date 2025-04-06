"use client";

// with coordenates using GSAP

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";



const HomeGallery10 = ({images}) => {
  const [index, setIndex] = useState(0);
  const firstText = useRef(null);
  const secondText = useRef(null);

  useEffect(() => {
    if (secondText.current && firstText.current) {
      gsap.set(secondText.current, { left: secondText.current.getBoundingClientRect().width });
      requestAnimationFrame(animate);
    }
  }, []);

  let xPercent = 0;

  const animate = () => {
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1;
  };

  useEffect(() => {
    images.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, []);
  

  if (!images || images.length === 0) return null;

  const currentIndex = index % images.length;
  const backgroundIndex = (index + 1) % images.length;
  const nextBackgroundIndex = (index + 2) % images.length;

  const currentImage = images[currentIndex];

  const handleClick = () => {
    const nextImage = new Image();
    nextImage.src = images[(index + 3) % images.length].src;
    nextImage.onload = () => {
      requestAnimationFrame(() => {
        setIndex((prev) => prev + 1);
      });
    };
  }

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
        style={{ willChange: "opacity, transform" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        // transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Imagen actual que está en fondo y pasará al centro */}
      <motion.img
        key={backgroundIndex}
        src={images[backgroundIndex].src}
        alt="Fondo actual"
        className="absolute w-full h-full"
        initial={{ opacity: 1, scale: 1, objectFit: "contain", clipPath: "inset(0%)" }}
        animate={{
          opacity: 1,
          scale: 0.85,
          objectFit: "contain",
          clipPath: "inset(5%)", // Hace que el cambio se vea más progresivo
        }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Imagen que está en el centro y desaparecerá */}
      
      <motion.img
        key={currentIndex}
        src={images[currentIndex].src}
        alt="Imagen central"
        className="absolute object-contain"
        initial={{ opacity: 1, scale: 0.85, filter: "blur(0px)" }}
        animate={{ opacity: 0, scale: 0.7, filter: "blur(15px)" }} // Reducimos el blur y ajustamos la escala
        transition={{ duration: 0.4, ease: "easeInOut" }} // Aumentamos la duración en móviles
      />
      <div className="absolute slider-container">
        <div className="relative text-white whitespace-nowrap mix-blend-difference">
          <p ref={firstText} className="first">{currentImage.coordinates}</p>
          <p ref={secondText} className="second">{currentImage.coordinates}</p>
        </div>
      </div>
    </div>

  );
};

export default HomeGallery10;
