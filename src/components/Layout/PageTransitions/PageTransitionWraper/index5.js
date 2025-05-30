import { motion } from "framer-motion";

const variants = {
  initial: { x: '100%'},
  animate: { x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { x: '-100%', transition: { duration: 0.5, ease: 'easeIn' } },
};

const PageTransitionWraper5 = ({children}) => {
  return(
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
    >
      {children}
    </motion.div>
  )
}

export default PageTransitionWraper5;