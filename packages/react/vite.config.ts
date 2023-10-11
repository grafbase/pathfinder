/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import dts from "vite-plugin-dts";
import pluginReact from "@vitejs/plugin-react";

export default defineConfig({
  // 👇 https://github.com/vitejs/vite/issues/11943#issuecomment-1419293906
  base: "./",
  build: {
    target: "ESNext",
    lib: {
      entry: "src/index.ts",
      name: "pathfinder",
      fileName: (format) => `pathfinder.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        format: "esm",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      exclude: ["./test"],
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
