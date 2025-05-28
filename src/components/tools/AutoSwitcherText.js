// src/tools/AutoSwitcherText.jsx
"use client";

import { useEffect, useRef } from "react";

export default function AutoSwitcherText({
  texts = ["johnny carretes", "analog photography", "johnny carretes"],
  delay = 1200,
  className = ""
}) {
  const el = useRef();
  const phase = useRef(0);

  // Construye un bloque .auto-block con spans .auto-letter
  const makeBlock = (str) => {
    const block = document.createElement("div");
    block.classList.add("auto-block");
    for (let ch of str) {
      const span = document.createElement("span");
      span.classList.add("auto-letter");
      span.innerText = ch === " " ? "\xa0" : ch;
      block.appendChild(span);
    }
    return block;
  };

  useEffect(() => {
    const container = el.current;
    if (!container || texts.length < 2) return;

    let timer;
    const play = () => {
      const i = phase.current;
      const from = texts[i];
      const to   = texts[(i + 1) % texts.length];

      container.innerHTML = "";
      container.appendChild(makeBlock(from));
      container.appendChild(makeBlock(to));

      // dispara la animación
      container.classList.add("play");
      requestAnimationFrame(() => {
        container.classList.remove("play");
      });

      phase.current = (i + 1) % texts.length;
      timer = setTimeout(play, delay);
    };

    play();
    return () => clearTimeout(timer);
  }, [texts, delay]);

  return (
    <div
      ref={el}
      className={`auto-text play ${className}`}
    />
  );
}
