// @ts-ignore
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
// import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker&inline";

// @ts-ignore
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
// import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker&inline";

// @ts-ignore
import graphQLWorker from "monaco-graphql/esm/graphql.worker?worker";

// import graphQLWorker from "monaco-graphql/esm/graphql.worker?worker&inline";

// // console.log("import.meta.url", import.meta.url);

// console.log("worker?", graphQLWorker());

// const jWorkerURL = new URL(
//   "monaco-editor/esm/vs/language/json/json.worker.js",
//   import.meta.url,
// );
// const jWorker = new Worker(jWorkerURL, {
//   type: "module",
// });

// const eWorkerURL = new URL(
//   "monaco-editor/esm/vs/editor/editor.worker.js",
//   import.meta.url,
// );
// const eWorker = new Worker(eWorkerURL, {
//   type: "module",
// });

// const gWorkerURL = new URL(
//   "monaco-graphql/esm/graphql.worker.js",
//   import.meta.url,
// );
// const gWorker = new Worker(gWorkerURL, {
//   type: "module",
// });

// console.log("workers?", {
//   eWorkerURL,
//   gWorkerURL,
//   jWorkerURL,
//   url: import.meta.url,
// });

console.log("workers", {
  importMeta: import.meta,
  graphqlurl: new URL("monaco-graphql/esm/graphql.worker.js", import.meta.url),
});

// self.MonacoEnvironment = {
//   getWorker(_workerId: string, label: string): Worker {
//     switch (label) {
//       case "graphql": {
//         return new Worker(
//           new URL("monaco-graphql/esm/graphql.worker.js", import.meta.url),
//           { type: "module" },
//         );
//       }

//       case "json": {
//         return new Worker(
//           new URL(
//             "monaco-editor/esm/vs/language/json/json.worker.js",
//             import.meta.url,
//           ),
//           { type: "module" },
//         );
//       }

//       default: {
//         return new Worker(
//           new URL(
//             "monaco-editor/esm/vs/editor/editor.worker.js",
//             import.meta.url,
//           ),
//           { type: "module" },
//         );
//       }
//     }
//   },
// };

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "graphql") {
      // console.log("RETURNING GRAPHQL WORKER");
      return new graphQLWorker();
      // return new Worker(
      //   new URL("monaco-graphql/esm/graphql.worker.js", import.meta.url),
      //   { type: "module" },
      // );
    }
    if (label === "json") {
      // console.log("RETURNING JSON WORKER");
      // return jWorker;
      return new jsonWorker();
      // return new Worker(
      //   new URL(
      //     "monaco-editor/esm/vs/language/json/json.worker.js",
      //     import.meta.url,
      //   ),
      //   { type: "module" },
      // );
    }
    // console.log("RETURNING EDITOR WORKER");
    // return eWorker;
    return new editorWorker();
    // return new Worker(
    //   new URL("monaco-editor/esm/vs/editor/editor.worker.js", import.meta.url),
    //   { type: "module" },
    // );
  },
};
