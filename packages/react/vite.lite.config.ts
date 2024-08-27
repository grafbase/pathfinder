/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import dts from 'vite-plugin-dts';
import pluginReact from '@vitejs/plugin-react';

process.env.LITE_MODE = 'true';

export default defineConfig({
  // 👇 https://github.com/vitejs/vite/issues/11943#issuecomment-1419293906
  base: './',
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
      external: ['react', 'react-dom', 'graphql', 'monaco-editor', 'monaco-graphql'],
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
