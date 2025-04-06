"use client";
import Image from "next/image";
import { useState } from "react";


const images = [
  "/images/image00014.jpeg",
  "/images/image00027.jpeg",
  "/images/image00001.jpeg",
  "/images/image00041.jpeg",
  "/images/image00038.jpeg",
]

const HomeGallery = () => {

  const [bgIndex, setBgIndex] = useState(0); // Imagen en background
  const [centerIndex, setCenterIndex] = useState(null); // Imagen encuadrada en el centro

  const handleClick = () => {
    if (centerIndex === null) {
      setCenterIndex(bgIndex); // La imagen del fondo pasa al centro
      setBgIndex((prev) => (prev + 1) % images.length); // Nueva imagen en background
    } else {
      setCenterIndex(null); // Oculta la imagen centrada
      setTimeout(() => {
        setCenterIndex(bgIndex); // Mueve la imagen de fondo al centro
        setBgIndex((prev) => (prev + 1) % images.length); // Nueva imagen en background
      }, 500); // Espera la animación antes de cambiar
    }
  };

  return (
    <section 
      className="w-full h-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${images[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      onClick={handleClick}
    >
      <div className="flex w-9/12 h-5/6 justify-center items-center absolute">
        <Image 
          src={images[centerIndex]}
          className="w-full h-full object-contain"
          alt="johnny carretes home"
          sizes="(max-width: 768px) 100vw, 700px"
          priority
          fill
        />
      </div>
    </section>
  )
}

export default HomeGallery;