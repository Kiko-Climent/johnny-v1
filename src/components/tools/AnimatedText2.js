"use client";

import { useEffect, useRef } from "react";

const AnimatedText2 = ({ text = "", hoverText = "", className = "", resetTrigger }) => {
  const elementRef = useRef();
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const resetToDefault = () => {
    const element = elementRef.current;
    if (!element) return;
    element.classList.remove("play");
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.innerHTML = "";

    const createBlock = (content) => {
      const block = document.createElement("div");
      block.classList.add("block");

      for (let letter of content) {
        const span = document.createElement("span");
        span.innerText = letter.trim() === "" ? "\xa0" : letter;
        span.classList.add("letter");
        block.appendChild(span);
      }
      return block;
    };

    const defaultBlock = createBlock(text);
    const hoverBlock = createBlock(hoverText);

    element.appendChild(defaultBlock);
    element.appendChild(hoverBlock);

    // 🔁 Intervalo automático cada 3 segundos
    intervalRef.current = setInterval(() => {
      element.classList.add("play");

      // ⏱️ Quitamos la clase .play después de 3 segundos
      timeoutRef.current = setTimeout(() => {
        element.classList.remove("play");
      }, 1800);
    }, 3600); // Espera total de 6s (3s on + 3s off)

    // 🎯 Hover manual: también activa el efecto
    const handleMouseOver = () => {
      element.classList.add("play");
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        element.classList.remove("play");
      }, 3000);
    };

    element.addEventListener("mouseover", handleMouseOver);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      element.removeEventListener("mouseover", handleMouseOver);
    };
  }, [text, hoverText]);

  useEffect(() => {
    resetToDefault();
  }, [resetTrigger]);

  return <div ref={elementRef} className={`text cursor-pointer ${className}`} />;
};

export default AnimatedText2;
