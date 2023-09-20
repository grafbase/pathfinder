import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react';
import reactVite from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import {vanillaExtractPlugin} from "@vanilla-extract/vite-plugin";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), react()],
    vite: {
        base: "/",
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].js`,
                    chunkFileNames: `assets/[name].js`,
                    assetFileNames: `assets/[name].[ext]`,
                },
            },
        },
        plugins: [
            reactVite(),
            monacoEditorPlugin.default({
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
            vanillaExtractPlugin({}),
        ],
    }
})
