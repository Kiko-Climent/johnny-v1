"use client";

import { useRouter } from "next/router";
import { useRef } from "react";
import Image from "next/image";

export default function ProjectMobile3({ project, selectedId, setSelectedId }) {
  const router = useRouter();
  const { title1, title2, title3, id, src, mobileLayout } = project;
  const wasSelectedRef = useRef(false);
  const isSelected = selectedId === id;

  const handleClick = () => {
    if (isSelected && wasSelectedRef.current) {
      router.push(`/work/${id}`);
    } else {
      setSelectedId(id);
      wasSelectedRef.current = true;

      setTimeout(() => {
        wasSelectedRef.current = false;
      }, 1000);
    }
  };

  return (
    <div className="relative w-full">
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
        className={`relative z-10 w-full flex flex-col items-end justify-center cursor-pointer text-justify transition-all duration-300 ${
          selectedId && !isSelected ? "text-gray-400" : ""
        }`}
      >
        {/* Layout especial si se define mobileLayout */}
        {mobileLayout ? (
          <div className="flex flex-col items-end justify-center -space-y-2 md:hidden pr-3">
            {mobileLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-row gap-2">
                {row.map((key, colIndex) => (
                  <p key={colIndex} className="text-4xl uppercase">
                    {project[key]}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ) : (
          // Layout por defecto
          <div className="flex flex-row gap-2 whitespace-nowrap md:hidden">
            <p className="text-4xl uppercase">{title1}</p>
            <p className="text-4xl uppercase">{title2}</p>
            <p className="text-4xl uppercase">{title3}</p>
          </div>
        )}
      </div>
    </div>
  );
}

