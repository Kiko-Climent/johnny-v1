import { getPlaiceholder } from "plaiceholder";

export async function getBlurImages(imageUrls) {
  const blurredImages = await Promise.all(
    imageUrls.map(async (src) => {
      try {
        const res = await fetch(src);
        const buffer = await res.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));
        return { src, blurDataURL: base64 };
      } catch (error) {
        console.error(`Error al procesar la imagen ${src}:`, error);
        return { src, blurDataURL: "" };
      }
    })
  );

  return blurredImages;
}
