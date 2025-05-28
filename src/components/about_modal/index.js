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
        className="absolute top-1/2 left-1/2 z-50 w-[80vw] max-w-xl -translate-x-1/2 -translate-y-1/2 
                   bg-white/75 backdrop-blur-sm text-black p-16 -space-y-0"
      >
        {/* Header del modal con título y botón de cerrar */}
        <div className="flex justify-between">
          <h2 className="text-lg uppercase">About</h2>
        </div>

        <p className="leading-tight text-base">
          In the last few years, Johnny Carretes has been exploring life accompanied by a 35mm camera.
          His journey with analog photography began innocently, playing with disposable cameras during summer vacations.
          Captivated by the analog feel, the magic and uncertainty inherent in format, his photography attempts to combine beauty, nostalgia and authenticity.
        </p>
        <br />
        <h2 className="text-lg uppercase">REQUESTS</h2>
        <p className="leading-none text-base">
        johnny.carretes@gmail.com
        </p>
      </div>
    </div>
  );
}