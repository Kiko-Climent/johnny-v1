import React from "react";
import styles from "./style.module.scss"

export default function PixelTransition () {

  const getBlocks = () => {

    const { innerWidth, innerHeight } = window;
    const blockSize = innerWidth * 0.05;
    const amountOfBlocks = Math.ceil(innerHeight / blockSize)
    return [...Array(amountOfBlocks)].map ((_, i) => {
      return <div className={styles.block}></div>
    })
  }

  return(
    <div className={styles.pixelBackground}>
      {
        [...Array(20)].map( (_, i) => {
          return <div className={styles.column}>
            {
              getBlocks()
            }
          </div>
        })
      }
    </div>
  )
}