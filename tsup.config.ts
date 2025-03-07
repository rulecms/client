import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
  cjsInterop: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js',
    };
  },
});
