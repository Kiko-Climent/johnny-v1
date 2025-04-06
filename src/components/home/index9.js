"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";


const images = [
  "/images/image00014.jpeg",
  "/images/image00027.jpeg",
  "/images/image00001.jpeg",
  "/images/image00041.jpeg",
  "/images/image00038.jpeg",
]

const HomeGallery4 = () => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextIndex = (currentIndex + 1) % images.length

  const handleClick = () => {
    if (isAnimating) return
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsAnimating(false);
    }, 500)
  }


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
          scale: 1.1,
          width: isAnimating ? "75%" : "100%",
          height: isAnimating ? "75%" : "100%",
        }}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <Image
          src={images[nextIndex]}
          className="w-full h-full object-cover"
          alt="johnny carretes home"
          priority
          fill
        />
      </motion.div>
      <motion.div className="flex w-9/12 h-5/6 justify-center items-center absolute"
      initial={{ opacity: 1 }}
      animate={isAnimating ? {  opacity: 0 } : {}}
      transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <Image 
          src={images[currentIndex]}
          className="object-contain"
          alt="johnny carretes home"
          sizes="(max-width: 768px) 100vw, 700px"
          priority
          fill
        />
      </motion.div>
    </section>
  )
}

export default HomeGallery4;