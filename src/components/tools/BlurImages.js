import { getPlaiceholder } from "plaiceholder";
import fs from "fs/promises";
import path from "path";

export async function getGalleryWithBlur(gallery) {
  const imagesWithBlur = await Promise.all(
    gallery.map(async ({ src, coord, location }) => {
      const filePath = path.join(process.cwd(), "public", src);
      const buffer = await fs.readFile(filePath);
      const { base64 } = await getPlaiceholder(buffer);
      return {
        src,
        coord,
        location,
        blurDataURL: base64,
      };
    })
  );
  return imagesWithBlur;
}
