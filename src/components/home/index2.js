"use client";

import { useState, useRef } from "react";
import { EffectCube, EffectFade, EffectCreative } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import 'swiper/css/effect-cube';
import 'swiper/css/effect-creative';

const images = [
  "/images/image00014.jpeg",
  "/images/image00027.jpeg",
  "/images/image00001.jpeg",
  "/images/image00041.jpeg",
  "/images/image00038.jpeg",
];

const HomePage2 = () => {
  const swiperBgRef = useRef(null);
  const swiperCenterRef = useRef(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(1); // Empieza en 2da imagen
  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);

  const handleClick = () => {
    const nextBgIndex = (currentBgIndex + 1) % images.length;
    const nextCenterIndex = (currentCenterIndex + 1) % images.length;

    setCurrentBgIndex(nextBgIndex);
    setCurrentCenterIndex(nextCenterIndex);
    
    if (swiperBgRef.current) swiperBgRef.current.slideTo(nextBgIndex);
    if (swiperCenterRef.current) swiperCenterRef.current.slideTo(nextCenterIndex);
  };

  return (
    <section className="w-full h-full flex justify-center items-center relative" onClick={handleClick}>

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
        initialSlide={1} // Empieza en la segunda imagen
        className="absolute inset-0 w-full h-full"
        allowTouchMove={false}
        onSwiper={(swiper) => (swiperBgRef.current = swiper)}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
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
          className="w-full h-full"
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperCenterRef.current = swiper)}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full flex justify-center items-center">
                <Image
                  src={img}
                  className="object-contain absolute inset-0 transition-opacity duration-500"
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
    </section>
  );
};

export default HomePage2;
