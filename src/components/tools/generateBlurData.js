import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

const images = [
  "image00032.webp",
  "image00021.jpeg",
  "image00041.webp",
  "image00030.jpeg",
  "image00039.jpeg",
  "image00014.webp",
  "image00007.webp",
  "image00023.webp"
];

const generate = async () => {
  const output = [];

  for (const filename of images) {
    const filepath = path.join(process.cwd(), "public/images", filename);
    const buffer = fs.readFileSync(filepath);
    const { base64 } = await getPlaiceholder(buffer);

    output.push({
      src: `/images/${filename}`,
      blurDataURL: base64
    });
  }

  fs.writeFileSync("blurData.json", JSON.stringify(output, null, 2));
  console.log("Blur data generated");
};

generate();
