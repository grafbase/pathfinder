/// <reference types="vite/client" />

import { defineConfig } from "vite";

import monacoEditorPlugin from "vite-plugin-monaco-editor";

import pluginReact from "@vitejs/plugin-react";

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig(({ command, mode, ssrBuild }) => {
  console.log("launching ladle:", { command, mode, ssrBuild });
  return {
    server: {
      open: false,
    },
    plugins: [
      monacoEditorPlugin({
        customDistPath: (_root, buildOutDir) => {
          // this ensures that our workers will be copied to the default folder (monacoeditorwork) next to /assets in the build dir
          return buildOutDir + "/" + "monacoeditorwork";
        },
        languageWorkers: ["json", "editorWorkerService"],
        customWorkers: [
          {
            label: "graphql",
            entry: "monaco-graphql/esm/graphql.worker",
          },
        ],
      }),
      pluginReact(),
      vanillaExtractPlugin({
        identifiers: "debug",
      }),
    ],
  };
});
