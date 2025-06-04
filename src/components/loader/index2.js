"use client";

import { useEffect, useRef } from "react";

const titles = {
  title1: "johnny carretes",
  title2: "analog photography",
};

const createBlock = (text) => {
  const block = document.createElement("div");
  block.classList.add("block2");

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.innerText = text[i] === " " ? "\u00A0" : text[i];
    span.classList.add("letter");
    span.style.transitionDelay = `${i * 0.03}s`;
    block.appendChild(span);
  }

  return block;
};

const animateText = (element, text1, text2) => {
  if (!element) return;

  element.innerHTML = "";
  const block1 = createBlock(text1);
  const block2 = createBlock(text1);
  const block3 = createBlock(text1);

  element.appendChild(block1);
  element.appendChild(block2);
  element.appendChild(block3);
};

const animateEmptyToTitle = (element, finalText) => {
  
  if (!element) return;

  element.innerHTML = "";

  const block1 = createBlock(finalText); // primer bloque vacío
  const block2 = createBlock(finalText); // segundo también vacío
  const block3 = createBlock(finalText); // final: "analog photography"

  element.appendChild(block1);
  element.appendChild(block2);
  element.appendChild(block3);
};

const Splash2 = () => {
  const textRef = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    const el2 = textRef2.current;
    if (!el || !el2) return;

    // Animación del primer div
    animateText(el, titles.title1, titles.title2);
    setTimeout(() => el.classList.add("play"), 500);    // title1 → title2
    setTimeout(() => el.classList.remove("play"), 1500); // title2 → title1

    // Animación del segundo div
    animateEmptyToTitle(el2, titles.title2);
    setTimeout(() => el2.classList.remove("play-2"), 500);   // justo cuando el primero vuelve a title1
    setTimeout(() => el2.classList.add("play-2"), 1500);   // justo cuando el primero vuelve a title1
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center uppercase -space-y-1">
      <div className="flex text-xl">
        <div ref={textRef} className="text" />
      </div>
      <div className="flex text-xl">
        <div ref={textRef2} className="text" />
      </div>
    </div>
  );
};

export default Splash2;
