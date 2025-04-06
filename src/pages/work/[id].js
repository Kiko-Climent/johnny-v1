import Slider2 from "@/components/gallery/index2";
// import Image from "next/image";
import { useRouter } from "next/router";

const galleries = {
  mediterraneo: [
    "/images/image00032.webp", 
    "/images/image00021.jpeg", 
    "/images/image00030.jpeg", 
    "/images/image00030.jpeg",
  ]
}


const Gallery = () => {
  const router = useRouter();
  const {id} = router.query;
  const images = galleries[id] || [];


  return(
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      {/* <h1 className="text-3xl font-bold capitalize mb-6">
        {id?.replace("-","")}
      </h1> */}
      {images.length > 0 ? (
        <div className="w-full">
          <Slider2 images={images} />
        </div>
      ) : (
        <p>No images found</p>
      )}
    </div>
  )
}

export default Gallery;