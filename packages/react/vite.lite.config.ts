/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vitest/config';
import defaultConfig from './vite.config';

const overrideConfig = defineConfig({
  define: {
    'import.meta.__IS_LITE_MODE_': 'true',
  },
  build: {
    rollupOptions: {
      external: [/^monaco-editor(\/.*)?/],
    },
  },
});

export default mergeConfig(defaultConfig, overrideConfig);
