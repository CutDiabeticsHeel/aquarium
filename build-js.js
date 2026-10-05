import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['main.js'],
  bundle: true,
  minify: true,
  target: 'es2020',
  format: 'iife',
  outfile: 'assets/js/bundle.js',
  loader: { '.css': 'empty' },
});