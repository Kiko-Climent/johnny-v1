"use client";

import { useState, useEffect } from "react";

const usePreloadImages = (imageUrls) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const preload = async () => {
      await Promise.all(
        imageUrls.map(
          (src) =>
            new Promise((resolve) => {
              const img = new window.Image();
              img.src = src;
              img.onload = resolve;
            })
        )
      );
      setLoaded(true);
    };

    preload();
  }, [imageUrls]);

  return loaded;
};

export default usePreloadImages;
