import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import minifyCss from './minify-css.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const CSS_DIR = path.join(__dirname, 'assets', 'css');
const OUTPUT_FILE = path.join(__dirname, 'assets', 'css', 'bundle.css');
const EXCLUDE_FILES = ['bundle.css'];
const VENDOR_CSS = [
  ['@fancyapps/ui/dist/fancybox/fancybox.css', 'fancybox.css'],
  ['swiper/swiper-bundle.min.css',              'swiper-bundle.min.css'],
];

function copyVendorCSS() {
  const vendorDir = path.join(__dirname, 'assets', 'vendor');
  fs.mkdirSync(vendorDir, { recursive: true });

  for (const [pkg, filename] of VENDOR_CSS) {
    const src  = path.join(__dirname, 'node_modules', pkg);
    const dest = path.join(vendorDir, filename);
    fs.copyFileSync(src, dest);
  }
}

function getAllCSSFiles(dir) {
  let results = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getAllCSSFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.css') &&
      !EXCLUDE_FILES.includes(entry.name)
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

async function buildBundle() {

  if (!fs.existsSync(CSS_DIR)) {
    process.exit(1);
  }

  const files = getAllCSSFiles(CSS_DIR);

  if (files.length === 0) {
    process.exit(1);
  }

  let bundle = '';

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    bundle += content

  }
  const minified = await minifyCss(bundle);
  fs.writeFileSync(OUTPUT_FILE, minified, 'utf8');
}
copyVendorCSS();
buildBundle();
