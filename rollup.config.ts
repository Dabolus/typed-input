// tslint:disable:object-literal-sort-keys
import { readdirSync } from 'fs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const prod = process.env.NODE_ENV === 'production';

const inputs = readdirSync('src')
  .filter((file) => !file.endsWith('.d.ts'))
  .map((file) => file.slice(0, -3));

const getConfig = (input, minify) => ({
  input: `src/${input}.ts`,
  output: [{
    file: `${input}${minify ? '.min' : ''}.js`,
    format: 'es',
    sourcemap: !prod,
  }, {
    file: `${input}.iife${minify ? '.min' : ''}.js`,
    format: 'iife',
    name: `dabolus.${input.replace(/-([a-z])/g, ([, l]) => l.toUpperCase())}`,
    sourcemap: !prod,
  }],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: prod,
          sourceMap: !prod,
        },
      },
    }),
    ...minify ? [
      terser({
        mangle: {
          properties: {
            regex: /^_/,
          },
        },
      }),
    ] : [],
  ],
  // Make all dependencies external
  external: () => true,
});

export default inputs.reduce((configs, input) =>
  [...configs, getConfig(input, false), ...prod ? [getConfig(input, true)] : []], []);
