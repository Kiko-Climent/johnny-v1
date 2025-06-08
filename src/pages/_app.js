"use client";

import Header2 from "@/components/header2";
// import PageTransitionWrapper5 from "@/components/Layout/PageTransitions/PageTransitionWraper/index5";
// import PageTransitionWrapper6 from "@/components/Layout/PageTransitions/PageTransitionWraper/index6";
import PageTransitionWrapper7 from "@/components/Layout/PageTransitions/PageTransitionWraper/index7";
import "@/styles/globals.css";
import "@/styles/Work.module.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import ProgressBar from "nextjs-progressbar"
import { useEffect } from "react";



export default function App({ Component, pageProps }) {

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);
  
  const router = useRouter()
  
  return (
    // <div className="w-screen h-screen flex flex-col">
      <div className="w-screen flex flex-col relative overflow-hidden"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}>
      <ProgressBar color="#000" startPosition={0.2} height={2} stopDelayMs={200}/>
      <Header2 />
      <AnimatePresence mode="wait" initial={false}>
        <div key={router.pathname} className="flex-1">
        {/* <div key={router.pathname} className=""> */}
          <PageTransitionWrapper7 key={router.pathname}>
            <Component {...pageProps} />
          </PageTransitionWrapper7>
        </div>
      </AnimatePresence>
    </div>

  )
}
