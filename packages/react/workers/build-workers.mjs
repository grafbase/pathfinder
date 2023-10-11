import * as esbuild from "esbuild";

esbuild.build({
  bundle: true,
  entryNames: "[name].bundle",
  entryPoints: {
    "editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
    "json.worker": "monaco-editor/esm/vs/language/json/json.worker.js",
    "graphql.worker": "monaco-graphql/esm/graphql.worker.js",
  },
  format: 'esm',
  minify: false,
  outdir: "./workers"
});
