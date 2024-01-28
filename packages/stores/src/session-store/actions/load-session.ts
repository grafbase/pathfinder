import { DOCUMENT_EDITOR_DEFAULT_VALUE } from '@pathfinder-ide/shared';
import { loadSchema } from '../../schema-store';
import { setEditorValues } from '../slices/editor-tabs/actions/set-editor-values';
import { useSessionStore } from '../use-session-store';
import { GraphQLSchema } from 'graphql';

export const loadSession = async ({
  schema,
  sessionName,
}: {
  schema?: GraphQLSchema;
  sessionName: string;
}) => {
  // if we have an existing session is storage, we set the name/rehydrate/load the schema
  useSessionStore.persist.setOptions({
    name: sessionName,
  });

  // manually rehydrate
  await useSessionStore.persist.rehydrate();

  // wait a short amount of time to allow for rehydration
  setTimeout(() => {
    loadSchema({
      fetchOptions: {
        endpoint: useSessionStore.getState().endpoint as string,
        headers: useSessionStore.getState().headers,
      },
      schema,
    });

    setEditorValues({
      newDocumentEditorValue:
        useSessionStore.getState().activeTab?.documentString ||
        DOCUMENT_EDITOR_DEFAULT_VALUE,
      newResponseEditorValue: JSON.stringify(
        useSessionStore.getState().activeTab?.latestResponse?.response.data,
        null,
        2,
      ),
    });
  }, 100);
};
