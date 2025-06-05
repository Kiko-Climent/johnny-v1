"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutModal({isOpen, onClose}) {

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
      {/* FONDO CON BLUR */}
      {/* <div
        className="absolute inset-0"
        onClick={onClose}
      /> */}
      {/* Modal principal */}
      <div
        ref={modalRef}
        className="absolute flex flex-col top-1/2 left-1/2 z-50 w-full md:w-[60vw] -translate-x-1/2 -translate-y-1/2 
                   bg-white/75 backdrop-blur-sm text-black px-24 py-16 gap-5"
      >
        {/* Header del modal con título y botón de cerrar */}
        <div className="flex flex-col -space-y-1">
        <h2 className="flex text-xl uppercase">About</h2>
    
        <p className="leading-tight text-xl flex leading-5">
          In the last few years, Johnny Carretes has been exploring life accompanied by a 35mm camera.
          His journey with analog photography began innocently, playing with disposable cameras during summer vacations.<br /><br />
         Captivated by the analog feel, the magic and uncertainty inherent in format, his photography attempts to combine beauty, nostalgia and authenticity.
        </p>
        </div>
        <div className="flex flex-col -space-y-2">
        <h2 className="text-xl uppercase flex">REQUESTS</h2>
        <p className="leading-none text-xl flex">
        johnny.carretes@gmail.com
        </p>
        </div>
      </div>
    </div>
  );
}