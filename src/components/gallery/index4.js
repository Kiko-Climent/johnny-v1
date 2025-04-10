"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css"
import "swiper/css/pagination"



const Slider4 = ({images}) => {


  if (!images || images.length === 0) return null;

  return(
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-6">
      <div className="relative w-full px-6 h-[calc(100vh-250px)] aspect-[5/8] overflow-hidden">
        <Swiper
          pagination={{
            type: "fraction",
            el: ".custom-pagination"
          }}
          modules={[Pagination]}
          className="h-full w-full" 
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-full w-full relative">
                <Image 
                src={typeof src === "string" ? src : src.src}
                alt="gallery"
                fill
                className="object-contain"/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex custom-pagination text-black text-3xl text-center justify-center items-center" />
    </div>
  )
}

export default Slider4;