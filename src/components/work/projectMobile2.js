"use client";

import { useRouter } from "next/router";
import { useRef } from "react";
import Image from "next/image";

export default function ProjectMobile2({ project, selectedId, setSelectedId }) {
  const router = useRouter();
  const { title1, title2, title3, id, src } = project;
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
      {/* Imagen fullscreen debajo del texto */}
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
        className={`relative z-10 -space-y-8 w-full flex flex-col items-center justify-center cursor-pointer text-center transition-all duration-300 ${
          selectedId && !isSelected ? "text-gray-400" : ""
        }`}
      >
        <div className="flex">
          <p className="text-[5vh] uppercase">{title1}</p>
        </div>
        <div className="flex flex-row gap-3">
          <p className="text-[5vh] uppercase">{title2}</p>
          <p className="text-[5vh] uppercase">{title3}</p>
        </div>
      </div>
    </div>
  );
}
