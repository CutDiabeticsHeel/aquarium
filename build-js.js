import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import minifyJs from './minify-js.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const JS_DIR = path.join(__dirname, 'assets', 'js');
const OUTPUT_FILE = path.join(__dirname, 'assets', 'js', 'bundle.js');
const EXCLUDE_FILES = ['bundle.js'];
const VENDOR_JS = [
  ['@fancyapps/ui/dist/fancybox/fancybox.umd.js', 'fancybox.umd.js'],
  ['swiper/swiper-bundle.min.js',                  'swiper-bundle.min.js'],
  ['gsap/dist/gsap.min.js',                        'gsap.min.js'],
  ['gsap/dist/ScrollTrigger.min.js',               'ScrollTrigger.min.js'],
];

function copyVendorJs() {
  const vendorDir = path.join(__dirname, 'assets', 'vendor');
  fs.mkdirSync(vendorDir, { recursive: true });

  for (const [pkg, filename] of [...VENDOR_JS]) {
    const src  = path.join(__dirname, 'node_modules', pkg);
    const dest = path.join(vendorDir, filename);
    fs.copyFileSync(src, dest);
  }
}

function getAllJsFiles(dir) {
  let results = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getAllJsFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.js') &&
      !EXCLUDE_FILES.includes(entry.name)
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

async function buildBundle() {

  if (!fs.existsSync(JS_DIR)) {
    process.exit(1);
  }

  const files = getAllJsFiles(JS_DIR);

  if (files.length === 0) {
    process.exit(1);
  }

  let bundle = '';

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    bundle += content

  }
  const minified = await minifyJs(bundle);
  fs.writeFileSync(OUTPUT_FILE, minified, 'utf8');
}

buildBundle();
copyVendorJs();
