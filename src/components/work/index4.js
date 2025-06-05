// import Image from "next/image";
// import { useState } from "react";
// import { motion } from "framer-motion";

// const elements = [
  
//   { id: 1, name: "mediterraneo", image: "/images/image00032.webp", clip: "circle(30% at 50% 50%)" },
//   { id: 2, name: "dolce vita", image: "/images/image00014.webp", clip: "circle(22% at 50% 50%)" },
//   { id: 3, name: "islas", image: "/images/image00010.jpeg", clip: "circle(13% at 50% 50%)" },
//   { id: 4, name: "tempelfog", image: "/images/image00001.webp", clip: "circle(18% at 50% 50%)" },
//   { id: 5, name: "johnny color", image: "/images/image00036.jpeg", clip: "circle(24% at 50% 50%)" },
//   { id: 6, name: "späti tales", image: "/images/image00029.webp", clip: "circle(30% at 50% 50%)" },
// ];


// const WorkMenu4= () => {
//   const [selectedElement, setSelectedElement] = useState(null);
//   const [clipPath, setClipPath] = useState(null);
//   const [isFullyRevealed, setIsFullyRevealed] = useState(false);

//   const handleTitleClick = (element) => {
//     if (selectedElement?.id === element.id) {
//       setIsFullyRevealed(!isFullyRevealed);
//     } else {
//       setIsFullyRevealed(false);
//       setClipPath(selectedElement ? selectedElement.clip : );
//       setSelectedElement(element);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen w-screen">
//       {/* Imagen con efecto */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {selectedElement && (
//           <motion.div
//             key={selectedElement.id}
//             className="relative w-full h-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <motion.div
//               className="absolute w-full h-full"
//               animate={{
//                 clipPath: isFullyRevealed
//                   ? "circle(100% at 50% 50%)"
//                   : selectedElement.clip,
//                 filter: isFullyRevealed ? "none" : "invert(1)",
//               }}
//               initial={{ clipPath: clipPath }}
//               transition={{
//                 duration: 1,
//                 ease: "easeInOut",
//                 clipPath: { type: "spring", stiffness: 50, damping: 15 },
//               }}
//             >
//               <Image
//                 alt={selectedElement.name}
//                 src={selectedElement.image}
//                 fill
//                 priority={true}
//                 className="object-cover"
//               />
//             </motion.div>
//           </motion.div>
//         )}
//       </div>

//       {/* Menú de títulos */}
//       <div className="z-10 text-center flex flex-col pb-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//         {elements.map((element) => (
//           <motion.div
//             key={element.id}
//             className="text-3xl uppercase text-black cursor-pointer transition-opacity"
//             onClick={() => handleTitleClick(element)}
//             animate={{
//               opacity: selectedElement && selectedElement.id !== element.id ? 0.3 : 1,
//               fontWeight: selectedElement?.id === element.id ? 700 : 400,
//             }}
//           >
//             {element.name}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkMenu4;
