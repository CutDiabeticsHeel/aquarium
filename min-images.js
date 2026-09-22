import sharp from 'sharp';
import path from 'node:path';
import { readdir, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR  = path.join(__dirname, 'assets', 'img' , 'origin');
const OUTPUT_DIR = path.join(__dirname, 'assets', 'img');
const WIDTHS = [375, 768, 1024];
const FORMAT = 'webp';

const exists = path => access(path).then(() => true, () => false);

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(INPUT_DIR)).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name;

  for (const width of WIDTHS) {
    const outName = `${name}-${width}.${FORMAT}`;
    const outPath = path.join(OUTPUT_DIR, outName);

    if (await exists(outPath)) continue;

    await sharp(path.join(INPUT_DIR, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(outPath);
  }
}

export async function generateResponsiveImages(sourcePath) {
    const fileName = path.basename(sourcePath);
    const name = path.parse(fileName).name;
 
    for (const width of WIDTHS) {
        const outPath = path.join(OUTPUT_DIR, `${name}-${width}.${FORMAT}`);
 
        await sharp(sourcePath)
            .rotate()
            .resize({ width, withoutEnlargement: true })
            .webp({ quality: 90 })
            .toFile(outPath);
    }
}