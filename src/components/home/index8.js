"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";


const images = [
  "/images/image00014.jpeg",
  "/images/image00027.jpeg",
  "/images/image00001.jpeg",
  "/images/image00010.jpeg",
  "/images/image00038.jpeg",
  "/images/image00034.jpeg",
]

const HomeGallery3 = () => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isCentered, setIsCentered] = useState(false);

  const nextIndex = (currentIndex + 1) % images.length

  const handleClick = () => {
    if (isAnimating) return;

    if (!isCentered) {
      setIsCentered(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
        setIsCentered(false); // Reinicia para la siguiente imagen
      }, 500);
    }
  };



  return (
    <section 
      className="w-full h-full flex justify-center items-center relative"
      onClick={handleClick}
    >
      <motion.div
        className="absolute w-full h-full flex"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{
          opacity: 1,
          scale: isCentered ? 0.8 : 1.1,
          width: isCentered ? "80%" : "100%",
          height: isCentered ? "80%" : "100%",
        }}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <Image
          src={images[nextIndex]}
          className={`w-full h-full isCentered ? object-cover : object-contain`}
          alt="johnny carretes home"
          priority
          fill
        />
      </motion.div>
    </section>
  )
}

export default HomeGallery3;