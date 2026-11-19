/**
 * Writes WebP copies of the project screenshots at a few widths, next to the
 * originals: public/media/<name>-<width>.webp. <ResponsiveImage> serves them
 * through srcset, so phones download the small one.
 *
 * Re-run after adding or replacing a screenshot: npm run images
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MEDIA = path.resolve(import.meta.dirname, "../public/media");
const WIDTHS = [640, 1024, 1600];
// Screenshots only; logos and the share image stay as they are.
const SOURCES = ["votera", "chili-collective", "digital-stream", "mumbi"];

const files = new Set(await readdir(MEDIA));
for (const name of SOURCES) {
  if (!files.has(`${name}.png`)) throw new Error(`Missing public/media/${name}.png`);
  for (const width of WIDTHS) {
    const out = path.join(MEDIA, `${name}-${width}.webp`);
    await sharp(path.join(MEDIA, `${name}.png`))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    const kb = Math.round((await stat(out)).size / 1024);
    console.log(`${path.basename(out)}  ${kb} KB`);
  }
}
