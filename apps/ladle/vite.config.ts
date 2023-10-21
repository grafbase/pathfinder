/// <reference types="vite/client" />

import { defineConfig } from 'vite';

import pluginReact from '@vitejs/plugin-react';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(({ command, mode, ssrBuild }) => {
  console.log('launching ladle:', { command, mode, ssrBuild });
  return {
    server: {
      open: false,
    },
    plugins: [
      pluginReact(),
      vanillaExtractPlugin({
        identifiers: 'debug',
      }),
    ],
  };
});
