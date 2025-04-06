import {  motion } from "framer-motion";



export default function PageTransition({children}) {

  const anim = (variants, custom = null) => {
    return {
      initial: "initial",
      animate: "enter",
      exit: "exit",
      variants,
      custom
    }
  }

  const expand = {
    initial: {
      top: 0
    },
    enter: (i) => ({
      top: "100vh",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
      transitionEnd: {
        height: "0", top: "0"
      }
    }),
    exit: (i) => ({
      height: "100vh",
      transition: {
        duration: 0.4,
        delay: 0.05 * i,
        ease: [0.215, 0.61, 0.355, 1],
      },
    })
  }

  const overlay = {
    initial: {
      opacity: 0.5
    },
    enter: {
      opacity: 0
    },
    exit: {
      opacity: 0.5
    }
  }

  const numberOfColumns = 5;

  return(
    <div className="page columns">
      <motion.div {...anim(overlay)} className="background"></motion.div>
        <div className="transition-container">
          {
            [...Array(numberOfColumns)].map((_, i) => {
              return <motion.div {...anim(expand, numberOfColumns - i)} key={i}/>
            })
          }
        </div>
        {children}
    </div>
  )
}