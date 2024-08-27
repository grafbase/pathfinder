/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import dts from 'vite-plugin-dts';
import pluginReact from '@vitejs/plugin-react';

export default defineConfig({
  // 👇 https://github.com/vitejs/vite/issues/11943#issuecomment-1419293906
  base: './',
  define: {
    'import.meta.__IS_LITE_MODE_': 'true',
  },
  build: {
    target: 'ESNext',
    outDir: 'lite-dist',
    lib: {
      entry: 'src/index.ts',
      name: 'pathfinder',
      fileName: (format) => `pathfinder.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'graphql', /^monaco-editor(\/.*)?/],
      output: {
        format: 'esm',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      exclude: ['./test'],
    }),
    pluginReact(),
    vanillaExtractPlugin({}),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
