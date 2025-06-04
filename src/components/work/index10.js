"use client"

import { useState } from "react";
import Project4 from "@/components/work/project4"
import { useRevealer } from "../tools/UseRevealer";

const projects = [

  // {
  //   id: "mediterraneo",
  //   title1: "paradise",
  //   title2: "",
  //   src: "image00021.jpeg"
  // },
  {
    id: "mediterraneo",
    title1: "paradise",
    title2: "is really",
    title3: "nice",
    src: "image00021.jpeg"
  },
  {
    id: "johnny_color",
    title1: "johnny",
    title2: "color",
    src: "image00036.jpeg"
  },

  {
    id: "dolce_vita",
    title1: "Leak",
    title2: "of",
    title3: "Dreams",
    src: "image00041.webp"
  },

  {
    id: "islas",
    title1: "costas",
    title2: "de sol",
    src: "image00030.jpeg"
  },

  {
    id: "tempelfog",
    title1: "johnny", 
    title2: "de", 
    title3: "noche",
    src: "image00001.webp"
  },
]


const WorkMenu10 = () => {
  // useRevealer();
  
  return(
      <div className="min-h-screen w-screen text-black text-xl tracking-tight flex flex-col justify-center items-center relative px-2">
        {projects.map((project) => (
          <Project4
            key={project.src}
            project={project}           
          />
        ))}
      </div>
    
  )
}

export default WorkMenu10;