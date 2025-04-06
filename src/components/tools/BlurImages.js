"use client";

import { useState, useEffect } from "react";
import { getPlaiceholder } from "plaiceholder";

const useBlurImages = (imageUrls) => {
  const [blurImages, setBlurImages] = useState([]);

  useEffect(() => {
    const loadBlurData = async () => {
      const blurredImages = await Promise.all(
        imageUrls.map(async (src) => {
          try {
            const res = await fetch(src);
            const buffer = await res.arrayBuffer();
            const { base64 } = await getPlaiceholder(Buffer.from(buffer));
            return {src, blurDataUrl: base64}
          } catch (error) {
            console.error(`Error processing the image ${src}:`, error);
            return { src, blurDataURL: "" };
          }
        })
      );
      setBlurImages(blurredImages)
    };
    loadBlurData();
  }, [imageUrls]);
  return blurImages
  
}

export default useBlurImages;