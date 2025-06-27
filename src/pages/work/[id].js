import Slider6 from "@/components/gallery/index6";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const galleries = {
  paradise_is_really_nice: [
    {src:"/images/gallery/image25.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image26.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image27.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image28.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image29.jpeg", coord:"52°31'28″N 13°24'38″E", location:"berlin-mitte"},
    {src:"/images/gallery/image30.jpeg", coord:"35°18′35″N 24°53′36″E", location:"creta"},
    {src:"/images/gallery/image31.jpeg", coord:"52°22'00″N 13°30'12″E", location:"berlin-airport"},
    {src:"/images/gallery/image32.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image33.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image34.jpeg", coord:"52°31′28″N 13°24′38″E", location:"berlin-spree"},
    {src:"/images/gallery/image35.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image36.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
  ],
  johnny_color: [
    {src:"/images/gallery/image1.jpeg", coord:"37°39'16″N 00°43'15″W", location:"la manga"},
    {src:"/images/gallery/image2.jpeg", coord:"36°46′50″N 02°14′36″W", location:"cabo de gata"},
    {src:"/images/gallery/image3.jpeg", coord:"36°46′50″N 02°14′36″W", location:"cabo de gata"},
    {src:"/images/gallery/image4.jpeg", coord:"37°05′28″N 02°18′08″W", location:"tabernas"},
    {src:"/images/gallery/image5.jpeg", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},
    {src:"/images/gallery/image6.jpeg", coord:"37°05′28″N 02°18′08″W", location:"tabernas"},
    {src:"/images/gallery/image7.jpeg", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},
    {src:"/images/gallery/image8.jpeg", coord:"52°30′16″N 13°16′49″E", location:"icc berlin"},
    {src:"/images/gallery/image9.jpeg", coord:"52°31'12″N 13°24'36″E", location:"berlin"},
    {src:"/images/gallery/image10.jpeg", coord:"52°31'12″N 13°24'36″E", location:"berlin"},
    {src:"/images/gallery/image11.jpeg", coord:"52°31'12″N 13°24'36″E", location:"berlin"},
    {src:"/images/gallery/image12.jpeg", coord:"52°31'12″N 13°24'36″E", location:"berlin"},
  ],
  leak_of_dreams: [
    {src:"/images/gallery/image13.jpeg", coord:"36°31′46″N 05°46′04″W", location:"cadiz"}, 
    {src:"/images/gallery/image14.jpeg", coord:"36°05′17″N 05°47′03″W", location:"duna bolonia"}, 
    {src:"/images/gallery/image15.jpeg", coord:"40°28′40″N 03°41′16″W", location:"madrid"}, 
    {src:"/images/gallery/image16.jpeg", coord:"52°25'59″N 13°38'59″E", location:"müggelsee"}, 
    {src:"/images/gallery/image17.jpeg", coord:"52°28′25″N 13°24′06″E", location:"tempelhof"}, 
    {src:"/images/gallery/image18.jpeg", coord:"52°01′36″N 09°30′50″E", location:"esperde"}, 
    {src:"/images/gallery/image20.jpeg", coord:"52°31'28″N 13°24'38″E", location:"berlin"}, 
    {src:"/images/gallery/image19.jpeg", coord:"52°01′36″N 09°30′50″E", location:"esperde"}, 
    {src:"/images/gallery/image21.jpeg", coord:"43°21′41″N 05°50′52″W", location:"asturias"}, 
    {src:"/images/gallery/image22.jpeg", coord:"35°18′35″N 24°53′36″E", location:"creta"}, 
    {src:"/images/gallery/image23.jpeg", coord:"37°59′12″N 23°50′51″E", location:"glyka nera"}, 
    {src:"/images/gallery/image24.jpeg", coord:"35°18′35″N 24°53′36″E", location:"creta"}, 
    {src:"/images/gallery/image38.jpeg", coord:"52°25'59″N 13°38'59″E", location:"müggelsee"}, 
    
  ],
  costas_de_sol: [
    {src:"/images/gallery/image55.jpeg", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},
    {src:"/images/gallery/image56.jpeg", coord:"36°31′46″N 05°46′04″W", location:"cadiz"},
    {src:"/images/gallery/image57.jpeg", coord:"36°25′00″N 06°09′00″W", location:"chiclana"},
    {src:"/images/gallery/image58.jpeg", coord:"36°25′00″N 06°09′00″W", location:"chiclana"},
    {src:"/images/gallery/image59.jpeg", coord:"36°25′00″N 06°09′00″W", location:"chiclana"},
    {src:"/images/gallery/image60.jpeg", coord:"36°25′00″N 06°09′00″W", location:"chiclana"},
    {src:"/images/gallery/image61.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image68.jpeg", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},
    {src:"/images/gallery/image63.jpeg", coord:"39°37'27″N 19°55'12″E", location:"corfu"},
    {src:"/images/gallery/image64.jpeg", coord:"35°18′35″N 24°53′36″E", location:"creta"},
    {src:"/images/gallery/image65.jpeg", coord:"35°18′35″N 24°53′36″E", location:"creta"},
    {src:"/images/gallery/image66.jpeg", coord:"35°18′35″N 24°53′36″E", location:"creta"},
    {src:"/images/gallery/image67.jpeg", coord:"38°32′03″N 00°07′53″W", location:"benidorm"},

  ],
  johnny_de_noche: [
    {src:"/images/gallery/image37.jpeg", coord:"52°31'12″N 13º24'36 E", location:"berlin-mitte"},
    {src:"/images/gallery/image39.jpeg", coord:"52°30′16″N 13°16′49″E", location:"budapest"},
    {src:"/images/gallery/image40.jpeg", coord:"52°30′16″N 13°16′49″E", location:"berlin-mitte"},
    {src:"/images/gallery/image41.jpeg", coord:"52°30′16″N 13°16′49″E", location:"berlin-mitte"},
    {src:"/images/gallery/image42.jpeg", coord:"52°30′16″N 13°16′49″E", location:"berlin-mitte"},
    {src:"/images/gallery/image43.jpeg", coord:"52°30′16″N 13°16′49″E", location:"berlin-mitte"},
    {src:"/images/gallery/image44.jpeg", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image45.jpeg", coord:"52°29'08″N 13°22'60″E", location:"berlin-kreuzberg"},
    {src:"/images/gallery/image46.jpeg", coord:"52°30′16″N 13°16′49″E", location:"berlin-mitte"},
    {src:"/images/gallery/image47.jpeg", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image48.jpeg", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image49.jpeg", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image50.jpeg", coord:"35°18′35″N 24°53′36″E", location:"madrid"},
    {src:"/images/gallery/image51.jpeg", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image52.jpeg", coord:"52°30′16″N 13°16′49″E", location:"icc-berlin"},
    {src:"/images/gallery/image53.jpeg", coord:"52°30′16″N 13°16′49″E", location:"porto"},
    {src:"/images/gallery/image54.jpeg", coord:"52°30′16″N 13°16′49″E", location:"berlin-mitte"},
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
