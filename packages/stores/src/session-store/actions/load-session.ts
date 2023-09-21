import { DOCUMENT_EDITOR_DEFAULT_VALUE } from "@pathfinder/shared";
import { loadSchema } from "../../schema-store";
import { setEditorValues } from "../slices/editor-tabs/actions/set-editor-values";
import { useSessionStore } from "../use-session-store";

export const loadSession = ({ sessionName }: { sessionName: string }) => {
  // if we have an existing session is storage, we set the name/rehydrate/load the schema
  useSessionStore.persist.setOptions({
    name: sessionName,
  });

  // manually rehydrate
  useSessionStore.persist.rehydrate();

  // wait a short amount of time to allow for rehydration
  setTimeout(() => {
    loadSchema({
      fetchOptions: {
        endpoint: useSessionStore.getState().endpoint as string,
        headers: useSessionStore.getState().headers,
      },
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
