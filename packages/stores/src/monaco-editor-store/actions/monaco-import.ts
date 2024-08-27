const { promise, resolve, reject } =
  Promise.withResolvers<typeof import('monaco-editor')>();

export function importMonaco() {
  return promise;
}

let isImporterSet = false;

export function setMonacoImporter(
  dynamicImport: Promise<{ default: typeof import('monaco-editor') }>,
) {
  if (isImporterSet) return;

  isImporterSet = true;
  dynamicImport
    .then(({ default: monacoPackage }) => {
      resolve(monacoPackage);
    })
    .catch(reject);
}

if (process.env.LITE_MODE !== 'true') {
  setMonacoImporter(import('monaco-graphql/esm/monaco-editor'));
}
