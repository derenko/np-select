import path from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: 'src/index.ts',
      name: 'NpSelect',
      formats: ['umd', 'cjs'],
      fileName: 'np-select',
    },
    rollupOptions: {
      external: [],
      output: {
        dir: './build',
        globals: {},
        assetFileNames: 'np-select.[ext]',
      },
    },
  },
  plugins: [cssInjectedByJsPlugin()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
