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
      name: "Pathfinder",
      fileName: (format) => `pathfinder.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // chunkFileNames: '[name]-[hash].js'
        // manualChunks: {
        //   ["json.worker"]: [
        //     `/node_modules/monaco-editor/esm/vs/language/json/json.worker`,
        //   ],
        //   editorWorker: [
        //     `/node_modules/monaco-editor/esm/vs/editor/editor.worker`,
        //   ],
        //   graphqlWorker: [`/node_modules/monaco-graphql/esm/graphql.worker`],
        // },
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
