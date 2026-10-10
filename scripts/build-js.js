import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['scripts/main.js'],
  bundle: true,
  minify: true,
  splitting: true,
  target: 'es2020',
  format: 'esm',
  outdir: "assets/dir/js",
  chunkNames: "chunks/[name]-[hash]",
  loader: { '.css': 'empty' },
});