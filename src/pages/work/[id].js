import Slider6 from "@/components/gallery/index6";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const galleries = {
  paradise_is_really_nice: [
    {src:"/images/gallery/image25.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image26.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image27.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image28.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image29.webp", coord:"52°31'28″N 13°24'38″E", location:"berlin-mitte"},
    {src:"/images/gallery/image30.webp", coord:"35°18′35″N 24°53′36″E", location:"creta"},
    {src:"/images/gallery/image31.webp", coord:"52°22'00″N 13°30'12″E", location:"berlin-airport"},
    {src:"/images/gallery/image32.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image33.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image34.webp", coord:"52°31′28″N 13°24′38″E", location:"berlin-spree"},
    {src:"/images/gallery/image35.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image36.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
  ],
  johnny_color: [
    {src:"/images/gallery/image1.webp", coord:"37°39'16″N 00°43'15″W", location:"la manga"},
    {src:"/images/gallery/image2.webp", coord:"36°46′50″N 02°14′36″W", location:"cabo de gata"},
    {src:"/images/gallery/image3.webp", coord:"36°46′50″N 02°14′36″W", location:"cabo de gata"},
    {src:"/images/gallery/image4.webp", coord:"37°05′28″N 02°18′08″W", location:"tabernas"},
    {src:"/images/gallery/image5.webp", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},
    {src:"/images/gallery/image6.webp", coord:"37°05′28″N 02°18′08″W", location:"tabernas"},
    {src:"/images/gallery/image7.webp", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},
    {src:"/images/gallery/image8.webp", coord:"52°30′16″N 13°16′49″E", location:"icc berlin"},
    {src:"/images/gallery/image9.webp", coord:"52°31'12″N 13°24'36″E", location:"berlin"},
    {src:"/images/gallery/image10.webp", coord:"52°31'12″N 13°24'36″E", location:"berlin"},
    {src:"/images/gallery/image11.webp", coord:"52°31'12″N 13°24'36″E", location:"berlin"},
    {src:"/images/gallery/image12.webp", coord:"52°31'12″N 13°24'36″E", location:"berlin"},
  ],
  leak_of_dreams: [
    {src:"/images/gallery/image13.webp", coord:"36°31′46″N 05°46′04″W", location:"cadiz"}, 
    {src:"/images/gallery/image14.webp", coord:"36°05′17″N 05°47′03″W", location:"duna bolonia"}, 
    {src:"/images/gallery/image15.webp", coord:"40°28′40″N 03°41′16″W", location:"madrid"}, 
    {src:"/images/gallery/image16.webp", coord:"52°25'59″N 13°38'59″E", location:"müggelsee"}, 
    {src:"/images/gallery/image17.webp", coord:"52°28′25″N 13°24′06″E", location:"tempelhof"}, 
    {src:"/images/gallery/image18.webp", coord:"52°01′36″N 09°30′50″E", location:"esperde"}, 
    {src:"/images/gallery/image20.webp", coord:"52°31'28″N 13°24'38″E", location:"berlin"}, 
    {src:"/images/gallery/image19.webp", coord:"52°01′36″N 09°30′50″E", location:"esperde"}, 
    {src:"/images/gallery/image21.webp", coord:"43°21′41″N 05°50′52″W", location:"asturias"}, 
    {src:"/images/gallery/image22.webp", coord:"35°18′35″N 24°53′36″E", location:"creta"}, 
    {src:"/images/gallery/image23.webp", coord:"37°59′12″N 23°50′51″E", location:"glyka nera"}, 
    {src:"/images/gallery/image24.webp", coord:"35°18′35″N 24°53′36″E", location:"creta"}, 
    {src:"/images/gallery/image38.webp", coord:"52°25'59″N 13°38'59″E", location:"müggelsee"}, 
    
  ],
  costas_de_sol: [
    {src:"/images/gallery/image55.webp", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},
    {src:"/images/gallery/image56.webp", coord:"36°31′46″N 05°46′04″W", location:"cadiz"},
    {src:"/images/gallery/image57.webp", coord:"36°25′00″N 06°09′00″W", location:"chiclana"},
    {src:"/images/gallery/image58.webp", coord:"36°25′00″N 06°09′00″W", location:"chiclana"},
    {src:"/images/gallery/image59.webp", coord:"36°25′00″N 06°09′00″W", location:"chiclana"},
    {src:"/images/gallery/image60.webp", coord:"36°25′00″N 06°09′00″W", location:"chiclana"},
    {src:"/images/gallery/image61.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image68.webp", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},
    {src:"/images/gallery/image63.webp", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image64.webp", coord:"35°18′35″N 24°53′36″E", location:"creta"},
    {src:"/images/gallery/image65.webp", coord:"35°18′35″N 24°53′36″E", location:"creta"},
    {src:"/images/gallery/image66.webp", coord:"35°18′35″N 24°53′36″E", location:"creta"},
    {src:"/images/gallery/image67.webp", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},

  ],
  johnny_de_noche: [
    {src:"/images/gallery/image37.webp", coord:"52°31'12″N 13º24'36 E", location:"berlin-mitte"},
    {src:"/images/gallery/image39.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image40.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image41.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image42.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image43.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image44.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image45.webp", coord:"52°29'08″N 13°22'60″E", location:"berlin-kreuzberg"},
    {src:"/images/gallery/image46.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image47.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image48.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image49.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image50.webp", coord:"35°18′35″N 24°53′36″E", location:"madrid"},
    {src:"/images/gallery/image51.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image52.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image53.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image54.webp", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
  ]
};

const Gallery = () => {
  const router = useRouter();
  const { id } = router.query;
  const [images, setImages] = useState([]);

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  useEffect(() => {
    if (id && galleries[id]) {
      setImages(galleries[id]);
    }
  }, [id]);

  return (
    <div className="w-screen flex flex-col items-center justify-center"
    style={{ height: "calc(var(--vh, 1vh) * 100)" }}>
      {images.length > 0 ? (
        <div className="w-full">
          <Slider6 images={images} id={id} />
        </div>
      ) : (
        <p className="text-white">Charging images...</p>
      )}
    </div>
  );
};

export default Gallery;
