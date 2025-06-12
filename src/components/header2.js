"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AnimatedLink from "./tools/AnimatedLink";
// import AboutModal from "./about_modal";
import AboutModal2 from "./about_modal/index2";
import AnimatedButton from "./tools/AnimatedButon";

const Header2 = () => {

  const router = useRouter();
  const [showIndexLink, setShowIndexLink] = useState(false);
  const [showOrbitalLink, setShowOrbitalLink] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  

  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      const isCanvasOrOrbital = ["/index", "/orbital"].includes(url);
      const isWorkOrSlider = url.startsWith("/work");
  
      // Mostrar el link "canvas" si estamos en /work, /index, /orbital o en un slider
      setShowIndexLink(isCanvasOrOrbital || isWorkOrSlider);
  
      // Mostrar el link "orbital" en las mismas condiciones
      setShowOrbitalLink(isCanvasOrOrbital || isWorkOrSlider);
    };
  
    // Activamos una vez al montar el componente
    handleRouteChangeComplete(router.pathname);
  
    // Escuchamos cambios de ruta
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
  
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);
  

  const currentPath = router.pathname;
  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    if (path === router.pathname) return;
    router.push(path);
  }

  return(
    <>
    <nav
    className={`w-full h-auto flex flex-row justify-between uppercase text-lg px-2 py-4 whitespace-nowrap ${
      ["/index", "/orbital"].includes(currentPath)
        ? "top-0 left-0 fixed z-40 bg-transparent text-black"
        : "top-0 left-0 fixed z-40 bg-white text-black"
    }`}
    >
      <div className="flex flex-col items-start leading-tight">
        <AnimatedLink href="/" className="flex text" text="johnny carretes" 
        onClick={handleNavigation("/")}/>
        <div className="flex flex-row gap-2">
          <AnimatedLink href="/work" text="index" 
            className={`flex text ${["/orbital", "/index"].includes(currentPath) ? "text-gray-400" : ""}`}
            onClick={handleNavigation("/work")} />
          {showIndexLink && (
            <AnimatedLink href="/index" text="canvas" 
              className={`flex text ${currentPath === "/index" ? "" : "text-gray-400"}`} />
          )}
          {showOrbitalLink && (
            <AnimatedLink href="/orbital" text="orbital" 
              className={`flex text ${currentPath === "/orbital" ? "" : "text-gray-400"}`} />
          )}
        </div>
      </div>
      <div className="flex flex-col items-end leading-tight">
        <AnimatedButton onClick={() => setAboutOpen(true)} className="flex text text-left uppercase" text="about" />
        <AnimatedLink href="https://www.instagram.com/johnny_carretes/" className="flex text" text="instagram" />
      </div>
    </nav>
    
    <AboutModal2 isOpen={aboutOpen} onClose={() => setAboutOpen(false)}/>
    </>
  )
}

export default Header2;