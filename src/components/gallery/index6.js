"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import AnimatedText2 from "../tools/AnimatedText2";

const formatTitle = (id) => {
  return typeof id === "string" ? id.replace(/_/g, " ") : "";
};

const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const checkIsDesktop = (setIsDesktop) => {
  setIsDesktop(window.innerWidth >= 738);
};


const Slider6 = ({images, id}) => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorDirection, setCursorDirection] = useState("right");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const swiperRef = useRef(null);

  // Set --vh custom property
  useEffect(() => {
    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);
  
  useEffect(() => {
    checkIsDesktop(setIsDesktop);
    const handler = () => checkIsDesktop(setIsDesktop);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  

  const handleClick = (e) => {
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;

    if (!swiperRef.current) return;

    if (clickX > screenWidth / 2) {
      swiperRef.current.slideNext();
    } else {
      swiperRef.current.slidePrev();
    }
  };

  const handleMouseMove = (e) => {
    const screenWidth = window.innerWidth;
    setCursorDirection(e.clientX > screenWidth / 2 ? "right" : "left");
    setCursorPos({x: e.clientX, y: e.clientY});
  }

  if (!images || images.length === 0) return null;

  return(
    <div
      onClick={handleClick}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      className="flex flex-col justify-center items-center w-full overflow-hidden gap-0 md:gap-2 pb-2"
      style={{ 
        height: "calc(var(--vh, 1vh) * 100)",
        cursor: isDesktop ? "none" : "default"
       }}
    >
      {isDesktop && (
        <div
          className="pointer-events-none fixed z-50 text-2xl text-black transition-transform duration-75"
          style={{
            top: cursorPos.y,
            left: cursorPos.x,
            transform: "translate(-50%, -50%)",
          }}
        >
          {cursorDirection === "right" ? "→" : "←"}
        </div>
      )}
      
      <div className="flex w-full grow relative px-2">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          pagination={{
            type: "fraction",
            el: ".custom-pagination",
          }}
          modules={[Pagination]}
          spaceBetween={60}
          className="w-full h-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="flex w-full h-full relative">
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
      <div
        className="flex flex-col items-center text-center -space-y-1 whitespace-nowrap"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex flex-row gap-x-1 text-lg uppercase">
          <div>{formatTitle(id)}</div>
          <div className="custom-pagination text-black" />
        </div>
        <div>
          <AnimatedText2
            text={images[activeIndex].coord}
            hoverText={images[activeIndex].location}
            resetTrigger={activeIndex}
            className="text-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Slider6;