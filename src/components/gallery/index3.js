"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/pagination";

const Slider3 = ({ images }) => {
  const [visibleSlides, setVisibleSlides] = useState({}); // Para controlar qué slides están "centrados"

  const handleProgress = (swiper) => {
    const newVisibility = {};
    swiper.slides.forEach((slide, index) => {
      const progress = slide.progress;
      newVisibility[index] = Math.abs(progress) < 0.05;
    });
    setVisibleSlides(newVisibility);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-6">
      <div className="relative w-full px-6 h-[calc(100vh-250px)] aspect-[5/8] overflow-hidden">
        <Swiper
          pagination={{
            type: "fraction",
            el: ".custom-pagination",
          }}
          modules={[Pagination]}
          onProgress={handleProgress}
          spaceBetween={30}
          watchSlidesProgress
          className="h-full w-full"
        >
          {images.map((src, index) => {
            const isVisible = visibleSlides[index];
            return (
              <SwiperSlide key={index}>
                <SlideImage
                  src={typeof src === "string" ? src : src.src}
                  isVisible={isVisible}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex custom-pagination text-black text-3xl text-center justify-center items-center" />
    </div>
  );
};

// SlideImage se encarga de gestionar la transición con delay al entrar
const SlideImage = ({ src, isVisible }) => {
  const [applyEffects, setApplyEffects] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setApplyEffects(false); // Quita efectos con delay
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setApplyEffects(true); // Siempre aplica efectos si NO está visible
    }
  }, [isVisible]);

  return (
    <div className="flex items-center justify-center h-full w-full relative bg-white">
      <Image
        src={src}
        alt="gallery"
        fill
        className={`object-contain transition-all duration-500 ease-in-out
          ${applyEffects ? "invert opacity-20" : ""}
        `}
      />
    </div>
  );
};

export default Slider3;
