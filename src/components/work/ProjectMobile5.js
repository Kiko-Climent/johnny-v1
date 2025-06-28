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

      window.scrollTo(0, 0);

      // Espera un poco para mostrar la imagen antes de redirigir
      setTimeout(() => {
        router.push(`/work/${id}`);
      }, 1700); // <- Cambia el delay si necesitas más tiempo de visualización
    }
  };

  useEffect(() => {
    // Reset ref si cambia de selección
    if (!isSelected) {
      hasNavigatedRef.current = false;
    }
  }, [isSelected]);

  return (
    <div className="relative w-full">
      {isSelected && (
        <div className="fixed top-0 left-0 w-screen h-screen z-0">
          <Image
            src={`/images/${src}`}
            alt={id}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        onClick={handleClick}
        className={`relative z-10 w-full flex flex-col leading-none px-2 cursor-pointer text-right transition-all duration-300 ${
          selectedId && !isSelected ? "text-gray-400" : ""
        }`}
      >
        {/* Layout especial si se define mobileLayout */}
        {mobileLayout ? (
          <div className="flex flex-col -space-y-3 md:hidden">
            {mobileLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-row justify-between">
                {row.map((key, colIndex) => (
                  <p key={colIndex} className="flex text-[clamp(2.5rem,15.5vw,5rem)] uppercase">
                    {project[key]}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ) : (
          // Layout por defecto
          <div className="flex flex-row gap-2 whitespace-nowrap md:hidden">
            <p className="text-[clamp(2.5rem,12.7vw,5rem)] uppercase">{title1}</p>
            <p className="text-[clamp(2.5rem,12.7vw,5rem)] uppercase">{title2}</p>
            <p className="text-[clamp(2.5rem,12.7vw,5rem)] uppercase">{title3}</p>
          </div>
        )}
      </div>
    </div>
  );
}

