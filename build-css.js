import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const CSS_DIR = path.join(__dirname, 'assets', 'css');
const OUTPUT_FILE = path.join(__dirname, 'assets', 'css', 'bundle.css');
const EXCLUDE_FILES = ['bundle.css'];

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

function buildBundle() {

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

  fs.writeFileSync(OUTPUT_FILE, bundle, 'utf8');
}

buildBundle();