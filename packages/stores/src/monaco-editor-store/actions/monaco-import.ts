const { promise, resolve, reject } =
  Promise.withResolvers<typeof import('monaco-editor')>();

export function importMonaco() {
  return promise;
}

export function setMonacoImporter(
  dynamicImport: Promise<{ default: typeof import('monaco-editor') }>,
) {
  return dynamicImport
    .then(({ default: monacoPackage }) => {
      resolve(monacoPackage);
    })
    .catch(reject);
}
