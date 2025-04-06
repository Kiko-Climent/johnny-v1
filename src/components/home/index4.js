"use client";

import { useState, useRef } from "react";
import { EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { motion } from "framer-motion";
import "swiper/css";
import 'swiper/css/effect-creative';

const images = [
  { src: "/images/image00014.jpeg", coordinates: "40.7128° N, 74.0060° W" }, 
  { src: "/images/image00027.jpeg", coordinates: "48.8566° N, 2.3522° E" }, 
  { src: "/images/image00001.jpeg", coordinates: "51.5074° N, 0.1278° W" }, 
  { src: "/images/image00041.jpeg", coordinates: "35.6895° N, 139.6917° E" }, 
  { src: "/images/image00038.jpeg", coordinates: "34.0522° N, 118.2437° W" },
  { src: "/images/image00028.jpeg", coordinates: "34.0522° N, 118.2437° W" },
  { src: "/images/image00025.jpeg", coordinates: "34.0522° N, 118.2437° W" },
];

const HomePage4 = () => {
  const swiperBgRef = useRef(null);
  const swiperCenterRef = useRef(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(1); // Empieza en 2da imagen
  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);
  const [currentCoordinates, setCurrentCoordinates] = useState(images[0].coordinates);
  const [showCoordinates, setShowCoordinates] = useState(false);

  const handleClick = () => {
    const nextBgIndex = (currentBgIndex + 1) % images.length;
    const nextCenterIndex = (currentCenterIndex + 1) % images.length;

    // Ocultamos coordenadas antes de cambiar imagen
    setShowCoordinates(false);

    setTimeout(() => {
      setCurrentCenterIndex(nextCenterIndex);
      if (swiperCenterRef.current) swiperCenterRef.current.slideTo(nextCenterIndex);

      setTimeout(() => {
        setShowCoordinates(true); // Mostramos coordenadas después del cambio
      }, 300);
    }, 100);

    setTimeout(() => {
      setCurrentBgIndex(nextBgIndex);
      if (swiperBgRef.current) swiperBgRef.current.slideTo(nextBgIndex);
    }, 600);
  };

  return (
    <section className="w-full h-full flex justify-center items-center relative" onClick={handleClick}>

      <Swiper
        effect={'creative'}
        spaceBetween={200}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        modules={[EffectCreative]}
        loop
        initialSlide={1} // Empieza en la segunda imagen
        className="absolute inset-0 w-full h-full"
        allowTouchMove={false}
        onSwiper={(swiper) => (swiperBgRef.current = swiper)}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img.src})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute w-9/12 h-5/6 flex justify-center items-center">
        <Swiper
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -800],
              rotate: [180, 0, 0],
            },
            next: {
              shadow: true,
              translate: [0, 0, -800],
              rotate: [-180, 0, 0],
            },
          }}
          modules={[EffectCreative]}
          loop
          initialSlide={0} // Empieza en la primera imagen
          className="w-full h-full rotate-180"
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperCenterRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentCoordinates(images[swiper.realIndex].coordinates)}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full flex justify-center items-center rotate-180">
                <Image
                  src={img.src}
                  className="object-contain absolute inset-0 transition-opacity duration-700"
                  alt="Slider central"
                  sizes="(max-width: 768px) 100vw, 700px"
                  priority
                  fill
                  style={{
                    zIndex: i === currentCenterIndex ? 10 : 0,
                    opacity: i === currentCenterIndex ? 1 : 0,
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: showCoordinates ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut", staggerDirection: "right" }}
        className="absolute font-bold opacity-90 text-xs text-gray-300 mix-blend-difference z-20">
          {currentCoordinates}
      </motion.div>
    </section>
  );
};

export default HomePage4;
