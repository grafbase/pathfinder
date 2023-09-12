/// <reference types="vite/client" />

// vite
interface ImportMetaEnv {
  readonly VITE_GRAFBASE_API_KEY: string;
  readonly VITE_GRAFBASE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
