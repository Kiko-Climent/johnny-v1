'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const sliderContentList = [
  "35°18'35″N 24°53'36″E",
  "43°21'09″N 19°73'77″W",
  "35°18'35″N 24°53'36″E",
  "61°10'45″N 71°93'65″E",
  "35°18'35″N 24°53'36″E",
  "43°21'09″N 19°73'77″W",
  "61°10'45″N 71°93'65″E",
  "43°21'09″N 19°73'77″W",
  "61°10'45″N 71°93'65″E",
  "43°21'09″N 19°73'77″W",
];

const sliderImages = [
  "image1.jpeg",
  "image2.jpeg",
  "image3.jpeg",
  "image4.jpeg",
  "image5.jpeg",
  "image6.jpeg",
  "image7.jpeg",
  "image8.jpeg",
  "image9.jpeg",
  "image10.jpeg",
];

const HomeSlider2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(2);
  const [currentContentIndex, setCurrentContentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const sliderRef = useRef(null);
  const contentRef = useRef(null);

  const splitTextIntoSpans = (element) => {
    if (!element) return;
    const text = element.innerText;
    const html = text
      .split("")
      .map(char => `<span style="display: inline-block; position: relative;">${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
      .join("");
    element.innerHTML = html;
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const currentSlide = sliderRef.current.querySelector(".slide-active img");
    const activeTitle = contentRef.current.querySelector(".slider-content-active h1");

    splitTextIntoSpans(activeTitle);

    // Animar imagen actual
    gsap.to(currentSlide, {
      scale: 2,
      duration: 2,
      ease: "power3.out",
    });

    // Animar texto saliente
    const activeSpans = contentRef.current.querySelectorAll(".slider-content-active h1 span");
    gsap.to(activeSpans, {
      top: "-175px",
      stagger: 0.05,
      ease: "power3.out",
      duration: 0.5,
      onComplete: () => {
        gsap.to(".slider-content-active", {
          top: "-175px",
          duration: 0.25,
          ease: "power3.out",
        });
      },
    });

    // Crear nuevo texto
    const nextContentText = sliderContentList[(currentContentIndex + 1) % sliderContentList.length];
    const newContentDiv = document.createElement('div');
    newContentDiv.className = "slide-content-next absolute top-[200px]";
    newContentDiv.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
    newContentDiv.innerHTML = `<h1 class="text-3xl text-white">${nextContentText}</h1>`;
    contentRef.current.appendChild(newContentDiv);

    const nextTitle = newContentDiv.querySelector("h1");
    splitTextIntoSpans(nextTitle);
    const nextSpans = nextTitle.querySelectorAll("span");
    gsap.set(nextSpans, { top: "200px" });

    // Animar entrada de texto
    gsap.to(newContentDiv, {
      top: "0px",
      duration: 1.125,
      ease: "power3.out",
      onComplete: () => {
        contentRef.current.querySelector(".slider-content-active")?.remove();
        newContentDiv.classList.remove("slide-content-next");
        newContentDiv.classList.add("slider-content-active");

        gsap.to(nextSpans, {
          top: 0,
          stagger: 0.05,
          ease: "power3.out",
          duration: 0.5,
        });

        setCurrentContentIndex((prev) => (prev + 1) % sliderContentList.length);
      },
    });

    // Nueva imagen
    // Crear nuevo slide
    const newIndex = currentImageIndex + 1;
    const newSlide = document.createElement("div");
    newSlide.className = "slide-next absolute w-full h-full flex justify-center items-center";
    newSlide.innerHTML = `
      <div class="slide-next-img w-[250px] h-[350px]" 
      style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)">
        <img src="/assets/${sliderImages[newIndex % sliderImages.length]}" class="w-full h-full object-cover"/>
      </div>`;
    sliderRef.current.appendChild(newSlide);

    const newSlideImg = newSlide.querySelector(".slide-next-img"); // 👈 referenciar correctamente

    // Clip path reveal
    gsap.to(newSlideImg, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.5,
      ease: "power3.out",
    });

    // Expand
    gsap.to(newSlideImg, {
      width: "100vw",
      height: "100vh",
      duration: 1.3,
      delay: 0.0,
      ease: "power3.out",
      onComplete: () => {
        sliderRef.current.querySelector(".slide-active")?.remove();
        newSlide.classList.remove("slide-next");
        newSlide.classList.add("slide-active");

        newSlideImg?.classList.remove("slide-next-img");
        newSlideImg?.classList.add("slide-expanded-img");

        setCurrentImageIndex(newIndex % sliderImages.length);

        // Añadir nuevo slide-mini siguiente
        const upcomingIndex = (newIndex + 1) % sliderImages.length;
        const newMiniSlide = document.createElement("div");
        newMiniSlide.className = "slide-next absolute w-full h-full flex justify-center items-center";
        newMiniSlide.innerHTML = `
          <div class="slide-next-img max-h-[50vh] aspect-[4/5]" 
          style="clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)">
            <img src="/assets/${sliderImages[upcomingIndex]}" class="w-full h-full object-cover"/>
          </div>`;
        sliderRef.current.appendChild(newMiniSlide);

        const miniImg = newMiniSlide.querySelector(".slide-next-img"); // 👈 evitar conflictos también aquí
        gsap.to(miniImg, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power3.out",
        });

        setTimeout(() => setIsAnimating(false), 500);
      },
    });
  };

  // Primer efecto inicial
  useEffect(() => {
    gsap.to(".slide-next-img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.5,
      ease: "power3.out",
      delay: 1,
    });
  }, []);

  return (
    <div className="w-screen h-screen" onClick={handleClick}>
      <div
        className="slider absolute top-0 left-0 w-screen h-screen overflow-hidden"
        ref={sliderRef}
      >
        <div className="slide-active absolute w-full h-full">
          <img
            src={`/assets/${sliderImages[currentImageIndex % sliderImages.length]}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="slide-next absolute w-full h-full flex justify-center items-center">
          <div
            className="slide-next-img max-h-[50vh] aspect-[4/5]"
            style={{
              clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
            }}
          >
            <img
              src={`/assets/${sliderImages[(currentImageIndex + 1) % sliderImages.length]}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div
        className="slider-content absolute left-2 bottom-0 w-full h-[175px] overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
        ref={contentRef}
      >
        <div
          className="slider-content-active absolute top-0 left-0"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <h1 className="text-3xl text-white">johnny carretes</h1>
        </div>
        <div
          className="slider-content-next absolute top-[200px]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <h1 className="text-3xl text-white">analog photography</h1>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider2;
