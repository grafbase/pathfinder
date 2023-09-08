/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import dts from "vite-plugin-dts";
// import monacoEditorPlugin from "vite-plugin-monaco-editor";
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
      // fileName: "[name]",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        entryFileNames: "[name]-[hash]-DOGFOOD.js",
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
    // monacoEditorPlugin({
    //   customDistPath: (_root, buildOutDir) => {
    //     // this ensures that our workers will be copied to the default folder (monacoeditorwork) next to /assets in the build dir
    //     return buildOutDir + "/" + "monacoeditorwork";
    //   },

    //   languageWorkers: ["json", "editorWorkerService"],
    //   customWorkers: [
    //     {
    //       label: "graphql",
    //       entry: "monaco-graphql/esm/graphql.worker",
    //     },
    //   ],
    // }),
    pluginReact(),
    vanillaExtractPlugin({}),
  ],
  test: {
    // 👇 ensure that vitest knows where to find monaco editor
    alias: [
      {
        find: /^monaco-editor$/,
        replacement:
          __dirname + "/node_modules/monaco-editor/esm/vs/editor/editor.api",
      },
    ],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/vitest.setup.ts"],
  },
});
