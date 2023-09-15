self.MonacoEnvironment = {
  getWorker(_workerId: string, label: string): Worker {
    switch (label) {
      case "json": {
        return new Worker(
          new URL("../../../workers/json.worker.bundle.js", import.meta.url),
          { type: "module" },
        );
      }

      case "graphql": {
        return new Worker(
          new URL("../../../workers/graphql.worker.bundle.js", import.meta.url),
          { type: "module" },
        );
      }

      default: {
        return new Worker(
          new URL("../../../workers/editor.worker.bundle.js", import.meta.url),
          { type: "module" },
        );
      }
    }
  },
};
