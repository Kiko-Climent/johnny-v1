'use client';

import styles from "@/styles/slider.module.css";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const Slider2 = ({ images }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);
  const currentTop = useRef(0);

  useEffect(() => {
    const sliderEl = sliderRef.current;
    const slides = sliderEl.querySelectorAll(`.${styles.slide}`);
    const prefix = sliderEl.querySelector(`.${styles.prefix}`);
    const names = sliderEl.querySelector(`.${styles.names}`);
    const years = sliderEl.querySelector(`.${styles.years}`);

    const elements = [
      { el: prefix, delay: 0 },
      { el: names, delay: 0.15 },
      { el: years, delay: 0.3 }
    ];

    slides.forEach((slide, idx) => {
      if (idx !== 0) {
        const img = slide.querySelector("img");
        gsap.set(img, { scale: 2, top: "4em" });
      }
    });

    const showSlide = (index) => {
      setIsAnimating(true);
      const slide = slides[index];
      const img = slide.querySelector("img");
      currentTop.current -= 30;

      elements.forEach(({ el, delay }) => {
        gsap.to(el, {
          y: `${currentTop.current}px`,
          duration: 2,
          ease: "power4.inOut",
          delay
        });
      });

      gsap.to(img, {
        scale: 1,
        top: "0%",
        duration: 2,
        ease: "power3.inOut"
      });

      gsap.to(slide, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => setIsAnimating(false)
      });

      setCurrentSlideIndex(index);
    };

    const hideSlide = (index) => {
      setIsAnimating(true);
      const slide = slides[index];
      const img = slide.querySelector("img");
      currentTop.current -= 30;

      elements.forEach(({ el, delay }) => {
        gsap.to(el, {
          y: `${currentTop.current}px`,
          duration: 2,
          ease: "power4.inOut",
          delay
        });
      });

      gsap.to(img, {
        scale: 2,
        top: "4em",
        duration: 2,
        ease: "power3.inOut"
      });

      gsap.to(slide, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power4.inOut",
        onComplete: () => setIsAnimating(false)
      });

      setCurrentSlideIndex(index - 1);
    };

    const handleScroll = (e) => {
      if (isAnimating) return;
      if (e.deltaY > 0 && currentSlideIndex < slides.length - 1) {
        showSlide(currentSlideIndex + 1);
      } else if (e.deltaY < 0 && currentSlideIndex > 0) {
        hideSlide(currentSlideIndex);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [currentSlideIndex, isAnimating]);

  return (
    <div ref={sliderRef} className="w-screen h-screen">
      <div className={styles.sliderContent}>
        <div className={styles.slideNumber}>
          <div className={styles.prefix}>
            {[1, 2, 3, 4, 5].map(num => (<div key={num}>{num}</div>))}
          </div>
          <div className={styles.postfix}><span>/</span> 5</div>
        </div>

        <div className={styles.slideName}>
          <div className={styles.names}>
            {["35°18′67″N 11°73′89″E", "19°28′23″N 24°33′75″W", "75°78′33″N 57°50′37″E", "55°88′75″N 14°58′53″W", "22°10′45″N 88°23′36″E"].map((name, i) => (
              <div key={i}>{name}</div>
            ))}
          </div>
        </div>

        <div className={styles.slideYear}>
          <div className={styles.years}>
            {[2021, 2022, 2023, 2024, 2025].map(year => (<div key={year}>{year}</div>))}
          </div>
        </div>
      </div>

      <div className={styles.slider}>
        {images.map((img, i) => (
          <div className={styles.slide} key={i}>
            <Image
              src={img}
              alt={`slide-${i}`}
              width={1920}
              height={1080}
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
        <div className="h-[400vh]"></div>
      </div>
    </div>
  );
};

export default Slider2;
