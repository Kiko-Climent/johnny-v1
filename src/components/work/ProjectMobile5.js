"use client";

import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function ProjectMobile5({ project, selectedId, setSelectedId }) {
  const router = useRouter();
  const { title1, title2, title3, id, src, mobileLayout } = project;
  const isSelected = selectedId === id;
  const hasNavigatedRef = useRef(false);

  const handleClick = () => {
    if (!isSelected) {
      setSelectedId(id); // Selecciona el proyecto y cambia estilos/título
    }

    // Prevenir múltiples redirecciones
    if (!hasNavigatedRef.current) {
      hasNavigatedRef.current = true;

      // Espera un poco para mostrar la imagen antes de redirigir
      setTimeout(() => {
        router.push(`/work/${id}`);
      }, 1300); // <- Cambia el delay si necesitas más tiempo de visualización
    }
  };

  useEffect(() => {
    // Reset ref si cambia de selección
    if (!isSelected) {
      hasNavigatedRef.current = false;
    }
  }, [isSelected]);

  return (
    <div className="relative w-full mb-3">
      {isSelected && (
        <div className="fixed top-0 left-0 w-screen h-screen z-0">
          <Image
            src={`/images/gallery/${src}`}
            alt={id}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        onClick={handleClick}
        className={`relative z-10 w-full flex flex-col items-center justify-center cursor-pointer text-center transition-all duration-300 ${
          selectedId && !isSelected ? "text-gray-400" : ""
        }`}
      >
        {/* Layout especial si se define mobileLayout */}
        {mobileLayout ? (
          <div className="flex flex-col items-center justify-center md:hidden">
            {mobileLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-row gap-4 items-center">
                {row.map((cell, colIndex) => {
                  if (Array.isArray(cell)) {
                    return (
                      <div key={colIndex} className="flex flex-col items-center gap-1">
                        {cell.map((key, innerIdx) => (
                          <p key={innerIdx} className="text-5xl uppercase leading-none">
                            {project[key]}
                          </p>
                        ))}
                      </div>
                    );
                  } else {
                    return (
                      <p key={colIndex} className="text-[4rem] uppercase leading-[3rem]">
                        {project[cell]}
                      </p>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        ) : (
          // Layout por defecto
          <div className="flex flex-row gap-2 whitespace-nowrap md:hidden">
            <p className="text-5xl uppercase">{title1}</p>
            <p className="text-5xl uppercase">{title2}</p>
            <p className="text-5xl uppercase">{title3}</p>
          </div>
        )}

      </div>
    </div>
  );
}

