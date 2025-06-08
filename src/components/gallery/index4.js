"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { useState, useRef } from "react";
import AnimatedText from "../tools/AnimatedText";

import "swiper/css"
import "swiper/css/pagination"



const Slider4 = ({images, id}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const formatTitle = (id) => {
    return typeof id === "string" ? id.replace(/_/g, " ") : "";
  };
  const swiperRef = useRef(null);

  const handleClick = (e) => {
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;

    if (!swiperRef.current) return;

    if (clickX > screenWidth / 2) {
      // Click en la derecha: siguiente slide
      swiperRef.current.slideNext();
    } else {
      // Click en la izquierda: slide anterior
      swiperRef.current.slidePrev();
    }
  };


  if (!images || images.length === 0) return null;

  return(
    <div onClick={handleClick} className="flex flex-col justify-center items-center w-full h-screen overflow-hidden">
    <div className="flex flex-col items-center justify-center h-full w-full px-3 gap-4">
    
      {/* Imagen */}
      <div className="flex items-center justify-center w-full flex-grow relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={{
            type: "fraction",
            el: ".custom-pagination"
          }}
          modules={[Pagination]}
          spaceBetween={60}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center w-full h-full relative">
                <Image
                  src={typeof src === "string" ? src : src.src}
                  alt="gallery"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Texto debajo */}
      <div className="flex flex-col items-center text-center -space-y-1 whitespace-nowrap">
        <div className="flex flex-row gap-x-1 text-lg uppercase">
          <div>{formatTitle(id)}</div>
          <div className="custom-pagination text-black" />
        </div>
        <div>
          <AnimatedText
            text={images[activeIndex].coord}
            hoverText={images[activeIndex].location}
            className="text-lg"
          />
        </div>
      </div>

  </div>
</div>


  )
}

export default Slider4;