import Header from "@/components/header";
import PageTransitionWrapper from "@/components/Layout/PageTransitions/PageTransitionWraper";
import "@/styles/globals.css";
import "@/styles/Work.module.css";
// import "@/components/Layout/PageTransitions/PageTransition1/style.module.scss";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }) {
  const router = useRouter()
  
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <div key={router.pathname} className="flex-1 overflow-hidden">
          <PageTransitionWrapper>
            <Component {...pageProps} />
          </PageTransitionWrapper>
        </div>
      </AnimatePresence>
    </div>

  )
}
