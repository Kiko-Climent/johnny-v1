import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const elements = [
  { id: 1, name: "mediterraneo", image: "/images/image00032.webp", clip: "polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%)" },
  { id: 2, name: "dolce vita", image: "/images/image00014.webp", clip: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" },
  { id: 3, name: "islas", image: "/images/image00010.jpeg", clip: "polygon(0 0, 50% 0, 50% 50%, 0 50%)" },
  { id: 4, name: "tempelfog", image: "/images/image00001.webp", clip: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" },
  { id: 5, name: "johnny color", image: "/images/image00036.jpeg", clip: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" },
  { id: 6, name: "späti tales", image: "/images/image00029.webp", clip: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
];

const WorkMenu5 = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [previousElement, setPreviousElement] = useState(null);
  const [clipPath, setClipPath] = useState(null);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const preloadImages = async () => {
      const newLoadedImages = {};
      for (const element of elements) {
        const img = new window.Image();
        img.src = element.image;
        await img.decode().catch(() => {}); // Evita errores si la imagen falla
        newLoadedImages[element.image] = true;
      }
      setLoadedImages(newLoadedImages);
    };
    preloadImages();
  }, []);

  const handleTitleClick = (element) => {
    if (selectedElement?.id === element.id) {
      setIsFullyRevealed(!isFullyRevealed);
    } else {
      setIsFullyRevealed(false);
      setPreviousElement(selectedElement);
      setClipPath(selectedElement ? selectedElement.clip : "polygon(0 0, 100% 0, 100% 100%, 0 100%)");
      setSelectedElement(element);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Imagen con efecto */}
      <div className="absolute inset-0 flex items-center justify-center">
      {previousElement && !loadedImages[selectedElement?.image] && (
          <motion.div
            key={`prev-${previousElement.id}`}
            className="absolute w-full h-full"
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              alt={previousElement.name}
              src={previousElement.image}
              fill
              loading="eager"
              className="object-cover"
            />
          </motion.div>
        )}
        {selectedElement && (
          <motion.div
            key={selectedElement.id}
            className="relative w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute w-full h-full"
              animate={{
                clipPath: isFullyRevealed
                  ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                  : selectedElement.clip,
                filter: isFullyRevealed ? "none" : "invert(1)",
              }}
              initial={{ clipPath: clipPath }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                clipPath: { type: "spring", stiffness: 50, damping: 15 },
              }}
            >
              <Image
                alt={selectedElement.name}
                src={selectedElement.image}
                fill
                loading="eager"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Menú de títulos */}
      <div className="z-10 text-center flex flex-col pb-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className="text-3xl uppercase text-black cursor-pointer transition-opacity"
            onClick={() => handleTitleClick(element)}
            animate={{
              opacity: selectedElement && selectedElement.id !== element.id ? 0.3 : 1,
              fontWeight: selectedElement?.id === element.id ? 700 : 400,
            }}
          >
            {element.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WorkMenu5;
