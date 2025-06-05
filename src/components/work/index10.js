"use client"

// import { useState } from "react";
import Project4 from "@/components/work/project4"

const projects = [

  {
    id: "paradise_is_really_nice",
    title1: "paradise",
    title2: "is really",
    title3: "nice",
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