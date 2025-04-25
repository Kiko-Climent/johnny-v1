// import Slider3 from "@/components/gallery/index3";
import Slider4 from "@/components/gallery/index4";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const galleries = {
  mediterraneo: [
    {src:"/images/image00032.webp", coord:"35°18′35″N 24°53′36″E", location:"almeria"}, 
    {src:"/images/image00021.jpeg", coord:"43°21′09″N 19°73′77″W", location:"athens"}, 
    {src:"/images/image00041.webp", coord:"61°10′45″N 71°93′65″E", location:"palermo"}, 
    {src:"/images/image00030.jpeg", coord:"35°18′35″N 24°53′36″E", location:"mallorca"}, 
    {src:"/images/image00039.jpeg", coord:"43°21′09″N 19°73′77″W", location:"naples"}, 
  ],
  dolce_vita: [
    {src:"/images/image00014.webp", coord:"35°18′35″N 24°53′36″E", location:"oviedo"}, 
    {src:"/images/image00007.webp", coord:"43°21′09″N 19°73′77″W", location:"berlin"},
    {src:"/images/image00023.webp", coord:"26°71′25″N 10°03′07″W", location:"asturias"},
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
          <Slider4 images={images} id={id} />
        </div>
      ) : (
        <p className="text-white">Charging images...</p>
      )}
    </div>
  );
};

export default Gallery;
