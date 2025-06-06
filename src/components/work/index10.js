"use client"

// import { useState } from "react";
import Project4 from "@/components/work/project4";
import ProjectMobile from "./projectMobile";
import useIsMobile from "@/hooks/useIsMobile";
import WorkMenu4 from "./index4";
import WorkMenu5 from "./index5";
import WorkMenu6 from "./index6";
import WorkMenu7 from "./index7";
import WorkMenu8 from "./index8";
import WorkMenu3 from "./index3";

const projects = [

  {
    id: "paradise_is_really_nice",
    title1: "paradise",
    title2: "is really",
    title3: "nice",
    mobileLayout: [
      ["title1", "title2"],
      ["title3"]
    ],
    src: "image31.webp"
  },
  {
    id: "johnny_color",
    title1: "johnny",
    title2: "color",
    src: "image6.webp"
  },

  {
    id: "leak_of_dreams",
    title1: "leak",
    title2: "of",
    title3: "dreams",
    mobileLayout: [
      ["title1", "title2"],
      ["title3"]
    ],
    src: "image14.webp"
  },

  {
    id: "costas_de_sol",
    title1: "costas",
    title2: "de sol",
    src: "image21.webp"
  },

  {
    id: "johnny_de_noche",
    title1: "johnny", 
    title2: "de", 
    title3: "noche",
    src: "image50.webp"
  },
]


const WorkMenu10 = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen w-screen overflow-hidden text-black flex flex-col justify-center items-center -space-y-5 md:space-y-0">
      {/* {projects.map((project) =>
        isMobile ? (
          <ProjectMobile key={project.id} project={project} />
        ) : (
          <Project4 key={project.id} project={project} />
        )
      )} */}
      <WorkMenu5 />
    </div>
  );
}

export default WorkMenu10;