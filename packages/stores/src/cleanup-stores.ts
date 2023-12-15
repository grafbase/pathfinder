import { graphQLDocumentStore } from './graphql-document-store';
import { INITIAL_GRAPHQL_DOCUMENT_STATE } from './graphql-document-store/state';
import {
  monacoEditorStore,
  INITIAL_MONACO_EDITOR_STORE_STATE,
} from './monaco-editor-store';
import { monacoGraphQLStore } from './monaco-graphql-store';
import { INITIAL_MONACO_GRAPHQL_STORE_STATE } from './monaco-graphql-store/monaco-graphql-store';
import {
  resetSchemaPolling,
  schemaStore,
  INITIAL_SCHEMA_STORE_STATE,
} from './schema-store';

export const cleanupStores = () => {
  const managedEditors = monacoEditorStore.getState().managedEditors;

  // manually dispose of editors and models _before_ resetting the store state below
  Object.values(managedEditors).forEach((editor) => {
    editor?.getModel()?.dispose();
    editor?.dispose();
  });

  resetSchemaPolling();

  graphQLDocumentStore.setState({ ...INITIAL_GRAPHQL_DOCUMENT_STATE });

  monacoEditorStore.setState({ ...INITIAL_MONACO_EDITOR_STORE_STATE });

  monacoGraphQLStore.setState({ ...INITIAL_MONACO_GRAPHQL_STORE_STATE });

  schemaStore.setState({ ...INITIAL_SCHEMA_STORE_STATE });
};
