"use client";

import { useEffect, useRef } from "react";

const AnimatedText = ({ text = "", hoverText = "", className = "" }) => {
  const elementRef = useRef();

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

    const handleMouseOver = () => {
      element.classList.remove("play");
    };

    element.addEventListener("mouseover", handleMouseOver);
    return () => {
      element.removeEventListener("mouseover", handleMouseOver);
    };
  }, [text, hoverText]);

  return <div ref={elementRef} className={`text cursor-pointer ${className}`} />;
};

export default AnimatedText;
