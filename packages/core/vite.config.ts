/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import dts from "vite-plugin-dts";
import pluginReact from "@vitejs/plugin-react";

export default defineConfig({
  // 👇 https://github.com/vitejs/vite/issues/11943#issuecomment-1419293906
  base: "./",
  // 👇 cleaning up the worker file names by removing the vite-default hash
  worker: {
    format: "es",
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: false,
      mangle: false,
      keep_fnames: true,
    },
    lib: {
      entry: "src/index.ts",
      name: "pathfinder",
      fileName: (format) => `pathfinder.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    pluginReact(),
    vanillaExtractPlugin({}),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/vitest.setup.ts"],
    threads: false,
  },
});
