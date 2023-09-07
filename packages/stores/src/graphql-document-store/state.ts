import {
  DOCUMENT_EDITOR_DEFAULT_VALUE,
  VARIABLES_EDITOR_DEFAULT_VALUE,
} from "@graphql-pathfinder/shared";

import type { GraphQLDocumentStoreState } from "./graphql-document-store.types";

export const INITIAL_GRAPHQL_DOCUMENT_STATE: GraphQLDocumentStoreState = {
  _hasHydrated: false,
  activeDocumentEntry: null,
  cursorPosition: null,
  documentEntries: [],
  documentNotifications: [],
  documentString: DOCUMENT_EDITOR_DEFAULT_VALUE,
  isParseable: true,
  variablesString: VARIABLES_EDITOR_DEFAULT_VALUE,
};

export const graphQLDocumentState = {
  ...INITIAL_GRAPHQL_DOCUMENT_STATE,
};
