"use client";

import Header from "@/components/header";
import Header2 from "@/components/header2";
import PageTransitionWrapper from "@/components/Layout/PageTransitions/PageTransitionWraper";
import PageTransitionWrapper2 from "@/components/Layout/PageTransitions/PageTransitionWraper/index2";
import PageTransitionWraper5 from "@/components/Layout/PageTransitions/PageTransitionWraper/index5";
import "@/styles/globals.css";
import "@/styles/Work.module.css";
// import "@/components/Layout/PageTransitions/PageTransition1/style.module.scss";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import ProgressBar from "nextjs-progressbar"


export default function App({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* <div className="w-screen h-screen flex flex-col relative overflow-hidden"> */}
      <ProgressBar color="#000" startPosition={0.2} height={2} stopDelayMs={200}/>
      <Header2 />
      <AnimatePresence mode="wait" initial={false}>
        <div key={router.pathname} className="flex-1 overflow-hidden">
        {/* <div key={router.pathname} className=""> */}
          {/* <PageTransitionWrapper2 key={router.pathname}> */}
            <Component {...pageProps} />
          {/* </PageTransitionWrapper2> */}
        </div>
      </AnimatePresence>
    </div>

  )
}
