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

export function setMonacoImporter(
  dynamicImport: () => Promise<typeof import('monaco-editor')>,
) {
  if (importFn !== null) return;
  importFn = dynamicImport;
}
