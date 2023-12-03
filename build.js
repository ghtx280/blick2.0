import { build } from 'esbuild'

const lib_name = "blick"

build({
  entryPoints: ['./src/main.js'],
  bundle: true,
  format: "iife",
  outfile: `./dist/${lib_name}.js`,
  sourcemap: true
})

build({
  entryPoints: ['./src/main.js'],
  bundle: true,
  minify: true,
  outfile: `./dist/${lib_name}.min.js`,
  sourcemap: true
})

build({
  entryPoints: ['./src/cli/index.js'],
  bundle: true,
  platform: 'node',
  packages: 'external',
  format: "esm",
  outfile: `./dist/${lib_name}.node.js`,
})


