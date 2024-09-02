let importingPromise: Promise<typeof import('monaco-editor')> | null = null;

export function importMonaco() {
  if (importFn === null)
    throw new Error(
      'You have to set the monaco importer first before calling importMonaco',
    );

  if (importingPromise === null) {
    importingPromise = importFn();
  }

  return importingPromise;
}

let importFn: null | (() => Promise<typeof import('monaco-editor')>) = null;

/**
 * Sets the importer function for the 'monaco-editor' module.
 *
 * @param dynamicImport - a function that returns a promise that resolves to the 'monaco-editor' module.
 *
 * @remarks
 * Only use this function if you are using `pathfinder-ide/react/lite`.
 *
 * @example
 * ```tsx
 * import { setMonacoImporter } from '@pathfinder-ide/stores';
 *
 * setMonacoImporter(() => import('monaco-graphql/esm/monaco-editor'));
 * ```
 */
export function setMonacoImporter(
  dynamicImport: () => Promise<typeof import('monaco-editor')>,
) {
  if (importFn !== null) return;
  importFn = dynamicImport;
}
