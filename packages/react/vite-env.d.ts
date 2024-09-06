/// <reference types="vite/client" />
/// <reference types="react/canary" />
interface ImportMetaEnv {
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;

  readonly __IS_LITE_MODE_?: boolean;
}
