"use client";

import Header3 from "@/components/header3";
import PageTransitionWrapper7 from "@/components/Layout/PageTransitions/PageTransitionWraper/index7";
import { NavigationProvider } from "@/components/tools/NavigationContext";
import "@/styles/globals.css";
import "@/styles/Work.module.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import ProgressBar from "nextjs-progressbar"


export default function App({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <NavigationProvider>
      <div className="w-screen h-screen flex flex-col relative overflow-hidden">
        <ProgressBar color="#000" startPosition={0.2} height={2} stopDelayMs={200}/>
        <Header3 />
        <AnimatePresence mode="wait" initial={false}>
          <div key={router.pathname} className="flex-1">
            <PageTransitionWrapper7 key={router.pathname}>
              <Component {...pageProps} />
            </PageTransitionWrapper7>
          </div>
        </AnimatePresence>
      </div>
    </NavigationProvider>

  )
}
