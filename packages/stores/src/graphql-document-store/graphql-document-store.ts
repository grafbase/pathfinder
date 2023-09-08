import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

import { storage } from "../storage";
import { graphQLDocumentState } from "./state";
import { STORAGE_NAME_GRAPHQL_DOCUMENT } from "@pathfinder/shared";

import { GraphQLDocumentStoreState } from "./graphql-document-store.types";

type StateToPersist = Omit<
  GraphQLDocumentStoreState,
  "_hasHydrated" | "activeEventSources" | "isParseable"
>;

export const graphQLDocumentStore = createStore<GraphQLDocumentStoreState>()(
  persist(
    () => ({
      ...graphQLDocumentState,
    }),
    {
      // we skip automatic hydration here and manually call rehydrate() when Pathfinder loads.
      skipHydration: true,
      name: STORAGE_NAME_GRAPHQL_DOCUMENT,
      onRehydrateStorage: () => {
        return (_state, error) => {
          if (error) {
            console.warn("an error occurred during hydration", error);
          } else {
            graphQLDocumentStore.setState({
              _hasHydrated: true,
            });
          }
        };
      },
      partialize: (state) => ({
        activeDocumentEntry: state.activeDocumentEntry,
        cursorPosition: state.cursorPosition,
        documentEntries: state.documentEntries,
        documentNotifications: state.documentNotifications,
        documentString: state.documentString,
      }),
      storage: storage<StateToPersist>(),
      version: 0,
    },
  ),
);
