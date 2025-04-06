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

const HomePage = () => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const nextIndex = (currentIndex + 1) % images.length

  const handleClick = () => {
    setCurrentIndex(nextIndex);
  }

  return (
    <section 
      className="w-full h-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${images[nextIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      onClick={handleClick}
    >
      <div className="flex w-9/12 h-5/6 justify-center items-center absolute">
        <Image 
          src={images[currentIndex]}
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

export default HomePage;