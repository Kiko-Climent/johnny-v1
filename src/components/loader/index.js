"use client";

import { useEffect, useRef } from "react";

const titles = {
  title1: "johnny carretes",
  title2: "analog photography",
};

const animateText = (element, text) => {
  if (!element) return;

  element.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("block");

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.innerText = text[i] === " " ? "\u00A0" : text[i];
    span.classList.add("letter");
    container.appendChild(span);
  }

  element.appendChild(container);
  element.appendChild(container.cloneNode(true));
};

const Splash = () => {
  const textRef = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    const el1 = textRef.current;
    const el2 = textRef2.current;
    if (!el1 || !el2) return;

    // Inicializamos ambos
    animateText(el1, titles.title1);
    animateText(el2, titles.title2);

    // Animación para el primero
    setTimeout(() => el1.classList.add("play"), 500);
    setTimeout(() => el1.classList.remove("play"), 2500);
    setTimeout(() => el1.classList.add("play"), 4000);

    // Animación para el segundo
    setTimeout(() => el2.classList.add("play"), 500);
    setTimeout(() => el2.classList.remove("play"), 2500);
    setTimeout(() => el2.classList.add("play"), 4000);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center uppercase -space-y-0">
      <div className="flex text-2xl">
        <div ref={textRef} className="text" />
      </div>
      <div className="flex text-xl">
        <div ref={textRef2} className="text" />
      </div>
    </div>
  );
};

export default Splash;
