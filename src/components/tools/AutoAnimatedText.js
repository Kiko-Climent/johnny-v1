// src/tools/AutoAnimatedText.jsx
"use client";

import { useEffect, useRef } from "react";

const AutoAnimatedText = ({
  text = "",
  className = "",
  onComplete = () => {},
}) => {
  const containerRef = useRef();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // limpia y genera cada letra en un span
    el.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
      const letter = text[i];
      const span = document.createElement("span");
      span.innerText = letter === " " ? "\xa0" : letter;
      span.className = "letter-splash";       // estilo base
      span.style.animationDelay = `${i * 0.05}s`;

      // forzar reflow antes de añadir la clase .animate
      void span.offsetWidth;
      span.classList.add("animate");          // dispara la animación

      el.appendChild(span);
    }

    // calcula duración total (delay por letra + duración de la animación)
    const totalDuration = text.length * 0.05 + 0.4; // 0.4s = duración del keyframe
    const timeout = setTimeout(onComplete, totalDuration * 1000);

    return () => clearTimeout(timeout);
  }, [text, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`text-center overflow-hidden ${className}`}
    />
  );
};

export default AutoAnimatedText;
