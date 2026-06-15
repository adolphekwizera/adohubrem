import sharp from "sharp";
import { copyFile, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "src", "app");
const outDir = path.join(root, "public", "images");

const mappings = [
  { src: "IMG_0334.JPEG", out: "hero.webp", width: 1200 },
  { src: "IMG_3576.HEIC", out: "about.webp", width: 900 },
  { src: "IMG_0462 (1).HEIC", out: "featured-bg.webp", width: 1600 },
  { src: "IMG_0261.HEIF", out: "blog-fallback.webp", width: 800 },
];

await mkdir(outDir, { recursive: true });

for (const { src, out, width } of mappings) {
  const input = path.join(srcDir, src);
  const output = path.join(outDir, out);
  try {
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(output);
    console.log(`✓ ${src} → ${out}`);
  } catch (err) {
    console.warn(`✗ ${src}: ${err.message}`);
    if (src === "IMG_0334.JPEG") {
      await copyFile(input, path.join(outDir, "hero.jpg"));
    }
  }
}

console.log("Done.");
