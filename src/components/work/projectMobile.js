"use client";

import { useRouter } from "next/router";

export default function ProjectMobile({ project }) {
  const router = useRouter();
  const { title1, title2, title3 } = project;

  const handleClick = () => {
    router.push(`/work/${project.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex flex-col -space-y-8 items-center justify-center cursor-pointer text-center"
    >
      <div className="flex">
        <p className="text-[8vh] uppercase">{title1}</p>
      </div>
      <div className="flex flex-row gap-1">
        <p className="flex text-[6.5vh] uppercase">{title2}</p>
        <p className="flex text-[6.5vh] uppercase">{title3}</p>
      </div>
      
    </div>
  );
}
