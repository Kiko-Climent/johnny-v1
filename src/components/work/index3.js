import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"


const elements = [
  {id: 1, name: "1 mediterraneo", image: "/images/image00032.webp"},
  {id: 2, name: "2 dolce vita", image: "/images/image00014.webp"},
  {id: 3, name: "3 islas", image: "/images/image00010.jpeg"},
  {id: 4, name: "4 tempelfog", image: "/images/image00001.webp"},
  {id: 5, name: "5 johnny color", image: "/images/image00036.jpeg"},
  {id: 6, name: "6 späti tales", image: "/images/image00029.webp"},
]


const WorkMenu3 = () => {
  const [hoveredElement, setHoveredElement] = useState(null)
  const [clickedElement, setClickedElement] = useState(null)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleTitleClick = (image) => {
    setClickedElement((prev) => (prev === image ? null : image));
  };

  const handleMouseEnter = (image) => {
    if (!isMobile && !clickedElement) {
      setHoveredElement(image);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && !clickedElement) {
      setHoveredElement(null);
    }
  };

  const displayedImage = clickedElement || hoveredElement;

  return(
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        {displayedImage && (
          <motion.div key={displayedImage}
          className="flex absolute w-full h-full"
          
          >
            <Image 
            alt="gallery image"
            src={displayedImage}
            fill
            className="object-cover"
            />
          </motion.div>
        )}
      </div>
      <div className="relative z-10 w-full text-center flex flex-col px-4 py-4 bg-transparent backdrop-invert">
      {elements.map(({ id, name, image }) => (
        <motion.div
        key={id}
        className="flex justify-center items-center text-3xl uppercase text-black cursor-pointer transition-opacity "
        onClick={() => handleTitleClick(image)}
        onMouseEnter={() => handleMouseEnter(image)}
        onMouseLeave={handleMouseLeave}
        animate={{
          opacity: hoveredElement && hoveredElement !== image ? 0.3 : 1,
          fontWeight: displayedImage === image ? 700 : 400,
        }}
      >
          {name}
        </motion.div>
      ))}
      </div>
    </div>
  )
}

export default WorkMenu3;