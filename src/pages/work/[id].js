// import Slider3 from "@/components/gallery/index3";
import Slider4 from "@/components/gallery/index4";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const galleries = {
  mediterraneo: [
    "/images/image00032.webp", 
    "/images/image00021.jpeg", 
    "/images/image00041.webp",
    "/images/image00030.jpeg", 
    "/images/image00007.jpeg",
    "/images/image00039.jpeg",
  ]
};

const Gallery = () => {
  const router = useRouter();
  const { id } = router.query;
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (id && galleries[id]) {
      setImages(galleries[id]);
    }
  }, [id]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      {images.length > 0 ? (
        <div className="w-full">
          <Slider4 images={images} />
        </div>
      ) : (
        <p className="text-white">Cargando imágenes...</p>
      )}
    </div>
  );
};

export default Gallery;
