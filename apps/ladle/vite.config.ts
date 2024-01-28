/// <reference types="vite/client" />

import { defineConfig } from 'vite';

import pluginReact from '@vitejs/plugin-react';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig(({ command, mode }) => {
  console.log('launching ladle:', { command, mode });
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
