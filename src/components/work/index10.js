"use client"

import { useState } from "react";
import Project2 from "@/components/work/project2"

const projects = [

  {
    id: "mediterraneo",
    title1: "mediterraneo",
    title2: "",
    src: "image00021.jpeg"
  },

  {
    id: "dolce_vita",
    title1: "dolce",
    title2: "vita",
    src: "image00041.webp"
  },

  {
    id: "islas",
    title1: "",
    title2: "islas",
    src: "image00030.jpeg"
  },

  {
    id: "johnny_color",
    title1: "johnny",
    title2: "color",
    src: "image00036.jpeg"
  },

  {
    id: "tempelfog",
    title1: "tempelfog",
    title2: "",
    src: "image00001.webp"
  },

  {
    id: "spaeti_tales",
    title1: "spaeti",
    title2: "tales",
    src: "image00029.webp"
  },
]


const WorkMenu10 = () => {
  return(
      <div className="h-[calc(100vh-100px)] w-screen text-black text-xl tracking-tight flex flex-col justify-center items-center relative px-2">
        {projects.map((project) => (
          <Project2
            key={project.src}
            project={project}           
          />
        ))}
      </div>
    
  )
}

export default WorkMenu10;