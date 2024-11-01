import JsonWorker from '../../../workers/json.worker.bundle?worker';
import EditorWorker from '../../../workers/editor.worker.bundle?worker';
import GraphQLWorker from '../../../workers/graphql.worker.bundle?worker';

if (import.meta.__IS_LITE_MODE_ !== true) {
  self.MonacoEnvironment = {
    getWorker(_workerId: string, label: string): Worker {
      switch (label) {
        case 'json': {
          return new JsonWorker();
        }

        case 'graphql': {
          return new GraphQLWorker();
        }

        default: {
          return new EditorWorker();
        }
      }
    },
  };
}
