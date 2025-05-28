"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AnimatedLink from "./tools/AnimatedLink";
import { playRevealerAnimation } from "./tools/UseRevealer";

const Header3 = () => {

  const router = useRouter();
  const [showIndexLink, setShowIndexLink] = useState(false);

  
  

  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      // Solo mostramos el link "index" si estamos ya en /work o /index después del cambio completo
      setShowIndexLink(["/work", "/index"].includes(url));
    };

    // Activamos una vez si ya estamos ahí
    handleRouteChangeComplete(router.pathname);

    // Escuchamos cuando el cambio de ruta termine
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Cleanup
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  const currentPath = router.pathname;

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    if (path === router.pathname) return;
  
    playRevealerAnimation(() => {
      router.push(path);
    });
  };

  return(
    <nav
    className={`w-full h-auto flex flex-row justify-between uppercase text-lg px-2 py-4 whitespace-nowrap ${
      currentPath === "/index"
        ? "fixed top-0 left-0 z-40 bg-transparent text-black"
        : "relative bg-white text-black z-40"
    }`}
    >

      <div className="flex flex-col items-start leading-tight">
        <AnimatedLink href="/" className="flex text" text="johnny carretes" 
        onClick={handleNavigation("/")}/>
        <div className="flex flex-row gap-1">
          <AnimatedLink href="/work" text="work" 
            className={`flex text ${currentPath === "/work" ? "text-gray-500" : ""}`}
            onClick={handleNavigation("/work")} />
          {showIndexLink && (
            <AnimatedLink href="/index" text="index" 
              className={`flex text ${currentPath === "/index" ? "text-gray-500" : ""}`} />
          )}
        </div>
      </div>
      <div className="flex flex-col items-end leading-tight">
        <AnimatedLink href="/about" className="flex text" text="about" />
        <AnimatedLink href="https://www.instagram.com/johnny_carretes/" className="flex text" text="instagram" />
      </div>
    </nav>
  )
}

export default Header3;