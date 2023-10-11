import {
  STORAGE_NAME_SESSION,
  VARIABLES_EDITOR_DEFAULT_VALUE,
} from "@pathfinder-ide/shared";

import { getNamespacedStorageName } from "../../storage";

import { loadSchema, type EndpointConnectionDetails } from "../../schema-store";
import { useSessionStore } from "../use-session-store";

import { INITIAL_EDITOR_TAB } from "../slices/editor-tabs/editor-tabs-state";
import { setEditorValues } from "../slices/editor-tabs/actions/set-editor-values";
import { INITIAL_HTTP_HEADERS_STATE } from "../slices/http-headers/http-headers-state";

export const initSession = async ({
  fetchOptions,
}: {
  fetchOptions: EndpointConnectionDetails;
}) => {
  const name = getNamespacedStorageName({
    endpoint: fetchOptions.endpoint,
    storageName: STORAGE_NAME_SESSION,
  });

  useSessionStore.persist.setOptions({
    name,
  });

  useSessionStore.setState({
    endpoint: fetchOptions.endpoint,
    headers: [
      // always include default headers
      ...INITIAL_HTTP_HEADERS_STATE.headers,
      // conditionally include prop headers
      ...(fetchOptions.headers ? fetchOptions.headers : []),
    ],
    executions: [],
    activeTab: INITIAL_EDITOR_TAB,
    tabs: [INITIAL_EDITOR_TAB],
    variablesString: VARIABLES_EDITOR_DEFAULT_VALUE,
  });

  loadSchema({
    fetchOptions: {
      endpoint: fetchOptions.endpoint,
      headers: fetchOptions.headers,
    },
  });

  setEditorValues({
    newDocumentEditorValue: INITIAL_EDITOR_TAB.documentString,
  });
};
