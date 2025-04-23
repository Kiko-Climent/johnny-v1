"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { useRef } from "react";

import "swiper/css"
import "swiper/css/pagination"



const Slider4 = ({images, id}) => {
  const formatTitle = (id) => id.replace(/_/g, " ");
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
    <div className="w-full min-h-screen flex flex-col">
      <div onClick={handleClick}
        className="flex flex-col justify-between items-center relative w-full h-[calc(100vh-75px)] gap-4 aspect-[5/8] overflow-hidden">
        <div className="flex grow h-full w-full px-3">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            pagination={{
              type: "fraction",
              el: ".custom-pagination"
            }}
            modules={[Pagination]}
            spaceBetween={40}
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
        <div className="flex flex-col px-3 text-center justify-center items-center">
          <div className="flex flex-row gap-x-1 text-xl">
            <div className="flex whitespace-nowrap">{formatTitle(id)}</div>
            <div className="flex custom-pagination text-black" />
            </div>
          <div className="flex">35°18′35″N 24°53′36″E</div>

        </div>
      </div>
      {/* <div className="flex custom-pagination text-black text-3xl text-center justify-center items-center" /> */}
    </div>
  )
}

export default Slider4;