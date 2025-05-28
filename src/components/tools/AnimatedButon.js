"use client";

import { useEffect, useRef } from "react";

const AnimatedButton = ({ onClick, text, className = "" }) => {
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const innerText = String(text);
    element.innerHTML = "";

    const textContainer = document.createElement("div");
    textContainer.classList.add("block");

    for (let letter of innerText) {
      const span = document.createElement("span");
      span.innerText = letter.trim() === "" ? "\xa0" : letter;
      span.classList.add("letter");
      textContainer.appendChild(span);
    }

    element.appendChild(textContainer);
    element.appendChild(textContainer.cloneNode(true));

    const handleMouseOver = () => {
      element.classList.remove("play");
    };

    element.addEventListener("mouseover", handleMouseOver);
    return () => {
      element.removeEventListener("mouseover", handleMouseOver);
    };
  }, [text]);

  return (
    <button onClick={onClick} className="-mb-2">
      <div ref={elementRef} className={`text cursor-pointer ${className}`} />
    </button>
  );
};

export default AnimatedButton;
