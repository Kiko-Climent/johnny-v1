"use client"

import { useState } from "react";
import Project6 from "@/components/work/project6";
// import Project7 from "@/components/work/project7";
import useIsMobile from "@/hooks/useIsMobile";
import ProjectMobile4 from "./ProjectMobile4";

const projects = [

  {
    id: "paradise_is_really_nice",
    title1: "paradise",
    title2: "is really",
    title3: "nice",
    mobileTitle1: "paradise",
    mobileTitle2: "is",
    mobileTitle3: "really",
    mobileTitle4: "nice",
    mobileLayout: [
      ["mobileTitle1", "mobileTitle2"],
      ["mobileTitle3", "mobileTitle4"]
  ],
    src: "imagemenu1.jpeg"
  },
  {
    id: "johnny_color",
    title1: "johnny",
    title2: "color",
  //   mobileTitle1: "johnny",
  //   mobileTitle2: "color",
  //   mobileLayout: [
  //     ["mobileTitle1"],
  //     ["mobileTitle2"]
  // ],
    src: "imagemenu5.jpeg"
  },

  {
    id: "leak_of_dreams",
    title1: "leak",
    title2: "of",
    title3: "dreams",
  //   mobileTitle1: "leak",
  //   mobileTitle2: "of",
  //   mobileTitle3: "dreams",
  //   mobileLayout: [
  //     ["mobileTitle1", "mobileTitle2"],
  //     ["mobileTitle3"]
  // ],
    src: "imagemenu4.jpeg"
  },

  {
    id: "costas_de_sol",
    title1: "costas",
    title2: "de sol",
  //   mobileTitle1: "costas",
  //   mobileTitle2: "de",
  //   mobileTitle3: "sol",
  //   mobileLayout: [
  //     ["mobileTitle1"],
  //     ["mobileTitle2", "mobileTitle3"]
  // ],
    src: "imagemenu3.jpeg"
  },

  {
    id: "johnny_de_noche",
    title1: "johnny", 
    title2: "de", 
    title3: "noche",
    mobileTitle1: "johnny",
    mobileTitle2: "de",
    mobileTitle3: "noche",
    mobileLayout: [
      ["mobileTitle1", "mobileTitle2"],
      ["mobileTitle3"]
  ],
    src: "imagemenu2.jpeg"
  },
]


const WorkMenu10 = () => {
  const isMobile = useIsMobile();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="min-h-screen w-screen overflow-hidden text-black flex flex-col justify-center items-center"
    style={{ 
      height: "calc(var(--vh, 1vh) * 100)"}}>
      {projects.map((project) =>
        isMobile ? (
          <ProjectMobile4
          key={project.id}
          project={project}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        ) : (
          <Project6 key={project.id} project={project} />
        )
      )}
    </div>
  );
}

export default WorkMenu10;