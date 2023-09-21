// vite.config.ts
import react from "file:///Users/yoavlavi/dev/pathfinder/node_modules/.pnpm/@vitejs+plugin-react@4.0.4_vite@4.4.9/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///Users/yoavlavi/dev/pathfinder/node_modules/.pnpm/vite@4.4.9_@types+node@20.6.2/node_modules/vite/dist/node/index.js";
import { vanillaExtractPlugin } from "file:///Users/yoavlavi/dev/pathfinder/node_modules/.pnpm/@vanilla-extract+vite-plugin@3.9.0_@types+node@20.6.2_vite@4.4.9/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import monacoEditorPlugin from "file:///Users/yoavlavi/dev/pathfinder/node_modules/.pnpm/vite-plugin-monaco-editor@1.1.0_monaco-editor@0.40.0/node_modules/vite-plugin-monaco-editor/dist/index.js";
var vite_config_default = defineConfig(({ command }) => {
  return {
    base: "/",
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      }
    },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 1420,
      strictPort: true
    },
    // 3. to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
    plugins: [
      react(),
      monacoEditorPlugin.default({
        customDistPath: (_root, buildOutDir) => {
          return buildOutDir + "/monacoeditorwork";
        },
        languageWorkers: ["json", "editorWorkerService"],
        customWorkers: [
          {
            label: "graphql",
            entry: "monaco-graphql/esm/graphql.worker"
          }
        ]
      }),
      vanillaExtractPlugin({})
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveW9hdmxhdmkvZGV2L3BhdGhmaW5kZXIvYXBwcy9kZXNrdG9wXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMveW9hdmxhdmkvZGV2L3BhdGhmaW5kZXIvYXBwcy9kZXNrdG9wL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy95b2F2bGF2aS9kZXYvcGF0aGZpbmRlci9hcHBzL2Rlc2t0b3Avdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgdmFuaWxsYUV4dHJhY3RQbHVnaW4gfSBmcm9tIFwiQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpblwiO1xuaW1wb3J0IG1vbmFjb0VkaXRvclBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tbW9uYWNvLWVkaXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCB9KSA9PiB7XG4gIHJldHVybiB7XG4gICAgYmFzZTogXCIvXCIsXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLmpzYCxcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uanNgLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS5bZXh0XWAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgLy8gVml0ZSBvcHRpb25zIHRhaWxvcmVkIGZvciBUYXVyaSBkZXZlbG9wbWVudCBhbmQgb25seSBhcHBsaWVkIGluIGB0YXVyaSBkZXZgIG9yIGB0YXVyaSBidWlsZGBcbiAgICAvL1xuICAgIC8vIDEuIHByZXZlbnQgdml0ZSBmcm9tIG9ic2N1cmluZyBydXN0IGVycm9yc1xuICAgIGNsZWFyU2NyZWVuOiBmYWxzZSxcbiAgICAvLyAyLiB0YXVyaSBleHBlY3RzIGEgZml4ZWQgcG9ydCwgZmFpbCBpZiB0aGF0IHBvcnQgaXMgbm90IGF2YWlsYWJsZVxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydDogMTQyMCxcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgfSxcbiAgICAvLyAzLiB0byBtYWtlIHVzZSBvZiBgVEFVUklfREVCVUdgIGFuZCBvdGhlciBlbnYgdmFyaWFibGVzXG4gICAgLy8gaHR0cHM6Ly90YXVyaS5zdHVkaW8vdjEvYXBpL2NvbmZpZyNidWlsZGNvbmZpZy5iZWZvcmVkZXZjb21tYW5kXG4gICAgZW52UHJlZml4OiBbXCJWSVRFX1wiLCBcIlRBVVJJX1wiXSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgKG1vbmFjb0VkaXRvclBsdWdpbiBhcyBhbnkpLmRlZmF1bHQoe1xuICAgICAgICBjdXN0b21EaXN0UGF0aDogKF9yb290LCBidWlsZE91dERpcikgPT4ge1xuICAgICAgICAgIC8vIHRoaXMgZW5zdXJlcyB0aGF0IG91ciB3b3JrZXJzIHdpbGwgYmUgY29waWVkIHRvIHRoZSBkZWZhdWx0IGZvbGRlciAobW9uYWNvZWRpdG9yd29yaykgbmV4dCB0byAvYXNzZXRzIGluIHRoZSBidWlsZCBkaXJcbiAgICAgICAgICByZXR1cm4gYnVpbGRPdXREaXIgKyBcIi9cIiArIFwibW9uYWNvZWRpdG9yd29ya1wiO1xuICAgICAgICB9LFxuICAgICAgICBsYW5ndWFnZVdvcmtlcnM6IFtcImpzb25cIiwgXCJlZGl0b3JXb3JrZXJTZXJ2aWNlXCJdLFxuICAgICAgICBjdXN0b21Xb3JrZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6IFwiZ3JhcGhxbFwiLFxuICAgICAgICAgICAgZW50cnk6IFwibW9uYWNvLWdyYXBocWwvZXNtL2dyYXBocWwud29ya2VyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgdmFuaWxsYUV4dHJhY3RQbHVnaW4oe30pLFxuICAgIF0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVQsT0FBTyxXQUFXO0FBQ3JVLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sd0JBQXdCO0FBRS9CLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsUUFBUSxNQUFNO0FBQzNDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlBLGFBQWE7QUFBQTtBQUFBLElBRWIsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLElBQ2Q7QUFBQTtBQUFBO0FBQUEsSUFHQSxXQUFXLENBQUMsU0FBUyxRQUFRO0FBQUEsSUFDN0IsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ0wsbUJBQTJCLFFBQVE7QUFBQSxRQUNsQyxnQkFBZ0IsQ0FBQyxPQUFPLGdCQUFnQjtBQUV0QyxpQkFBTyxjQUFjO0FBQUEsUUFDdkI7QUFBQSxRQUNBLGlCQUFpQixDQUFDLFFBQVEscUJBQXFCO0FBQUEsUUFDL0MsZUFBZTtBQUFBLFVBQ2I7QUFBQSxZQUNFLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QscUJBQXFCLENBQUMsQ0FBQztBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
