import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['main.css'],
  bundle: true,
  minify: true,
  outfile: 'assets/css/bundle.css',
  external: [
    '/font/*', '/img/*', '/svg/*', '/gif/*',
    '../font/*', '../img/*', '../svg/*', '../gif/*',
  ],
});