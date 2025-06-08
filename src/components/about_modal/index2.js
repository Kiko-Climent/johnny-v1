"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutModal2({isOpen, onClose}) {

  const modalRef = useRef();

  useEffect(() => {
    let moveModal;

    if (isOpen && modalRef.current) {
      // Animación inicial de entrada
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // Función para seguir el ratón
      moveModal = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        gsap.to(modalRef.current, {
          x: x - window.innerWidth / 2,
          y: y - window.innerHeight / 2,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", moveModal);
    }

    // Limpiar el event listener al cerrar
    return () => {
      window.removeEventListener("mousemove", moveModal);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40"
        onClick={onClose}
    >
      <div
        ref={modalRef}
        className="absolute flex flex-col top-1/2 text-xl text-justify left-1/2 z-50 w-[95vw] md:w-[60vw] -translate-x-1/2 -translate-y-1/2 
                   bg-white/90 backdrop-blur-sm text-black px-12 md:px-24 py-8 md:py-16 gap-2 md:gap-4"
      >
        <div className="flex flex-col">
          <p className="flex leading-none">
            In the last few years, Johnny Carretes has been exploring life accompanied by a 35mm camera.
            His journey with analog photography began innocently, playing with disposable cameras during summer vacations.
          </p>
          <p className="flex leading-none pt-2">
            Captivated by the analog feel, the magic and uncertainty inherent in format, his photography attempts to combine beauty, nostalgia and authenticity.
          </p>
        </div>
        <div className="flex flex-col -space-y-2">
          <h2 className="uppercase flex">REQUESTS</h2>
          <p className="flex">
          johnny.carretes@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}