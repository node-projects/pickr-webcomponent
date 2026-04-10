import * as esbuild from 'esbuild';
import { minifyHTMLLiteralsPlugin } from 'esbuild-plugin-minify-html-literals';

await esbuild.build({
  entryPoints: ['./lib/index.js'],
  outfile: './lib/index-min.js',

  bundle: true,
  format: 'esm',
  minify: true,
  platform: 'neutral',

  plugins: [
    minifyHTMLLiteralsPlugin()
  ]
}).catch(() => process.exit(1));