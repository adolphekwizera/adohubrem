import fs from "fs";
import path from "path";
import sharp from "sharp";

const INPUT = path.resolve("public", "images", "IMG_0462 (1).HEIC");
const OUTPUT = path.resolve("public", "images", "about.webp");

async function convert() {
  if (!fs.existsSync(INPUT)) {
    console.error("Input file not found:", INPUT);
    process.exit(1);
  }

  try {
    await sharp(INPUT)
      .resize({ width: 1200 })
      .webp({ quality: 90 })
      .toFile(OUTPUT);

    console.log("Converted:", INPUT, "→", OUTPUT);
  } catch (err) {
    console.error("Conversion failed:", err);
    process.exit(1);
  }
}

convert();
